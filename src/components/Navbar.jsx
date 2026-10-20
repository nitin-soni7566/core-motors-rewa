import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from 'lucide-react'
import { services } from '../data/services.js'
import { siteConfig, telLink } from '../data/siteConfig.js'
import { useBooking } from '../context/BookingContext.jsx'
import { useLang } from '../context/LanguageContext.jsx'
import Logo from './Logo.jsx'
import ServiceIcon from './ServiceIcon.jsx'
import SocialIcons from './SocialIcons.jsx'
import { LangToggle, ThemeToggle } from './Toggles.jsx'

const links = [
  { to: '/', key: 'nav.home' },
  { to: '/about', key: 'nav.about' },
  { to: '/services', key: 'nav.services', dropdown: true },
  { to: '/gallery', key: 'nav.gallery' },
  { to: '/contact', key: 'nav.contact' },
]

const navLinkClass = ({ isActive }) =>
  `relative rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors duration-300 ${
    isActive ? 'bg-white/10 text-white' : 'text-neutral-300 hover:text-white'
  }`

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const { openBooking } = useBooking()
  const { t, tx } = useLang()
  const { pathname } = useLocation()
  const closeTimer = useRef()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menus on navigation
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setMobileOpen(false)
    setDropdownOpen(false)
  }

  // Lock page scroll while the mobile menu is open; close it with Escape
  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setMobileOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [mobileOpen])

  const openDropdown = () => {
    clearTimeout(closeTimer.current)
    setDropdownOpen(true)
  }
  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 150)
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? 'border-white/10 bg-charcoal/80 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl backdrop-saturate-150'
          : 'border-transparent bg-charcoal'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between gap-2 md:h-20" aria-label={t('nav.main')}>
        <Logo light />

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) =>
            link.dropdown ? (
              <li
                key={link.to}
                className="relative"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
                onFocus={openDropdown}
                onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setDropdownOpen(false)}
              >
                <div className="flex items-center">
                  <NavLink to={link.to} className={(s) => `${navLinkClass(s)} !pr-1`}>
                    {t(link.key)}
                  </NavLink>
                  <button
                    type="button"
                    className="rounded-full p-1.5 text-neutral-400 hover:text-white"
                    aria-label={t('nav.showServices')}
                    aria-expanded={dropdownOpen}
                    onClick={() => setDropdownOpen((v) => !v)}
                  >
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 mt-5 w-[680px] -translate-x-1/2 overflow-hidden rounded-2xl border border-line bg-card p-3 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)]"
                    >
                      <ul className="grid grid-cols-2 gap-0.5">
                        {services.map((s) => (
                          <li key={s.slug}>
                            <Link
                              to={`/services/${s.slug}`}
                              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted transition hover:bg-surface-2 hover:text-ink"
                            >
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-white">
                                <ServiceIcon name={s.icon} className="h-4 w-4" />
                              </span>
                              {tx(s.title)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link
                        to="/services"
                        className="group mt-2 flex items-center justify-between rounded-xl bg-charcoal px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-accent dark:bg-surface-3"
                      >
                        {t('nav.viewAllServices')}
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === '/'} className={navLinkClass}>
                  {t(link.key)}
                </NavLink>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <LangToggle className="hidden sm:flex" />
          <ThemeToggle />
          <a
            href={telLink}
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-accent hover:bg-accent xl:flex"
            aria-label={t('common.call', { phone: siteConfig.phone })}
          >
            <Phone className="h-4 w-4" />
          </a>
          <button type="button" onClick={() => openBooking()} className="btn-primary hidden !px-5 !py-3 md:inline-flex">
            {t('common.bookService')}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/10 lg:hidden"
            aria-label={t('nav.openMenu')}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label={t('nav.menu')}
              className="glow fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col bg-charcoal text-white shadow-2xl lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
                <Logo light onClick={() => setMobileOpen(false)} />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10"
                  aria-label={t('nav.closeMenu')}
                  autoFocus
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <ul className="flex-1 overflow-y-auto px-5 py-4">
                {links.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05 }}
                    className="border-b border-white/5"
                  >
                    {link.dropdown ? (
                      <>
                        <div className="flex items-center justify-between">
                          <NavLink
                            to={link.to}
                            end
                            className={({ isActive }) => `block flex-1 py-4 font-heading text-lg ${isActive ? 'text-accent' : ''}`}
                          >
                            {t(link.key)}
                          </NavLink>
                          <button
                            type="button"
                            onClick={() => setMobileServicesOpen((v) => !v)}
                            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10"
                            aria-label={t('nav.toggleServices')}
                            aria-expanded={mobileServicesOpen}
                          >
                            <ChevronDown className={`h-5 w-5 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                        <AnimatePresence initial={false}>
                          {mobileServicesOpen && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              {services.map((s) => (
                                <li key={s.slug}>
                                  <Link
                                    to={`/services/${s.slug}`}
                                    className="flex items-center gap-3 py-2.5 pl-2 text-sm text-neutral-300 hover:text-accent"
                                  >
                                    <ServiceIcon name={s.icon} className="h-4 w-4 text-accent" />
                                    {tx(s.title)}
                                  </Link>
                                </li>
                              ))}
                              <li className="h-3" />
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <NavLink
                        to={link.to}
                        end={link.to === '/'}
                        className={({ isActive }) => `block py-4 font-heading text-lg ${isActive ? 'text-accent' : ''}`}
                      >
                        {t(link.key)}
                      </NavLink>
                    )}
                  </motion.li>
                ))}
              </ul>

              <div className="space-y-3 border-t border-white/10 p-5">
                <div className="flex items-center justify-between">
                  <LangToggle />
                  <SocialIcons linkClass="h-10 w-10 rounded-full bg-white/10 hover:bg-accent" />
                </div>
                <button
                  type="button"
                  className="btn-primary w-full"
                  onClick={() => {
                    setMobileOpen(false)
                    openBooking()
                  }}
                >
                  {t('common.bookService')}
                </button>
                <a href={telLink} className="btn-outline w-full">
                  <Phone className="h-4 w-4" /> {siteConfig.phone}
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
