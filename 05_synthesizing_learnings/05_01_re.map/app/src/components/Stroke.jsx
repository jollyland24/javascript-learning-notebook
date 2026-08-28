// One line. The whole idea is built out of this: a mark that knows the angle
// it is currently held at, and nothing else. No state, no physics -- it just
// draws itself from the centre outward.
function Stroke({ cx, cy, length, angle }) {
  const dx = (Math.cos(angle) * length) / 2
  const dy = (Math.sin(angle) * length) / 2

  return (
    <line x1={cx - dx} y1={cy - dy} x2={cx + dx} y2={cy + dy} />
  )
}

export default Stroke
