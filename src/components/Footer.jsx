import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { services } from '../data/services.js'
import { fullAddress, siteConfig, telLink } from '../data/siteConfig.js'
import { useLang } from '../context/LanguageContext.jsx'
import { useBooking } from '../context/BookingContext.jsx'
import Logo from './Logo.jsx'
import SocialIcons from './SocialIcons.jsx'

const YEAR = new Date().getFullYear()

const quickLinks = [
  { to: '/about', key: 'footer.aboutUs' },
  { to: '/services', key: 'footer.ourServices' },
  { to: '/gallery', key: 'nav.gallery' },
  { to: '/contact', key: 'nav.contact' },
  { to: '/privacy', key: 'footer.privacy' },
  { to: '/terms', key: 'footer.terms' },
]

function FooterHeading({ children }) {
  return <h3 className="mb-6 text-[11px] font-semibold tracking-[0.25em] text-neutral-500 uppercase">{children}</h3>
}

export default function Footer() {
  const { t, tx } = useLang()
  const { openBooking } = useBooking()
  return (
    <footer className="relative overflow-hidden bg-[#0a0a0a] text-neutral-400">
      <div className="glow absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative container-x">
        {/* Big call-out row */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 py-14 md:flex-row md:items-center">
          <p className="max-w-xl font-heading text-3xl leading-tight font-semibold text-white md:text-4xl">{t('footer.cta')}</p>
          <button type="button" onClick={() => openBooking()} className="btn-primary shrink-0">
            {t('common.bookService')} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.4fr]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-xs text-sm leading-relaxed">{t('footer.about', { name: siteConfig.name })}</p>
            <SocialIcons className="mt-6" linkClass="h-10 w-10 rounded-full border border-white/10 text-white hover:border-accent hover:bg-accent" />
          </div>

          <div>
            <FooterHeading>{t('footer.quickLinks')}</FooterHeading>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition hover:text-white">
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>{t('footer.popular')}</FooterHeading>
            <ul className="space-y-3 text-sm">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="transition hover:text-white">
                    {tx(s.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>{t('footer.contact')}</FooterHeading>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <a href={siteConfig.mapLink} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {fullAddress()}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <a href={telLink} className="hover:text-white">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <a href={`mailto:${siteConfig.email}`} className="break-all hover:text-white">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  {siteConfig.hours.map((h) => (
                    <span key={h.days.en} className="block">
                      {tx(h.days)}: {tx(h.time)}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-white/10 py-6 text-center text-xs text-neutral-500 sm:flex-row sm:text-left">
          <p>
            © {YEAR} {siteConfig.name}. {t('footer.rights')}
          </p>
          <p>{t('footer.tagline')}</p>
        </div>
      </div>
    </footer>
  )
}
