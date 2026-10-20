import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { siteConfig } from './src/data/siteConfig.js'

// Builds the AutoRepair JSON-LD + meta tags in index.html from siteConfig,
// so business details only ever need editing in one place.
function siteMetaPlugin() {
  const s = siteConfig
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: s.name,
    description: s.description,
    url: s.siteUrl,
    image: s.ogImage,
    telephone: s.phone,
    email: s.email,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: s.address.street,
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
    sameAs: Object.values(s.socials).filter(Boolean),
  }
  const esc = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  const tokens = {
    __TITLE__: esc(s.defaultTitle),
    __DESCRIPTION__: esc(s.description),
    __SITE_URL__: esc(s.siteUrl),
    __OG_IMAGE__: esc(s.ogImage),
    __SITE_NAME__: esc(s.name),
    __THEME__: esc(s.themeColor),
    __JSON_LD__: JSON.stringify(schema, null, 2).replace(/</g, '\\u003c'),
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
})
