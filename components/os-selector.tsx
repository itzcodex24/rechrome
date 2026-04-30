"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { AnimatePresence, motion } from "motion/react"

import type { Result } from "@/app/api/versions/route"
import type { TPrimaryPlatforms } from "@/lib/utils"

interface Platform {
  id: TPrimaryPlatforms
  label: string
  arch: string
}

const PLATFORMS: Platform[] = [
  { id: "win64",     label: "Windows 64",   arch: "64-bit" },
  { id: "win",       label: "Windows 32",   arch: "32-bit" },
  { id: "mac-arm64", label: "macOS ARM",    arch: "Apple Silicon" },
  { id: "mac-x64",   label: "macOS Intel",  arch: "x86-64" },
  { id: "linux64",   label: "Linux 64",     arch: "64-bit" },
  { id: "android",   label: "Android",      arch: "APK" },
]

function detectOS(): TPrimaryPlatforms {
  if (typeof window === "undefined") return "win64"
  const ua = navigator.userAgent.toLowerCase()
  const platform = (navigator.platform || "").toLowerCase()
  const appVersion = (navigator.appVersion || "").toLowerCase()
  if (/android/i.test(ua)) return "android"
  if (/mac/i.test(platform) || /macintosh/i.test(ua)) {
    const hint = `${ua} ${platform} ${appVersion}`
    return /\b(arm64|aarch64)\b/i.test(hint) ? "mac-arm64" : "mac-x64"
  }
  if (/linux/i.test(platform)) return "linux64"
  return "win64"
}

function OsCard({ platform, isDetected, onClick }: { platform: Platform; isDetected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative text-left p-4 flex flex-col gap-1 cursor-pointer transition-colors ${
        isDetected
          ? "bg-terminal-green hover:opacity-90"
          : "bg-card hover:bg-accent"
      }`}
    >
      <span className={`text-[12px] font-bold ${isDetected ? "text-[#0a0a0a]" : "text-foreground"}`}>
        {platform.label}
      </span>
      <span className={`text-[10px] ${isDetected ? "text-black/50" : "text-dim"}`}>
        {platform.arch}
      </span>
      {isDetected && (
        <span className="absolute top-2 right-2 text-[8px] tracking-[1px] text-black/60 bg-black/15 px-1.5 py-0.5">
          AUTO
        </span>
      )}
    </button>
  )
}

function VersionRow({
  version,
  copied,
  onCopy,
}: {
  version: { version: string; url: string }
  copied: string | null
  onCopy: (url: string) => void
}) {
  return (
    <div className="group flex items-center justify-between px-4 py-2 border-b border-border last:border-b-0 hover:bg-accent transition-colors">
      <span className="text-[12px] text-muted-foreground font-mono">
        {version.version}
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onCopy(version.url)}
          title="Copy link"
          className="text-[10px] text-dim px-1.5 py-1 opacity-0 group-hover:opacity-100 transition-[opacity,color] cursor-pointer bg-transparent border-none font-mono hover:text-terminal-green"
        >
          {copied === version.url ? "✓ copied" : "⎘ copy"}
        </button>
        <a
          href={version.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-[var(--border-mid)] text-dim text-[10px] no-underline transition-colors hover:border-terminal-green hover:text-terminal-green hover:bg-[var(--terminal-green-dim)]"
        >
          ↓ download
        </a>
      </div>
    </div>
  )
}

function VersionPanel({ platform, onBack }: { platform: Platform; onBack: () => void }) {
  const [search, setSearch] = useState("")
  const [versions, setVersions] = useState<Result>([])
  const [filtered, setFiltered] = useState<Result>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    setIsLoading(true)
    setError(null)
    fetch(`/api/versions?os=${platform.id}`, { signal })
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then((data: Result) => {
        if (signal.aborted) return
        setVersions(data)
        setFiltered(data)
      })
      .catch(() => {
        if (signal.aborted) return
        setError("Failed to load versions.")
      })
      .finally(() => {
        if (signal.aborted) return
        setIsLoading(false)
      })

    const focusTimeout = window.setTimeout(() => inputRef.current?.focus(), 50)

    return () => {
      controller.abort()
      window.clearTimeout(focusTimeout)
    }
  }, [platform.id])

  useEffect(() => {
    setFiltered(search.trim() ? versions.filter(v => v.version.includes(search.trim())) : versions)
  }, [search, versions])

  const handleCopy = useCallback(async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(url)
      setTimeout(() => setCopied(null), 2000)
    } catch { /* noop */ }
  }, [])

  return (
    <div className="animate-fade-up border border-border bg-card">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <button
          onClick={onBack}
          className="bg-transparent border border-[var(--border-mid)] text-muted-foreground font-mono text-[10px] px-2 py-1 cursor-pointer transition-colors hover:border-terminal-green hover:text-terminal-green"
        >
          ← back
        </button>
        <span className="text-[12px] font-bold flex-1">{platform.label}</span>
        <span className="text-[10px] text-dim">{filtered.length} versions</span>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border">
        <span className="text-[12px] text-terminal-green shrink-0">$</span>
        <input
          ref={inputRef}
          aria-label="Search version number"
          className="flex-1 bg-transparent border-none outline-none font-mono text-[12px] text-foreground placeholder:text-dim caret-terminal-green"
          placeholder="grep version..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Version list */}
      <div className="max-h-[340px] overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-10 gap-2 text-[11px] text-dim">
            <span className="animate-spin w-3 h-3 border border-[var(--border-mid)] border-t-terminal-green rounded-full" />
            loading...
          </div>
        ) : error ? (
          <p className="py-10 text-center text-[11px] text-dim">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="py-10 text-center text-[11px] text-dim">no results for &quot;{search}&quot;</p>
        ) : filtered.map(v => (
          <VersionRow key={v.version} version={v} copied={copied} onCopy={handleCopy} />
        ))}
      </div>

      {/* Copy toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 bg-terminal-green text-[#0a0a0a] font-mono font-bold text-[11px] px-4 py-2"
          >
            ✓ copied
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function OperatingSystemSelector() {
  const [detectedOS, setDetectedOS] = useState<TPrimaryPlatforms>("win64")
  const [selected, setSelected] = useState<Platform | null>(null)

  useEffect(() => { setDetectedOS(detectOS()) }, [])

  const sorted = [...PLATFORMS].sort((a, b) => {
    if (a.id === detectedOS) return -1
    if (b.id === detectedOS) return 1
    return 0
  })

  return (
    <div>
      <AnimatePresence mode="wait">
        {!selected ? (
          <motion.div
            key="os-grid"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-3 max-[800px]:grid-cols-2 max-[480px]:grid-cols-1 gap-px bg-border border border-border"
          >
            {sorted.map(p => (
              <OsCard
                key={p.id}
                platform={p}
                isDetected={p.id === detectedOS}
                onClick={() => setSelected(p)}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="version-panel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <VersionPanel platform={selected} onBack={() => setSelected(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
