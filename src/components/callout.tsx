import { Info, AlertTriangle, Lightbulb, AlertOctagon } from "lucide-react";
import type { ReactNode } from "react";

const VARIANTS = {
  tip: {
    icon: Lightbulb,
    color: "#4ade80",
    bg: "rgba(74, 222, 128, 0.08)",
    border: "rgba(74, 222, 128, 0.3)",
    label: "Tip",
  },
  info: {
    icon: Info,
    color: "#60a5fa",
    bg: "rgba(96, 165, 250, 0.08)",
    border: "rgba(96, 165, 250, 0.3)",
    label: "Info",
  },
  warning: {
    icon: AlertTriangle,
    color: "#fbbf24",
    bg: "rgba(251, 191, 36, 0.08)",
    border: "rgba(251, 191, 36, 0.3)",
    label: "Warning",
  },
  danger: {
    icon: AlertOctagon,
    color: "#f87171",
    bg: "rgba(248, 113, 113, 0.08)",
    border: "rgba(248, 113, 113, 0.3)",
    label: "Danger",
  },
} as const;

export function Callout({
  variant = "info",
  title,
  children,
}: {
  variant?: keyof typeof VARIANTS;
  title?: string;
  children: ReactNode;
}) {
  const v = VARIANTS[variant];
  const Icon = v.icon;

  return (
    <div
      style={{
        margin: "1rem 0",
        padding: "0.75rem 1rem",
        background: v.bg,
        borderLeft: `3px solid ${v.border}`,
        borderRadius: "0 6px 6px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "0.35rem",
          fontWeight: 600,
          fontSize: "0.85rem",
          color: v.color,
        }}
      >
        <Icon size={16} />
        {title ?? v.label}
      </div>
      <div style={{ fontSize: "0.875rem", color: "var(--fg)", lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  );
}
