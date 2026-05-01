export default function CornerOrnaments() {
  const ornamentSVG = (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 2 L2 30 Q2 2 30 2 Z"
        fill="none"
        stroke="#D4AF37"
        strokeWidth="1"
      />
      <path
        d="M2 2 L2 20 Q2 2 20 2"
        fill="none"
        stroke="#D4AF37"
        strokeWidth="0.5"
        opacity="0.5"
      />
      <circle cx="8" cy="8" r="2" fill="#D4AF37" opacity="0.4" />
      <path
        d="M2 8 Q8 4 14 8 Q8 12 2 8Z"
        fill="#D4AF37"
        opacity="0.15"
      />
      <path
        d="M8 2 Q4 8 8 14 Q12 8 8 2Z"
        fill="#D4AF37"
        opacity="0.15"
      />
    </svg>
  )

  return (
    <>
      <div className="corner-ornament corner-tl">{ornamentSVG}</div>
      <div className="corner-ornament corner-tr">{ornamentSVG}</div>
      <div className="corner-ornament corner-bl">{ornamentSVG}</div>
      <div className="corner-ornament corner-br">{ornamentSVG}</div>
    </>
  )
}
