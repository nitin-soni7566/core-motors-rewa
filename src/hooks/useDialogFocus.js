import { useEffect } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Keyboard focus for modal dialogs (booking pop-up, mobile menu, lightbox):
 *  - on open, focuses the element marked `data-autofocus` (or the first focusable one)
 *  - Tab / Shift+Tab cycle inside the dialog instead of escaping to the page behind it
 *  - on close, focus goes back to the button that opened it
 */
export function useDialogFocus(ref, open) {
  useEffect(() => {
    if (!open) return
    const opener = document.activeElement
    const focusables = () => [...(ref.current?.querySelectorAll(FOCUSABLE) ?? [])].filter((el) => el.getClientRects().length > 0)

    const start = ref.current?.querySelector('[data-autofocus]') ?? focusables()[0]
    start?.focus({ preventScroll: true })

    const onKey = (e) => {
      if (e.key !== 'Tab' || !ref.current) return
      const items = focusables()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      const current = document.activeElement
      if (!ref.current.contains(current)) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && current === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && current === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus({ preventScroll: true })
    }
  }, [ref, open])
}
