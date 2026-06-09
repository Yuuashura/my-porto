import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'
import { useInView } from 'react-intersection-observer'
import {
  SiOpenjdk,
  SiSpringboot,
  SiReact,
  SiTypescript,
  SiPostgresql,
  SiDocker,
  SiTailwindcss,
  SiGit,
} from 'react-icons/si'

interface TechNode {
  id: string
  label: string
  icon: React.ReactNode
  color: string
  x: number
  y: number
}

const techNodes: TechNode[] = [
  { id: 'java', label: 'Java', icon: <SiOpenjdk />, color: '#007396', x: 50, y: 8 },
  { id: 'spring', label: 'Spring Boot', icon: <SiSpringboot />, color: '#6DB33F', x: 18, y: 30 },
  { id: 'react', label: 'React', icon: <SiReact />, color: '#61DAFB', x: 82, y: 30 },
  { id: 'typescript', label: 'TypeScript', icon: <SiTypescript />, color: '#3178C6', x: 30, y: 55 },
  { id: 'postgres', label: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169E1', x: 70, y: 55 },
  { id: 'docker', label: 'Docker', icon: <SiDocker />, color: '#2496ED', x: 15, y: 78 },
  { id: 'tailwind', label: 'Tailwind', icon: <SiTailwindcss />, color: '#06B6D4', x: 50, y: 88 },
  { id: 'git', label: 'Git', icon: <SiGit />, color: '#F05032', x: 85, y: 78 },
]

const connections: [string, string][] = [
  ['java', 'spring'],
  ['java', 'react'],
  ['spring', 'postgres'],
  ['spring', 'typescript'],
  ['react', 'typescript'],
  ['react', 'postgres'],
  ['typescript', 'docker'],
  ['postgres', 'docker'],
  ['docker', 'tailwind'],
  ['docker', 'git'],
  ['java', 'docker'],
  ['react', 'tailwind'],
]

export default function Constellation() {
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  useEffect(() => {
    if (!inView) return

    animate(nodeRefs.current.filter(Boolean), {
      scale: [0, 1],
      opacity: [0, 1],
      ease: 'outElastic(1, 0.6)',
      duration: 1200,
      delay: stagger(100),
    })

    if (svgRef.current) {
      const lines = svgRef.current.querySelectorAll('.constellation-line')
      animate(lines, {
        strokeDashoffset: [stagger(300, { from: 'center' }), 0],
        ease: 'inOutQuad',
        duration: 1500,
        delay: stagger(80),
      })
    }
  }, [inView])

  return (
    <section className="relative py-16 md:py-24 px-6">
      <div ref={ref} className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-display text-fontaine-gold text-sm tracking-[0.3em] mb-3">
            ─── CONSTELLATION ───
          </p>
          <h2 className="font-heading text-3xl md:text-5xl text-fontaine-light-gold">
            Tech <span className="text-gradient-gold">Constellation</span>
          </h2>
        </div>

        <div
          ref={containerRef}
          className="glass-card p-6 md:p-10 relative"
          style={{ minHeight: '400px' }}
        >
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0 p-4"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            {connections.map(([from, to]) => {
              const fromNode = techNodes.find((n) => n.id === from)
              const toNode = techNodes.find((n) => n.id === to)
              if (!fromNode || !toNode) return null

              return (
                <line
                  key={`${from}-${to}`}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  className="constellation-line"
                  stroke="rgba(126, 200, 227, 0.25)"
                  strokeWidth="0.3"
                  strokeDasharray="3 2"
                  strokeDashoffset="100"
                />
              )
            })}
          </svg>

          {techNodes.map((node, i) => (
            <div
              key={node.id}
              ref={(el) => { nodeRefs.current[i] = el }}
              className="absolute flex flex-col items-center gap-1 opacity-0"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%) scale(0)',
              }}
            >
              <div
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white text-lg md:text-xl shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl cursor-default"
                style={{ backgroundColor: node.color }}
              >
                {node.icon}
              </div>
              <span
                className="text-[8px] md:text-[10px] text-fontaine-cream/60 font-medium whitespace-nowrap"
              >
                {node.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
