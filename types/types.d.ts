import { Platforms } from "@/app/api/versions/route"

export type PlatformType = typeof Platforms[number]

export interface DownloadInfo {
  download_url: string
}

export interface ChromiumData {
  [platform: string]: Version
}

export interface Version {
  [version: string]: DownloadInfo
}

export interface VersionInfo {
  version: string
  releaseDate?: string
  downloadUrl: string
  // TODO: Implement size
  // size: string
}
