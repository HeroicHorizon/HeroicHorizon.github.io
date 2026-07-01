// Sync configuration. Add a new object here (and a matching provider module)
// to sync an additional certification provider in the future.
//
// profileUrl may be overridden via the CREDLY_PROFILE_URL env var (used by CI).
export const SYNC_CONFIG = {
  // Where the JSON "database" lives (served statically at /achievements.json).
  storePath: 'public/achievements.json',

  providers: [
    {
      provider: 'credly',
      profileUrl:
        process.env.CREDLY_PROFILE_URL ||
        'https://www.credly.com/users/balaji-dongare.28c183bc',
    },
  ],
};
