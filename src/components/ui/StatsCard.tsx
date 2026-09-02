import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  subtitle?: string;
  accentColor?: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  change,
  changeType = "positive",
  subtitle,
  accentColor = "var(--brand-primary)"
}: StatsCardProps) {
  return (
    <div className="card" style={{ position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: accentColor
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.03em" }}>
          {title}
        </span>
        <span style={{ fontSize: "1.6rem", padding: "0.3rem", borderRadius: "var(--radius-md)", background: "var(--bg-main)" }}>
          {icon}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
        <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
          {value}
        </div>
        {change && (
          <span
            style={{
              fontSize: "0.82rem",
              fontWeight: 700,
              color: changeType === "positive" ? "#10b981" : changeType === "negative" ? "#ef4444" : "var(--text-muted)"
            }}
          >
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <div style={{ fontSize: "0.8rem", color: "var(--text-light)", marginTop: "0.4rem" }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}
