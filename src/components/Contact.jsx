import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal'

const INFO = [
  {
    title: 'Kantor Pusat',
    desc: 'Jl. Pluit Karang Ayu No. 88, Jakarta Utara 14450',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11z" stroke="#4cc3ff" strokeWidth="2" />
        <circle cx="12" cy="10" r="2.6" stroke="#4cc3ff" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: 'Hubungi Kami',
    desc: '(021) 660-8899 · cs@samudrabiru.id',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M5 4h4l2 5-2.5 1.5a12 12 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" stroke="#4cc3ff" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Operasional 24/7',
    desc: 'Tim siaga untuk kargo mendesak & charter kapal',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8.5" stroke="#4cc3ff" strokeWidth="2" />
        <path d="M12 7.5V12l3 2" stroke="#4cc3ff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const subject = encodeURIComponent(`Penawaran: ${data.get('kebutuhan')} — ${data.get('nama')}`)
    const body = encodeURIComponent(
      `Nama: ${data.get('nama')}\nPerusahaan: ${data.get('perusahaan')}\nEmail: ${data.get('email')}\nKebutuhan: ${data.get('kebutuhan')}\n\nPesan:\n${data.get('pesan')}`
    )
    window.location.href = `mailto:cs@samudrabiru.id?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section className="section" id="kontak">
      <div className="container">
        <Reveal>
          <div className="contact-section">
            <div className="contact-info">
              <span className="eyebrow" style={{ color: '#4cc3ff', background: 'rgba(76,195,255,0.1)', borderColor: 'rgba(76,195,255,0.25)' }}>
                Hubungi Kami
              </span>
              <h2>Siap berlayar bersama kami?</h2>
              <p>
                Ceritakan kebutuhan kargo Anda — tim komersial kami akan
                menyusun rute, jadwal, dan penawaran terbaik dalam 1×24 jam.
              </p>
              {INFO.map((it) => (
                <div key={it.title} className="info-item">
                  <span className="info-icon">{it.icon}</span>
                  <span><b>{it.title}</b><span>{it.desc}</span></span>
                </div>
              ))}
            </div>

            <motion.div
              className="form-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3>Minta Penawaran</h3>
              <p>Gratis, tanpa komitmen. Respon &lt; 24 jam kerja.</p>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="nama">Nama lengkap</label>
                    <input id="nama" name="nama" required placeholder="Nama Anda" autoComplete="name" />
                  </div>
                  <div className="field">
                    <label htmlFor="perusahaan">Perusahaan</label>
                    <input id="perusahaan" name="perusahaan" placeholder="PT ..." autoComplete="organization" />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="email">Email kerja</label>
                  <input id="email" name="email" type="email" required placeholder="nama@perusahaan.id" autoComplete="email" />
                </div>
                <div className="field">
                  <label htmlFor="kebutuhan">Kebutuhan</label>
                  <select id="kebutuhan" name="kebutuhan" defaultValue="Kargo Kontainer">
                    <option>Kargo Kontainer</option>
                    <option>Curah &amp; Breakbulk</option>
                    <option>Charter Kapal</option>
                    <option>Logistik Door-to-Door</option>
                    <option>Lainnya</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="pesan">Detail pengiriman</label>
                  <textarea
                    id="pesan"
                    name="pesan"
                    placeholder="Contoh: 20 kontainer 40ft dari Jakarta ke Makassar, tiap bulan..."
                  />
                </div>
                <motion.button
                  type="submit"
                  className="btn btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {sent ? 'Membuka Email Anda…' : 'Kirim Permintaan'}
                </motion.button>
                <p className="form-note">Data Anda aman &amp; hanya dipakai untuk penawaran.</p>
              </form>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
