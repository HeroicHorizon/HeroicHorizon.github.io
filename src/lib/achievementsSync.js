// Frontend access to the synced achievements store.
//
// The store is produced by the sync service (scripts/sync) and served statically
// at <base>/achievements.json. "Sync Now" optionally triggers the GitHub Actions
// workflow via workflow_dispatch when a token is configured; otherwise it just
// re-fetches the latest committed store.

const STORE_URL = `${import.meta.env.BASE_URL}achievements.json`;

// Optional config for on-demand triggering (set at build time; leave unset on
// public repos to avoid embedding secrets in the static bundle).
const GH_REPO = import.meta.env.VITE_GH_REPO;            // e.g. "user/portfolio"
const GH_WORKFLOW = import.meta.env.VITE_GH_WORKFLOW || 'sync-credly.yml';
const GH_TOKEN = import.meta.env.VITE_GH_DISPATCH_TOKEN; // fine-grained, actions:write
const GH_BRANCH = import.meta.env.VITE_GH_BRANCH || 'main';

export const canTriggerRemote = Boolean(GH_REPO && GH_TOKEN);

/** Fetch the store, cache-busted so "Sync Now" always sees fresh data. */
export async function fetchStore({ bustCache = false } = {}) {
  const url = bustCache ? `${STORE_URL}?t=${Date.now()}` : STORE_URL;
  const res = await fetch(url, { cache: bustCache ? 'no-store' : 'default' });
  if (!res.ok) throw new Error(`Failed to load achievements (HTTP ${res.status})`);
  return res.json();
}

/**
 * Trigger the sync workflow via the GitHub API (workflow_dispatch).
 * Throws { code: 'not_configured' } when no token is available.
 */
export async function triggerRemoteSync() {
  if (!canTriggerRemote) {
    const err = new Error('Remote trigger not configured');
    err.code = 'not_configured';
    throw err;
  }
  const url = `https://api.github.com/repos/${GH_REPO}/actions/workflows/${GH_WORKFLOW}/dispatches`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${GH_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({ ref: GH_BRANCH }),
  });
  if (!res.ok && res.status !== 204) {
    throw new Error(`Dispatch failed (HTTP ${res.status})`);
  }
  return true;
}

/** Human-friendly "x minutes ago" from an ISO timestamp. */
export function relativeTime(iso) {
  if (!iso) return 'never';
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return 'unknown';
  const diff = Math.max(0, Date.now() - then);
  const s = Math.floor(diff / 1000);
  if (s < 60) return 'just now';
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} min${m === 1 ? '' : 's'} ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hour${h === 1 ? '' : 's'} ago`;
  const d = Math.floor(h / 24);
  return `${d} day${d === 1 ? '' : 's'} ago`;
}

/** Absolute, locale-aware timestamp for tooltips. */
export function absoluteTime(iso) {
  if (!iso) return 'Never synced';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? 'Unknown' : d.toLocaleString();
}
