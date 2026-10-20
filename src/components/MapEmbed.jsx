import { siteConfig } from '../data/siteConfig.js'
import { useLang } from '../context/LanguageContext.jsx'

export default function MapEmbed({ className = 'h-80 md:h-[420px]' }) {
  const { t } = useLang()
  return (
    <div className={`overflow-hidden rounded-2xl border border-line bg-surface-2 ${className}`}>
      <iframe
        title={t('map.title', { name: siteConfig.name })}
        src={siteConfig.mapEmbedUrl}
        className="h-full w-full border-0 grayscale-[30%] dark:opacity-80 dark:grayscale dark:invert-[0.92] dark:hue-rotate-180"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  )
}
