import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const backgrounds = [
  { src: '/bg-palace.png', id: 'bg-palace' },
  { src: '/bg-marble.png', id: 'bg-marble' },
  { src: '/bg-emerald-silk.png', id: 'bg-silk' },
  { src: '/bg-gold-filigree.png', id: 'bg-filigree' },
]

export default function SceneBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const layers = gsap.utils.toArray<HTMLElement>('.scene-bg-layer')

      // First layer starts visible
      gsap.set(layers[0], { opacity: 0.7 })
      gsap.set(layers.slice(1), { opacity: 0 })

      // Each section triggers a background crossfade
      const sections = gsap.utils.toArray<HTMLElement>('.section-card, .rsvp-section, .compliments-section, .countdown-scratch-wrapper')
      const totalSections = sections.length

      sections.forEach((section, i) => {
        // Determine which bg to show (cycle through)
        const bgIndex = i % layers.length

        ScrollTrigger.create({
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          onEnter: () => {
            // Fade out all layers, fade in target
            layers.forEach((layer, li) => {
              gsap.to(layer, {
                opacity: li === bgIndex ? 0.7 : 0,
                duration: 1.2,
                ease: 'power2.inOut',
              })
            })
          },
          onEnterBack: () => {
            const prevIndex = Math.max(0, i - 1) % layers.length
            layers.forEach((layer, li) => {
              gsap.to(layer, {
                opacity: li === prevIndex ? 0.7 : 0,
                duration: 1.2,
                ease: 'power2.inOut',
              })
            })
          },
        })

        // Parallax movement on each layer
        gsap.to(layers[bgIndex], {
          yPercent: -8,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      })

      // Subtle 3D rotation on scroll for all layers
      layers.forEach((layer, i) => {
        gsap.to(layer, {
          rotateX: 2 + i * 0.5,
          rotateY: -1 + i * 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 2,
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="scene-bg-container" ref={containerRef}>
      {backgrounds.map((bg) => (
        <div
          key={bg.id}
          className="scene-bg-layer"
          id={bg.id}
          style={{ backgroundImage: `url(${bg.src})` }}
        />
      ))}
      {/* Dark overlay for readability */}
      <div className="scene-bg-overlay" />
      {/* Gold particle layer */}
      <div className="scene-particles">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${6 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 8}s`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              opacity: 0,
            }}
          />
        ))}
      </div>
      {/* Girih geometric overlay */}
      <div className="girih-overlay" />
    </div>
  )
}
