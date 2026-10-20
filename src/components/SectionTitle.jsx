import Reveal from './Reveal.jsx'

export default function SectionTitle({ eyebrow, title, subtitle, align = 'center', light = false, className = '' }) {
  const centered = align === 'center'
  return (
    <Reveal className={`mb-12 md:mb-16 ${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <span
          className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase ${
            light ? 'border-white/15 bg-white/5 text-neutral-200' : 'border-line bg-surface-2 text-muted'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(225,6,0,0.6)]" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl leading-[1.15] font-semibold md:text-[2.75rem] ${light ? 'text-white' : 'text-ink'}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-base leading-relaxed md:text-lg ${light ? 'text-neutral-400' : 'text-muted'}`}>{subtitle}</p>
      )}
    </Reveal>
  )
}
