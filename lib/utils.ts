import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const Platforms = ['android', 'mac', 'linux', 'linux64', 'win', 'win64'] as const
