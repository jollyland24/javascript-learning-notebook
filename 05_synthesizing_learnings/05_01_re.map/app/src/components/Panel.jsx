import { useEffect, useRef } from 'react'
import Stroke from './Stroke.jsx'
import { VIEW_W, VIEW_H } from '../lib/generateLines.js'

// One frame of the strip. It reports where it sits on screen so App can work
// out how close the cursor is to each stroke inside it.
function Panel({ index, strokes, angles, onMeasure }) {
  const svgRef = useRef(null)

  useEffect(() => {
    const element = svgRef.current
    if (!element) return

    const report = () => onMeasure(index, element.getBoundingClientRect())
    report()

    const observer = new ResizeObserver(report)
    observer.observe(element)
    window.addEventListener('scroll', report, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', report)
    }
  }, [index, onMeasure])

  return (
    <svg
      ref={svgRef}
      className="panel"
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      aria-hidden="true"
    >
      {strokes.length === 0 ? (
        <text className="panel-number" x={VIEW_W / 2} y={VIEW_H / 2}>
          {index + 1}
        </text>
      ) : (
        strokes.map((stroke, i) => (
          <Stroke
            key={i}
            cx={stroke.cx}
            cy={stroke.cy}
            length={stroke.length}
            angle={angles[i] ?? stroke.restAngle}
          />
        ))
      )}
    </svg>
  )
}

export default Panel
