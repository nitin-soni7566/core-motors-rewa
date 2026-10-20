import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

// Counts up from 0 to `value` the first time it scrolls into view.
export default function Counter({ value, suffix = '', label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <div ref={ref} className="px-4 text-center">
      <p className="font-heading text-4xl font-semibold tracking-tight text-white tabular-nums md:text-6xl">
        <span aria-hidden="true">{display.toLocaleString('en-IN')}</span>
        <span className="sr-only">{value.toLocaleString('en-IN')}</span>
        <span className="text-accent">{suffix}</span>
      </p>
      <p className="mt-3 text-[11px] font-semibold tracking-wider text-neutral-400 uppercase md:text-xs md:tracking-[0.2em]">{label}</p>
    </div>
  )
}
