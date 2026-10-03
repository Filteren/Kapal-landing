const COLS = [
  {
    title: 'Layanan',
    links: ['Kargo Kontainer', 'Curah & Breakbulk', 'Charter Kapal', 'Logistik Door-to-Door'],
    href: '#layanan',
  },
  {
    title: 'Perusahaan',
    links: ['Tentang Kami', 'Armada', 'Karier', 'Berita'],
    href: '#tentang',
  },
  {
    title: 'Bantuan',
    links: ['Lacak Kargo', 'Jadwal Pelayaran', 'Syarat & Ketentuan', 'Kebijakan Privasi'],
    href: '#kontak',
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#beranda" className="brand">
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
            <p>
              Perusahaan pelayaran nasional yang menghubungkan 120+ pelabuhan
              di seluruh Nusantara sejak 1998.
            </p>
          </div>

          {COLS.map((c) => (
            <div key={c.title} className="footer-col">
              <h4>{c.title}</h4>
              <ul>
                {c.links.map((l) => (
                  <li key={l}><a href={c.href}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© 2026 PT Samudra Biru Lines. Seluruh hak cipta dilindungi.</span>
          <span>Jakarta · Surabaya · Makassar · Bitung</span>
        </div>
      </div>
    </footer>
  )
}
