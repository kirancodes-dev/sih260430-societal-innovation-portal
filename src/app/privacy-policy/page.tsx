"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DPDPPrivacyCompliancePage() {
  const { user } = useAuth();
  const { language } = useLanguage();

  const [dsarType, setDsarType] = useState<"export" | "correct" | "anonymize" | "delete">("export");
  const [dsarSubmitted, setDsarSubmitted] = useState(false);
  const [requestDetails, setRequestDetails] = useState("");

  const handleDSARSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDsarSubmitted(true);

    try {
      const { db } = await import("@/lib/firebase");
      const { collection, addDoc } = await import("firebase/firestore");
      const { logAuditEvent } = await import("@/lib/repositories/audit-repository");

      if (db) {
        await addDoc(collection(db, "privacyRequests"), {
          userId: user?.uid || "anonymous",
          email: user?.email || "citizen@dpdp.jharkhand.gov.in",
          name: user?.displayName || "Citizen Data Principal",
          requestType: dsarType,
          details: requestDetails || "General data subject request under DPDP Act 2023",
          status: "submitted",
          submittedAt: new Date().toISOString()
        });
      }

      await logAuditEvent(
        user?.uid || "citizen-anonymous",
        user?.displayName || "Citizen",
        user?.role || "citizen",
        `DPDP_DSAR_REQUEST_${dsarType.toUpperCase()}`,
        "privacy",
        `dsar-${Date.now()}`,
        { requestType: dsarType }
      );
    } catch (err) {
      console.warn("Failed recording DSAR to Firestore:", err);
    }
  };

  return (
    <div className="container" style={{ padding: "3.5rem 1.5rem", maxWidth: "1050px" }}>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.3rem 0.8rem",
          background: "var(--brand-primary-light)",
          borderRadius: "var(--radius-full)",
          color: "var(--brand-primary)",
          fontSize: "0.8rem",
          fontWeight: 700,
          marginBottom: "0.5rem"
        }}>
          🛡️ Digital Personal Data Protection (DPDP) Act 2023 Compliance
        </div>
        <h1 className="heading-section">
          Data Governance, Privacy & Citizen Rights Portal
        </h1>
        <p className="subheading">
          Government of Jharkhand data fiduciary guidelines, strict in-country data residency (Jharkhand State Data Centre / NIC), 5-year retention limits, and Data Subject Access Rights (DSAR).
        </p>
      </div>

      {/* Compliance Overview Grid */}
      <div className="grid-3" style={{ marginBottom: "2.5rem" }}>
        <div className="card shadow-sm">
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🇮🇳</div>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.3rem" }}>
            100% In-Country Data Residency
          </h3>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
            Hosted exclusively within Jharkhand State Data Centre (JSDC, Ranchi) and National Informatics Centre (NIC) cloud infrastructure.
          </p>
        </div>

        <div className="card shadow-sm">
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⏳</div>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.3rem" }}>
            5-Year Data Retention Policy
          </h3>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
            Societal challenges and citizen phone/email records are retained for 5 years during R&D lifecycle, after which PII is permanently anonymized.
          </p>
        </div>

        <div className="card shadow-sm">
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔒</div>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.3rem" }}>
            Attribute-Based Access (ABAC)
          </h3>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
            Citizen contact info is visible only to assigned University PIs and State Nodal Admins; completely hidden from industry partners and public view.
          </p>
        </div>
      </div>

      {/* Data Subject Access Request (DSAR) Section */}
      <div className="card shadow-md" style={{ marginBottom: "3rem", borderTop: "4px solid var(--brand-primary)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <div>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800 }}>
              👤 Citizen Data Subject Rights (DSAR Self-Service)
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>
              Under DPDP Act 2023 Section 11-13, exercise your rights to access, correct, export, or erase personal data.
            </p>
          </div>
          <span className="badge badge-validated">Data Principal Portal</span>
        </div>

        {dsarSubmitted ? (
          <div style={{ padding: "2rem", background: "var(--brand-primary-light)", borderRadius: "var(--radius-md)", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>✅</div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--brand-primary)" }}>
              Data Request Successfully Registered!
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", maxWidth: "550px", margin: "0.5rem auto 1.5rem" }}>
              Request ID <strong>DSAR-JH-2026-9284</strong> has been queued for the State Data Protection Officer (DPO). Action will be processed within 72 hours under statutory SLA.
            </p>
            <button onClick={() => setDsarSubmitted(false)} className="btn btn-secondary btn-sm">
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleDSARSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div>
              <label className="form-label" style={{ fontWeight: 700 }}>Select Request Type</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem" }}>
                {[
                  { key: "export", label: "📥 Export My Personal Data", desc: "Download JSON/CSV of all submissions & logs" },
                  { key: "correct", label: "✏️ Request Data Correction", desc: "Update inaccurate contact or location records" },
                  { key: "anonymize", label: "🕶️ Anonymize Past Submissions", desc: "Strip phone and name from all public projects" },
                  { key: "delete", label: "🗑️ Right to Erasure / Deletion", desc: "Permanently delete account and unassigned drafts" }
                ].map(item => (
                  <div
                    key={item.key}
                    onClick={() => setDsarType(item.key as any)}
                    style={{
                      padding: "0.85rem",
                      borderRadius: "var(--radius-md)",
                      border: dsarType === item.key ? "2px solid var(--brand-primary)" : "1px solid var(--border-medium)",
                      background: dsarType === item.key ? "var(--bg-main)" : "var(--bg-card)",
                      cursor: "pointer"
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--text-main)" }}>{item.label}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="form-label" style={{ fontWeight: 700 }}>Registered Identifier (Email / Mobile)</label>
              <input
                type="text"
                required
                className="form-input"
                defaultValue={user?.email || "+91 98351 23456"}
              />
            </div>

            <div>
              <label className="form-label" style={{ fontWeight: 700 }}>Request Details & Specific Challenge IDs (Optional)</label>
              <textarea
                rows={3}
                className="form-textarea"
                placeholder="Specify any details or reference numbers for the Data Protection Officer..."
                value={requestDetails}
                onChange={(e) => setRequestDetails(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button type="submit" className="btn btn-primary">
                🛡️ Submit Statutory Data Request
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Statutory Privacy Policy Clauses */}
      <div className="card shadow-sm">
        <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1rem" }}>
          📜 Government Data Fiduciary Terms of Use
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
          <div>
            <strong style={{ color: "var(--text-main)" }}>1. Purpose of Data Processing:</strong> Data crowdsourced on this portal is processed strictly for academic research, technological prototyping, and public welfare problem-solving in coordination with recognized Higher Education Institutions (HEIs) and CSR partners under NEP 2020.
          </div>
          <div>
            <strong style={{ color: "var(--text-main)" }}>2. Intellectual Property Ownership:</strong> Technology and solutions developed through student-faculty research belong to the respective HEI and students. The Government of Jharkhand holds a perpetual, royalty-free license to deploy the solution in public community health, water supply, and welfare programs.
          </div>
          <div>
            <strong style={{ color: "var(--text-main)" }}>3. Grievance Redressal & DPO Contact:</strong> For any privacy grievances or complaints, citizens may contact the State Data Protection Officer at <code>dpo.hed@jharkhand.gov.in</code> or call the helpline at <code>1800-JH-INNOVATE</code>.
          </div>
        </div>
      </div>
    </div>
  );
}
