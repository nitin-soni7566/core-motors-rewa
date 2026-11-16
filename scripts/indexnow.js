// Tells Bing (used by ChatGPT search and Copilot), Yandex and other IndexNow search engines that the
// site's pages are new or updated. Run after a deploy that changes page content:
//   npm run indexnow
// The key file public/<key>.txt proves we own the site; it must be live before submitting.
import { readdirSync } from 'node:fs'
import { siteConfig } from '../src/data/siteConfig.js'
import { allRoutes as routes } from './routes.js'

const keyFile = readdirSync(new URL('../public/', import.meta.url)).find((f) => /^[a-f0-9]{32}\.txt$/.test(f))
if (!keyFile) throw new Error('IndexNow key file (public/<32 hex characters>.txt) not found')
const key = keyFile.replace('.txt', '')
const base = siteConfig.siteUrl.replace(/\/$/, '')
const host = new URL(base).host

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host,
    key,
    keyLocation: `${base}/${keyFile}`,
    urlList: routes.map((r) => `${base}${r.path}`),
  }),
})
// 200 = received, 202 = accepted (key check pending). Anything else is an error.
console.log(`IndexNow: ${res.status} ${res.statusText} — ${routes.length} URLs for ${host}`)
if (res.status !== 200 && res.status !== 202) {
  console.log(await res.text())
  process.exit(1)
}
