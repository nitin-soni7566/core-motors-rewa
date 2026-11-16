// Hindi pages live under /hi (e.g. /hi/services/car-ac-repair); English pages have no prefix.
export const HI_PREFIX = '/hi'

export const isHindiPath = (path) => path === HI_PREFIX || path.startsWith(`${HI_PREFIX}/`)

// "/hi/about" → "/about", "/hi" → "/"
export const stripLang = (path) => (isHindiPath(path) ? path.slice(HI_PREFIX.length) || '/' : path)

// "/about" + 'hi' → "/hi/about", "/" + 'hi' → "/hi"
export const localizePath = (path, lang) => (lang === 'hi' ? (path === '/' ? HI_PREFIX : `${HI_PREFIX}${path}`) : path)
