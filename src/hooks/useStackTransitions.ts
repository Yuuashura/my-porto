import { useEffect, type RefObject } from 'react'
import { gsap } from '../lib/gsap'

/**
 * Every `.stack-panel` inside `scopeRef` rises like a card tilting upright as it scrolls in.
 * On desktop the panel before it pins at its bottom edge and recedes (tilt, shrink, blur)
 * while the next one slides over it. Reduced motion gets nothing.
 */
export function useStackTransitions(scopeRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const scope = scopeRef.current
    if (!scope) return
    const panels = gsap.utils.toArray<HTMLElement>('.stack-panel', scope)
    const mm = gsap.matchMedia()

    mm.add(
      {
        desktop: '(min-width: 781px) and (prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 780px) and (prefers-reduced-motion: no-preference)',
      },
      (context) => {
        const { desktop, mobile } = context.conditions as Record<string, boolean>
        if (!desktop && !mobile) return

        panels.forEach((panel, index) => {
          const section = panel.firstElementChild as HTMLElement | null
          if (!section) return

          // Rise: the incoming panel starts leaning back and straightens as its top reaches the viewport top.
          gsap.fromTo(
            section,
            {
              rotationX: desktop ? 28 : 14,
              scale: desktop ? 0.92 : 0.96,
              // Top corners only, so a panel's own bottom radius (About) survives.
              borderTopLeftRadius: desktop ? 48 : 28,
              borderTopRightRadius: desktop ? 48 : 28,
              transformOrigin: '50% 0%',
              transformPerspective: 1400,
            },
            {
              rotationX: 0,
              scale: 1,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              ease: 'none',
              scrollTrigger: { trigger: panel, start: 'top bottom', end: 'top top', scrub: true },
            },
          )

          const next = panels[index + 1]
          if (!desktop || !next) return

          // Recede: pin this panel by its bottom edge while the next one covers it.
          gsap
            .timeline({
              scrollTrigger: {
                trigger: panel,
                start: () => (panel.offsetHeight > window.innerHeight ? 'bottom bottom' : 'top top'),
                end: () => `+=${window.innerHeight}`,
                pin: true,
                pinSpacing: false,
                scrub: true,
                invalidateOnRefresh: true,
              },
            })
            .fromTo(
              section,
              {
                transformOrigin: () => `50% ${Math.max(section.offsetHeight - window.innerHeight / 2, 0)}px`,
                rotationX: 0,
                scale: 1,
                filter: 'blur(0px) brightness(1)',
              },
              {
                rotationX: 10,
                scale: 0.88,
                filter: 'blur(4px) brightness(0.85)',
                ease: 'none',
                immediateRender: false,
              },
            )
        })
      },
      scope,
    )

    return () => mm.revert()
  }, [scopeRef])
}
