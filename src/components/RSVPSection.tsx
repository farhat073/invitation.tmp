export default function RSVPSection() {
  const phones = [
    { number: '9419090373', label: 'Line I' },
    { number: '9906813998', label: 'Line II' },
    { number: '9103693085', label: 'Line III' },
  ]

  return (
    <div className="rsvp-section scroll-reveal" id="rsvp">
      <div className="carriage-pass">
        <div className="pass-header gold-shimmer">Contact Info</div>
        <div className="pass-subtitle">Any suggestions</div>

        <div className="ornament-divider" style={{ margin: '20px auto', maxWidth: '180px' }}>
          <span className="ornament-line" />
          <span className="ornament-diamond" />
          <span className="ornament-line" />
        </div>

        <div className="rsvp-numbers">
          {phones.map((p) => (
            <a
              key={p.number}
              href={`tel:+91${p.number}`}
              className="rsvp-phone"
              id={`rsvp-phone-${p.number}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>{p.label}: {p.number}</span>
            </a>
          ))}
        </div>

        <div className="ornament-divider" style={{ margin: '20px auto', maxWidth: '180px' }}>
          <span className="ornament-line" />
          <span className="ornament-diamond" />
          <span className="ornament-line" />
        </div>
      </div>
    </div>
  )
}
