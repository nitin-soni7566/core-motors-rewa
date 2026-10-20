import { useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useLang } from '../context/LanguageContext.jsx'

export default function Lightbox({ items, index, onClose, onChange }) {
  const { t, tx } = useLang()
  const open = index !== null && index >= 0
  const item = open ? items[index] : null

  const prev = useCallback(() => onChange((index - 1 + items.length) % items.length), [index, items.length, onChange])
  const next = useCallback(() => onChange((index + 1) % items.length), [index, items.length, onChange])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, prev, next])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 backdrop-blur p-4"
          role="dialog"
          aria-modal="true"
          aria-label={t('lightbox.label')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-accent"
            aria-label={t('lightbox.close')}
            autoFocus
          >
            <X className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-accent md:left-6"
            aria-label={t('lightbox.prev')}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-accent md:right-6"
            aria-label={t('lightbox.next')}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <motion.figure
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="max-h-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={item.image} alt={tx(item.alt)} className="max-h-[80vh] w-auto rounded-xl object-contain" />
            <figcaption className="mt-3 text-center text-sm text-neutral-300">
              <span className="mr-2 rounded bg-accent px-2 py-0.5 text-xs font-semibold text-white uppercase">{t(`gallery.cat.${item.category}`)}</span>
              {tx(item.alt)} · {index + 1} / {items.length}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
