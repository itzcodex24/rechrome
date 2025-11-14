import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const PrimaryPlatforms = ['android', 'mac', 'linux', 'linux64', 'win', 'win64'] as const
export const SecondaryPlatforms = ['linux64', 'mac-arm64', 'mac-x64', 'win32', 'win64'] as const

export type TPrimaryPlatforms = typeof PrimaryPlatforms[number]
export type TSecondaryPlatforms = typeof SecondaryPlatforms[number]
