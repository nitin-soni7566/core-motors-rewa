import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faqs as defaultFaqs } from '../data/faqs.js'
import { useLang } from '../context/LanguageContext.jsx'

export default function FAQ({ items = defaultFaqs }) {
  const [open, setOpen] = useState(0)
  const baseId = useId()
  const { tx } = useLang()

  return (
    <div className="space-y-3">
      {items.map((faq, i) => {
        const isOpen = open === i
        return (
          <div
            key={faq.q.en}
            className={`overflow-hidden rounded-2xl border bg-card transition-all duration-300 ${
              isOpen ? 'border-accent/40 shadow-[0_20px_50px_-25px_rgba(225,6,0,0.35)]' : 'border-line hover:border-ink/20'
            }`}
          >
            <h3>
              <button
                type="button"
                id={`${baseId}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${baseId}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-heading text-[15px] font-medium text-ink md:px-7"
              >
                {tx(faq.q)}
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                    isOpen ? 'rotate-45 bg-accent text-white' : 'bg-surface-2 text-ink'
                  }`}
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${baseId}-a${i}`}
                  role="region"
                  aria-labelledby={`${baseId}-q${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="px-5 pb-6 text-sm leading-relaxed text-muted md:px-7">{tx(faq.a)}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
