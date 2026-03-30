# Fejlfinding

*Updated: 2026-03-29*
*Language: da*

Almindelige problemer og løsninger — GitHub-adapter, indhold vises ikke, portkonflikter, billeder og mere.

## GitHub-adapter: "Bad Token"

**Årsag:** OAuth-token er udløbet eller tilbagekaldt.

**Løsning:** Gå til Sites → Indstillinger → genforbind GitHub. Brug en finkornet PAT med `contents: read/write`.

## "Collection Not Found"

**Årsag:** Collection-navn i `cms.config.ts` matcher ikke indholdsmappe.

**Løsning:** Navne skal være identiske:
```
cms.config.ts: defineCollection({ name: 'posts' })
Mappe:         content/posts/
```

## Indhold vises ikke efter gem

**Årsag:** Next.js statisk cache — sider bygget ved deploy-tid genopbygges ikke.

**Løsninger:**
1. **On-demand revalidering** (anbefalet) — konfigurér webhook
2. **Tidsbaseret revalidering** — `export const revalidate = 60;`
3. **Genbyg ved indholdsændring** — Git webhook trigger

## Port allerede i brug

```bash
lsof -ti:3000          # Find hvad der bruger porten
npx cms dev --port 3001 # Brug en anden port
```

## Billeder indlæses ikke i produktion

**Løsning:** Tilføj billeddomænet til `next.config.ts`:
```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'dit-domæne.dk', pathname: '/uploads/**' },
  ],
}
```

## Lagringsadapter default til SQLite

Hvis du glemmer at angive `storage`, bruges SQLite. Admin-UI skriver til database, `build.ts` læser fra JSON-filer — de to systemer er afkoblet.