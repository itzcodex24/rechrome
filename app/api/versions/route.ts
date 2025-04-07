import { NextRequest } from 'next/server'
import { tryCatch } from '@/lib/try-catch'
import { Platforms } from '@/lib/utils'

interface Versions {
  [key: string]: {
    download_url: string
  }
}

const ENDPOINT = 'https://raw.githubusercontent.com/Bugazelle/chromium-all-old-stable-versions/master/chromium.stable.json'

export async function GET(request: NextRequest) {
  const os = request.nextUrl.searchParams.get('os') as typeof Platforms[number]

  if (!os) return new Response('Invalid request.', { status: 400 })
  if (!Platforms.includes(os)) return new Response('Unsupported Operating System.', { status: 400 })

  const { data: response, error } = await tryCatch(fetch(ENDPOINT, { method: 'GET' }))
  if (error) {
    console.log(error)
    return new Response('An error occured.', { status: 500 })
  }

  if (!response.ok) return new Response('An error occured.', { status: 500 })

  const { data, error: jsonError } = await tryCatch(response.json())

  if (jsonError) {
    console.log(error)
    return new Response('An error occured.', { status: 500 })
  }

  const versions = data[os] as Versions
  if (!versions) return new Response('Unsupported Operating System.', { status: 400 })

  const validVersions = Object.fromEntries(
    Object.entries(versions)
      .filter(([, { download_url }]) => !download_url.toLowerCase().includes('error:'))
  )
 
  return Response.json(validVersions, {status: 200})
}
