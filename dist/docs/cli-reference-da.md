# CLI-reference

*Updated: 2026-03-29*
*Language: da*

Alle CMS CLI-kommandoer — init, dev, build, serve, AI generate, AI rewrite, SEO og MCP.

## Kommandoer

Alle kommandoer køres via `npx cms ` (leveret af `@webhouse/cms-cli`).

| Kommando | Beskrivelse |
|----------|-------------|
| `cms init [navn]` | Opret et nyt CMS-projekt |
| `cms dev [--port 3000]` | Start udviklingsserver med hot reload |
| `cms build [--outDir dist]` | Byg statisk site |
| `cms serve [--port 5000] [--dir dist]` | Servér det byggede statiske site |
| `cms ai generate  ""` | Generér et nyt dokument med AI |
| `cms ai rewrite / ""` | Omskriv eksisterende dokument |
| `cms ai seo [--status published]` | Kør SEO-optimering på alle dokumenter |
| `cms mcp keygen [--label "nøgle"] [--scopes "read,write"]` | Generér MCP API-nøgle |

## AI-kommandoer

AI-kommandoer kræver `@webhouse/cms-ai` og en `ANTHROPIC_API_KEY` eller `OPENAI_API_KEY` i `.env`.

```bash
# Generér et blogindlæg
npx cms ai generate posts "Skriv en guide til TypeScript generics"

# Omskriv med instruktioner
npx cms ai rewrite posts/hello-world "Gør det mere kortfattet og tilføj kodeeksempler"

# SEO-optimering på tværs af alt publiceret indhold
npx cms ai seo
```