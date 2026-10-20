// ─────────────────────────────────────────────────────────────
//  ALL editable business information lives in this file.
//  Change a value here and it updates everywhere on the site,
//  including the SEO tags and Google schema in index.html.
// ─────────────────────────────────────────────────────────────

export const siteConfig = {
  name: 'Core Motors Rewa',
  shortName: 'Core Motors',
  tagline: 'Multi-brand car service centre in Rewa',
  defaultTitle: 'Core Motors Rewa | Car Service, Denting, Painting & Detailing in Rewa',
  description:
    'Core Motors Rewa is a multi-brand car service centre in Rewa, Madhya Pradesh offering periodic service, engine repair, denting & painting, detailing, ceramic coating, PPF, AC repair and insurance claims.',

  // Live website address (used for sitemap, canonical & Open Graph links)
  siteUrl: 'https://coremotorsrewa.in',
  ogImage: 'https://images.unsplash.com/photo-1669971080123-4493adba7ba7?auto=format&fit=crop&w=1200&h=630&q=75',
  themeColor: '#111111',

  // Contact
  phone: '+91 XXXXX XXXXX', // shown on the site
  phoneLink: '+91XXXXXXXXXX', // used for tel: links (no spaces)
  whatsapp: '91XXXXXXXXXX', // country code + number, digits only
  whatsappMessage: 'Hi Core Motors, I would like to book a car service.',
  email: 'info@coremotorsrewa.in',

  address: {
    line1: 'Core Motors, [Street]',
    street: '[Street]',
    city: 'Rewa',
    state: 'Madhya Pradesh',
    pin: '486001',
  },
  geo: { lat: 24.5362, lng: 81.3037 },
  mapEmbedUrl: 'https://www.google.com/maps?q=Rewa,+Madhya+Pradesh+486001&output=embed',
  mapLink: 'https://maps.google.com/?q=Rewa,+Madhya+Pradesh+486001',

  // Opening hours (displayed, in English and Hindi)
  hours: [
    { days: { en: 'Monday – Saturday', hi: 'सोमवार – शनिवार' }, time: { en: '9:00 AM – 7:00 PM', hi: 'सुबह 9:00 – शाम 7:00' } },
    { days: { en: 'Sunday', hi: 'रविवार' }, time: { en: 'Closed', hi: 'बंद' }, closed: true },
  ],
  // Opening hours (for Google schema, 24h format)
  hoursSchema: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],

  // Leave a value as '' to hide that icon
  socials: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    youtube: 'https://youtube.com/',
  },

  // Numbers for the animated counters on the home page
  stats: [
    // label: key in src/i18n/translations.js
    { label: 'stats.customers', value: 5000, suffix: '+' },
    { label: 'stats.cars', value: 12000, suffix: '+' },
    { label: 'stats.years', value: 10, suffix: '+' },
    { label: 'stats.mechanics', value: 15, suffix: '' },
  ],
}

export const fullAddress = (a = siteConfig.address) => `${a.line1}, ${a.city}, ${a.state} ${a.pin}`

export const whatsappLink = (text = siteConfig.whatsappMessage) =>
  `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`

export const telLink = `tel:${siteConfig.phoneLink}`
