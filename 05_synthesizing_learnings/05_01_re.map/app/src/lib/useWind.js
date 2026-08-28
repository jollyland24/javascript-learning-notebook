import { useEffect, useRef } from 'react'

// Tracks the pointer and, more importantly, how fast it is moving. Speed is
// what becomes wind -- a cursor sitting still blows nothing. This lives in a
// ref rather than state because it changes far too often to re-render on.
export function useWind() {
  const wind = useRef({ x: -9999, y: -9999, vx: 0, vy: 0 })

  useEffect(() => {
    let lastX = null
    let lastY = null
    let lastTime = 0

    function onMove(event) {
      const now = performance.now()
      const current = wind.current

      if (lastX !== null) {
        const dt = Math.max(now - lastTime, 1) / 1000
        current.vx = (event.clientX - lastX) / dt
        current.vy = (event.clientY - lastY) / dt
      }

      current.x = event.clientX
      current.y = event.clientY
      lastX = event.clientX
      lastY = event.clientY
      lastTime = now
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return wind
}
