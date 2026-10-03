import Reveal from './Reveal'

const TESTIS = [
  {
    text: 'Jadwalnya tidak pernah meleset. Distribusi semen kami ke Indonesia timur jadi jauh lebih terprediksi sejak pindah ke Samudra Biru.',
    name: 'Hendra Wijaya',
    role: 'Logistics Manager, PT Semen Nusantara',
    initial: 'H',
    color: 'linear-gradient(135deg, #0c2c4d, #0f6cb2)',
  },
  {
    text: 'Tim operasionalnya responsif banget. Setiap kontainer bisa saya lacak real-time, jadi tim gudang selalu siap sebelum kapal sandar.',
    name: 'Sarah Limanto',
    role: 'Supply Chain Head, Retail FMCG',
    initial: 'S',
    color: 'linear-gradient(135deg, #8a5a17, #c98a2b)',
  },
  {
    text: 'Kami charter LCT untuk proyek smelter di Sulawesi. Eksekusinya rapi, dokumen lengkap, dan kru kapalnya sangat profesional.',
    name: 'Bambang Sutrisno',
    role: 'Project Director, PT Nikel Maju Bersama',
    initial: 'B',
    color: 'linear-gradient(135deg, #14705a, #22a07e)',
  },
]

export default function Testimonials() {
  return (
    <section className="section section-alt">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">Testimoni</span>
          <h2 className="section-title">Dipercaya ratusan perusahaan di Indonesia</h2>
          <p className="section-sub">
            Dari manufaktur hingga tambang — ini kata mereka tentang berlayar bersama kami.
          </p>
        </Reveal>

        <div className="testi-grid">
          {TESTIS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="testi-card">
                <div className="stars" aria-label="5 dari 5 bintang">★★★★★</div>
                <blockquote className="testi-text">{t.text}</blockquote>
                <figcaption className="testi-person">
                  <span className="avatar" style={{ background: t.color }} aria-hidden="true">{t.initial}</span>
                  <span>
                    <b>{t.name}</b>
                    <span>{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
