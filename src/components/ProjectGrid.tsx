import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import type { Project } from '../data/projects'
import type { Language, PortfolioContent } from '../content'
import { ArchitectureVisual } from './ArchitectureVisual'
import { MagneticButton } from './ui/motion-footer'

const deck: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

// Cards are "dealt" up from edge-on, then settle with a little spring overshoot.
const dealt: Variants = {
  hidden: { rotateX: -75, y: 90, z: -120 },
  visible: {
    rotateX: 0,
    y: 0,
    z: 0,
    transition: { type: 'spring', stiffness: 140, damping: 16, mass: 0.9 },
  },
}

export function ProjectGrid({
  projects,
  copy,
  language,
}: {
  projects: Project[]
  copy: PortfolioContent
  language: Language
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.ul
      className="project-grid"
      aria-label={copy.work.carouselLabel}
      variants={deck}
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="visible"
    >
      {projects.map((project) => (
        <motion.li key={project.id} variants={dealt} style={{ transformPerspective: 1200, transformOrigin: '50% 0%' }}>
          <MagneticButton
            as="a"
            href={`/projek/${project.id}`}
            strength={0.08}
            className="project-card"
            data-cursor="View"
          >
            <div className="project-card-media">
              {project.screenshots.length ? (
                <img src={project.screenshots[0].src} alt="" loading="lazy" decoding="async" />
              ) : (
                <ArchitectureVisual copy={copy.projectVisuals} className="cf-architecture" />
              )}
            </div>
            <div className="project-card-body">
              <div className="project-meta">
                <span>{project.category[language]}</span>
                <span>{project.year}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description[language]}</p>
              <span className="project-card-cta">
                {copy.work.viewDetails}
                <FiArrowUpRight aria-hidden="true" />
              </span>
            </div>
          </MagneticButton>
        </motion.li>
      ))}
    </motion.ul>
  )
}
