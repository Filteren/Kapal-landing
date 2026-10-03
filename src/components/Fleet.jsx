import Reveal from './Reveal'

const SHIPS = [
  {
    name: 'SB Merdeka',
    type: 'Kapal Kontainer',
    art: 'art-a',
    specs: [
      { v: '1.200', l: 'TEUs' },
      { v: '148 m', l: 'Panjang' },
      { v: '2019', l: 'Tahun' },
    ],
    route: 'Jakarta — Surabaya — Makassar — Bitung',
  },
  {
    name: 'SB Nusantara',
    type: 'Bulk Carrier',
    art: 'art-b',
    specs: [
      { v: '35.000', l: 'DWT' },
      { v: '180 m', l: 'Panjang' },
      { v: '2016', l: 'Tahun' },
    ],
    route: 'Kalimantan — Sulawesi — Jawa (batu bara & nikel)',
  },
  {
    name: 'SB Perkasa',
    type: 'LCT & Deck Cargo',
    art: 'art-c',
    specs: [
      { v: '4.800', l: 'DWT' },
      { v: '82 m', l: 'Panjang' },
      { v: '2021', l: 'Tahun' },
    ],
    route: 'Antar pulau timur — alat berat & material proyek',
  },
  {
    name: 'SB Tangguh',
    type: 'Tug & Barge',
    art: 'art-d',
    specs: [
      { v: '8.000', l: 'HP' },
      { v: '2 × 300 ft', l: 'Tongkang' },
      { v: '2018', l: 'Tahun' },
    ],
    route: 'Sungai & pesisir — logistik tambang',
  },
]

const Waves = () => (
  <svg className="waves" width="100%" height="34" viewBox="0 0 600 34" preserveAspectRatio="none" fill="none">
    <path d="M0 20c50-14 100-14 150 0s100 14 150 0 100-14 150 0 100 14 150 0" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
    <path d="M0 30c50-12 100-12 150 0s100 12 150 0 100-12 150 0 100 12 150 0" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
  </svg>
)

export default function Fleet() {
  return (
    <section className="section section-alt" id="armada">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">Armada Kami</span>
          <h2 className="section-title">45+ kapal siap berlayar untuk Anda</h2>
          <p className="section-sub">
            Armada modern dengan perawatan berkala dan awak tersertifikasi —
            diaudit ISM Code &amp; memenuhi standar keselamatan internasional.
          </p>
        </Reveal>

        <div className="fleet-grid">
          {SHIPS.map((s, i) => (
            <Reveal key={s.name} delay={(i % 2) * 0.1}>
              <article className="fleet-card">
                <div className={`fleet-art ${s.art}`}>
                  <span className="fleet-flag">{s.type}</span>
                  <div>
                    <div className="fleet-art-title">{s.name}</div>
                    <div className="fleet-art-sub">PT Samudra Biru Lines</div>
                  </div>
                  <Waves />
                </div>
                <div className="fleet-body">
                  <div className="fleet-specs">
                    {s.specs.map((sp) => (
                      <div key={sp.l} className="spec">
                        <b>{sp.v}</b>
                        <span>{sp.l}</span>
                      </div>
                    ))}
                  </div>
                  <div className="fleet-route">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11z" stroke="#0f6cb2" strokeWidth="2" />
                      <circle cx="12" cy="10" r="2.6" stroke="#0f6cb2" strokeWidth="2" />
                    </svg>
                    {s.route}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
