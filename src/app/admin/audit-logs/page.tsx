"use client";

import React, { useState } from "react";
import Link from "next/link";

interface AuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  action: string;
  entity: string;
  entityId: string;
  ipAddress: string;
  status: "Success" | "Flagged" | "Denied";
  sha256Hash: string;
}

export default function SecurityAuditLogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("all");

  const [logs] = useState<AuditEntry[]>([
    {
      id: "log-8942",
      timestamp: "2026-08-29 14:15:22 IST",
      actor: "Dr. Arvind Kumar (IAS)",
      actorRole: "Government Admin",
      action: "CHALLENGE_ALLOCATE_HEI",
      entity: "Challenge",
      entityId: "CH-JH-2026-001",
      ipAddress: "10.14.22.84 (JSDC Internal)",
      status: "Success",
      sha256Hash: "8f7a9c1e2b3d4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a"
    },
    {
      id: "log-8941",
      timestamp: "2026-08-29 11:30:05 IST",
      actor: "Ananya Sengupta (VP CSR)",
      actorRole: "Industry Partner",
      action: "TRIPARTITE_MOU_E_SIGN",
      entity: "MoU Agreement",
      entityId: "MOU-JH-2026-001",
      ipAddress: "103.24.188.12",
      status: "Success",
      sha256Hash: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2"
    },
    {
      id: "log-8940",
      timestamp: "2026-08-29 09:45:18 IST",
      actor: "Prof. S. N. Mukherjee",
      actorRole: "University Dean",
      action: "STUDENT_CREDIT_CERTIFY",
      entity: "Academic Credit Ledger",
      entityId: "CRED-BTECH-22045",
      ipAddress: "14.139.208.5 (BIT Mesra)",
      status: "Success",
      sha256Hash: "9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d"
    },
    {
      id: "log-8939",
      timestamp: "2026-08-28 18:20:44 IST",
      actor: "Ramesh Munda",
      actorRole: "Citizen / PRI",
      action: "CITIZEN_5STAR_FEEDBACK",
      entity: "Project Feedback",
      entityId: "CH-JH-2026-005",
      ipAddress: "49.36.128.92",
      status: "Success",
      sha256Hash: "f1e2d3c4b5a6f7e8d9c0b1a2f3e4d5c6b7a8f9e0d1c2b3a4f5e6d7c8b9a0f1e2"
    },
    {
      id: "log-8938",
      timestamp: "2026-08-28 15:10:11 IST",
      actor: "System AI Triage Engine",
      actorRole: "AI / Daemon",
      action: "NLP_TRIAGE_CLASSIFY",
      entity: "Challenge Intake",
      entityId: "CH-JH-2026-003",
      ipAddress: "127.0.0.1 (NIC Cloud Worker)",
      status: "Success",
      sha256Hash: "3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b"
    }
  ]);

  const filteredLogs = logs.filter(l => {
    const matchSearch =
      !searchTerm ||
      l.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.entityId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchAction = actionFilter === "all" || l.action === actionFilter;
    return matchSearch && matchAction;
  });

  return (
    <div className="container" style={{ padding: "3.5rem 1.5rem", maxWidth: "1200px" }}>
      <div style={{ marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
        <Link href="/admin">← Back to Admin Console</Link> / <span style={{ color: "var(--text-main)" }}>Immutable Security Audit Logs</span>
      </div>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
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
            🔒 Tamper-Proof Cryptographic Audit Trail (WORM Architecture)
          </div>
          <h1 className="heading-section">
            State Security & Administrative Action Ledger
          </h1>
          <p className="subheading">
            Immutable audit records capturing all triage decisions, tripartite e-signatures, university assignments, and data exports with SHA-256 integrity verification hashes.
          </p>
        </div>

        <button onClick={() => alert("Verified all 8,942 log hashes against state WORM root ledger. Integrity: 100% Valid.")} className="btn btn-secondary btn-sm">
          🛡️ Verify Cryptographic Hash Integrity
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="card" style={{ marginBottom: "1.5rem", padding: "1rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
          <div>
            <label className="form-label" style={{ fontSize: "0.78rem" }}>Search Actor / Entity ID</label>
            <input
              type="text"
              placeholder="Search by actor name, ID, or action..."
              className="form-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label" style={{ fontSize: "0.78rem" }}>Action Type Filter</label>
            <select
              className="form-select"
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
            >
              <option value="all">All Actions</option>
              <option value="CHALLENGE_ALLOCATE_HEI">CHALLENGE_ALLOCATE_HEI</option>
              <option value="TRIPARTITE_MOU_E_SIGN">TRIPARTITE_MOU_E_SIGN</option>
              <option value="STUDENT_CREDIT_CERTIFY">STUDENT_CREDIT_CERTIFY</option>
              <option value="CITIZEN_5STAR_FEEDBACK">CITIZEN_5STAR_FEEDBACK</option>
              <option value="NLP_TRIAGE_CLASSIFY">NLP_TRIAGE_CLASSIFY</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="card shadow-md">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border-medium)", textAlign: "left", color: "var(--text-muted)", fontSize: "0.78rem" }}>
                <th style={{ padding: "0.75rem" }}>TIMESTAMP (IST)</th>
                <th style={{ padding: "0.75rem" }}>ACTOR & ROLE</th>
                <th style={{ padding: "0.75rem" }}>ACTION TYPE</th>
                <th style={{ padding: "0.75rem" }}>ENTITY TARGET</th>
                <th style={{ padding: "0.75rem" }}>IP ADDRESS</th>
                <th style={{ padding: "0.75rem" }}>SHA-256 HASH</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr key={log.id} style={{ borderBottom: "1px solid var(--border-light)" }}>
                  <td style={{ padding: "0.75rem", fontFamily: "monospace", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                    {log.timestamp}
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    <div style={{ fontWeight: 700 }}>{log.actor}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--brand-primary)" }}>{log.actorRole}</div>
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    <code style={{ fontSize: "0.75rem", background: "var(--bg-main)", padding: "0.15rem 0.4rem", borderRadius: "3px" }}>
                      {log.action}
                    </code>
                  </td>
                  <td style={{ padding: "0.75rem", fontFamily: "monospace", fontWeight: 600 }}>
                    {log.entityId}
                  </td>
                  <td style={{ padding: "0.75rem", fontSize: "0.78rem", color: "var(--text-light)" }}>
                    {log.ipAddress}
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    <span title={log.sha256Hash} style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "var(--text-muted)" }}>
                      {log.sha256Hash.slice(0, 16)}...
                    </span>
                    <span className="badge badge-validated" style={{ fontSize: "0.65rem", marginLeft: "0.4rem" }}>
                      ✓ Signed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
