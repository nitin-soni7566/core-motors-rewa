import { createContext, useCallback, useContext, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { translations } from '../i18n/translations.js'
import { isHindiPath, localizePath, stripLang } from '../i18n/routing.js'

const LanguageContext = createContext(null)

// The language comes from the address: /hi/... is Hindi, everything else English. Each language has
// its own URLs, so Google can index (and people can share) the Hindi pages separately.
export function LanguageProvider({ children }) {
  const { pathname, search, hash } = useLocation()
  const navigate = useNavigate()
  const lang = isHindiPath(pathname) ? 'hi' : 'en'

  useEffect(() => {
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en-IN'
  }, [lang])

  // Switching language opens the same page in the other language (keeping the scroll position)
  const setLang = useCallback(
    (next) => {
      if (next === lang) return
      navigate(localizePath(stripLang(pathname), next) + search + hash, { state: { keepScroll: true } })
    },
    [lang, pathname, search, hash, navigate],
  )

  const toggleLang = useCallback(() => setLang(lang === 'en' ? 'hi' : 'en'), [lang, setLang])

  // t('nav.home') or t('home.services.viewAll', { n: 17 }) — UI strings from i18n/translations.js
  const t = useCallback(
    (key, vars) => {
      let str = translations[lang]?.[key] ?? translations.en[key] ?? key
      if (vars) for (const [k, v] of Object.entries(vars)) str = str.replaceAll(`{${k}}`, v)
      return str
    },
    [lang],
  )

  // tx({ en: '…', hi: '…' }) — picks the right language from bilingual data
  const tx = useCallback(
    (value) => (value && typeof value === 'object' && !Array.isArray(value) && 'en' in value ? (value[lang] ?? value.en) : value),
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang, toggleLang, t, tx }), [lang, setLang, toggleLang, t, tx])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>')
  return ctx
}
