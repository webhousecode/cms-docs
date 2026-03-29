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

export const CATEGORIES: Category[] = [
  { slug: "getting-started", label: "Getting Started", order: 0 },
  { slug: "guides", label: "Guides", order: 1 },
  { slug: "concepts", label: "Concepts", order: 2 },
  { slug: "config", label: "Configuration", order: 3 },
  { slug: "cli", label: "CLI", order: 4 },
  { slug: "api-reference", label: "API Reference", order: 5 },
  { slug: "deployment", label: "Deployment", order: 6 },
];

/** Get all docs grouped by category, sorted by order */
export function getDocsByCategory(): Map<
  string,
  { category: Category; docs: DocDocument[] }
> {
  const allDocs = getCollection("docs");
  const map = new Map<string, { category: Category; docs: DocDocument[] }>();

  for (const cat of CATEGORIES) {
    const docs = allDocs
      .filter((d) => d.data.category === cat.slug)
      .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
    if (docs.length > 0) {
      map.set(cat.slug, { category: cat, docs });
    }
  }

  return map;
}

/** Get prev/next docs within same category */
export function getPrevNext(doc: DocDocument): {
  prev: DocDocument | null;
  next: DocDocument | null;
} {
  const category = doc.data.category;
  if (!category) return { prev: null, next: null };

  const allDocs = getCollection("docs")
    .filter((d) => d.data.category === category)
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
