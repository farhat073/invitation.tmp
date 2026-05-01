import CornerOrnaments from './CornerOrnaments'

export default function EventsSection() {
  return (
    <div className="section-card events-section" id="events">
      <CornerOrnaments />
      <div className="section-title gold-shimmer">Programme</div>

      <div className="event-card">
        <div className="event-name gold-shimmer">Mehandiraat</div>
        <div className="event-datetime">
          <span className="date">Saturday, 6th June 2026</span>
          <span className="time">7:00 PM</span>
        </div>
      </div>

      <div className="event-card">
        <div className="event-name gold-shimmer">Lunch</div>
        <div className="event-datetime">
          <span className="date">Sunday, 7th June 2026</span>
          <span className="time">1:30 PM</span>
        </div>
      </div>

      <div className="special-note">
        <strong style={{ color: 'var(--gold)' }}>Please Note:</strong>{' '}
        Lunch will be served to gents at 1:30 pm sharp after Zuhar Prayers
        &amp; to ladies thereafter. Punctuality shall be appreciated.
      </div>
    </div>
  )
}
