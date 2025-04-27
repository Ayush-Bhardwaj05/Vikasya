"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface VoiceWaveformProps {
  isActive: boolean
}

export default function VoiceWaveform({ isActive }: VoiceWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let animationFrameId: number
    let hue = 210 // Starting hue - blue

    const lines: {
      y: number
      length: number
      amplitude: number
      frequency: number
      offset: number
    }[] = []

    // Create lines with random properties
    for (let i = 0; i < 5; i++) {
      lines.push({
        y: canvas.height / 2,
        length: canvas.width + 20,
        amplitude: Math.random() * 50 + 50,
        frequency: Math.random() * 0.02 + 0.001,
        offset: Math.random() * 100,
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      lines.forEach((line, index) => {
        ctx.beginPath()

        const lineWidth = isActive ? 3 : 2
        const alpha = isActive ? 0.5 : 0.3
        const amplitudeModifier = isActive ? 1.5 : 1

        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        gradient.addColorStop(0, `hsla(${hue}, 100%, 70%, ${alpha})`)
        gradient.addColorStop(0.5, `hsla(${hue + 40}, 100%, 70%, ${alpha})`)
        gradient.addColorStop(1, `hsla(${hue}, 100%, 70%, ${alpha})`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = lineWidth

        // Draw wave
        for (let x = 0; x <= line.length; x++) {
          const y = line.y + Math.sin((x + line.offset) * line.frequency) * line.amplitude * amplitudeModifier
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.stroke()

        // Update offset for animation
        line.offset += isActive ? 5 : 2
      })

      // Slowly change hue for color cycling effect
      hue = (hue + 0.1) % 360

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isActive])

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="h-full w-full"
    />
  )
}

