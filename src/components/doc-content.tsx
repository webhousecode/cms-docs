import { codeToHtml } from "shiki";
import { CopyButtonClient } from "./copy-button-client";

/**
 * Renders markdown doc content with Shiki syntax highlighting.
 * Pre-processes all code blocks server-side, then renders as HTML.
 */
export async function DocContent({ content }: { content: string }) {
  const html = await markdownToHtml(content);

  return (
    <div className="doc-content" dangerouslySetInnerHTML={{ __html: html }} />
  );
}

/**
 * Simple markdown → HTML with Shiki code blocks.
 * Processes code fences first, then basic markdown.
 */
async function markdownToHtml(md: string): Promise<string> {
  // Step 1: Extract and highlight code blocks
  const codeRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const codeBlocks: { placeholder: string; html: string }[] = [];
  let idx = 0;

  const withPlaceholders = md.replace(codeRegex, (_match, lang, code) => {
    const placeholder = `___CODE_BLOCK_${idx}___`;
    codeBlocks.push({
      placeholder,
      html: "", // filled in below
    });
    idx++;
    return placeholder;
  });

  // Highlight all code blocks in parallel
  idx = 0;
  const codeMatches = [...md.matchAll(codeRegex)];
  await Promise.all(
    codeMatches.map(async (match, i) => {
      const lang = match[1] || "text";
      const code = match[2].trim();

      let highlighted: string;
      try {
        // Always use dark theme for code blocks — looks better
        highlighted = await codeToHtml(code, {
          lang,
          theme: "vitesse-dark",
        });
        // Strip background-color from Shiki's generated HTML (we set our own)
        highlighted = highlighted
          .replace(/background-color:#[0-9a-fA-F]+;?/g, "")
          .replace(/background:#[0-9a-fA-F]+;?/g, "");
      } catch {
        highlighted = `<pre style="padding:1rem;background:#1a1a2e;border-radius:6px;overflow-x:auto;color:#e5e5e5"><code>${esc(code)}</code></pre>`;
      }

      const isTerminal = ["bash", "sh", "shell", "zsh", "terminal"].includes(lang);
      const dots = `<div class="code-dots"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span></div>`;
      const copyBtn = `<button class="code-copy" data-code="${encodeURIComponent(code)}" aria-label="Copy code"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></button>`;
      const langText = lang !== "text" ? `<span class="code-lang-text">${lang}</span>` : "";
      const titleBar = `<div class="code-titlebar">${dots}${langText}${copyBtn}</div>`;
      const blockClass = isTerminal ? "code-block code-terminal" : "code-block";

      codeBlocks[i].html =
        `<div class="${blockClass}">${titleBar}<div class="code-shiki">${highlighted}</div></div>`;
    })
  );

  // Step 2: Convert markdown to HTML (basic but correct)
  let html = withPlaceholders;

  // Headings with IDs
  html = html.replace(/^#### (.+)$/gm, (_m, t) => {
    const id = slugify(t);
    return `<h4 id="${id}">${inlineMarkdown(t)}</h4>`;
  });
  html = html.replace(/^### (.+)$/gm, (_m, t) => {
    const id = slugify(t);
    return `<h3 id="${id}">${inlineMarkdown(t)}</h3>`;
  });
  html = html.replace(/^## (.+)$/gm, (_m, t) => {
    const id = slugify(t);
    return `<h2 id="${id}">${inlineMarkdown(t)}</h2>`;
  });
  html = html.replace(/^# (.+)$/gm, (_m, t) => `<h1>${inlineMarkdown(t)}</h1>`);

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, "<blockquote><p>$1</p></blockquote>");
  // Merge adjacent blockquotes
  html = html.replace(/<\/blockquote>\n<blockquote>/g, "\n");

  // Tables
  html = html.replace(
    /^\|(.+)\|\n\|[-| :]+\|\n((?:\|.+\|\n?)*)/gm,
    (_match, headerRow, bodyRows) => {
      const headers = headerRow.split("|").map((c: string) => c.trim()).filter(Boolean);
      const rows = bodyRows.trim().split("\n").map((row: string) =>
        row.split("|").map((c: string) => c.trim()).filter(Boolean)
      );
      let table = "<div style=\"overflow-x:auto\"><table><thead><tr>";
      for (const h of headers) table += `<th>${inlineMarkdown(h)}</th>`;
      table += "</tr></thead><tbody>";
      for (const row of rows) {
        table += "<tr>";
        for (const cell of row) table += `<td>${inlineMarkdown(cell)}</td>`;
        table += "</tr>";
      }
      table += "</tbody></table></div>";
      return table;
    }
  );

  // Unordered lists
  html = html.replace(
    /^((?:- .+\n?)+)/gm,
    (_match, block) => {
      const items = block.trim().split("\n").map((l: string) => l.replace(/^- /, ""));
      return "<ul>" + items.map((i: string) => `<li>${inlineMarkdown(i)}</li>`).join("") + "</ul>";
    }
  );

  // Ordered lists
  html = html.replace(
    /^((?:\d+\. .+\n?)+)/gm,
    (_match, block) => {
      const items = block.trim().split("\n").map((l: string) => l.replace(/^\d+\. /, ""));
      return "<ol>" + items.map((i: string) => `<li>${inlineMarkdown(i)}</li>`).join("") + "</ol>";
    }
  );

  // Horizontal rules
  html = html.replace(/^---$/gm, "<hr />");

  // Paragraphs — wrap remaining text lines
  html = html.replace(/^(?!<[a-z/]|___CODE)((?!<).+)$/gm, (line) => {
    if (line.trim() === "") return "";
    return `<p>${inlineMarkdown(line)}</p>`;
  });

  // Restore code blocks
  for (const { placeholder, html: codeHtml } of codeBlocks) {
    html = html.replace(placeholder, codeHtml);
  }

  // Clean up empty lines
  html = html.replace(/\n{3,}/g, "\n\n");

  return html;
}

/** Inline markdown: bold, italic, code, links */
function inlineMarkdown(text: string): string {
  let s = text;
  // Code (before bold/italic to avoid conflicts)
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  // Bold + italic
  s = s.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  // Bold
  s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Italic
  s = s.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // Links
  s = s.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_m, text, href) => {
      const external = href.startsWith("http");
      return external
        ? `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`
        : `<a href="${href}">${text}</a>`;
    }
  );
  return s;
}

function slugify(text: string): string {
  return text
    .replace(/`/g, "")
    .replace(/[*_~]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-æøåü]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
