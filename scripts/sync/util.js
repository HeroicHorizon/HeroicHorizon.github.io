// Shared helpers for the sync service.

export function nowIso() {
  return new Date().toISOString();
}

// "Jun 2026" style label from an ISO date (or date-only string).
export function formatDateLabel(isoOrDate) {
  if (!isoOrDate) return '';
  const d = new Date(isoOrDate);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Stable subset comparison for the fields we treat as "metadata".
// Returns true when any tracked field differs between two badges.
const TRACKED_FIELDS = [
  'title', 'issuer', 'issuerKey', 'image',
  'verifyUrl', 'publicUrl', 'dateLabel', 'issueDate', 'description',
];

export function metadataChanged(a, b) {
  for (const f of TRACKED_FIELDS) {
    if ((a[f] ?? '') !== (b[f] ?? '')) return true;
  }
  // skills: compare as ordered lists
  const sa = (a.skills || []).join('');
  const sb = (b.skills || []).join('');
  return sa !== sb;
}
