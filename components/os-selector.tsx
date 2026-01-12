"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

import {
  ComputerIcon as Windows,
  Apple,
  LaptopIcon as Linux,
  Smartphone,
  Download,
  X,
  Search,
  Loader2,
} from "lucide-react"

import type { Result } from "@/app/api/versions/route"
import type { TPrimaryPlatforms } from "@/lib/utils"

interface Platform {
  text: string
  icon: React.ReactNode
  os: TPrimaryPlatforms
}

const GITHUB_PROFILE_URL = "https://github.com/itzcodex24"
const GITHUB_REPO_URL = `${GITHUB_PROFILE_URL}/rechrome`
const HAS_SHOWN_STAR_PROMPT_KEY = "rechrome:shownStarPrompt"

const platforms: Platform[] = [
  {
    text: "Android",
    os: 'android',
    icon: <Smartphone className="h-12 w-12 mb-2" />
  },
  {
    text: "macOS",
    os: 'mac',
    icon: <Apple className="h-12 w-12 mb-2" />
  },
  {
    text: "Windows",
    os: 'win',
    icon: <Windows className="h-12 w-12 mb-2" />
  },
  {
    text: "Windows 64",
    os: 'win64',
    icon: <Windows className="h-12 w-12 mb-2" />
  },
  {
    text: "Linux",
    os: 'linux',
    icon: <Linux className="h-12 w-12 mb-2" />
  },
  {
    text: "Linux 64",
    os: 'linux64',
    icon: <Linux className="h-12 w-12 mb-2" />
  },
]

export default function OperatingSystemSelector() {
  const [open, setOpen] = useState(false)
  const [showStarPrompt, setShowStarPrompt] = useState(false)
  const [selectedOS, setSelectedOS] = useState<TPrimaryPlatforms>("win64")
  const [chromeVersions, setChromeVersions] = useState<Result>([])
  const [filteredVersions, setFilteredVersions] = useState<Result>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    if (open) {
      setIsLoading(true)
      setChromeVersions([])
      setFilteredVersions([])
      setError(null)

      fetch(`/api/versions?os=${selectedOS}`, {
        next: { revalidate: 86400 * 3 }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`)
          }
          return response.json()
        })
        .then((data: Result) => {
          setChromeVersions(data)
          setFilteredVersions(data)
        })
        .catch(err => {
          console.error("Error fetching Chrome versions:", err)
          setError("Failed to load Chrome versions. Please try again later.")
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [open, selectedOS])


  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredVersions(chromeVersions)
    } else {
      const filtered = chromeVersions.filter((version) =>
        version.version.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredVersions(filtered)
    }
  }, [searchQuery, chromeVersions])

  const handleOSSelect = (os: TPrimaryPlatforms) => {
    setSelectedOS(os)
    setSearchQuery("")
    setOpen(true)
  }

  const maybeShowStarPrompt = () => {
    try {
      const hasShown = localStorage.getItem(HAS_SHOWN_STAR_PROMPT_KEY) === "1"
      if (hasShown) return

      localStorage.setItem(HAS_SHOWN_STAR_PROMPT_KEY, "1")
      setShowStarPrompt(true)
    } catch {
      setShowStarPrompt(true)
    }
  }

  return (
    <div className="space-y-6">
      <Drawer open={showStarPrompt} onOpenChange={setShowStarPrompt}>
        <DrawerContent className="max-w-md mx-auto">
          <DrawerHeader className="border-b">
            <DrawerTitle>Enjoying ReChrome?</DrawerTitle>
            <DrawerDescription>
              If this helped you, starring the repo makes a big difference.
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 py-4 space-y-3 text-sm">
            <p>
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Star the GitHub repository
              </a>
            </p>
            <p>
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                View the creator profile
              </a>
            </p>
          </div>

          <DrawerFooter className="border-t">
            <Button asChild>
              <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
                Star on GitHub
              </a>
            </Button>
            <Button variant="outline" onClick={() => setShowStarPrompt(false)}>
              Not now
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <h3 className="text-2xl font-semibold">Select Your Operating System</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        {platforms.map((platform, index) => (
          <Button
            key={index}
            variant="outline"
            className="flex flex-col items-center justify-center h-32 p-4 backdrop-blur-xl"
            onClick={() => handleOSSelect(platform.os)}
          >
            {platform.icon}
            <span>{platform.text}</span>
          </Button>
        ))}
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="border-b">
            <div className="flex items-center justify-between">
              <DrawerTitle>Chrome Downloads for {selectedOS.charAt(0).toUpperCase() + selectedOS.slice(1).replace("64", "")}</DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
            <DrawerDescription>
              Select a version to download. All downloads are from official Google sources.
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 py-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search versions..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="px-4 flex-1 overflow-auto">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <p className="mt-4 text-sm text-muted-foreground">Loading Chrome versions...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
                <Button className="mt-4" variant="outline" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </div>
            ) : filteredVersions.length > 0 ? (
              <div className="border rounded-lg overflow-hidden">
                <div className="max-h-[50vh] overflow-y-auto">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-background">
                      <tr className="bg-muted">
                        <th className="text-left p-3">Version</th>
                        <th className="text-right p-3">Download</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVersions.map((version, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-3">{version.version}</td>
                          <td className="p-3 text-right">
                            <Button size="sm" variant="outline" asChild>
                              <a
                                href={version.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={maybeShowStarPrompt}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </a>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No versions found matching &quot;{searchQuery}&quot;</p>
              </div>
            )}
          </div>

          <DrawerFooter className="border-t">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
