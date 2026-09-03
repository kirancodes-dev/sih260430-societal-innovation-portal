import React from "react";

interface StatusBadgeProps {
  status: string;
  type?: "status" | "priority";
}

export default function StatusBadge({ status, type = "status" }: StatusBadgeProps) {
  if (type === "priority") {
    const priorityClass = `badge badge-${status.toLowerCase()}`;
    return (
      <span className={priorityClass}>
        <span style={{ fontSize: "0.6rem" }}>●</span> {status} Priority
      </span>
    );
  }

  const normalized = status.toLowerCase().replace("_", "");
  let badgeClass = "badge badge-submitted";
  const label = status.replace("_", " ");

  if (normalized.includes("valid")) badgeClass = "badge badge-validated";
  else if (normalized.includes("assign")) badgeClass = "badge badge-assigned";
  else if (normalized.includes("prog") || normalized.includes("pilot")) badgeClass = "badge badge-inprogress";
  else if (normalized.includes("resolv") || normalized.includes("complete")) badgeClass = "badge badge-resolved";
  else if (normalized.includes("reject")) badgeClass = "badge badge-critical";

  return (
    <span className={badgeClass}>
      <span style={{ fontSize: "0.6rem" }}>●</span> {label}
    </span>
  );
}
