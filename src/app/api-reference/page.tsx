"use client";

import { useEffect } from "react";

/**
 * Interactive API Reference — Redoc viewer.
 *
 * Loads the OpenAPI spec from /api/openapi.yaml and renders it with Redoc
 * (CDN bundle, no npm dependency needed). Redoc is chosen over Swagger UI
 * for its clean three-panel layout and better mobile behaviour.
 */
export default function ApiReferencePage() {
  useEffect(() => {
    // Inject Redoc standalone script only once
    if (document.getElementById("redoc-script")) return;
    const script = document.createElement("script");
    script.id = "redoc-script";
    script.src = "https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js";
    script.async = true;
    script.onload = () => {
      (window as any).Redoc.init(
        "/api/openapi-webhouse-cms.yaml",
        {
          theme: {
            colors: {
              primary: { main: "#F7BB2E" },
              text: { primary: "#e5e7eb" },
            },
            typography: {
              fontFamily: "Inter, system-ui, sans-serif",
              headings: { fontFamily: "Inter, system-ui, sans-serif" },
              code: { fontFamily: "\"Geist Mono\", monospace" },
            },
            sidebar: {
              backgroundColor: "#0f0f0f",
              textColor: "#d1d5db",
            },
            rightPanel: {
              backgroundColor: "#111111",
            },
          },
          expandResponses: "200",
          hideDownloadButton: false,
          scrollYOffset: 64,
          nativeScrollbars: true,
        },
        document.getElementById("redoc-container")
      );
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        color: "#e5e7eb",
      }}
    >
      {/* Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          borderBottom: "1px solid #1f1f1f",
          backgroundColor: "#0a0a0a",
          padding: "0.75rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <a href="/" style={{ color: "#F7BB2E", fontWeight: 700, fontSize: "1rem", textDecoration: "none" }}>
            webhouse<span style={{ color: "#e5e7eb" }}>.app</span>
          </a>
          <span style={{ color: "#4b5563" }}>/</span>
          <span style={{ fontSize: "0.875rem", color: "#9ca3af" }}>API Reference</span>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <a
            href="/api/openapi-webhouse-cms.yaml"
            download="openapi-webhouse-cms.yaml"
            style={{
              fontSize: "0.75rem",
              padding: "0.3rem 0.75rem",
              border: "1px solid #374151",
              borderRadius: "6px",
              color: "#9ca3af",
              textDecoration: "none",
            }}
          >
            Download YAML
          </a>
          <a
            href="/docs/headless-api"
            style={{
              fontSize: "0.75rem",
              padding: "0.3rem 0.75rem",
              border: "1px solid #374151",
              borderRadius: "6px",
              color: "#9ca3af",
              textDecoration: "none",
            }}
          >
            Headless guide →
          </a>
        </div>
      </div>

      {/* Redoc mount point */}
      <div id="redoc-container" />
    </div>
  );
}
