import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { siteConfig } from '../data/siteConfig.js'
import { useLang } from '../context/LanguageContext.jsx'
import { localizePath, stripLang } from '../i18n/routing.js'

export default function Seo({ title, description, image = siteConfig.ogImage, noindex = false, jsonLd }) {
  const { pathname } = useLocation()
  const { lang, t } = useLang()
  const hi = lang === 'hi'
  const fullTitle = title ? `${title} | ${siteConfig.name}` : hi ? t('seo.homeTitle') : siteConfig.defaultTitle
  const desc = description ?? (hi ? t('seo.homeDesc') : siteConfig.description)

  // Matches the sitemap exactly (homepage is "https://domain/", with the slash)
  const base = siteConfig.siteUrl.replace(/\/$/, '')
  const url = `${base}${pathname}`
  // The same page in each language, so Google shows Hindi searchers the Hindi version
  const enUrl = `${base}${stripLang(pathname)}`
  const hiUrl = `${base}${localizePath(stripLang(pathname), 'hi')}`

  return (
    <Helmet htmlAttributes={{ lang: hi ? 'hi' : 'en-IN' }}>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {!noindex && <link rel="canonical" href={url} />}
      {!noindex && <link rel="alternate" hrefLang="en-IN" href={enUrl} />}
      {!noindex && <link rel="alternate" hrefLang="hi-IN" href={hiUrl} />}
      {!noindex && <link rel="alternate" hrefLang="x-default" href={enUrl} />}
      {noindex && <meta name="robots" content="noindex, follow" />}
      <meta property="og:locale" content={hi ? 'hi_IN' : 'en_IN'} />
      <meta property="og:locale:alternate" content={hi ? 'en_IN' : 'hi_IN'} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>}
    </Helmet>
  )
}
