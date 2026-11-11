import { srcSet, unsplash } from './images.js'

// Home page hero slides. Text for each slide is in i18n/translations.js under `hero.1.*`, `hero.2.*`…
export const heroSlides = [
  {
    key: 'hero.1',
    image: unsplash('1669971080123-4493adba7ba7', 1920),
    alt: { en: 'White Kia Seltos with headlights on at dusk', hi: 'शाम के समय हेडलाइट जलाए सफ़ेद किआ सेल्टॉस' },
  },
  {
    key: 'hero.2',
    image: unsplash('1727229428005-fcc8feaa2e41', 1920),
    alt: { en: 'Glossy red Hyundai Kona driving on a city road', hi: 'शहर की सड़क पर चलती चमकदार लाल ह्युंडई कोना' },
  },
  {
    key: 'hero.3',
    image: unsplash('1657179724285-d347db4c73a7', 1920),
    alt: { en: 'Kia Seltos under soft studio lighting', hi: 'स्टूडियो लाइट में किआ सेल्टॉस' },
  },
]

// Full-bleed images: the browser picks the smallest one that fills the screen.
// index.html preloads the first slide with this same srcset (see vite.config.js + public/boot.js).
export const heroSrcSet = (image) => srcSet(image, [640, 960, 1280, 1920])
