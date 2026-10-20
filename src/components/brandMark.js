// Shared geometry for the Core Motors mark: car outline + wheel "C" + "ORE MOTORS".
// Used by the SVG <Logo> and by the canvas particle animation (<SandName>), so both match.
// All numbers are in a 640 × 220 coordinate box.

export const MARK = {
  width: 640,
  height: 220,
  // Change these to restyle the logo everywhere (e.g. car: '#1e6fe0' for a blue car)
  colors: { car: '#E10600', wheel: '#d4d4d8', text: '#e4e4e7' },
}

// Muscle-car side profile (front on the left). The wheel "C" is its front wheel,
// and the lower body runs behind the "ORE MOTORS" text. Drawn as strokes.
export const CAR_PATHS = [
  // body: nose → long hood → raked windshield → roof → fastback → deck + lip spoiler → tail → rear arch → sill → front arch
  'M20 112 L44 103 C110 95 190 89 262 84 C286 66 306 53 334 45 C380 36 436 34 474 38 C504 46 532 62 556 76 L618 80 L630 74 L632 86 C636 102 634 120 626 138 L604 141 A57 57 0 0 0 498 141 L132 141 A58 58 0 0 0 28 141 L16 141 C10 132 12 122 20 112 Z',
  // one long side window with a thin B-pillar
  'M288 85 C306 68 320 59 340 53 L462 49 C488 56 508 68 522 82 Z',
  'M418 50 L422 84',
  // shoulder line along the body
  'M40 120 C210 112 430 104 622 102',
]
export const CAR_STROKE = 4.5

// Wheel that forms the "C": a tyre ring with an opening on the right, plus a 5-spoke rim.
export const WHEEL = {
  cx: 80,
  cy: 166,
  outer: 52,
  tyre: 14, // ring thickness
  gapDeg: 34, // half-angle of the opening on the right
  rim: 30,
  rimStroke: 5,
  hub: 7,
  spokes: 5,
  spokeWidth: 7,
}

// "ORE MOTORS" text box. The actual letter shapes are in brandTextPath.js
// (Saira Bold, size 96, stretched to this width); `size` also sets REWA's size.
export const TEXT = { x: 140, baseline: 212, size: 96, width: 490, value: 'ORE MOTORS' }

// SVG path for the tyre ring with the right-hand opening.
export function tyrePath(w = WHEEL) {
  const ro = w.outer
  const ri = w.outer - w.tyre
  const a = (w.gapDeg * Math.PI) / 180
  const pt = (r, ang) => [w.cx + r * Math.cos(ang), w.cy + r * Math.sin(ang)]
  const [x1, y1] = pt(ro, -a)
  const [x2, y2] = pt(ro, a)
  const [x3, y3] = pt(ri, a)
  const [x4, y4] = pt(ri, -a)
  return `M${x1} ${y1} A${ro} ${ro} 0 1 0 ${x2} ${y2} L${x3} ${y3} A${ri} ${ri} 0 1 1 ${x4} ${y4} Z`
}

// Spoke rectangles as [x1, y1, x2, y2] line segments from hub to rim.
export function spokeLines(w = WHEEL) {
  return Array.from({ length: w.spokes }, (_, i) => {
    const ang = -Math.PI / 2 + (i * 2 * Math.PI) / w.spokes
    return [w.cx + Math.cos(ang) * w.hub, w.cy + Math.sin(ang) * w.hub, w.cx + Math.cos(ang) * w.rim, w.cy + Math.sin(ang) * w.rim]
  })
}
