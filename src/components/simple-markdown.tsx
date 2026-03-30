/**
 * Simple markdown renderer without Shiki — avoids hydration mismatch.
 * Used for changelog entries where code highlighting isn't needed.
 */
export function SimpleMarkdown({ content }: { content: string }) {
  let html = content;

  // Headings
  html = html.replace(/^### (.+)$/gm, (_m, t) => `<h3>${esc(t)}</h3>`);
  html = html.replace(/^## (.+)$/gm, (_m, t) => `<h2>${esc(t)}</h2>`);

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Unordered lists
  html = html.replace(
    /^((?:- .+\n?)+)/gm,
    (_m, block) => {
      const items = block.trim().split("\n").map((l: string) => l.replace(/^- /, ""));
      return "<ul>" + items.map((i: string) => `<li>${i}</li>`).join("") + "</ul>";
    }
  );

  // Paragraphs
  html = html.replace(/^(?!<[a-z/])(.+)$/gm, (line) => {
    if (line.trim() === "") return "";
    return `<p>${line}</p>`;
  });

  // Horizontal rules
  html = html.replace(/^---$/gm, "<hr />");

  return (
    <div
      className="doc-content"
      style={{ fontSize: "0.85rem" }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
