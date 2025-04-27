"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { Mic, MicOff, ArrowLeft, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FeedbackPage() {
  const { id } = useParams()
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [browserSupported, setBrowserSupported] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const recognitionRef = useRef<any>(null)
  const transcriptEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of transcript
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [transcript])

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window === "undefined") return

    if (!('webkitSpeechRecognition' in window)) {
      setBrowserSupported(false)
      return
    }
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.continuous = true
    recognitionRef.current.interimResults = true
    recognitionRef.current.lang = "en-US"

    recognitionRef.current.onresult = (event: any) => {
      let interimTranscript = ''
      let finalTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        if (result.isFinal) {
          finalTranscript += result[0].transcript + ' '
        } else {
          interimTranscript += result[0].transcript
        }
      }

      setTranscript(prev => prev + finalTranscript)
    }

    recognitionRef.current.onerror = (event: any) => {
      console.error('Speech recognition error', event.error)
      stopRecording()
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  const startRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start()
      setIsRecording(true)
      setIsSuccess(false)
    }
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsRecording(false)
  }

  const submitFeedback = async () => {
    if (!transcript.trim()) {
      alert("Please record some feedback first")
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log("Feedback submitted:", { id, transcript })
      setIsSuccess(true)
      setTranscript("")
    } catch (error) {
      console.error("Submission failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!browserSupported) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0011] to-[#1E0B33] p-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/public-issues">
            <Button variant="ghost" className="text-purple-300 hover:text-white mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Issues
            </Button>
          </Link>
          <div className="bg-gradient-to-br from-[#13071E] to-[#1E0B33] rounded-xl border border-purple-500/30 p-6 shadow-lg">
            <h2 className="text-xl font-bold text-red-400 mb-4">Browser Not Supported</h2>
            <p className="text-purple-200 mb-4">
              Speech recognition is not supported in your browser. Please try Google Chrome.
            </p>
            <div className="flex items-center gap-2 text-yellow-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span className="text-sm">Make sure you're using HTTPS connection</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0011] to-[#1E0B33] p-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/public-issues">
          <Button variant="ghost" className="text-purple-300 hover:text-white mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Issues
          </Button>
        </Link>

        <div className="bg-gradient-to-br from-[#13071E] to-[#1E0B33] rounded-xl border border-purple-500/30 p-6 mb-6 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">Record Your Feedback</h2>
          
          <div className="mb-4 p-4 min-h-32 max-h-64 overflow-y-auto bg-black/20 rounded-lg border border-purple-500/20 scrollbar-thin scrollbar-thumb-purple-900 scrollbar-track-transparent">
            {transcript ? (
              <p className="text-purple-100 whitespace-pre-wrap">{transcript}</p>
            ) : (
              <p className="text-purple-400 italic">
                {isRecording ? (
                  <span className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                    </span>
                    Listening... Speak now
                  </span>
                ) : (
                  "Press the microphone button to start recording"
                )}
              </p>
            )}
            <div ref={transcriptEndRef} />
          </div>

          <div className="flex flex-wrap gap-4">
            <Button
              onClick={toggleRecording}
              className={`flex items-center gap-2 ${
                isRecording 
                  ? "bg-red-600 hover:bg-red-700 animate-pulse" 
                  : "bg-purple-600 hover:bg-purple-700"
              } transition-all`}
              disabled={isSubmitting}
            >
              {isRecording ? (
                <>
                  <MicOff className="h-5 w-5" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="h-5 w-5" />
                  Start Recording
                </>
              )}
            </Button>

            {transcript && (
              <Button
                onClick={submitFeedback}
                className="bg-green-600 hover:bg-green-700"
                disabled={isSubmitting || isSuccess}
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : isSuccess ? (
                  <Check className="h-5 w-5" />
                ) : (
                  "Submit Feedback"
                )}
              </Button>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#13071E] to-[#1E0B33] rounded-xl border border-purple-500/30 p-6 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">About This Issue</h2>
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-purple-900/50 p-3 rounded-lg">
              {getCategoryIcon(id as string)}
            </div>
            <p className="text-purple-200 flex-1">
              {getCategoryDescription(id as string)}
            </p>
          </div>
          <div className="flex items-center gap-2 text-purple-300 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <span>Your feedback helps improve public services in your area</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function getCategoryDescription(id: string): string {
  const descriptions: Record<string, string> = {
    "1": "Public sanitation issues including cleanliness of public toilets and waste management. Recent reports indicate 65% dissatisfaction with current conditions.",
    "2": "Garbage collection services including schedule reliability and coverage. Many residents report missed pickups and overflowing bins.",
    "3": "Road conditions including potholes and maintenance quality. Over 120 potholes reported in this area last month."
  }
  return descriptions[id] || "Public service feedback category. Your input helps us prioritize improvements."
}

function getCategoryIcon(id: string): React.ReactNode {
  const icons: Record<string, React.ReactNode> = {
    "1": (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h18M3 6h18M3 18h18"/>
      </svg>
    ),
    "2": (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h18v18H3zM5 7v10M9 7v10M13 7v10M17 7v10"/>
      </svg>
    ),
    "3": (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h20M12 2v20M5 5l14 14M5 19l14-14"/>
      </svg>
    )
  }
  return icons[id] || (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  )
}