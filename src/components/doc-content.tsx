import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { codeToHtml } from "shiki";
import { CopyButtonClient } from "./copy-button-client";

/**
 * Renders markdown doc content with Shiki code highlighting.
 * Server component — code highlighting is done at render time.
 */
export async function DocContent({ content }: { content: string }) {
  // Pre-highlight all code blocks
  const codeBlocks = new Map<string, string>();
  const codeRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let match;
  let idx = 0;
  while ((match = codeRegex.exec(content)) !== null) {
    const lang = match[1] || "text";
    const code = match[2].trim();
    try {
      const html = await codeToHtml(code, {
        lang,
        themes: { dark: "github-dark-default", light: "github-light-default" },
      });
      codeBlocks.set(`__CODE_${idx}__`, JSON.stringify({ html, code }));
    } catch {
      // Fallback: no highlighting
      codeBlocks.set(
        `__CODE_${idx}__`,
        JSON.stringify({
          html: `<pre><code>${escapeHtml(code)}</code></pre>`,
          code,
        })
      );
    }
    idx++;
  }

  // Replace code blocks with placeholders, then render markdown
  let processed = content;
  idx = 0;
  processed = processed.replace(codeRegex, () => {
    const placeholder = `__CODE_${idx}__`;
    idx++;
    return placeholder;
  });

  return (
    <div className="doc-content">
      <MarkdownWithCode content={content} codeBlocks={codeBlocks} />
    </div>
  );
}

async function MarkdownWithCode({
  content,
  codeBlocks,
}: {
  content: string;
  codeBlocks: Map<string, string>;
}) {
  // We render the full markdown with custom code rendering
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const isBlock = !!match;

          if (!isBlock) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }

          const lang = match?.[1] || "text";
          const code = String(children).trimEnd();

          return (
            <ServerHighlightedCode lang={lang} code={code} />
          );
        },
        pre({ children }) {
          return <>{children}</>;
        },
        a({ href, children, ...props }) {
          const isExternal = href?.startsWith("http");
          return (
            <a
              href={href}
              {...(isExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              {...props}
            >
              {children}
            </a>
          );
        },
        table({ children }) {
          return (
            <div style={{ overflowX: "auto" }}>
              <table>{children}</table>
            </div>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

async function ServerHighlightedCode({
  lang,
  code,
}: {
  lang: string;
  code: string;
}) {
  let html: string;
  try {
    html = await codeToHtml(code, {
      lang,
      themes: { dark: "github-dark-default", light: "github-light-default" },
    });
  } catch {
    html = `<pre style="padding:1rem;background:var(--code-bg);border-radius:6px;overflow-x:auto"><code>${escapeHtml(code)}</code></pre>`;
  }

  return (
    <div
      style={{
        margin: "1rem 0",
        borderRadius: 8,
        border: "1px solid var(--border)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        style={{
          fontSize: "0.85rem",
          lineHeight: 1.6,
          overflowX: "auto",
        }}
        className="shiki-container"
      />
      <CopyButtonClient code={code} />
    </div>
  );
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
