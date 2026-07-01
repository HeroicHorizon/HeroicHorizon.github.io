// Read/write the JSON "database" that backs the Achievements section.
// The store is version-controlled and served statically at /achievements.json.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { logger } from './logger.js';
import { nowIso } from './util.js';

export const STORE_VERSION = 1;

export function emptyStore() {
  return {
    version: STORE_VERSION,
    lastSynced: null,
    status: 'never', // never | success | partial | failed
    providers: {},   // id -> { status, lastSynced, error, source, cache }
    counts: { total: 0, active: 0, inactive: 0, added: 0, updated: 0, deactivated: 0 },
    badges: [],
  };
}

export async function loadStore(path) {
  try {
    const raw = await readFile(path, 'utf8');
    const parsed = JSON.parse(raw);
    if (!parsed.badges) return emptyStore();
    return { ...emptyStore(), ...parsed };
  } catch (err) {
    if (err.code === 'ENOENT') {
      logger.info('store not found, starting fresh', { path });
      return emptyStore();
    }
    logger.warn('store unreadable, starting fresh', { path, error: err.message });
    return emptyStore();
  }
}

export async function saveStore(path, store) {
  await mkdir(dirname(path), { recursive: true });
  const serialized = JSON.stringify(store, null, 2) + '\n';
  await writeFile(path, serialized, 'utf8');
  logger.info('store written', { path, badges: store.badges.length });
}

// Sort newest-first and recompute counts. Also dedupes by id (last wins).
export function finalizeStore(store) {
  const byId = new Map();
  for (const b of store.badges) byId.set(b.id, b); // dedupe
  const badges = [...byId.values()].sort((a, b) => {
    const da = a.issueDate || '';
    const db = b.issueDate || '';
    return db.localeCompare(da);
  });
  const active = badges.filter((b) => b.active).length;
  store.badges = badges;
  store.counts.total = badges.length;
  store.counts.active = active;
  store.counts.inactive = badges.length - active;
  return store;
}

export function markSynced(store, status) {
  store.lastSynced = nowIso();
  store.status = status;
  return store;
}
