import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'

// -------------------------------------------------------------------------
// Magnetic primitive: follows the pointer with a tilt, snaps back like rubber.
// -------------------------------------------------------------------------
type MagneticButtonProps = {
  children: ReactNode
  className?: string
  /** Fraction of the pointer offset the element travels. Buttons ~0.4, big cards ~0.08. */
  strength?: number
  'data-cursor'?: string
} & (
  | ({ as: 'a' } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({ as?: 'button' } & React.ButtonHTMLAttributes<HTMLButtonElement>)
)

export function MagneticButton(props: MagneticButtonProps) {
  const { className, children, strength = 0.4 } = props
  const localRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = localRef.current
    if (!element) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect()
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2
      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        rotationX: (-y * strength) / 2.6,
        rotationY: (x * strength) / 2.6,
        scale: 1.03,
        transformPerspective: 800,
        ease: 'power2.out',
        duration: 0.4,
      })
    }
    const onLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        ease: 'elastic.out(1, 0.3)',
        duration: 1.2,
      })
    }

    element.addEventListener('pointermove', onMove)
    element.addEventListener('pointerleave', onLeave)
    return () => {
      element.removeEventListener('pointermove', onMove)
      element.removeEventListener('pointerleave', onLeave)
      gsap.killTweensOf(element)
    }
  }, [strength])

  // Strip our own props so only DOM attributes reach the element.
  const domProps: Record<string, unknown> = { ...props }
  delete domProps.as
  delete domProps.strength
  delete domProps.children
  const classes = cn('magnetic', className)

  if (props.as === 'a') {
    return (
      <a
        {...(domProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        ref={(node) => { localRef.current = node }}
        className={classes}
      >
        {children}
      </a>
    )
  }
  return (
    <button
      type="button"
      {...(domProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      ref={(node) => { localRef.current = node }}
      className={classes}
    >
      {children}
    </button>
  )
}

// -------------------------------------------------------------------------
// Cinematic footer: fixed underneath the page, revealed like a curtain.
// -------------------------------------------------------------------------
export interface FooterLink {
  label: string
  href: string
  icon?: ReactNode
  external?: boolean
  download?: boolean
}

export interface CinematicFooterProps {
  id?: string
  marquee: string[]
  prompt: string
  heading: string
  primaryLinks: FooterLink[]
  secondaryLinks: FooterLink[]
  giantText: string
  copyright: string
  craftedWith: string
  craftedBy: string
  author: string
  backToTop: { label: string; href: string }
}

function Marquee({ items }: { items: string[] }) {
  return (
    <div className="flex items-center space-x-12 px-6">
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="flex items-center space-x-12">
          <span>{item}</span>
          <span className={index % 2 ? 'text-[#f7d6d0]/60' : 'text-[#e2b4bd]/70'} aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  )
}

function linkProps(link: FooterLink) {
  return {
    href: link.href,
    ...(link.external ? { target: '_blank', rel: 'noreferrer' } : {}),
    ...(link.download ? { download: true } : {}),
  }
}

export function CinematicFooter({
  id,
  marquee,
  prompt,
  heading,
  primaryLinks,
  secondaryLinks,
  giantText,
  copyright,
  craftedWith,
  craftedBy,
  author,
  backToTop,
}: CinematicFooterProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const giantTextRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const mm = gsap.matchMedia()

    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        gsap.fromTo(
          giantTextRef.current,
          { y: '10vh', scale: 0.8, opacity: 0 },
          {
            y: '0vh',
            scale: 1,
            opacity: 1,
            ease: 'power1.out',
            // Measured after the pinned hero adds its spacer.
            scrollTrigger: { trigger: wrapper, start: 'top 80%', end: 'bottom bottom', scrub: 1, refreshPriority: -1 },
          },
        )
        gsap.fromTo(
          [headingRef.current, linksRef.current],
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: wrapper, start: 'top 40%', end: 'bottom bottom', scrub: 1, refreshPriority: -1 },
          },
        )
      },
      wrapper,
    )

    return () => mm.revert()
  }, [])

  return (
    // clip-path keeps the fixed footer visible only inside this box: the "curtain".
    <div
      ref={wrapperRef}
      id={id}
      className="cinematic-footer-curtain relative h-screen w-full"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <footer className="cinematic-footer-wrapper fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden">
        <div className="footer-aurora animate-footer-breathe pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[80px]" />
        <div className="footer-bg-grid pointer-events-none absolute inset-0 z-0" />

        <div
          ref={giantTextRef}
          className="footer-giant-bg-text pointer-events-none absolute -bottom-[5vh] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap"
          aria-hidden="true"
        >
          {giantText}
        </div>

        {/* Diagonal marquee */}
        <div className="footer-marquee absolute left-0 top-12 z-10 w-full -rotate-2 scale-110 overflow-hidden py-4 shadow-2xl backdrop-blur-md" aria-hidden="true">
          <div className="animate-footer-scroll-marquee flex w-max text-xs font-bold uppercase tracking-[0.3em] md:text-sm">
            <Marquee items={marquee} />
            <Marquee items={marquee} />
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 mx-auto mt-20 flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6">
          <div ref={headingRef} className="mb-12 text-center">
            <p className="mb-5 text-sm text-[#f7d6d0]/75 md:text-base">{prompt}</p>
            <h2 className="footer-text-glow text-5xl tracking-tighter md:text-8xl">{heading}</h2>
          </div>

          <div ref={linksRef} className="flex w-full flex-col items-center gap-6">
            <div className="flex w-full flex-wrap justify-center gap-4">
              {primaryLinks.map((link) => (
                <MagneticButton
                  key={link.label}
                  as="a"
                  {...linkProps(link)}
                  className="footer-glass-pill group flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold md:px-10 md:py-5 md:text-base"
                >
                  {link.icon}
                  {link.label}
                </MagneticButton>
              ))}
            </div>
            <div className="mt-2 flex w-full flex-wrap justify-center gap-3 md:gap-6">
              {secondaryLinks.map((link) => (
                <MagneticButton
                  key={link.label}
                  as="a"
                  {...linkProps(link)}
                  className="footer-glass-pill footer-glass-pill--quiet flex items-center gap-2 rounded-full px-6 py-3 text-xs font-medium md:text-sm"
                >
                  {link.icon}
                  {link.label}
                </MagneticButton>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative z-20 flex w-full flex-col items-center justify-between gap-6 px-6 pb-8 md:flex-row md:px-12">
          <p className="order-2 text-[10px] font-semibold uppercase tracking-widest text-[#f7d6d0]/60 md:order-1 md:text-xs">
            {copyright}
          </p>

          <div className="footer-glass-pill order-1 flex cursor-default items-center gap-2 rounded-full px-6 py-3 md:order-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#f7d6d0]/70 md:text-xs">{craftedWith}</span>
            <span className="animate-footer-heartbeat text-sm text-[#e2b4bd] md:text-base" aria-label="love">❤</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#f7d6d0]/70 md:text-xs">{craftedBy}</span>
            <span className="ml-1 text-xs font-black text-[#fff5f5] md:text-sm">{author}</span>
          </div>

          <MagneticButton
            as="a"
            href={backToTop.href}
            aria-label={backToTop.label}
            className="footer-glass-pill footer-glass-pill--quiet group order-3 flex h-12 w-12 items-center justify-center rounded-full"
          >
            <svg className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </MagneticButton>
        </div>
      </footer>
    </div>
  )
}
