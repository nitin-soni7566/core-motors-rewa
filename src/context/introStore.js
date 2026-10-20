// Tiny shared flag: has the intro splash finished? Lets the hero wait for it.
let done = false
const listeners = new Set()

export const markIntroDone = () => {
  if (done) return
  done = true
  listeners.forEach((l) => l())
}
export const subscribeIntro = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
export const isIntroDone = () => done
