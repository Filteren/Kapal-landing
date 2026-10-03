import { motion } from 'framer-motion'
import Reveal from './Reveal'

const POINTS = [
  'Jadwal pelayaran mingguan yang pasti ke 120+ pelabuhan Indonesia',
  'Pelacakan kargo real-time lewat dashboard pelanggan & notifikasi otomatis',
  'Asuransi kargo & klaim cepat — setiap pengiriman terlindungi penuh',
  'Tim operasional 24/7 yang siap membantu lewat telepon, email, & WhatsApp',
]

export default function About() {
  return (
    <section className="section" id="tentang">
      <div className="container about-grid">
        <Reveal className="about-media">
          <div className="about-img">
            <img src="images/pelabuhan.jpg" alt="Terminal peti kemas yang sibuk pada senja hari" loading="lazy" />
          </div>
          <motion.div
            className="about-exp"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, type: 'spring', stiffness: 200, damping: 16 }}
          >
            <b>27+</b>
            <span>Tahun pengalaman</span>
          </motion.div>
        </Reveal>

        <div className="about-copy">
          <Reveal>
            <span className="eyebrow">Tentang Kami</span>
            <h2 className="section-title">Mitra pelayaran yang tumbuh bersama Indonesia</h2>
            <p className="section-sub">
              Sejak 1998, PT Samudra Biru melayani jalur distribusi nasional —
              dari bahan pokok hingga material tambang. Kami percaya logistik
              laut yang andal adalah tulang punggung ekonomi kepulauan.
            </p>
          </Reveal>

          <ul className="check-list">
            {POINTS.map((p, i) => (
              <Reveal key={p} delay={i * 0.08} y={16}>
                <li>
                  <span className="check" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="#0f6cb2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {p}
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.15}>
            <a href="#kontak" className="btn btn-navy">Hubungi Tim Kami</a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
