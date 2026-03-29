/**
 * Generate Danish translations for all EN docs.
 * Each DA doc shares a translationGroup UUID with its EN counterpart.
 * Run: npx tsx scripts/seed-danish.ts
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";

const CONTENT_DIR = join(__dirname, "..", "content", "docs");

// Simple translation map for titles and key terms
const TITLE_MAP: Record<string, string> = {
  "Introduction": "Introduktion",
  "Quick Start": "Hurtig start",
  "Configuration Reference": "Konfigurationsreference",
  "Field Types": "Felttyper",
  "Storage Adapters": "Lagringsadaptere",
  "Blocks": "Blokke",
  "Next.js Patterns": "Next.js-mønstre",
  "Internationalization (i18n)": "Internationalisering (i18n)",
  "SEO & Visibility": "SEO & Synlighed",
  "Deployment": "Udrulning",
  "CLI Reference": "CLI-reference",
  "Content Structure": "Indholdsstruktur",
  "AI Agents": "AI-agenter",
  "Media Management": "Mediehåndtering",
  "Content API": "Indholds-API",
  "Richtext Editor": "Richtext-editor",
  "Content Relationships": "Indholdsrelationer",
  "Troubleshooting": "Fejlfinding",
  "Interactives": "Interaktive elementer",
};

const DESC_MAP: Record<string, string> = {
  "introduction": "Hvad er @webhouse/cms og hvorfor det eksisterer — et filbaseret, AI-native CMS til TypeScript-projekter.",
  "quick-start": "Opret et nyt projekt og hav en CMS-drevet side kørende på under 5 minutter.",
  "config-reference": "Komplet reference for cms.config.ts — collections, felter, lagring, build og API-indstillinger.",
  "field-types": "Komplet reference for alle 22 felttyper — text, richtext, image, blocks, relation og mere.",
  "storage-adapters": "Vælg hvor dit indhold gemmes — filsystem, GitHub, SQLite eller Supabase.",
  "blocks": "Byg indholdsrige sider med genanvendelige blokkomponenter — hero, features, CTA og brugerdefinerede blokke.",
  "nextjs-patterns": "Sådan læser du CMS-indhold i Next.js — loader-funktioner, sider, statisk generering og metadata.",
  "i18n": "Flersproget indhold med automatisk AI-oversættelse, locale-routing og hreflang.",
  "seo": "Meta-felter, JSON-LD strukturerede data, sitemap, robots.txt og AI-synlighedsoptimering.",
  "deployment": "Deploy din CMS-drevne side til Vercel, Fly.io, Netlify eller Docker.",
  "cli-reference": "Alle CMS CLI-kommandoer — init, dev, build, serve, AI generate, AI rewrite, SEO og MCP.",
  "content-structure": "Hvordan dokumenter gemmes som JSON-filer — dokumentformat, mappestruktur og konventioner.",
  "ai-agents": "Indbyggede AI-agenter til indholdsgenerering, SEO-optimering, GEO-optimering og oversættelse.",
  "media": "Billedbehandling, AI-analyse, gallerier og mediebibliotekets funktioner.",
  "api-reference": "Programmatisk API til læsning og skrivning af indhold — ContentService-metoder og REST-endpoints.",
  "richtext": "TipTap-baseret richtext-editor med indlejret medier, callouts, tabeller, kodeblokke og AI-funktioner.",
  "relationships": "Forbind dokumenter på tværs af collections med relationsfelter — single, multi og reverse lookups.",
  "troubleshooting": "Almindelige problemer og løsninger — GitHub-adapter, indhold vises ikke, portkonflikter, billeder og mere.",
  "interactives": "Datadrevet interaktivt indhold — diagrammer, beregnere, demoer med CMS-styret data.",
};

let count = 0;

const files = readdirSync(CONTENT_DIR).filter(f => f.endsWith(".json"));

for (const file of files) {
  const enDoc = JSON.parse(readFileSync(join(CONTENT_DIR, file), "utf-8"));

  // Skip if already a DA doc
  if (enDoc.locale === "da") continue;

  const daSlug = `${enDoc.slug}-da`;
  const daFile = join(CONTENT_DIR, `${daSlug}.json`);

  const enTitle = enDoc.data.title;
  const daTitle = TITLE_MAP[enTitle] ?? enTitle;
  const daDesc = DESC_MAP[enDoc.slug] ?? enDoc.data.description ?? "";

  const daDoc = {
    id: randomUUID(),
    slug: daSlug,
    status: "published",
    locale: "da",
    translationGroup: enDoc.translationGroup, // Same group as EN
    data: {
      ...enDoc.data,
      title: daTitle,
      description: daDesc,
      // Content stays in English for now — AI translation would be done via CMS admin
      _seo: {
        metaTitle: `${daTitle} — webhouse.app Docs`,
        metaDescription: daDesc,
        keywords: ["webhouse", "cms", "dokumentation", enDoc.data.category ?? ""],
      },
    },
    _fieldMeta: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  writeFileSync(daFile, JSON.stringify(daDoc, null, 2));
  console.log(`  ✓ ${daSlug} (→ ${daTitle})`);
  count++;
}

console.log(`\n✓ ${count} Danish translations created`);
