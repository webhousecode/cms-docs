# Storage Adapters

*Updated: 2026-03-29*
*Language: en*

Choose where your content is stored — filesystem, GitHub, SQLite, or Supabase.

## Choosing a storage adapter

@webhouse/cms supports four storage backends. Each has different trade-offs for performance, collaboration, and deployment.

> **Critical:** You MUST always specify `storage` in `cms.config.ts`. If omitted, it defaults to SQLite — not filesystem. This is the most common configuration mistake.

## Filesystem (recommended)

Stores documents as JSON files in `content//.json`. Best for:
- Static sites with `build.ts`
- Git-based version control
- Local development

```typescript
storage: {
  adapter: 'filesystem',
  filesystem: { contentDir: 'content' },
}
```

## GitHub

Reads and writes files via the GitHub API. Each create/update/delete is a Git commit. Best for:
- Collaborative editing without local Git
- PR-based content review workflows
- Sites hosted on GitHub Pages

```typescript
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
```

## SQLite

Local SQLite database. Best for:
- API-heavy use cases
- When you don't need file-based content
- Prototyping

```typescript
storage: {
  adapter: 'sqlite',
  sqlite: { path: './data/cms.db' },
}
```

## Supabase

Cloud-hosted PostgreSQL with Row Level Security. Best for:
- Multi-user environments
- Cloud-native deployments
- When you need real-time subscriptions

```typescript
storage: {
  adapter: 'supabase',
  supabase: {
    url: process.env.SUPABASE_URL!,
    serviceKey: process.env.SUPABASE_SERVICE_KEY!,
  },
}
```