// Builds an optimised Unsplash URL from a photo id.
// To use your own photos, put them in /public/images and use '/images/your-photo.jpg' instead.
export const unsplash = (id, w = 1200, h) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=75`

const isUnsplash = (url) => typeof url === 'string' && url.startsWith('https://images.unsplash.com/')

// Same Unsplash photo at another width (height scaled to keep the crop). Other URLs are returned unchanged.
export const resize = (url, w) => {
  if (!isUnsplash(url)) return url
  const u = new URL(url)
  const w0 = Number(u.searchParams.get('w'))
  const h0 = Number(u.searchParams.get('h'))
  u.searchParams.set('w', w)
  if (w0 && h0) u.searchParams.set('h', Math.round((h0 * w) / w0))
  return u.href
}

// `srcset` so phones download a phone-sized image. Undefined for local images (browser uses `src`).
export const srcSet = (url, widths) => (isUnsplash(url) ? widths.map((w) => `${resize(url, w)} ${w}w`).join(', ') : undefined)
