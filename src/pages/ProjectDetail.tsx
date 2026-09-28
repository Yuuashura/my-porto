import { createRef, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import projects, { findProject, type Project } from '../data/projects'
import { content, type Language, type PortfolioContent } from '../content'
import { Reveal } from '../components/MotionSystem'
import { LanguageSwitcher } from '../components/LanguageSwitcher'
import { ArchitectureVisual } from '../components/ArchitectureVisual'
import { AnimatedBeam } from '../components/ui/animated-beam'
import { CoverflowCarousel } from '../components/ui/coverflow-carousel'
import { useLanguage } from '../hooks/useLanguage'
import { useSmoothScroll } from '../hooks/useMotion'

const ease = [0.16, 1, 0.3, 1] as const

export default function ProjectDetail({ slug }: { slug: string }) {
  const [language, setLanguage] = useLanguage()
  const copy = content[language]
  const project = findProject(slug)
  const shouldReduceMotion = useReducedMotion()

  useSmoothScroll(false)

  useEffect(() => {
    document.title = project
      ? `${project.title} — Yudistira Syaputra`
      : `${copy.projectDetail.notFound} — Yudistira Syaputra`
  }, [copy.projectDetail.notFound, project])

  const header = (
    <header className="site-header site-header--scrolled">
      <div className="nav-wrap detail-nav">
        <a className="brand-mark" href="/" aria-label={copy.navigation.homeLabel}>
          <span>YS</span>
          <i aria-hidden="true" />
        </a>
        <a className="detail-back" href="/#work">
          <FiArrowLeft aria-hidden="true" />
          {copy.projectDetail.back}
        </a>
        <LanguageSwitcher language={language} copy={copy} onChange={setLanguage} />
      </div>
    </header>
  )

  if (!project) {
    return (
      <div className="site-shell">
        {header}
        <main id="main-content" className="detail-missing">
          <h1>{copy.projectDetail.notFound}</h1>
          <p>{copy.projectDetail.notFoundBody}</p>
          <a className="button button--dark" href="/">
            {copy.projectDetail.home}
          </a>
        </main>
      </div>
    )
  }

  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  const rise = (delay: number) => ({
    initial: shouldReduceMotion ? false : { y: 28 },
    animate: { y: 0 },
    transition: { duration: 0.7, delay, ease },
  })

  return (
    <div className="site-shell">
      {header}

      <main id="main-content">
        <section className="detail-hero">
          <motion.div className="project-meta" {...rise(0.05)}>
            <span>
              {project.category[language]} · {project.year}
            </span>
            <span className={`status-chip status-chip--${project.status}`}>
              {copy.projectDetail.status[project.status]}
            </span>
          </motion.div>
          <motion.h1 {...rise(0.12)}>{project.title}</motion.h1>
          <motion.div className="detail-intro" {...rise(0.22)}>
            <p>{project.description[language]}</p>
            <div>
              <ul className="project-tech" aria-label={`${project.title} ${copy.work.technologiesLabel}`}>
                {project.tech.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
              <div className="project-actions">
                {project.link && (
                  <a className="button button--dark" href={project.link} target="_blank" rel="noreferrer">
                    {copy.work.visitLive}
                    <FiArrowUpRight aria-hidden="true" />
                  </a>
                )}
                {project.github && (
                  <a className="project-link" href={project.github} target="_blank" rel="noreferrer">
                    {copy.work.viewGithub}
                    <FiArrowUpRight aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </section>

        <section className="detail-gallery">
          <Reveal className="detail-section-heading" amount={0.4}>
            <h2>{copy.projectDetail.gallery}</h2>
          </Reveal>
          {project.screenshots.length ? (
            <Reveal variant="scale" amount={0.15}>
              <CoverflowCarousel
                slides={project.screenshots.map((shot) => ({
                  src: shot.src,
                  alt: `${project.title} — ${shot.label}`,
                  title: shot.label,
                }))}
                label={copy.projectDetail.galleryLabel}
                cardWidth="clamp(260px, 58vw, 780px)"
                aspectRatio={16 / 10}
                rotate={36}
                cardClassName="work-card"
                showCaption
                showNavigation
                showPagination
                onOpen={(index) => window.open(project.screenshots[index].src, '_blank', 'noopener')}
              />
            </Reveal>
          ) : (
            <Reveal className="detail-architecture" variant="scale" amount={0.2}>
              <ArchitectureVisual copy={copy.projectVisuals} />
            </Reveal>
          )}
        </section>

        <section className="detail-build">
          <Reveal className="detail-section-heading" amount={0.4}>
            <h2>{copy.projectDetail.howBuilt}</h2>
            <p>{copy.projectDetail.howBuiltIntro}</p>
          </Reveal>
          <BuildDiagram key={project.id} project={project} copy={copy} language={language} />
        </section>

        <section className="detail-next">
          <p>{copy.projectDetail.next}</p>
          <a href={`/projek/${next.id}`}>
            <span>{next.title}</span>
            <FiArrowRight aria-hidden="true" />
          </a>
          <footer>
            <p>© {new Date().getFullYear()} Yudistira Syaputra</p>
            <a href="mailto:tzyudistira@gmail.com">tzyudistira@gmail.com</a>
          </footer>
        </section>
      </main>
    </div>
  )
}

/** Stack → product → features, wired together with animated beams. */
function BuildDiagram({
  project,
  copy,
  language,
}: {
  project: Project
  copy: PortfolioContent
  language: Language
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hubRef = useRef<HTMLDivElement>(null)
  const [techRefs] = useState(() => project.tech.map(() => createRef<HTMLDivElement>()))
  const [featureRefs] = useState(() => project.features.map(() => createRef<HTMLDivElement>()))

  return (
    <Reveal className="build-diagram" amount={0.3}>
      <div className="build-diagram-inner" ref={containerRef}>
        <div className="build-column">
          <p>{copy.projectDetail.tech}</p>
          {project.tech.map((technology, index) => (
            <div className="build-node" ref={techRefs[index]} key={technology}>
              {technology}
            </div>
          ))}
        </div>

        <div className="build-hub" ref={hubRef}>
          <span aria-hidden="true">YS</span>
          <strong>{project.title}</strong>
        </div>

        <div className="build-column">
          <p>{copy.projectDetail.features}</p>
          {project.features.map((feature, index) => (
            <div className="build-node build-node--feature" ref={featureRefs[index]} key={feature.en}>
              {feature[language]}
            </div>
          ))}
        </div>

        {techRefs.map((ref, index) => (
          <AnimatedBeam
            key={`tech-${index}`}
            containerRef={containerRef}
            fromRef={ref}
            toRef={hubRef}
            pathColor="#17171c"
            pathOpacity={0.12}
            gradientStartColor="#ff7759"
            gradientStopColor="#003c33"
            duration={4}
            delay={index * 0.35}
          />
        ))}
        {featureRefs.map((ref, index) => (
          <AnimatedBeam
            key={`feature-${index}`}
            containerRef={containerRef}
            fromRef={hubRef}
            toRef={ref}
            pathColor="#17171c"
            pathOpacity={0.12}
            gradientStartColor="#003c33"
            gradientStopColor="#2456c4"
            duration={4}
            delay={1.2 + index * 0.35}
          />
        ))}
      </div>
    </Reveal>
  )
}
