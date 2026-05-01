export default function ComplimentsSection() {
  return (
    <div className="compliments-section" id="compliments">
      <div className="ornament-divider" style={{ margin: '0 auto 24px', maxWidth: '200px' }}>
        <span className="ornament-line" />
        <span className="ornament-diamond" />
        <span className="ornament-line" />
      </div>

      <p className="compliments-label">With Best Compliments From</p>
      <p className="compliments-text gold-shimmer">
        Reshi Family
        <span className="compliments-family" style={{ fontSize: '14px', opacity: 0.7 }}>
          &amp; All Nears &amp; Dears
        </span>
      </p>

      <div className="ornament-divider" style={{ margin: '30px auto 0', maxWidth: '200px' }}>
        <span className="ornament-line" />
        <span className="ornament-diamond" />
        <span className="ornament-line" />
      </div>
    </div>
  )
}
