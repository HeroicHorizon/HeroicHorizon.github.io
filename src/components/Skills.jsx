import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const DOMAINS = [
  {
    title: 'Golang & Microservices',
    gradient: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
    skills: [
      { name: 'Go (Golang)', pct: 96 },
      { name: 'REST API Design', pct: 94 },
      { name: 'Microservices Architecture', pct: 92 },
      { name: 'Open Service Broker', pct: 82 },
      { name: 'System Design', pct: 90 },
    ],
  },
  {
    title: 'Identity & Access Management',
    gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    skills: [
      { name: 'IAM Architecture', pct: 93 },
      { name: 'OAuth2 / OIDC / SSO', pct: 90 },
      { name: 'Saviynt Platform', pct: 88 },
      { name: 'RBAC / ABAC / Zero Trust', pct: 88 },
      { name: 'CEL (Common Expression Lang)', pct: 82 },
    ],
  },
  {
    title: 'Cloud & DevOps',
    gradient: 'linear-gradient(135deg, #10b981, #34d399)',
    skills: [
      { name: 'Kubernetes (CKAD)', pct: 93 },
      { name: 'AWS (Solutions Architect)', pct: 90 },
      { name: 'GCP (Cloud Architect)', pct: 88 },
      { name: 'Terraform / Pulumi', pct: 87 },
      { name: 'ArgoCD / GitHub Actions', pct: 86 },
    ],
  },
  {
    title: 'Leadership & Architecture',
    gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
    skills: [
      { name: 'Technical Leadership', pct: 90 },
      { name: 'Serverless Architecture', pct: 85 },
      { name: 'Stakeholder Management', pct: 87 },
      { name: 'Code Review & Mentoring', pct: 92 },
      { name: 'CI/CD & DevOps Culture', pct: 88 },
    ],
  },
];

const TECH_STACK = [
  'Go', 'Kubernetes', 'Docker', 'AWS', 'GCP', 'Terraform',
  'Pulumi', 'ArgoCD', 'MongoDB', 'Saviynt', 'GitHub Actions',
  'Elastic', 'REST API', 'gRPC', 'CEL', 'Svelte', 'YAML',
];

function SkillBar({ name, pct, gradient, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} style={{ marginBottom: '0.85rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{name}</span>
        <span style={{ fontFamily: "'JetBrains Mono'", fontSize: '0.68rem', color: '#475569' }}>{pct}%</span>
      </div>
      <div style={{ height: '3px', background: 'rgba(255,255,255,0.04)', borderRadius: '2px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: '100%', background: gradient, borderRadius: '2px' }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" style={{ padding: '7rem 0', background: 'rgba(15,23,42,0.4)' }}>
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '4rem' }}
        >
          <span className="section-eyebrow">Capabilities</span>
          <h2 className="section-title">
            Technical <span className="grad-text">Expertise</span>
          </h2>
          <p className="section-desc">
            A deep, battle-tested skill set built across 8.9 years of production engineering.
          </p>
        </motion.div>

        {/* Domain cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {DOMAINS.map((d, di) => (
            <motion.div
              key={d.title}
              className="glass-card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: di * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ padding: '2rem' }}
            >
              {/* Domain title with gradient accent */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '3px', height: '28px', borderRadius: '2px', background: d.gradient, flexShrink: 0 }} />
                <h3 style={{ fontFamily: "'Syne'", fontWeight: 700, fontSize: '0.88rem', color: '#e2e8f0', letterSpacing: '-0.01em' }}>
                  {d.title}
                </h3>
              </div>
              {d.skills.map((s, si) => (
                <SkillBar key={s.name} name={s.name} pct={s.pct} gradient={d.gradient} delay={di * 0.1 + si * 0.1} />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Tech stack tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div style={{
            fontFamily: "'JetBrains Mono'", fontSize: '0.65rem', color: '#334155',
            letterSpacing: '0.15em', textTransform: 'uppercase',
            marginBottom: '1.2rem', textAlign: 'center',
          }}>
            — Full Technology Stack —
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
            {TECH_STACK.map((t, i) => (
              <motion.span
                key={t}
                className="pill"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.04 }}
                whileHover={{ borderColor: 'rgba(139,92,246,0.4)', color: '#a78bfa', transition: { duration: 0.15 } }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
