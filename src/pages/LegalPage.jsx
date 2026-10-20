import Seo from '../components/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { useLang } from '../context/LanguageContext.jsx'

// Shared layout for Privacy and Terms pages. Text fields are { en, hi }.
export default function LegalPage({ title, description, updated, sections }) {
  const { t, tx } = useLang()
  return (
    <>
      <Seo title={tx(title)} description={description} />
      <PageHeader title={tx(title)} crumbs={[{ label: tx(title) }]} />
      <section className="section">
        <div className="container-x max-w-3xl">
          <p className="mb-10 inline-block rounded-full border border-line bg-surface-2 px-4 py-1.5 text-xs text-muted">
            {t('legal.updated', { date: tx(updated) })}
          </p>
          <div className="space-y-10">
            {sections.map((s, i) => (
              <div key={s.heading.en} className="flex gap-5">
                <span className="font-heading text-sm font-semibold text-accent tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h2 className="text-xl font-semibold text-ink">{tx(s.heading)}</h2>
                  <p className="mt-3 leading-relaxed text-muted">{tx(s.body)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
