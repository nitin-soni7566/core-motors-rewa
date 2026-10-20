import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLang } from '../context/LanguageContext.jsx'

// Dark banner with breadcrumb shown at the top of inner pages.
export default function PageHeader({ title, subtitle, image, crumbs = [] }) {
  const { t } = useLang()
  return (
    <section className="relative overflow-hidden bg-charcoal py-20 text-white md:py-28">
      {image && (
        <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-35" />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/30" aria-hidden="true" />
      <div className="grid-lines absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="glow absolute inset-0" aria-hidden="true" />
      <div className="relative container-x">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <nav aria-label={t('common.breadcrumb')} className="mb-6">
            <ol className="inline-flex flex-wrap items-center gap-1 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-neutral-400 backdrop-blur">
              <li>
                <Link to="/" className="hover:text-white">
                  {t('common.home')}
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1">
                  <ChevronRight className="h-3 w-3" aria-hidden="true" />
                  {c.to ? (
                    <Link to={c.to} className="hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white" aria-current="page">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="max-w-3xl text-4xl leading-[1.1] font-semibold sm:text-5xl md:text-6xl">{title}</h1>
          {subtitle && <p className="mt-5 max-w-2xl text-base text-neutral-300 md:text-lg">{subtitle}</p>}
        </motion.div>
      </div>
    </section>
  )
}
