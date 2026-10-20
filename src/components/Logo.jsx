import { useId } from 'react'
import { Link } from 'react-router-dom'
import { CAR_PATHS, MARK, WHEEL, spokeLines, tyrePath } from './brandMark.js'
import { TEXT_PATH } from './brandTextPath.js'

// Core Motors mark: car outline + wheel "C" + "ORE MOTORS". Scales to any height.
export function BrandMark({ className = '', carColor = MARK.colors.car, textColor = MARK.colors.text, wheelColor = MARK.colors.wheel }) {
  const maskId = useId()
  return (
    <svg viewBox={`0 0 ${MARK.width} ${MARK.height}`} className={className} aria-hidden="true" focusable="false">
      {/* hides the car where it passes behind the wheel and the letters */}
      <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={MARK.width} height={MARK.height}>
        <rect width={MARK.width} height={MARK.height} fill="#fff" />
        <circle cx={WHEEL.cx} cy={WHEEL.cy} r={WHEEL.outer + 8} fill="#000" />
        <path d={TEXT_PATH} fill="#000" stroke="#000" strokeWidth="14" strokeLinejoin="round" />
      </mask>
      <g mask={`url(#${maskId})`} fill="none" stroke={carColor} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
        {CAR_PATHS.map((d) => (
          // non-scaling stroke keeps the outline crisp at small logo sizes
          <path key={d} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
      <g fill={wheelColor} stroke={wheelColor} strokeLinecap="round">
        <path d={tyrePath()} stroke="none" />
        <circle cx={WHEEL.cx} cy={WHEEL.cy} r={WHEEL.rim} fill="none" strokeWidth={WHEEL.rimStroke} />
        {spokeLines().map(([x1, y1, x2, y2]) => (
          <line key={`${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={WHEEL.spokeWidth} />
        ))}
        <circle cx={WHEEL.cx} cy={WHEEL.cy} r={WHEEL.hub} stroke="none" />
      </g>
      <path d={TEXT_PATH} fill={textColor} />
    </svg>
  )
}

export default function Logo({ onClick }) {
  return (
    <Link to="/" onClick={onClick} className="group flex shrink-0 flex-col items-end" aria-label="Core Motors Rewa — home">
      <BrandMark className="h-9 w-auto transition-transform duration-500 group-hover:scale-[1.03] md:h-11" />
      <span className="mt-1 mr-0.5 text-[8.5px] leading-none font-bold tracking-[0.5em] text-accent uppercase md:text-[9.5px]">Rewa</span>
    </Link>
  )
}
