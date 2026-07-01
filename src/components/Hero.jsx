import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const ROLES = [
  'Lead Software Engineer',
  'Solutions Architect',
  'Golang Specialist',
  'IAM & Cloud Expert',
  'Platform Engineer',
  'DevOps Leader',
];

function useTypingEffect(words, typingSpeed = 75, deletingSpeed = 38, pauseMs = 2000) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState('typing');

  useEffect(() => {
    const word = words[wordIdx % words.length];
    let t;
    if (phase === 'typing') {
      if (displayed.length < word.length)
        t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), typingSpeed);
      else
        t = setTimeout(() => setPhase('deleting'), pauseMs);
    } else {
      if (displayed.length > 0)
        t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deletingSpeed);
      else { setWordIdx(i => i + 1); setPhase('typing'); }
    }
    return () => clearTimeout(t);
  }, [displayed, phase, wordIdx, words, typingSpeed, deletingSpeed, pauseMs]);

  return displayed;
}

const CERTS = ['CKAD', 'AWS SAA', 'GCP Dev', 'GCP Architect'];

export default function Hero() {
  const role = useTypingEffect(ROLES);

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="hero-section"
    >
      {/* ── MIRROR GHOST — left background ── */}
      {/* Flipped, blurred, low-opacity duplicate behind the text */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '60%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        <img
          src="/balaji.jpeg"
          alt=""
          aria-hidden="true"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            transform: 'scaleX(-1)',          /* mirror flip */
            filter: 'blur(28px) brightness(0.18) saturate(0.6)',
            opacity: 0.85,
            display: 'block',
          }}
        />
        {/* Gradient to pull mirror further into bg */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(3,7,18,0.55) 0%, rgba(3,7,18,0.85) 100%)',
        }} />
      </div>

      {/* Ambient blue glow blobs */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-5%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0, filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '-5%', left: '30%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0, filter: 'blur(40px)',
      }} />

      {/* ─── LEFT COLUMN — text ─── */}
      <motion.div
        style={{
          padding: 'clamp(5rem, 10vw, 8rem) clamp(2rem, 5vw, 5rem)',
          position: 'relative', zIndex: 2,
          display: 'flex', flexDirection: 'column',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{ marginBottom: '2rem' }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.35rem 1rem', borderRadius: '100px',
            border: '1px solid rgba(16,185,129,0.35)',
            background: 'rgba(16,185,129,0.08)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.7rem', color: '#34d399',
            letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#10b981', boxShadow: '0 0 8px #10b981',
              animation: 'statusPulse 2s ease-in-out infinite',
              display: 'inline-block',
            }} />
            Open to new opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
            lineHeight: 1.05, letterSpacing: '-0.03em',
            color: '#f1f5f9', marginBottom: '0.25rem',
          }}
        >
          Balaji
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
            lineHeight: 1.05, letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', marginBottom: '1.5rem',
          }}
        >
          Dongare
        </motion.h1>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)',
            color: '#94a3b8', marginBottom: '1.5rem',
            minHeight: '1.6rem', display: 'flex', alignItems: 'center', gap: '0.3rem',
          }}
        >
          <span style={{ color: '#7c3aed' }}>→</span>
          {' '}{role}
          <span style={{
            width: '2px', height: '1em', background: '#8b5cf6',
            display: 'inline-block', verticalAlign: 'text-bottom',
            animation: 'blink 1s step-end infinite',
          }} />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          style={{
            color: '#64748b', fontSize: 'clamp(0.85rem, 1.3vw, 0.95rem)',
            lineHeight: 1.85, marginBottom: '2.5rem', maxWidth: '440px',
          }}
        >
          8.9 years building scalable Golang microservices, enterprise IAM platforms,
          and multi-cloud architectures. Currently Technical Lead at EPAM Systems.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}
        >
          <Link to="projects" spy smooth offset={-68} duration={500}>
            <button className="btn-primary">View My Work</button>
          </Link>
          <Link to="contact" spy smooth offset={-68} duration={500}>
            <button className="btn-ghost">Get In Touch</button>
          </Link>
        </motion.div>

        {/* Cert badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div style={{
            fontFamily: "'JetBrains Mono'", fontSize: '0.65rem',
            color: '#475569', letterSpacing: '0.12em',
            textTransform: 'uppercase', marginBottom: '0.75rem',
          }}>
            Certifications
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {CERTS.map((c, i) => (
              <motion.span
                key={c}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.85 + i * 0.08 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  padding: '0.3rem 0.75rem', borderRadius: '6px',
                  border: '1px solid rgba(245,158,11,0.25)',
                  background: 'rgba(245,158,11,0.06)',
                  fontFamily: "'JetBrains Mono'",
                  fontSize: '0.65rem', color: '#fbbf24', letterSpacing: '0.05em',
                }}
              >
                <span style={{ fontSize: '0.6rem' }}>★</span> {c}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Tech strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          style={{ marginTop: '2.5rem' }}
        >
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '1.2rem' }} />
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {['Go', 'Kubernetes', 'AWS', 'GCP', 'Terraform', 'IAM', 'ArgoCD', 'Docker', 'MongoDB'].map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 + i * 0.06 }}
                style={{
                  fontFamily: "'JetBrains Mono'",
                  fontSize: '0.65rem', color: '#334155',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ─── RIGHT COLUMN — main photo ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        style={{
          position: 'relative',
          height: '100vh',
          overflow: 'hidden',
          zIndex: 1,
        }}
        className="hero-photo-col"
      >
        {/* Photo — mirrored to face left toward the text */}
        <img
          src="/balaji.jpeg"
          alt="Balaji Dongare"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
            transform: 'scaleX(-1)',
            filter: 'brightness(0.9) contrast(1.05) saturate(0.92)',
          }}
        />

        {/* Left edge — main blend into dark bg */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(
            to right,
            #030712 0%,
            rgba(3,7,18,0.9) 12%,
            rgba(3,7,18,0.45) 28%,
            rgba(3,7,18,0.1) 50%,
            transparent 65%
          )`,
          zIndex: 1,
        }} />

        {/* Top fade */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, #030712 0%, rgba(3,7,18,0.3) 12%, transparent 32%)',
          zIndex: 1,
        }} />

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, #030712 0%, rgba(3,7,18,0.5) 18%, transparent 42%)',
          zIndex: 1,
        }} />

        {/* Right edge fade */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to left, #030712 0%, rgba(3,7,18,0.4) 8%, transparent 28%)',
          zIndex: 1,
        }} />

        {/* Violet colour grade */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(59,30,100,0.1)',
          mixBlendMode: 'color', zIndex: 2,
        }} />

        {/* Floating name card — bottom left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          style={{
            position: 'absolute', bottom: '7%', left: '5%', zIndex: 3,
            background: 'rgba(15,23,42,0.75)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '14px', padding: '1rem 1.4rem', minWidth: '200px',
          }}
        >
          <div style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: '1rem', color: '#f1f5f9', marginBottom: '0.2rem' }}>
            Balaji Dongare
          </div>
          <div style={{ fontFamily: "'JetBrains Mono'", fontSize: '0.65rem', color: '#8b5cf6', letterSpacing: '0.05em' }}>
            Lead Engineer · Solutions Architect
          </div>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '0.75rem 0' }} />
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981', display: 'inline-block' }} />
            <span style={{ fontFamily: "'JetBrains Mono'", fontSize: '0.62rem', color: '#64748b' }}>Available · Pune, India</span>
          </div>
        </motion.div>

        {/* 8.9 Years badge — floats in the dark top-right corner, clear of the subject */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            top: '14%', right: '6%',
            zIndex: 4,
            background: 'rgba(3,7,18,0.55)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(139,92,246,0.35)',
            borderRadius: '20px',
            padding: '1.5rem 2rem',
            textAlign: 'center',
            boxShadow: '0 8px 40px rgba(139,92,246,0.25), 0 0 0 1px rgba(99,102,241,0.15)',
          }}
        >
          <div style={{
            fontFamily: "'Syne'", fontWeight: 900, fontSize: '3.8rem',
            background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', lineHeight: 1, letterSpacing: '-0.03em',
          }}>
            8.9<span style={{ fontSize: '1.8rem' }}>+</span>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono'", fontSize: '0.65rem', color: '#64748b', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '0.4rem' }}>
            Years Exp.
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes statusPulse {
          0%, 100% { box-shadow: 0 0 8px #10b981; }
          50% { box-shadow: 0 0 16px #10b981, 0 0 32px rgba(16,185,129,0.4); }
        }
        @media (max-width: 1024px) {
          .hero-section { grid-template-columns: 1fr !important; }
          .hero-photo-col { display: none !important; }
        }
      `}</style>
    </section>
  );
}
