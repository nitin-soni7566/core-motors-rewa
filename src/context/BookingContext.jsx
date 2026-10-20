import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [service, setService] = useState('')

  // openBooking('ceramic-coating') pre-selects a service in the form
  const openBooking = useCallback((serviceSlug = '') => {
    setService(typeof serviceSlug === 'string' ? serviceSlug : '')
    setIsOpen(true)
  }, [])
  const closeBooking = useCallback(() => setIsOpen(false), [])

  const value = useMemo(
    () => ({ isOpen, service, openBooking, closeBooking }),
    [isOpen, service, openBooking, closeBooking],
  )

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>')
  return ctx
}
