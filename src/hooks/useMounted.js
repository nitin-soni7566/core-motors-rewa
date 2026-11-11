import { useSyncExternalStore } from 'react'

const noSubscribe = () => () => {}

// False during the build-time pre-render and while React attaches to that HTML (so both match),
// true after that. Use it for anything that depends on the browser: portals, saved theme, etc.
export function useMounted() {
  return useSyncExternalStore(
    noSubscribe,
    () => true,
    () => false,
  )
}
