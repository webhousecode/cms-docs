import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
          fontWeight: 700,
          color: "var(--color-gold)",
          fontFamily: "var(--font-mono)",
          marginBottom: "0.5rem",
        }}
      >
        404
      </h1>
      <p
        style={{
          fontSize: "1.1rem",
          color: "var(--fg-muted)",
          marginBottom: "1.5rem",
        }}
      >
        Page not found
      </p>
      <Link
        href="/docs/introduction"
        style={{
          padding: "0.5rem 1.25rem",
          background: "var(--color-gold)",
          color: "#000",
          borderRadius: 6,
          textDecoration: "none",
          fontWeight: 500,
          fontSize: "0.9rem",
        }}
      >
        Back to docs
      </Link>
    </div>
  );
}
