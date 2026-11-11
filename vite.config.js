import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { siteConfig } from './src/data/siteConfig.js'
import { heroSlides, heroSrcSet } from './src/data/hero.js'
import { isPlaceholder } from './scripts/placeholders.js'

// Builds the AutoRepair JSON-LD + meta tags in index.html from siteConfig,
// so business details only ever need editing in one place.
// Placeholder values ("+91 XXXXX XXXXX", "[Street]", bare social links) are left out of the
// schema so Google is never given fake business data; `npm run build` lists them as a warning.
function siteMetaPlugin() {
  const s = siteConfig
  const real = (v) => (isPlaceholder(v) ? undefined : v)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: s.name,
    description: s.description,
    url: s.siteUrl,
    logo: `${s.siteUrl}/logo.png`,
    image: s.ogImage,
    telephone: real(s.phone),
    email: s.email,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: real(s.address.street),
      addressLocality: s.address.city,
      addressRegion: s.address.state,
      postalCode: s.address.pin,
      addressCountry: 'IN',
    },
    geo: { '@type': 'GeoCoordinates', latitude: s.geo.lat, longitude: s.geo.lng },
    openingHoursSpecification: s.hoursSchema.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: Object.values(s.socials).filter((url) => url && !isPlaceholder(url)),
  }
  const esc = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  const tokens = {
    __TITLE__: esc(s.defaultTitle),
    __DESCRIPTION__: esc(s.description),
    __SITE_URL__: esc(s.siteUrl),
    __OG_IMAGE__: esc(s.ogImage),
    __SITE_NAME__: esc(s.name),
    __THEME__: esc(s.themeColor),
    __HERO_SRCSET__: esc(heroSrcSet(heroSlides[0].image) ?? ''),
    __JSON_LD__: JSON.stringify(schema, (k, v) => (Array.isArray(v) && !v.length ? undefined : v), 2).replace(/</g, '\\u003c'),
  }
  return {
    name: 'site-meta',
    transformIndexHtml(html) {
      return Object.entries(tokens).reduce((out, [k, v]) => out.replaceAll(k, v), html)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), siteMetaPlugin()],
  // Build-time pre-renderer (src/entry-server.jsx): bundle this CommonJS package so Node can import it
  ssr: { noExternal: ['react-helmet-async'] },
})
