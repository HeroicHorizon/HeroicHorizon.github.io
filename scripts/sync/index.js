#!/usr/bin/env node
// Achievements sync orchestrator.
//
// Runs each configured provider, diffs the fetched badges against the stored
// "database", and writes an updated store. Designed to run hourly via GitHub
// Actions (or on-demand via workflow_dispatch / `npm run sync`).
//
// Behavior:
//  - New badges are added (active).
//  - Existing badges are updated when metadata changes.
//  - Duplicate ids are collapsed.
//  - Badges no longer present on the public profile are marked inactive (never deleted).
//  - If a provider fetch fails, previously synced data is retained untouched.
import { fileURLToPath } from 'node:url';
import { logger } from './logger.js';
import { SYNC_CONFIG } from './config.js';
import { loadStore, saveStore, finalizeStore, markSynced } from './store.js';
import { nowIso, metadataChanged } from './util.js';
import { createCredlyProvider } from './providers/credly.js';

// Provider registry — extend this map to add new sources.
const PROVIDERS = {
  credly: createCredlyProvider,
};

// Diff a provider's freshly fetched badges into the store (mutates store.badges).
function reconcile(store, providerId, fetched, counters) {
  const now = nowIso();
  const seen = new Set();
  const index = new Map(store.badges.map((b) => [b.id, b]));

  for (const incoming of fetched) {
    seen.add(incoming.id);
    const existing = index.get(incoming.id);
    if (!existing) {
      const created = {
        ...incoming,
        active: true,
        firstSeen: now,
        lastSeen: now,
        lastUpdated: now,
      };
      store.badges.push(created);
      index.set(incoming.id, created); // guard against duplicates within the same batch
      counters.added++;
      logger.info('badge added', { id: incoming.id, title: incoming.title });
      continue;
    }
    const changed = metadataChanged(existing, incoming);
    Object.assign(existing, incoming); // refresh metadata
    existing.lastSeen = now;
    if (!existing.active) {
      existing.active = true; // reappeared on the profile
      delete existing.deactivatedAt;
    }
    if (changed) {
      existing.lastUpdated = now;
      counters.updated++;
      logger.info('badge updated', { id: existing.id, title: existing.title });
    }
  }

  // Mark this provider's badges that vanished from the profile as inactive.
  for (const b of store.badges) {
    if (b.provider !== providerId) continue;
    if (seen.has(b.id)) continue;
    if (b.active) {
      b.active = false;
      b.deactivatedAt = now;
      counters.deactivated++;
      logger.info('badge marked inactive', { id: b.id, title: b.title });
    }
  }
}

async function run() {
  const storePath = SYNC_CONFIG.storePath;
  const store = await loadStore(storePath);
  const counters = { added: 0, updated: 0, deactivated: 0 };

  let anyOk = false;
  let anyFail = false;

  for (const cfg of SYNC_CONFIG.providers) {
    const factory = PROVIDERS[cfg.provider];
    if (!factory) {
      logger.error('unknown provider, skipping', { provider: cfg.provider });
      anyFail = true;
      continue;
    }
    const provider = factory();
    const prev = store.providers[provider.id] || {};
    logger.info('sync provider start', { provider: provider.id, profileUrl: cfg.profileUrl });

    try {
      const result = await provider.fetchBadges(cfg, { cache: prev.cache });
      if (result.notModified) {
        logger.info('provider unchanged (304)', { provider: provider.id });
      } else {
        reconcile(store, provider.id, result.badges, counters);
      }
      store.providers[provider.id] = {
        status: 'success',
        lastSynced: nowIso(),
        error: null,
        source: result.source,
        cache: result.cache || prev.cache || {},
      };
      anyOk = true;
    } catch (err) {
      // Retain previously synced data; just record the failure and move on.
      logger.error('provider sync failed, retaining previous data', {
        provider: provider.id,
        error: err.message,
      });
      store.providers[provider.id] = {
        ...prev,
        status: 'failed',
        error: err.message,
        lastAttempt: nowIso(),
      };
      anyFail = true;
    }
  }

  Object.assign(store.counts, counters);
  const status = anyOk && anyFail ? 'partial' : anyOk ? 'success' : 'failed';
  markSynced(store, status);
  finalizeStore(store);
  await saveStore(storePath, store);

  logger.info('sync complete', {
    status,
    total: store.counts.total,
    active: store.counts.active,
    inactive: store.counts.inactive,
    ...counters,
  });

  // Non-zero exit only when nothing succeeded, so CI surfaces a hard failure
  // but still commits retained data on partial success.
  if (status === 'failed') process.exitCode = 1;
}

// Run when invoked directly (not when imported).
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  run().catch((err) => {
    logger.error('fatal sync error', { error: err.stack || err.message });
    process.exitCode = 1;
  });
}

export { run, reconcile };
