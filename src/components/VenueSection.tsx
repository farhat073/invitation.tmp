import CornerOrnaments from './CornerOrnaments'

export default function VenueSection() {
  return (
    <div className="section-card venue-section" id="venue">
      <CornerOrnaments />
      <div className="venue-icon">🏛️</div>
      <div className="venue-label gold-shimmer">The Venue</div>

      <div className="ornament-divider" style={{ margin: '16px auto', maxWidth: '160px' }}>
        <span className="ornament-line" />
        <span className="ornament-diamond" />
        <span className="ornament-line" />
      </div>

      <p className="venue-address">
        At our residence:<br />
        <strong>Pushu Market, Nazuk Mohalla,<br />Anantnag</strong>
      </p>

      <a
        href="https://maps.google.com/?q=Pushu+Market+Nazuk+Mohalla+Anantnag"
        target="_blank"
        rel="noopener noreferrer"
        className="royal-btn"
        id="view-location-btn"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        View Royal Location
      </a>
    </div>
  )
}
