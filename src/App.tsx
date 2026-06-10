import { useState } from 'react'
import Navbar from './components/Navbar'
import HeroTeyvat from './components/HeroTeyvat'
import AboutSection from './components/AboutSection'
import Constellation from './components/Constellation'
import ProjectDomains from './components/ProjectDomains'
import StatsSection from './components/StatsSection'
import ContactAltar from './components/ContactAltar'
import ScrollProgressBar from './components/ScrollProgressBar'
import ParallaxOrnaments from './components/ParallaxOrnaments'
import ParticleField from './components/ParticleField'
import WishAnimation from './components/WishAnimation'

function App() {
  const [wishOpen, setWishOpen] = useState(false)

  const handleExplore = () => {
    setWishOpen(true)
  }

  const handleWishClose = () => {
    setWishOpen(false)
    setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div className="min-h-screen fontaine-gradient-bg overflow-hidden">
      <ParticleField />
      <Navbar />
      <ScrollProgressBar />
      <ParallaxOrnaments />
      <main>
        <HeroTeyvat onExplore={handleExplore} />
        <AboutSection />
        <StatsSection />
        <Constellation />
        <ProjectDomains />
        <ContactAltar />
      </main>
      <WishAnimation isOpen={wishOpen} onClose={handleWishClose} />
    </div>
  )
}

export default App

