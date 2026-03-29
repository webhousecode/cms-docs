/**
 * Extract headings from markdown/HTML content for table of contents.
 */
export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(content: string): TocHeading[] {
  const headings: TocHeading[] = [];
  // Match markdown headings: ## Title or ### Title
  const regex = /^(#{2,4})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/[`*_~]/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    headings.push({ id, text, level });
  }
  // Also match HTML headings: <h2>Title</h2>
  const htmlRegex = /<h([2-4])[^>]*>(.+?)<\/h\1>/gi;
  while ((match = htmlRegex.exec(content)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]+>/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    // Avoid duplicates (if content has both markdown and rendered HTML)
    if (!headings.find((h) => h.id === id)) {
      headings.push({ id, text, level });
    }
  }
  return headings;
}

/**
 * Add IDs to headings in HTML content for anchor links.
 */
export function addHeadingIds(html: string): string {
  return html.replace(
    /<h([2-4])([^>]*)>(.*?)<\/h\1>/gi,
    (match, level, attrs, text) => {
      const plainText = text.replace(/<[^>]+>/g, "").trim();
      const id = plainText
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      if (attrs.includes("id=")) return match;
      return `<h${level} id="${id}"${attrs}>${text}</h${level}>`;
    }
  );
}
