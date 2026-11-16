import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Root from './Root.jsx'
import './index.css'

// After a new deploy, a visitor with the old page open asks for page files that no longer exist.
// Reload once to pick up the new version (at most every 10 s, so a real outage can't cause a reload loop).
window.addEventListener('vite:preloadError', (event) => {
  try {
    const last = Number(sessionStorage.getItem('cm-chunk-reload') || 0)
    if (Date.now() - last < 10000) return // let the ErrorBoundary show its message instead
    sessionStorage.setItem('cm-chunk-reload', String(Date.now()))
  } catch {
    return
  }
  event.preventDefault()
  window.location.reload()
})

const container = document.getElementById('root')
const app = <Root Router={BrowserRouter} />

// Every page (English and /hi Hindi) is pre-rendered at build time (scripts/prerender.js):
// attach React to that HTML. Fall back to a fresh render if the HTML is missing (e.g. `npm run dev`).
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
