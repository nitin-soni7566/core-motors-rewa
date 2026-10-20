import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Reveal from '../components/Reveal.jsx'
import BookingForm from '../components/BookingForm.jsx'
import MapEmbed from '../components/MapEmbed.jsx'
import SocialIcons from '../components/SocialIcons.jsx'
import { WhatsAppIcon } from '../components/WhatsAppButton.jsx'
import { unsplash } from '../data/images.js'
import { fullAddress, siteConfig, telLink, whatsappLink } from '../data/siteConfig.js'
import { useLang } from '../context/LanguageContext.jsx'

export default function Contact() {
  const { t, tx } = useLang()
  const contactCards = [
    { icon: Phone, title: t('contact.callUs'), value: siteConfig.phone, href: telLink },
    { icon: WhatsAppIcon, title: t('contact.whatsapp'), value: t('contact.chat'), href: whatsappLink(), external: true },
    { icon: Mail, title: t('contact.email'), value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: MapPin, title: t('contact.visit'), value: fullAddress(), href: siteConfig.mapLink, external: true },
  ]

  return (
    <>
      <Seo title={t('contact.seoTitle')} description={t('contact.seoDesc', { name: siteConfig.name })} />
      <PageHeader
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
        image={unsplash('1663852397535-18292e115327', 1600)}
        crumbs={[{ label: t('nav.contact') }]}
      />

      <section className="relative z-10 -mt-10 md:-mt-14">
        <div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <a
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group card card-hover flex h-full flex-col items-start p-6 shadow-xl shadow-black/5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-white">
                  <c.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-heading font-semibold">{c.title}</h2>
                <p className="mt-1 text-sm break-words text-muted">{c.value}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="card p-6 shadow-xl shadow-black/5 sm:p-10">
              <h2 className="text-2xl font-semibold md:text-3xl">
                {t('contact.formTitle')} <span className="text-accent">{t('contact.formAccent')}</span>
              </h2>
              <p className="mt-2 mb-8 text-sm text-muted">{t('contact.formText')}</p>
              <BookingForm />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="space-y-5 lg:col-span-2">
            <div className="glow relative overflow-hidden rounded-3xl bg-charcoal p-7 text-white">
              <h2 className="flex items-center gap-3 text-xl font-semibold">
                <Clock className="h-5 w-5 text-accent" aria-hidden="true" /> {t('contact.hours')}
              </h2>
              <dl className="mt-6 divide-y divide-white/10">
                {siteConfig.hours.map((h) => (
                  <div key={h.days.en} className="flex justify-between gap-4 py-3.5 text-sm">
                    <dt className="text-neutral-300">{tx(h.days)}</dt>
                    <dd className={h.closed ? 'font-semibold text-accent' : 'font-semibold'}>{tx(h.time)}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs text-neutral-400">{t('contact.emergency')}</p>
            </div>
            <div className="card p-7">
              <h2 className="text-lg font-semibold">{t('contact.follow')}</h2>
              <p className="mt-1 text-sm text-muted">{t('contact.followText')}</p>
              <SocialIcons className="mt-4" linkClass="h-11 w-11 rounded-full border border-line text-ink hover:border-accent hover:bg-accent hover:text-white" iconClass="h-5 w-5" />
            </div>
            <MapEmbed className="h-72" />
          </Reveal>
        </div>
      </section>
    </>
  )
}
