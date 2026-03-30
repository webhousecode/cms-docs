# GitHub storage config

*Updated: 2026-03-30*

storage: {
  adapter: 'github',
  github: {
    owner: 'your-org',
    repo: 'your-repo',
    branch: 'main',
    contentDir: 'content',
    token: process.env.GITHUB_TOKEN!,
  },
}