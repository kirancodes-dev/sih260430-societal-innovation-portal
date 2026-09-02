"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  INITIAL_MOCK_CHALLENGES,
  JHARKHAND_UNIVERSITIES,
  JHARKHAND_DISTRICTS
} from "@/lib/constants";
import StatusBadge from "@/components/ui/StatusBadge";

export default function ChallengeReviewDetailPage() {
  const params = useParams();
  const router = useRouter();
  const challengeId = (params.id as string) || "CH-JH-2026-001";

  const challenge = INITIAL_MOCK_CHALLENGES.find(c => c.id === challengeId) || INITIAL_MOCK_CHALLENGES[0];
  const districtObj = JHARKHAND_DISTRICTS.find(d => d.id === challenge.district);

  const [status, setStatus] = useState(challenge.status);
  const [assignedUniv, setAssignedUniv] = useState(challenge.assignedUniversityId || JHARKHAND_UNIVERSITIES[0].id);
  const [govtRemarks, setGovtRemarks] = useState(
    "High societal urgency. Recommended for immediate allocation to BIT Mesra chemical/environmental research cell under State Innovation Grant."
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      router.push("/admin");
    }, 1200);
  };

  return (
    <div className="container" style={{ padding: "3.5rem 1.5rem", maxWidth: "980px" }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
        <Link href="/admin">← Back to Triage Queue</Link> / <span style={{ color: "var(--text-main)" }}>Review {challenge.id}</span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", fontFamily: "monospace", color: "var(--text-light)" }}>{challenge.id}</span>
            <StatusBadge status={status} />
            <StatusBadge status={challenge.priority} type="priority" />
          </div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-main)", lineHeight: 1.3 }}>
            {challenge.title}
          </h1>
        </div>

        <button onClick={handleSave} className="btn btn-primary">
          {saved ? "✓ Updated & Saved!" : "Save Evaluation Decisions"}
        </button>
      </div>

      <div className="grid-2" style={{ marginBottom: "2rem" }}>
        {/* Submitter & Location Details */}
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>
            📍 Origin & Submitter Profile
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.9rem" }}>
            <div>
              <strong>Submitted By:</strong> {challenge.submittedBy.name} ({challenge.submittedBy.role.toUpperCase()})
            </div>
            <div>
              <strong>Contact:</strong> {challenge.submittedBy.contact || "Not provided"}
            </div>
            <div>
              <strong>District:</strong> {districtObj?.name || challenge.district} ({districtObj?.division} Division)
            </div>
            <div>
              <strong>Block / Panchayat:</strong> {challenge.block || "Headquarters Block"}
            </div>
            <div>
              <strong>Submission Date:</strong> {new Date(challenge.submittedAt).toLocaleDateString("en-IN", { dateStyle: "long" })}
            </div>
          </div>
        </div>

        {/* AI Triage Summary */}
        <div className="card" style={{ background: "var(--bg-main)", border: "1px solid var(--brand-indigo)" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem", color: "var(--brand-indigo)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span>🤖</span> AI Diagnostic & Routing Triage
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.88rem" }}>
            <div>
              <strong>Categorization Confidence:</strong> {((challenge.aiClassification?.confidence || 0.95) * 100).toFixed(0)}%
            </div>
            <div>
              <strong>Societal Impact Score:</strong> {challenge.aiClassification?.impactScore || 92}/100
            </div>
            <div>
              <strong>Key Tags:</strong> {challenge.aiClassification?.thematicTags.join(", ")}
            </div>
            <div>
              <strong>Duplicate Status:</strong> <span style={{ color: "#10b981", fontWeight: 600 }}>✓ Verified Unique (0% conflict)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Problem Description */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem" }}>
          Problem Description & Field Observations
        </h3>
        <p style={{ fontSize: "0.95rem", color: "var(--text-main)", lineHeight: 1.7, whiteSpace: "pre-line" }}>
          {challenge.description}
        </p>
      </div>

      {/* Official Government Allocation Form */}
      <div className="card" style={{ borderTop: "4px solid var(--brand-primary)" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1.25rem" }}>
          🏛️ Institutional Routing & Department Validation
        </h3>

        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Review Status *</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
            >
              <option value="Validated">Validated & Approved</option>
              <option value="Assigned">Assigned to University HEI</option>
              <option value="In_Progress">Active R&D in Progress</option>
              <option value="Pilot_Testing">Pilot Testing on Ground</option>
              <option value="Resolved">Resolved & Closed</option>
              <option value="Rejected">Rejected / Out of Scope</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Assign Lead University (HEI) *</label>
            <select
              className="form-select"
              value={assignedUniv}
              onChange={(e) => setAssignedUniv(e.target.value)}
            >
              {JHARKHAND_UNIVERSITIES.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name} — {u.specializations.slice(0, 2).join(", ")}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Government Department Directives & Grant Notes</label>
          <textarea
            className="form-textarea"
            rows={3}
            value={govtRemarks}
            onChange={(e) => setGovtRemarks(e.target.value)}
            placeholder="Specify any special state grant funding, mentor assignment, or testing site..."
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1.5rem" }}>
          <Link href="/admin" className="btn btn-secondary">
            Cancel
          </Link>
          <button onClick={handleSave} className="btn btn-primary">
            {saved ? "✓ Saving Changes..." : "Confirm & Route to University"}
          </button>
        </div>
      </div>
    </div>
  );
}
