import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useLang } from '../context/LanguageContext.jsx'
import ServiceIcon from './ServiceIcon.jsx'

export default function ServiceCard({ service, index = 0 }) {
  const { t, tx } = useLang()
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group card card-hover relative flex h-full flex-col overflow-hidden"
    >
      <div className="relative">
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-3">
          <img
            src={service.image.replace('w=1200', 'w=700')}
            alt={tx(service.alt)}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" aria-hidden="true" />
          <span className="absolute top-4 right-4 font-heading text-xs font-semibold text-white/70 tabular-nums">
            {String(service.id).padStart(2, '0')}
          </span>
        </div>
        <span className="absolute bottom-0 left-6 flex h-14 w-14 translate-y-1/2 items-center justify-center rounded-2xl bg-accent text-white shadow-[0_12px_30px_-8px_rgba(225,6,0,0.7)] ring-4 ring-card transition-transform duration-500 group-hover:-rotate-6">
          <ServiceIcon name={service.icon} className="h-6 w-6" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 pt-11">
        <h3 className="text-lg font-semibold text-ink">
          <Link to={`/services/${service.slug}`} className="after:absolute after:inset-0">
            {tx(service.title)}
          </Link>
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{tx(service.short)}</p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          {t('common.learnMore')}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </span>
      </div>
      <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
    </motion.article>
  )
}
