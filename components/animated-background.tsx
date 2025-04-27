"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function AnimatedBackground() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-600/10"
            initial={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.1,
            }}
            animate={{
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0.05, 0.2, 0.05],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  )
}