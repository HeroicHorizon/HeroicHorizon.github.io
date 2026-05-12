import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { value: '8.9+', label: 'Years Experience', icon: '◆' },
  { value: '4', label: 'Cloud Certifications', icon: '★' },
  { value: '100+', label: 'Integrations Built', icon: '⬡' },
  { value: '3', label: 'Enterprise Platforms', icon: '▲' },
];

const CERTS = [
  { code: 'CKAD', name: 'Certified Kubernetes Application Developer', date: 'Jun 2019', color: '#3b82f6' },
  { code: 'AWS SAA', name: 'AWS Certified Solutions Architect – Associate', date: 'Dec 2023', color: '#f59e0b' },
  { code: 'GCP Dev', name: 'GCP Professional Cloud Developer', date: 'Dec 2023', color: '#10b981' },
  { code: 'GCP Arch', name: 'GCP Professional Cloud Architect', date: 'Feb 2024', color: '#8b5cf6' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
});

export default function About() {
  return (
    <section id="about" style={{ padding: '7rem 0' }}>
      <div className="container">

        {/* Header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: '4rem' }}>
          <span className="section-eyebrow">Who I Am</span>
          <h2 className="section-title">
            Engineering Leader &<br />
            <span className="grad-text">Cloud Architect</span>
          </h2>
          <p className="section-desc">
            Based in Pune, India · Driving scalable, secure, and high-impact engineering solutions
            across cloud-native platforms for 8.9+ years.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>

          {/* Bio card */}
          <motion.div {...fadeUp(0.1)} className="glass-card" style={{ padding: '2.5rem' }}>
            <div style={{
              fontFamily: "'Syne'", fontWeight: 700, fontSize: '1.05rem',
              color: '#f1f5f9', marginBottom: '1.25rem',
            }}>
              Professional Summary
            </div>
            <p style={{ color: '#64748b', lineHeight: 1.85, fontSize: '0.9rem', marginBottom: '1.2rem' }}>
              I'm a Lead Software Engineer and aspiring Solutions Architect with deep expertise
              in <span style={{ color: '#a78bfa', fontWeight: 500 }}>Golang microservices</span>,{' '}
              <span style={{ color: '#a78bfa', fontWeight: 500 }}>Identity & Access Management</span>,
              and <span style={{ color: '#a78bfa', fontWeight: 500 }}>multi-cloud platform engineering</span>.
            </p>
            <p style={{ color: '#64748b', lineHeight: 1.85, fontSize: '0.9rem', marginBottom: '1.2rem' }}>
              Currently at <strong style={{ color: '#94a3b8' }}>EPAM Systems</strong> deployed at Elastic,
              I lead development of 100+ third-party connectors for Elastic's Observability,
              Security, and Enterprise Search ecosystem.
            </p>
            <p style={{ color: '#64748b', lineHeight: 1.85, fontSize: '0.9rem' }}>
              Previously at <strong style={{ color: '#94a3b8' }}>Great Software Laboratory (GSLab)</strong>
              , I architected the core IAM microservices for the Multi-Cloud Multi-Platform (MCMP),
              enabling enterprise-grade multi-tenancy for global MNC clients.
            </p>

            {/* Quick info */}
            <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
              {[
                { k: 'Location', v: 'Pune, India · Open to Remote' },
                { k: 'Email', v: 'balaji.dongare08@gmail.com' },
                { k: 'GitHub', v: 'github.com/balaji-dongare' },
                { k: 'Education', v: "B.E CSE · SVERI's COEP, Pandharpur" },
              ].map(({ k, v }) => (
                <div key={k} style={{ display: 'flex', gap: '1rem', padding: '0.55rem 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <span style={{ fontFamily: "'JetBrains Mono'", fontSize: '0.68rem', color: '#334155', minWidth: '78px', textTransform: 'uppercase', letterSpacing: '0.08em', paddingTop: '1px' }}>{k}</span>
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{v}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Stats grid */}
            <motion.div {...fadeUp(0.15)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {STATS.map(s => (
                <div key={s.label} className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <div style={{
                    fontFamily: "'Syne'", fontWeight: 800,
                    fontSize: '2.2rem', lineHeight: 1,
                    background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    marginBottom: '0.4rem',
                  }}>{s.value}</div>
                  <div style={{ fontFamily: "'JetBrains Mono'", fontSize: '0.62rem', color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Certifications */}
            <motion.div {...fadeUp(0.2)} className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: '0.95rem', color: '#f1f5f9', marginBottom: '1.25rem' }}>
                Cloud Certifications
              </div>
              {CERTS.map((cert, i) => (
                <motion.div
                  key={cert.code}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.08 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '0.7rem 0',
                    borderBottom: i < CERTS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  }}
                >
                  <div style={{
                    padding: '0.35rem 0.65rem',
                    borderRadius: '6px',
                    border: `1px solid ${cert.color}40`,
                    background: `${cert.color}0f`,
                    fontFamily: "'JetBrains Mono'",
                    fontSize: '0.62rem', fontWeight: 600,
                    color: cert.color,
                    whiteSpace: 'nowrap', letterSpacing: '0.05em',
                    minWidth: '68px', textAlign: 'center',
                  }}>
                    {cert.code}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.4 }}>{cert.name}</div>
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono'", fontSize: '0.62rem', color: '#334155', whiteSpace: 'nowrap' }}>
                    {cert.date}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
