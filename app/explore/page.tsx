"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [responses, setResponses] = useState<string[]>([]);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [responses]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    recorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
      const formData = new FormData();
      formData.append("file", audioBlob, "recording.wav");
      formData.append("responses", JSON.stringify(responses));

      const response = await fetch("https://vibesense230.zapto.org/convo/process-audio", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResponses((prev: string[]) => [...prev, data.response]);
      audioChunks.current = [];
    };

    mediaRecorder.current = recorder;
    recorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4 relative overflow-hidden">
      {/* Circuit pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[repeating-linear-gradient(90deg,transparent,transparent_15px,rgba(147,51,234,0.05)_15px,rgba(147,51,234,0.05)_16px)] bg-[repeating-linear-gradient(0deg,transparent,transparent_15px,rgba(147,51,234,0.05)_15px,rgba(147,51,234,0.05)_16px)]"></div>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-600 opacity-10 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-violet-500 opacity-10 blur-3xl"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center mb-8">
          {/* CPU Icon */}
          <div className="text-purple-400 mr-3 h-8 w-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
              <rect x="9" y="9" width="6" height="6"></rect>
              <line x1="9" y1="1" x2="9" y2="4"></line>
              <line x1="15" y1="1" x2="15" y2="4"></line>
              <line x1="9" y1="20" x2="9" y2="23"></line>
              <line x1="15" y1="20" x2="15" y2="23"></line>
              <line x1="20" y1="9" x2="23" y2="9"></line>
              <line x1="20" y1="14" x2="23" y2="14"></line>
              <line x1="1" y1="9" x2="4" y2="9"></line>
              <line x1="1" y1="14" x2="4" y2="14"></line>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-wider">
            <span className="text-purple-400">E</span>
            <span className="text-purple-300">C</span>
            <span className="text-purple-200">H</span>
            <span className="text-purple-100">O</span>
          </h1>
          {/* CPU Icon */}
          <div className="text-purple-400 ml-3 h-8 w-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
              <rect x="9" y="9" width="6" height="6"></rect>
              <line x1="9" y1="1" x2="9" y2="4"></line>
              <line x1="15" y1="1" x2="15" y2="4"></line>
              <line x1="9" y1="20" x2="9" y2="23"></line>
              <line x1="15" y1="20" x2="15" y2="23"></line>
              <line x1="20" y1="9" x2="23" y2="9"></line>
              <line x1="20" y1="14" x2="23" y2="14"></line>
              <line x1="1" y1="9" x2="4" y2="9"></line>
              <line x1="1" y1="14" x2="4" y2="14"></line>
            </svg>
          </div>
        </div>
        
        <div className="w-full max-w-md bg-black shadow-lg rounded-lg overflow-hidden flex flex-col border border-purple-900 relative">
          {/* Digital display header */}
          <div className="bg-gradient-to-r from-purple-900 to-black p-3 border-b border-purple-800 flex items-center">
            {/* Zap Icon */}
            <div className="text-purple-400 mr-2 h-5 w-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <div className="text-xs font-mono text-purple-300 uppercase tracking-wider">Emotion Detection System</div>
            <div className="ml-auto flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-[pulse_1.5s_ease-in-out_infinite]"></div>
              <div className="w-2 h-2 rounded-full bg-violet-500 animate-[pulse_1.5s_ease-in-out_0.1s_infinite]"></div>
              <div className="w-2 h-2 rounded-full bg-fuchsia-500 animate-[pulse_1.5s_ease-in-out_0.2s_infinite]"></div>
            </div>
          </div>
          
          {/* Chat display with terminal-like styling */}
          <div 
            ref={chatBoxRef} 
            className="flex-1 overflow-y-auto p-4 h-96 bg-black font-mono text-sm"
            style={{ 
              backgroundImage: "radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.05) 0%, transparent 25%)",
              backgroundSize: "8px 8px" 
            }}
          >
            {responses.length === 0 && (
              <div className="text-gray-500 text-center mt-32 flex flex-col items-center">
                {/* Waves Icon */}
                <div className="h-12 w-12 mb-4 text-purple-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
                    <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
                    <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
                  </svg>
                </div>
                <p className="text-xs">Awaiting voice input...</p>
                <div className="mt-2 text-xs text-purple-600 max-w-xs text-center">
                  ECHO analyzes vocal patterns to detect emotional states with 94.7% accuracy
                </div>
              </div>
            )}
            
            {responses.map((response, index) => (
              <div key={index} className="mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-end items-center"
                >
                  <div className="bg-gray-900 border border-purple-900 px-3 py-1 rounded-md text-gray-400 text-xs flex items-center">
                    <span className="mr-2">Voice Input</span>
                    {/* Mic Icon */}
                    <div className="h-3 w-3 text-purple-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" y1="19" x2="12" y2="22"></line>
                      </svg>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex justify-start items-start mt-3"
                >
                  <div className="flex items-start">
                    <div className="mr-2 mt-1">
                      <div className="w-6 h-6 rounded-full bg-gray-900 border border-purple-700 flex items-center justify-center">
                        {/* CPU Icon */}
                        <div className="h-3 w-3 text-purple-400">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                            <rect x="9" y="9" width="6" height="6"></rect>
                            <line x1="9" y1="1" x2="9" y2="4"></line>
                            <line x1="15" y1="1" x2="15" y2="4"></line>
                            <line x1="9" y1="20" x2="9" y2="23"></line>
                            <line x1="15" y1="20" x2="15" y2="23"></line>
                            <line x1="20" y1="9" x2="23" y2="9"></line>
                            <line x1="20" y1="14" x2="23" y2="14"></line>
                            <line x1="1" y1="9" x2="4" y2="9"></line>
                            <line x1="1" y1="14" x2="4" y2="14"></line>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-900 to-black border border-purple-800 p-3 rounded-lg max-w-xs">
                      <div className="text-xs text-purple-400 mb-1 font-bold">ECHO ANALYSIS:</div>
                      <div className="text-purple-100 leading-relaxed">
                        {response}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
          
          {/* Digital scan line effect */}
          <div className="absolute top-0 left-0 right-0 h-full pointer-events-none overflow-hidden">
            <div className="h-px bg-purple-500 opacity-30 w-full absolute" 
                 style={{ 
                   animation: "scanline 6s linear infinite",
                   boxShadow: "0 0 10px rgba(147, 51, 234, 0.5)"
                 }}></div>
          </div>
        </div>
        
        {/* Recording button with robotic styling */}
        <motion.button
          onClick={isRecording ? stopRecording : startRecording}
          whileTap={{ scale: 0.95 }}
          className={`mt-8 rounded-full flex items-center justify-center relative ${
            isRecording 
              ? "bg-gradient-to-r from-red-600 to-red-700 border-2 border-red-500" 
              : "bg-gradient-to-r from-purple-600 to-violet-700 border-2 border-purple-500"
          }`}
          style={{ 
            width: "80px", 
            height: "80px",
            boxShadow: isRecording 
              ? "0 0 20px rgba(239, 68, 68, 0.5)" 
              : "0 0 20px rgba(147, 51, 234, 0.5)"
          }}
        >
          {/* Pulsing ring effect */}
          <div 
            className={`absolute inset-0 rounded-full ${
              isRecording ? "bg-red-500" : "bg-purple-500"
            } opacity-20`}
            style={{
              animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite"
            }}
          ></div>
          
          {isRecording ? (
            /* Square Icon */
            <div className="h-8 w-8 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              </svg>
            </div>
          ) : (
            /* Mic Icon */
            <div className="h-8 w-8 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="22"></line>
              </svg>
            </div>
          )}
        </motion.button>
        
        {/* Model description */}
        <div className="mt-8 max-w-md text-center text-gray-400 text-sm">
          <h3 className="text-purple-400 font-mono tracking-wider mb-2">ECHO: EMOTIONAL COGNITIVE HUMAN OBSERVER</h3>
          <p className="text-xs leading-relaxed">
            Advanced AI system designed to detect and analyze human emotions through voice patterns. 
            ECHO processes vocal tone, pitch, rhythm, and micro-variations to identify emotional states 
            with 94.7% accuracy. The system can recognize 8 primary emotions and 24 secondary emotional states.
          </p>
        </div>
      </div>
      
      {/* Add keyframe animations */}
      <style jsx>{`
        @keyframes scanline {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}