import CornerOrnaments from './CornerOrnaments'

export default function InvocationSection() {
  return (
    <div className="section-card invocation-section" id="invocation">
      <CornerOrnaments />
      {/* Arabic Calligraphy Hidden - Replaced with minimal ornament */}
      <div className="monogram-frame" style={{ width: '80px', height: '80px', margin: '0 auto 20px' }}>
        <div className="monogram-border" style={{ animationDuration: '40s' }}></div>
        <div className="monogram-inner" style={{ width: '64px', height: '64px' }}>
          <span className="monogram-text" style={{ fontSize: '24px' }}>✧</span>
        </div>
      </div>

      <p className="dua-text">
        "O Allah! Guide this marriage to the best of understanding,
        Happiness, Peace, Prosperity &amp; Success"
        <span className="aameen gold-shimmer">— Aameen —</span>
      </p>
    </div>
  )
}
