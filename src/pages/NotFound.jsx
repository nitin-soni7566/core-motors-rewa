import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Phone } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import { siteConfig, telLink } from '../data/siteConfig.js'
import { useLang } from '../context/LanguageContext.jsx'

export default function NotFound() {
  const { t } = useLang()
  return (
    <>
      <Seo title={t('404.seoTitle')} description={t('404.seoDesc')} noindex />
      <section className="relative flex min-h-[75vh] items-center overflow-hidden bg-charcoal py-20 text-white">
        <div className="grid-lines absolute inset-0" aria-hidden="true" />
        <div className="glow absolute inset-0" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <span className="font-heading text-[40vw] leading-none font-extrabold text-white/[0.03] select-none lg:text-[28rem]">404</span>
        </div>
        <div className="relative container-x text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <motion.svg
              viewBox="0 0 120 60"
              className="mx-auto mb-8 h-20 w-40 text-accent"
              animate={{ x: [-6, 6, -6] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              <path
                d="M10 40 L18 24 Q22 18 30 18 L72 18 Q80 18 86 24 L98 34 L108 36 Q114 38 114 44 L114 46 L6 46 L6 44 Q6 40 10 40 Z"
                fill="currentColor"
              />
              <circle cx="32" cy="46" r="8" fill="#fff" stroke="currentColor" strokeWidth="4" />
              <circle cx="92" cy="46" r="8" fill="#fff" stroke="currentColor" strokeWidth="4" />
              <path d="M30 22 L50 22 L50 32 L22 32 Z M56 22 L72 22 Q78 22 82 26 L88 32 L56 32 Z" fill="#111" opacity="0.6" />
            </motion.svg>
            <p className="font-heading text-sm font-bold tracking-[0.3em] text-accent uppercase">{t('404.eyebrow')}</p>
            <h1 className="mt-3 text-3xl font-semibold sm:text-5xl">{t('404.title')}</h1>
            <p className="mx-auto mt-4 max-w-md text-neutral-400">{t('404.text')}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/" className="btn-primary">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {t('404.home')}
              </Link>
              <a href={telLink} className="btn-outline" aria-label={t('common.call', { phone: siteConfig.phone })}>
                <Phone className="h-4 w-4" aria-hidden="true" /> {t('404.call')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
