import { useEffect, useRef } from 'react'
import { CAR_PATHS, CAR_STROKE, MARK, TEXT, WHEEL, spokeLines, tyrePath } from './brandMark.js'
import { TEXT_PATH } from './brandTextPath.js'

const REWA_FONT = (size) => `800 ${size}px Poppins, sans-serif`
const SAND = ['#f6eddc', '#efe2c8', '#e6d3ad', '#ffffff', '#d9c7a3']
const REDS = ['#E10600', '#ff2a1f', '#c80500', '#ff4d40']
const STEEL = ['#e4e4e7', '#d4d4d8', '#a1a1aa', '#f4f4f5']
// Upper limit on grains so the animation stays smooth on phones and big screens,
// split between the parts of the logo.
const BUDGET = (w) => (w < 640 ? 3000 : 5000)
const SHARE = { car: 0.4, rewa: 0.12 } // the wheel + letters get the rest

// Works out where the mark, REWA and its side lines go for a canvas of w × h (CSS px).
// fillHeight: how much of the height the whole block may use.
function computeLayout(ctx, w, h, fillHeight) {
  const measure = (font, text) => {
    ctx.font = font
    const m = ctx.measureText(text)
    return { w: m.width, asc: m.actualBoundingBoxAscent, desc: m.actualBoundingBoxDescent }
  }

  // 1. Scale the mark to 88% of the width, shrinking further if the block is too tall.
  let s = (0.88 * w) / MARK.width
  let L
  for (let i = 0; i < 30; i++) {
    const markW = MARK.width * s
    const markH = MARK.height * s
    const fs = TEXT.size * s // the "main font size" REWA is sized from
    const rfs = Math.max(26, 0.42 * fs)
    const letters = [...'REWA'].map((ch) => ({ ch, ...measure(REWA_FONT(rfs), ch) }))
    const tracking = 0.9 * rfs
    const rewaW = letters.reduce((sum, l) => sum + l.w, 0) + tracking * (letters.length - 1)
    const rAsc = Math.max(...letters.map((l) => l.asc))
    const rDesc = Math.max(...letters.map((l) => l.desc))
    const vGap = 0.2 * fs + 0.55 * rfs
    const blockH = markH + vGap + rAsc + rDesc
    L = { s, markW, markH, fs, rfs, letters, tracking, rewaW, rAsc, rDesc, vGap, blockH }
    const scale = (fillHeight * h) / blockH
    if (scale >= 1 || s <= 0.05) break
    s = Math.max(0.05, s * scale * 0.995)
  }

  // 2. Centre everything.
  const top = (h - L.blockH) / 2
  const markX = (w - L.markW) / 2
  const rewaBaseline = top + L.markH + L.vGap + L.rAsc

  let x = (w - L.rewaW) / 2
  const letters = L.letters.map((l) => {
    const item = { ch: l.ch, x, w: l.w }
    x += l.w + L.tracking
    return item
  })

  // Decorative red lines either side of REWA, shortened if space is tight.
  const lineGap = 0.6 * L.rfs
  const space = (w * 0.94 - L.rewaW) / 2 - lineGap
  const lineLen = Math.max(0, Math.min(1.5 * L.rfs, space))
  const lineH = Math.max(2, Math.round(L.rfs * 0.09))
  const lineY = rewaBaseline - L.rAsc / 2 - lineH / 2
  const rewaLeft = (w - L.rewaW) / 2
  const rewaRight = rewaLeft + L.rewaW

  return {
    w,
    h,
    s: L.s,
    fs: L.fs,
    rfs: L.rfs,
    main: { x: markX, y: top, w: L.markW, h: L.markH, top, bottom: top + L.markH },
    rewa: { letters, left: rewaLeft, right: rewaRight, baseline: rewaBaseline, top: rewaBaseline - L.rAsc, bottom: rewaBaseline + L.rDesc },
    lines: [
      { x: rewaLeft - lineGap - lineLen, y: lineY, w: lineLen, h: lineH },
      { x: rewaRight + lineGap, y: lineY, w: lineLen, h: lineH },
    ],
  }
}

// On-screen width of the car outline (px)
const carWidth = (s) => Math.min(Math.max(CAR_STROKE * s, 2), 6)
const textShape = new Path2D(TEXT_PATH) // "ORE MOTORS" as shapes, same as the SVG logo

// Points along every car line, one per unit of length (in mark coordinates).
// Measured once and cached — measuring SVG paths is slow, so never per resize.
let carLineCache = null
function carLines() {
  if (carLineCache) return carLineCache
  const svgNS = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(svgNS, 'svg')
  svg.setAttribute('width', '0')
  svg.setAttribute('height', '0')
  svg.style.position = 'absolute'
  document.body.appendChild(svg)
  carLineCache = CAR_PATHS.map((d) => {
    const path = document.createElementNS(svgNS, 'path')
    path.setAttribute('d', d)
    svg.appendChild(path)
    const len = path.getTotalLength()
    const pts = []
    for (let l = 0; l <= len; l += 1) {
      const p = path.getPointAtLength(l)
      pts.push(p.x, p.y)
    }
    return pts
  })
  svg.remove()
  return carLineCache
}

// Runs fn with the context set to the mark's own 640 × 220 coordinates.
function inMarkSpace(c, layout, fn) {
  c.save()
  c.translate(layout.main.x, layout.main.y)
  c.scale(layout.s, layout.s)
  fn()
  c.restore()
}

// Area the car passes behind: the wheel plus slightly fattened letters.
function drawCutMask(c, layout) {
  inMarkSpace(c, layout, () => {
    c.fillStyle = c.strokeStyle = '#fff'
    c.beginPath()
    c.arc(WHEEL.cx, WHEEL.cy, WHEEL.outer + 6 / layout.s, 0, Math.PI * 2)
    c.fill()
    c.lineWidth = 8 / layout.s
    c.lineJoin = 'round'
    c.fill(textShape)
    c.stroke(textShape)
  })
}

function drawWheel(c, layout) {
  inMarkSpace(c, layout, () => {
    c.fillStyle = c.strokeStyle = '#fff'
    c.lineCap = 'round'
    c.fill(new Path2D(tyrePath()))
    c.lineWidth = WHEEL.rimStroke
    c.beginPath()
    c.arc(WHEEL.cx, WHEEL.cy, WHEEL.rim, 0, Math.PI * 2)
    c.stroke()
    c.lineWidth = WHEEL.spokeWidth
    for (const [x1, y1, x2, y2] of spokeLines()) {
      c.beginPath()
      c.moveTo(x1, y1)
      c.lineTo(x2, y2)
      c.stroke()
    }
    c.beginPath()
    c.arc(WHEEL.cx, WHEEL.cy, WHEEL.hub, 0, Math.PI * 2)
    c.fill()
  })
}

function drawText(c, layout) {
  inMarkSpace(c, layout, () => {
    c.fillStyle = '#fff'
    c.fill(textShape)
  })
}

function drawRewa(c, layout) {
  c.save()
  c.fillStyle = '#fff'
  c.textBaseline = 'alphabetic'
  c.font = REWA_FONT(layout.rfs)
  for (const l of layout.rewa.letters) c.fillText(l.ch, l.x, layout.rewa.baseline)
  for (const ln of layout.lines) c.fillRect(ln.x, ln.y, ln.w, ln.h)
  c.restore()
}

// Turns every part of the mark into sand-grain targets.
function sampleTargets(layout) {
  const { w, h, s } = layout
  const off = document.createElement('canvas')
  off.width = Math.ceil(w)
  off.height = Math.ceil(h)
  const ctx = off.getContext('2d', { willReadFrequently: true })
  const pick = (colors) => colors[(Math.random() * colors.length) | 0]
  const pad = 6
  const markBox = [layout.main.x - pad, layout.main.y - pad, layout.main.w + pad * 2, layout.main.h + pad * 2]
  const rewaLeft = Math.min(layout.lines[0].x, layout.rewa.left)
  const rewaBox = [rewaLeft - pad, layout.rewa.top - pad, Math.max(layout.lines[1].x + layout.lines[1].w, layout.rewa.right) - rewaLeft + pad * 2, layout.rewa.bottom - layout.rewa.top + pad * 2]

  // Read the drawn pixels of one region only (much cheaper than the whole canvas).
  const pixels = ([bx, by, bw, bh]) => {
    const x0 = Math.max(0, Math.floor(bx))
    const y0 = Math.max(0, Math.floor(by))
    const rw = Math.max(1, Math.min(off.width, Math.ceil(bx + bw)) - x0)
    const rh = Math.max(1, Math.min(off.height, Math.ceil(by + bh)) - y0)
    return { x0, y0, rw, rh, data: ctx.getImageData(x0, y0, rw, rh).data }
  }

  // Filled shapes: sample a grid; `scatter` loosens it so it reads as sand, not pixels.
  // If the result is over `budget`, resample on a coarser grid with bigger grains
  // (stays solid and even, unlike random thinning).
  const sample = (draw, box, step, colors, scatter, sizes, budget) => {
    ctx.clearRect(0, 0, off.width, off.height)
    draw(ctx)
    const { x0, y0, rw, rh, data } = pixels(box)
    const grid = (st, grow) => {
      const out = []
      for (let y = 0; y < rh; y += st) {
        for (let x = 0; x < rw; x += st) {
          if (data[(Math.round(y) * rw + Math.round(x)) * 4 + 3] > 128) {
            out.push({
              x: x0 + x + (Math.random() - 0.5) * st * scatter,
              y: y0 + y + (Math.random() - 0.5) * st * scatter,
              color: pick(colors),
              size: (sizes[0] + Math.random() * sizes[1]) * grow,
            })
          }
        }
      }
      return out
    }
    const out = grid(step, 1)
    if (out.length <= budget) return out
    const factor = Math.sqrt(out.length / budget)
    return grid(step * factor, factor * 0.92)
  }

  // Car outline: grains placed evenly along each line so it stays clean,
  // skipping where it passes behind the wheel and the letters.
  ctx.clearRect(0, 0, off.width, off.height)
  drawCutMask(ctx, layout)
  const mask = pixels(markBox)
  const hidden = (x, y) => {
    const xi = Math.round(x) - mask.x0
    const yi = Math.round(y) - mask.y0
    return xi < 0 || yi < 0 || xi >= mask.rw || yi >= mask.rh || mask.data[(yi * mask.rw + xi) * 4 + 3] > 0
  }
  const budget = BUDGET(w)
  const carPx = carWidth(s)
  const rows = Math.max(1, Math.round(carPx / 2.2))
  // ~1.5px between grains along the line, spread further apart if over the car's budget
  const totalLength = carLines().reduce((sum, pts) => sum + pts.length / 2, 0)
  const estimate = ((totalLength * s) / 1.5) * rows
  const spread = Math.max(1, estimate / (budget * SHARE.car))
  const unitStep = (1.5 * spread) / s
  const carSize = Math.min(1.6, Math.sqrt(spread))
  const car = []
  for (const pts of carLines()) {
    const n = pts.length / 2
    for (let l = 0; l < n - 1; l += unitStep) {
      const i = Math.floor(l)
      const t = l - i
      const ax = pts[i * 2] + (pts[i * 2 + 2] - pts[i * 2]) * t
      const ay = pts[i * 2 + 1] + (pts[i * 2 + 3] - pts[i * 2 + 1]) * t
      const tx = pts[i * 2 + 2] - pts[i * 2]
      const ty = pts[i * 2 + 3] - pts[i * 2 + 1]
      const tl = Math.hypot(tx, ty) || 1
      const nx = -ty / tl
      const ny = tx / tl
      for (let r = 0; r < rows; r++) {
        const shift = (rows === 1 ? 0 : (r / (rows - 1) - 0.5) * (carPx - 1.4)) + (Math.random() - 0.5) * 0.6
        const x = layout.main.x + ax * s + nx * shift
        const y = layout.main.y + ay * s + ny * shift
        if (hidden(x, y)) continue
        car.push({ x, y, color: pick(REDS), size: (1.4 + Math.random() * 0.8) * carSize, glow: true })
      }
    }
  }

  // REWA: tight, unscattered grains so the small letters stay crisp
  const rewa = sample((c) => drawRewa(c, layout), rewaBox, 2, REDS, 0, [1.9, 0.3], budget * SHARE.rewa)
  // Wheel and big letters share what's left (2px grid when small so they stay readable)
  const room = Math.max(budget * 0.3, budget - car.length - rewa.length)
  const fillStep = layout.fs < 80 ? 2 : 3
  const wheel = sample((c) => drawWheel(c, layout), markBox, 2, STEEL, 0.6, [1.1, 1.0], room * 0.3)
  const text = sample((c) => drawText(c, layout), markBox, fillStep, SAND, 0.6, fillStep === 2 ? [1.1, 0.9] : [1.3, 1.2], room * 0.7)

  return [...car, ...wheel, ...text, ...rewa]
}

// Groups grains by colour so each frame needs one fill call per colour, not one per grain.
function groupByColor(particles) {
  const map = new Map()
  for (const p of particles) {
    const key = (p.glow ? 'g' : '') + p.color
    if (!map.has(key)) map.set(key, { color: p.color, glow: !!p.glow, items: [] })
    map.get(key).items.push(p)
  }
  return [...map.values()]
}

/**
 * The Core Motors mark (car outline + wheel "C" + ORE MOTORS) with REWA below,
 * made of sand grains that drift into place. The pointer scatters the sand.
 * Fills its parent; recalculates the layout whenever the parent is resized.
 */
export default function SandName({ className = '', onFormed, play = true, label = 'Core Motors Rewa', fillHeight = 0.7 }) {
  const canvasRef = useRef(null)
  const onFormedRef = useRef(onFormed)
  useEffect(() => {
    onFormedRef.current = onFormed
  }, [onFormed])

  useEffect(() => {
    if (!play) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let particles = []
    let groups = []
    let raf = 0
    let running = false
    let start = 0
    let formedFired = false
    let w = 0
    let h = 0
    const pointer = { x: -9999, y: -9999 }

    const draw = (withGlow) => {
      ctx.clearRect(0, 0, w, h)
      // soft glow behind the car grains — only on the resting frame, to keep motion light
      if (withGlow) {
        ctx.globalAlpha = 0.18
        for (const g of groups) {
          if (!g.glow) continue
          ctx.fillStyle = g.color
          ctx.beginPath()
          for (const p of g.items) ctx.rect(p.x - 1.5, p.y - 1.5, p.size + 3, p.size + 3)
          ctx.fill()
        }
        ctx.globalAlpha = 1
      }
      for (const g of groups) {
        ctx.fillStyle = g.color
        ctx.beginPath()
        for (const p of g.items) ctx.rect(p.x, p.y, p.size, p.size)
        ctx.fill()
      }
    }

    const tick = (now) => {
      const elapsed = now - start
      let settled = 0
      for (const p of particles) {
        if (elapsed > p.delay) {
          // spring towards target, pushed away from the pointer
          let ax = (p.tx - p.x) * 0.14
          let ay = (p.ty - p.y) * 0.14
          const dx = p.x - pointer.x
          const dy = p.y - pointer.y
          const d2 = dx * dx + dy * dy
          if (d2 < 3600) {
            const f = (3600 - d2) / 3600
            ax += dx * f * 0.25
            ay += dy * f * 0.25
          }
          p.vx = (p.vx + ax) * 0.72
          p.vy = (p.vy + ay) * 0.72
          p.x += p.vx
          p.y += p.vy
        }
        if (Math.abs(p.tx - p.x) < 0.6 && Math.abs(p.ty - p.y) < 0.6 && Math.abs(p.vx) + Math.abs(p.vy) < 0.2) settled++
      }
      draw()

      const ratio = particles.length ? settled / particles.length : 0
      if (!formedFired && ratio > 0.95) {
        formedFired = true
        onFormedRef.current?.()
      }
      // At rest and no pointer nearby: snap the last stragglers into place and pause to save battery.
      if (ratio >= 0.98 && pointer.x < -999) {
        for (const p of particles) {
          p.x = p.tx
          p.y = p.ty
        }
        draw(true)
        running = false
        return
      }
      raf = requestAnimationFrame(tick)
    }

    const run = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(tick)
    }

    let builtSize = ''
    const build = (force = false) => {
      const rect = canvas.getBoundingClientRect()
      const size = `${rect.width}x${rect.height}`
      if (!rect.width || !rect.height || (size === builtSize && !force)) return
      builtSize = size
      w = rect.width
      h = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const layout = computeLayout(ctx, w, h, fillHeight)
      canvas.dataset.layout = JSON.stringify(layout) // used by layout tests
      const targets = sampleTargets(layout)

      // Reuse existing particles so a resize morphs smoothly instead of restarting.
      particles = targets.map((t, i) => {
        const old = particles[i]
        if (old) return { ...old, tx: t.x, ty: t.y, color: t.color, size: t.size, glow: t.glow }
        return {
          // grains blow in from just below and around the logo
          x: reduceMotion ? t.x : t.x + (Math.random() - 0.5) * w * 0.35,
          y: reduceMotion ? t.y : t.y + h * 0.25 + Math.random() * h * 0.45,
          vx: 0,
          vy: 0,
          tx: t.x,
          ty: t.y,
          color: t.color,
          size: t.size,
          glow: t.glow,
          delay: reduceMotion ? 0 : (t.x / w) * 200 + Math.random() * 120, // quick left-to-right sweep
        }
      })
      groups = groupByColor(particles)
      canvas.dataset.grains = particles.length
      if (!start) start = performance.now()
      run()
    }

    let resizeTimer
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(build, 120)
    })

    const move = (e) => {
      const r = canvas.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
      run() // wake up to scatter the sand
    }
    const leave = () => {
      pointer.x = pointer.y = -9999
    }

    // Start straight away; if Poppins (used for REWA) arrives later, re-measure —
    // the grains glide to the corrected spots instead of waiting for the download.
    let cancelled = false
    const fontReady = document.fonts.check(REWA_FONT(100))
    build()
    ro.observe(canvas)
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerleave', leave)
    if (!fontReady) {
      document.fonts
        .load(REWA_FONT(100))
        .then(() => !cancelled && build(true))
        .catch(() => {})
    }

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      ro.disconnect()
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerleave', leave)
    }
  }, [play, fillHeight])

  return (
    <canvas
      ref={canvasRef}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': 'true' })}
      className={`block h-full w-full ${className}`}
    />
  )
}
