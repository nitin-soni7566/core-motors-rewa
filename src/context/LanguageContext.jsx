import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from '../i18n/translations.js'

const LanguageContext = createContext(null)
const STORAGE_KEY = 'cm-lang'
const LANGUAGES = ['en', 'hi']

const initialLang = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (LANGUAGES.includes(stored)) return stored
  } catch {
    /* ignore */
  }
  return 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en-IN'
  }, [lang])

  const setLang = useCallback((next) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

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
