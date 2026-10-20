import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  IndianRupee,
  KeyRound,
  MessageCircle,
  ShieldCheck,
  Truck,
  Users,
  Wrench,
} from 'lucide-react'
import Seo from '../components/Seo.jsx'
import Hero from '../components/Hero.jsx'
import BrandsStrip from '../components/BrandsStrip.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import Counter from '../components/Counter.jsx'
import Reviews from '../components/Reviews.jsx'
import Gallery from '../components/Gallery.jsx'
import FAQ from '../components/FAQ.jsx'
import CTA from '../components/CTA.jsx'
import MapEmbed from '../components/MapEmbed.jsx'
import Reveal from '../components/Reveal.jsx'
import { services } from '../data/services.js'
import { gallery } from '../data/gallery.js'
import { unsplash } from '../data/images.js'
import { fullAddress, siteConfig } from '../data/siteConfig.js'
import { useBooking } from '../context/BookingContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'

const featuredSlugs = [
  'general-periodic-service',
  'engine-repair',
  'denting-painting',
  'accidental-insurance-repair',
  'ceramic-coating',
  'paint-protection-film',
]

const whyIcons = [BadgeCheck, Users, IndianRupee, Truck, ShieldCheck, FileCheck2]
const stepIcons = [CalendarCheck, ClipboardCheck, Wrench, KeyRound]

export default function Home() {
  const { openBooking } = useBooking()
  const { t } = useLang()
  const featured = featuredSlugs.map((slug) => services.find((s) => s.slug === slug))

  return (
    <>
      <Seo />
      <Hero />
      <BrandsStrip />

      {/* About intro */}
      <section className="section overflow-hidden">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="right" className="relative">
            <div className="relative grid grid-cols-5 gap-4">
              <img
                src={unsplash('1625047509248-ec889cbff17f', 900, 1100)}
                alt={t('home.about.imgAlt')}
                loading="lazy"
                className="col-span-3 aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl"
              />
              <div className="col-span-2 flex flex-col gap-4 pt-12">
                <img
                  src={unsplash('1663852408695-f57f4d75a536', 600, 600)}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="aspect-square w-full rounded-3xl object-cover shadow-xl"
                />
                <div className="flex flex-1 flex-col justify-end rounded-3xl bg-accent p-5 text-white shadow-[0_20px_50px_-15px_rgba(225,6,0,0.6)]">
                  <p className="font-heading text-4xl font-semibold md:text-5xl">{siteConfig.stats[2].value}+</p>
                  <p className="mt-1 text-xs font-medium tracking-wider uppercase opacity-90">{t('home.about.years')}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionTitle align="left" eyebrow={t('home.about.eyebrow')} title={t('home.about.title')} className="!mb-6" />
            <Reveal delay={0.1}>
              <p className="leading-relaxed text-muted">{t('home.about.text', { name: siteConfig.name })}</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {['p1', 'p2', 'p3', 'p4'].map((k) => (
                  <li key={k} className="flex items-center gap-3 rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm font-medium text-ink">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                    {t(`home.about.${k}`)}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => openBooking()} className="btn-primary">
                  {t('common.bookService')}
                </button>
                <Link to="/about" className="btn-ghost group">
                  {t('home.about.more')}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-surface-2">
        <div className="container-x">
          <SectionTitle eyebrow={t('home.services.eyebrow')} title={t('home.services.title')} subtitle={t('home.services.subtitle')} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {featured.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
          <Reveal className="mt-14 text-center">
            <Link to="/services" className="btn-dark group">
              {t('home.services.viewAll', { n: services.length })}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Counters */}
      <section className="relative overflow-hidden bg-charcoal py-20 md:py-24">
        <img
          src={unsplash('1657179724285-d347db4c73a7', 1600)}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <div className="glow absolute inset-0" aria-hidden="true" />
        <div className="relative container-x grid grid-cols-2 gap-y-12 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
          {siteConfig.stats.map((s) => (
            <Counter key={s.label} value={s.value} suffix={s.suffix} label={t(s.label)} />
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="section">
        <div className="container-x">
          <SectionTitle eyebrow={t('home.why.eyebrow')} title={t('home.why.title')} subtitle={t('home.why.subtitle')} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyIcons.map((Icon, i) => (
              <Reveal key={i} delay={(i % 3) * 0.1}>
                <div className="group card card-hover relative h-full overflow-hidden p-8">
                  <span className="absolute -top-4 -right-2 font-heading text-8xl font-bold text-ink/[0.04] select-none" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-all duration-500 group-hover:bg-accent group-hover:text-white group-hover:shadow-[0_12px_30px_-8px_rgba(225,6,0,0.7)]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="relative mt-6 text-lg font-semibold">{t(`home.why.${i + 1}.title`)}</h3>
                  <p className="relative mt-2.5 text-sm leading-relaxed text-muted">{t(`home.why.${i + 1}.text`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section relative overflow-hidden bg-charcoal text-white">
        <div className="grid-lines absolute inset-0" aria-hidden="true" />
        <div className="glow absolute inset-0" aria-hidden="true" />
        <div className="relative container-x">
          <SectionTitle light eyebrow={t('home.steps.eyebrow')} title={t('home.steps.title')} />
          <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stepIcons.map((Icon, i) => (
              <Reveal as="li" key={i} delay={i * 0.12} className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur transition hover:border-accent/50 hover:bg-white/[0.06]">
                <div className="flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 transition group-hover:bg-accent">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="font-heading text-5xl font-semibold text-white/10">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold">{t(`home.steps.${i + 1}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">{t(`home.steps.${i + 1}.text`)}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <Reviews />

      {/* Gallery preview */}
      <section className="section">
        <div className="container-x">
          <SectionTitle eyebrow={t('home.gallery.eyebrow')} title={t('home.gallery.title')} subtitle={t('home.gallery.subtitle')} />
          <Gallery items={gallery.slice(0, 8)} />
          <Reveal className="mt-12 text-center">
            <Link to="/gallery" className="btn-ghost group">
              {t('home.gallery.viewAll')}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-surface-2">
        <div className="container-x grid gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <SectionTitle align="left" eyebrow={t('home.faq.eyebrow')} title={t('home.faq.title')} subtitle={t('home.faq.subtitle')} />
            <Reveal className="hidden lg:block">
              <Link to="/contact" className="group card flex items-center gap-4 p-6 hover:border-accent/40">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-white">
                  <MessageCircle className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="flex-1">
                  <span className="block font-heading font-semibold text-ink">{t('home.faq.still')}</span>
                  <span className="block text-sm text-muted">{t('home.faq.contact')}</span>
                </span>
                <ArrowUpRight className="h-5 w-5 text-subtle transition group-hover:text-accent" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-3">
            <FAQ />
          </Reveal>
        </div>
      </section>

      <CTA />

      {/* Map */}
      <section aria-label={t('home.map.label')} className="bg-surface pb-20 md:pb-28">
        <div className="container-x">
          <SectionTitle eyebrow={t('home.map.eyebrow')} title={t('home.map.title')} subtitle={fullAddress()} />
          <Reveal>
            <MapEmbed />
          </Reveal>
        </div>
      </section>
    </>
  )
}
