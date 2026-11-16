import { forwardRef } from 'react'
import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom'
import { useLang } from '../context/LanguageContext.jsx'
import { localizePath } from '../i18n/routing.js'

// Drop-in replacements for React Router's Link/NavLink: on Hindi pages, "/about" becomes "/hi/about",
// so visitors (and Google) stay in the language they are reading.
const useLocalized = (to) => {
  const { lang } = useLang()
  return typeof to === 'string' && to.startsWith('/') ? localizePath(to, lang) : to
}

export const Link = forwardRef(function Link({ to, ...props }, ref) {
  return <RouterLink ref={ref} to={useLocalized(to)} {...props} />
})

export const NavLink = forwardRef(function NavLink({ to, ...props }, ref) {
  return <RouterNavLink ref={ref} to={useLocalized(to)} {...props} />
})
