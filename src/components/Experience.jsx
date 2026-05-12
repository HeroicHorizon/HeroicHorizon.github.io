import { motion } from 'framer-motion';

const JOBS = [
  {
    period: 'Oct 2024 – Present',
    role: 'Technical Lead',
    company: 'EPAM Systems',
    client: 'Elastic',
    location: 'Pune, India',
    color: '#3b82f6',
    tags: ['Go', 'Elastic', 'CEL', 'REST API', 'Connectors', 'YAML'],
    points: [
      'Led expansion of Elastic\'s third-party connector ecosystem — 100+ integrations across Observability, Security, and Enterprise Search',
      'Architected an external API and certification program supporting Elastic\'s marketplace ecosystem',
      'Transitioned connector program to a scalable offshore India vendor model',
      'Designed custom security integrations using CEL (Common Expression Language) and YAML configuration templates',
      'Mentored engineers, ensured code quality standards, and coordinated delivery across multiple global stakeholders',
    ],
  },
  {
    period: 'Feb 2017 – Sep 2024',
    role: 'Lead Software Engineer',
    company: 'Great Software Laboratory (GSLab)',
    client: 'MCMP · Co-Lending',
    location: 'Pune, India',
    color: '#8b5cf6',
    tags: ['Go', 'IAM', 'Kubernetes', 'MongoDB', 'ArgoCD', 'Terraform', 'Svelte'],
    points: [
      'Designed core Golang microservices for Multi-Cloud Multi-Platform (MCMP) — multi-tenancy & centralized IAM for enterprise MNC clients',
      'Built front-end and service-to-service IAM flows: OAuth2/OIDC, RBAC policies, and Saviynt integration',
      'Led Co-Lending application: Go REST API + Open Service Broker backend, Svelte frontend, MongoDB (improved loan processing efficiency)',
      'Implemented CI/CD pipelines via ArgoCD and GitHub Actions for seamless zero-downtime deployments',
      'Mentored engineers, managed stakeholders, maintained rigorous code review culture',
    ],
  },
  {
    period: 'Dec 2016 – Feb 2017',
    role: 'Full Stack Developer',
    company: 'Persistent Systems',
    client: 'Co-Lending App',
    location: 'Pune, India',
    color: '#10b981',
    tags: ['Java Spring', 'VueJS', 'RabbitMQ', 'Docker', 'AWS', 'Kubernetes', 'Oracle'],
    points: [
      'Built Co-Lending application: VueJS frontend, Java Spring Boot REST API, Oracle Database',
      'Developed RESTful APIs for seamless frontend/backend integration with emphasis on performance',
      'Used RabbitMQ for async processing and Docker for containerized deployment on AWS',
      'Leveraged Kubernetes for scalable, resilient cloud-hosted services',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '7rem 0' }}>
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '4rem' }}
        >
          <span className="section-eyebrow">Career History</span>
          <h2 className="section-title">
            Work <span className="grad-text">Experience</span>
          </h2>
          <p className="section-desc">
            8.9 years across product companies, service firms, and offshore consulting — always shipping at scale.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '0',
            top: '8px',
            bottom: '8px',
            width: '2px',
            background: 'linear-gradient(to bottom, #3b82f6, #8b5cf6, #10b981)',
            borderRadius: '2px',
            marginLeft: '0',
          }} className="timeline-line" />

          <div style={{ paddingLeft: '2.5rem' }} className="timeline-entries">
            {JOBS.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                style={{ marginBottom: '2.5rem', position: 'relative' }}
              >
                {/* Dot */}
                <div style={{
                  position: 'absolute', left: '-2.85rem', top: '1.5rem',
                  width: '14px', height: '14px', borderRadius: '50%',
                  background: job.color,
                  boxShadow: `0 0 14px ${job.color}80`,
                  border: '2px solid #030712',
                }} />

                <div className="glass-card" style={{ padding: '2rem 2.5rem' }}>
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.2rem' }}>
                    <div>
                      <div style={{ fontFamily: "'JetBrains Mono'", fontSize: '0.68rem', color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                        {job.period} · {job.location}
                      </div>
                      <h3 style={{ fontFamily: "'Syne'", fontWeight: 800, fontSize: '1.2rem', color: '#f1f5f9', letterSpacing: '-0.02em', marginBottom: '0.15rem' }}>
                        {job.role}
                      </h3>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.88rem', color: '#94a3b8', fontWeight: 500 }}>{job.company}</span>
                        {job.client && (
                          <>
                            <span style={{ color: '#334155' }}>·</span>
                            <span style={{
                              fontFamily: "'JetBrains Mono'",
                              fontSize: '0.68rem',
                              padding: '0.15rem 0.55rem',
                              borderRadius: '4px',
                              background: `${job.color}18`,
                              border: `1px solid ${job.color}35`,
                              color: job.color,
                            }}>
                              {job.client}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Points */}
                  <ul style={{ listStyle: 'none', margin: '0 0 1.5rem', padding: 0 }}>
                    {job.points.map((p, pi) => (
                      <li key={pi} style={{ display: 'flex', gap: '0.6rem', color: '#64748b', fontSize: '0.85rem', lineHeight: 1.75, marginBottom: '0.35rem' }}>
                        <span style={{ color: job.color, flexShrink: 0, fontWeight: 700, marginTop: '0.05rem' }}>›</span>
                        {p}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {job.tags.map(t => <span key={t} className="pill">{t}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .timeline-line { display: none !important; }
          .timeline-entries { padding-left: 0 !important; }
        }
      `}</style>
    </section>
  );
}
