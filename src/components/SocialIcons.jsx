import { siteConfig } from '../data/siteConfig.js'

// lucide-react no longer ships brand logos, so these are simple inline SVGs.
const paths = {
  facebook:
    'M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5H16.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3z',
  instagram:
    'M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2zm6.1-8.1a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM21 8.1c-.1-1.5-.4-2.8-1.5-3.9S17.1 2.8 15.6 2.7C14 2.6 10 2.6 8.4 2.7c-1.5.1-2.8.4-3.9 1.5S3 6.6 3 8.1C2.9 9.7 2.9 13.7 3 15.3c.1 1.5.4 2.8 1.5 3.9s2.4 1.4 3.9 1.5c1.6.1 5.6.1 7.2 0 1.5-.1 2.8-.4 3.9-1.5s1.4-2.4 1.5-3.9c.1-1.6.1-5.6 0-7.2zm-2 9a3.1 3.1 0 0 1-1.8 1.8c-1.2.5-4.1.4-5.2.4s-4 .1-5.2-.4A3.1 3.1 0 0 1 5 17.1c-.5-1.2-.4-4.1-.4-5.2s-.1-4 .4-5.2A3.1 3.1 0 0 1 6.8 5c1.2-.5 4.1-.4 5.2-.4s4-.1 5.2.4A3.1 3.1 0 0 1 19 6.8c.5 1.2.4 4.1.4 5.2s.1 4-.4 5.1z',
  youtube:
    'M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z',
}

export function BrandIcon({ name, className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  )
}

export default function SocialIcons({ className = '', iconClass = 'h-4 w-4', linkClass = '' }) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {Object.entries(siteConfig.socials)
        .filter(([name, url]) => url && paths[name])
        .map(([name, url]) => (
          <li key={name}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${siteConfig.name} on ${name[0].toUpperCase() + name.slice(1)}`}
              className={`flex items-center justify-center transition-colors duration-300 ${linkClass}`}
            >
              <BrandIcon name={name} className={iconClass} />
            </a>
          </li>
        ))}
    </ul>
  )
}
