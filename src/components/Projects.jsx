import { motion } from 'framer-motion';

const PROJECTS = [
  {
    title: 'Multi-Cloud Multi-Platform (MCMP)',
    company: 'GSLab · 2018–2024',
    type: 'Platform Engineering',
    gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    desc: 'Enterprise multi-tenant cloud management platform. Architected core Golang microservices delivering centralized IAM for front-end and service-to-service communication across multiple cloud providers for global MNC clients.',
    highlights: [
      'Multi-tenancy IAM with OAuth2/OIDC front-end and service-to-service auth',
      'Core Go microservices with REST API — built for high availability',
      'DevOps pipelines via ArgoCD & GitHub Actions',
      'Comprehensive API testing framework ensuring reliability',
    ],
    tags: ['Go', 'IAM', 'Kubernetes', 'ArgoCD', 'MongoDB', 'REST API', 'Terraform'],
  },
  {
    title: 'Elastic Connector Ecosystem',
    company: 'EPAM / Elastic · 2024–Present',
    type: 'Integrations · SDK',
    gradient: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
    desc: 'Led Elastic\'s third-party connector program — 100+ integrations for Observability, Security, and Enterprise Search. Built the connector framework, external API, and marketplace certification program from the ground up.',
    highlights: [
      '100+ connectors for Elastic Observability, Security & Enterprise Search',
      'Connector framework standardizing development across all integrations',
      'External API and marketplace certification program',
      'Custom security integrations via CEL and YAML templates',
    ],
    tags: ['Go', 'Elastic', 'CEL', 'YAML', 'REST API', 'SDK'],
  },
  {
    title: 'Co-Lending Application',
    company: 'GSLab · 2022–2023',
    type: 'FinTech · Full Stack',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    desc: 'High-performance co-lending platform connecting banks and NBFCs. Go REST API backend using Open Service Broker pattern, Svelte frontend, and MongoDB — significantly improving loan disbursement speed and partner onboarding.',
    highlights: [
      'Go REST API with Open Service Broker (OSB) specification',
      'Svelte frontend for fast, reactive loan management UI',
      'MongoDB with optimized query patterns for high throughput',
      'Improved loan processing efficiency and partner onboarding',
    ],
    tags: ['Go', 'OSB', 'MongoDB', 'Svelte', 'REST API', 'FinTech'],
  },
  {
    title: 'Enterprise IAM & Identity Federation',
    company: 'GSLab / MCMP · 2018–2024',
    type: 'Security · IAM',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    desc: 'Centralized Identity & Access Management system for enterprise multi-tenant platform. Implemented OAuth2/OIDC flows, RBAC policy engine, and Saviynt integration for identity governance across cloud platforms.',
    highlights: [
      'OAuth2/OIDC auth flows for frontend and service-to-service',
      'RBAC & policy engine for fine-grained multi-tenant access control',
      'Saviynt integration for enterprise identity governance',
      'Audit logging and compliance-ready access review workflows',
    ],
    tags: ['IAM', 'OAuth2', 'OIDC', 'Saviynt', 'RBAC', 'Go', 'Zero Trust'],
  },
];

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '7rem 0', background: 'rgba(15,23,42,0.35)' }}>
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '4rem' }}
        >
          <span className="section-eyebrow">Portfolio</span>
          <h2 className="section-title">
            Key <span className="grad-text">Projects</span>
          </h2>
          <p className="section-desc">
            Enterprise systems built at scale — spanning IAM, cloud platforms, integrations, and FinTech.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.title}
              className="glass-card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.1rem', cursor: 'default' }}
            >
              {/* Gradient top accent */}
              <div style={{ height: '3px', borderRadius: '2px 2px 0 0', background: p.gradient, margin: '-2rem -2rem 0', borderTopLeftRadius: '14px', borderTopRightRadius: '14px' }} />

              {/* Header */}
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono'", fontSize: '0.62rem',
                    padding: '0.2rem 0.6rem', borderRadius: '4px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: '#64748b', letterSpacing: '0.08em',
                  }}>
                    {p.type}
                  </span>
                  <span style={{ fontFamily: "'JetBrains Mono'", fontSize: '0.62rem', color: '#334155' }}>
                    {p.company}
                  </span>
                </div>
                <h3 style={{
                  fontFamily: "'Syne'", fontWeight: 800,
                  fontSize: '1.1rem', color: '#f1f5f9',
                  letterSpacing: '-0.02em', lineHeight: 1.2,
                }}>
                  {p.title}
                </h3>
              </div>

              {/* Description */}
              <p style={{ color: '#475569', fontSize: '0.82rem', lineHeight: 1.8, flex: 1 }}>
                {p.desc}
              </p>

              {/* Highlights */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {p.highlights.map((h, hi) => (
                  <li key={hi} style={{ display: 'flex', gap: '0.5rem', color: '#94a3b8', fontSize: '0.8rem', lineHeight: 1.65, marginBottom: '0.25rem' }}>
                    <span style={{ background: p.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', flexShrink: 0, fontWeight: 700 }}>
                      ›
                    </span>
                    {h}
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                {p.tags.map(t => <span key={t} className="pill">{t}</span>)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{ textAlign: 'center', marginTop: '3.5rem' }}
        >
          <a
            href="https://github.com/balaji-dongare/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <span>⬡</span> View GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}
