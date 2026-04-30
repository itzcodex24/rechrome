"use client"

import { useState, useRef, useEffect } from "react"

const FAQS = [
  {
    q: "Where do the downloads come from?",
    a: "Every link points directly to Google's official public archive. ReChrome doesn't host or modify any binaries — we just surface them.",
  },
  {
    q: "What platforms are supported?",
    a: "Windows (32 & 64-bit), macOS (Apple Silicon & Intel), Linux 64-bit, and Android. Basically everywhere Chrome has ever shipped.",
  },
  {
    q: "Why would I need an older Chrome version?",
    a: "Cross-browser testing, reproducing version-specific bugs, compatibility checks for enterprise environments, security research, or working with legacy systems.",
  },
  {
    q: "Is this affiliated with Google?",
    a: "No. ReChrome is an independent open-source project. We surface Chrome's official archive in a usable interface — that's it.",
  },
]

function FAQItem({ q, a, isOpen, onToggle, index }: { q: string; a: string; isOpen: boolean; onToggle: () => void; index: number }) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const panelId = `faq-panel-${index}`
  const buttonId = `faq-btn-${index}`

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    el.style.maxHeight = isOpen ? el.scrollHeight + "px" : "0"
    el.style.opacity = isOpen ? "1" : "0"
  }, [isOpen])

  return (
    <div className="border-t border-border first:border-t-0">
      <button
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="w-full bg-transparent border-none text-left flex items-center justify-between py-[18px] cursor-pointer font-mono text-[12px] text-foreground gap-4 transition-colors hover:text-terminal-green"
      >
        <span>{q}</span>
        <span
          className={`text-[16px] shrink-0 transition-[transform,color] duration-200 ${
            isOpen ? "rotate-45 text-terminal-green" : "text-dim"
          }`}
        >
          +
        </span>
      </button>
      <div
        id={panelId}
        ref={bodyRef}
        role="region"
        aria-labelledby={buttonId}
        className="overflow-hidden transition-[max-height,opacity] duration-[250ms,200ms] ease-out"
        style={{ maxHeight: 0, opacity: 0 }}
      >
        <p className="pb-[18px] text-[11px] text-muted-foreground leading-[1.9]">{a}</p>
      </div>
    </div>
  )
}

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)
  const toggle = (i: number) => setOpen(prev => (prev === i ? null : i))

  return (
    <section id="faq">
      <p className="text-[10px] text-dim tracking-[2px] mb-6">
        <span className="text-terminal-green">{"//"}</span>{" FAQ"}
      </p>
      {FAQS.map((f, i) => (
        <FAQItem key={i} index={i} q={f.q} a={f.a} isOpen={open === i} onToggle={() => toggle(i)} />
      ))}
    </section>
  )
}
