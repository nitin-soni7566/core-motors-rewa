// Runs in <head> before the page paints. Kept as a same-origin file (not an inline <script>)
// so the Content-Security-Policy can stay `script-src 'self'` with no hashes to maintain.
;(function () {
  var html = document.documentElement

  // 1. Saved theme + language, applied before first paint (no white flash in dark mode)
  try {
    var t = localStorage.getItem('cm-theme')
    if (t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches)) html.classList.add('dark')
    if (localStorage.getItem('cm-lang') === 'hi') html.lang = 'hi'
  } catch {
    // storage blocked (private mode etc.): defaults apply
  }

  // 1b. First visit this session (and motion allowed): cover the pre-rendered page in charcoal until the
  //     sand-logo intro starts, so it doesn't flash before the splash. index.css fades it out after 6 s
  //     anyway, in case the JavaScript never loads.
  try {
    if (!sessionStorage.getItem('cm-intro-seen') && !matchMedia('(prefers-reduced-motion: reduce)').matches)
      html.classList.add('intro-pending')
  } catch {
    // storage blocked: no intro
  }

  // 2. Home page only: start downloading the first hero photo now instead of after the JavaScript runs.
  //    The srcset comes from src/data/hero.js (injected into index.html at build time).
  var hero = document.querySelector('meta[name="cm-hero-srcset"]')
  if (location.pathname === '/' && hero && hero.content) {
    var pre = document.createElement('link')
    pre.rel = 'preload'
    pre.as = 'image'
    pre.setAttribute('imagesrcset', hero.content)
    pre.setAttribute('imagesizes', '100vw')
    pre.setAttribute('fetchpriority', 'high')
    document.head.appendChild(pre)
  }

  // 3. Google Fonts without blocking rendering: index.html preloads the CSS, this applies it
  //    (text shows in a system font for a moment, then swaps — fonts already use display=swap).
  var fonts = document.querySelector('link[rel="preload"][data-fonts]')
  if (fonts) {
    var css = document.createElement('link')
    css.rel = 'stylesheet'
    css.href = fonts.href
    document.head.appendChild(css)
  }
})()
