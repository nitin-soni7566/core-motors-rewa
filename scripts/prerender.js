// Runs after `vite build`: writes a ready-made HTML file for every page (dist/about/index.html, …),
// so search engines, AI crawlers and WhatsApp/Facebook link previews see the real content and the
// right title/description without running JavaScript. In the browser React then takes over (hydrates).
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { routes } from './routes.js'

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
  const head = [helmet.title, helmet.meta, helmet.link].map((part) => part.toString()).join('\n    ')
  return template
    .replace(/<html[^>]*>/, `<html ${helmet.htmlAttributes.toString()}>`)
    .replace(/(<meta name="viewport"[^>]*>)/, `$1\n    ${head}`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
}

const write = (file, content) => {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, content)
}

for (const { path } of routes) {
  write(join(dist, path === '/' ? 'index.html' : `${path.slice(1)}/index.html`), await page(path))
}
// Served with a real 404 status by Netlify and Vercel for unknown addresses
write(join(dist, '404.html'), await page('/404'))

// Netlify: serve each page at its exact URL (forced "200!", otherwise Netlify's pretty-URL handling
// 301-redirects /about to /about/ and every canonical URL in the sitemap would be a redirect),
// send the trailing-slash form back to it, and give anything else the 404 page with status 404.
write(
  join(dist, '_redirects'),
  [
    ...routes
      .filter((r) => r.path !== '/')
      .flatMap((r) => [`${r.path}/  ${r.path}  301!`, `${r.path}  ${r.path}/index.html  200!`]),
    '/*  /404.html  404',
    '',
  ].join('\n'),
)

rmSync(ssrDir, { recursive: true, force: true })
console.log(`✓ pre-rendered ${routes.length} pages + 404.html`)
