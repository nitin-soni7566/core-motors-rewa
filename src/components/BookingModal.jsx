import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useBooking } from '../context/BookingContext.jsx'
import BookingForm from './BookingForm.jsx'
import { useLang } from '../context/LanguageContext.jsx'

export default function BookingModal() {
  const { isOpen, service, closeBooking } = useBooking()
  const { t } = useLang()

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && closeBooking()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, closeBooking])

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && closeBooking()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-line bg-card shadow-2xl sm:rounded-3xl"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-card/90 backdrop-blur-xl px-5 py-4 sm:px-8 sm:py-5">
              <div>
                <h2 id="booking-modal-title" className="text-xl font-semibold text-ink sm:text-2xl">
                  {t('modal.title')} <span className="text-accent">{t('modal.accent')}</span>
                </h2>
                <p className="mt-1 text-sm text-muted">{t('modal.text')}</p>
              </div>
              <button
                type="button"
                onClick={closeBooking}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-ink transition hover:bg-accent hover:text-white"
                aria-label={t('modal.close')}
                autoFocus
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-5 py-6 sm:px-8">
              {/* key resets the form when opened for a different service */}
              <BookingForm key={service} defaultService={service} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
