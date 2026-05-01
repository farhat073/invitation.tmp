import { useEffect, useRef, useState, useCallback } from 'react'

const WEDDING_DATE = new Date('2026-06-07T13:30:00+05:30')

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(): TimeLeft {
  const now = new Date()
  const diff = WEDDING_DATE.getTime() - now.getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function CountdownScratch() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft())
  const isDrawing = useRef(false)
  const scratchPercentage = useRef(0)

  // Live countdown
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Initialize scratch canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || revealed) return

    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.scale(dpr, dpr)

    // Gold metallic scratch surface
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height)
    gradient.addColorStop(0, '#A8872B')
    gradient.addColorStop(0.2, '#D4AF37')
    gradient.addColorStop(0.4, '#F4D980')
    gradient.addColorStop(0.5, '#FFFFFF')
    gradient.addColorStop(0.6, '#F4D980')
    gradient.addColorStop(0.8, '#D4AF37')
    gradient.addColorStop(1, '#A8872B')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, rect.width, rect.height)

    // Add texture pattern
    ctx.globalAlpha = 0.15
    for (let i = 0; i < rect.width; i += 3) {
      for (let j = 0; j < rect.height; j += 3) {
        if (Math.random() > 0.5) {
          ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.3})`
          ctx.fillRect(i, j, 2, 2)
        }
      }
    }
    ctx.globalAlpha = 1

    // "SCRATCH HERE" text
    ctx.fillStyle = '#043927'
    ctx.font = `bold ${Math.min(14, rect.width * 0.04)}px "Cinzel", serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('✦ SCRATCH TO REVEAL ✦', rect.width / 2, rect.height / 2 - 10)
    ctx.font = `${Math.min(11, rect.width * 0.03)}px "Cinzel", serif`
    ctx.fillText('How many days until the Royal Day?', rect.width / 2, rect.height / 2 + 15)

    // Decorative border
    ctx.strokeStyle = '#043927'
    ctx.lineWidth = 2
    ctx.globalAlpha = 0.4
    const inset = 8
    ctx.strokeRect(inset, inset, rect.width - inset * 2, rect.height - inset * 2)
    ctx.globalAlpha = 1

    // Corner diamonds
    const drawDiamond = (x: number, y: number, size: number) => {
      ctx.beginPath()
      ctx.moveTo(x, y - size)
      ctx.lineTo(x + size, y)
      ctx.lineTo(x, y + size)
      ctx.lineTo(x - size, y)
      ctx.closePath()
      ctx.fillStyle = '#043927'
      ctx.globalAlpha = 0.5
      ctx.fill()
      ctx.globalAlpha = 1
    }
    drawDiamond(20, 20, 5)
    drawDiamond(rect.width - 20, 20, 5)
    drawDiamond(20, rect.height - 20, 5)
    drawDiamond(rect.width - 20, rect.height - 20, 5)
  }, [revealed])

  const scratch = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    if (!canvas || revealed) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    const x = (clientX - rect.left)
    const y = (clientY - rect.top)

    ctx.globalCompositeOperation = 'destination-out'
    
    // Main scratch circle
    const radius = 28
    ctx.beginPath()
    ctx.arc(x * dpr, y * dpr, radius * dpr, 0, Math.PI * 2)
    ctx.fill()

    // Outer glow
    const glowGradient = ctx.createRadialGradient(x * dpr, y * dpr, radius * dpr * 0.5, x * dpr, y * dpr, radius * dpr * 1.5)
    glowGradient.addColorStop(0, 'rgba(0,0,0,1)')
    glowGradient.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = glowGradient
    ctx.beginPath()
    ctx.arc(x * dpr, y * dpr, radius * dpr * 1.5, 0, Math.PI * 2)
    ctx.fill()

    ctx.globalCompositeOperation = 'source-over'

    // Calculate scratch percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let transparent = 0
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++
    }
    scratchPercentage.current = (transparent / (imageData.data.length / 4)) * 100

    // Auto-reveal at 40%
    if (scratchPercentage.current > 40 && !revealed) {
      setRevealed(true)
    }
  }, [revealed])

  const handleMouseDown = (e: React.MouseEvent) => { 
    isDrawing.current = true 
    scratch(e.clientX, e.clientY)
  }
  const handleMouseUp = () => { isDrawing.current = false }
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDrawing.current) scratch(e.clientX, e.clientY)
  }
  const handleTouchStart = (e: React.TouchEvent) => {
    isDrawing.current = true
    const touch = e.touches[0]
    scratch(touch.clientX, touch.clientY)
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.cancelable) {
      e.preventDefault()
    }
    const touch = e.touches[0]
    if (isDrawing.current) {
      scratch(touch.clientX, touch.clientY)
    }
  }

  return (
    <div className="countdown-scratch-wrapper" id="countdown">
      <div className="scratch-label gold-shimmer">✦ The Royal Countdown ✦</div>

      <div
        className={`scratch-card ${revealed ? 'revealed' : ''}`}
        ref={containerRef}
      >
        {/* Countdown content underneath */}
        <div className="countdown-content">
          <div className="countdown-grid">
            <div className="countdown-unit">
              <span className="countdown-number gold-shimmer">{timeLeft.days}</span>
              <span className="countdown-label">Days</span>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-unit">
              <span className="countdown-number gold-shimmer">{timeLeft.hours}</span>
              <span className="countdown-label">Hours</span>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-unit">
              <span className="countdown-number gold-shimmer">{timeLeft.minutes}</span>
              <span className="countdown-label">Minutes</span>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-unit">
              <span className="countdown-number gold-shimmer">{timeLeft.seconds}</span>
              <span className="countdown-label">Seconds</span>
            </div>
          </div>
          <div className="countdown-subtitle">Until the Grand Celebration</div>
          <div className="countdown-date">7th June 2026</div>
        </div>

        {/* Scratch canvas overlay */}
        {!revealed && (
          <canvas
            ref={canvasRef}
            className="scratch-canvas"
            style={{ touchAction: 'none' }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={() => { isDrawing.current = false }}
            onTouchMove={handleTouchMove}
          />
        )}

        {/* Reveal particles */}
        {revealed && (
          <div className="reveal-particles">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="reveal-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${0.8 + Math.random() * 1}s`,
                  width: `${3 + Math.random() * 6}px`,
                  height: `${3 + Math.random() * 6}px`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {!revealed && (
        <div className="scratch-hint">Use your finger or mouse to scratch</div>
      )}
    </div>
  )
}
