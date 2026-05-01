import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EnvelopeScreen from './components/EnvelopeScreen'
import SceneBackground from './components/SceneBackground'
import InvocationSection from './components/InvocationSection'
import HostsSection from './components/HostsSection'
import BrideSection from './components/BrideSection'
import CountdownScratch from './components/CountdownScratch'
import EventsSection from './components/EventsSection'
import VenueSection from './components/VenueSection'
import RSVPSection from './components/RSVPSection'
import ComplimentsSection from './components/ComplimentsSection'
import OrnamentDivider from './components/OrnamentDivider'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const perspectiveRef = useRef<HTMLDivElement>(null)

  const handleEnvelopeOpen = useCallback(() => {
    setEnvelopeOpened(true)
    document.body.style.overflow = 'auto'
  }, [])

  useEffect(() => {
    if (!envelopeOpened) {
      document.body.style.overflow = 'hidden'
    }
  }, [envelopeOpened])

  // GSAP 3D scroll animations
  useLayoutEffect(() => {
    if (!envelopeOpened) return

    // Small delay to let DOM settle
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // --- Section card 3D entrances ---
        const cards = gsap.utils.toArray<HTMLElement>('.section-card')
        
        const animations: { transform: string; rotateX?: number; rotateY?: number; rotateZ?: number; y?: number; scale?: number }[] = [
          // Invocation: flip from top
          { transform: '', rotateX: 10, y: 50, scale: 0.95 },
          // Hosts: swing from left
          { transform: '', rotateY: -8, rotateX: 4, y: 50, scale: 0.95 },
          // Bride: dramatic zoom
          { transform: '', rotateX: -8, y: 60, scale: 0.92 },
          // Events: flip from bottom
          { transform: '', rotateX: -10, rotateY: 3, y: 50, scale: 0.95 },
          // Venue: tilt right
          { transform: '', rotateY: 8, rotateX: -4, y: 50, scale: 0.95 },
        ]

        cards.forEach((card, i) => {
          const anim = animations[i % animations.length]
          
          gsap.fromTo(card,
            {
              opacity: 0,
              rotateX: anim.rotateX || 0,
              rotateY: anim.rotateY || 0,
              rotateZ: anim.rotateZ || 0,
              y: anim.y || 80,
              scale: anim.scale || 0.9,
              filter: 'blur(12px)',
              transformPerspective: 1200,
            },
            {
              opacity: 1,
              rotateX: 0,
              rotateY: 0,
              rotateZ: 0,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              duration: 1.4,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 40%',
                toggleActions: 'play none none reverse',
              },
            }
          )

          // Subtle 3D tilt on scroll through
          gsap.to(card, {
            rotateX: -1,
            rotateY: i % 2 === 0 ? 1 : -1,
            y: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 40%',
              end: 'bottom 20%',
              scrub: 1.5,
            },
          })
        })

        // --- Ornament dividers: scale + fade ---
        gsap.utils.toArray<HTMLElement>('.ornament-divider').forEach((div) => {
          gsap.fromTo(div,
            { scaleX: 0, opacity: 0 },
            {
              scaleX: 1,
              opacity: 0.7,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: div,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        })

        // --- Countdown scratch: dramatic entrance ---
        const countdown = document.querySelector('.countdown-scratch-wrapper')
        if (countdown) {
          gsap.fromTo(countdown,
            {
              opacity: 0,
              rotateX: 10,
              y: 60,
              scale: 0.92,
              filter: 'blur(15px)',
              transformPerspective: 1200,
            },
            {
              opacity: 1,
              rotateX: 0,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              duration: 1.6,
              ease: 'back.out(1.4)',
              scrollTrigger: {
                trigger: countdown,
                start: 'top 85%',
                end: 'top 45%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }

        // --- RSVP: 3D card flip entrance ---
        const rsvp = document.querySelector('.rsvp-section')
        if (rsvp) {
          gsap.fromTo(rsvp,
            {
              opacity: 0,
              rotateY: -10,
              x: -30,
              scale: 0.95,
              filter: 'blur(10px)',
              transformPerspective: 1200,
            },
            {
              opacity: 1,
              rotateY: 0,
              x: 0,
              scale: 1,
              filter: 'blur(0px)',
              duration: 1.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: rsvp,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }

        // --- Compliments footer: float up ---
        const comp = document.querySelector('.compliments-section')
        if (comp) {
          gsap.fromTo(comp,
            {
              opacity: 0,
              y: 40,
              rotateX: 5,
              filter: 'blur(8px)',
              transformPerspective: 1200,
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              filter: 'blur(0px)',
              duration: 1.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: comp,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }

        // --- Global parallax: content wrapper subtle 3D ---
        if (perspectiveRef.current) {
          gsap.to(perspectiveRef.current, {
            rotateX: -1,
            ease: 'none',
            scrollTrigger: {
              trigger: perspectiveRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 3,
            },
          })
        }

        ScrollTrigger.refresh()
      }, contentRef)

      return () => ctx.revert()
    }, 300)

    return () => clearTimeout(timer)
  }, [envelopeOpened])

  return (
    <>
      <EnvelopeScreen onOpen={handleEnvelopeOpen} opened={envelopeOpened} />
      <SceneBackground />
      <div className="perspective-wrapper" ref={perspectiveRef}>
        <div className="invitation-content" ref={contentRef}>
          <InvocationSection />
          <OrnamentDivider />
          <HostsSection />
          <OrnamentDivider />
          <BrideSection />
          <OrnamentDivider />
          <CountdownScratch />
          <OrnamentDivider />
          <EventsSection />
          <OrnamentDivider />
          <VenueSection />
          <OrnamentDivider />
          <RSVPSection />
          <ComplimentsSection />
        </div>
      </div>
    </>
  )
}
