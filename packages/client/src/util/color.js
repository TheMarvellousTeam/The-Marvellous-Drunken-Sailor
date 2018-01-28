export const getPlayerColor = id => {
  const u = +id.replace(/[^\d]/g, '')

  return `hsl(${u * 13},80%,50%)`
}
