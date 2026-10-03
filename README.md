# PT Samudra Biru — Landing Page

Landing page perusahaan pelayaran & logistik **PT Samudra Biru**, dibangun dengan
React + Vite + **Framer Motion**.

## Fitur

- Hero dengan animasi staggered + floating cards (Framer Motion)
- Navbar responsif dengan efek blur saat scroll
- Marquee pelabuhan yang dilayani
- Counter statistik animasi saat masuk viewport
- Section layanan, armada, tentang, testimoni, dan form kontak
- Sepenuhnya responsif (desktop, tablet, mobile)

## Cara menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

## Build produksi

```bash
npm run build
```

Hasil build ada di folder `dist/` — siap di-deploy ke GitHub Pages, Netlify, atau Vercel.

## Struktur

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Services.jsx
│   ├── Stats.jsx
│   ├── Fleet.jsx
│   ├── About.jsx
│   ├── Testimonials.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   └── Reveal.jsx        # helper animasi scroll-reveal
├── App.jsx
├── main.jsx
└── index.css             # seluruh styling (tanpa framework CSS)
public/
└── images/               # hero.jpg, pelabuhan.jpg
```
