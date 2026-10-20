import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { siteConfig, telLink } from '../data/siteConfig.js'
import { useLang } from '../context/LanguageContext.jsx'
import SocialIcons from './SocialIcons.jsx'

export default function TopBar() {
  const { t } = useLang()
  return (
    <div className="hidden border-b border-white/5 bg-[#0a0a0a] text-[12.5px] text-neutral-400 md:block">
      <div className="container-x flex h-10 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <a href={telLink} className="flex items-center gap-2 transition hover:text-white">
            <Phone className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            {siteConfig.phone}
          </a>
          <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 transition hover:text-white">
            <Mail className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            {siteConfig.email}
          </a>
          <span className="hidden items-center gap-2 lg:flex">
            <Clock className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            {t('topbar.hours')}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-2 xl:flex">
            <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            {siteConfig.address.city}, {siteConfig.address.state}
          </span>
          <SocialIcons linkClass="h-7 w-7 rounded-full hover:bg-accent hover:text-white" iconClass="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  )
}
