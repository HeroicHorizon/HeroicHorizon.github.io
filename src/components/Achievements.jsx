import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import StackIcon from 'tech-stack-icons';
import { SiOreilly } from 'react-icons/si';
import { FaCertificate } from 'react-icons/fa';
import { FiExternalLink, FiRefreshCw } from 'react-icons/fi';
import SEED from '../data/achievements';
import {
  fetchStore, triggerRemoteSync, canTriggerRemote,
  relativeTime, absoluteTime,
} from '../lib/achievementsSync';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
});

/* Issuer logo: full-color brand SVG where available, tasteful fallback otherwise. */
function IssuerIcon({ issuerKey }) {
  const box = {
    width: '18px', height: '18px', display: 'inline-flex',
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  };
  if (['gcloud', 'aws', 'kubernetes', 'anthropic'].includes(issuerKey)) {
    return <span style={box}><StackIcon name={issuerKey} style={{ width: '100%', height: '100%' }} /></span>;
  }
  if (issuerKey === 'oreilly') {
    return <span style={box}><SiOreilly style={{ fontSize: '16px', color: '#d3002d' }} /></span>;
  }
  return <span style={box}><FaCertificate style={{ fontSize: '14px', color: '#8b5cf6' }} /></span>;
}

/* Graceful image with skeleton + fallback badge glyph. */
function BadgeImage({ src, alt }) {
  const [status, setStatus] = useState('loading');
  return (
    <div style={{
      width: '76px', height: '76px', flexShrink: 0, position: 'relative', borderRadius: '12px',
      background: status === 'ok' ? 'transparent' : 'rgba(255,255,255,0.03)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {status === 'error' || !src ? (
        <FaCertificate style={{ fontSize: '2rem', color: '#334155' }} />
      ) : (
        <img
          src={src} alt={alt} loading="lazy" width={76} height={76} referrerPolicy="no-referrer"
          onLoad={() => setStatus('ok')} onError={() => setStatus('error')}
          style={{
            width: '76px', height: '76px', objectFit: 'contain',
            opacity: status === 'ok' ? 1 : 0, transition: 'opacity 0.3s ease',
          }}
        />
      )}
    </div>
  );
}

const STATUS_STYLES = {
  syncing: { color: '#fbbf24', label: 'Syncing', dot: '#fbbf24' },
  success: { color: '#34d399', label: 'Success', dot: '#34d399' },
  failed: { color: '#f87171', label: 'Failed', dot: '#f87171' },
  partial: { color: '#fbbf24', label: 'Partial', dot: '#fbbf24' },
  never: { color: '#64748b', label: 'Not synced', dot: '#64748b' },
};

function SyncStatusBar({ syncState, store, onSyncNow }) {
  const key = syncState === 'syncing' ? 'syncing' : (store.status || 'never');
  const s = STATUS_STYLES[key] || STATUS_STYLES.never;
  const active = store.counts?.active ?? store.badges?.filter((b) => b.active).length ?? 0;

  return (
    <div style={{
      display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.9rem',
      padding: '0.85rem 1.1rem', marginBottom: '2.5rem', borderRadius: '12px',
      border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(15,23,42,0.5)',
    }}>
      {/* Status pill */}
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
        <motion.span
          animate={syncState === 'syncing' ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
          transition={{ repeat: syncState === 'syncing' ? Infinity : 0, duration: 1 }}
          style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.dot, flexShrink: 0 }}
        />
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', fontWeight: 600,
          color: s.color, letterSpacing: '0.04em', textTransform: 'uppercase',
        }}>
          {s.label}
        </span>
      </span>

      <span style={{ color: '#334155' }}>·</span>

      {/* Last synced */}
      <span
        title={absoluteTime(store.lastSynced)}
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: '#64748b' }}
      >
        Last synced: <span style={{ color: '#94a3b8' }}>{relativeTime(store.lastSynced)}</span>
      </span>

      <span style={{ color: '#334155' }}>·</span>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: '#64748b' }}>
        {active} active
      </span>

      {/* Sync Now */}
      <button
        onClick={onSyncNow}
        disabled={syncState === 'syncing'}
        title={canTriggerRemote ? 'Trigger a sync run now' : 'Refresh from the store — automated sync runs hourly'}
        style={{
          marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', fontWeight: 600,
          color: syncState === 'syncing' ? '#475569' : '#60a5fa',
          padding: '0.4rem 0.85rem', borderRadius: '8px',
          border: '1px solid rgba(96,165,250,0.25)', background: 'rgba(96,165,250,0.06)',
          cursor: syncState === 'syncing' ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => { if (syncState !== 'syncing') { e.currentTarget.style.background = 'rgba(96,165,250,0.14)'; e.currentTarget.style.borderColor = 'rgba(96,165,250,0.5)'; } }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(96,165,250,0.06)'; e.currentTarget.style.borderColor = 'rgba(96,165,250,0.25)'; }}
      >
        <motion.span
          animate={syncState === 'syncing' ? { rotate: 360 } : { rotate: 0 }}
          transition={{ repeat: syncState === 'syncing' ? Infinity : 0, duration: 1, ease: 'linear' }}
          style={{ display: 'inline-flex' }}
        >
          <FiRefreshCw style={{ fontSize: '0.8rem' }} />
        </motion.span>
        {syncState === 'syncing' ? 'Syncing…' : 'Sync Now'}
      </button>
    </div>
  );
}

function AchievementCard({ a, index }) {
  const shownSkills = (a.skills || []).slice(0, 6);
  const extra = (a.skills || []).length - shownSkills.length;
  const credId = a.id || a.credentialId;

  return (
    <motion.div
      {...fadeUp(Math.min(index, 6) * 0.06)}
      className="glass-card"
      whileHover={{ y: -4, transition: { duration: 0.18 } }}
      style={{ padding: '1.6rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}
    >
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <a href={a.publicUrl || a.verifyUrl} target="_blank" rel="noopener noreferrer" style={{ lineHeight: 0 }}>
          <BadgeImage src={a.image} alt={`${a.title} badge`} />
        </a>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.92rem',
            lineHeight: 1.35, color: '#f1f5f9', marginBottom: '0.5rem', letterSpacing: '-0.01em',
          }}>
            {a.title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
            <IssuerIcon issuerKey={a.issuerKey} />
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 500 }}>{a.issuer}</span>
            <span style={{ color: '#334155' }}>·</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: '#475569' }}>
              {a.dateLabel}
            </span>
          </div>
        </div>
      </div>

      {a.description && (
        <p style={{
          fontSize: '0.78rem', color: '#64748b', lineHeight: 1.65, margin: 0,
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {a.description}
        </p>
      )}

      {shownSkills.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {shownSkills.map((sk) => (
            <span key={sk} style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: '#a78bfa',
              letterSpacing: '0.02em', padding: '0.22rem 0.55rem', borderRadius: '6px',
              border: '1px solid rgba(139,92,246,0.22)', background: 'rgba(139,92,246,0.07)', whiteSpace: 'nowrap',
            }}>
              {sk}
            </span>
          ))}
          {extra > 0 && (
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: '#475569', padding: '0.22rem 0.55rem' }}>
              +{extra} more
            </span>
          )}
        </div>
      )}

      <div style={{
        marginTop: 'auto', paddingTop: '0.9rem', borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem',
      }}>
        <span title={`Credential ID: ${credId}`} style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: '#334155',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '52%',
        }}>
          ID: {credId}
        </span>
        <a
          href={a.verifyUrl} target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.66rem', fontWeight: 600,
            color: '#60a5fa', textDecoration: 'none', padding: '0.3rem 0.7rem', borderRadius: '8px',
            border: '1px solid rgba(96,165,250,0.25)', background: 'rgba(96,165,250,0.06)',
            whiteSpace: 'nowrap', transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(96,165,250,0.14)'; e.currentTarget.style.borderColor = 'rgba(96,165,250,0.5)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(96,165,250,0.06)'; e.currentTarget.style.borderColor = 'rgba(96,165,250,0.25)'; }}
        >
          Verify <FiExternalLink style={{ fontSize: '0.7rem' }} />
        </a>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  const [store, setStore] = useState(SEED);
  const [syncState, setSyncState] = useState('idle'); // idle | syncing | success | failed

  // Load the live store on mount. Cache-bust so a freshly-synced badge shows
  // immediately instead of waiting for the browser/CDN cache to expire.
  useEffect(() => {
    let cancelled = false;
    fetchStore({ bustCache: true })
      .then((data) => { if (!cancelled && data?.badges) setStore(data); })
      .catch(() => { /* keep seed */ });
    return () => { cancelled = true; };
  }, []);

  const handleSyncNow = useCallback(async () => {
    setSyncState('syncing');
    // Best-effort remote trigger (no-op when not configured).
    try { await triggerRemoteSync(); } catch (err) { if (err.code !== 'not_configured') { /* non-fatal */ } }
    // Give a dispatched run a head start, then pull the freshest committed store.
    try {
      if (canTriggerRemote) await new Promise((r) => setTimeout(r, 2500));
      const data = await fetchStore({ bustCache: true });
      if (data?.badges) setStore(data);
      setSyncState('success');
    } catch {
      setSyncState('failed');
    }
  }, []);

  const badges = (store.badges || [])
    .filter((b) => b.active !== false)
    .slice()
    .sort((a, b) => (b.issueDate || '').localeCompare(a.issueDate || ''));

  return (
    <section id="achievements" style={{ padding: '7rem 0', background: 'rgba(15,23,42,0.4)' }}>
      <div className="container">

        <motion.div {...fadeUp(0)} style={{ marginBottom: '2rem' }}>
          <span className="section-eyebrow">Verified Credentials</span>
          <h2 className="section-title">
            Badges & <span className="grad-text">Certifications</span>
          </h2>
          <p className="section-desc">
            Auto-synced hourly from my public Credly profile — cloud architecture, AI agent
            development, and Go engineering. Every badge links to its live verification page.
          </p>
        </motion.div>

        <SyncStatusBar syncState={syncState} store={store} onSyncNow={handleSyncNow} />

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
          gap: '1.5rem', alignItems: 'stretch',
        }}>
          {badges.map((a, i) => (
            <AchievementCard key={a.id || a.credentialId} a={a} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
