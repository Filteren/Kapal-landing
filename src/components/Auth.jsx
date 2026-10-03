import { useState } from 'react'
import {
  motion, AnimatePresence, useAnimationControls,
  useMotionValue, useSpring, useTransform,
} from 'framer-motion'
import { CargoShip } from './Journey'

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())

function pwScore(pw) {
  let s = 0
  if (pw.length >= 8) s++
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++
  if (/\d/.test(pw)) s++
  if (/[^a-zA-Z0-9]/.test(pw)) s++
  return s
}
const PW_LABEL = ['Terlalu pendek', 'Lemah', 'Cukup', 'Kuat', 'Sangat kuat']
const PW_COLOR = ['#cbd5e1', '#f87171', '#fbbf24', '#38bdf8', '#34d399']

const fieldAnim = {
  hidden: { opacity: 0, y: 18 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}

function TextInput({ id, label, error, ...rest }) {
  return (
    <div>
      <div className={`fl-field${error ? ' invalid' : ''}`}>
        <input id={id} placeholder=" " {...rest} />
        <label htmlFor={id}>{label}</label>
      </div>
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            className="field-error"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function PasswordInput({ id, label, value, onChange, error }) {
  const [show, setShow] = useState(false)
  return (
    <div>
      <div className={`fl-field${error ? ' invalid' : ''}`}>
        <input
          id={id} type={show ? 'text' : 'password'} placeholder=" "
          value={value} onChange={(e) => onChange(e.target.value)}
          autoComplete={id === 'reg-password' ? 'new-password' : 'current-password'}
        />
        <label htmlFor={id}>{label}</label>
        <button
          type="button" className="pw-toggle" onClick={() => setShow(!show)}
          aria-label={show ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
        >
          {show ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 3l18 18" stroke="#5a7186" strokeWidth="2" strokeLinecap="round" />
              <path d="M10.5 5.2A9.8 9.8 0 0112 5c5 0 9 4.5 10 7-.4 1-1.3 2.4-2.7 3.7M6.6 6.6C4 8.3 2.5 10.6 2 12c1 2.5 5 7 10 7 1.5 0 2.9-.4 4.1-1" stroke="#5a7186" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M2 12c1-2.5 5-7 10-7s9 4.5 10 7c-1 2.5-5 7-10 7s-9-4.5-10-7z" stroke="#5a7186" strokeWidth="2" />
              <circle cx="12" cy="12" r="3" stroke="#5a7186" strokeWidth="2" />
            </svg>
          )}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            className="field-error"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function StrengthMeter({ pw }) {
  const score = pwScore(pw)
  return (
    <div className="pw-meter">
      <div className="pw-segs">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="pw-seg"
            animate={{
              backgroundColor: pw ? (i < score ? PW_COLOR[score] : '#e2e8f0') : '#e2e8f0',
              scaleY: pw && i < score ? 1.35 : 1,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          />
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={pw ? PW_LABEL[score] : 'empty'}
          className="pw-label"
          style={{ color: pw ? PW_COLOR[score] : '#8aa0b4' }}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
        >
          {pw ? PW_LABEL[score] : 'Kekuatan kata sandi'}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export default function AuthView({ initialMode = 'login', onBack }) {
  const [mode, setMode] = useState(initialMode)
  const [status, setStatus] = useState('idle') // idle | loading | success
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [agree, setAgree] = useState(false)
  const [errors, setErrors] = useState({})
  const controls = useAnimationControls()

  /* Parallax mouse di panel visual */
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 55, damping: 18 })
  const sy = useSpring(my, { stiffness: 55, damping: 18 })
  const shipX = useTransform(sx, [-0.5, 0.5], [-24, 24])
  const shipY = useTransform(sy, [-0.5, 0.5], [-12, 12])
  const cloudX = useTransform(sx, [-0.5, 0.5], [18, -18])

  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  const switchMode = (m) => {
    if (m === mode) return
    setMode(m)
    setStatus('idle')
    setErrors({})
  }

  const validate = () => {
    const e = {}
    if (mode === 'register' && name.trim().length < 3) e.name = 'Nama minimal 3 karakter.'
    if (!emailOk(email)) e.email = 'Masukkan alamat email yang valid.'
    if (password.length < 8) e.password = 'Kata sandi minimal 8 karakter.'
    if (mode === 'register' && confirm !== password) e.confirm = 'Konfirmasi tidak cocok.'
    if (mode === 'register' && !agree) e.agree = 'Centang persetujuan terlebih dahulu.'
    return e
  }

  const submit = async (ev) => {
    ev.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length) {
      controls.start({ x: [0, -12, 12, -8, 8, 0], transition: { duration: 0.45 } })
      return
    }
    setStatus('loading')
    await new Promise((r) => setTimeout(r, 1600))
    setStatus('success')
  }

  return (
    <div className="auth" onMouseMove={onMouseMove}>
      {/* PANEL VISUAL */}
      <div className="auth-visual">
        <div className="auth-visual-inner">
          <button className="auth-back" onClick={onBack}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5m0 0l6-6m-6 6l6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Beranda
          </button>

          <div className="auth-brand">
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
          </div>

          <motion.div className="auth-ship" style={{ x: shipX, y: shipY }}>
            <div className="ship-bob"><CargoShip /></div>
          </motion.div>
          <motion.div className="auth-cloud ac1" style={{ x: cloudX }} />
          <motion.div className="auth-cloud ac2" style={{ x: cloudX }} />

          <div className="auth-quote">
            <AnimatePresence mode="wait" initial={false}>
              <motion.blockquote
                key={mode}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4 }}
              >
                {mode === 'login'
                  ? '“Pelacakan real-time membuat tim gudang kami selalu siap sebelum kapal sandar.”'
                  : '“Pendaftaran 2 menit, langsung bisa cek jadwal pelayaran ke 120+ pelabuhan.”'}
                <footer>{mode === 'login' ? 'Sarah Limanto — Supply Chain Head' : 'Hendra Wijaya — Logistics Manager'}</footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <svg className="auth-waves" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 60 Q 90 20 180 60 T 360 60 T 540 60 T 720 60 T 900 60 T 1080 60 T 1260 60 T 1440 60 V120 H0 Z" fill="rgba(255,255,255,.14)" />
            <path d="M0 80 Q 90 45 180 80 T 360 80 T 540 80 T 720 80 T 900 80 T 1080 80 T 1260 80 T 1440 80 V120 H0 Z" fill="rgba(255,255,255,.22)" />
          </svg>
        </div>
      </div>

      {/* PANEL FORM */}
      <div className="auth-panel">
        <motion.div
          className="auth-card"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {status === 'success' ? (
              <motion.div
                key="success"
                className="auth-success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <svg viewBox="0 0 52 52" className="check-svg" aria-hidden="true">
                  <motion.circle cx="26" cy="26" r="24" fill="none" stroke="#34d399" strokeWidth="3"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
                  <motion.path d="M14 27l8 8 16-16" fill="none" stroke="#34d399" strokeWidth="4"
                    strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.4 }} />
                </svg>
                <h2>{mode === 'login' ? 'Selamat datang kembali!' : 'Akun berhasil dibuat!'}</h2>
                <p>
                  {mode === 'login'
                    ? `Halo${name ? `, ${name}` : ''}! Kamu berhasil masuk ke dashboard Samudra Biru.`
                    : `Halo, ${name.split(' ')[0] || 'pelaut'}! Akunmu sudah aktif — mulai lacak kargomu sekarang.`}
                </p>
                <button className="btn btn-primary" onClick={onBack}>Jelajahi Beranda</button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
              >
                <div className="auth-tabs" role="tablist" aria-label="Pilih masuk atau daftar">
                  {[
                    { id: 'login', label: 'Masuk' },
                    { id: 'register', label: 'Daftar' },
                  ].map((t) => (
                    <button
                      key={t.id} role="tab" aria-selected={mode === t.id}
                      className={`auth-tab${mode === t.id ? ' active' : ''}`}
                      onClick={() => switchMode(t.id)}
                    >
                      {mode === t.id && (
                        <motion.span layoutId="auth-tab-pill" className="tab-pill"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                      )}
                      <span className="tab-label">{t.label}</span>
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.form
                    key={mode}
                    animate={controls}
                    onSubmit={submit}
                    noValidate
                    className="auth-form"
                  >
                    <motion.h2 variants={fieldAnim} initial="hidden" animate="show" custom={0} className="auth-title">
                      {mode === 'login' ? 'Masuk ke akunmu' : 'Buat akun baru'}
                    </motion.h2>
                    <motion.p variants={fieldAnim} initial="hidden" animate="show" custom={1} className="auth-sub">
                      {mode === 'login'
                        ? 'Lacak kargo dan kelola pengiriman dalam satu dashboard.'
                        : 'Gratis — akses jadwal pelayaran dan lacak kargo real-time.'}
                    </motion.p>

                    {mode === 'register' && (
                      <motion.div variants={fieldAnim} initial="hidden" animate="show" custom={2}>
                        <TextInput id="reg-name" label="Nama lengkap" value={name}
                          onChange={setName} error={errors.name} autoComplete="name" />
                      </motion.div>
                    )}

                    <motion.div variants={fieldAnim} initial="hidden" animate="show" custom={mode === 'login' ? 2 : 3}>
                      <TextInput id="email" label="Email" type="email" value={email}
                        onChange={setEmail} error={errors.email} autoComplete="email" />
                    </motion.div>

                    <motion.div variants={fieldAnim} initial="hidden" animate="show" custom={mode === 'login' ? 3 : 4}>
                      <PasswordInput id={mode === 'login' ? 'login-password' : 'reg-password'}
                        label="Kata sandi" value={password} onChange={setPassword} error={errors.password} />
                    </motion.div>

                    {mode === 'register' && (
                      <>
                        <motion.div variants={fieldAnim} initial="hidden" animate="show" custom={5}>
                          <StrengthMeter pw={password} />
                        </motion.div>
                        <motion.div variants={fieldAnim} initial="hidden" animate="show" custom={6}>
                          <PasswordInput id="reg-confirm" label="Konfirmasi kata sandi"
                            value={confirm} onChange={setConfirm} error={errors.confirm} />
                        </motion.div>
                        <motion.div variants={fieldAnim} initial="hidden" animate="show" custom={7}>
                          <label className={`agree${errors.agree ? ' invalid' : ''}`}>
                            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                            <span className="checkbox" aria-hidden="true">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                            Saya setuju dengan <a href="#kontak" onClick={(e) => e.preventDefault()}>Syarat &amp; Ketentuan</a>
                          </label>
                          <AnimatePresence initial={false}>
                            {errors.agree && <motion.p className="field-error" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>{errors.agree}</motion.p>}
                          </AnimatePresence>
                        </motion.div>
                      </>
                    )}

                    {mode === 'login' && (
                      <motion.div variants={fieldAnim} initial="hidden" animate="show" custom={4} className="auth-row">
                        <span />
                        <a href="#kontak" onClick={(e) => e.preventDefault()} className="forgot">Lupa kata sandi?</a>
                      </motion.div>
                    )}

                    <motion.div variants={fieldAnim} initial="hidden" animate="show" custom={mode === 'login' ? 5 : 8}>
                      <motion.button
                        type="submit" className="btn btn-primary auth-submit"
                        disabled={status === 'loading'}
                        whileHover={status === 'loading' ? {} : { scale: 1.02 }}
                        whileTap={status === 'loading' ? {} : { scale: 0.98 }}
                      >
                        {status === 'loading' ? (
                          <span className="btn-loading"><span className="spinner" /> Memproses…</span>
                        ) : mode === 'login' ? 'Masuk' : 'Buat Akun Gratis'}
                      </motion.button>
                    </motion.div>

                    <motion.div variants={fieldAnim} initial="hidden" animate="show" custom={mode === 'login' ? 6 : 9} className="auth-switch">
                      {mode === 'login' ? (
                        <>Belum punya akun? <button type="button" onClick={() => switchMode('register')}>Daftar gratis</button></>
                      ) : (
                        <>Sudah punya akun? <button type="button" onClick={() => switchMode('login')}>Masuk</button></>
                      )}
                    </motion.div>
                  </motion.form>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
