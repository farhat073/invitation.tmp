import { useState, useRef } from 'react'

interface EnvelopeScreenProps {
  onOpen: () => void
  opened: boolean
}

export default function EnvelopeScreen({ onOpen, opened }: EnvelopeScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlay = () => {
    if (videoRef.current && !isPlaying) {
      videoRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch((e) => {
        console.error("Video playback failed", e)
      })
    }
  }

  const handleVideoEnd = () => {
    onOpen()
  }

  return (
    <div 
      className={`video-intro-screen ${opened ? 'opened' : ''}`}
      onClick={!isPlaying ? handlePlay : undefined}
      style={{ cursor: !isPlaying ? 'pointer' : 'default' }}
    >
      <video
        ref={videoRef}
        className="intro-video"
        src="/starter-video.mp4"
        playsInline
        onEnded={handleVideoEnd}
      />

      <div className={`tap-to-open-overlay ${isPlaying ? 'fading-out' : ''}`}>
        <div className="arabic-styled-text gold-shimmer">
          Tap to Open
        </div>
      </div>
    </div>
  )
}
