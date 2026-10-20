import { useId } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'

const base =
  'relative flex h-10 shrink-0 items-center justify-center overflow-hidden rounded-full border transition-colors duration-300'

export function ThemeToggle({ className = '', onDark = true }) {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLang()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? t('theme.toLight') : t('theme.toDark')}
      title={dark ? t('theme.toLight') : t('theme.toDark')}
      className={`${base} w-10 ${
        onDark ? 'border-white/15 text-white hover:border-accent hover:bg-accent' : 'border-line text-ink hover:border-accent hover:text-accent'
      } ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: -18, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 18, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.25 }}
        >
          {dark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

// Segmented EN | हि switch
export function LangToggle({ className = '', onDark = true }) {
  const { lang, setLang, t } = useLang()
  const pillId = useId() // unique per instance (navbar + mobile menu render one each)
  return (
    <div
      role="group"
      aria-label={t('lang.label')}
      className={`${base} p-0.5 ${onDark ? 'border-white/15' : 'border-line'} ${className}`}
    >
      {[
        { code: 'en', label: 'EN', name: 'English' },
        { code: 'hi', label: 'हि', name: 'हिंदी' },
      ].map((l) => {
        const active = lang === l.code
        return (
          <button
            key={l.code}
            type="button"
            lang={l.code}
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            aria-label={l.name}
            className={`relative z-10 h-full min-w-9 rounded-full px-2.5 text-xs font-semibold transition-colors duration-300 ${
              active ? 'text-white' : onDark ? 'text-neutral-400 hover:text-white' : 'text-muted hover:text-ink'
            }`}
          >
            {active && (
              <motion.span
                layoutId={pillId}
                className="absolute inset-0 -z-10 rounded-full bg-accent"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            {l.label}
          </button>
        )
      })}
    </div>
  )
}
