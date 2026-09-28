import { Fragment, useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'
import {
  FiArrowRight,
  FiArrowUpRight,
  FiBriefcase,
  FiCode,
  FiDownload,
  FiGithub,
  FiGrid,
  FiLayers,
  FiLinkedin,
  FiMail,
  FiMenu,
  FiPhone,
  FiX,
} from 'react-icons/fi'
import projects from './data/projects'
import { Reveal } from './components/MotionSystem'
import { IntroSplash } from './components/IntroSplash'
import { INTRO_HERO_DELAY, shouldPlayIntro } from './lib/intro'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import { ArchitectureVisual } from './components/ArchitectureVisual'
import { AnimatedBeam } from './components/ui/animated-beam'
import { CoverflowCarousel } from './components/ui/coverflow-carousel'
import { IconCloud } from './components/ui/interactive-icon-cloud'
import { CinematicHero } from './components/ui/cinematic-landing-hero'
import { CinematicFooter } from './components/ui/motion-footer'
import { ProjectGrid } from './components/ProjectGrid'
import { useDesktopMotion, useSmoothScroll } from './hooks/useMotion'
import { useLanguage } from './hooks/useLanguage'
import { useStackTransitions } from './hooks/useStackTransitions'
import { ScrollTrigger } from './lib/gsap'
import { content, type Language, type PortfolioContent } from './content'

const cvUrl = new URL('../JAVA DEVELOPER - YUDISTIRA SYAPUTRA.pdf', import.meta.url).href

const stackItems = [
  ['Java', 'Spring Boot', 'REST API', 'Microservices', 'OOP'],
  ['MySQL', 'PostgreSQL', 'SQL Server', 'Relational Design'],
  ['React', 'Next.js', 'Node.js', 'TypeScript', 'Git & GitHub'],
]

// simple-icons v14 slugs (java, microsoftsqlserver, visualstudiocode were removed upstream).
const iconSlugs = [
  'openjdk',
  'spring',
  'springboot',
  'react',
  'nextdotjs',
  'typescript',
  'javascript',
  'nodedotjs',
  'mysql',
  'postgresql',
  'html5',
  'css3',
  'tailwindcss',
  'c',
  'git',
  'github',
  'vercel',
  'intellijidea',
  'postman',
]

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
}

const staggerItem: Variants = {
  hidden: { y: 20 },
  visible: {
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const ease = [0.16, 1, 0.3, 1] as const

const wordItem: Variants = {
  hidden: { y: '105%' },
  visible: {
    y: 0,
    transition: {
      duration: 0.62,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

function App() {
  const [language, setLanguage] = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [playIntro] = useState(shouldPlayIntro)
  const [introVisible, setIntroVisible] = useState(playIntro)
  const [activeProject, setActiveProject] = useState(0)
  const [projectView, setProjectView] = useState<'slide' | 'grid'>('slide')
  const mainRef = useRef<HTMLElement>(null)
  const experienceRef = useRef<HTMLElement>(null)
  const devTeachRef = useRef<HTMLDivElement>(null)
  const developmentRef = useRef<HTMLSpanElement>(null)
  const teachingRef = useRef<HTMLSpanElement>(null)
  const cinematic = useDesktopMotion()
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const { scrollYProgress: experienceProgress } = useScroll({
    target: experienceRef,
    offset: ['start 70%', 'end 35%'],
  })
  const experienceLineScale = useTransform(experienceProgress, [0, 1], [0, 1])
  const copy = content[language]
  const project = projects[activeProject]
  const navigation = [
    { label: copy.navigation.work, href: '#work' },
    { label: copy.navigation.experience, href: '#experience' },
    { label: copy.navigation.about, href: '#about' },
    { label: copy.navigation.contact, href: '#contact' },
  ]
  const stackGroups = [
    { title: copy.about.stack.backend, items: stackItems[0] },
    { title: copy.about.stack.data, items: stackItems[1] },
    { title: copy.about.stack.frontend, items: stackItems[2] },
  ]
  const slides = projects.map((item) => ({
    alt: item.title,
    src: item.screenshots[0]?.src,
    render: item.screenshots.length ? undefined : (
      <ArchitectureVisual copy={copy.projectVisuals} className="cf-architecture" />
    ),
  }))

  useSmoothScroll(menuOpen || introVisible)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen || introVisible ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen, introVisible])

  useEffect(() => {
    document.title = copy.meta.title

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const openGraphDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
    description?.setAttribute('content', copy.meta.description)
    openGraphDescription?.setAttribute('content', copy.meta.description)
  }, [copy.meta.description, copy.meta.title])

  useStackTransitions(mainRef)

  // Pins change page height, so re-measure whenever layout-affecting state or fonts change.
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [language, projectView])

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    document.fonts.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  // Deep links like /#work (back from a project page): scroll only after pin spacers exist.
  useEffect(() => {
    if (!window.location.hash) return
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      document.querySelector(window.location.hash)?.scrollIntoView()
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage)
    setMenuOpen(false)
  }
  // Hero waits for the intro curtain to start lifting.
  const introDelay = playIntro ? INTRO_HERO_DELAY : 0

  return (
    <div className="site-shell">
      <AnimatePresence>
        {introVisible && <IntroSplash onDone={() => setIntroVisible(false)} />}
      </AnimatePresence>

      <motion.div
        className="scroll-progress"
        style={{ scaleX: shouldReduceMotion ? 0 : scrollYProgress }}
        aria-hidden="true"
      />

      <a className="skip-link" href="#main-content">
        {copy.skipToContent}
      </a>

      <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
        <div className="nav-wrap">
          <a className="brand-mark" href="#top" aria-label={copy.navigation.homeLabel}>
            <span>YS</span>
            <i aria-hidden="true" />
          </a>

          <nav className="desktop-nav" aria-label={copy.navigation.primaryLabel}>
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <LanguageSwitcher language={language} copy={copy} onChange={changeLanguage} />
            <a className="nav-cta" href="mailto:tzyudistira@gmail.com">
              {copy.navigation.talk}
              <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>

          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? copy.navigation.closeMenu : copy.navigation.openMenu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>

        <div
          className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}
          aria-hidden={!menuOpen}
          data-lenis-prevent
        >
          <nav aria-label={copy.navigation.mobileLabel}>
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
                <FiArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </nav>
          <div className="mobile-menu-footer">
            <div className="mobile-language-row">
              <span>{copy.language.label}</span>
              <LanguageSwitcher language={language} copy={copy} onChange={changeLanguage} />
            </div>
            <a className="button button--light" href="mailto:tzyudistira@gmail.com" onClick={closeMenu}>
              {copy.navigation.startConversation}
            </a>
          </div>
        </div>
      </header>

      <main id="main-content" ref={mainRef}>
        <section id="top" className="hero-stage">
          <CinematicHero
            title={copy.hero.title}
            kicker={
              <>
                {copy.hero.role} <span aria-hidden="true">/</span> {copy.hero.location}
              </>
            }
            tagline1={copy.hero.tagline1}
            tagline2={copy.hero.tagline2}
            brandName="Yuuashura"
            cardHeading={copy.hero.cardHeading}
            cardDescription={copy.hero.introduction}
            portrait={{ src: '/aku.jpg', alt: 'Portrait of Yudistira Syaputra' }}
            badges={[
              { icon: FiBriefcase, title: copy.hero.availability, subtitle: copy.hero.location },
              { icon: FiCode, title: 'Java · TypeScript · React', subtitle: 'Spring Boot · Next.js · PostgreSQL' },
            ]}
            ctaHeading={copy.hero.ctaHeading}
            ctaDescription={copy.hero.ctaDescription}
            primaryAction={{ label: copy.hero.viewWork, href: '#work' }}
            secondaryAction={{ label: copy.hero.downloadCv, href: cvUrl }}
            introDelay={introDelay}
          />
        </section>

        <div className="stack-panel">
          <section className="work-section" id="work">
            <Reveal className="section-heading" amount={0.35}>
              <h2>{copy.work.heading}</h2>
              <p>{copy.work.introduction}</p>
            </Reveal>

            <div className="view-toggle" role="group" aria-label={copy.work.viewLabel}>
              <button
                type="button"
                aria-pressed={projectView === 'slide'}
                className={projectView === 'slide' ? 'is-active' : ''}
                onClick={() => setProjectView('slide')}
              >
                <FiLayers aria-hidden="true" />
                {copy.work.viewSlide}
              </button>
              <button
                type="button"
                aria-pressed={projectView === 'grid'}
                className={projectView === 'grid' ? 'is-active' : ''}
                onClick={() => setProjectView('grid')}
              >
                <FiGrid aria-hidden="true" />
                {copy.work.viewGrid}
              </button>
            </div>

            {projectView === 'grid' ? (
              <ProjectGrid projects={projects} copy={copy} language={language} />
            ) : (
              <>
                <Reveal variant="scale" amount={0.2} data-cursor="Drag">
                  <CoverflowCarousel
                    slides={slides}
                    label={copy.work.carouselLabel}
                    cardWidth="clamp(260px, 46vw, 640px)"
                    aspectRatio={16 / 10}
                    rotate={38}
                    cardClassName="work-card"
                    showNavigation
                    showPagination
                    onSelect={setActiveProject}
                    onOpen={(index) => window.location.assign(`/projek/${projects[index].id}`)}
                  />
                </Reveal>

                <div className="work-caption" key={project.id} aria-live="polite">
                  <div className="project-meta">
                    <span>{project.category[language]}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description[language]}</p>
                  <ul className="project-tech" aria-label={`${project.title} ${copy.work.technologiesLabel}`}>
                    {project.tech.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                  <div className="project-actions">
                    <a className="button button--dark" href={`/projek/${project.id}`}>
                      {copy.work.viewDetails}
                      <FiArrowRight aria-hidden="true" />
                    </a>
                    {project.link && (
                      <a className="project-link" href={project.link} target="_blank" rel="noreferrer">
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
              </>
            )}
          </section>
        </div>

        <div className="stack-panel">
        <section className="experience-section" id="experience" ref={experienceRef}>
          <Reveal className="experience-intro" variant="slide-left" amount={0.22}>
            <div className="dev-teach" ref={devTeachRef} role="img" aria-label={copy.experience.note}>
              <span className="dev-teach-pill" ref={developmentRef}>
                {copy.experience.development}
              </span>
              <span className="dev-teach-pill dev-teach-pill--accent" ref={teachingRef}>
                {copy.experience.teaching}
              </span>
              <AnimatedBeam
                containerRef={devTeachRef}
                fromRef={developmentRef}
                toRef={teachingRef}
                curvature={34}
                pathColor="#fff5f5"
                pathOpacity={0.18}
                gradientStartColor="#e2b4bd"
                gradientStopColor="#f7d6d0"
                duration={3.4}
              />
              <AnimatedBeam
                containerRef={devTeachRef}
                fromRef={developmentRef}
                toRef={teachingRef}
                curvature={-34}
                reverse
                pathColor="#fff5f5"
                pathOpacity={0.18}
                gradientStartColor="#f7d6d0"
                gradientStopColor="#e2b4bd"
                duration={3.4}
                delay={1.7}
              />
            </div>
            <motion.h2
              aria-label={copy.experience.heading}
              variants={staggerContainer}
              initial={shouldReduceMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {copy.experience.heading.split(' ').map((word, index) => (
                <Fragment key={`${word}-${index}`}>
                  <span className="word-mask" aria-hidden="true">
                    <motion.span variants={wordItem}>{word}</motion.span>
                  </span>{' '}
                </Fragment>
              ))}
            </motion.h2>
            <p>{copy.experience.introduction}</p>
            <div className="education-note">
              <span>{copy.experience.education}</span>
              <strong>{copy.experience.degree}</strong>
              <p>{copy.experience.university}</p>
              <div className="gpa">
                <CountUp to={3.8} language={language} />
                <span>
                  / {(4).toLocaleString(language, { minimumFractionDigits: 2 })} · {copy.experience.gpa}
                </span>
              </div>
            </div>
          </Reveal>

          <div className="timeline-wrap">
            <div className="timeline-rail" aria-hidden="true">
              <motion.span style={{ scaleY: shouldReduceMotion ? 1 : experienceLineScale }} />
            </div>
            <ol className="timeline">
              {copy.experience.items.map((item, index) => (
                <TimelineItem key={`${item.period}-${item.role}`} item={item} index={index} />
              ))}
            </ol>
          </div>
        </section>

        </div>

        <div className="stack-panel">
        <section className="about-section" id="about">
          <Reveal className="about-heading" amount={0.3}>
            <h2>{copy.about.heading}</h2>
            <p>{copy.about.introduction}</p>
          </Reveal>

          <div className="skills">
            <Reveal className="skills-cloud" variant="scale" amount={0.2}>
              <IconCloud iconSlugs={iconSlugs} />
            </Reveal>

            <div className="skills-list">
              <p className="skills-label">{copy.about.skillsLabel}</p>
              {stackGroups.map((group, index) => (
                <motion.div
                  className="stack-group"
                  key={group.title}
                  initial={shouldReduceMotion ? false : { y: cinematic ? 30 : 14 }}
                  whileInView={shouldReduceMotion ? undefined : { y: 0 }}
                  viewport={{ once: true, amount: 0.55 }}
                  transition={{
                    duration: cinematic ? 0.58 : 0.4,
                    delay: Math.min(index * 0.08, 0.16),
                    ease,
                  }}
                >
                  <h3>{group.title}</h3>
                  <motion.ul
                    variants={staggerContainer}
                    initial={shouldReduceMotion ? false : 'hidden'}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                  >
                    {group.items.map((item) => (
                      <motion.li key={item} variants={staggerItem}>
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              ))}
            </div>
          </div>

          <Reveal className="principles" variant="scale" amount={0.28}>
            <p>{copy.about.principlesLabel}</p>
            <blockquote>{copy.about.principlesQuote}</blockquote>
            <div>
              {copy.about.principles.map((principle) => (
                <span key={principle}>{principle}</span>
              ))}
            </div>
          </Reveal>
        </section>

        </div>

        <CinematicFooter
          id="contact"
          marquee={copy.contact.marquee}
          prompt={copy.contact.prompt}
          heading={copy.contact.heading}
          primaryLinks={[
            { label: copy.contact.emailAction, href: 'mailto:tzyudistira@gmail.com', icon: <FiMail aria-hidden="true" /> },
            { label: '+62 813 7004 0608', href: 'tel:+6281370040608', icon: <FiPhone aria-hidden="true" /> },
          ]}
          secondaryLinks={[
            { label: 'GitHub', href: 'https://github.com/YuuAshura', external: true, icon: <FiGithub aria-hidden="true" /> },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/yudistira-syaputra-b0978b343/',
              external: true,
              icon: <FiLinkedin aria-hidden="true" />,
            },
            { label: copy.hero.downloadCv, href: cvUrl, download: true, icon: <FiDownload aria-hidden="true" /> },
          ]}
          giantText="YUUASHURA"
          copyright={`© ${new Date().getFullYear()} Yudistira Syaputra · ${copy.contact.locationValue}`}
          craftedWith={copy.contact.craftedWith}
          craftedBy={copy.contact.craftedBy}
          author="Yuuashura"
          backToTop={{ label: copy.contact.backToTop, href: '#top' }}
        />
      </main>
    </div>
  )
}

/** Experience row that rolls through 3D like a drum as it crosses the viewport. */
function TimelineItem({
  item,
  index,
}: {
  item: PortfolioContent['experience']['items'][number]
  index: number
}) {
  const ref = useRef<HTMLLIElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotateX = useTransform(scrollYProgress, [0, 0.42, 0.58, 1], [40, 0, 0, -40])
  const scale = useTransform(scrollYProgress, [0, 0.42, 0.58, 1], [0.86, 1, 1, 0.86])
  const z = useTransform(scrollYProgress, [0, 0.42, 0.58, 1], [-120, 0, 0, -120])

  return (
    <motion.li
      ref={ref}
      style={shouldReduceMotion ? { ['--i' as string]: index } : { rotateX, scale, z, ['--i' as string]: index }}
    >
      <time>{item.period}</time>
      <div>
        <h3>{item.role}</h3>
        <p className="timeline-company">{item.company}</p>
        <p>{item.summary}</p>
      </div>
    </motion.li>
  )
}

/** Counts up to `to` the first time it scrolls into view. */
function CountUp({ to, language }: { to: number; language: Language }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const shouldReduceMotion = useReducedMotion()
  const value = useMotionValue(shouldReduceMotion ? to : 0)
  const text = useTransform(value, (current) =>
    current.toLocaleString(language, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  )

  useEffect(() => {
    if (!inView || shouldReduceMotion) return
    const controls = animate(value, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1] })
    return () => controls.stop()
  }, [inView, shouldReduceMotion, to, value])

  return <motion.b ref={ref}>{text}</motion.b>
}

export default App
