import { readFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";

const CONTENT = join(process.cwd(), "content");

export interface DocDocument {
  id: string;
  slug: string;
  status: string;
  data: {
    title: string;
    description?: string;
    content?: string;
    category?: string;
    order?: number;
    helpCardId?: string;
    version?: string;
    date?: string;
    breaking?: boolean;
    _seo?: {
      metaTitle?: string;
      metaDescription?: string;
      keywords?: string[];
      ogImage?: string;
      jsonLd?: unknown;
    };
  };
  _fieldMeta: Record<string, unknown>;
  locale?: string;
  createdAt?: string;
  updatedAt?: string;
}

export function getCollection(name: string): DocDocument[] {
  const dir = join(CONTENT, name);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(join(dir, f), "utf-8")) as DocDocument)
    .filter((d) => d.status === "published");
}

export function getDocument(
  collection: string,
  slug: string
): DocDocument | null {
  const file = join(CONTENT, collection, `${slug}.json`);
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, "utf-8")) as DocDocument;
}

/** Category metadata for sidebar navigation */
export interface Category {
  slug: string;
  label: string;
  order: number;
}

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  "getting-started": { en: "Getting Started", da: "Kom i gang" },
  "guides": { en: "Guides", da: "Guider" },
  "concepts": { en: "Concepts", da: "Koncepter" },
  "config": { en: "Configuration", da: "Konfiguration" },
  "cli": { en: "CLI", da: "CLI" },
  "api-reference": { en: "API Reference", da: "API-reference" },
  "deployment": { en: "Deployment", da: "Udrulning" },
  "tips": { en: "Tips & Tricks", da: "Tips & Tricks" },
};

export function getCategories(locale: string = "en"): Category[] {
  return [
    { slug: "getting-started", label: CATEGORY_LABELS["getting-started"][locale] ?? "Getting Started", order: 0 },
    { slug: "guides", label: CATEGORY_LABELS["guides"][locale] ?? "Guides", order: 1 },
    { slug: "concepts", label: CATEGORY_LABELS["concepts"][locale] ?? "Concepts", order: 2 },
    { slug: "config", label: CATEGORY_LABELS["config"][locale] ?? "Configuration", order: 3 },
    { slug: "cli", label: CATEGORY_LABELS["cli"][locale] ?? "CLI", order: 4 },
    { slug: "api-reference", label: CATEGORY_LABELS["api-reference"][locale] ?? "API Reference", order: 5 },
    { slug: "deployment", label: CATEGORY_LABELS["deployment"][locale] ?? "Deployment", order: 6 },
    { slug: "tips", label: CATEGORY_LABELS["tips"][locale] ?? "Tips & Tricks", order: 7 },
  ];
}

export const CATEGORIES = getCategories("en");

/** Get all docs grouped by category, sorted by order, filtered by locale */
export function getDocsByCategory(locale: string = "en"): Map<
  string,
  { category: Category; docs: DocDocument[] }
> {
  const allDocs = getCollection("docs").filter(
    (d) => (d.locale ?? "en") === locale
  );
  const cats = getCategories(locale);
  const map = new Map<string, { category: Category; docs: DocDocument[] }>();

  for (const cat of cats) {
    const docs = allDocs
      .filter((d) => d.data.category === cat.slug)
      .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
    if (docs.length > 0) {
      map.set(cat.slug, { category: cat, docs });
    }
  }

  return map;
}

/** Get prev/next docs within same category and locale */
export function getPrevNext(doc: DocDocument): {
  prev: DocDocument | null;
  next: DocDocument | null;
} {
  const category = doc.data.category;
  const locale = doc.locale ?? "en";
  if (!category) return { prev: null, next: null };

  const allDocs = getCollection("docs")
    .filter((d) => d.data.category === category && (d.locale ?? "en") === locale)
    .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));

  const idx = allDocs.findIndex((d) => d.slug === doc.slug);
  return {
    prev: idx > 0 ? allDocs[idx - 1] : null,
    next: idx < allDocs.length - 1 ? allDocs[idx + 1] : null,
  };
}

/** Build search index data */
export function getSearchIndex(): {
  slug: string;
  title: string;
  description: string;
  category: string;
  content: string;
}[] {
  const docs = getCollection("docs");
  return docs.map((d) => ({
    slug: d.slug,
    title: d.data.title,
    description: d.data.description ?? "",
    category: d.data.category ?? "",
    content: (d.data.content ?? "")
      .replace(/<[^>]+>/g, " ")
      .replace(/[#*_~`>]/g, "")
      .slice(0, 2000),
  }));
}
