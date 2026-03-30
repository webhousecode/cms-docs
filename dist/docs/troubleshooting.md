# Troubleshooting

*Updated: 2026-03-29*
*Language: en*

Common issues and fixes — GitHub adapter, content not showing, port conflicts, images, and more.

## GitHub adapter: "Bad Token"

**Cause:** OAuth token expired or revoked.

**Fix:**
1. Go to Sites → Settings → reconnect GitHub
2. Use a fine-grained PAT with `contents: read/write` for long-term stability
3. For automation: use a GitHub App installation token

## "Collection Not Found"

**Cause:** Collection name in `cms.config.ts` doesn't match content directory.

**Fix:** Names must be identical:
```
cms.config.ts: defineCollection({ name: 'posts' })
Directory:     content/posts/
```

## Content not showing after save

**Cause:** Next.js static cache — pages built at deploy time aren't regenerated until next build.

**Fix options:**
1. **On-demand revalidation** (recommended) — configure webhook in Site Settings → Revalidation
2. **Time-based revalidation** — add `export const revalidate = 60;` to pages
3. **Rebuild on content change** — Git webhook triggers deployment

## Port already in use

```bash
# Find what's using the port
lsof -ti:3000

# Use a different port
npx cms dev --port 3001
```

## Images not loading in production

**Cause:** Missing `remotePatterns` in `next.config.ts`.

**Fix:**
```typescript
// next.config.ts
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'your-domain.com', pathname: '/uploads/**' },
  ],
}
```

## Supabase: "Could Not Find Table"

**Cause:** PostgREST hasn't refreshed its schema cache.

**Fix:**
1. Restart the Supabase project
2. Verify table exists: `SELECT * FROM information_schema.tables WHERE table_name = 'documents';`
3. Check that the `anon` key has `SELECT` permission

## Storage adapter defaults to SQLite

If you forget to specify `storage` in `cms.config.ts`, it defaults to SQLite. This means:
- Admin UI writes to a SQLite database
- `build.ts` reads from `content/` JSON files
- The two systems are disconnected

**Fix:** Always specify the adapter explicitly:
```typescript
storage: {
  adapter: 'filesystem',
  filesystem: { contentDir: 'content' },
}
```