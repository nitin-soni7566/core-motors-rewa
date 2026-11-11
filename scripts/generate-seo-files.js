// Regenerates public/sitemap.xml and public/robots.txt from siteConfig + services.
// Runs automatically before every `npm run build` (see "prebuild" in package.json).
import { writeFileSync } from 'node:fs'
import { siteConfig } from '../src/data/siteConfig.js'
import { routes } from './routes.js'
import { placeholderFields } from './placeholders.js'

const base = siteConfig.siteUrl.replace(/\/$/, '')
const today = new Date().toISOString().slice(0, 10)

const pages = routes

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${base}${p.path === '/' ? '/' : p.path}</loc>
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
