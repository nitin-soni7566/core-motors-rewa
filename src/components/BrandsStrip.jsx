import { brands } from '../data/brands.js'
import { useLang } from '../context/LanguageContext.jsx'

export default function BrandsStrip() {
  const { t } = useLang()
  // Rendered twice so the marquee loops seamlessly
  const row = [...brands, ...brands]
  return (
    <section aria-label={t('brands.title')} className="border-b border-line bg-surface py-10">
      <p className="mb-7 text-center text-[11px] font-semibold tracking-[0.3em] text-subtle uppercase">{t('brands.title')}</p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
          {row.map((brand, i) => (
            <li
              key={`${brand}-${i}`}
              aria-hidden={i >= brands.length ? 'true' : undefined}
              className="flex items-center font-heading text-xl font-semibold tracking-tight whitespace-nowrap text-ink/35 transition-colors duration-300 hover:text-ink md:text-2xl"
            >
              <span className="px-8 md:px-10">{brand}</span>
              <span className="h-1.5 w-1.5 rotate-45 bg-accent/60" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
