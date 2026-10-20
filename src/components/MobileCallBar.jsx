import { CalendarCheck, Phone } from 'lucide-react'
import { telLink } from '../data/siteConfig.js'
import { useBooking } from '../context/BookingContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'

// Sticky action bar shown only on small screens.
export default function MobileCallBar() {
  const { openBooking } = useBooking()
  const { t } = useLang()
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-white/10 bg-charcoal/95 backdrop-blur-xl shadow-[0_-4px_20px_rgba(0,0,0,0.25)] md:hidden">
      <a href={telLink} className="flex h-14 items-center justify-center gap-2 font-heading text-sm font-semibold text-white uppercase">
        <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
        {t('common.callNow')}
      </a>
      <button
        type="button"
        onClick={() => openBooking()}
        className="flex h-14 items-center justify-center gap-2 bg-accent font-heading text-sm font-semibold text-white uppercase"
      >
        <CalendarCheck className="h-4 w-4" aria-hidden="true" />
        {t('common.bookShort')}
      </button>
    </div>
  )
}
