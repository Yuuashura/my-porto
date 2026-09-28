import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
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
  FiArrowDown,
  FiArrowRight,
  FiArrowUpRight,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
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
import { useDesktopMotion, useSmoothScroll } from './hooks/useMotion'
import { useLanguage } from './hooks/useLanguage'
import { content, type Language } from './content'

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

  useLayoutEffect(() => {
    if (!window.location.hash) return
    document.querySelector(window.location.hash)?.scrollIntoView()
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage)
    setMenuOpen(false)
  }
  const heroDistance = cinematic ? 68 : 24
  const heroEase = [0.16, 1, 0.3, 1] as const
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

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-copy">
            <motion.p
              className="hero-kicker"
              initial={shouldReduceMotion ? false : { x: -heroDistance * 0.5 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.62, delay: introDelay + 0.06, ease: heroEase }}
            >
              {copy.hero.role} <span aria-hidden="true">/</span> {copy.hero.location}
            </motion.p>
            <h1 aria-label={copy.hero.title}>
              {copy.hero.titleLines.map((line, index) => (
                <span className="hero-title-line" key={line} aria-hidden="true">
                  <motion.span
                    initial={shouldReduceMotion ? false : { y: heroDistance, rotate: cinematic ? 1.2 : 0 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{
                      duration: cinematic ? 0.78 : 0.52,
                      delay: introDelay + 0.1 + index * (cinematic ? 0.075 : 0.045),
                      ease: heroEase,
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.div
              className="hero-intro"
              initial={shouldReduceMotion ? false : { y: cinematic ? 34 : 16 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.66, delay: introDelay + (cinematic ? 0.42 : 0.24), ease: heroEase }}
            >
              <p>{copy.hero.introduction}</p>
              <div className="hero-actions">
                <a className="button button--dark" href="#work">
                  {copy.hero.viewWork}
                  <FiArrowDown aria-hidden="true" />
                </a>
                <a className="text-link" href={cvUrl} download>
                  <FiDownload aria-hidden="true" />
                  {copy.hero.downloadCv}
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="hero-portrait"
            initial={shouldReduceMotion ? false : { scale: cinematic ? 1.075 : 1.025, y: cinematic ? 22 : 10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: cinematic ? 0.86 : 0.54, delay: introDelay + 0.18, ease: heroEase }}
          >
            <div className="portrait-image-wrap">
              <img src="/aku.jpg" alt="Portrait of Yudistira Syaputra" fetchPriority="high" />
              <span className="portrait-sheen" aria-hidden="true" />
            </div>
            <motion.div
              className="portrait-caption"
              initial={shouldReduceMotion ? false : { x: cinematic ? -44 : -18 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.58, delay: introDelay + (cinematic ? 0.52 : 0.3), ease: heroEase }}
            >
              <span>{copy.hero.availability}</span>
              <span className="availability-dot" aria-hidden="true" />
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-proof"
            initial={shouldReduceMotion ? false : { y: cinematic ? 26 : 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.58, delay: introDelay + (cinematic ? 0.55 : 0.32), ease: heroEase }}
          >
            <p>{copy.hero.buildingWith}</p>
            <motion.div
              aria-label="Core technology stack"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07, delayChildren: introDelay + 0.08 } },
              }}
              initial={shouldReduceMotion ? false : 'hidden'}
              animate="visible"
            >
              {['Java', 'TypeScript', 'React', 'Next.js', 'PostgreSQL'].map((technology) => (
                <motion.span key={technology} variants={staggerItem}>
                  {technology}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section className="work-section" id="work">
          <Reveal className="section-heading" amount={0.35}>
            <h2>{copy.work.heading}</h2>
            <p>{copy.work.introduction}</p>
          </Reveal>

          <Reveal variant="scale" amount={0.2}>
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
        </section>

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
                pathColor="#ffffff"
                pathOpacity={0.18}
                gradientStartColor="#ff7759"
                gradientStopColor="#b4e3d7"
                duration={3.4}
              />
              <AnimatedBeam
                containerRef={devTeachRef}
                fromRef={developmentRef}
                toRef={teachingRef}
                curvature={-34}
                reverse
                pathColor="#ffffff"
                pathOpacity={0.18}
                gradientStartColor="#b4e3d7"
                gradientStopColor="#ff7759"
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
                <motion.li
                  key={`${item.period}-${item.role}`}
                  style={{ ['--i' as string]: index }}
                  initial={shouldReduceMotion ? false : { x: cinematic ? 38 : 16 }}
                  whileInView={shouldReduceMotion ? undefined : { x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: cinematic ? 0.62 : 0.42,
                    delay: Math.min(index * 0.07, 0.21),
                    ease: heroEase,
                  }}
                >
                  <time>{item.period}</time>
                  <div>
                    <h3>{item.role}</h3>
                    <p className="timeline-company">{item.company}</p>
                    <p>{item.summary}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

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
                    ease: heroEase,
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

        <section className="contact-section" id="contact">
          <Reveal className="contact-main" amount={0.35}>
            <p>{copy.contact.prompt}</p>
            <h2>{copy.contact.heading}</h2>
            <a className="button button--light button--large" href="mailto:tzyudistira@gmail.com">
              {copy.contact.emailAction}
              <FiArrowUpRight aria-hidden="true" />
            </a>
          </Reveal>

          <Reveal className="contact-details" amount={0.3} delay={0.08}>
            <a href="mailto:tzyudistira@gmail.com">
              <FiMail aria-hidden="true" />
              <span>
                <small>{copy.contact.email}</small>
                tzyudistira@gmail.com
              </span>
            </a>
            <a href="tel:+6281370040608">
              <FiPhone aria-hidden="true" />
              <span>
                <small>{copy.contact.phone}</small>
                +62 813 7004 0608
              </span>
            </a>
            <div>
              <FiMapPin aria-hidden="true" />
              <span>
                <small>{copy.contact.location}</small>
                {copy.contact.locationValue}
              </span>
            </div>
          </Reveal>

          <footer>
            <p>© {new Date().getFullYear()} Yudistira Syaputra</p>
            <div>
              <a
                href="https://github.com/YuuAshura"
                target="_blank"
                rel="noreferrer"
                aria-label="Yudistira on GitHub"
              >
                <FiGithub aria-hidden="true" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/yudistira-syaputra-b0978b343/"
                target="_blank"
                rel="noreferrer"
                aria-label="Yudistira on LinkedIn"
              >
                <FiLinkedin aria-hidden="true" />
                LinkedIn
              </a>
            </div>
          </footer>
        </section>
      </main>
    </div>
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
