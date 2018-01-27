export const toAngle = ({ x, y }) =>
  (y == 0 && x < 0 && Math.PI * 0.5) ||
  (y == 0 && x > 0 && Math.PI * 1.5) ||
  (y < 0 && x == 0 && Math.PI) ||
  (y > 0 && x == 0 && 0) ||
  0
