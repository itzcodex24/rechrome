import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FaGithub, FaChrome } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import ThemeSwitcher from "@/components/theme-switcher"
import OperatingSystemSelector from "@/components/os-selector"
import { TextHoverEffect } from "@/components/ui/text-hover-effect"
import { BackgroundLines } from "@/components/ui/background-lines"

export default function Home() {
  return (
    <BackgroundLines className="min-h-screen bg-background w-full flex flex-col">
      <header className="py-6 px-12 h-20 flex justify-between items-center w-full relative">
        <div className="flex items-center gap-2">
          <FaChrome className="h-8 w-8 ." />
          <h1 className="text-2xl font-bold">ReChrome</h1>
        </div>
        <ThemeSwitcher />
      </header>

      <main className="mx-auto px-4 w-full grow flex justify-center items-center mt-12 md:mt-0 relative">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="hidden md:block">
            <TextHoverEffect text="ReChrome" />
          </div>
          <h1 className="text-5xl block md:hidden font-bold">ReChrome</h1>
          <p className="text-xs text-muted-foreground px-4 md:text-lg xl:text-xl xl:-mt-20">
            Stop digging through the internet to find specific Chrome versions. We&apos;ve gathered all versions in one
            convenient location.
          </p>

          <div className="mt-12">
            <OperatingSystemSelector />
          </div>
        </div>
      </main>

      <footer className="border-t h-20 mt-4 relative pt-8 pb-20 md:pb-8">
        <div className="container mx-auto px-4 h-full flex justify-between md:items-center flex-col md:flex-row gap-y-2">
          <p className="text-xs text-muted-foreground">ReChrome is not affiliated with Google. All download links are public in the official archive.</p>
          <div className="flex items-center gap-x-2">
            <Link href="https://x.com/itzcodex24" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <FaXTwitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
            </Link>
            <div className="flex items-center gap-x-2">
              <Link href="https://github.com/itzcodex24/rechrome" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <FaGithub className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <h1 className="text-white/80 font-light">Please leave a ⭐</h1>
            </div>
          </div>
        </div>
      </footer>
    </BackgroundLines>
  )
}

