import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../context/LanguageContext.jsx'
import SandName from './SandName.jsx'
import { markIntroDone } from '../context/introStore.js'

const SEEN_KEY = 'cm-intro-seen'

const shouldShow = () => {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return !sessionStorage.getItem(SEEN_KEY)
  } catch {
    return false
  }
}

// Full-screen sand-particle intro, shown once per browser session.
export default function IntroSplash() {
  const [visible, setVisible] = useState(shouldShow)
  const { t } = useLang()

  const hide = useCallback(() => {
    setVisible(false)
    markIntroDone()
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    if (!visible) {
      markIntroDone() // splash skipped (already seen / reduced motion)
      return
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const maxTimer = setTimeout(hide, 5000) // never block the site for long
    const onKey = (e) => e.key === 'Escape' && hide()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      clearTimeout(maxTimer)
      window.removeEventListener('keydown', onKey)
    }
  }, [visible, hide])

  const handleFormed = useCallback(() => setTimeout(hide, 1200), [hide])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="glow fixed inset-0 z-[100] bg-charcoal"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Core Motors Rewa"
        >
          <div className="grid-lines absolute inset-0" aria-hidden="true" />
          <SandName className="relative" onFormed={handleFormed} />
          <button
            type="button"
            onClick={hide}
            className="absolute right-4 bottom-6 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-xs font-semibold tracking-[0.2em] text-white/80 uppercase backdrop-blur transition hover:border-white hover:text-white md:right-8 md:bottom-8"
          >
            {t('intro.skip')}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
