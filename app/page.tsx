import Link from "next/link"
import { FaGithub } from "react-icons/fa"
import OperatingSystemSelector from "@/components/os-selector"
import { FAQSection } from "@/components/faq-section"
import { FloatingNav } from "@/components/floating-nav"
import { VersionMarquee } from "@/components/version-marquee"

const GITHUB_REPO_URL = "https://github.com/itzcodex24/rechrome"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <FloatingNav />

      {/* ─── Hero ─── */}
      <section className="animate-fade-up pt-[120px] max-[800px]:pt-[90px] pb-14 max-[800px]:pb-10 px-7 max-[480px]:px-4 border-b border-border">
        <div className="max-w-[1100px] mx-auto">
        {/* ~/rechrome prompt */}
        <div className="flex items-center gap-1.5 mb-[18px] text-[11px] text-terminal-green tracking-[1px]">
          <span>~/rechrome</span>
          <span className="animate-blink inline-block w-2 h-[14px] bg-terminal-green align-middle" />
        </div>

        {/* Open source badge */}
        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mb-[22px] border border-[var(--border-mid)] px-2.5 py-1 text-[10px] text-dim tracking-[1.5px] no-underline transition-colors hover:border-terminal-green hover:text-terminal-green"
        >
          <span className="inline-block w-[5px] h-[5px] rounded-full bg-terminal-green" />
          OPEN SOURCE
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.2"/></svg>
        </a>

        {/* Headline */}
        <h1 className="text-[clamp(2.4rem,5.5vw,4.5rem)] font-bold leading-none tracking-[-1.5px]">
          Every Chrome<br />
          version.<br />
          <span className="text-terminal-green">One click away.</span>
        </h1>

        <p className="mt-5 text-[12px] text-muted-foreground leading-[1.8] max-w-[340px]">
          The complete Chromium archive for every platform.<br />
          All downloads from official Google sources.
        </p>

        <div className="mt-7 flex items-center gap-2.5 flex-wrap">
          <Link
            href="#downloads"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-terminal-green text-[#0a0a0a] font-bold text-[11px] tracking-[0.5px] no-underline hover:opacity-85 transition-opacity"
          >
            ↓ Browse Downloads
          </Link>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border-mid)] text-muted-foreground text-[11px] tracking-[0.5px] no-underline transition-colors hover:border-terminal-green hover:text-terminal-green"
          >
            <FaGithub className="w-3 h-3" />
            Star on GitHub
          </a>
        </div>
        </div>
      </section>

      {/* ─── Marquee ─── */}
      <VersionMarquee />

      {/* ─── Downloads ─── */}
      <section id="downloads" className="px-7 max-[800px]:px-4 py-16 max-[800px]:py-10 border-b border-border">
        <div className="grid grid-cols-1 min-[800px]:grid-cols-[1fr_2fr] gap-12 max-w-[1100px] mx-auto">
          <div>
            <p className="text-[10px] text-dim tracking-[2px] mb-4">
              <span className="text-terminal-green">{"//"}</span>{" DOWNLOADS"}
            </p>
            <h2 className="text-xl font-bold tracking-[-0.5px] leading-[1.2] mb-2.5">
              Pick your<br />platform.
            </h2>
            <p className="text-[11px] text-muted-foreground leading-[1.8]">
              Your OS is auto-detected and highlighted.<br />
              Select any platform to browse available versions.
            </p>
          </div>
          <div>
            <OperatingSystemSelector />
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="px-7 max-[800px]:px-4 py-16 max-[800px]:py-10 border-b border-border">
        <div className="max-w-[680px] mx-auto">
          <FAQSection />
        </div>
      </section>

      {/* ─── GitHub CTA ─── */}
      <section className="px-7 max-[800px]:px-4 py-16 max-[800px]:py-10 border-b border-border">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between gap-6 flex-wrap max-[800px]:flex-col max-[800px]:items-start">
          <div>
            <p className="text-[10px] text-dim tracking-[2px] mb-3">
              <span className="text-terminal-green">{"//"}</span>{" OPEN SOURCE"}
            </p>
            <h2 className="text-[22px] font-bold tracking-[-0.5px] mb-2">
              If this helped,<br />leave a star.
            </h2>
            <p className="text-[11px] text-muted-foreground leading-[1.8] max-w-[380px]">
              Two seconds, zero cost. It keeps the project alive and helps it reach more developers.
            </p>
          </div>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-terminal-green text-[#0a0a0a] font-bold text-[11px] tracking-[0.5px] no-underline hover:opacity-85 transition-opacity"
          >
            <FaGithub className="w-3.5 h-3.5" />
            Star on GitHub ★
          </a>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="px-7 py-4 flex items-center justify-between gap-3 flex-wrap">
        <p className="text-[10px] text-dim">
          Not affiliated with Google. All links from the official archive.
        </p>
        <div className="flex items-center gap-4">
          <a href="https://x.com/itzcodex24" target="_blank" rel="noopener noreferrer" className="text-[10px] text-dim no-underline transition-colors hover:text-terminal-green">
            Twitter / X
          </a>
          <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="text-[10px] text-dim no-underline transition-colors hover:text-terminal-green">
            GitHub
          </a>
        </div>
      </footer>
    </div>
  )
}
