// Resilient HTTP client for the sync service.
// - timeout via AbortController
// - retry with exponential backoff + jitter
// - honors 429 / 503 Retry-After
// - conditional requests (ETag / Last-Modified) to avoid unnecessary transfers
import { logger } from './logger.js';
import { sleep } from './util.js';

const DEFAULTS = {
  retries: 4,          // total attempts = retries + 1
  baseDelayMs: 800,    // backoff base
  maxDelayMs: 30_000,
  timeoutMs: 15_000,
  userAgent: 'portfolio-credly-sync/1.0 (+https://github.com)',
};

function backoffDelay(attempt, base, max) {
  const exp = Math.min(max, base * 2 ** attempt);
  const jitter = Math.random() * 0.3 * exp; // up to 30% jitter
  return Math.round(exp + jitter);
}

function retryAfterMs(res) {
  const h = res.headers.get('retry-after');
  if (!h) return null;
  const asInt = Number(h);
  if (!Number.isNaN(asInt)) return asInt * 1000;
  const date = Date.parse(h);
  return Number.isNaN(date) ? null : Math.max(0, date - Date.now());
}

/**
 * GET JSON with retries + conditional caching.
 * @param {string} url
 * @param {object} opts { cache: {etag, lastModified}, ...overrides }
 * @returns {Promise<{notModified:boolean, data?:any, cache:{etag,lastModified}}>}
 */
export async function getJson(url, opts = {}) {
  const cfg = { ...DEFAULTS, ...opts };
  const cache = opts.cache || {};
  let lastErr;

  for (let attempt = 0; attempt <= cfg.retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), cfg.timeoutMs);
    try {
      const headers = {
        Accept: 'application/json',
        'User-Agent': cfg.userAgent,
      };
      if (cache.etag) headers['If-None-Match'] = cache.etag;
      if (cache.lastModified) headers['If-Modified-Since'] = cache.lastModified;

      logger.debug('http GET', { url, attempt });
      const res = await fetch(url, { headers, signal: controller.signal });

      // Not modified — caller keeps existing data, no reprocessing needed.
      if (res.status === 304) {
        logger.info('http 304 not-modified', { url });
        return { notModified: true, cache };
      }

      // Rate limited / temporarily unavailable — back off and retry.
      if (res.status === 429 || res.status === 503) {
        const wait = retryAfterMs(res) ?? backoffDelay(attempt, cfg.baseDelayMs, cfg.maxDelayMs);
        logger.warn('http throttled, backing off', { url, status: res.status, waitMs: wait });
        lastErr = new Error(`HTTP ${res.status}`);
        if (attempt < cfg.retries) { await sleep(wait); continue; }
        throw lastErr;
      }

      if (!res.ok) {
        // 5xx are retryable; 4xx (other than 429) are not.
        lastErr = new Error(`HTTP ${res.status} for ${url}`);
        if (res.status >= 500 && attempt < cfg.retries) {
          const wait = backoffDelay(attempt, cfg.baseDelayMs, cfg.maxDelayMs);
          logger.warn('http server error, retrying', { url, status: res.status, waitMs: wait });
          await sleep(wait);
          continue;
        }
        throw lastErr;
      }

      const data = await res.json();
      return {
        notModified: false,
        data,
        cache: {
          etag: res.headers.get('etag') || null,
          lastModified: res.headers.get('last-modified') || null,
        },
      };
    } catch (err) {
      lastErr = err;
      const transient =
        err.name === 'AbortError' ||
        err.name === 'TypeError' || // network failure in undici
        /HTTP 5\d\d/.test(err.message);
      if (transient && attempt < cfg.retries) {
        const wait = backoffDelay(attempt, cfg.baseDelayMs, cfg.maxDelayMs);
        logger.warn('http request failed, retrying', { url, error: err.message, waitMs: wait });
        await sleep(wait);
        continue;
      }
      throw lastErr;
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastErr || new Error(`Failed to fetch ${url}`);
}
