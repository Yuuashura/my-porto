import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App.tsx'
import ProjectDetail from './pages/ProjectDetail.tsx'

// ponytail: two routes, so a pathname check instead of a router. Add react-router when a third page appears.
const projectSlug = window.location.pathname.match(/^\/projek\/([^/]+)\/?$/)?.[1]

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      {projectSlug ? <ProjectDetail slug={decodeURIComponent(projectSlug)} /> : <App />}
    </MotionConfig>
  </StrictMode>,
)
