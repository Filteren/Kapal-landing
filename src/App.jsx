import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Fleet from './components/Fleet'
import Stats from './components/Stats'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

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
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Stats />
        <Fleet />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
