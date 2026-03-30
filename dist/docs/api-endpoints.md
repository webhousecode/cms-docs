# API Endpoints Reference

*Updated: 2026-03-29*
*Language: en*

Complete reference of all 136 REST API endpoints in the CMS admin.

## Overview

The CMS admin exposes **136 API endpoints** across 4 categories. All endpoints under `/api/cms/`, `/api/admin/`, and `/api/media/` require authentication via session cookie or API key.

## Admin API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET, POST | `/api/admin/ai-config` |  |
| GET, POST | `/api/admin/analytics` | GET /api/admin/analytics |
| GET, POST | `/api/admin/backups` |  |
| GET, POST, DELETE | `/api/admin/backups/:id` |  |
| GET, POST | `/api/admin/deploy` |  |
| GET | `/api/admin/deploy/can-deploy` |  |
| POST | `/api/admin/email-test` |  |
| POST | `/api/admin/github-service-token` | POST /api/admin/github-service-token |
| GET, POST | `/api/admin/invitations` |  |
| DELETE | `/api/admin/invitations/:id` |  |
| POST | `/api/admin/invitations/accept` |  |
| GET | `/api/admin/invitations/validate` |  |
| GET, POST | `/api/admin/mcp-config` |  |
| GET | `/api/admin/my-sites` |  |
| GET, POST | `/api/admin/org-settings` |  |
| GET | `/api/admin/probe-url` | GET /api/admin/probe-url?url= |
| GET, POST | `/api/admin/profile` |  |
| GET | `/api/admin/scheduler-events` |  |
| GET | `/api/admin/scheduler-stream` |  |
| POST | `/api/admin/scheduler-test` |  |
| GET | `/api/admin/seo` | GET /api/admin/seo |
| GET | `/api/admin/seo/export` | GET /api/admin/seo/export?format=csv|json |
| GET, POST | `/api/admin/seo/keywords` | GET /api/admin/seo/keywords |
| POST | `/api/admin/seo/og-image` | POST /api/admin/seo/og-image |
| POST | `/api/admin/seo/optimize-bulk` | POST /api/admin/seo/optimize-bulk |
| GET, POST, PATCH | `/api/admin/site-config` |  |
| GET | `/api/admin/site-health` |  |
| POST | `/api/admin/translate-bulk` | POST /api/admin/translate-bulk |
| GET, POST, PATCH | `/api/admin/user-state` |  |
| GET | `/api/admin/users` |  |
| PATCH, DELETE | `/api/admin/users/:id` |  |
| GET | `/api/admin/users/available` | GET /api/admin/users/available |
| POST | `/api/mcp/admin/message` |  |

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/github` | GET /api/auth/github — Redirect to GitHub OAuth authorize page. |
| GET | `/api/auth/github/callback` | GET /api/auth/github/callback — Exchange OAuth code for access token. |
| POST | `/api/auth/login` |  |
| POST | `/api/auth/logout` |  |
| GET | `/api/auth/me` |  |
| GET, POST | `/api/auth/setup` |  |

## Content API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET, POST | `/api/check-links` | POST /api/check-links |
| POST | `/api/check-links/apply-fix` |  |
| POST | `/api/check-links/fix` |  |
| GET | `/api/check-links/last` |  |
| GET, POST | `/api/cms/:collection` |  |
| GET, POST, PATCH, DELETE | `/api/cms/:collection/:slug` |  |
| GET | `/api/cms/:collection/:slug/revisions` |  |
| POST | `/api/cms/:collection/:slug/revisions/:index` | POST /api/cms/{collection}/{slug}/revisions/{index}/restore |
| POST | `/api/cms/:collection/:slug/translate` |  |
| GET, POST | `/api/cms/agents` |  |
| GET, PUT, DELETE | `/api/cms/agents/:id` |  |
| POST | `/api/cms/agents/:id/clone` |  |
| POST | `/api/cms/agents/:id/run` |  |
| POST | `/api/cms/agents/create-from-description` |  |
| POST | `/api/cms/agents/generate-prompt` |  |
| POST | `/api/cms/ai/chat` |  |
| POST | `/api/cms/ai/generate` |  |
| POST | `/api/cms/ai/htmldoc` |  |
| GET, PUT | `/api/cms/ai/prompts` |  |
| POST | `/api/cms/ai/proofread` |  |
| POST | `/api/cms/ai/rewrite` |  |
| GET, POST | `/api/cms/brand-voice` |  |
| POST | `/api/cms/brand-voice/chat` |  |
| POST | `/api/cms/brand-voice/translate` |  |
| PATCH | `/api/cms/brand-voice/versions/:id` |  |
| POST | `/api/cms/chat` |  |
| GET, POST | `/api/cms/chat/conversations` |  |
| GET, DELETE | `/api/cms/chat/conversations/:id` |  |
| GET | `/api/cms/chat/export` |  |
| POST | `/api/cms/chat/import` |  |
| GET, POST | `/api/cms/chat/memory` |  |
| PATCH, DELETE | `/api/cms/chat/memory/:id` |  |
| GET | `/api/cms/chat/memory/export` |  |
| POST | `/api/cms/chat/memory/extract` |  |
| POST | `/api/cms/chat/memory/import` |  |
| GET | `/api/cms/chat/memory/search` |  |
| GET | `/api/cms/collections` |  |
| GET | `/api/cms/collections/:name/schema` |  |
| GET, POST | `/api/cms/command` |  |
| POST | `/api/cms/command/sync` |  |
| GET | `/api/cms/curation` |  |
| GET, PATCH | `/api/cms/curation/:id` |  |
| POST | `/api/cms/curation/:id/approve` |  |
| POST | `/api/cms/curation/:id/reject` |  |
| GET, POST | `/api/cms/folder-picker` | POST /api/cms/folder-picker |
| GET | `/api/cms/heartbeat` | GET /api/cms/heartbeat |
| GET, POST, PUT, DELETE | `/api/cms/mcp-servers` |  |
| GET, POST, PUT, DELETE | `/api/cms/registry` |  |
| POST | `/api/cms/registry/import` | POST /api/cms/registry/import |
| POST | `/api/cms/registry/move-site` |  |
| POST | `/api/cms/registry/rename` |  |
| GET | `/api/cms/registry/stats` |  |
| POST | `/api/cms/registry/validate` | POST /api/cms/registry/validate |
| GET, POST | `/api/cms/revalidation` | GET /api/cms/revalidation — get revalidation settings + recent log for active site |
| GET | `/api/cms/scheduled` |  |
| GET | `/api/cms/scheduled/calendar.ics` | GET /api/cms/scheduled/calendar.ics?token=&org=&site= |
| GET | `/api/cms/schema-drift` | GET /api/cms/schema-drift |
| POST | `/api/cms/schema-drift/fix` | POST /api/cms/schema-drift/fix |
| POST | `/api/extract-text` | POST /api/extract-text |
| GET, POST, DELETE | `/api/github` | GET /api/github?action=status|orgs|repos&org=... |
| GET, POST | `/api/interactives` |  |
| GET, PUT, DELETE | `/api/interactives/:id` |  |
| GET | `/api/interactives/:id/preview` |  |
| POST | `/api/interactives/:id/translate` | POST /api/interactives/[id]/translate |
| GET | `/api/internal-links` | GET /api/internal-links?q=query |
| GET | `/api/mcp` |  |
| GET | `/api/mcp/admin` |  |
| GET | `/api/mcp/info` |  |
| POST | `/api/mcp/message` |  |
| GET | `/api/media` |  |
| POST | `/api/preview-build` | POST /api/preview-build |
| POST | `/api/preview-serve` | Starts (or reuses) a lightweight static file server for the active site's dist/ directory. |
| GET | `/api/preview-site-root` | Serve dist/index.html for the root path of the preview site. |
| GET | `/api/preview-site/:...path` | Serve static files from the active site's dist/ directory. |
| POST | `/api/publish-scheduled` | POST /api/publish-scheduled |
| GET | `/api/schema` |  |
| PUT, DELETE | `/api/schema/:collection` |  |
| GET, POST | `/api/schema/collections` |  |
| GET | `/api/search` | GET /api/search?q=query |
| GET | `/api/site-file/:...path` | Serve static files from the site's public/ directory or proxy from previewUrl. |
| GET, DELETE | `/api/trash` |  |
| POST | `/api/upload` |  |
| GET | `/api/uploads/:...path` |  |

## Media API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cms/media/usage` | GET /api/cms/media/usage |
| DELETE | `/api/media/:...path` |  |
| GET | `/api/media/ai-analyzed` |  |
| GET | `/api/media/ai-meta` |  |
| POST | `/api/media/analyze` |  |
| POST | `/api/media/analyze-batch` |  |
| POST | `/api/media/analyze-test` |  |
| GET | `/api/media/exif` | GET /api/media/exif?file=/uploads/IMG_0051.jpeg |
| POST | `/api/media/optimize-batch` | POST /api/media/optimize-batch — Generate WebP variants for all images in uploads/ |
| POST | `/api/media/rename` | POST /api/media/rename |
| POST | `/api/media/restore` |  |
| POST | `/api/media/rotate` | POST /api/media/rotate |
| GET, PATCH | `/api/media/tags` |  |
| GET | `/api/media/video-thumb` | GET /api/media/video-thumb?file=/uploads/VIDEO.MOV |

## Authentication

All protected endpoints require one of:
- **Session cookie** — set after login via `POST /api/auth/login`
- **API key** — passed in `Authorization: Bearer ` header

Public endpoints: `/api/auth/login`, `/api/auth/setup`, `/api/auth/me`

## Rate Limits

No rate limits are enforced in the self-hosted CMS admin. The API is designed for single-tenant use.

## Content Push Webhook

When content is saved, the CMS can push updates to your site via webhook:

```json
{
  "event": "content.revalidate",
  "collection": "posts",
  "slug": "hello-world",
  "action": "published",
  "document": { "id": "...", "slug": "...", "data": { ... } },
  "paths": ["/blog/hello-world", "/blog"]
}
```

Header `X-CMS-Signature: sha256=` is computed using your shared secret.