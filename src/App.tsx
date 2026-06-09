import Navbar from './components/Navbar'
import HeroTeyvat from './components/HeroTeyvat'
import AboutSection from './components/AboutSection'
import Constellation from './components/Constellation'
import ProjectDomains from './components/ProjectDomains'
import StatsSection from './components/StatsSection'
import ContactAltar from './components/ContactAltar'
import ScrollProgressBar from './components/ScrollProgressBar'
import ParallaxOrnaments from './components/ParallaxOrnaments'

function App() {
  return (
    <div className="min-h-screen fontaine-gradient-bg overflow-hidden">
      <Navbar />
      <ScrollProgressBar />
      <ParallaxOrnaments />
      <main>
        <HeroTeyvat />
        <AboutSection />
        <StatsSection />
        <Constellation />
        <ProjectDomains />
        <ContactAltar />
      </main>
    </div>
  )
}

export default App
