import { useEffect, useRef, type ReactNode } from 'react'
import type { IconType } from 'react-icons'
import { FiArrowDown, FiDownload } from 'react-icons/fi'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'

export interface CinematicHeroBadge {
  icon: IconType
  title: string
  subtitle: string
}

export interface CinematicHeroProps {
  /** Full headline, read by screen readers instead of the two animated lines. */
  title: string
  kicker: ReactNode
  tagline1: string
  tagline2: string
  brandName: string
  cardHeading: string
  cardDescription: ReactNode
  portrait: { src: string; alt: string }
  badges: [CinematicHeroBadge, CinematicHeroBadge]
  ctaHeading: string
  ctaDescription: string
  primaryAction: { label: string; href: string }
  secondaryAction: { label: string; href: string }
  /** Seconds to hold the intro timeline (e.g. while the splash curtain is up). */
  introDelay?: number
  className?: string
}

export function CinematicHero({
  title,
  kicker,
  tagline1,
  tagline2,
  brandName,
  cardHeading,
  cardDescription,
  portrait,
  badges,
  ctaHeading,
  ctaDescription,
  primaryAction,
  secondaryAction,
  introDelay = 0,
  className,
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mainCardRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const mm = gsap.matchMedia()

    // Reduced motion: no pin, no timeline — everything laid out in flow and fully visible.
    mm.add(
      '(prefers-reduced-motion: reduce)',
      () => {
        container.classList.add('cinematic--static')
        return () => container.classList.remove('cinematic--static')
      },
      container,
    )

    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 767px)',
        finePointer: '(hover: hover) and (pointer: fine)',
      },
      (context) => {
        const { motion, mobile, finePointer } = context.conditions as Record<string, boolean>
        if (!motion) return

        // 1. Mouse-driven tilt of the portrait and card sheen (desktop pointers only).
        let frame = 0
        const onMouseMove = (event: MouseEvent) => {
          if (window.scrollY > window.innerHeight * 2) return
          cancelAnimationFrame(frame)
          frame = requestAnimationFrame(() => {
            const card = mainCardRef.current
            const portraitCard = portraitRef.current
            if (!card || !portraitCard) return
            const rect = card.getBoundingClientRect()
            card.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`)
            card.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`)
            const x = (event.clientX / window.innerWidth - 0.5) * 2
            const y = (event.clientY / window.innerHeight - 0.5) * 2
            gsap.to(portraitCard, { rotationY: x * 10, rotationX: -y * 10, ease: 'power3.out', duration: 1.2 })
          })
        }
        if (finePointer) window.addEventListener('mousemove', onMouseMove)

        // 2. Intro + pinned scroll story.
        // Every tween states its start explicitly (fromTo) so re-runs on breakpoint change or
        // ScrollTrigger refresh can't record a half-animated value as the new start.
        const cardSmall = {
          width: mobile ? '92vw' : '85vw',
          height: mobile ? '92vh' : '85vh',
          borderRadius: mobile ? 32 : 40,
        }
        const cardFull = { width: '100vw', height: '100vh', borderRadius: 0 }
        const cardContent = ['.hero-media', '.floating-badge', '.card-left-text', '.card-right-text']

        gsap.set('.text-track', { autoAlpha: 0, y: 60, scale: 0.85, filter: 'blur(20px)', rotationX: -20 })
        gsap.set('.text-days', { autoAlpha: 1, clipPath: 'inset(0 100% 0 0)' })
        gsap.set('.hero-kicker-line', { autoAlpha: 0, y: 20 })
        gsap.set(['.card-left-text', '.card-right-text', '.hero-media', '.floating-badge'], { autoAlpha: 0 })

        gsap
          .timeline({ delay: 0.3 + introDelay })
          .to('.hero-kicker-line', { duration: 1, autoAlpha: 1, y: 0, ease: 'expo.out' })
          .to(
            '.text-track',
            { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', rotationX: 0, ease: 'expo.out' },
            '-=0.8',
          )
          .to('.text-days', { duration: 1.4, clipPath: 'inset(0 0% 0 0)', ease: 'power4.inOut' }, '-=1.0')

        gsap
          .timeline({
            scrollTrigger: {
              trigger: container,
              start: 'top top',
              // ponytail: the demo pinned for 7000px; a portfolio hero needs about half.
              end: mobile ? '+=2600' : '+=3600',
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(
            '.hero-text-wrapper',
            { scale: 1, filter: 'blur(0px)', autoAlpha: 1 },
            { scale: 1.15, filter: 'blur(20px)', autoAlpha: 0.2, ease: 'power2.inOut', duration: 2 },
            0,
          )
          .fromTo(
            '.bg-grid-theme',
            { scale: 1, filter: 'blur(0px)', opacity: 0.5 },
            { scale: 1.15, filter: 'blur(20px)', opacity: 0.2, ease: 'power2.inOut', duration: 2 },
            0,
          )
          .fromTo(
            '.main-card',
            { y: () => window.innerHeight + 200, autoAlpha: 1, ...cardSmall },
            { y: 0, ease: 'power3.inOut', duration: 2 },
            0,
          )
          .fromTo('.main-card', cardSmall, { ...cardFull, ease: 'power3.inOut', duration: 1.5, immediateRender: false })
          .fromTo(
            '.hero-media',
            { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
            { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: 'expo.out', duration: 2.5 },
            '-=0.8',
          )
          // Photo wipes up inside its frame while the image settles from a slight zoom.
          // The clip sits on an inner layer so the frame's own shadow isn't clipped away.
          .fromTo(
            '.hero-portrait-reveal',
            { clipPath: 'inset(100% 0% 0% 0% round 28px)' },
            { clipPath: 'inset(0% 0% 0% 0% round 28px)', ease: 'expo.out', duration: 2 },
            '-=2.2',
          )
          .fromTo('.hero-portrait-img', { scale: 1.25 }, { scale: 1, ease: 'expo.out', duration: 2.4 }, '<')
          .fromTo(
            '.floating-badge',
            { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 },
            { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: 'back.out(1.5)', duration: 1.5, stagger: 0.2 },
            '-=1.6',
          )
          .fromTo('.card-left-text', { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: 'power4.out', duration: 1.5 }, '-=1.5')
          .fromTo(
            '.card-right-text',
            { x: 50, autoAlpha: 0, scale: 0.8 },
            { x: 0, autoAlpha: 1, scale: 1, ease: 'expo.out', duration: 1.5 },
            '<',
          )
          .to({}, { duration: 2 })
          .set('.hero-text-wrapper', { autoAlpha: 0 })
          .fromTo('.cta-wrapper', { autoAlpha: 0, scale: 0.8, filter: 'blur(30px)' }, { autoAlpha: 1, duration: 0.01 })
          .to({}, { duration: 1 })
          .fromTo(
            cardContent,
            { scale: 1, y: 0, z: 0, autoAlpha: 1 },
            {
              scale: 0.9,
              y: -40,
              z: -200,
              autoAlpha: 0,
              ease: 'power3.in',
              duration: 1.2,
              stagger: 0.05,
              immediateRender: false,
            },
          )
          .fromTo(
            '.main-card',
            cardFull,
            { ...cardSmall, ease: 'expo.inOut', duration: 1.8, immediateRender: false },
            'pullback',
          )
          .fromTo(
            '.cta-wrapper',
            { scale: 0.8, filter: 'blur(30px)' },
            { scale: 1, filter: 'blur(0px)', ease: 'expo.inOut', duration: 1.8, immediateRender: false },
            'pullback',
          )
          .fromTo(
            '.main-card',
            { y: 0 },
            { y: () => -window.innerHeight - 300, ease: 'power3.in', duration: 1.5, immediateRender: false },
          )

        return () => {
          window.removeEventListener('mousemove', onMouseMove)
          cancelAnimationFrame(frame)
        }
      },
      container,
    )

    return () => mm.revert()
  }, [introDelay])

  const [topBadge, bottomBadge] = badges

  return (
    <div
      ref={containerRef}
      className={cn(
        'cinematic-hero relative flex h-screen w-full items-center justify-center overflow-hidden bg-background text-foreground antialiased',
        className,
      )}
      style={{ perspective: '1500px' }}
    >
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme pointer-events-none absolute inset-0 z-0 opacity-50" aria-hidden="true" />

      {/* Background layer: headline */}
      <div className="hero-text-wrapper transform-style-3d absolute z-10 flex w-full flex-col items-center justify-center px-4 text-center will-change-transform">
        <p className="hero-kicker-line gsap-reveal mb-6 text-sm font-semibold tracking-wide text-muted-foreground md:text-base">
          {kicker}
        </p>
        <h1 aria-label={title} className="cinematic-title">
          <span aria-hidden="true" className="text-track gsap-reveal text-3d-matte mb-2 block text-5xl tracking-tight md:text-7xl lg:text-[6rem]">
            {tagline1}
          </span>
          <span aria-hidden="true" className="text-days gsap-reveal text-silver-matte block text-5xl tracking-tighter md:text-7xl lg:text-[6rem]">
            {tagline2}
          </span>
        </h1>
      </div>

      {/* Background layer 2: call to action revealed at the end */}
      <div className="cta-wrapper gsap-reveal pointer-events-auto absolute z-10 flex w-full flex-col items-center justify-center px-4 text-center will-change-transform">
        <h2 className="text-silver-matte mb-6 text-4xl tracking-tight md:text-6xl lg:text-7xl">{ctaHeading}</h2>
        <p className="mx-auto mb-12 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          {ctaDescription}
        </p>
        <div className="flex flex-col gap-6 sm:flex-row">
          <a href={primaryAction.href} className="btn-modern-light group flex items-center justify-center gap-3 rounded-[1.25rem] px-8 py-4">
            <span className="text-lg font-semibold tracking-tight">{primaryAction.label}</span>
            <FiArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
          </a>
          <a href={secondaryAction.href} download className="btn-modern-dark group flex items-center justify-center gap-3 rounded-[1.25rem] px-8 py-4">
            <FiDownload className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
            <span className="text-lg font-semibold tracking-tight">{secondaryAction.label}</span>
          </a>
        </div>
      </div>

      {/* Foreground layer: the physical card */}
      <div className="card-layer pointer-events-none absolute inset-0 z-20 flex items-center justify-center" style={{ perspective: '1500px' }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card gsap-reveal pointer-events-auto relative flex h-[92vh] w-[92vw] items-center justify-center overflow-hidden rounded-[32px] md:h-[85vh] md:w-[85vw] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-evenly px-4 py-6 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-8 lg:px-12 lg:py-0">
            {/* Brand — top on mobile, right on desktop */}
            <div className="card-right-text gsap-reveal order-1 z-20 flex w-full justify-center lg:order-3 lg:justify-end">
              <p className="cinematic-brand text-card-silver-matte">{brandName}</p>
            </div>

            {/* Portrait */}
            <div className="hero-media relative order-2 z-10 flex w-full items-center justify-center" style={{ perspective: '1000px' }}>
              <div ref={portraitRef} className="hero-portrait-card transform-style-3d will-change-transform">
                <div className="hero-portrait-frame">
                  <div className="hero-portrait-reveal">
                    <img src={portrait.src} alt={portrait.alt} className="hero-portrait-img" />
                    <span className="hero-portrait-sheen" aria-hidden="true" />
                  </div>
                </div>

                <div className="floating-badge floating-ui-badge absolute -left-[10%] top-[7%] z-30 flex items-center gap-3 rounded-xl p-3 lg:-left-[12%] lg:top-[10%] lg:gap-4 lg:rounded-2xl lg:p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e2b4bd]/30 bg-[#e2b4bd]/15 lg:h-10 lg:w-10">
                    <topBadge.icon className="h-4 w-4 text-[#e2b4bd] lg:h-5 lg:w-5" aria-hidden="true" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold tracking-tight text-[#fff5f5] lg:text-sm">{topBadge.title}</p>
                    <p className="text-[10px] font-medium text-[#f7d6d0]/70 lg:text-xs">{topBadge.subtitle}</p>
                  </div>
                </div>

                <div className="floating-badge floating-ui-badge absolute -right-[10%] bottom-[9%] z-30 flex items-center gap-3 rounded-xl p-3 lg:-right-[12%] lg:bottom-[12%] lg:gap-4 lg:rounded-2xl lg:p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#f7d6d0]/30 bg-[#f7d6d0]/15 lg:h-10 lg:w-10">
                    <bottomBadge.icon className="h-4 w-4 text-[#f7d6d0] lg:h-5 lg:w-5" aria-hidden="true" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold tracking-tight text-[#fff5f5] lg:text-sm">{bottomBadge.title}</p>
                    <p className="text-[10px] font-medium text-[#f7d6d0]/70 lg:text-xs">{bottomBadge.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Intro copy — bottom on mobile, left on desktop */}
            <div className="card-left-text gsap-reveal order-3 z-20 flex w-full flex-col justify-center px-4 text-center lg:order-1 lg:px-0 lg:text-left">
              <h2 className="mb-0 text-2xl tracking-tight text-[#fff5f5] md:text-3xl lg:mb-5 lg:text-4xl">{cardHeading}</h2>
              <p className="mx-auto hidden max-w-sm text-sm leading-relaxed text-[#f7d6d0]/80 md:block md:text-base lg:mx-0 lg:max-w-none lg:text-lg">
                {cardDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
