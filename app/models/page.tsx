"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles, Mic, MicOff, Brain, HeartPulse } from "lucide-react"
import Link from "next/link"

interface Model {
  id: number
  name: string
  image: string
  description: string
  url: string
  specs: {
    accuracy?: string
    training: string
    response?: string
    languages?: string
    specialization: string
  }
}

const models: Model[] = [
  {
    id: 1,
    name: "VibeSense Indian",
    image: "/placeholder.svg?height=400&width=400",
    description: "VibeSense is the first model trained exclusively on a self-collected Indian-accented speech dataset, ensuring unmatched accuracy. It uses voice augmentation for enhanced generalization, making it a pioneering solution for real-time emotion detection.",
    url: `${process.env.NEXT_PUBLIC_API_URL}/predict-indian`,
    specs: {
      accuracy: "93.7%",
      training: "3000",
      response: "Under 10ms",
      specialization: "Natural conversation, creative content, Indian Accent",
    },
  },
  {
    id: 2,
    name: "VibeSense Foreign",
    image: "/placeholder.svg?height=400&width=400",
    description: "Model trained on CREMA-D, RAVDESS, SAVEE and TESS COMBINED. NOTE: Low Accuracy for Indian Accent.",
    url: `${process.env.NEXT_PUBLIC_API_URL}/predict-emotion`,
    specs: {
      accuracy: "96%",
      training: "33000",
      response: "Under 7ms",
      specialization: "Foreign accent, emotional analysis, voice modulation",
    },
  },
]

// Helper function to convert AudioBuffer to WAV format
const audioBufferToWav = (buffer: AudioBuffer): ArrayBuffer => {
  const numChannels = buffer.numberOfChannels
  const sampleRate = buffer.sampleRate
  const bytesPerSample = 2 // 16-bit
  const blockAlign = numChannels * bytesPerSample

  // Calculate data chunk size
  const dataChunkSize = buffer.length * numChannels * bytesPerSample

  // Create buffer for WAV header (44 bytes) + data
  const arrayBuffer = new ArrayBuffer(44 + dataChunkSize)
  const view = new DataView(arrayBuffer)

  // RIFF header
  writeString(view, 0, "RIFF")
  view.setUint32(4, 36 + dataChunkSize, true) // file length
  writeString(view, 8, "WAVE")
  writeString(view, 12, "fmt ")
  view.setUint32(16, 16, true) // fmt chunk length
  view.setUint16(20, 1, true) // PCM format
  view.setUint16(22, numChannels, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * blockAlign, true) // byte rate
  view.setUint16(32, blockAlign, true)
  view.setUint16(34, bytesPerSample * 8, true) // bits per sample
  writeString(view, 36, "data")
  view.setUint32(40, dataChunkSize, true)

  // Write PCM samples
  let offset = 44
  for (let i = 0; i < buffer.length; i++) {
    for (let channel = 0; channel < numChannels; channel++) {
      const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]))
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true)
      offset += 2
    }
  }

  return arrayBuffer
}

const writeString = (view: DataView, offset: number, str: string) => {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i))
  }
}

// Convert any audio blob to WAV format
const convertToWav = async (blob: Blob): Promise<Blob> => {
  try {
    const arrayBuffer = await blob.arrayBuffer()
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
    const wavArrayBuffer = audioBufferToWav(audioBuffer)
    return new Blob([wavArrayBuffer], { type: "audio/wav" })
  } catch (error) {
    console.error("Error converting to WAV:", error)
    throw error
  }
}

export default function ModelsPage() {
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const audioChunks = useRef<Blob[]>([])
  const [activeModel, setActiveModel] = useState<Model | null>(null)
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [emotionResult, setEmotionResult] = useState<string | null>(null)

  const startRecording = async (model: Model) => {
    try {
      setEmotionResult(null) // Reset emotion result
      console.log("Starting recording for model:", model.name)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setActiveModel(model)

      // Use webm by default as most browsers don't support WAV recording
      const options = { mimeType: "audio/webm;codecs=opus" }
      const recorder = new MediaRecorder(stream, options)
      console.log("MediaRecorder mimeType:", recorder.mimeType)

      recorder.onstart = () => {
        console.log("MediaRecorder started")
        audioChunks.current = []
      }

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data)
          console.log("Chunk added. Total chunks:", audioChunks.current.length)
        }
      }

      recorder.onstop = async () => {
        console.log("Recording stopped")
        try {
          setIsLoading(true)
          const audioBlob = new Blob(audioChunks.current, {
            type: recorder.mimeType,
          })
          console.log("Original audio blob:", audioBlob)

          // Convert to WAV before uploading
          const wavBlob = await convertToWav(audioBlob)
          console.log("Converted WAV blob:", wavBlob)

          const formData = new FormData()
          formData.append("file", wavBlob, "recording.wav")

          console.log("Uploading file to:", model.url)
          const response = await fetch(model.url, {
            method: "POST",
            body: formData,
          })

          if (!response.ok) {
            console.error("Server error:", response.status, response.statusText)
            throw new Error(`Server error: ${response.statusText}`)
          }

          const data = await response.json()
          console.log("Upload successful. Response:", data)
          setEmotionResult(data.emotion)
        } catch (error) {
          console.error("Upload error:", error)
          setEmotionResult(null)
        } finally {
          setIsLoading(false)
          audioChunks.current = []
          stream.getTracks().forEach((track) => track.stop())
        }
      }

      mediaRecorder.current = recorder
      recorder.start(100) // Collect data every 100ms
      setIsRecording(true)
      console.log("Recording started")
    } catch (error) {
      console.error("Error starting recording:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop()
      setIsRecording(false)
      console.log("Stopping recording")
    }
  }

  const handleTryModel = (model: Model) => {
    if (isRecording && activeModel?.id === model.id) {
      stopRecording()
    } else {
      startRecording(model)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#13071E] to-[#1E0B33] py-24">
      {/* Hero Section */}
      <div className="container mx-auto mb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl rounded-xl border border-purple-500/20 bg-black/40 p-10 text-center backdrop-blur-sm shadow-[0_0_30px_rgba(147,51,234,0.2)]"
        >
          <div className="relative inline-block">
            <h2 className="mb-6 text-4xl font-bold text-white">
              Experience Our{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-violet-500">
                Emotion-Sensing AI
              </span>
            </h2>
            <div className="absolute -right-6 -top-6 text-purple-400 animate-pulse">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
          <p className="mb-8 text-xl text-slate-300">
            Our revolutionary VibeSense AI can detect your emotions through voice analysis and respond accordingly. It
            understands how you feel and adapts its responses to match your emotional state in real-time.
          </p>

          {/* Enhanced CTA button */}
          <div className="flex justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="relative group">
              {/* Animated border */}
              <motion.div
                className="absolute -inset-[2px] rounded-lg bg-gradient-to-r from-violet-600 via-purple-500 to-violet-600"
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

              {/* Animated glow effect */}
              <motion.div
                className="absolute -inset-1 rounded-lg opacity-30 blur-md bg-purple-500"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              <Button
                asChild
                size="lg"
                className="relative flex items-center gap-2 bg-black/80 backdrop-blur-sm border-0 px-8 py-7 text-lg font-bold text-white hover:bg-black/90 transition-all duration-300"
              >
                <Link href="/explore" className="flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-purple-300" />
                  <span className="mr-2">Tap to Experience Our AI!</span>
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <HeartPulse className="h-5 w-5 text-pink-400" />
                  </motion.div>
                </Link>
              </Button>

              {/* Floating particles around button on hover */}
              <div className="absolute -inset-8 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-purple-400/60"
                    initial={{
                      width: Math.random() * 4 + 2,
                      height: Math.random() * 4 + 2,
                      x: Math.random() * 100 - 50,
                      y: Math.random() * 100 - 50,
                      opacity: 0,
                    }}
                    animate={{
                      x: [null, Math.random() * 150 - 75],
                      y: [null, Math.random() * 150 - 75],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: Math.random() * 2 + 1,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
            Our{" "}
            <span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">Models</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-slate-300">
            Explore our range of advanced AI models designed for various applications and environments.
          </p>
        </motion.div>
        <Card className="overflow-hidden border border-purple-500/30 bg-black/40 backdrop-blur-sm shadow-[0_0_30px_rgba(147,51,234,0.3)]">
          <CardContent className="p-0">
            <div className="relative p-8">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl"></div>
              <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl"></div>

              <h3 className="relative mb-6 text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Try Out These Samples
              </h3>

              <div className="grid gap-6 md:grid-cols-2">
                {[
                  { emotion: "Happy", text1: "I am so happy today!", text2: "This is the best day ever." },
                  { emotion: "Sad", text1: "I feel really down today.", text2: "I miss my old friends a lot." },
                  {
                    emotion: "Angry",
                    text1: "I can't believe this is happening!",
                    text2: "This is so frustrating, yaar!",
                  },
                  {
                    emotion: "Neutral",
                    text1: "I went to the shop to buy some milk.",
                    text2: "Today was a normal day.",
                  },
                ].map(({ emotion, text1, text2 }) => (
                  <div
                    key={emotion}
                    className="rounded-xl border border-purple-500/20 bg-black/50 p-4 backdrop-blur-md transition-all hover:border-purple-500/40 hover:shadow-[0_0_15px_rgba(147,51,234,0.2)]"
                  >
                    <h4 className="mb-3 font-semibold text-purple-400">{emotion}</h4>
                    <p className="text-slate-300">1. {text1}</p>
                    <p className="text-slate-300">2. {text2}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {models.map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <Card className="group relative overflow-hidden border border-purple-500/20 bg-black/40 backdrop-blur-sm transition-all hover:border-purple-500 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]">
                <div className="aspect-square w-full overflow-hidden bg-black/60 p-6">
                  <motion.img
                    src={model.image}
                    alt={model.name}
                    className="h-full w-full object-contain transition-transform group-hover:scale-110"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13071E] to-transparent opacity-70"></div>
                </div>
                <CardContent className="relative z-10 p-6">
                  <h3 className="mb-2 text-2xl font-bold text-white">{model.name}</h3>
                  <p className="mb-4 text-slate-300">{model.description}</p>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm text-slate-400">Accuracy</span>
                    <span className="text-sm font-medium text-purple-400">{model.specs.accuracy || "N/A"}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700 shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all duration-300"
                      onClick={() => setSelectedModel(model)}
                    >
                      View Details
                    </Button>
                    <Button
                      className={`flex-1 ${
                        isRecording && activeModel?.id === model.id
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
                      } text-white shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all duration-300 flex items-center justify-center gap-1`}
                      onClick={() => handleTryModel(model)}
                    >
                      {isRecording && activeModel?.id === model.id ? (
                        <>
                          <MicOff className="h-4 w-4" /> Stop
                        </>
                      ) : (
                        <>
                          <Mic className="h-4 w-4" /> Record
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 -z-10 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="absolute inset-0 -z-10 bg-purple-500 opacity-5 blur-xl"></div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal for model details */}
      <AnimatePresence>
        {selectedModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
            onClick={() => setSelectedModel(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-xl border border-purple-500/30 bg-gradient-to-br from-black to-purple-900/20 backdrop-blur-lg p-0 shadow-[0_0_30px_rgba(147,51,234,0.3)]"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-purple-400 backdrop-blur-sm hover:bg-black/80 hover:text-purple-300"
                onClick={() => setSelectedModel(null)}
              >
                <X className="h-5 w-5" />
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="aspect-square bg-black/50 p-8">
                  <motion.img
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={selectedModel.image}
                    alt={selectedModel.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex flex-col p-8">
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4 text-3xl font-bold text-white"
                  >
                    {selectedModel.name}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-6 text-slate-300"
                  >
                    {selectedModel.description}
                  </motion.p>

                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-3 text-xl font-semibold text-purple-400"
                  >
                    Specifications
                  </motion.h3>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-6 space-y-3"
                  >
                    {Object.entries(selectedModel.specs).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.3 + index * 0.1,
                        }}
                        className="flex justify-between border-b border-purple-500/20 pb-2"
                      >
                        <span className="font-medium capitalize text-purple-300">{key}</span>
                        <span className="text-slate-300">{value}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-auto"
                  >
                    <Button
                      className={`w-full ${
                        isRecording && activeModel?.id === selectedModel.id
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
                      } text-white shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all duration-300 flex items-center justify-center gap-2`}
                      onClick={() => handleTryModel(selectedModel)}
                    >
                      {isRecording && activeModel?.id === selectedModel.id ? (
                        <>
                          <MicOff className="h-5 w-5 animate-pulse text-red-200" /> Stop Recording
                        </>
                      ) : (
                        <>
                          <Mic className="h-5 w-5" /> Start Recording
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Futuristic Loading and Result Overlay */}
      <AnimatePresence>
        {(isLoading || emotionResult) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative flex flex-col items-center justify-center rounded-2xl border border-purple-500/30 bg-black/80 p-12 shadow-[0_0_50px_rgba(147,51,234,0.4)]"
            >
              {isLoading ? (
                <div className="flex flex-col items-center">
                  <div className="relative mb-8 h-32 w-32">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-24 w-24 rounded-full border-4 border-transparent border-t-purple-500 animate-spin"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="h-16 w-16 rounded-full border-4 border-transparent border-t-violet-500 animate-spin"
                        style={{
                          animationDirection: "reverse",
                          animationDuration: "1.5s",
                        }}
                      ></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="h-8 w-8 rounded-full border-4 border-transparent border-t-pink-500 animate-spin"
                        style={{ animationDuration: "0.75s" }}
                      ></div>
                    </div>
                  </div>
                  <motion.p
                    className="text-xl font-medium text-purple-300"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2,
                    }}
                  >
                    Analyzing voice patterns...
                  </motion.p>
                </div>
              ) : (
                emotionResult && (
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        damping: 10,
                        stiffness: 100,
                      }}
                      className="mb-8 flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-violet-600 to-pink-600 p-1 shadow-[0_0_30px_rgba(147,51,234,0.6)]"
                    >
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-black/80 text-center">
                        <h2 className="text-4xl font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                          {emotionResult}
                        </h2>
                      </div>
                    </motion.div>
                    <div className="space-y-4 text-center">
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl font-medium text-purple-300"
                      >
                        Detected Emotion
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Button
                          onClick={() => setEmotionResult(null)}
                          className="bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700"
                        >
                          Continue
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                )
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
