import { motion } from 'framer-motion'
import { HERO_IMG } from '../assets/heroImage.js'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

const PROOF = [
  { num: <>27<em>+</em></>, label: 'Tahun berlayar' },
  { num: <>45<em>+</em></>, label: 'Kapal beroperasi' },
  { num: <>120<em>+</em></>, label: 'Pelabuhan dilayani' },
]

export default function Hero() {
  return (
    <header className="hero" id="beranda">
      <div className="container hero-inner">
        <motion.div variants={container} initial="hidden" animate="show" className="hero-copy">
          <motion.div variants={item}>
            <span className="hero-badge">
              <span className="dot">SB</span>
              Berlayar sejak 1998 — Terpercaya di seluruh Nusantara
            </span>
          </motion.div>

          <motion.h1 variants={item} className="hero-title">
            Menghubungkan Nusantara <span className="text-accent">Lewat Laut</span>
          </motion.h1>

          <motion.p variants={item} className="hero-lead">
            PT Samudra Biru adalah perusahaan pelayaran &amp; logistik Indonesia.
            Kami mengangkut kargo kontainer, curah, dan proyek ke lebih dari 120
            pelabuhan — aman, tepat waktu, dan transparan.
          </motion.p>

          <motion.div variants={item} className="hero-actions">
            <motion.a
              href="#kontak"
              className="btn btn-primary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Minta Penawaran
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
            <motion.a
              href="#armada"
              className="btn btn-outline-light"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Lihat Armada
            </motion.a>
          </motion.div>

          <motion.div variants={item} className="hero-proof">
            {PROOF.map((p) => (
              <div key={p.label} className="proof-item">
                <span className="proof-num">{p.num}</span>
                <span className="proof-label">{p.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.94, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-img-frame">
            <img src={HERO_IMG} alt="Kapal kontainer Samudra Biru berlayar di laut lepas" />
          </div>

          <motion.div
            className="float-card fc-top"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="fc-icon" style={{ background: 'rgba(251,191,36,0.16)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" stroke="#fbbf24" strokeWidth="2" strokeLinejoin="round" />
                <path d="M9 12l2 2 4-4" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>
              <span className="fc-title">99,2% Tepat Waktu</span><br />
              <span className="fc-sub">Rata-rata keterlambatan &lt; 6 jam</span>
            </span>
          </motion.div>

          <motion.div
            className="float-card fc-bottom"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          >
            <span className="fc-icon" style={{ background: 'rgba(76,195,255,0.16)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4 16h16l-2 5H6l-2-5z" stroke="#4cc3ff" strokeWidth="2" strokeLinejoin="round" />
                <path d="M12 4v7m0 0H7m5 0h5M7 11l-2 5m12-5l2 5" stroke="#4cc3ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>
              <span className="fc-title">2,4 Jt TEUs / Tahun</span><br />
              <span className="fc-sub">Volume kargo 2025</span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </header>
  )
}
