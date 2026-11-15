import { MapPin, Navigation } from 'lucide-react'
import { siteConfig } from '../data/siteConfig.js'
import { useLang } from '../context/LanguageContext.jsx'

// Dark mode: invert + hue-rotate gives a dark map while keeping the location pin red.
export default function MapEmbed({ className = 'h-80 md:h-[420px]' }) {
  const { t } = useLang()
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-line bg-surface-2 ${className}`}>
      <iframe
        title={t('map.title', { name: siteConfig.name })}
        src={siteConfig.mapEmbedUrl}
        className="h-full w-full border-0 dark:invert-[0.9] dark:hue-rotate-180"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      {/* The embedded pin has no name, so label it and offer one-tap directions */}
      <div className="absolute top-3 left-3 flex max-w-[calc(100%-1.5rem)] items-center gap-3 rounded-xl bg-white/95 py-2 pr-2 pl-3 text-charcoal shadow-lg backdrop-blur">
        <MapPin className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
        <span className="font-heading text-sm leading-tight font-semibold">{siteConfig.name}</span>
        <a
          href={siteConfig.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-xs font-semibold whitespace-nowrap text-white transition hover:bg-accent-dark"
        >
          <Navigation className="h-3.5 w-3.5" aria-hidden="true" /> {t('map.directions')}
        </a>
      </div>
    </div>
  )
}
