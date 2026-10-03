import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'framer-motion'
import Reveal from './Reveal'

function Counter({ to, decimals = 0, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    })
    return () => controls.stop()
  }, [inView, to])

  const formatted = val.toLocaleString('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className="stat-num">
      {formatted}{suffix}
    </span>
  )
}

const STATS = [
  { to: 45, suffix: '+', label: 'Kapal beroperasi' },
  { to: 120, suffix: '+', label: 'Pelabuhan dilayani' },
  { to: 2.4, decimals: 1, suffix: ' Jt', label: 'TEUs per tahun' },
  { to: 99.2, decimals: 1, suffix: '%', label: 'Ketepatan jadwal' },
]

export default function Stats() {
  return (
    <section className="stats-band">
      <div className="container stats-grid">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <div className="stat">
              <Counter to={s.to} decimals={s.decimals || 0} suffix={s.suffix} />
              <div className="stat-label">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
