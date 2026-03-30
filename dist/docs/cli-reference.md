# CLI Reference

*Updated: 2026-03-29*
*Language: en*

All CMS CLI commands — init, dev, build, serve, AI generate, AI rewrite, SEO, and MCP.

## Commands

All commands run via `npx cms ` (provided by `@webhouse/cms-cli`).

| Command | Description |
|---------|-------------|
| `cms init [name]` | Scaffold a new CMS project |
| `cms dev [--port 3000]` | Start dev server with hot reload |
| `cms build [--outDir dist]` | Build static site |
| `cms serve [--port 5000] [--dir dist]` | Serve the built static site |
| `cms ai generate  ""` | Generate a new document with AI |
| `cms ai rewrite / ""` | Rewrite existing document |
| `cms ai seo [--status published]` | Run SEO optimization on all documents |
| `cms mcp keygen [--label "key"] [--scopes "read,write"]` | Generate MCP API key |
| `cms mcp test [--endpoint url]` | Test local MCP server |
| `cms mcp status [--endpoint url]` | Check MCP server status |

## AI commands

AI commands require `@webhouse/cms-ai` and an `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` in `.env`.

```bash
# Generate a blog post
npx cms ai generate posts "Write a guide to TypeScript generics"

# Rewrite with instructions
npx cms ai rewrite posts/hello-world "Make it more concise and add code examples"

# SEO optimization across all published content
npx cms ai seo
```

## MCP commands

```bash
# Generate an API key for MCP access
npx cms mcp keygen --label "My App" --scopes "read"

# Test the MCP endpoint
npx cms mcp test --endpoint http://localhost:3000/api/mcp

# Check MCP server status
npx cms mcp status
```