// Runs after `vite build`: writes a ready-made HTML file for every page (dist/about/index.html, …),
// so search engines, AI crawlers and WhatsApp/Facebook link previews see the real content and the
// right title/description without running JavaScript. In the browser React then takes over (hydrates).
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { allRoutes } from './routes.js'
import { siteConfig } from '../src/data/siteConfig.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')
const { render } = await import(join(ssrDir, 'entry-server.js'))

// The client build's index.html, minus the default tags each page replaces with its own
const template = readFileSync(join(dist, 'index.html'), 'utf8')
  .replace(/\s*<title>[\s\S]*?<\/title>/, '')
  .replace(/\s*<meta [^>]*data-rh="true"[^>]*>/g, '')

async function page(url) {
  const { html, helmet } = await render(url)
  if (/<script/i.test(html)) throw new Error(`${url}: rendered HTML contains a <script> (would break the CSP)`)
  if (!html.includes('<h1')) throw new Error(`${url}: rendered page has no <h1>`)
  const head = [helmet.title, helmet.meta, helmet.link, helmet.script].map((part) => part.toString()).join('\n    ')
  return template
    .replace(/<html[^>]*>/, `<html ${helmet.htmlAttributes.toString()}>`)
    .replace(/(<meta name="viewport"[^>]*>)/, `$1\n    ${head}`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
}

const write = (file, content) => {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, content)
}

for (const { path } of allRoutes) {
  write(join(dist, path === '/' ? 'index.html' : `${path.slice(1)}/index.html`), await page(path))
}
// Served with a real 404 status by Netlify and Vercel for unknown addresses
write(join(dist, '404.html'), await page('/404'))

// First, the free Netlify address 301-redirects to the real domain (same path), so Google sees only one site.
// The full hostname in the rule keeps it from matching the real domain (no loop) or deploy previews.
//
// Netlify: serve each page at its exact URL (forced "200!", otherwise Netlify's pretty-URL handling
// 301-redirects /about to /about/ and every canonical URL in the sitemap would be a redirect).
// Anything else gets the 404 page with status 404.
// Do NOT add "/about/ -> /about" redirects: Netlify ignores trailing slashes when matching rules,
// so such a rule also matches /about and redirects it to itself forever.
write(
  join(dist, '_redirects'),
  [
    `https://coremotorsrewa.netlify.app/*  ${siteConfig.siteUrl.replace(/\/$/, '')}/:splat  301!`,
    ...allRoutes.filter((r) => r.path !== '/').map((r) => `${r.path}  ${r.path}/index.html  200!`),
    '/*  /404.html  404',
    '',
  ].join('\n'),
)

rmSync(ssrDir, { recursive: true, force: true })
console.log(`✓ pre-rendered ${allRoutes.length} pages (English + Hindi) + 404.html`)
