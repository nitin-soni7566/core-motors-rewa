import { ArrowRight, Phone } from 'lucide-react'
import { unsplash } from '../data/images.js'
import { siteConfig, telLink } from '../data/siteConfig.js'
import { useBooking } from '../context/BookingContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import Reveal from './Reveal.jsx'

export default function CTA({ title, text }) {
  const { openBooking } = useBooking()
  const { t } = useLang()
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-3xl bg-charcoal">
          <img
            src={unsplash('1646029642262-022158ff5794', 1600)}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent/85 to-accent/20" aria-hidden="true" />
          <div className="grid-lines absolute inset-0" aria-hidden="true" />
          <div className="relative flex flex-col items-start justify-between gap-8 p-8 sm:p-12 lg:flex-row lg:items-center lg:p-16">
            <div className="max-w-2xl text-white">
              <h2 className="text-3xl leading-tight font-semibold md:text-5xl">{title ?? t('cta.title')}</h2>
              <p className="mt-4 text-base text-white/85 md:text-lg">{text ?? t('cta.text')}</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <button type="button" onClick={() => openBooking()} className="btn group bg-white text-charcoal hover:-translate-y-0.5 hover:bg-neutral-100">
                {t('common.bookService')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>
              <a href={telLink} className="btn-outline" aria-label={t('common.call', { phone: siteConfig.phone })}>
                <Phone className="h-4 w-4" aria-hidden="true" /> {siteConfig.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
