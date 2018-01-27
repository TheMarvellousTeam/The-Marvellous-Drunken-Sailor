export const toAngle = ({ x, y }) =>
  (x == 0 && y > 0 && Math.PI * 0.5) ||
  (x == 0 && y < 0 && Math.PI * 1.5) ||
  (x < 0 && y == 0 && Math.PI) ||
  (x > 0 && y == 0 && 0) ||
  0
