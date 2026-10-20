# Core Motors Rewa — Website

A fast, mobile-friendly website for **Core Motors Rewa**, a multi-brand car service centre in Rewa, Madhya Pradesh.
It's a fully static site with no server and no database. Bookings go straight to your WhatsApp.

**Built with:** React 18 · Vite · Tailwind CSS v4 · React Router v6 · Framer Motion · Swiper · lucide-react · react-helmet-async

---

## 1. Run it on your computer

You need [Node.js](https://nodejs.org) version 20 or newer.

```bash
npm install        # first time only
npm run dev        # starts the site at http://localhost:5173
```

Other commands:

| Command           | What it does                                                     |
| ----------------- | ---------------------------------------------------------------- |
| `npm run build`   | Creates the production site in the `dist/` folder                |
| `npm run preview` | Serves the built `dist/` folder locally so you can check it      |
| `npm run lint`    | Checks the code for problems                                     |

`npm run build` also regenerates `public/sitemap.xml` and `public/robots.txt` automatically.

---

## 2. Edit your business details (important before going live)

**All business information is in one file: `src/data/siteConfig.js`.**
Change it there and it updates across the whole site, including the footer, contact page, WhatsApp links, Google schema, SEO tags and sitemap.

Replace these placeholders:

| Field          | Placeholder                    | Example                         |
| -------------- | ------------------------------ | ------------------------------- |
| `phone`        | `+91 XXXXX XXXXX`              | `+91 98765 43210` (as displayed) |
| `phoneLink`    | `+91XXXXXXXXXX`                | `+919876543210` (no spaces)     |
| `whatsapp`     | `91XXXXXXXXXX`                 | `919876543210` (digits only, with 91) |
| `address`      | `Core Motors, [Street]`        | Your real street address        |
| `geo`          | Rewa city centre               | Your workshop's latitude/longitude |
| `mapEmbedUrl`  | Rewa city search               | See below                       |
| `siteUrl`      | `https://coremotorsrewa.in`    | Your real domain                |
| `socials`      | Generic Facebook/Instagram/YouTube | Your page links (use `''` to hide an icon) |
| `stats`        | 5000 / 12000 / 10 / 15         | Your real numbers               |

**Google Map:** open your workshop in Google Maps → **Share** → **Embed a map** → copy only the `src="…"` URL into `mapEmbedUrl`. Put the normal share link in `mapLink`.

Opening hours are set in two places in the same file: `hours` (what visitors see) and `hoursSchema` (what Google reads).

### Other content files (`src/data/`)

| File          | Contents                                                       |
| ------------- | -------------------------------------------------------------- |
| `services.js` | All 17 services: title, short text, description, benefits, image, icon |
| `reviews.js`  | Customer reviews (**placeholders**, so replace them with real Google reviews) |
| `faqs.js`     | FAQ questions and answers                                      |
| `gallery.js`  | Gallery photos and their category (Painting / Detailing / Repair) |
| `brands.js`   | Brands in the scrolling strip and the booking form dropdown    |

The team members on the About page are placeholders too. Edit the `team` list in `src/pages/About.jsx`.

### Hindi / English

The site has an **EN | हि** switch in the navbar (inside the menu on phones). The visitor's choice is remembered in their browser.

- **Buttons, headings and short UI text** are in `src/i18n/translations.js`. Each text has the same key in the `en` and `hi` sections, so edit both.
- **Longer content** (services, FAQs, reviews, gallery captions, opening hours) is written as `{ en: '…', hi: '…' }` in the `src/data/` files.
- Missing Hindi text automatically falls back to English.
- WhatsApp booking messages are always sent to you **in English**, whichever language the customer used, so your bookings stay in one format.

The Hindi translations were machine-assisted. Ask a native speaker to read through them before launch.

### Light / Dark mode

The sun/moon button in the navbar switches themes. On first visit the site follows the visitor's phone/computer setting; after they click, their choice is remembered.
Colours live in `src/index.css`: brand colours in `@theme`, and the light/dark page colours under `:root` (light) and `.dark` (dark).
The Privacy Policy and Terms (`src/pages/Privacy.jsx`, `Terms.jsx`) are placeholder text. Have them checked before launch.

---

## 3. Change the images

All images are free Unsplash placeholders for now: Indian cars (Maruti, Hyundai, Tata, Kia), chosen so that no number plate is readable. To use your own photos:

1. Put your photos in `public/images/` (e.g. `public/images/workshop.jpg`). JPG or WebP files around 1600px wide work well.
2. In the data file, replace the `unsplash('…')` call with the path as a string:

```js
// before
image: unsplash('1487754180451-c456f719a1fc'),
// after
image: '/images/periodic-service.jpg',
```

3. Update the `alt` text (`{ en, hi }`) to describe the photo. It helps both SEO and visually impaired visitors.
4. If customers' cars appear in your photos, blur the number plates before uploading.

Hero slider images are in `src/components/Hero.jsx`. The About page images are in `src/pages/About.jsx`.
Your own photos of real work will look far better and build more trust than stock images.

---

## 4. How booking works

The booking form (on the Contact page and in the "Book a Service" pop-up) checks that required fields are filled and that the phone number is a valid 10-digit Indian mobile.
When the visitor submits, **WhatsApp opens with all details pre-filled** and addressed to the `whatsapp` number in `siteConfig.js`. The customer taps Send and you get the booking in WhatsApp.
No data is stored anywhere, so there is no server to maintain.

---

## 5. Deploy for free

### Option A: Netlify

1. Push this folder to a GitHub repository.
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project** → pick your repo.
3. Build command: `npm run build` · Publish directory: `dist` → **Deploy**.

*No Git?* Run `npm run build` and drag the `dist/` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).

`public/_redirects` is already included, so refreshing pages like `/services/tyres` won't show a 404.

### Option B: Vercel

1. Push this folder to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) → import the repo. Vercel detects Vite automatically (build: `npm run build`, output: `dist`).
3. Click **Deploy**.

`vercel.json` is already included for page-refresh support.

### Custom domain

Both Netlify and Vercel let you add your own domain (e.g. `coremotorsrewa.in`) for free under **Domain settings**. Make sure `siteUrl` in `siteConfig.js` matches it, then redeploy.

### After going live

- Submit `https://yourdomain/sitemap.xml` in [Google Search Console](https://search.google.com/search-console).
- Create or claim your **Google Business Profile** and link it to the website. For a local workshop this matters more than anything else for search.

---

## Project structure

```
public/            favicon, _redirects, robots.txt, sitemap.xml (auto-generated)
scripts/           generate-seo-files.js (runs before every build)
src/
  data/            siteConfig.js, services.js, reviews.js, faqs.js, gallery.js, brands.js
  components/      Navbar, TopBar, Footer, Hero, ServiceCard, Counter, Reviews, Gallery,
                   Lightbox, FAQ, CTA, BookingForm, BookingModal, WhatsAppButton, ...
  context/         BookingContext (booking pop-up), ThemeContext (light/dark), LanguageContext (EN/HI)
  i18n/            translations.js (all UI text in English and Hindi)
  pages/           Home, About, Services, ServiceDetail, Gallery, Contact, Privacy, Terms, NotFound
  index.css        Tailwind theme (colours #111 / #E10600, Poppins + Inter fonts)
index.html         SEO tags + AutoRepair schema (filled in from siteConfig at build time)
vite.config.js     Vite + Tailwind + the plugin that injects siteConfig into index.html
```

To open the booking pop-up from any component:

```jsx
const { openBooking } = useBooking()
openBooking()                    // empty form
openBooking('ceramic-coating')   // with a service pre-selected
```
