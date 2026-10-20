// Builds an optimised Unsplash URL from a photo id.
// To use your own photos, put them in /public/images and use '/images/your-photo.jpg' instead.
export const unsplash = (id, w = 1200, h) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=75`
