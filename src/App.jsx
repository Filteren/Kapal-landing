import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Journey from './components/Journey'
import Services from './components/Services'
import Fleet from './components/Fleet'
import Stats from './components/Stats'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AuthView from './components/Auth'

const PORTS = [
  'Tanjung Priok', 'Belawan', 'Tanjung Perak', 'Makassar',
  'Bitung', 'Balikpapan', 'Sorong', 'Ambon',
  'Pontianak', 'Banjarmasin', 'Kupang', 'Jayapura',
]

function Marquee() {
  const row = [...PORTS, ...PORTS]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((p, i) => (
          <span key={i} className="marquee-item">
            {p}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 3v18m0-18l-4 4m4-4l4 4m-4 14l-4-4m4 4l4-4" stroke="#051626" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [view, setView] = useState('home') // home | auth

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [view])

  return (
    <AnimatePresence mode="wait" initial={false}>
      {view === 'home' ? (
        <motion.div
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <Navbar onLogin={() => setView('auth')} />
          <main>
            <Hero />
            <Marquee />
            <Journey />
            <Services />
            <Stats />
            <Fleet />
            <About />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      ) : (
        <motion.div
          key="auth"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <AuthView onBack={() => setView('home')} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
