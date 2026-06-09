import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { animate } from 'animejs'

const stats = [
  { label: 'Projects Built', value: 8, suffix: '+' },
  { label: 'Technologies', value: 15, suffix: '+' },
  { label: 'Commits', value: 500, suffix: '+' },
  { label: 'Coding Hours', value: 2000, suffix: '+' },
]

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  useEffect(() => {
    if (!inView) return

    const obj = { val: 0 }
    animate(obj, {
      val: target,
      ease: 'outExpo',
      duration: 2000,
      onUpdate: () => setCount(Math.round(obj.val)),
    })
  }, [inView, target])

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

export default function StatsSection() {
  const [ref] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="relative py-16 md:py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card p-6 text-center"
            >
              <p className="font-display text-3xl md:text-4xl text-fontaine-cyan mb-2">
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-fontaine-cream/50 text-xs tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
