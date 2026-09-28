const introKey = 'ys-intro-seen'

/** Seconds from mount until the curtain starts lifting. */
export const INTRO_HOLD = 1.6
/** Seconds after mount when the hero should begin animating (mid-lift). */
export const INTRO_HERO_DELAY = INTRO_HOLD + 0.25

/** Once per tab session, home page only, never for reduced-motion users or deep links like /#work. */
export function shouldPlayIntro() {
  if (window.sessionStorage.getItem(introKey) || window.location.hash) return false
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function markIntroSeen() {
  window.sessionStorage.setItem(introKey, '1')
}
