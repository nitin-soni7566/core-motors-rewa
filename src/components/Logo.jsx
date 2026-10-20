import { Link } from 'react-router-dom'

export default function Logo({ light = false, onClick }) {
  return (
    <Link to="/" onClick={onClick} className="group flex items-center gap-2.5" aria-label="Core Motors Rewa — home">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent font-heading text-lg font-extrabold text-white shadow-md shadow-accent/30 transition-transform duration-300 group-hover:-rotate-6">
        CM
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-heading text-lg font-extrabold tracking-wider ${light ? 'text-white' : 'text-charcoal'}`}>
          CORE MOTORS
        </span>
        <span className="mt-1 text-[11px] font-semibold tracking-[0.35em] text-accent uppercase">Rewa</span>
      </span>
    </Link>
  )
}
