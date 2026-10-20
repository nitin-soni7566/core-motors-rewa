import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight, CalendarCheck, CheckCircle2, Phone } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import ServiceIcon from '../components/ServiceIcon.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import { WhatsAppIcon } from '../components/WhatsAppButton.jsx'
import { getServiceBySlug, services } from '../data/services.js'
import { siteConfig, telLink, whatsappLink } from '../data/siteConfig.js'
import { useBooking } from '../context/BookingContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import NotFound from './NotFound.jsx'

export default function ServiceDetail() {
  const { slug } = useParams()
  const { openBooking } = useBooking()
  const { t, tx } = useLang()
  const service = getServiceBySlug(slug)

  if (!service) return <NotFound />

  const title = tx(service.title)
  const index = services.indexOf(service)
  const related = [1, 2, 3].map((n) => services[(index + n) % services.length])

  return (
    <>
      <Seo
        title={t('detail.seoTitle', { service: title })}
        description={t('detail.seoDesc', { short: tx(service.short), service: title, name: siteConfig.name })}
        image={service.image}
      />
      <PageHeader
        title={title}
        subtitle={tx(service.short)}
        image={service.image}
        crumbs={[{ label: t('nav.services'), to: '/services' }, { label: title }]}
      />

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-3 lg:gap-14">
          <div className="lg:col-span-2">
            <Reveal>
              <img src={service.image} alt={tx(service.alt)} className="aspect-[16/9] w-full rounded-3xl object-cover shadow-2xl" />
            </Reveal>
            <Reveal className="mt-12">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-white shadow-[0_12px_30px_-8px_rgba(225,6,0,0.7)]">
                  <ServiceIcon name={service.icon} className="h-6 w-6" />
                </span>
                <h2 className="text-2xl font-semibold md:text-3xl">{t('detail.about')}</h2>
              </div>
              <p className="mt-6 text-[15.5px] leading-relaxed text-muted">{tx(service.description)}</p>
            </Reveal>
            <Reveal className="mt-12">
              <h2 className="text-2xl font-semibold">{t('detail.included')}</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {tx(service.benefits).map((b) => (
                  <li key={b} className="flex items-start gap-3 rounded-xl border border-line bg-surface-2 p-4 text-sm font-medium">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="mt-10">
              <button type="button" onClick={() => openBooking(service.slug)} className="btn-primary w-full sm:w-auto">
                <CalendarCheck className="h-4 w-4" aria-hidden="true" /> {t('detail.bookThis')}
              </button>
            </Reveal>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="glow relative overflow-hidden rounded-3xl bg-charcoal p-7 text-white">
              <h2 className="text-xl font-semibold">{t('detail.bookTitle', { service: title })}</h2>
              <p className="mt-2 text-sm text-neutral-400">{t('detail.bookText')}</p>
              <div className="mt-6 space-y-3">
                <button type="button" onClick={() => openBooking(service.slug)} className="btn-primary w-full">
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" /> {t('detail.bookThis')}
                </button>
                <a href={telLink} className="btn-outline w-full">
                  <Phone className="h-4 w-4" aria-hidden="true" /> {t('common.callNow')}
                </a>
                <a
                  href={whatsappLink(t('detail.waMessage', { service: title }))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn w-full bg-[#25D366] text-white hover:-translate-y-0.5 hover:brightness-95"
                >
                  <WhatsAppIcon className="h-4 w-4" /> {t('common.whatsapp')}
                </a>
              </div>
            </div>
            <div className="card p-6">
              <h2 className="text-lg font-semibold">{t('detail.all')}</h2>
              <ul className="mt-4 max-h-80 space-y-0.5 overflow-y-auto pr-1">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/services/${s.slug}`}
                      aria-current={s.slug === slug ? 'page' : undefined}
                      className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition ${
                        s.slug === slug ? 'bg-accent text-white' : 'text-muted hover:bg-surface-2 hover:text-ink'
                      }`}
                    >
                      {tx(s.title)}
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="section bg-surface-2">
        <div className="container-x">
          <SectionTitle eyebrow={t('detail.relatedEyebrow')} title={t('detail.related')} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {related.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
