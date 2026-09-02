"use client";

import React from "react";
import Link from "next/link";
import { ChallengeItem, JHARKHAND_DISTRICTS } from "@/lib/constants";
import StatusBadge from "./StatusBadge";
import { useLanguage } from "@/contexts/LanguageContext";

interface ChallengeCardProps {
  challenge: ChallengeItem;
  role?: string;
  onAction?: (action: string, challengeId: string) => void;
}

export default function ChallengeCard({ challenge, role = "citizen", onAction }: ChallengeCardProps) {
  const { t, language } = useLanguage();
  const districtObj = JHARKHAND_DISTRICTS.find(d => d.id === challenge.district);
  const districtName = (language === "hi" && districtObj?.nameHi) ? districtObj.nameHi : (districtObj?.name || challenge.district);

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
      <div>
        {/* Top Header info */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.85rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            <StatusBadge status={challenge.status} />
            <StatusBadge status={challenge.priority} type="priority" />
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--text-light)", fontFamily: "monospace" }}>
            {challenge.id}
          </span>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.6rem", color: "var(--text-main)", lineHeight: 1.35 }}>
          {challenge.title}
        </h3>

        {/* Description snippet */}
        <p style={{
          fontSize: "0.88rem",
          color: "var(--text-muted)",
          marginBottom: "1rem",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden"
        }}>
          {challenge.description}
        </p>

        {/* Thematic Category & Location */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span>📂</span>
            <strong style={{ color: "var(--text-main)" }}>{challenge.category}</strong>
            {challenge.subcategory && <span>› {challenge.subcategory}</span>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span>📍</span>
            <span>{districtName}{challenge.block ? `, ${challenge.block}` : ""}</span>
          </div>
        </div>

        {/* Assigned HEI or Suggested match */}
        {challenge.assignedUniversityName ? (
          <div style={{
            padding: "0.5rem 0.75rem",
            background: "var(--brand-primary-light)",
            borderRadius: "var(--radius-md)",
            fontSize: "0.82rem",
            color: "var(--brand-primary)",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem"
          }}>
            <span>🎓</span>
            <span>{t.assignedTo}: <strong>{challenge.assignedUniversityName}</strong></span>
          </div>
        ) : challenge.aiClassification?.suggestedUniversityIds?.length ? (
          <div style={{
            padding: "0.5rem 0.75rem",
            background: "var(--bg-main)",
            border: "1px dashed var(--border-medium)",
            borderRadius: "var(--radius-md)",
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            marginBottom: "1rem"
          }}>
            🤖 AI Match: <strong>{challenge.aiClassification.suggestedUniversityIds.length} Universities</strong> with relevant R&D labs
          </div>
        ) : null}
      </div>

      {/* Footer Meta & Action */}
      <div style={{
        borderTop: "1px solid var(--border-light)",
        paddingTop: "0.85rem",
        marginTop: "0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.8rem", color: "var(--text-light)" }}>
          <span>▲ {challenge.upvotes}</span>
          <span>👁️ {challenge.views}</span>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          {role === "admin" && (
            <Link href={`/admin/review/${challenge.id}`} className="btn btn-primary btn-sm">
              Review & Assign →
            </Link>
          )}

          {(role === "university" || role === "faculty" || role === "student") && (
            <Link href={`/university/project/${challenge.id}`} className="btn btn-primary btn-sm">
              {challenge.assignedUniversityId ? "Open Workspace →" : "Claim Challenge →"}
            </Link>
          )}

          {role === "industry" && (
            <Link href={`/industry/collaborate/${challenge.id}`} className="btn btn-accent btn-sm">
              Offer Support 🤝
            </Link>
          )}

          {role === "citizen" && (
            <Link href={`/project/${challenge.id}`} className="btn btn-secondary btn-sm">
              View Progress →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
