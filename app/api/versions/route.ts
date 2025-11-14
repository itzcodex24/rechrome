import { tryCatch } from '@/lib/try-catch'
import { PrimaryPlatforms, type TPrimaryPlatforms, type TSecondaryPlatforms } from '@/lib/utils'
import { NextRequest } from 'next/server'

type PrimaryEndpoints = Record<TPrimaryPlatforms, {
  [version: string]: {
    download_url: string
  }
}>

type SecondaryEndpoints = {
  versions: {
    version: string
    downloads: {
      chrome: {
        platform: TSecondaryPlatforms
        url: string
      }[]
    }
  }[]
}

export type Result = { version: string, url: string }[]

const ENDPOINTS = {
  primary: 'https://raw.githubusercontent.com/Bugazelle/chromium-all-old-stable-versions/master/chromium.stable.json',
  secondary: 'https://googlechromelabs.github.io/chrome-for-testing/known-good-versions-with-downloads.json'
} as const

async function getPrimaryResponse(os: TPrimaryPlatforms): Promise<Result> {
  try {
    const response = await fetch(ENDPOINTS.primary, { method: "GET" })
    const json = await response.json() as PrimaryEndpoints

    const versions = json[os]
    if (!versions) throw Error("No versions found.")

    return Object.entries(versions)
      .map(([version, { download_url }]) => ({ version, url: download_url }))
  } catch {
    throw Error("Unable to fetch primary data.")
  }
}

function mapSecondaryOperatingSystem(inputOs: TPrimaryPlatforms): TSecondaryPlatforms | null {
  switch (inputOs) {
    case 'mac':
      return 'mac-arm64'
    case 'win64':
      return 'win64'
    case 'win':
      return 'win32'
    case 'linux64':
    case 'linux':
      return 'linux64'
    case 'android':
      return null

    default: {
      const exhaustive: never = inputOs
      console.error('Received exhaustive value ' + exhaustive)
      return null
    }
  }
}

async function getSecondaryResponse(os: TPrimaryPlatforms, currentResults: Result): Promise<Result> {
  try {
    const response = await fetch(ENDPOINTS.secondary, { method: "GET" })
    const json = await response.json() as SecondaryEndpoints

    const secondaryOs = mapSecondaryOperatingSystem(os)
    if (!secondaryOs) throw Error("Input OS Unsupported")

    const filteredVersions = json.versions.filter(v => 
      !currentResults.some(r => r.version === v.version)
    )

    const secondaryDownloads = filteredVersions.flatMap(v => {
      const chromeDownloads = v.downloads.chrome
      const matchingDownloads = chromeDownloads.filter(d => d.platform === secondaryOs)
      return matchingDownloads.map(d => ({
        version: v.version,
        url: d.url
      }))
    })

    return secondaryDownloads
  } catch {
    throw Error("Unable to fetch secondary data.")
  }
}

function compareVersions(a: string, b: string): number {
  const aParts = a.split('.').map(Number)
  const bParts = b.split('.').map(Number)
  
  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    const aPart = aParts[i] || 0
    const bPart = bParts[i] || 0
    
    if (aPart !== bPart) {
      return bPart - aPart
    }
  }
  
  return 0
}

async function getVersions(os: TPrimaryPlatforms): Promise<Result> {
  const result: Result = []

  const { data: primary, error: primaryError } = await tryCatch(getPrimaryResponse(os))
  if (primaryError) {
    console.error(primaryError)
  } else {
    result.push(...primary)
  }

  const { data: secondary, error: secondaryError } = await tryCatch(getSecondaryResponse(os, result))
  if (secondaryError) {
    console.error(secondaryError)
  } else {
    result.push(...secondary)
  }

  const uniqueVersions = new Map<string, { version: string, url: string }>()
  for (const item of result) {
    if (!uniqueVersions.has(item.version)) {
      uniqueVersions.set(item.version, item)
    }
  }

  const deduplicated = Array.from(uniqueVersions.values())
  deduplicated.sort((a, b) => compareVersions(a.version, b.version))

  return deduplicated
}

export async function GET(request: NextRequest) {
  const os = request.nextUrl.searchParams.get('os') as typeof PrimaryPlatforms[number]
  if (!os) return new Response('Invalid request.', { status: 400 })
  if (!PrimaryPlatforms.includes(os)) return new Response('Unsupported Operating System.', { status: 400 })

  try {
    const versions = await getVersions(os)
    return Response.json(versions, { status: 200 })
  } catch {
    return new Response('Unable to fetch versions.', { status: 500 })
  }
}
