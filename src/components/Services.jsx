import Reveal from './Reveal'

const SERVICES = [
  {
    title: 'Kargo Kontainer',
    desc: 'Pengiriman peti kemas FCL & LCL antar pulau dengan jadwal pelayaran mingguan yang pasti.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="7" width="18" height="10" rx="1.5" stroke="#fff" strokeWidth="2" />
        <path d="M3 11h18M7.5 7v10M12 7v10M16.5 7v10" stroke="#fff" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: 'Curah & Breakbulk',
    desc: 'Angkutan batu bara, nikel, semen, dan kargo proyek dengan bulk carrier hingga 35.000 DWT.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M4 16h16l-2.5 4h-11L4 16z" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
        <path d="M12 4v8m0-8H8m4 0h4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 12l-2 4m10-4l2 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Charter Kapal',
    desc: 'Sewa kapal time-charter & voyage-charter untuk kebutuhan tambang, energi, dan konstruksi.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M4 17c2-2 4-2 6 0s4 2 6 0 3-1.5 4-1" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 4v9m0 0l-5-4m5 4l5-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Logistik Door-to-Door',
    desc: 'Solusi multimoda terintegrasi: penjemputan, pelayaran, hingga pengiriman ke gudang Anda.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="7" cy="18" r="1.8" stroke="#fff" strokeWidth="2" />
        <circle cx="17" cy="18" r="1.8" stroke="#fff" strokeWidth="2" />
      </svg>
    ),
  },
]

export default function Services() {
  return (
    <section className="section" id="layanan">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">Layanan Kami</span>
          <h2 className="section-title">Solusi pelayaran untuk setiap kebutuhan kargo</h2>
          <p className="section-sub">
            Dari peti kemas hingga kargo curah, kami merancang rute dan jadwal
            yang paling efisien untuk bisnis Anda.
          </p>
        </Reveal>

        <div className="svc-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.09}>
              <div className="svc-card">
                <div className="svc-icon">{s.icon}</div>
                <h3 className="svc-title">{s.title}</h3>
                <p className="svc-desc">{s.desc}</p>
                <a href="#kontak" className="svc-link">
                  Pelajari <span>→</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
