import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const LINKS = [
  { href: '#beranda', label: 'Beranda' },
  { href: '#layanan', label: 'Layanan' },
  { href: '#armada', label: 'Armada' },
  { href: '#tentang', label: 'Tentang' },
  { href: '#kontak', label: 'Kontak' },
]

export default function Navbar() {
  const { scrollY } = useScroll()
  const { scrollYProgress } = useScroll()
  const progressScale = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 30))
    return unsub
  }, [scrollY])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open ])

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="container nav-inner">
          <a href="#beranda" className="brand" aria-label="PT Samudra Biru">
            <span className="brand-mark" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 15c2.5-2.5 5-2.5 7.5 0s5 2.5 7.5 0 3.5-1.8 5-1" stroke="#fbbf24" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M3 19.5c2.5-2.5 5-2.5 7.5 0s5 2.5 7.5 0 3.5-1.8 5-1" stroke="#4cc3ff" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M12 3v8m0 0l-4-3m4 3l4-3" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>
              <span className="brand-name">Samudra Biru</span><br />
              <span className="brand-sub">Pelayaran &amp; Logistik</span>
            </span>
          </a>

          <div className="nav-links">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </div>

          <a href="#kontak" className="btn btn-primary btn-sm">Minta Penawaran</a>

          <button
            className="nav-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={open}
          >
            <span style={open ? { transform: 'translateY(7.5px) rotate(45deg)' } : {}} />
            <span style={open ? { opacity: 0 } : {}} />
            <span style={open ? { transform: 'translateY(-7.5px) rotate(-45deg)' } : {}} />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${open ? ' open' : ''}`}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
        <a href="#kontak" className="btn btn-primary" onClick={() => setOpen(false)}>Minta Penawaran</a>
      </div>
      <motion.div className="scroll-progress" style={{ scaleX: progressScale }} aria-hidden="true" />
    </>
  )
}
