import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { siteConfig } from '../data/siteConfig.js'
import { useLang } from '../context/LanguageContext.jsx'

export default function Seo({ title, description = siteConfig.description, image = siteConfig.ogImage, noindex = false }) {
  const { pathname } = useLocation()
  const { lang } = useLang()
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.defaultTitle
  const url = `${siteConfig.siteUrl}${pathname === '/' ? '' : pathname}`

  return (
    <Helmet htmlAttributes={{ lang: lang === 'hi' ? 'hi' : 'en-IN' }}>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
