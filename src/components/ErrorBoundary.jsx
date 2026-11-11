import { Component } from 'react'
import { RotateCw } from 'lucide-react'
import { useLang } from '../context/LanguageContext.jsx'

function ErrorFallback() {
  const { t } = useLang()
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-20 text-center" role="alert">
      <div className="max-w-md">
        <h1 className="text-2xl font-semibold text-ink sm:text-3xl">{t('error.title')}</h1>
        <p className="mt-3 text-muted">{t('error.text')}</p>
        <button type="button" onClick={() => window.location.reload()} className="btn-primary mt-8">
          <RotateCw className="h-4 w-4" aria-hidden="true" /> {t('error.reload')}
        </button>
      </div>
    </div>
  )
}

// Shows a "reload" message instead of a blank page if a page fails to render or its code fails to download.
export default class ErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? <ErrorFallback /> : this.props.children
  }
}
