// ─────────────────────────────────────────────────────────────
//  ALL editable business information lives in this file.
//  Change a value here and it updates everywhere on the site,
//  including the SEO tags and Google schema in index.html.
// ─────────────────────────────────────────────────────────────

// Phone numbers for calls, as shown on the site. All of them are listed in the footer and on the
// Contact page; the FIRST one is the main number that every "Call Now" button dials.
// Add, remove or reorder lines freely.
const phones = ['+91 79098 88891', '+91 79098 88892', '+91 79098 88893', '+91 98930 78888']

// Email addresses. All are listed in the footer and on the Contact page; the FIRST one is the main
// address (top bar, Google business data).
const emails = ['bodyshop@coremotors.in', 'coremotorsrewa@gmail.com']

export const siteConfig = {
  name: 'Core Motors Rewa',
  shortName: 'Core Motors',
  tagline: 'Multi-brand car service centre in Rewa',
  defaultTitle: 'Car Service & Insurance Claims in Rewa | Core Motors Rewa',
  description:
    'Core Motors Rewa is a multi-brand car service centre in Rewa, Madhya Pradesh offering periodic service, engine repair, denting & painting, detailing, ceramic coating, PPF, AC repair and insurance claims.',

  // Live website address (used for sitemap, canonical & Open Graph links)
  siteUrl: 'https://coremotors.in',
  ogImage: 'https://images.unsplash.com/photo-1669971080123-4493adba7ba7?auto=format&fit=crop&w=1200&h=630&q=75',
  themeColor: '#111111',

  // Contact
  phones,
  phone: phones[0], // main number (Call Now buttons, top bar)
  whatsapp: '917909888892', // WhatsApp: country code + number, digits only (bookings are sent here)
  whatsappDisplay: '+91 79098 88892', // the same WhatsApp number, as shown on the site
  whatsappMessage: 'Hi Core Motors, I would like to book a car service.',
  emails,
  email: emails[0], // main email

  address: {
    line1: 'In front of Subh Motors, Allahabad Road, Ratahara',
    street: 'In front of Subh Motors, Allahabad Road, Ratahara',
    city: 'Rewa',
    state: 'Madhya Pradesh',
    pin: '486001', // TODO: confirm the PIN code for Ratahara
  },
  // Exact workshop location (owner-supplied coordinates)
  geo: { lat: 24.54570494818453, lng: 81.34094515161048 },
  // Map shown on the site. Once the Google Business Profile is verified, replace this with the profile's
  // Google Maps → Share → "Embed a map" link, so the pin shows the business name and reviews.
  mapEmbedUrl: 'https://www.google.com/maps?q=24.54570494818453,81.34094515161048&z=17&hl=en&output=embed',
  // "Get directions" (opens Google Maps navigation to the workshop)
  mapLink: 'https://www.google.com/maps/dir/?api=1&destination=24.54570494818453,81.34094515161048',

  // Opening hours (displayed, in English and Hindi)
  hours: [
    { days: { en: 'Monday – Sunday (open all days)', hi: 'सोमवार – रविवार (सभी दिन खुला)' }, time: { en: '10:00 AM – 7:00 PM', hi: 'सुबह 10:00 – शाम 7:00' } },
  ],
  // Opening hours (for Google schema, 24h format)
  hoursSchema: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '10:00',
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
    { label: 'stats.customers', value: 300, suffix: '+' },
    { label: 'stats.cars', value: 400, suffix: '+' },
    { label: 'stats.years', value: 10, suffix: '+' },
    { label: 'stats.mechanics', value: 15, suffix: '' },
  ],
}

export const fullAddress = (a = siteConfig.address) => `${a.line1}, ${a.city}, ${a.state} ${a.pin}`

export const whatsappLink = (text = siteConfig.whatsappMessage) =>
  `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`

// "tel:" link for any number as written above ("+91 79098 88891" → "tel:+917909888891")
export const telHref = (number) => `tel:${number.replace(/[^\d+]/g, '')}`
export const telLink = telHref(siteConfig.phone)
