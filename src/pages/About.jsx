import { Armchair, Award, CheckCircle2, Eye, HeartHandshake, ScanLine, SprayCan, Target, Warehouse, Wrench } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import Reveal from '../components/Reveal.jsx'
import Counter from '../components/Counter.jsx'
import CTA from '../components/CTA.jsx'
import { unsplash } from '../data/images.js'
import { siteConfig } from '../data/siteConfig.js'
import { useLang } from '../context/LanguageContext.jsx'

const values = [
  { icon: Target, key: 'mission' },
  { icon: Eye, key: 'vision' },
  { icon: HeartHandshake, key: 'promise' },
]

// Placeholder team — replace names, roles and photos with your real team.
const team = [
  { name: 'Rajesh Kumar', role: { en: 'Founder & Head Technician', hi: 'संस्थापक और मुख्य टेक्नीशियन' }, image: unsplash('1472099645785-5658abf4ff4e', 500, 600) },
  { name: 'Arjun Verma', role: { en: 'Service Manager', hi: 'सर्विस मैनेजर' }, image: unsplash('1500648767791-00dcc994a43e', 500, 600) },
  { name: 'Sandeep Yadav', role: { en: 'Body Shop & Paint Expert', hi: 'बॉडी शॉप और पेंट विशेषज्ञ' }, image: unsplash('1506794778202-cad84cf45f1d', 500, 600) },
  { name: 'Mohit Gupta', role: { en: 'Detailing Specialist', hi: 'डिटेलिंग विशेषज्ञ' }, image: unsplash('1535713875002-d1d0cf377fde', 500, 600) },
]

const facilityIcons = [ScanLine, Wrench, SprayCan, Award, Warehouse, Armchair]

export default function About() {
  const { t, tx } = useLang()
  return (
    <>
      <Seo title={t('about.seoTitle')} description={t('about.seoDesc', { name: siteConfig.name })} />
      <PageHeader
        title={t('about.title')}
        subtitle={t('about.subtitle')}
        image={unsplash('1628573042918-a91e94c2c906', 1600)}
        crumbs={[{ label: t('nav.about') }]}
      />

      {/* Story */}
      <section className="section overflow-hidden">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionTitle align="left" eyebrow={t('about.storyEyebrow')} title={t('about.storyTitle')} className="!mb-6" />
            <Reveal delay={0.1} className="space-y-4 leading-relaxed text-muted">
              <p>{t('about.story1')}</p>
              <p>{t('about.story2')}</p>
              <ul className="grid gap-3 pt-4 sm:grid-cols-2">
                {['p1', 'p2', 'p3', 'p4'].map((k) => (
                  <li key={k} className="flex items-center gap-3 rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm font-medium text-ink">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                    {t(`about.${k}`)}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal direction="left" className="grid grid-cols-2 gap-4">
            <img
              src={unsplash('1767339736233-f4b02c41ee4a', 600, 800)}
              alt={t('about.img1')}
              loading="lazy"
              className="aspect-[3/4] w-full rounded-3xl object-cover shadow-xl"
            />
            <img
              src={unsplash('1633711507230-f6554ef4d9fa', 600, 800)}
              alt={t('about.img2')}
              loading="lazy"
              className="mt-12 aspect-[3/4] w-full rounded-3xl object-cover shadow-xl"
            />
          </Reveal>
        </div>
      </section>

      {/* Mission / vision */}
      <section className="section bg-surface-2">
        <div className="container-x grid gap-5 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.key} delay={i * 0.1}>
              <div className="group card card-hover relative h-full overflow-hidden p-8">
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent to-accent-light" aria-hidden="true" />
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <v.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h2 className="mt-6 text-xl font-semibold">{t(`about.${v.key}`)}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{t(`about.${v.key}Text`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Counters */}
      <section className="relative overflow-hidden bg-charcoal py-20">
        <div className="glow absolute inset-0" aria-hidden="true" />
        <div className="relative container-x grid grid-cols-2 gap-y-12 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
          {siteConfig.stats.map((s) => (
            <Counter key={s.label} value={s.value} suffix={s.suffix} label={t(s.label)} />
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container-x">
          <SectionTitle eyebrow={t('about.teamEyebrow')} title={t('about.teamTitle')} subtitle={t('about.teamSubtitle')} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.1}>
                <article className="group relative overflow-hidden rounded-3xl bg-surface-3">
                  <img
                    src={m.image}
                    alt={t('about.at', { name: m.name, role: tx(m.role) })}
                    loading="lazy"
                    className="aspect-[5/6] w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/10 bg-black/50 p-4 text-white backdrop-blur-md">
                    <h3 className="font-semibold">{m.name}</h3>
                    <p className="mt-0.5 text-xs text-neutral-300">{tx(m.role)}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section bg-surface-2">
        <div className="container-x">
          <SectionTitle eyebrow={t('about.facEyebrow')} title={t('about.facTitle')} subtitle={t('about.facSubtitle')} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {facilityIcons.map((Icon, i) => (
              <Reveal key={i} delay={(i % 3) * 0.1}>
                <div className="group card card-hover flex h-full gap-4 p-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-charcoal text-white transition group-hover:bg-accent dark:bg-surface-3">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{t(`about.fac${i + 1}.title`)}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{t(`about.fac${i + 1}.text`)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
