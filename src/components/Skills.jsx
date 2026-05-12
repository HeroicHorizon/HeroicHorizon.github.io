import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  SiGo, SiKubernetes, SiDocker, SiAmazonwebservices, SiGooglecloud,
  SiTerraform, SiPulumi, SiArgo, SiMongodb, SiGithubactions,
  SiElastic, SiSvelte, SiGrpc, SiYaml, SiAnthropic, SiGit,
} from 'react-icons/si';
import { FaShieldAlt, FaBrain, FaCode, FaRobot, FaServer } from 'react-icons/fa';
import { VscTerminalCmd } from 'react-icons/vsc';

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
  {
    title: 'AI Tools & Productivity',
    gradient: 'linear-gradient(135deg, #ec4899, #a78bfa)',
    skills: [
      { name: 'Claude AI (Anthropic)', pct: 92 },
      { name: 'Cursor AI (AI-first IDE)', pct: 90 },
      { name: 'AI-Assisted Code Review', pct: 88 },
      { name: 'Prompt Engineering', pct: 85 },
      { name: 'LLM Integration & APIs', pct: 82 },
    ],
  },
];

/* Each entry: { label, Icon, color, iconColor } */
const TECH_STACK = [
  { label: 'Go',              Icon: SiGo,                 color: '#00acd7' },
  { label: 'Kubernetes',      Icon: SiKubernetes,         color: '#326ce5' },
  { label: 'Docker',          Icon: SiDocker,             color: '#2496ed' },
  { label: 'AWS',             Icon: SiAmazonwebservices,  color: '#ff9900' },
  { label: 'GCP',             Icon: SiGooglecloud,        color: '#4285f4' },
  { label: 'Terraform',       Icon: SiTerraform,          color: '#7b42bc' },
  { label: 'Pulumi',          Icon: SiPulumi,             color: '#8a3391' },
  { label: 'ArgoCD',          Icon: SiArgo,               color: '#ef7b4d' },
  { label: 'MongoDB',         Icon: SiMongodb,            color: '#47a248' },
  { label: 'GitHub Actions',  Icon: SiGithubactions,      color: '#2088ff' },
  { label: 'Elastic',         Icon: SiElastic,            color: '#f04e98' },
  { label: 'Svelte',          Icon: SiSvelte,             color: '#ff3e00' },
  { label: 'gRPC',            Icon: SiGrpc,               color: '#244c5a' },
  { label: 'YAML',            Icon: SiYaml,               color: '#cb171e' },
  { label: 'IAM / Saviynt',   Icon: FaShieldAlt,          color: '#8b5cf6' },
  { label: 'REST API',        Icon: FaServer,             color: '#64748b' },
  { label: 'Claude AI',       Icon: SiAnthropic,          color: '#d97706' },
  { label: 'Cursor AI',       Icon: FaBrain,              color: '#a78bfa' },
  { label: 'Prompt Eng.',     Icon: VscTerminalCmd,       color: '#ec4899' },
  { label: 'LLM APIs',        Icon: FaRobot,              color: '#06b6d4' },
  { label: 'Git',             Icon: SiGit,                color: '#f05032' },
  { label: 'CEL',             Icon: FaCode,               color: '#3b82f6' },
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

function TechPill({ label, Icon, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 + delay * 0.04 }}
      whileHover={{ y: -3, scale: 1.05, transition: { duration: 0.15 } }}
      className="glass-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '1rem 0.75rem',
        minWidth: '80px',
        cursor: 'default',
        borderRadius: '12px',
      }}
    >
      <Icon style={{ fontSize: '1.6rem', color, flexShrink: 0 }} />
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.62rem',
        color: '#64748b',
        letterSpacing: '0.04em',
        textAlign: 'center',
        lineHeight: 1.3,
      }}>
        {label}
      </span>
    </motion.div>
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

        {/* Domain skill cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: '1.5rem',
          marginBottom: '4rem',
        }}>
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

        {/* Icon tech grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div style={{
            fontFamily: "'JetBrains Mono'", fontSize: '0.65rem', color: '#334155',
            letterSpacing: '0.15em', textTransform: 'uppercase',
            marginBottom: '1.5rem', textAlign: 'center',
          }}>
            — Full Technology Stack —
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'center',
          }}>
            {TECH_STACK.map((t, i) => (
              <TechPill key={t.label} label={t.label} Icon={t.Icon} color={t.color} delay={i} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
