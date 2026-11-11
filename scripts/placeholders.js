// Detects template values in siteConfig that must be replaced before launch.
// Used by vite.config.js (keeps them out of the Google schema) and generate-seo-files.js (build warning).

// "+91 XXXXX XXXXX", "[Street]", or a social link that is just the network's home page.
export function isPlaceholder(value) {
  if (typeof value !== 'string') return false
  if (/X{4,}/.test(value) || /\[[^\]]+\]/.test(value)) return true
  try {
    const u = new URL(value)
    return /(^|\.)(facebook|instagram|youtube|twitter|x|linkedin)\.com$/.test(u.hostname) && u.pathname.replace(/\/+$/, '') === ''
  } catch {
    return false
  }
}

export function placeholderFields(config) {
  const found = []
  const walk = (value, path) => {
    if (value && typeof value === 'object') for (const [k, v] of Object.entries(value)) walk(v, path ? `${path}.${k}` : k)
    else if (isPlaceholder(value)) found.push(`${path} = ${JSON.stringify(value)}`)
  }
  walk(config, '')
  return found
}
