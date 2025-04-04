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
import { ChromiumData, Version } from "@/types/types"

type OperatingSystem = "win64" | "mac" | "linux64" | "android" | "ios"

interface ChromeVersion {
  version: string
  downloadUrl: string
}

export default function OperatingSystemSelector() {
  const [open, setOpen] = useState(false)
  const [selectedOS, setSelectedOS] = useState<OperatingSystem>("win64")
  const [chromeVersions, setChromeVersions] = useState<ChromeVersion[]>([])
  const [filteredVersions, setFilteredVersions] = useState<ChromeVersion[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const osToApiParam = {
    windows: "win64",
    macos: "mac",
    linux: "linux64",
    android: "android",
    ios: "mac", 
  }
  
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
        .then((data: Version) => {
          const versions: ChromeVersion[] = Object.entries(data).map(([version, {download_url}]) => ({
            version, 
            downloadUrl: download_url
          }))

          setChromeVersions(versions)
          setFilteredVersions(versions)
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

  const handleOSSelect = (os: string) => {
    
    const apiParam = osToApiParam[os as keyof typeof osToApiParam]
    setSelectedOS(apiParam as OperatingSystem)
    setSearchQuery("")
    setOpen(true)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">Select Your Operating System</h3>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-32 p-4"
          onClick={() => handleOSSelect("windows")}
        >
          <Windows className="h-12 w-12 mb-2" />
          <span>Windows</span>
        </Button>

        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-32 p-4"
          onClick={() => handleOSSelect("macos")}
        >
          <Apple className="h-12 w-12 mb-2" />
          <span>macOS</span>
        </Button>

        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-32 p-4"
          onClick={() => handleOSSelect("linux")}
        >
          <Linux className="h-12 w-12 mb-2" />
          <span>Linux</span>
        </Button>

        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-32 p-4"
          onClick={() => handleOSSelect("android")}
        >
          <Smartphone className="h-12 w-12 mb-2" />
          <span>Android</span>
        </Button>

        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-32 p-4"
          onClick={() => handleOSSelect("ios")}
        >
          <Apple className="h-12 w-12 mb-2" />
          <span>iOS</span>
        </Button>
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
                              <a href={version.downloadUrl} target="_blank" rel="noopener noreferrer">
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
                <p className="text-muted-foreground">No versions found matching "{searchQuery}"</p>
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
