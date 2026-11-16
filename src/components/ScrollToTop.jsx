import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// New page → start at the top. Switching language keeps the visitor where they were.
export default function ScrollToTop() {
  const { pathname, state } = useLocation()
  const keepScroll = state?.keepScroll

  useEffect(() => {
    if (!keepScroll) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, keepScroll])

  return null
}
