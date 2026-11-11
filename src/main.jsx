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

// Pages are pre-rendered in English at build time (scripts/prerender.js). Attach React to that HTML,
// unless the visitor chose Hindi (boot.js already set <html lang="hi">): then render fresh in Hindi.
if (container.hasChildNodes() && document.documentElement.lang !== 'hi') {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
