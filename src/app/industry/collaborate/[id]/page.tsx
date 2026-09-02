"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { INITIAL_MOCK_CHALLENGES, SAMPLE_INDUSTRY_PARTNERS } from "@/lib/constants";
import StatusBadge from "@/components/ui/StatusBadge";
import { useNotifications } from "@/contexts/NotificationContext";

export default function IndustryCollaborationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addNotification } = useNotifications();

  const challengeId = (params.id as string) || "CH-JH-2026-001";
  const challenge = INITIAL_MOCK_CHALLENGES.find(c => c.id === challengeId) || INITIAL_MOCK_CHALLENGES[0];

  const [partnerType, setPartnerType] = useState("Corporate CSR Grant & Technical Mentorship");
  const [fundingPledgeLakhs, setFundingPledgeLakhs] = useState("25");
  const [mentorshipHours, setMentorshipHours] = useState("40");
  const [mentorName, setMentorName] = useState("Dr. R. K. Verma (Chief Environmental Scientist)");
  const [facilitiesOffered, setFacilitiesOffered] = useState("Materials Spectrometry Testing Lab & Field Pilot Site");
  const [pilotSupport, setPilotSupport] = useState(
    "Tata Steel CSR will provide direct field test sites across Mahuadanr panchayat, deploy senior chemical engineers as co-mentors, and fund tooling fabrication."
  );
  const [ipTerms, setIpTerms] = useState("Co-patenting with BIT Mesra; Open-access licensing to Govt of Jharkhand for public healthcare & rural water distribution.");
  const [eSignName, setESignName] = useState("Ananya Sengupta (VP Innovation & CSR)");
  const [showMouPreview, setShowMouPreview] = useState(false);
  const [committed, setCommitted] = useState(false);

  const handleCommit = (e: React.FormEvent) => {
    e.preventDefault();
    setCommitted(true);
    addNotification({
      type: "industry_interest",
      title: "Industry CSR Partnership Committed",
      body: `Tata Steel CSR pledged ₹${fundingPledgeLakhs} Lakhs and ${mentorshipHours} mentorship hours for Project ${challenge.id}.`,
      targetRole: "university"
    });
    setTimeout(() => {
      router.push("/industry");
    }, 2000);
  };

  return (
    <div className="container" style={{ padding: "3.5rem 1.5rem", maxWidth: "980px" }}>
      <div style={{ marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
        <Link href="/industry">← Back to Industry Hub</Link> / <span style={{ color: "var(--text-main)" }}>Partner on {challenge.id}</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "0.8rem", fontFamily: "monospace", color: "var(--brand-primary)", fontWeight: 700 }}>
            {challenge.id}
          </span>
          <StatusBadge status={challenge.status} />
          <StatusBadge status={challenge.priority} type="priority" />
        </div>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-main)", lineHeight: 1.3 }}>
          {challenge.title}
        </h1>
        <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>
          Assigned Academic R&D: <strong>{challenge.assignedUniversityName || "Birla Institute of Technology (BIT) Mesra"}</strong> • District: <strong>{challenge.district.toUpperCase()}</strong>
        </div>
      </div>

      {/* Overview Card */}
      <div className="card" style={{ marginBottom: "2rem", background: "var(--bg-main)" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          Problem Summary & Target Societal Impact
        </h3>
        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
          {challenge.description}
        </p>
      </div>

      {/* Partnership Proposal Form */}
      <div className="card shadow-md" style={{ borderTop: "4px solid var(--brand-accent)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-main)" }}>
            🤝 Tripartite Collaboration & Resource Contribution Commitment
          </h3>
          <button
            type="button"
            onClick={() => setShowMouPreview(!showMouPreview)}
            className="btn btn-secondary btn-sm"
          >
            {showMouPreview ? "Hide Digital MoU Preview" : "📄 View Digital Tripartite MoU"}
          </button>
        </div>

        {/* Digital MoU Preview Box */}
        {showMouPreview && (
          <div style={{
            padding: "1.5rem",
            background: "var(--bg-card)",
            border: "2px dashed var(--border-medium)",
            borderRadius: "var(--radius-md)",
            marginBottom: "1.5rem",
            fontSize: "0.85rem",
            lineHeight: 1.6
          }}>
            <div style={{ textAlign: "center", borderBottom: "1px solid var(--border-medium)", paddingBottom: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ fontWeight: 800, fontSize: "1rem", color: "var(--brand-primary)" }}>
                MEMORANDUM OF UNDERSTANDING (TRIPARTITE MoU)
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Under the Jharkhand Societal Innovation Collaboration Framework (NEP 2020)
              </div>
            </div>

            <p><strong>PARTY 1 (Originating Community / PRI):</strong> {challenge.submittedBy.name} ({challenge.district.toUpperCase()})</p>
            <p><strong>PARTY 2 (Lead Academic Institution):</strong> {challenge.assignedUniversityName || "BIT Mesra"}</p>
            <p><strong>PARTY 3 (Corporate / CSR Sponsor):</strong> Tata Steel CSR & Innovation Hub</p>
            <p><strong>PROJECT ID:</strong> {challenge.id} — <em>{challenge.title}</em></p>
            <p><strong>RESOURCE CONTRIBUTION:</strong> ₹{fundingPledgeLakhs} Lakhs Grant + {mentorshipHours} Engineering Mentorship Hours + {facilitiesOffered}</p>
            <p><strong>IP & LICENSING TERMS:</strong> {ipTerms}</p>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid var(--border-light)", fontSize: "0.78rem" }}>
              <div>[Signed electronically by Mukhiya / PRI]</div>
              <div>[Signed electronically by Dean R&D]</div>
              <div style={{ color: "var(--brand-primary)", fontWeight: 700 }}>[✓ e-Signed: {eSignName}]</div>
            </div>
          </div>
        )}

        <form onSubmit={handleCommit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <div>
            <label className="form-label" style={{ fontWeight: 700 }}>Collaboration Mode *</label>
            <select
              className="form-select"
              value={partnerType}
              onChange={(e) => setPartnerType(e.target.value)}
            >
              <option value="Corporate CSR Grant & Technical Mentorship">Corporate CSR Grant & Technical Mentorship</option>
              <option value="Startup Co-Development & Commercialization">Startup Co-Development & Commercialization</option>
              <option value="MSME Prototyping & Fabrication Partner">MSME Prototyping & Fabrication Partner</option>
              <option value="Pilot Testing Ground & Community Handover">Pilot Testing Ground & Community Handover</option>
            </select>
          </div>

          <div className="grid-3" style={{ gap: "1rem" }}>
            <div>
              <label className="form-label" style={{ fontWeight: 700 }}>CSR Grant / Seed Pledge (₹ in Lakhs) *</label>
              <input
                type="number"
                required
                className="form-input"
                value={fundingPledgeLakhs}
                onChange={(e) => setFundingPledgeLakhs(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label" style={{ fontWeight: 700 }}>Mentorship Hours Committed *</label>
              <input
                type="number"
                required
                className="form-input"
                value={mentorshipHours}
                onChange={(e) => setMentorshipHours(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label" style={{ fontWeight: 700 }}>Designated Corporate Mentor</label>
              <input
                type="text"
                required
                className="form-input"
                value={mentorName}
                onChange={(e) => setMentorName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="form-label" style={{ fontWeight: 700 }}>Testing Facilities & Pilot Grounds Offered</label>
            <input
              type="text"
              className="form-input"
              value={facilitiesOffered}
              onChange={(e) => setFacilitiesOffered(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label" style={{ fontWeight: 700 }}>Pilot Deployment Support Description</label>
            <textarea
              rows={3}
              className="form-textarea"
              value={pilotSupport}
              onChange={(e) => setPilotSupport(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label" style={{ fontWeight: 700 }}>Intellectual Property (IP) Sharing & Licensing Terms</label>
            <textarea
              rows={2}
              className="form-textarea"
              value={ipTerms}
              onChange={(e) => setIpTerms(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label" style={{ fontWeight: 700 }}>Authorized Signatory (Digital Signature)</label>
            <input
              type="text"
              required
              className="form-input"
              value={eSignName}
              onChange={(e) => setESignName(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "0.5rem" }}>
            <button
              type="submit"
              disabled={committed}
              className="btn btn-accent btn-lg"
            >
              {committed ? "✓ Tripartite MoU Signed & Committed!" : "✍️ e-Sign MoU & Commit CSR Funding"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
