export const play = (src, { loop } = {}) => {
  const a = new Audio()
  a.src = src
  a.play()
  if (loop) a.loop = true
  else a.onend = () => (a = null)

  return () => {
    a.stop()
    a.src = null
    a = null
  }
}
