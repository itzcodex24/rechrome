"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"

const GITHUB_REPO_URL = "https://github.com/itzcodex24/rechrome"

const GithubIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
  </svg>
)

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])

  const isDark = resolvedTheme === "dark"

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] h-12 flex items-center justify-between px-7 max-[480px]:px-4 border-b border-border transition-[background,backdrop-filter] duration-200 ${
      scrolled ? "bg-background/85 backdrop-blur-[12px]" : "bg-background"
    }`}>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 no-underline text-foreground">
        <div className="w-4 h-4 rounded-full shrink-0 bg-[conic-gradient(#5b8ee6_0deg_90deg,#3dde7a_90deg_180deg,#e6b85b_180deg_270deg,#e6635b_270deg_360deg)]" />
        <span className="text-[13px] font-bold tracking-[0.5px]">ReChrome</span>
      </Link>

      {/* Center links — hidden on mobile */}
      <div className="hidden md:flex gap-7">
        <Link href="#downloads" className="text-[11px] text-dim no-underline tracking-[0.5px] transition-colors hover:text-terminal-green">
          Downloads
        </Link>
        <Link href="#faq" className="text-[11px] text-dim no-underline tracking-[0.5px] transition-colors hover:text-terminal-green">
          FAQ
        </Link>
        <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="text-[11px] text-dim no-underline tracking-[0.5px] transition-colors hover:text-terminal-green">
          Source
        </a>
      </div>

      {/* Right: star + theme toggle */}
      <div className="flex items-center gap-2.5">
        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-[5px] border border-[var(--border-mid)] text-muted-foreground text-[11px] no-underline transition-colors hover:border-terminal-green hover:text-terminal-green"
        >
          <GithubIcon />
          Star ★
        </a>

        {mounted && (
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            title="Toggle theme"
            className="w-8 h-7 flex items-center justify-center border border-[var(--border-mid)] text-dim text-[12px] cursor-pointer bg-transparent transition-colors hover:border-terminal-green hover:text-terminal-green font-mono"
          >
            {isDark ? "☀" : "☾"}
          </button>
        )}
      </div>
    </nav>
  )
}
