import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import StackIcon from 'tech-stack-icons';
import { SiArgo, SiGithubactions } from 'react-icons/si';
import {
  FaShieldAlt, FaCode, FaRobot, FaServer, FaExchangeAlt,
  FaKey, FaUserShield, FaUsers, FaCloud, FaHandshake,
  FaCogs, FaBrain, FaNetworkWired, FaProjectDiagram,
} from 'react-icons/fa';
import { VscTerminalCmd } from 'react-icons/vsc';

/* icon descriptor: { s: 'stackName' } or { I: ReactIconComponent, c: '#color' } */
const DOMAINS = [
  {
    title: 'Golang & Microservices',
    gradient: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
    skills: [
      { name: 'Go (Golang)',               pct: 96, icon: { s: 'go' } },
      { name: 'REST API Design',           pct: 94, icon: { s: 'openapi' } },
      { name: 'Microservices Architecture',pct: 92, icon: { I: FaNetworkWired,    c: '#60a5fa' } },
      { name: 'Open Service Broker',       pct: 82, icon: { I: FaServer,          c: '#60a5fa' } },
      { name: 'System Design',             pct: 90, icon: { I: FaProjectDiagram,  c: '#60a5fa' } },
    ],
  },
  {
    title: 'Identity & Access Management',
    gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    skills: [
      { name: 'IAM Architecture',          pct: 93, icon: { I: FaShieldAlt,   c: '#a78bfa' } },
      { name: 'OAuth2 / OIDC / SSO',       pct: 90, icon: { I: FaKey,         c: '#a78bfa' } },
      { name: 'Saviynt Platform',          pct: 88, icon: { I: FaUserShield,  c: '#a78bfa' } },
      { name: 'RBAC / ABAC / Zero Trust',  pct: 88, icon: { I: FaUserShield,  c: '#a78bfa' } },
      { name: 'CEL (Common Expression Lang)',pct: 82, icon: { I: FaCode,       c: '#a78bfa' } },
    ],
  },
  {
    title: 'Cloud & DevOps',
    gradient: 'linear-gradient(135deg, #10b981, #34d399)',
    skills: [
      { name: 'Kubernetes (CKAD)',          pct: 93, icon: { s: 'kubernetes' } },
      { name: 'AWS (Solutions Architect)',  pct: 90, icon: { s: 'aws' } },
      { name: 'GCP (Cloud Architect)',      pct: 88, icon: { s: 'gcloud' } },
      { name: 'Terraform / Pulumi',         pct: 87, icon: { s: 'terraform' } },
      { name: 'ArgoCD / GitHub Actions',    pct: 86, icon: { I: SiArgo, c: '#ef7b4d' } },
    ],
  },
  {
    title: 'Leadership & Architecture',
    gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
    skills: [
      { name: 'Technical Leadership',      pct: 90, icon: { I: FaUsers,      c: '#fbbf24' } },
      { name: 'Serverless Architecture',   pct: 85, icon: { I: FaCloud,      c: '#fbbf24' } },
      { name: 'Stakeholder Management',    pct: 87, icon: { I: FaHandshake,  c: '#fbbf24' } },
      { name: 'Code Review & Mentoring',   pct: 92, icon: { I: FaCode,       c: '#fbbf24' } },
      { name: 'CI/CD & DevOps Culture',    pct: 88, icon: { I: FaCogs,       c: '#fbbf24' } },
    ],
  },
  {
    title: 'AI Tools & Productivity',
    gradient: 'linear-gradient(135deg, #ec4899, #a78bfa)',
    skills: [
      { name: 'Claude AI (Anthropic)',     pct: 92, icon: { s: 'claude' } },
      { name: 'Cursor AI (AI-first IDE)',  pct: 90, icon: { s: 'cursor' } },
      { name: 'AI-Assisted Code Review',  pct: 88, icon: { I: FaBrain,       c: '#ec4899' } },
      { name: 'Prompt Engineering',       pct: 85, icon: { I: VscTerminalCmd, c: '#ec4899' } },
      { name: 'LLM Integration & APIs',   pct: 82, icon: { I: FaRobot,       c: '#ec4899' } },
    ],
  },
];

/* stackName → uses StackIcon from tech-stack-icons (full-color brand SVG)
   Icon + iconColor → falls back to react-icons (single-color) */
const TECH_STACK = [
  { label: 'Go',              stackName: 'go' },
  { label: 'Kubernetes',      stackName: 'kubernetes' },
  { label: 'Docker',          stackName: 'docker' },
  { label: 'AWS',             stackName: 'aws' },
  { label: 'GCP',             stackName: 'gcloud' },
  { label: 'Terraform',       stackName: 'terraform' },
  { label: 'Pulumi',          stackName: 'pulumi' },
  { label: 'ArgoCD',          Icon: SiArgo,           iconColor: '#ef7b4d' },
  { label: 'MongoDB',         stackName: 'mongodb' },
  { label: 'GitHub Actions',  Icon: SiGithubactions,  iconColor: '#2088ff' },
  { label: 'Elastic',         stackName: 'elastic' },
  { label: 'Svelte',          stackName: 'sveltejs' },
  { label: 'gRPC',            Icon: FaExchangeAlt,    iconColor: '#60a5fa' },
  { label: 'YAML',            stackName: 'yaml' },
  { label: 'OpenAPI',         stackName: 'openapi' },
  { label: 'IAM / Saviynt',   Icon: FaShieldAlt,      iconColor: '#8b5cf6' },
  { label: 'Claude AI',       stackName: 'claude' },
  { label: 'Anthropic',       stackName: 'anthropic' },
  { label: 'Cursor AI',       stackName: 'cursor' },
  { label: 'Prompt Eng.',     Icon: VscTerminalCmd,   iconColor: '#ec4899' },
  { label: 'LLM APIs',        Icon: FaRobot,          iconColor: '#06b6d4' },
  { label: 'Git',             stackName: 'git' },
  { label: 'GitHub',          stackName: 'github' },
  { label: 'CEL',             Icon: FaCode,           iconColor: '#3b82f6' },
];

function SkillIcon({ icon }) {
  if (!icon) return null;
  if (icon.s) {
    return (
      <span style={{ width: '1rem', height: '1rem', display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
        <StackIcon name={icon.s} style={{ width: '100%', height: '100%' }} />
      </span>
    );
  }
  const Ic = icon.I;
  return <Ic style={{ fontSize: '0.85rem', color: icon.c, flexShrink: 0 }} />;
}

function SkillBar({ name, pct, gradient, delay, icon }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} style={{ marginBottom: '0.85rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <SkillIcon icon={icon} />
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{name}</span>
        </div>
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

function TechPill({ label, stackName, Icon, iconColor, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 + delay * 0.04 }}
      whileHover={{ y: -4, scale: 1.06, transition: { duration: 0.15 } }}
      className="glass-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.6rem',
        padding: '1.1rem 0.9rem',
        minWidth: '84px',
        cursor: 'default',
        borderRadius: '14px',
      }}
    >
      {stackName ? (
        <span style={{ width: '2rem', height: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <StackIcon name={stackName} style={{ width: '100%', height: '100%' }} />
        </span>
      ) : (
        <Icon style={{ fontSize: '1.8rem', color: iconColor, flexShrink: 0 }} />
      )}
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.6rem',
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
                <SkillBar
                  key={s.name}
                  name={s.name}
                  pct={s.pct}
                  gradient={d.gradient}
                  delay={di * 0.1 + si * 0.1}
                  icon={s.icon}
                />
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
              <TechPill
                key={t.label}
                label={t.label}
                stackName={t.stackName}
                Icon={t.Icon}
                iconColor={t.iconColor}
                delay={i}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
