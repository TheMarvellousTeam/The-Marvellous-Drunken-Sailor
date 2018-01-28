export const play = src => {
  const a = new Audio()
  a.src = src
  a.play()
  a.onend = () => (a = null)
}
