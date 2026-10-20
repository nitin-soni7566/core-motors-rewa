import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ZoomIn } from 'lucide-react'
import Lightbox from './Lightbox.jsx'
import { useLang } from '../context/LanguageContext.jsx'

// Image grid with a lightbox. Pass a filtered list of gallery items.
export default function Gallery({ items, className = 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' }) {
  const [active, setActive] = useState(null)
  const { t, tx } = useLang()

  return (
    <>
      <motion.ul layout className={`grid gap-3 md:gap-4 ${className}`}>
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group relative block aspect-square w-full overflow-hidden rounded-2xl bg-surface-3"
                aria-label={t('gallery.view', { alt: tx(item.alt) })}
              >
                <img
                  src={item.image.replace('w=1600', 'w=600')}
                  alt={tx(item.alt)}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-t from-black/80 via-black/40 to-black/10 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <ZoomIn className="h-8 w-8 text-accent" aria-hidden="true" />
                  <span className="text-xs font-semibold tracking-widest uppercase">{t(`gallery.cat.${item.category}`)}</span>
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      <Lightbox items={items} index={active} onClose={() => setActive(null)} onChange={setActive} />
    </>
  )
}
