// Regenerates public/sitemap.xml (English + Hindi pages) and public/robots.txt from siteConfig + services.
// Runs automatically before every `npm run build` (see "prebuild" in package.json).
import { writeFileSync } from 'node:fs'
import { siteConfig } from '../src/data/siteConfig.js'
import { allRoutes } from './routes.js'
import { placeholderFields } from './placeholders.js'

const base = siteConfig.siteUrl.replace(/\/$/, '')
const today = new Date().toISOString().slice(0, 10)

const pages = allRoutes
const url = (path) => `${base}${path}`

// Each URL lists its English and Hindi versions (hreflang), so Google links the two.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages
  .map(
    (p) => `  <url>
    <loc>${url(p.path)}</loc>
    <xhtml:link rel="alternate" hreflang="en-IN" href="${url(p.enPath)}"/>
    <xhtml:link rel="alternate" hreflang="hi-IN" href="${url(p.hiPath)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${url(p.enPath)}"/>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), sitemap)
writeFileSync(new URL('../public/robots.txt', import.meta.url), robots)
console.log(`✓ sitemap.xml (${pages.length} URLs) and robots.txt written`)

// Launch check: template values still in src/data/siteConfig.js
const placeholders = placeholderFields(siteConfig)
if (placeholders.length) {
  console.warn(`\n⚠  ${placeholders.length} placeholder value(s) in src/data/siteConfig.js — replace before going live:`)
  for (const p of placeholders) console.warn(`   • ${p}`)
  console.warn('   (They are left out of the Google schema, but visitors still see them.)\n')
}
