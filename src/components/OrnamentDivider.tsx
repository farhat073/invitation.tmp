export default function OrnamentDivider() {
  return (
    <div className="ornament-divider" style={{ margin: '10px 40px' }}>
      <span className="ornament-line" />
      <span className="ornament-diamond" />
      <span className="ornament-diamond" style={{ width: '5px', height: '5px' }} />
      <span className="ornament-diamond" />
      <span className="ornament-line" />
    </div>
  )
}
