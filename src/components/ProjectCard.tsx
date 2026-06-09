import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '../data/projects'

const statusConfig = {
  completed: { label: 'Completed', class: 'bg-fontaine-teal/30 text-fontaine-cyan border-fontaine-cyan/30' },
  'in-progress': { label: 'In Progress', class: 'bg-fontaine-gold/20 text-fontaine-gold border-fontaine-gold/30' },
  planned: { label: 'Planned', class: 'bg-white/5 text-fontaine-cream/50 border-white/10' },
}

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const status = statusConfig[project.status]

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setRotateX((0.5 - y) * 12)
    setRotateY((x - 0.5) * 12)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="glass-card p-6 transition-all duration-200 cursor-default"
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
          transition: isHovered ? 'transform 0.1s' : 'transform 0.5s',
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-lg bg-gradient-to-br from-fontaine-teal/30 to-fontaine-gold/20 border border-fontaine-cyan/20 flex items-center justify-center font-display text-fontaine-gold text-lg"
            style={{
              transform: isHovered ? `translateZ(20px)` : 'translateZ(0px)',
              transition: 'transform 0.2s',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </div>
          <span
            className={`text-xs px-3 py-1 rounded-full border ${status.class}`}
            style={{
              transform: isHovered ? `translateZ(15px)` : 'translateZ(0px)',
              transition: 'transform 0.2s',
            }}
          >
            {status.label}
          </span>
        </div>

        <h3
          className="font-heading text-xl text-fontaine-light-gold mb-2 group-hover:text-fontaine-gold transition-colors"
          style={{
            transform: isHovered ? `translateZ(25px)` : 'translateZ(0px)',
            transition: 'transform 0.2s',
          }}
        >
          {project.title}
        </h3>

        <p
          className="text-fontaine-cream/60 text-sm leading-relaxed mb-4"
          style={{
            transform: isHovered ? `translateZ(15px)` : 'translateZ(0px)',
            transition: 'transform 0.2s',
          }}
        >
          {project.description}
        </p>

        <div
          className="flex flex-wrap gap-2 mb-4"
          style={{
            transform: isHovered ? `translateZ(10px)` : 'translateZ(0px)',
            transition: 'transform 0.2s',
          }}
        >
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-1 rounded bg-fontaine-navy/50 text-fontaine-cyan/70 border border-fontaine-cyan/10"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-3" style={{
          transform: isHovered ? `translateZ(20px)` : 'translateZ(0px)',
          transition: 'transform 0.2s',
        }}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-fontaine-cream/50 hover:text-fontaine-cyan transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Source
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-fontaine-cream/50 hover:text-fontaine-cyan transition-colors"
            >
              Live Demo →
            </a>
          )}
        </div>

        {isHovered && (
          <div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${50 + rotateY * 4}% ${50 - rotateX * 4}%, rgba(126,200,227,0.08) 0%, transparent 60%)`,
            }}
          />
        )}
      </div>
    </motion.div>
  )
}
