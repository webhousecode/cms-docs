# Lagringsadaptere

*Updated: 2026-03-29*
*Language: da*

Vælg hvor dit indhold gemmes — filsystem, GitHub, SQLite eller Supabase.

## Valg af lagringsadapter

@webhouse/cms understøtter fire lagringsbackends. Hver har forskellige afvejninger mht. ydeevne, samarbejde og udrulning.

> **Kritisk:** Du SKAL altid angive `storage` i `cms.config.ts`. Hvis den udelades, bruges SQLite som standard — ikke filsystemet.

## Filsystem (anbefalet)

Gemmer dokumenter som JSON-filer i `content//.json`. Bedst til:
- Statiske sites med `build.ts`
- Git-baseret versionskontrol
- Lokal udvikling

```typescript
storage: {
  adapter: 'filesystem',
  filesystem: { contentDir: 'content' },
}
```

## GitHub

Læser og skriver filer via GitHub API. Hver oprettelse/opdatering/sletning er et Git-commit. Bedst til:
- Samarbejdsredigering uden lokal Git
- PR-baserede indholdsgennemgangsworkflows
- Sites hostet på GitHub Pages

```typescript
storage: {
  adapter: 'github',
  github: {
    owner: 'din-org',
    repo: 'dit-repo',
    branch: 'main',
    contentDir: 'content',
    token: process.env.GITHUB_TOKEN!,
  },
}
```

## SQLite

Lokal SQLite-database. Bedst til:
- API-tunge use cases
- Når du ikke har brug for filbaseret indhold
- Prototyping

## Supabase

Cloud-hostet PostgreSQL med Row Level Security. Bedst til:
- Flerbruger-miljøer
- Cloud-native udrulninger
- Når du har brug for realtids-abonnementer