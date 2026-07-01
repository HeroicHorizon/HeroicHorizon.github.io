import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';

const LINKS = [
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Achievements', to: 'achievements' },
  { label: 'Experience', to: 'experience' },
  { label: 'Projects', to: 'projects' },
  { label: 'Contact', to: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '0 2rem',
        height: '68px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(3, 7, 18, 0.85)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      {/* Logo */}
      <motion.div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: '1.3rem',
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          cursor: 'default',
        }}
      >
        BD
        <span style={{
          WebkitTextFillColor: 'rgba(255,255,255,0.25)',
          fontWeight: 400,
          fontSize: '1.1rem',
        }}>.</span>
      </motion.div>

      {/* Desktop links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="nav-links">
        {LINKS.map((l, i) => (
          <motion.div
            key={l.to}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i + 0.2 }}
          >
            <Link
              to={l.to} spy smooth offset={-68} duration={500}
              style={{
                display: 'block',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 500,
                color: 'rgba(241,245,249,0.65)',
                padding: '0.4rem 0.9rem',
                cursor: 'pointer',
                textDecoration: 'none',
                borderRadius: '8px',
                transition: 'all 0.2s',
                letterSpacing: '0.01em',
              }}
              activeStyle={{ color: '#a78bfa', background: 'rgba(139,92,246,0.08)' }}
              onMouseEnter={e => { e.target.style.color = '#f1f5f9'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
              onMouseLeave={e => { e.target.style.color = 'rgba(241,245,249,0.65)'; e.target.style.background = 'transparent'; }}
            >
              {l.label}
            </Link>
          </motion.div>
        ))}

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          href="mailto:balaji.dongare08@gmail.com"
          className="btn-primary"
          style={{ marginLeft: '1rem', padding: '0.5rem 1.2rem', fontSize: '0.8rem' }}
        >
          Hire Me
        </motion.a>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(v => !v)}
        className="hamburger"
        style={{
          display: 'none', background: 'none',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px', color: 'var(--text)',
          width: '38px', height: '38px',
          cursor: 'pointer', fontSize: '1.1rem',
          alignItems: 'center', justifyContent: 'center',
        }}
      >
        {open ? '✕' : '☰'}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'absolute', top: '100%', left: 0, right: 0,
              background: 'rgba(3,7,18,0.98)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              padding: '1rem',
              display: 'flex', flexDirection: 'column', gap: '0.25rem',
            }}
          >
            {LINKS.map(l => (
              <Link
                key={l.to} to={l.to} spy smooth offset={-68} duration={500}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "'Inter'", fontSize: '0.9rem', fontWeight: 500,
                  color: 'rgba(241,245,249,0.7)', padding: '0.75rem 1rem',
                  cursor: 'pointer', borderRadius: '8px',
                  transition: 'color 0.2s',
                }}
              >
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}
