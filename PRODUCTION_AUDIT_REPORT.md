# Production Audit Report — Core Motors Rewa website

**Audit date:** 11 November 2026 · **Baseline commit:** `195e028` (Faster sand logo animation) · **Domain:** https://coremotors.in (live host: Netlify)
**Scope:** whole repository (React 18 + Vite 8 site, static hosting)

---

## 1. Executive summary

The original codebase was well structured. It had no XSS sinks, no secrets, no console errors and no layout overflow. The audit found and fixed the following:

| Area | Before | After |
|---|---|---|
| **Security headers** | none (no CSP, HSTS or clickjacking protection) | full set for Netlify and Vercel; strict `script-src 'self'` |
| **Dependency advisories** | 2 moderate (react-router) | **0** |
| **Google schema** | fake phone `+91 XXXXX XXXXX` and `[Street]` | owner's real phone, address, map pin and hours; placeholders are filtered out automatically |
| **What crawlers and AI bots see** | 10 words ("Please enable JavaScript…") on every URL; the same title on every URL in link previews | full content, title, description and canonical on all 24 pages (pre-rendered) |
| **Unknown URLs** | HTTP 200 (soft 404) | real **HTTP 404** |
| **Keyboard focus in dialogs** | escaped all 3 dialogs | contained, and returned to the opener |
| **Home `<h1>`** | disappeared on slides 2–3 | always exactly one |
| **WCAG contrast failures** | 9 kinds (light and dark mode) | only the exempt logotype |
| **Lighthouse, home** (mobile, median of 3) | Performance 50, LCP 4.9 s, TBT 925 ms | **Performance 75, LCP 3.1 s, TBT 390 ms** |
| **Lighthouse, service page** | Performance 64, LCP 4.2 s | **Performance 85, LCP 2.4 s** |
| **Blank page after a redeploy** | yes | auto-reload plus an error screen |

**The site is technically ready to deploy, but it is not ready to launch publicly.** The remaining blockers are content, not code:
- customer reviews and the team section are invented
- two of the four counters are unverified
- gallery photos are stock images captioned as the workshop's own work
- social links point to the networks' home pages
- the legal pages are unreviewed templates

These are listed under *Critical/High* in §10 and §13. Only the owner can resolve them.

The live site at coremotors.in is still the **old version**, with placeholder data in its schema and a sitemap on the wrong domain. Deploying this build fixes both.

**Production-readiness score: 80 / 100** (methodology in §15).

---

## 2. Project architecture overview

| Item | Finding |
|---|---|
| Framework | React 18.3, React Router 7 (upgraded from 6), Vite 8, Tailwind CSS 4, Framer Motion, Swiper |
| Rendering | **Now pre-rendered + hydrated.** `npm run build` builds the browser bundle, then a build-time renderer (`src/entry-server.jsx`) generates static HTML for every route (`scripts/prerender.js`). In the browser React attaches to that HTML (`hydrateRoot`, `src/main.jsx`). Visitors who chose Hindi get a fresh client render in Hindi. |
| Routes | One list, `scripts/routes.js`, drives the sitemap, pre-rendering and Netlify `_redirects`, so the three can't drift apart |
| Content | Business data in `src/data/siteConfig.js`; services, FAQs, gallery, reviews and hero in `src/data/*`; English + Hindi UI strings in `src/i18n/translations.js` |
| SEO | `react-helmet-async` per page, output into the static HTML at build time; JSON-LD from siteConfig (`vite.config.js`); sitemap/robots generated before each build |
| Booking | No backend. The form validates, then opens WhatsApp with a pre-filled message. No data is stored. |
| Hosting | Netlify (live, confirmed by `server: Netlify`). Vercel config is kept as an alternative. |
| Tests / types | No test suite in the repo; plain JavaScript (no TypeScript) |

---

## 3. Security audit

| Check | Result | Evidence |
|---|---|---|
| XSS / unsafe HTML | ✅ No `dangerouslySetInnerHTML`, `innerHTML` or `eval`. Form text only reaches the URL-encoded `wa.me` link. Tested with `<script>alert(1)</script>`. | grep, browser test |
| JSON-LD injection | ✅ `<` escaped as `<` | `vite.config.js` |
| External links | ✅ All `target="_blank"` links have `rel="noopener noreferrer"`; `window.open` uses `noopener` | |
| Secrets / API keys | ✅ None in source, `public/`, the build, or env files | regex scan |
| Source maps / dev URLs in build | ✅ None | |
| Third-party scripts | ✅ None. Third-party resources: Google Fonts, Unsplash images, Google Maps iframe. | |
| Dependency vulnerabilities | 2 moderate → **0** (react-router 6.30 → 7.18.5; neither was exploitable here) | `npm audit` |
| Security headers | ❌ none → ✅ CSP, HSTS, `X-Content-Type-Options`, `X-Frame-Options: DENY` + `frame-ancestors 'none'`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy` | `public/_headers` (Netlify), `vercel.json` |
| Clickjacking | ✅ `X-Frame-Options: DENY` + `frame-ancestors 'none'` | |
| HTTPS | ✅ HSTS (2 years) + `upgrade-insecure-requests`. Netlify already redirects HTTP → HTTPS. | |

**Content-Security-Policy:**
```
default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://images.unsplash.com;
frame-src https://www.google.com https://maps.google.com; connect-src 'self'; manifest-src 'self';
base-uri 'self'; form-action 'self'; object-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests
```
- **Scripts are strict.** The only inline script (theme and language before paint) moved to a same-origin file, `public/boot.js`. There are no hashes to maintain, and the pre-renderer refuses to output a page containing a `<script>` in the page content.
- **`style-src` allows `'unsafe-inline'`.** The pre-rendered HTML contains `style="…"` attributes (animation start states). An earlier version without it was tested, and the browser blocked those styles. CSS injection is a far lower risk than script injection.
- **Verification:** every page was loaded with these exact headers applied (local Netlify emulation, 78 loads): **0 CSP violations**.

**Not done.** HSTS `preload` is a long-term commitment; add it once the domain is permanently HTTPS. Headers have not yet been checked on the real host, because the new build isn't deployed.

---

## 4. SEO audit

| Check | Result |
|---|---|
| **Crawlable content without JavaScript** | ❌→✅ Before: every URL returned the same shell, whose only text was *"Please enable JavaScript to view the Core Motors Rewa website."* Now each of the 24 pages has its own HTML: about 1,000 words on the home page and about 400 on a service page. Verified with JavaScript disabled. This matters for AI crawlers and for WhatsApp/Facebook previews, none of which run JavaScript. |
| Unique titles | ✅ 24/24 unique, 26–69 characters, now in the static HTML |
| Meta descriptions | ✅ One per page, unique, in the static HTML (home is 203 characters; Google truncates around 160) |
| Canonical | ✅ One per page, absolute, matches the sitemap (homepage `https://coremotors.in/`). Omitted on the 404 page. |
| Social previews (OG / Twitter) | ❌→✅ Each page's own title, description, URL and image are now in the static HTML. Previously every shared link showed the homepage preview. |
| Robots | ✅ `robots.txt` allows all crawlers and points to `https://coremotors.in/sitemap.xml`. The 404 page has `noindex, follow`. |
| Sitemap | ✅ 24 URLs on the correct domain (the live site's points at `coremotorsrewa.in`). ⚠️ `lastmod` is the build date (`scripts/generate-seo-files.js:9`). |
| 404 handling | ❌→✅ Unknown URLs, including bad service slugs, return **HTTP 404** with the 404 page (`dist/_redirects`, generated) |
| Headings | ✅ Exactly one `<h1>` on every page, including during the hero slideshow (was `[1,0,0,1]` over time) and in the static HTML |
| Image alt text | ✅ 0 images missing `alt` |
| Internal links | ✅ All 24 resolve; every one is in the sitemap |
| Structured data | ❌→✅ `AutoRepair` JSON-LD carries real data: phone +91 98930 78888; "In front of Subh Motors, Allahabad Road, Ratahara, Rewa"; geo 24.5456712, 81.340673; open daily 10:00–19:00; email support@coremotors.in. Placeholder values are dropped automatically (`scripts/placeholders.js`). No fake ratings. |
| Favicons / manifest | ✅ |
| Lighthouse SEO | 100 (before and after) |

**Still open:**
- **Hindi is not indexed separately.** It shares URLs with English and is rendered only in the browser. Adding `/hi/…` routes with `hreflang` would fix this.
- **The `og:image` is a stock photo.**

**Search Console readiness:** ready. Submit `https://coremotors.in/sitemap.xml` after deploying this build. Also submit it in Bing Webmaster Tools, which ChatGPT search uses.

**Local search reality check.** Map-pack ranking for "car service center in Rewa" depends mainly on a verified **Google Business Profile** (same name, address, phone and hours as the site), on real Google reviews, and on consistent directory listings. The website supports this but cannot replace it.

---

## 5. Performance findings

**Method.**
- Lighthouse 12, mobile preset: Moto G Power, 412 px wide, DPR 1.75, simulated slow 4G, 4× CPU slowdown.
- **3 runs per page; the median is reported.**
- The original commit was built from a separate git worktree. Both versions were served by the same local host emulation, with brotli compression.
- This is **lab data**. Real-user (field) data is only available after launch, from PageSpeed Insights / CrUX.

| Page | Metric | Before | Final |
|---|---|---|---|
| Home `/` | Performance | 50 (40/55/50) | **75** (75/75/73) |
| | LCP | 4.9 s | **3.1 s** |
| | FCP | 3.1 s | 2.8 s |
| | TBT (proxy for INP) | 925 ms | **390 ms** |
| | CLS | 0 | **0** |
| | Page weight | 1,035 KB | **695 KB (−33%)** |
| `/services/engine-repair` | Performance | 64 (55/64/65) | **85** (86/85/82) |
| | LCP | 4.2 s | **2.4 s ✅** |
| | FCP | 2.6 s | **2.1 s** |
| | TBT | 642 ms | **341 ms** |
| | CLS | 0 | **0** |

**Against the targets:**
- **CLS ≤ 0.1:** met on both pages.
- **LCP ≤ 2.5 s:** met on the service page (2.4 s), not yet on the home page (3.1 s).
- **INP ≤ 200 ms:** cannot be measured in the lab. TBT of 340–390 ms suggests it is likely within range, but this needs field data.

**What changed:**
1. **Pre-rendering.** The browser can paint real content from the HTML immediately, instead of waiting for about 600 KB of JavaScript. This was the largest gain.
2. **Hero image.** It used to be a 1920 px image on every device, discovered late. It now has a `srcset` (640–1920 w), so phones receive the 960 w version. On the home page only, it is preloaded with `fetchpriority=high` by `public/boot.js`.
3. **Other images.** Page-header backgrounds (the LCP element on inner pages) get a `srcset` and high fetch priority. Service cards, gallery thumbnails, home images and the service-detail image get `srcset` and `sizes` values that match their rendered widths.
4. **Fonts.** Google Fonts no longer block rendering: the CSS is preloaded and applied by `boot.js`. The canvas logo re-measures once Poppins 800 has actually loaded (`SandName.jsx`).
5. **Caching.** Hashed `/assets/*` files are cached for a year.

**Regressions caught during verification and fixed:**
- CLS 0.243 from the loading spinner being painted and then replaced. The spinner is now full height.
- Phones fetching 1000 px card images because of `sizes="100vw"`. Fixed with `calc(100vw - 32px)` and similar values.
- Inline styles blocked by the CSP after pre-rendering. Fixed by allowing `'unsafe-inline'` for styles, with scripts still strict.

**Remaining bottlenecks (design decisions, §10 M5):**
- **JavaScript.** About 218 KB gzip in total: React, Router, Framer Motion, Swiper, and both languages' text. The router v7 upgrade added about 5 KB gzip, accepted to clear the advisories.
- **Sand-particle intro.** It runs on every new browser session (`IntroSplash.jsx`) with up to 5,000 canvas grains (`SandName.jsx:15`).

---

## 6. Accessibility findings (WCAG 2.2 AA)

Tested with axe-core (WCAG 2.0/2.1/2.2 A and AA rules) on all 26 routes in light and dark mode at 375 px and 1440 px, plus scripted keyboard tests.

| Issue | Before | After | Where |
|---|---|---|---|
| Focus escaped modal dialogs | Booking 13/25 Tabs escaped, menu 12/25, lightbox 8/10 | **0 / 0 / 0** | `src/hooks/useDialogFocus.js`, used by `BookingModal`, `Navbar`, `Lightbox` |
| Focus not returned on close | went to unrelated links | returns to the opener | same |
| Hero `<h1>` missing on slides 2–3 | `[1,0,0,1]` | `[1,1,1,1]` | `Hero.jsx` |
| Reduced motion ignored (autoplay, animations) | ignored | autoplay off; Framer Motion follows the OS setting; no intro | `Hero.jsx`, `Root.jsx` (`MotionConfig`), `boot.js` |
| Fake ARIA tabs on the slider dots | `role=tab` without tab panels | buttons with `aria-current` | `Hero.jsx` |
| Required fields not announced | – | `aria-required` on 5 fields | `BookingForm.jsx` |
| Label-in-name (2.5.3) | 3 failures | 0 | `Hero.jsx`, `NotFound.jsx`, `Toggles.jsx` |
| Contrast: secondary text | 3.41:1 (light), 4.16:1 (dark) | 5.04:1 / 5.20:1 | `index.css` |
| Contrast: brand marquee | 2.27:1 | ≥4.95:1 | `BrandsStrip.jsx` |
| Contrast: red text on dark surfaces | 3.7–3.98:1 | ≥5.18:1 (existing `accent-light`) | several components |
| Contrast: WhatsApp button text | 1.98:1 | 9.5:1 | `ServiceDetail.jsx` |
| Contrast: footer labels, slide counter, "Years" badge, gallery counts | 2.35–4.18:1 | ≥4.97:1 | `Footer`, `Hero`, `Home`, `Gallery` |
| Heading-order skip | 2 pages | 0 | `Footer.jsx` (`h3` → `h2`) |

**Remaining:**
- The 8.5 px "REWA" under the logo is part of the logotype, which WCAG 1.4.3 exempts.
- axe best-practice note: the fixed WhatsApp button and mobile call bar sit outside page landmarks.
- The hero slider has no visible pause button (2.2.2) for users who haven't enabled reduced motion.
- No real screen-reader session was performed.

---

## 7. Responsive design

- **Automated widths:** 320, 375, 768, 1440 and 1920 px (light), and 375 and 1440 px (dark).
- **Horizontal overflow:** none on any route at any width.
- **Mobile behaviour:** the mobile menu, bottom call/book bar, booking bottom-sheet, theme toggle and Hindi switch all work after hydration on a 390 px viewport.
- **Touch targets:** all meet WCAG 2.5.8, either directly or through the spacing exception. The hero dots (40×4 px) pass only by spacing.
- **Browsers:** only Chromium was tested. **Firefox, Safari and Edge were not tested.** A manual check on a real iPhone is recommended.

---

## 8. Code quality

| Finding | Action |
|---|---|
| Lint (oxlint) | 0 warnings before and after. New code was adjusted to satisfy React's hydration-safe patterns (`useSyncExternalStore`). |
| No error boundary | Added `ErrorBoundary.jsx`, keyed per route. `vite:preloadError` triggers one rate-limited auto-reload after a redeploy (`main.jsx`). |
| Browser-only code at module load (`new Path2D` in `SandName.jsx`) | Made lazy, so the module is safe to render at build time |
| Provider tree duplicated across two entry points | Extracted into `src/Root.jsx`, shared by the browser entry and the build-time renderer |
| Route list existed in two places | `scripts/routes.js` is now the single source |
| Duplicated WhatsApp URL; hard-coded image `.replace()` | Reuse `whatsappLink()`; new `resize()` / `srcSet()` helpers |
| No `engines` field | `"node": "^20.19.0 \|\| >=22.12.0"` (Vite 8 requirement) |
| Minor leftovers (unused `light` prop, stale eslint-disable comments, `canvas.dataset.layout`) | Harmless; left as they were |
| HTML validation (html-validate, rendered DOM) | No errors |

---

## 9. Deployment readiness

| Check | Status |
|---|---|
| Build | ✅ `npm run build`: client build, then build-time renderer, then 24 pages + `404.html` + `_redirects` |
| Netlify routing | ✅ Generated `dist/_redirects` maps each page to its HTML file; everything else returns `/404.html` with status 404. Old `public/_redirects` (SPA catch-all) removed. |
| Netlify headers | ✅ `public/_headers` is copied to `dist/` |
| Vercel (alternative) | Headers in `vercel.json`; relies on directory-index resolution and `404.html`. **Not verified on Vercel.** |
| Caching | `/assets/*` immutable for 1 year; HTML revalidates (host default) |
| Compression | Brotli/gzip are applied automatically by Netlify |
| Environment variables | None needed |
| Domain | `siteUrl: 'https://coremotors.in'`, confirmed by the owner. Drives canonical, OG, sitemap and robots. |
| Verified on the live host | ❌ The new build is not deployed. Routing, headers, 404s and hydration were verified against a local Netlify emulation. |

---

## 10. Issues identified (by severity)

### Critical
| # | Issue | Status |
|---|---|---|
| C1 | Invented customer reviews with names and star ratings (`src/data/reviews.js`). This is misleading advertising under the Consumer Protection Act 2019 / CCPA guidelines. | **Open — owner** |
| C2 | Invented team: 4 named people with stock portraits (`src/pages/About.jsx:18`) | **Open — owner** |
| C3 | Placeholder phone, address and hours on the site and in the Google schema | **Fixed** (owner-supplied details) |
| C4 | No security headers or CSP | **Fixed** |

### High
| # | Issue | Status |
|---|---|---|
| H1 | Unverified counters: "10+ years" (also shown on the home badge) and "15 mechanics" (`siteConfig.js`). Customers and cars updated to the owner's 300+ / 400+. | **Open — owner** |
| H2 | Stock photos captioned as the workshop's own work (`src/data/gallery.js`, hero, services) | **Open — owner** |
| H3 | Social links point to the networks' home pages (`siteConfig.js` `socials`) | **Open — owner** (excluded from the schema; the build warns) |
| H4 | Privacy and Terms pages are templates | **Open — owner** |
| H5 | Content invisible to crawlers that don't run JavaScript; wrong link previews | **Fixed** (pre-rendering) |
| H6 | Focus escaping dialogs; hero `<h1>` disappearing | **Fixed** |
| H7 | Blank page on chunk-load failure | **Fixed** |
| H8 | react-router advisories | **Fixed** |
| H9 | Live site serves the old build (placeholder schema, wrong-domain sitemap) | **Open — deploy this build** |

### Medium
| # | Issue | Status |
|---|---|---|
| M1 | Contrast, label-in-name, ARIA misuse, `aria-required` | **Fixed** |
| M2 | Reduced motion ignored | **Fixed** |
| M3 | Render-blocking fonts; oversized images | **Fixed** |
| M4 | Soft 404s | **Fixed** (real 404 status) |
| M5 | Main-thread cost of the intro and particle animation; home LCP 3.1 s | Open (design decision) |
| M6 | Hero slider has no pause button (WCAG 2.2.2) | Open |
| M7 | PIN code 486001 not confirmed | Open — owner |
| M8 | Hindi not separately indexable (no `/hi/` URLs or `hreflang`) | Open (proposed) |

### Low
| # | Issue | Status |
|---|---|---|
| L1 | Homepage canonical without trailing slash | Fixed |
| L2 | Sitemap `lastmod` set to the build date | Open |
| L3 | Floating WhatsApp icon: white on #25D366 (brand mark, non-text) | Accepted |
| L4 | Landmark best practice for fixed buttons | Open |
| L5 | Google Fonts served from Google (privacy, extra connection) | Recommend self-hosting |

---

## 11. Fixes implemented (files changed)

| Area | Files |
|---|---|
| Pre-rendering and hydration | `src/Root.jsx` (new), `src/entry-server.jsx` (new), `scripts/prerender.js` (new), `scripts/routes.js` (new), `src/main.jsx`, `package.json` (`build`), `vite.config.js` (`ssr.noExternal`), `src/hooks/useMounted.js` (new); SSR-safety changes in `BookingModal`, `Lightbox`, `ThemeContext`, `LanguageContext`, `Toggles`, `Hero`, `IntroSplash`, `SandName`, `Footer` |
| Routing and 404 | generated `dist/_redirects`; removed `public/_redirects`; `vercel.json` rewrites removed |
| Security headers | `public/_headers` (new), `vercel.json` |
| Bootstrap (CSP-safe), fonts, hero preload, intro cover | `public/boot.js` (new), `index.html`, `src/index.css` |
| Schema and placeholders | `vite.config.js`, `scripts/placeholders.js` (new), `scripts/generate-seo-files.js` |
| Business details | `src/data/siteConfig.js` (phone, WhatsApp, address, map, hours, email, domain, 2 counters), `translations.js` (`topbar.hours`) |
| Responsive images | `src/data/images.js`, `src/data/hero.js` (new), `Hero`, `PageHeader`, `ServiceCard`, `Gallery`, `Home`, `ServiceDetail` |
| Accessibility | `src/hooks/useDialogFocus.js` (new), `BookingModal`, `Navbar`, `Lightbox`, `Hero`, `BookingForm`, `Toggles`, `Footer`, `BrandsStrip`, `IntroSplash`, `NotFound`, `Contact`, `LegalPage`, `pages/Gallery`, `index.css` |
| Resilience | `src/components/ErrorBoundary.jsx` (new), `App.jsx`, `main.jsx`, `translations.js` (`error.*`) |
| SEO | `Seo.jsx` (canonical; none on 404), `index.html` |
| Footer | developer credit `nitinsoni815@gmail.com` (`Footer.jsx`, `footer.developer` in EN/HI) |
| Dependencies | react-router-dom 7.18.5; in-range updates (vite 8.3.8, framer-motion 14.12, swiper 14.4, tailwind 4.3.5, lucide 1.72, oxlint 1.93) |
| Docs | `README.md` |

**Visible design changes,** all needed for contrast:
- slightly darker grey secondary text in light mode, slightly lighter in dark mode
- less faded brand marquee
- lighter brand red for red text on dark backgrounds
- dark text on the WhatsApp button
- lighter footer labels

Other visible changes:
- the developer credit in the footer
- a plain charcoal screen that briefly precedes the intro splash on the first visit of a session (keeps the pre-rendered page from flashing before the intro)

---

## 12. Tests executed and actual results

| Check | Type | Result |
|---|---|---|
| `npm run build` (client + pre-render) | automated | ✅ 24 pages + 404 |
| `npm run lint` | automated | ✅ 0 warnings, 0 errors |
| `npm audit` | automated | 2 moderate → **0** |
| Unit tests / type check | n/a | none exist / plain JavaScript |
| Secrets, XSS-sink and dev-URL scan | automated | ✅ none |
| Static HTML check (each page) | automated | ✅ own title, description, canonical, `og:url`, `<h1>`; no `<script>` in content; 404 has `noindex` |
| JavaScript disabled | automated | ✅ the service page shows its `<h1>` and full text |
| Routing and status codes (Netlify emulation) | automated | ✅ pages 200, `/about/` 200, unknown pages and bad slugs **404**, missing assets 404, headers present |
| Hydration: 26 routes × (EN light, EN dark, HI) = 78 loads, CSP enforced | automated | ✅ 0 hydration errors, 0 CSP violations, 0 JavaScript errors, correct theme and language, 1 `<h1>`, intro cover removed |
| After hydration: booking modal, in-app navigation, theme toggle, Hindi switch, intro splash, reduced motion | automated | ✅ all work |
| Earlier full crawl (182 loads, 5 widths, light/dark) + axe WCAG 2.2 | automated | ✅ no overflow, no missing alt, no broken links; only the exempt logotype flagged |
| Keyboard / dialog / form end-to-end | automated | ✅ (§6); WhatsApp opens `wa.me/919893078888` |
| HTML validation | automated | ✅ no errors |
| Lighthouse, before vs after (3 runs each) | automated | §5 |
| Live host, Search Console, real devices, Firefox/Safari/Edge, screen reader | — | **not performed** |

---

## 13. Remaining issues (owner action required)

1. **Replace or remove the invented reviews** (`src/data/reviews.js`). Real Google reviews, quoted with permission, are best.
2. **Replace or remove the invented team** (`src/pages/About.jsx:18-24`).
3. Provide the **real "years of experience" and "mechanics" numbers**, or hide those counters.
4. Supply **your own photos** (with number plates blurred), or re-caption the stock images.
5. Provide **real social page URLs**, or set them to `''` to hide the icons.
6. Confirm the **PIN code** (486001).
7. Have the **Privacy Policy and Terms** reviewed.
8. Have the **Hindi translations** reviewed by a native speaker.
9. **Deploy this build to Netlify.** The live site still has placeholder schema and a wrong-domain sitemap.

## 14. Recommended next steps

1. Fix §13 items 1–5, then deploy.
2. On the live domain:
   - run `curl -I https://coremotors.in/about` to check the headers
   - open a bad URL to confirm it returns 404
   - run securityheaders.com and PageSpeed Insights
3. Set up the **Google Business Profile** with exactly the same name, address, phone and hours. Collect real reviews. Submit the sitemap to Google Search Console **and** Bing Webmaster Tools. Create matching JustDial and Sulekha listings.
4. Add a pause button to the hero slider (M6).
5. Reduce the intro cost: show it only on the very first visit, or use fewer grains on phones (M5).
6. Add `/hi/` routes with `hreflang` so the Hindi pages can rank (M8).
7. Self-host fonts; add a Playwright smoke test (load each route, open the booking modal) to CI.

---

## 15. Production-readiness score: **80 / 100**

| Area | Weight | Score | Reasoning |
|---|---|---|---|
| Security | 20 | 18 | Strict script CSP and the full header set, 0 vulnerabilities, no secrets or XSS sinks. −2: `style-src 'unsafe-inline'`; not yet verified on the live host. |
| Accessibility | 15 | 13 | All WCAG failures fixed except the exempt logotype. −2: no slider pause button; no real screen-reader test. |
| SEO (technical) | 15 | 14 | Pre-rendered pages with their own metadata, real 404s, valid real JSON-LD, correct domain. −1: Hindi not separately indexable. |
| Performance | 15 | 11 | Home 50→75, service page 64→85, service LCP 2.4 s, CLS 0. −4: home LCP 3.1 s; JavaScript and intro cost; no field data. |
| Code quality and reliability | 10 | 9 | Clean lint, error boundary, chunk recovery, single route list. −1: no automated tests in the repo. |
| Deployment readiness | 10 | 8 | Netlify routing, 404s, headers and caching generated and emulated. −2: not deployed or verified on the live host; Vercel path unverified. |
| Content and legal | 15 | 7 | Contact details, hours, location, domain, email and 2 counters are real. −8: invented reviews and team, unverified counters, stock photos presented as own work, placeholder socials, legal templates. |
| **Total** | **100** | **80** | |

**Interpretation.** The engineering side is about 90 % ready. Most of the remaining gap is content the owner has to supply. Once §13 items 1–5 are done and the build is deployed, the score would be around 88–90.
