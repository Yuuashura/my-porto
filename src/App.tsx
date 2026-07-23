import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'
import {
  FiArrowDown,
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
import { useDesktopMotion, useSmoothScroll } from './hooks/useMotion'
import {
  content,
  type Language,
  type PortfolioContent,
} from './content'

const cvUrl = new URL('../JAVA DEVELOPER - YUDISTIRA SYAPUTRA.pdf', import.meta.url).href

const stackItems = [
  ['Java', 'Spring Boot', 'REST API', 'Microservices', 'OOP'],
  ['MySQL', 'PostgreSQL', 'SQL Server', 'Relational Design'],
  ['React', 'Next.js', 'Node.js', 'TypeScript', 'Git & GitHub'],
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

function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = window.localStorage.getItem('ys-portfolio-language')
    if (savedLanguage === 'en' || savedLanguage === 'id') return savedLanguage
    return window.navigator.language.toLowerCase().startsWith('id') ? 'id' : 'en'
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const experienceRef = useRef<HTMLElement>(null)
  const cinematic = useDesktopMotion()
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const { scrollYProgress: experienceProgress } = useScroll({
    target: experienceRef,
    offset: ['start 70%', 'end 35%'],
  })
  const experienceLineScale = useTransform(experienceProgress, [0, 1], [0, 1])
  const copy = content[language]
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

  useSmoothScroll(menuOpen)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    document.documentElement.lang = language
    document.title = copy.meta.title
    window.localStorage.setItem('ys-portfolio-language', language)

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const openGraphDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
    description?.setAttribute('content', copy.meta.description)
    openGraphDescription?.setAttribute('content', copy.meta.description)
  }, [copy.meta.description, copy.meta.title, language])

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

  return (
    <div className="site-shell">
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
            <LanguageSwitcher
              language={language}
              copy={copy}
              onChange={changeLanguage}
            />
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
              <LanguageSwitcher
                language={language}
                copy={copy}
                onChange={changeLanguage}
              />
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
              transition={{ duration: 0.62, delay: 0.06, ease: heroEase }}
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
                      delay: 0.1 + index * (cinematic ? 0.075 : 0.045),
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
              transition={{ duration: 0.66, delay: cinematic ? 0.42 : 0.24, ease: heroEase }}
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
            transition={{ duration: cinematic ? 0.86 : 0.54, delay: 0.18, ease: heroEase }}
          >
            <div className="portrait-image-wrap">
              <img src="/im.jpg" alt="Portrait of Yudistira Syaputra" fetchPriority="high" />
              <span className="portrait-sheen" aria-hidden="true" />
            </div>
            <motion.div
              className="portrait-caption"
              initial={shouldReduceMotion ? false : { x: cinematic ? -44 : -18 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.58, delay: cinematic ? 0.52 : 0.3, ease: heroEase }}
            >
              <span>{copy.hero.availability}</span>
              <span className="availability-dot" aria-hidden="true" />
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-proof"
            initial={shouldReduceMotion ? false : { y: cinematic ? 26 : 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.58, delay: cinematic ? 0.55 : 0.32, ease: heroEase }}
          >
            <p>{copy.hero.buildingWith}</p>
            <motion.div
              aria-label="Core technology stack"
              variants={staggerContainer}
              initial={shouldReduceMotion ? false : 'hidden'}
              animate="visible"
            >
              {['Java', 'Spring Boot', 'React', 'PostgreSQL'].map((technology) => (
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

          <div className="project-list">
            {projects.map((project, index) => (
              <article className={`project project--${project.tone}`} key={project.id}>
                <Reveal
                  className="project-copy"
                  variant={index % 2 === 0 ? 'slide-left' : 'slide-right'}
                  amount={0.28}
                >
                  <div className="project-meta">
                    <span>{project.category[language]}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description[language]}</p>
                  <motion.ul
                    className="project-tech"
                    aria-label={`${project.title} ${copy.work.technologiesLabel}`}
                    variants={staggerContainer}
                    initial={shouldReduceMotion ? false : 'hidden'}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.6 }}
                  >
                    {project.tech.map((technology) => (
                      <motion.li key={technology} variants={staggerItem}>
                        {technology}
                      </motion.li>
                    ))}
                  </motion.ul>
                  {project.github && (
                    <a className="project-link" href={project.github} target="_blank" rel="noreferrer">
                      {copy.work.viewGithub}
                      <FiArrowUpRight aria-hidden="true" />
                    </a>
                  )}
                </Reveal>

                <ProjectVisual type={project.id} index={index} copy={copy.projectVisuals} />
              </article>
            ))}
          </div>
        </section>

        <section className="experience-section" id="experience" ref={experienceRef}>
          <Reveal className="experience-intro" variant="slide-left" amount={0.22}>
            <p className="section-note">{copy.experience.note}</p>
            <h2>{copy.experience.heading}</h2>
            <p>{copy.experience.introduction}</p>
            <div className="education-note">
              <span>{copy.experience.education}</span>
              <strong>{copy.experience.degree}</strong>
              <p>{copy.experience.university}</p>
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

          <div className="stack-list">
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

function LanguageSwitcher({
  language,
  copy,
  onChange,
}: {
  language: Language
  copy: PortfolioContent
  onChange: (language: Language) => void
}) {
  return (
    <div className="language-switcher" role="group" aria-label={copy.language.label}>
      <button
        type="button"
        className={language === 'en' ? 'is-active' : ''}
        aria-label={copy.language.english}
        aria-pressed={language === 'en'}
        onClick={() => onChange('en')}
      >
        EN
      </button>
      <button
        type="button"
        className={language === 'id' ? 'is-active' : ''}
        aria-label={copy.language.indonesian}
        aria-pressed={language === 'id'}
        onClick={() => onChange('id')}
      >
        ID
      </button>
    </div>
  )
}

function ProjectVisual({
  type,
  index,
  copy,
}: {
  type: string
  index: number
  copy: PortfolioContent['projectVisuals']
}) {
  const visualRef = useRef<HTMLDivElement>(null)
  const cinematic = useDesktopMotion()
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const visualTransition = {
    duration: cinematic ? 0.72 : 0.46,
    ease: [0.16, 1, 0.3, 1] as const,
  }

  if (type === 'booking-hotels') {
    return (
      <motion.div
        ref={visualRef}
        className="project-visual project-visual--architecture"
        role="img"
        aria-label={copy.bookingIllustration}
        style={{ y: cinematic && !shouldReduceMotion ? parallaxY : 0 }}
        initial={shouldReduceMotion ? false : { scale: cinematic ? 1.045 : 1.015 }}
        whileInView={shouldReduceMotion ? undefined : { scale: 1 }}
        whileHover={cinematic ? { scale: 1.008 } : undefined}
        viewport={{ once: true, amount: 0.22 }}
        transition={visualTransition}
      >
        <div className="architecture-title">
          <span>{copy.bookingFlow}</span>
          <span>{copy.microservices}</span>
        </div>
        <div className="service-flow">
          <div className="service-node service-node--primary">{copy.reactClient}</div>
          <span aria-hidden="true">→</span>
          <div className="service-node">{copy.apiGateway}</div>
          <span aria-hidden="true">→</span>
          <div className="service-stack">
            <span>{copy.auth}</span>
            <span>{copy.hotels}</span>
            <span>{copy.booking}</span>
          </div>
        </div>
        <div className="architecture-footer">
          <span>{copy.jwt}</span>
          <span>{copy.persistence}</span>
        </div>
      </motion.div>
    )
  }

  if (type === 'exam-vocabulary') {
    return (
      <motion.div
        ref={visualRef}
        className="project-visual project-visual--exam"
        role="img"
        aria-label={copy.examIllustration}
        style={{ y: cinematic && !shouldReduceMotion ? parallaxY : 0 }}
        initial={shouldReduceMotion ? false : { scale: cinematic ? 1.045 : 1.015 }}
        whileInView={shouldReduceMotion ? undefined : { scale: 1 }}
        whileHover={cinematic ? { scale: 1.008 } : undefined}
        viewport={{ once: true, amount: 0.22 }}
        transition={visualTransition}
      >
        <div className="exam-window">
          <div className="window-bar">
            <span />
            <span />
            <span />
            <p>{copy.assessment}</p>
          </div>
          <div className="exam-body">
            <div className="exam-progress">
              <span>{copy.question}</span>
              <i>
                <b />
              </i>
            </div>
            <h4>{copy.chooseMeaning}</h4>
            <div className="answer-row answer-row--selected">
              <span>A</span>
              <p>{copy.answerAccurate}</p>
              <b>{copy.selected}</b>
            </div>
            <div className="answer-row">
              <span>B</span>
              <p>{copy.answerTemporary}</p>
            </div>
            <div className="exam-note">{copy.correctionReady}</div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={visualRef}
      className="project-visual project-visual--scholarship"
      role="img"
      aria-label={copy.scholarshipIllustration}
      style={{ y: cinematic && !shouldReduceMotion ? parallaxY : 0 }}
      initial={shouldReduceMotion ? false : { scale: cinematic ? 1.045 : 1.015 }}
      whileInView={shouldReduceMotion ? undefined : { scale: 1 }}
      whileHover={cinematic ? { scale: 1.008 } : undefined}
      viewport={{ once: true, amount: 0.22 }}
      transition={visualTransition}
    >
      <div className="admin-sidebar">
        <strong>PUB</strong>
        <span className="active" />
        <span />
        <span />
        <span />
      </div>
      <div className="admin-content">
        <div className="admin-head">
          <div>
            <span>{copy.scholarship}</span>
            <h4>{copy.studentRecords}</h4>
          </div>
          <b>{copy.addStudent}</b>
        </div>
        <div className="admin-stats">
          <div>
            <span>{copy.applications}</span>
            <strong>{copy.open}</strong>
          </div>
          <div>
            <span>{copy.selection}</span>
            <strong>{copy.tokenBased}</strong>
          </div>
        </div>
        <div className="admin-table">
          {[0, 1, 2].map((row) => (
            <div key={row}>
              <i />
              <span />
              <span />
              <b>{row === index ? copy.reviewed : copy.registered}</b>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default App
