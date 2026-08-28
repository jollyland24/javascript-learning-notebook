// Text becomes strokes. Every character decides its own stroke's length and
// resting angle, so the same word always draws the same shape -- the point is
// that this is writing, not decoration. Change a letter, change the drawing.

const COLS = 6
const VIEW_W = 400
const VIEW_H = 300

function hash(text) {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

// One panel's worth of strokes, laid out left-to-right like handwriting.
export function generateLines(word) {
  const chars = [...word].filter((c) => c.trim() !== '')
  if (chars.length === 0) return []

  const cols = Math.min(COLS, chars.length)
  const rows = Math.ceil(chars.length / cols)
  const cellW = VIEW_W / (cols + 1)
  const cellH = VIEW_H / (rows + 1)
  const drift = hash(word) % 17

  return chars.map((char, i) => {
    const code = char.codePointAt(0)
    const col = i % cols
    const row = Math.floor(i / cols)

    return {
      // where the stroke sits inside the panel's viewBox
      cx: cellW * (col + 1) + ((code + drift) % 11) - 5,
      cy: cellH * (row + 1) + ((code * 7 + drift) % 13) - 6,
      // longer strokes for letters further along the alphabet
      length: 18 + (code % 9) * 4,
      // the angle it always wants to return to
      restAngle: ((code * 37 + drift * 5) % 360) * (Math.PI / 180),
    }
  })
}

// A sentence spread across the panels, one word per panel, comic-strip order.
export function splitIntoPanels(text, panelCount) {
  const words = text.split(/\s+/).filter(Boolean)
  return Array.from({ length: panelCount }, (_, i) => words[i] ?? '')
}

export { VIEW_W, VIEW_H }
