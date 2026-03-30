# Filesystem storage config

*Updated: 2026-03-30*

// ALWAYS specify storage — defaults to SQLite if omitted!
storage: {
  adapter: 'filesystem',
  filesystem: { contentDir: 'content' },
}