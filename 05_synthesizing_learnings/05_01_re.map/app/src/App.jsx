import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Panel from './components/Panel.jsx'
import { useWind } from './lib/useWind.js'
import {
  generateLines,
  splitIntoPanels,
  VIEW_W,
  VIEW_H,
} from './lib/generateLines.js'

const PANEL_COUNT = 6
const DEFAULT_TEXT = 'the wind moved before i did'

// Tuned by feel -- these are the dials worth turning.
const WIND_RADIUS = 180 // px; how far from the cursor the wind reaches
const WIND_FORCE = 0.04 // how hard a fast cursor pushes
const STIFFNESS = 30 // how badly a stroke wants its resting angle back
const DAMPING = 0.94 // per frame; under 1 so it overshoots a little
const VELOCITY_DECAY = 0.9 // a cursor that stops moving stops blowing
const MAX_STEP = 1 / 30 // s; a backgrounded tab must not explode the sim

function App() {
  const [text, setText] = useState(DEFAULT_TEXT)
  const wind = useWind()
  const rects = useRef([])

  const strokesByPanel = useMemo(
    () => splitIntoPanels(text, PANEL_COUNT).map(generateLines),
    [text],
  )

  const restAngles = useMemo(
    () => strokesByPanel.map((strokes) => strokes.map((s) => s.restAngle)),
    [strokesByPanel],
  )

  const [angles, setAngles] = useState(restAngles)
  const [drawn, setDrawn] = useState(strokesByPanel)

  // New words mean a new drawing: snap everything back to rest during render,
  // rather than letting a frame slip through holding the old poem's angles.
  if (drawn !== strokesByPanel) {
    setDrawn(strokesByPanel)
    setAngles(restAngles)
  }

  const measure = useCallback((index, rect) => {
    rects.current[index] = rect
  }, [])

  useEffect(() => {
    // Every stroke carries its own angle and angular velocity. Kept in a ref
    // because the loop mutates it 60 times a second.
    const sim = strokesByPanel.map((strokes) =>
      strokes.map((stroke) => ({ angle: stroke.restAngle, vel: 0 })),
    )

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let lastTime = performance.now()

    function step(now) {
      const dt = Math.min((now - lastTime) / 1000, MAX_STEP)
      lastTime = now

      const air = wind.current

      strokesByPanel.forEach((strokes, panelIndex) => {
        const rect = rects.current[panelIndex]

        strokes.forEach((stroke, strokeIndex) => {
          const state = sim[panelIndex][strokeIndex]
          let torque = 0

          if (rect) {
            // Where this stroke actually sits on screen, so the wind can be
            // local: near the cursor it bites, across the page it doesn't.
            const screenX = rect.left + (stroke.cx / VIEW_W) * rect.width
            const screenY = rect.top + (stroke.cy / VIEW_H) * rect.height
            const dx = air.x - screenX
            const dy = air.y - screenY
            const distance = Math.hypot(dx, dy)
            const falloff = 1 / (1 + (distance / WIND_RADIUS) ** 2)

            // Only the component of wind across the line turns it. A stroke
            // lying along the airflow barely moves; one facing it swings hard.
            const across =
              air.vx * -Math.sin(state.angle) + air.vy * Math.cos(state.angle)
            torque += WIND_FORCE * falloff * across
          }

          torque += -STIFFNESS * (state.angle - stroke.restAngle)

          state.vel = (state.vel + torque * dt) * DAMPING
          state.angle += state.vel * dt
        })
      })

      air.vx *= VELOCITY_DECAY
      air.vy *= VELOCITY_DECAY

      // One commit for the whole page, not one per panel.
      setAngles(sim.map((panel) => panel.map((s) => s.angle)))
      frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [strokesByPanel, wind])

  return (
    <main className="page">
      <input
        className="title"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="write something"
        aria-label="the poem"
        spellCheck="false"
      />

      <div className="grid">
        {strokesByPanel.map((strokes, index) => (
          <Panel
            key={index}
            index={index}
            strokes={strokes}
            angles={angles[index] ?? []}
            onMeasure={measure}
          />
        ))}
      </div>
    </main>
  )
}

export default App
