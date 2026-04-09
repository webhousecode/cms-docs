/**
 * Extract headings from markdown/HTML content for table of contents.
 */
export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Ensure heading IDs are unique by appending -2, -3, ... to collisions (GitHub-style). */
function uniqueId(baseId: string, seen: Map<string, number>): string {
  const count = seen.get(baseId) ?? 0;
  seen.set(baseId, count + 1);
  return count === 0 ? baseId : `${baseId}-${count + 1}`;
}

export function extractHeadings(content: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const seen = new Map<string, number>();
  // Match markdown headings: ## Title or ### Title
  const regex = /^(#{2,4})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/[`*_~]/g, "").trim();
    const id = uniqueId(slugify(text), seen);
    headings.push({ id, text, level });
  }
  // Also match HTML headings: <h2>Title</h2>
  const htmlRegex = /<h([2-4])[^>]*>(.+?)<\/h\1>/gi;
  while ((match = htmlRegex.exec(content)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]+>/g, "").trim();
    const baseId = slugify(text);
    // Avoid duplicates (if content has both markdown and rendered HTML)
    if (headings.some((h) => h.text === text && h.level === level)) continue;
    const id = uniqueId(baseId, seen);
    headings.push({ id, text, level });
  }
  return headings;
}

/**
 * Add IDs to headings in HTML content for anchor links.
 */
export function addHeadingIds(html: string): string {
  const seen = new Map<string, number>();
  return html.replace(
    /<h([2-4])([^>]*)>(.*?)<\/h\1>/gi,
    (match, level, attrs, text) => {
      if (attrs.includes("id=")) return match;
      const plainText = text.replace(/<[^>]+>/g, "").trim();
      const id = uniqueId(slugify(plainText), seen);
      return `<h${level} id="${id}"${attrs}>${text}</h${level}>`;
    }
  );
}
