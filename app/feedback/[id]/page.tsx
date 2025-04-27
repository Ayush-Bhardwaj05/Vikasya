"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { Mic, MicOff, ArrowLeft, Check, Loader2, Type, Keyboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

export default function FeedbackPage() {
  const { id } = useParams()
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [responseText, setResponseText] = useState("")
  const [communitySummary, setCommunitySummary] = useState("")
  const [browserSupported, setBrowserSupported] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [districtName, setDistrictName] = useState("Your District")
  const [loadingSummary, setLoadingSummary] = useState(false)
  const [inputMode, setInputMode] = useState<"voice" | "text">("voice")
  const recognitionRef = useRef<any>(null)
  const transcriptEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [transcript])

  useEffect(() => {
    const getLocation = async () => {
      try {
        if (navigator.geolocation) {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 10000
            })
          })
          setDistrictName("Mailsandra")
        }
      } catch (error) {
        console.error("Error getting location:", error)
      }
    }

    if (typeof window === "undefined") return

    if (!('webkitSpeechRecognition' in window)) {
      setBrowserSupported(false)
      setInputMode("text")
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

    getLocation()

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  useEffect(() => {
    const loadCommunitySummary = async () => {
      if (!districtName || districtName === "Your District") return
      
      setLoadingSummary(true)
      try {
        const response = await fetch(
          `https://vikasya-rag-backend.onrender.com/summary/${encodeURIComponent(districtName)}/${encodeURIComponent(getCategoryTitle(id as string))}`
        )
        
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`)
        // }

        const data = await response.json()
        setCommunitySummary(data.summary || "No community feedback available yet.")
      } catch (error) {
        console.error("Failed to load community summary:", error)
        setCommunitySummary("Could not load community feedback at this time.")
      } finally {
        setLoadingSummary(false)
      }
    }

    loadCommunitySummary()
  }, [districtName, id])

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
      setResponseText("")
    }
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsRecording(false)
  }

  const toggleInputMode = () => {
    if (isRecording) stopRecording()
    setInputMode(prev => prev === "voice" ? "text" : "voice")
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTranscript(e.target.value)
  }

  const submitFeedback = async () => {
    if (!transcript.trim()) {
      alert("Please provide some feedback first")
      return
    }

    setIsSubmitting(true)
    
    try {
      const response = await fetch('https://vikasya-rag-backend.onrender.com/submit_feedback/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          district_name: districtName,
          service_type: getCategoryTitle(id as string),
          user_feedback: transcript
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setResponseText(data.response)
      setIsSuccess(true)
      setTranscript("")
      
      const summaryResponse = await fetch(
        `https://vikasya-rag-backend.onrender.com/summary/${encodeURIComponent(districtName)}/${encodeURIComponent(getCategoryTitle(id as string))}`
      )
      if (summaryResponse.ok) {
        const summaryData = await summaryResponse.json()
        setCommunitySummary(summaryData.summary)
      }
    } catch (error) {
      console.error("Submission failed:", error)
      alert("Failed to submit feedback. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!browserSupported && inputMode === "voice") {
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
              Speech recognition is not supported in your browser. Please try Google Chrome or switch to text input.
            </p>
            <Button 
              onClick={() => setInputMode("text")}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Type className="mr-2 h-4 w-4" />
              Switch to Text Input
            </Button>
            <div className="mt-4 flex items-center gap-2 text-yellow-400">
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Provide Your Feedback</h2>
            <Button 
              onClick={toggleInputMode}
              variant="outline"
              className="relative w-12 h-6 p-0 bg-gradient-to-r from-gray-800 to-gray-900 border-purple-500/50 hover:border-purple-400/70 rounded-full transition-all duration-300 group"
            >
              <span className={`absolute inset-0 flex items-center transition-transform duration-300 ${inputMode === 'voice' ? 'translate-x-0' : 'translate-x-6'}`}>
                {inputMode === 'voice' ? (
                  <span className="w-6 h-6 flex items-center justify-center bg-purple-600 rounded-full group-hover:bg-purple-500">
                    <Mic className="h-3 w-3 text-white" />
                  </span>
                ) : (
                  <span className="w-6 h-6 flex items-center justify-center bg-purple-600 rounded-full group-hover:bg-purple-500">
                    <Keyboard className="h-3 w-3 text-white" />
                  </span>
                )}
              </span>
              <span className="absolute inset-0 flex items-center justify-center text-xs text-purple-300 group-hover:text-purple-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {inputMode === 'voice' ? 'Text' : 'Voice'}
              </span>
            </Button>
          </div>
          
          <p className="text-purple-300 mb-4">District: {districtName} | Service: {getCategoryTitle(id as string)}</p>
          
          {inputMode === 'voice' ? (
            <>
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
            </>
          ) : (
            <>
              <div className="relative mb-6">
                <Textarea
                  value={transcript}
                  onChange={handleTextChange}
                  className="min-h-[180px] w-full bg-gray-900/50 backdrop-blur-sm 
                            border-2 border-purple-500/30 focus:border-purple-400/60
                            text-purple-100 placeholder-purple-400
                            rounded-xl p-4 pr-12 resize-none
                            transition-all duration-300 ease-in-out
                            hover:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20"
                  placeholder="Share your thoughts about this service..."
                />
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <span className={`text-xs ${transcript.length > 0 ? 'text-purple-300' : 'text-purple-400/50'}`}>
                    {transcript.length}/500
                  </span>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={submitFeedback}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700
                            text-white shadow-lg shadow-green-900/30
                            px-6 py-3 rounded-xl font-medium
                            transition-all duration-200 hover:shadow-green-900/40
                            disabled:opacity-60 disabled:pointer-events-none"
                  disabled={isSubmitting || isSuccess || !transcript.trim()}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : isSuccess ? (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      Feedback Submitted!
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>

        {responseText && (
          <div className="mb-6 bg-gradient-to-br from-[#1A0B2E] to-[#2E0B33] rounded-xl border border-purple-500/30 p-6">
            <h3 className="text-lg font-semibold text-purple-300 mb-3">Response from Public Services</h3>
            <div className="text-purple-100 whitespace-pre-wrap">
              {responseText}
            </div>
          </div>
        )}

        <div className="mb-6 bg-gradient-to-br from-[#1A0B2E] to-[#2E0B33] rounded-xl border border-purple-500/30 p-6">
          <h3 className="text-lg font-semibold text-purple-300 mb-3 flex items-center gap-2">
            Community Feedback Summary
            <span className="text-xs bg-purple-900/50 px-2 py-1 rounded-full">
              {districtName} • {getCategoryTitle(id as string)}
            </span>
          </h3>
          {loadingSummary ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-5 w-5 animate-spin text-purple-400" />
              <span className="ml-2 text-purple-300">Loading community feedback...</span>
            </div>
          ) : (
            <div className="text-purple-100 whitespace-pre-wrap">
              {communitySummary || "No community feedback available yet."}
            </div>
          )}
          <div className="mt-3 text-xs text-purple-400">
            This summary is generated from feedback submitted by other users in your area.
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

function getCategoryTitle(id: string): string {
  const titles: Record<string, string> = {
    "1": "Public Sanitation",
    "2": "Garbage Collection",
    "3": "Road Conditions",
    "4": "Street Lighting",
    "5": "Water Supply",
    "6": "Public Transport",
    "7": "Noise Pollution",
    "8": "Green Spaces",
    "9": "Public Safety",
    "10": "Other Services"
  }
  return titles[id] || "Public Service"
}

function getCategoryDescription(id: string): string {
  const descriptions: Record<string, string> = {
    "1": "Public sanitation issues including cleanliness of public toilets and waste management. Recent reports indicate 65% dissatisfaction with current conditions.",
    "2": "Garbage collection services including schedule reliability and coverage. Many residents report missed pickups and overflowing bins.",
    "3": "Road conditions including potholes and maintenance quality. Over 120 potholes reported in this area last month.",
    "4": "Street lighting issues including non-functional lights and inadequate coverage in certain areas.",
    "5": "Water supply problems including irregular timing and water quality concerns.",
    "6": "Public transport complaints including bus frequency and condition of vehicles.",
    "7": "Noise pollution from construction, traffic, or commercial establishments.",
    "8": "Maintenance and quality of public parks and green spaces.",
    "9": "Public safety concerns including police visibility and response times.",
    "10": "Other public service issues not covered by specific categories."
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
    ),
    "4": (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    ),
    "5": (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 4h14l1 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z"/><line x1="6" y1="8" x2="6" y2="18"/>
        <line x1="18" y1="8" x2="18" y2="18"/>
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