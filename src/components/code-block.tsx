import { codeToHtml } from "shiki";

export async function CodeBlock({
  code,
  lang = "typescript",
  filename,
}: {
  code: string;
  lang?: string;
  filename?: string;
}) {
  const html = await codeToHtml(code.trim(), {
    lang,
    themes: {
      dark: "github-dark-default",
      light: "github-light-default",
    },
  });

  return (
    <div
      style={{
        margin: "1rem 0",
        borderRadius: 8,
        border: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      {filename && (
        <div
          style={{
            padding: "0.4rem 0.75rem",
            fontSize: "0.75rem",
            color: "var(--fg-muted)",
            borderBottom: "1px solid var(--border)",
            background: "var(--bg-secondary)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {filename}
        </div>
      )}
      <div
        style={{ position: "relative" }}
        className="code-block-wrapper"
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
        <CopyButton code={code.trim()} />
      </div>
    </div>
  );
}

function CopyButton({ code }: { code: string }) {
  return <CopyButtonClient code={code} />;
}

// Separate client component for copy functionality
import { CopyButtonClient } from "./copy-button-client";
