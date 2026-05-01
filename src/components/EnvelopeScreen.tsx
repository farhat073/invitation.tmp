import { useState } from 'react'

interface EnvelopeScreenProps {
  onOpen: () => void
  opened: boolean
}

export default function EnvelopeScreen({ onOpen, opened }: EnvelopeScreenProps) {
  const [opening, setOpening] = useState(false)

  const handleClick = () => {
    if (opening) return
    setOpening(true)
    // Haptic feedback if available
    if (navigator.vibrate) navigator.vibrate(50)
    setTimeout(() => {
      onOpen()
    }, 2000)
  }

  return (
    <div className={`envelope-screen ${opened ? 'opened' : ''}`}>
      {/* Ambient gold particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${4 + Math.random() * 6}s`,
            animationDelay: `${Math.random() * 5}s`,
            width: `${1 + Math.random() * 3}px`,
            height: `${1 + Math.random() * 3}px`,
          }}
        />
      ))}

      <div
        className={`envelope-container ${opening ? 'opening' : ''}`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Open wedding invitation"
      >
        {/* Envelope body */}
        <div className="envelope-body" />

        {/* Envelope flap */}
        <div className="envelope-flap">
          <div className="envelope-flap-face" />
        </div>

        {/* Wax seal with RS monogram */}
        <div className="wax-seal">
          <div className="seal-circle">
            <span className="seal-monogram">RS</span>
          </div>
        </div>

        {/* Card that slides out */}
        <div className="envelope-card">
          <span className="envelope-card-text">You're Invited</span>
        </div>

        {!opening && (
          <div className="envelope-hint">Tap to Open</div>
        )}
      </div>
    </div>
  )
}
