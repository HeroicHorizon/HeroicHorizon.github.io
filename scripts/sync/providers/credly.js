// Credly provider — fetches publicly visible badges from a public Credly profile.
// No login/OAuth/private access: uses the public `<profile>/badges.json` endpoint only.
import { getJson } from '../http.js';
import { formatDateLabel } from '../util.js';

// Map issuer display names → a key the frontend resolves to a brand logo.
const ISSUER_KEYS = [
  { key: 'gcloud', match: /google cloud/i },
  { key: 'aws', match: /amazon web services|aws/i },
  { key: 'oreilly', match: /o'?reilly/i },
  { key: 'microsoft', match: /microsoft|azure/i },
  { key: 'kubernetes', match: /cloud native computing|cncf|kubernetes/i },
  { key: 'hashicorp', match: /hashicorp/i },
];

function issuerKeyFor(name) {
  const hit = ISSUER_KEYS.find((m) => m.match.test(name || ''));
  return hit ? hit.key : '';
}

// Normalize the issuer display name (some are verbose).
function normalizeIssuerName(name) {
  const map = {
    'Amazon Web Services Training and Certification': 'Amazon Web Services',
  };
  return map[name] || name;
}

function primaryIssuer(template) {
  const ents = template?.issuer?.entities || [];
  const primary = ents.find((e) => e.primary) || ents[0];
  return primary?.entity?.name || 'Unknown Issuer';
}

// Turn a public profile URL into the public badges.json endpoint.
export function toBadgesJsonUrl(profileUrl) {
  const trimmed = String(profileUrl).trim().replace(/\/+$/, '');
  // Accept either .../users/<slug> or .../users/<slug>/badges
  const base = trimmed.replace(/\/badges$/, '');
  return `${base}/badges.json`;
}

function normalizeBadge(raw) {
  const t = raw.badge_template || {};
  const id = raw.id;
  const issuerRaw = primaryIssuer(t);
  const issuer = normalizeIssuerName(issuerRaw);
  const issueDate = raw.issued_at_date || (raw.issued_at ? raw.issued_at.slice(0, 10) : null);
  return {
    id,
    provider: 'credly',
    title: t.name || 'Untitled Badge',
    issuer,
    issuerKey: issuerKeyFor(issuerRaw),
    image: raw.image_url || t.image_url || (t.image && t.image.url) || '',
    // Credential verification URL = the earner's specific, verifiable badge page.
    verifyUrl: `https://www.credly.com/badges/${id}`,
    // Public badge URL = the badge template's public page (falls back to the earner URL).
    publicUrl: t.url || `https://www.credly.com/badges/${id}/public_url`,
    issueDate,
    dateLabel: formatDateLabel(issueDate),
    description: (t.description || '').trim(),
    skills: (t.skills || []).map((s) => s.name).filter(Boolean),
  };
}

export function createCredlyProvider() {
  return {
    id: 'credly',
    name: 'Credly',
    /**
     * @param {{profileUrl:string}} config
     * @param {{cache?:object}} state
     * @returns {Promise<{notModified:boolean, badges?:object[], cache:object, source:string}>}
     */
    async fetchBadges(config, state = {}) {
      const url = toBadgesJsonUrl(config.profileUrl);
      const res = await getJson(url, { cache: state.cache || {} });
      if (res.notModified) {
        return { notModified: true, cache: res.cache, source: url };
      }
      const list = Array.isArray(res.data?.data) ? res.data.data : [];
      const badges = list
        .filter((b) => b && b.id && b.public !== false)
        .map(normalizeBadge);
      return { notModified: false, badges, cache: res.cache, source: url };
    },
  };
}
