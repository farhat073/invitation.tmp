import { useState, useRef } from 'react'

interface EnvelopeScreenProps {
  onOpen: () => void
  opened: boolean
}

export default function EnvelopeScreen({ onOpen, opened }: EnvelopeScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const fallbackTimeout = useRef<number | null>(null)

  const handlePlay = () => {
    if (videoRef.current && !isPlaying) {
      // Start the video
      videoRef.current.play().then(() => {
        setIsPlaying(true)
        // Fallback: if video hangs or doesn't trigger onEnded
        fallbackTimeout.current = window.setTimeout(() => {
          onOpen()
        }, 8000) // 8 second safety timeout
      }).catch((e) => {
        console.error("Video playback failed", e)
        // If playback fails (e.g. browser blocks it), just skip to the main content
        onOpen()
      })
    }
  }

  const handleVideoEnd = () => {
    if (fallbackTimeout.current) clearTimeout(fallbackTimeout.current)
    onOpen()
  }

  return (
    <div 
      className={`video-intro-screen ${opened ? 'opened' : ''}`}
      onClick={!isPlaying ? handlePlay : undefined}
      style={{ cursor: !isPlaying ? 'pointer' : 'default', touchAction: 'manipulation' }}
    >
      <video
        ref={videoRef}
        className="intro-video"
        src="/starter-video.mp4"
        playsInline
        muted={false} // Ensure it's not muted if user interaction is guaranteed
        preload="auto"
        onEnded={handleVideoEnd}
        // Fallback for some android browsers that don't trigger onEnded reliably
        onTimeUpdate={(e) => {
          const v = e.currentTarget
          if (v.currentTime > 0 && v.currentTime >= v.duration - 0.2) {
            handleVideoEnd()
          }
        }}
      />

      <div className={`tap-to-open-overlay ${isPlaying ? 'fading-out' : ''}`}>
        <div className="arabic-styled-text gold-shimmer">
          Tap to Open
        </div>
      </div>
      
      {/* Invisible layer to ensure clicks are caught easily on mobile */}
      {!isPlaying && <div style={{ position: 'absolute', inset: 0, zIndex: 10 }} />}
    </div>
  )
}
