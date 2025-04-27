"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, Sparkles, Zap, Mic, AlertTriangle, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import PublicIssueCard from "@/components/public-issue-card"

interface IssueCategory {
  id: number
  title: string
  emoji: string
  feedbackCount: number
  sentiment: number // -1 to 1 (negative to positive)
}

interface TrendingIssue {
  id: number
  category: string
  location: string
  count: number
}

export default function PublicIssuesPage() {
  const containerRef = useRef(null)
  const [location, setLocation] = useState<string>("Loading...")
  const [categories, setCategories] = useState<IssueCategory[]>([])
  const [trendingIssues, setTrendingIssues] = useState<TrendingIssue[]>([])
  const [selectedCategory, setSelectedCategory] = useState<IssueCategory | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  useEffect(() => {
    // Set loaded state after a delay to trigger animations
    const timer = setTimeout(() => setIsLoaded(true), 800)

    // Simulate location detection
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
        const data = await response.json()
        const district = data.address.city_district || data.address.suburb || data.address.city || data.address.county || "Unknown Location"
        setLocation(district)
      }, (error) => {
        setLocation("Location Not Found")
      })
    } else {
      setLocation("Geolocation Not Supported")
    }

    // Mock category data
    setCategories([
      { id: 1, title: "Public Sanitation", emoji: "🚽", feedbackCount: 24, sentiment: -0.3 },
      { id: 2, title: "Garbage Collection", emoji: "🗑️", feedbackCount: 42, sentiment: -0.7 },
      { id: 3, title: "Road Conditions", emoji: "🛣️", feedbackCount: 38, sentiment: -0.5 },
      { id: 4, title: "Street Lighting", emoji: "💡", feedbackCount: 56, sentiment: -0.8 },
      { id: 5, title: "Water Supply", emoji: "🚰", feedbackCount: 31, sentiment: 0.2 },
      { id: 6, title: "Public Transport", emoji: "🚌", feedbackCount: 47, sentiment: -0.4 },
      { id: 7, title: "Noise Pollution", emoji: "🔊", feedbackCount: 19, sentiment: -0.6 },
      { id: 8, title: "Green Spaces / Parks", emoji: "🌳", feedbackCount: 28, sentiment: 0.7 },
      { id: 9, title: "Public Safety", emoji: "👮", feedbackCount: 15, sentiment: 0.1 },
      { id: 10, title: "Others", emoji: "📢", feedbackCount: 12, sentiment: 0 },
    ])

    // Mock trending issues
    setTrendingIssues([
      { id: 1, category: "Street Lighting", location: "Sector 45", count: 23 },
      { id: 2, category: "Garbage Collection", location: "Sector 46", count: 18 },
      { id: 3, category: "Road Conditions", location: "DLF Phase 3", count: 15 },
    ])

    return () => clearTimeout(timer)
  }, [])

  const startRecording = () => {
    setIsRecording(true)
  }

  const stopRecording = () => {
    setIsRecording(false)
  }

  return (
    <div ref={containerRef} className="relative flex flex-col min-h-screen bg-[#0A0011]">
      {/* Animated background elements */}
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

      {/* Main Content */}
      <section className="relative z-10 pt-24 pb-16 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mb-12"
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
                <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                  Public Issues in{' '}
                  <motion.span
                    className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent"
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
                    {location}
                  </motion.span>
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
          <p className="text-lg text-purple-200 max-w-2xl mx-auto">
            Report and view community feedback on local public services
          </p>
        </motion.div>

        {/* Category Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="container mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <PublicIssueCard
                key={category.id}
                category={category}
                index={index}
                onClick={() => setSelectedCategory(category)}
              />
            ))}
          </div>
        </motion.div>
      </section>
            
        {/* Trending Issues Section */}
        {trendingIssues.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="container mx-auto mb-12"
          >
            <div className="bg-gradient-to-r from-purple-900/50 to-violet-900/50 rounded-xl border border-purple-500/30 p-6 backdrop-blur-sm shadow-[0_0_20px_rgba(147,51,234,0.2)]">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-6 w-6 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">What's Trending in Your Area</h2>
              </div>
              <div className="space-y-3">
                {trendingIssues.map((issue) => (
                  <motion.div
                    key={issue.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-3 bg-purple-900/30 rounded-lg border border-purple-500/20"
                  >
                    <AlertTriangle className="h-5 w-5 text-orange-400" />
                    <span className="text-sm font-medium text-purple-100">
                      {issue.category} issues reported by {issue.count}+ users in {issue.location}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

      {/* Feedback Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => {
              stopRecording()
              setSelectedCategory(null)
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative w-full max-w-md rounded-xl bg-gradient-to-br from-[#13071E] to-[#1E0B33] p-6 border border-purple-500/30 shadow-[0_0_30px_rgba(147,51,234,0.3)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-1">
                  <span className="text-2xl mr-2">{selectedCategory.emoji}</span>
                  {selectedCategory.title}
                </h2>
                <p className="text-purple-200">
                  Share your feedback about {selectedCategory.title.toLowerCase()} in {location}
                </p>
              </div>

              <div className="space-y-4">
                {!isRecording ? (
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
                    <button
                      onClick={startRecording}
                      className="relative w-full flex items-center justify-center gap-2 bg-black/80 hover:bg-black/90 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                    >
                      <Mic className="h-5 w-5" />
                      Tap to Speak
                    </button>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 py-8">
                      {[0, 150, 300].map((delay) => (
                        <motion.div
                          key={delay}
                          className="h-4 w-4 bg-blue-500 rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.6, 1, 0.6],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: delay / 1000,
                          }}
                        />
                      ))}
                    </div>
                    <button
                      onClick={stopRecording}
                      className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                    >
                      Stop Recording
                    </button>
                  </div>
                )}

                <button
                  onClick={() => {
                    stopRecording()
                    setSelectedCategory(null)
                  }}
                  className="w-full py-2 text-purple-300 hover:text-white font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}