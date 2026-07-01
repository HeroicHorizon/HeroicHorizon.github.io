// Minimal structured logger for the sync service.
// Emits timestamped, level-tagged lines so GitHub Actions logs are greppable.

const LEVELS = { debug: 10, info: 20, warn: 30, error: 40 };
const threshold = LEVELS[process.env.SYNC_LOG_LEVEL] ?? LEVELS.info;

function emit(level, msg, meta) {
  if (LEVELS[level] < threshold) return;
  const ts = new Date().toISOString();
  const suffix = meta && Object.keys(meta).length ? ' ' + JSON.stringify(meta) : '';
  const line = `[${ts}] ${level.toUpperCase().padEnd(5)} ${msg}${suffix}`;
  (level === 'error' || level === 'warn' ? console.error : console.log)(line);
}

export const logger = {
  debug: (m, meta) => emit('debug', m, meta),
  info: (m, meta) => emit('info', m, meta),
  warn: (m, meta) => emit('warn', m, meta),
  error: (m, meta) => emit('error', m, meta),
};
