"use client"

import { useState, useEffect } from "react"
import { FaGithub, FaStar } from "react-icons/fa"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

const GITHUB_REPO_URL = "https://github.com/itzcodex24/rechrome"
const BANNER_DISMISSED_KEY = "rechrome:bannerDismissed"

export function GitHubStarBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(BANNER_DISMISSED_KEY)) setVisible(true)
    } catch { setVisible(true) }
  }, [])

  const dismiss = () => {
    setVisible(false)
    try { sessionStorage.setItem(BANNER_DISMISSED_KEY, "1") } catch { /* noop */ }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden relative z-[60]"
        >
          <div className="relative bg-foreground text-background border-b border-foreground">
            <div className="px-6 md:px-10 py-2 flex items-center justify-center gap-2.5 text-[13px]">
              <FaStar className="h-2.5 w-2.5 text-chrome-yellow shrink-0" />
              <p>
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline underline-offset-2 decoration-current/40 hover:decoration-current transition-colors"
                >
                  Star us on GitHub
                </a>
                <span className="hidden sm:inline"> — it genuinely helps.</span>
              </p>
              <button
                onClick={dismiss}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:opacity-60 transition-opacity"
                aria-label="Dismiss"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function FloatingGitHubStar() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 500)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-foreground text-background px-4 py-2.5 text-[13px] font-medium shadow-lg hover:opacity-90 transition-opacity active:scale-95"
        >
          <FaGithub className="h-3.5 w-3.5" />
          <FaStar className="h-2.5 w-2.5 text-chrome-yellow" />
          <span className="hidden sm:inline">Star</span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
