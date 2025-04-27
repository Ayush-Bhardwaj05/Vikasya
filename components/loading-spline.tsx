"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface LoadingSplineProps {
  src: string
  title: string
}

export default function LoadingSpline({ src, title }: LoadingSplineProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative h-full w-full">
      {/* Loading overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoading ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className={`absolute inset-0 z-20 flex flex-col items-center justify-center bg-gradient-to-br from-black via-[#13071E] to-[#1E0B33] ${isLoading ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div className="flex flex-col items-center">
          <div className="mb-4 h-16 w-16 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 animate-ping opacity-75"></div>
            <div className="relative h-full w-full rounded-full bg-gradient-to-r from-purple-600 to-violet-600 animate-pulse flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <p className="text-purple-400">Loading {title}...</p>
        </div>
      </motion.div>

      {/* Iframe */}
      <iframe src={src} frameBorder="0" width="100%" height="100%" title={title} className="h-full w-full"></iframe>
    </div>
  )
}

// Simple Sparkles component
function Sparkles({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3v18M9 6l3-3 3 3M9 18l3 3 3-3M3 12h18M6 9l-3 3 3 3M18 9l3 3-3 3" />
    </svg>
  )
}

