// Every public page of the site. Used for sitemap.xml (generate-seo-files.js) and for the
// static HTML written at build time (prerender.js). Add new pages here as well as in src/App.jsx.
import { services } from '../src/data/services.js'

export const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  ...services.map((s) => ({ path: `/services/${s.slug}`, priority: '0.8', changefreq: 'monthly' })),
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/gallery', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'yearly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
]
