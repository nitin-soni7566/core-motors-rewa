import { StrictMode } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { BookingProvider } from './context/BookingContext.jsx'
import App from './App.jsx'

// The whole app, shared by the browser (main.jsx, BrowserRouter) and the build-time
// pre-renderer (entry-server.jsx, StaticRouter) so both produce the same HTML.
export default function Root({ Router, routerProps = {}, helmetContext }) {
  return (
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        {/* reducedMotion="user": animations become instant fades for visitors who turn on "reduce motion" */}
        <MotionConfig reducedMotion="user">
          <Router {...routerProps}>
            <ThemeProvider>
              <LanguageProvider>
                <BookingProvider>
                  <App />
                </BookingProvider>
              </LanguageProvider>
            </ThemeProvider>
          </Router>
        </MotionConfig>
      </HelmetProvider>
    </StrictMode>
  )
}
