import { useEffect, useRef } from 'react'

const MAIN_FONT = (size) => `700 ${size}px Poppins, sans-serif`
const REWA_FONT = (size) => `800 ${size}px Poppins, sans-serif`
const RED = '#E10600'
const SAND = ['#f6eddc', '#efe2c8', '#e6d3ad', '#ffffff']
const REDS = ['#E10600', '#ff2a1f', '#c80500']

// Works out where every word, letter and line goes for a canvas of w × h (CSS px).
function computeLayout(ctx, w, h) {
  const measure = (font, text) => {
    ctx.font = font
    const m = ctx.measureText(text)
    return { w: m.width, asc: m.actualBoundingBoxAscent, desc: m.actualBoundingBoxDescent }
  }

  // 1. CORE MOTORS: start large, shrink until the line fits 88% of the width
  //    (and the whole block fits 70% of the height, for short landscape phones).
  let fs = Math.min(w * 0.16, 200)
  let L
  for (let i = 0; i < 30; i++) {
    const core = measure(MAIN_FONT(fs), 'CORE')
    const motors = measure(MAIN_FONT(fs), 'MOTORS')
    const gap = 0.35 * fs
    const lineW = core.w + gap + motors.w
    const mainAsc = Math.max(core.asc, motors.asc)
    const mainDesc = Math.max(core.desc, motors.desc)

    const rfs = Math.max(26, 0.42 * fs)
    const letters = [...'REWA'].map((ch) => ({ ch, ...measure(REWA_FONT(rfs), ch) }))
    const tracking = 0.9 * rfs
    const rewaW = letters.reduce((sum, l) => sum + l.w, 0) + tracking * (letters.length - 1)
    const rAsc = Math.max(...letters.map((l) => l.asc))
    const rDesc = Math.max(...letters.map((l) => l.desc))
    const vGap = 0.2 * fs + 0.55 * rfs
    const blockH = mainAsc + mainDesc + vGap + rAsc + rDesc

    const scale = Math.min((0.88 * w) / lineW, (0.7 * h) / blockH)
    L = { fs, core, motors, gap, lineW, mainAsc, mainDesc, rfs, letters, tracking, rewaW, rAsc, rDesc, vGap, blockH }
    if (scale >= 1 || fs <= 14) break
    fs = Math.max(14, fs * scale * 0.995)
  }

  // 2. Positions: centre the CORE MOTORS line, then REWA below it.
  const top = (h - L.blockH) / 2
  const mainBaseline = top + L.mainAsc
  const rewaBaseline = mainBaseline + L.mainDesc + L.vGap + L.rAsc
  const startX = (w - L.lineW) / 2
  const motorsX = startX + L.core.w + L.gap

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
    fs: L.fs,
    rfs: L.rfs,
    main: { startX, motorsX, coreW: L.core.w, motorsW: L.motors.w, baseline: mainBaseline, top: mainBaseline - L.mainAsc, bottom: mainBaseline + L.mainDesc },
    rewa: { letters, left: rewaLeft, right: rewaRight, baseline: rewaBaseline, top: rewaBaseline - L.rAsc, bottom: rewaBaseline + L.rDesc },
    lines: [
      { x: rewaLeft - lineGap - lineLen, y: lineY, w: lineLen, h: lineH },
      { x: rewaRight + lineGap, y: lineY, w: lineLen, h: lineH },
    ],
  }
}

// Draws the layout onto an offscreen canvas and returns particle targets.
function sampleTargets(layout) {
  const { w, h } = layout
  const off = document.createElement('canvas')
  off.width = Math.ceil(w)
  off.height = Math.ceil(h)
  const ctx = off.getContext('2d', { willReadFrequently: true })
  const targets = []

  const sample = (step, region, colors, size) => {
    const x0 = Math.max(0, Math.floor(region.x))
    const y0 = Math.max(0, Math.floor(region.y))
    const x1 = Math.min(off.width, Math.ceil(region.x + region.w))
    const y1 = Math.min(off.height, Math.ceil(region.y + region.h))
    if (x1 <= x0 || y1 <= y0) return
    const data = ctx.getImageData(x0, y0, x1 - x0, y1 - y0).data
    const rw = x1 - x0
    for (let y = 0; y < y1 - y0; y += step) {
      for (let x = 0; x < rw; x += step) {
        if (data[(y * rw + x) * 4 + 3] > 128) {
          targets.push({ x: x0 + x, y: y0 + y, color: colors[(Math.random() * colors.length) | 0], size })
        }
      }
    }
  }

  // CORE MOTORS — sampled every 3px
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'
  ctx.font = MAIN_FONT(layout.fs)
  ctx.fillText('CORE', layout.main.startX, layout.main.baseline)
  ctx.fillText('MOTORS', layout.main.motorsX, layout.main.baseline)
  const pad = 4
  sample(3, { x: 0, y: layout.main.top - pad, w, h: layout.main.bottom - layout.main.top + pad * 2 }, SAND, 2.7)

  // REWA + side lines — sampled every 2px so the smaller letters stay readable
  ctx.clearRect(0, 0, off.width, off.height)
  ctx.fillStyle = RED
  ctx.font = REWA_FONT(layout.rfs)
  for (const l of layout.rewa.letters) ctx.fillText(l.ch, l.x, layout.rewa.baseline)
  for (const ln of layout.lines) ctx.fillRect(ln.x, ln.y, ln.w, ln.h)
  sample(2, { x: 0, y: layout.rewa.top - pad, w, h: layout.rewa.bottom - layout.rewa.top + pad * 2 }, REDS, 2.1)

  return targets
}

/**
 * "CORE MOTORS / REWA" drawn with sand-like particles that drift into place.
 * Fills its parent; recalculates the layout whenever the parent is resized.
 */
export default function SandName({ className = '', onFormed, play = true, label = 'Core Motors Rewa' }) {
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
    let raf = 0
    let start = 0
    let formedFired = false
    let w = 0
    let h = 0
    const pointer = { x: -9999, y: -9999 }

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      if (!w || !h) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const layout = computeLayout(ctx, w, h)
      canvas.dataset.layout = JSON.stringify(layout) // used by layout tests
      const targets = sampleTargets(layout)

      // Reuse existing particles so a resize morphs smoothly instead of restarting.
      particles = targets.map((t, i) => {
        const old = particles[i]
        const delay = reduceMotion ? 0 : (t.x / w) * 900 + Math.random() * 500
        return old
          ? { ...old, tx: t.x, ty: t.y, color: t.color, size: t.size }
          : {
              x: reduceMotion ? t.x : Math.random() * w,
              y: reduceMotion ? t.y : h + Math.random() * h * 0.4,
              vx: 0,
              vy: 0,
              tx: t.x,
              ty: t.y,
              color: t.color,
              size: t.size,
              delay,
            }
      })
      if (!start) start = performance.now()
    }

    const tick = (now) => {
      const elapsed = now - start
      ctx.clearRect(0, 0, w, h)
      let settled = 0
      for (const p of particles) {
        if (elapsed > p.delay) {
          // spring towards target, pushed away from the pointer
          let ax = (p.tx - p.x) * 0.045
          let ay = (p.ty - p.y) * 0.045
          const dx = p.x - pointer.x
          const dy = p.y - pointer.y
          const d2 = dx * dx + dy * dy
          if (d2 < 3600) {
            const f = (3600 - d2) / 3600
            ax += dx * f * 0.25
            ay += dy * f * 0.25
          }
          p.vx = (p.vx + ax) * 0.82
          p.vy = (p.vy + ay) * 0.82
          p.x += p.vx
          p.y += p.vy
        }
        if (Math.abs(p.tx - p.x) < 0.6 && Math.abs(p.ty - p.y) < 0.6) settled++
        ctx.fillStyle = p.color
        ctx.fillRect(p.x, p.y, p.size, p.size)
      }
      if (!formedFired && particles.length && settled / particles.length > 0.97) {
        formedFired = true
        onFormedRef.current?.()
      }
      raf = requestAnimationFrame(tick)
    }

    let resizeTimer
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(build, 80)
    })

    const move = (e) => {
      const r = canvas.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
    }
    const leave = () => {
      pointer.x = pointer.y = -9999
    }

    let cancelled = false
    // Measure with the real Poppins weights, not the fallback font.
    Promise.all([document.fonts.load(MAIN_FONT(100)), document.fonts.load(REWA_FONT(100))])
      .catch(() => {})
      .then(() => {
        if (cancelled) return
        build()
        ro.observe(canvas)
        canvas.addEventListener('pointermove', move)
        canvas.addEventListener('pointerleave', leave)
        raf = requestAnimationFrame(tick)
      })

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      ro.disconnect()
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerleave', leave)
    }
  }, [play])

  return (
    <canvas
      ref={canvasRef}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': 'true' })}
      className={`block h-full w-full ${className}`}
    />
  )
}
