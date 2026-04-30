"use client"

import { motion } from "motion/react"

export function GradientOrb() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute w-[700px] h-[700px] md:w-[900px] md:h-[900px] rounded-full opacity-[0.04] dark:opacity-[0.06] blur-[120px] md:blur-[150px]"
        style={{
          background: "radial-gradient(circle, var(--foreground) 0%, transparent 70%)",
          top: "-30%",
          left: "50%",
          translateX: "-50%",
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ scale: { duration: 10, repeat: Infinity, ease: "easeInOut" } }}
      />
    </div>
  )
}
