import CornerOrnaments from './CornerOrnaments'

export default function InvocationSection() {
  return (
    <div className="section-card invocation-section" id="invocation">
      <CornerOrnaments />
      {/* Arabic Bismillah Calligraphy */}
      <div className="arabic-calligraphy gold-shimmer" aria-label="Bismillah Arabic calligraphy">
        بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
      </div>

      <div className="ornament-divider" style={{ margin: '20px auto', maxWidth: '200px' }}>
        <span className="ornament-line" />
        <span className="ornament-diamond" />
        <span className="ornament-line" />
      </div>

      <p className="dua-text">
        "O Allah! Guide this marriage to the best of understanding,
        Happiness, Peace, Prosperity &amp; Success"
        <span className="aameen gold-shimmer">— Aameen —</span>
      </p>
    </div>
  )
}
