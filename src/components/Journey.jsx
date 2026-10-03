import { useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion'

/* Kapal kontainer flat-style */
function CargoShip() {
  const boxes = [
    // [x, y, color]
    [70, 56, '#fbbf24'], [104, 56, '#38bdf8'], [138, 56, '#f4f7fa'], [172, 56, '#34d399'],
    [70, 34, '#38bdf8'], [104, 34, '#f87171'], [138, 34, '#fbbf24'],
    [206, 56, '#f4f7fa'], [240, 56, '#fbbf24'],
  ]
  return (
    <svg viewBox="0 0 340 130" width="100%" height="100%" aria-hidden="true">
      {boxes.map(([x, y, c], i) => (
        <rect key={i} x={x} y={y} width="32" height="20" rx="2.5" fill={c} stroke="rgba(5,22,38,.25)" strokeWidth="1.5" />
      ))}
      {/* anjungan */}
      <rect x="22" y="26" width="34" height="52" rx="4" fill="#eef4f9" />
      <rect x="27" y="33" width="24" height="7" rx="2" fill="#0c2c4d" />
      <rect x="27" y="44" width="24" height="7" rx="2" fill="#0c2c4d" />
      <rect x="60" y="40" width="10" height="38" fill="#b45309" />
      <rect x="60" y="34" width="10" height="8" fill="#0c2c4d" />
      {/* lambung */}
      <path d="M10 80 H296 L330 98 L304 118 H44 Z" fill="#0b2c4d" />
      <rect x="10" y="80" width="296" height="5" fill="#fbbf24" />
      {/* tiang haluan */}
      <rect x="312" y="52" width="5" height="28" fill="#0b2c4d" />
    </svg>
  )
}

function WaveRow({ color }) {
  return (
    <svg viewBox="0 0 1200 70" preserveAspectRatio="none" style={{ width: '50%', height: '100%', flexShrink: 0 }}>
      <path
        d="M0 34 Q 75 6 150 34 T 300 34 T 450 34 T 600 34 T 750 34 T 900 34 T 1050 34 T 1200 34 V70 H0 Z"
        fill={color}
      />
    </svg>
  )
}

const PHASES = [
  {
    eyebrow: 'Rute Nusantara',
    title: <>Dari Sabang,</>,
    sub: '27 tahun menghubungkan pelabuhan-pelabuhan di barat Indonesia.',
  },
  {
    eyebrow: 'Jangkauan Terluas',
    title: <>sampai Merauke.</>,
    sub: '120+ pelabuhan disinggahi — dari ujung barat hingga timur Nusantara.',
  },
  {
    eyebrow: 'Satu Armada',
    title: <>Satu armada. Satu Nusantara.</>,
    sub: 'Bergabunglah dengan ratusan perusahaan yang berlayar bersama kami.',
    cta: true,
  },
]

function phaseOpacity(smooth, i) {
  const ranges = [
    [0, 0.04, 0.27, 0.36],
    [0.36, 0.44, 0.62, 0.7],
    [0.7, 0.78, 1, 1],
  ]
  return useTransform(smooth, ranges[i], [0, 1, 1, i === 2 ? 1 : 0])
}

export default function Journey() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 20, mass: 0.6 })

  const [phase, setPhase] = useState(0)
  useMotionValueEvent(smooth, 'change', (v) => setPhase(v < 0.36 ? 0 : v < 0.7 ? 1 : 2))

  /* Langit: pagi -> senja -> malam */
  const sky = useTransform(smooth, [0, 0.5, 1], ['#2f7fc4', '#c65f3d', '#081a36'])
  const ocean = useTransform(smooth, [0, 0.5, 1], ['#1f6fa8', '#274f7d', '#0b2547'])

  /* Matahari terbenam, bulan terbit */
  const sunX = useTransform(smooth, [0, 0.55], ['62vw', '30vw'])
  const sunY = useTransform(smooth, [0, 0.55], ['6vh', '34vh'])
  const sunOpacity = useTransform(smooth, [0, 0.45, 0.6], [1, 1, 0])
  const moonOpacity = useTransform(smooth, [0.5, 0.68], [0, 1])
  const starsOpacity = useTransform(smooth, [0.55, 0.75], [0, 1])

  /* Kapal berlayar kiri -> kanan */
  const shipX = useTransform(smooth, [0, 1], ['-22vw', '72vw'])
  const shipBob = useTransform(smooth, [0, 0.5, 1], [8, -10, 6])
  const shipScale = useTransform(smooth, [0, 0.15, 0.85, 1], [0.7, 1, 1, 0.85])

  /* Awan parallax beda kecepatan */
  const cloud1X = useTransform(smooth, [0, 1], ['-12vw', '38vw'])
  const cloud2X = useTransform(smooth, [0, 1], ['78vw', '18vw'])
  const cloud3X = useTransform(smooth, [0, 1], ['-20vw', '65vw'])

  /* Ombak bergerak berlawanan arah */
  const wave1X = useTransform(smooth, [0, 1], ['0%', '-50%'])
  const wave2X = useTransform(smooth, [0, 1], ['-50%', '0%'])

  /* Indikator rute */
  const dotLeft = useTransform(smooth, [0, 1], ['4%', '96%'])
  const copyScale = useTransform(smooth, [0, 1], [1, 0.94])

  const stars = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        left: `${(i * 37.7 + 11) % 100}%`,
        top: `${(i * 53.3 + 7) % 55}%`,
        size: 2 + ((i * 7) % 3),
        delay: (i % 5) * 0.4,
      })),
    []
  )

  const opacities = [phaseOpacity(smooth, 0), phaseOpacity(smooth, 1), phaseOpacity(smooth, 2)]

  return (
    <section ref={ref} className="journey" aria-label="Perjalanan Samudra Biru">
      <div className="journey-sticky">
        {/* LANGIT */}
        <motion.div className="journey-sky" style={{ backgroundColor: sky }}>
          <motion.div className="journey-stars" style={{ opacity: starsOpacity }}>
            {stars.map((s, i) => (
              <motion.span
                key={i}
                className="star"
                style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
                animate={{ opacity: [0.25, 1, 0.25] }}
                transition={{ duration: 2.6, repeat: Infinity, delay: s.delay }}
              />
            ))}
          </motion.div>

          <motion.div className="journey-sun" style={{ x: sunX, y: sunY, opacity: sunOpacity }} />
          <motion.div className="journey-moon" style={{ opacity: moonOpacity }}>
            <span />
          </motion.div>

          <motion.div className="cloud c1" style={{ x: cloud1X }} />
          <motion.div className="cloud c2" style={{ x: cloud2X }} />
          <motion.div className="cloud c3" style={{ x: cloud3X }} />
        </motion.div>

        {/* LAUT */}
        <motion.div className="journey-ocean" style={{ backgroundColor: ocean }}>
          <motion.div className="wave-layer back" style={{ x: wave2X }}>
            <WaveRow color="rgba(255,255,255,.28)" />
            <WaveRow color="rgba(255,255,255,.28)" />
          </motion.div>
          <motion.div className="wave-layer front" style={{ x: wave1X }}>
            <WaveRow color="rgba(255,255,255,.5)" />
            <WaveRow color="rgba(255,255,255,.5)" />
          </motion.div>
        </motion.div>

        {/* KAPAL */}
        <motion.div className="journey-ship" style={{ x: shipX, y: shipBob, scale: shipScale }}>
          <div className="ship-bob">
            <CargoShip />
          </div>
        </motion.div>

        {/* TEKS FASE */}
        <motion.div className="journey-copy" style={{ scale: copyScale }}>
          {PHASES.map((p, i) => (
            <motion.div key={i} className="journey-phase" style={{ opacity: opacities[i] }}>
              <span className="eyebrow eyebrow-light">{p.eyebrow}</span>
              <h2 className="journey-title">{p.title}</h2>
              <p className="journey-sub">{p.sub}</p>
              {p.cta && (
                <motion.a
                  href="#kontak"
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Minta Penawaran
                </motion.a>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* INDIKATOR */}
        <div className="journey-route">
          <span>SABANG</span>
          <div className="route-line">
            <motion.span className="route-dot" style={{ left: dotLeft }} />
          </div>
          <span>MERAUKE</span>
        </div>
        <div className="journey-dots">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`jdot${phase === i ? ' active' : ''}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
