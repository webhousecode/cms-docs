# Foundation — Initial Development

*Updated: 2026-03-29*
*Language: en*

## Foundation Phase

The initial development period building the core CMS engine, admin UI, and tooling from scratch.

**96 commits** from 2026-03-09 to 2026-03-14

### Features

- feat: AI Lock — field-level content protection + OpenAPI spec
- feat: Add initial documentation and web interface for @cms project
- feat: Add multilingual support with locale handling and hreflang alternates
- feat: Implement scheduled publishing for draft documents and enhance secret management
- feat: Add AI Orchestrator foundation — Phase A+B
- feat: add API routes for link checking, agent management, and brand voice configuration
- feat: implement CMS MCP client and server with AI integration
- feat: Phase C complete — tool-use, MCP client, multi-draft, scheduling, content context
- feat: Admin UI improvements — Generate Article, agent UX, editor fixes, search
- feat: Playwright e2e tests, site search, collections schema API
- feat: add SVG logo for webhouse app and implement agents view toggle component
- feat: branded landing page, /login route, webhouse eye logo
- feat: branding polish — logos, favicon, landing 120% zoom, login redesign
- feat: add @webhouse/create-cms package and .env support in CLI
- feat: landing page example site — schema, content seed, assets
- feat: multi-site foundation — registry, pool, backwards-compat cms.ts
- feat: multi-site API + site switcher UI in header
- feat: restructure settings — Site Settings in sidebar, Account Preferences in user menu
- feat: Sites Dashboard + back-to-sites navigation
- feat: site-paths helper + async upload dir for multi-site scoping
- feat: site cards show page count and collection count
- feat: AI-powered Fix button for broken links in Link Checker
- feat: block editor and structured array editor for CMS admin
- feat: fast site switcher dropdown in admin header
- feat: add "New site" option to site switcher dropdown
- feat: structured object editor + JSON/UI toggle for complex fields
- feat: implement GitHub adapter for multi-site pool
- feat: New Site dialog with GitHub and filesystem adapter support
- feat: GitHub OAuth integration for New Site flow
- feat: add Re-authorize button to GitHub connection in New Site dialog
- feat: create new GitHub repo from New Site dialog
- feat: tab-based New repo / Import existing layout in New Site dialog
- feat: seed new GitHub repos with full project scaffolding
- feat: add new features including block editor, site wizard, and GitHub login
- feat: improved repo scaffolding with proper .gitignore and rich README
- feat: editable site name in Site Settings → General
- feat: add new features including block editor, site wizard, and GitHub login
- feat: add stdio MCP server mode to cms-cli

### Bug Fixes

- fix: Update subproject commit to indicate dirty state
- fix: Translate all new admin UI strings from Danish to English
- fix: Sidebar Content section style, CustomSelect, default agent seeding
- fix: tab corruption on restart + move deploy files into repo
- fix: branded fullscreen login page + tab init corruption fix
- fix: use webhouse.app wordmark in sidebar, theme-aware
- fix: stacked webhouse.app logo in sidebar (eye + wordmark + tagline)
- fix: serve landing page as static HTML, replace ASCII with SVG diagram
- fix: use actual SVG logo files in sidebar and landing page
- fix: reduce hero wordmark size, use css zoom 1.2 for landing
- fix: sign out redirects to landing page instead of login
- fix: remove pnpm version conflict in publish workflow
- fix: exclude private packages from CI build
- fix: add build tools for better-sqlite3 on CI, soft-fail tests
- fix: update import path in next-env.d.ts and modify AI usage label in sidebar
- fix: use NPM_TOKEN secret for publish, add --provenance flag
- fix: pull before push in publish workflow to avoid conflicts
- fix: rename admin browser title to webhouse.app
- fix: remove version from admin footer
- fix: rewrite site switcher to match codepromptmaker org-switcher style
- ... and 20 more fixes

