import { motion } from 'framer-motion';

const LINKS = [
  { label: 'Email', value: 'balaji.dongare08@gmail.com', href: 'mailto:balaji.dongare08@gmail.com', color: '#3b82f6' },
  { label: 'LinkedIn', value: 'linkedin.com/in/balaji-dongare-77168a65', href: 'https://www.linkedin.com/in/balaji-dongare-77168a65', color: '#8b5cf6' },
  { label: 'GitHub', value: 'github.com/balaji-dongare', href: 'https://github.com/balaji-dongare/', color: '#94a3b8' },
  { label: 'Phone', value: '+91 7020053955', href: 'tel:+917020053955', color: '#10b981' },
  { label: 'Location', value: 'Pune 411033, India', href: null, color: '#f59e0b' },
];

const AVAILABILITY = [
  { key: 'Status', val: 'Open to new opportunities', accent: '#10b981' },
  { key: 'Preferred', val: 'Remote · Hybrid · On-site (Pune)', accent: '#94a3b8' },
  { key: 'Roles', val: 'Solutions Architect · Lead Engineer · Principal Eng', accent: '#94a3b8' },
  { key: 'Response', val: 'Within 24 hours', accent: '#94a3b8' },
];

export default function Contact() {
  return (
    <section id="contact" style={{ padding: '7rem 0 5rem' }}>
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem', textAlign: 'center' }}
        >
          <span className="section-eyebrow">Let's Connect</span>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            Ready to Build<br />
            <span className="grad-text">Something Great?</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto', textAlign: 'center' }}>
            I'm open to senior engineering and architecture roles. If you're looking for someone
            to design your next platform or lead a technical team — let's talk.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>

          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="glass-card"
            style={{ padding: '2.5rem' }}
          >
            <h3 style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: '1rem', color: '#f1f5f9', marginBottom: '1.5rem' }}>
              Contact Details
            </h3>
            {LINKS.map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.08 }}
              >
                {l.href ? (
                  <a href={l.href} target={l.href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <ContactRow l={l} />
                  </a>
                ) : (
                  <ContactRow l={l} />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Availability */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            <div className="glass-card" style={{ padding: '2.5rem' }}>
              <h3 style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: '1rem', color: '#f1f5f9', marginBottom: '1.5rem' }}>
                Availability
              </h3>
              {AVAILABILITY.map(({ key, val, accent }) => (
                <div key={key} style={{ display: 'flex', gap: '0.75rem', padding: '0.6rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: "'JetBrains Mono'", fontSize: '0.65rem', color: '#334155', minWidth: '70px', textTransform: 'uppercase', letterSpacing: '0.08em', paddingTop: '2px' }}>{key}</span>
                  <span style={{ fontSize: '0.82rem', color: accent }}>{val}</span>
                </div>
              ))}
            </div>

            {/* CTA card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              style={{
                padding: '2rem',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))',
                border: '1px solid rgba(139,92,246,0.25)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.4rem', marginBottom: '0.5rem', background: 'linear-gradient(135deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                8.9+ Years
              </div>
              <div style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                of production engineering across Go, IAM, Kubernetes, and cloud platforms
              </div>
              <a href="mailto:balaji.dongare08@gmail.com" className="btn-primary" style={{ display: 'inline-flex', fontSize: '0.82rem', padding: '0.65rem 1.5rem' }}>
                Email Me Directly
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        style={{ textAlign: 'center', marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <div style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', marginBottom: '0.4rem', background: 'linear-gradient(135deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Balaji Dongare
        </div>
        <div style={{ fontFamily: "'JetBrains Mono'", fontSize: '0.65rem', color: '#334155', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          Lead Software Engineer · Solutions Architect · Pune, India
        </div>
        <div style={{ fontFamily: "'JetBrains Mono'", fontSize: '0.6rem', color: '#1e293b', marginTop: '0.5rem' }}>
          © 2024 Balaji Dongare · Built with React + Framer Motion
        </div>
      </motion.footer>
    </section>
  );
}

function ContactRow({ l }) {
  return (
    <div style={{
      display: 'flex', gap: '0.75rem', padding: '0.7rem 0',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
      alignItems: 'flex-start',
      transition: 'all 0.2s',
      cursor: 'pointer',
    }}
      onMouseEnter={e => e.currentTarget.style.paddingLeft = '0.4rem'}
      onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}
    >
      <div style={{ width: '3px', height: '36px', borderRadius: '2px', background: l.color, flexShrink: 0, opacity: 0.6 }} />
      <div>
        <div style={{ fontFamily: "'JetBrains Mono'", fontSize: '0.62rem', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.15rem' }}>
          {l.label}
        </div>
        <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{l.value}</div>
      </div>
    </div>
  );
}
