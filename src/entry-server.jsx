// Build-time renderer: turns one URL into HTML. Used only by scripts/prerender.js (never shipped to browsers).
import { Writable } from 'node:stream'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import Root from './Root.jsx'

export function render(url) {
  return new Promise((resolve, reject) => {
    const helmetContext = {}
    let html = ''
    let failed = null
    const stream = renderToPipeableStream(<Root Router={StaticRouter} routerProps={{ location: url }} helmetContext={helmetContext} />, {
      // wait for lazy-loaded pages so the HTML is complete (no loading spinner, no streaming scripts)
      onAllReady() {
        stream.pipe(
          new Writable({
            write(chunk, _enc, done) {
              html += chunk
              done()
            },
            final(done) {
              if (failed) reject(failed)
              else resolve({ html, helmet: helmetContext.helmet })
              done()
            },
          }),
        )
      },
      onShellError: reject,
      onError(err) {
        failed = err
      },
    })
  })
}
