"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, Sparkles, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import RoadmapSection from "@/components/roadmap-section"
import LoadingSpline from "@/components/loading-spline"

export default function Home() {
  const containerRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  // Reload Spline when user returns to this page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setReloadKey((prev) => prev + 1)
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Set loaded state after a delay to trigger animations
    const timer = setTimeout(() => setIsLoaded(true), 800)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative flex flex-col min-h-screen bg-[#0A0011]">
      {/* Animated background elements */}
      {/* <div className="absolute inset-0 overflow-hidden">
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
      </div> */}

      {/* Hero Section with 3D Robot */}
      <section className="relative flex h-[90vh] w-full items-center justify-center overflow-hidden">
        {/* Animated grid overlay */}
        <div className="absolute inset-0 z-0">
          <div className="h-full w-full bg-[linear-gradient(rgba(128,90,213,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(128,90,213,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <motion.div
          key={`spline-${reloadKey}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ opacity, scale }}
          className="absolute inset-0 z-10"
        >
          <LoadingSpline
            src="https://my.spline.design/nexbotrobotcharacterconcept-5e50b3339fddca3d56a0a0e7943ef3c0/"
            title="Loading Echo..."
          />
        </motion.div>

        {/* Overlay text with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-16 left-0 z-20 w-full px-6 text-center md:bottom-24 md:px-12"
        >
          <AnimatePresence>
            {isLoaded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative inline-block mb-6"
              >
                <motion.div
                  className="absolute -left-8 -top-8 h-16 w-16 rounded-full bg-purple-600/20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -right-8 -bottom-8 h-16 w-16 rounded-full bg-violet-600/20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    delay: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <h1 className="text-4xl font-bold leading-tight text-purple-500 md:text-6xl lg:text-7xl">
                  Meet
                  <motion.span
                    className="ml-2 bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-white"
                    animate={{
                      backgroundPosition: ["0% center", "100% center", "0% center"],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    style={{ backgroundSize: "200% auto" }}
                  >
                    Echo
                  </motion.span>
                </h1>
                <motion.div
                  className="absolute -right-6 -top-6 text-purple-400"
                  animate={{
                    rotate: [0, 10, 0, -10, 0],
                    scale: [1, 1.2, 1, 1.2, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="h-6 w-6" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-wrap justify-center gap-4">
            {/* <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700 shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-all duration-300"
            >
              <Link href="/models" className="flex items-center">
                Explore Models <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button> */}

            {/* Enhanced CTA Button with animations */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="relative">
              <motion.div
                className="absolute -inset-1 rounded-lg bg-gradient-to-r from-violet-600 via-purple-500 to-violet-600"
                animate={{
                  backgroundPosition: ["0% center", "100% center", "0% center"],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                style={{ backgroundSize: "200% auto" }}
              />
              <Button
                asChild
                size="lg"
                className="relative flex items-center gap-2 bg-black border-0 px-6 py-6 text-lg font-medium text-white hover:bg-black/90 transition-all duration-300"
              >
                <Link href="/explore" className="flex items-center">
                  <span className="mr-2">Try Our Voice Assistant</span>
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <Zap className="h-5 w-5 text-yellow-300" />
                  </motion.div>
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-6 text-md text-purple-950 font-bold max-w-md mx-auto"
          >
            Experience our AI voice assistant that detects emotions and responds naturally
          </motion.p> */}
        </motion.div>

        {/* Enhanced gradient overlay with more depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#13071E] via-[#13071E]/90 to-transparent opacity-90"></div>

        {/* Subtle animated particles */}
        {/* <div className="absolute inset-0 z-10 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-purple-400"
              initial={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: Math.random() * 0.5,
              }}
              animate={{
                y: [null, -Math.random() * 500],
                opacity: [null, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </div> */}
      </section>

      {/* Roadmap Section */}
      <RoadmapSection />
    </div>
  )
}
