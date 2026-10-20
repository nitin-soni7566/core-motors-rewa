import Seo from '../components/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import CTA from '../components/CTA.jsx'
import { services } from '../data/services.js'
import { unsplash } from '../data/images.js'
import { useLang } from '../context/LanguageContext.jsx'

export default function Services() {
  const { t } = useLang()
  return (
    <>
      <Seo title={t('services.seoTitle')} description={t('services.seoDesc')} />
      <PageHeader
        title={t('services.title')}
        subtitle={t('services.subtitle')}
        image={unsplash('1670122872487-8fea1dd1c08c', 1600)}
        crumbs={[{ label: t('nav.services') }]}
      />
      <section className="section bg-surface-2">
        <div className="container-x">
          <SectionTitle
            eyebrow={t('services.eyebrow')}
            title={t('services.heading', { n: services.length })}
            subtitle={t('services.hint')}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>
      <CTA title={t('services.ctaTitle')} text={t('services.ctaText')} />
    </>
  )
}
