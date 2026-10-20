import { useState } from 'react'
import Seo from '../components/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import GalleryGrid from '../components/Gallery.jsx'
import CTA from '../components/CTA.jsx'
import { gallery, galleryCategories } from '../data/gallery.js'
import { unsplash } from '../data/images.js'
import { useLang } from '../context/LanguageContext.jsx'

export default function Gallery() {
  const [filter, setFilter] = useState('All')
  const { t } = useLang()
  const items = filter === 'All' ? gallery : gallery.filter((g) => g.category === filter)

  return (
    <>
      <Seo title={t('nav.gallery')} description={t('gallery.seoDesc')} />
      <PageHeader
        title={t('gallery.title')}
        subtitle={t('gallery.subtitle')}
        image={unsplash('1727229428005-fcc8feaa2e41', 1600)}
        crumbs={[{ label: t('nav.gallery') }]}
      />
      <section className="section">
        <div className="container-x">
          <div
            className="mx-auto mb-12 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-full border border-line bg-surface-2 p-1.5"
            role="group"
            aria-label={t('gallery.filter')}
          >
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                aria-pressed={filter === cat}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  filter === cat ? 'bg-accent text-white shadow-[0_8px_20px_-6px_rgba(225,6,0,0.6)]' : 'text-muted hover:text-ink'
                }`}
              >
                {t(`gallery.cat.${cat}`)}
                <span className="ml-1.5 text-xs opacity-60">
                  {cat === 'All' ? gallery.length : gallery.filter((g) => g.category === cat).length}
                </span>
              </button>
            ))}
          </div>
          <GalleryGrid items={items} className="grid-cols-2 md:grid-cols-3" />
        </div>
      </section>
      <CTA />
    </>
  )
}
