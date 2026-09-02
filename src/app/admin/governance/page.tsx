"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

interface CommitteeMember {
  id: string;
  name: string;
  designation: string;
  organization: string;
  role: "Chairperson" | "Convener" | "Academic Member" | "Industry Representative" | "Civil Society Representative";
  avatar: string;
}

interface ResolutionLog {
  id: string;
  resolutionNumber: string;
  meetingDate: string;
  agenda: string;
  decision: string;
  status: "Enacted" | "Under_Implementation" | "Pending_Notification";
  signatories: string[];
}

export default function SteeringCommitteeGovernancePage() {
  const { t, language } = useLanguage();

  const members: CommitteeMember[] = [
    {
      id: "cm-1",
      name: "Dr. Arvind Kumar, IAS",
      designation: "Principal Secretary",
      organization: "Dept of Higher & Technical Education, Govt of Jharkhand",
      role: "Chairperson",
      avatar: "🏛️"
    },
    {
      id: "cm-2",
      name: "Shri Rajesh Prasad, IAS",
      designation: "Secretary",
      organization: "Department of Information Technology & e-Governance (DITEG)",
      role: "Convener",
      avatar: "💻"
    },
    {
      id: "cm-3",
      name: "Prof. Indranil Manna",
      designation: "Director",
      organization: "Birla Institute of Technology (BIT) Mesra",
      role: "Academic Member",
      avatar: "🎓"
    },
    {
      id: "cm-4",
      name: "Prof. Sukumar Mishra",
      designation: "Director",
      organization: "IIT (ISM) Dhanbad",
      role: "Academic Member",
      avatar: "🏛️"
    },
    {
      id: "cm-5",
      name: "Smt. Ritu Raj",
      designation: "Chairperson, CSR & Skill Committee",
      organization: "Confederation of Indian Industry (CII) Jharkhand",
      role: "Industry Representative",
      avatar: "🏭"
    },
    {
      id: "cm-6",
      name: "Father Stan D'Souza",
      designation: "Executive Director",
      organization: "Jharkhand Tribal Development & Livelihood Forum",
      role: "Civil Society Representative",
      avatar: "🤝"
    }
  ];

  const [resolutions, setResolutions] = useState<ResolutionLog[]>([
    {
      id: "res-2026-03",
      resolutionNumber: "JH-SICP/GOV/2026/03",
      meetingDate: "2026-08-20",
      agenda: "Approval of State Innovation Prototyping Grants for Latehar Water Filtration and Chaibasa Minor Forest Produce Processing.",
      decision: "Sanctioned ₹42 Lakhs from State Innovation Fund with mandatory 1:1 CSR co-funding requirement. Assigned to BIT Mesra & BAU Ranchi.",
      status: "Enacted",
      signatories: ["Principal Secretary (HED)", "Secretary (DITEG)", "CII Representative"]
    },
    {
      id: "res-2026-02",
      resolutionNumber: "JH-SICP/GOV/2026/02",
      meetingDate: "2026-07-15",
      agenda: "Adoption of NEP 2020 Experiential Learning Credit Guidelines for student capstone innovators across 42 State HEIs.",
      decision: "Mandated 6 academic credits for B.Tech/M.Tech final year students participating in portal projects certified by Dean Academics.",
      status: "Enacted",
      signatories: ["Principal Secretary (HED)", "Director BIT Mesra", "Director IIT ISM"]
    },
    {
      id: "res-2026-01",
      resolutionNumber: "JH-SICP/GOV/2026/01",
      meetingDate: "2026-06-10",
      agenda: "Establishment of State AI Triage Model Governance and Quarterly Bias Audits for tribal language challenges.",
      decision: "Adopted Zero-Bias threshold across 24 districts; mandated human override audit trails before assigning public funds.",
      status: "Under_Implementation",
      signatories: ["Secretary (DITEG)", "Civil Society Rep"]
    }
  ]);

  const [newAgenda, setNewAgenda] = useState("");
  const [newDecision, setNewDecision] = useState("");

  const handleAddResolution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgenda || !newDecision) return;

    const newRes: ResolutionLog = {
      id: `res-${Date.now()}`,
      resolutionNumber: `JH-SICP/GOV/2026/${resolutions.length + 1}`,
      meetingDate: new Date().toISOString().split("T")[0],
      agenda: newAgenda,
      decision: newDecision,
      status: "Under_Implementation",
      signatories: ["Chairperson (IAS)", "Convener (DITEG)"]
    };

    setResolutions(prev => [newRes, ...prev]);
    setNewAgenda("");
    setNewDecision("");
  };

  return (
    <div className="container" style={{ padding: "3.5rem 1.5rem", maxWidth: "1150px" }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
        <Link href="/admin">← Back to Admin Console</Link> / <span style={{ color: "var(--text-main)" }}>State Steering Committee & Governance</span>
      </div>

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
          🏛️ Multi-Stakeholder Oversight & Policy Governance Body
        </div>
        <h1 className="heading-section">
          Jharkhand State Innovation Steering Committee
        </h1>
        <p className="subheading">
          Empowered inter-departmental governance committee overseeing resource allocations, NEP 2020 credit frameworks, CSR grant sanctions, and ethical AI monitoring.
        </p>
      </div>

      {/* Steering Committee Members Grid */}
      <div style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "1.2rem" }}>
          👥 Apex Committee Composition
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.2rem" }}>
          {members.map(m => (
            <div key={m.id} className="card shadow-sm" style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <span style={{ fontSize: "2.2rem" }}>{m.avatar}</span>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.2rem" }}>
                  <span className="badge badge-assigned" style={{ fontSize: "0.7rem" }}>
                    {m.role}
                  </span>
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-main)", margin: 0 }}>
                  {m.name}
                </h3>
                <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--brand-indigo)", marginTop: "0.2rem" }}>
                  {m.designation}
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                  {m.organization}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decision Logs & Resolutions */}
      <div className="grid-2" style={{ gridTemplateColumns: "1.6fr 1fr", gap: "2rem", alignItems: "start" }}>
        {/* Resolutions Table */}
        <div className="card shadow-md">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800 }}>Formal Resolution & Decision Logs</h2>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Immutable state oversight records</span>
            </div>
            <span className="badge badge-validated">{resolutions.length} Resolutions Enacted</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {resolutions.map(r => (
              <div
                key={r.id}
                style={{
                  padding: "1.2rem",
                  background: "var(--bg-main)",
                  borderRadius: "var(--radius-md)",
                  borderLeft: "4px solid var(--brand-primary)",
                  border: "1px solid var(--border-light)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
                  <span style={{ fontSize: "0.78rem", fontFamily: "monospace", fontWeight: 800, color: "var(--brand-primary)" }}>
                    {r.resolutionNumber}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    📅 Meeting Date: {r.meetingDate}
                  </span>
                </div>

                <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-main)", marginBottom: "0.4rem" }}>
                  Agenda: {r.agenda}
                </div>

                <div style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "0.8rem" }}>
                  <strong>Committee Decision:</strong> {r.decision}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem", color: "var(--text-light)", paddingTop: "0.5rem", borderTop: "1px solid var(--border-light)" }}>
                  <span>✍️ Signatories: {r.signatories.join(" • ")}</span>
                  <span className="badge badge-validated" style={{ fontSize: "0.7rem" }}>{r.status.replace("_", " ")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Record New Decision */}
        <div className="card shadow-md">
          <h3 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: "1rem" }}>
            📝 Record Committee Resolution
          </h3>

          <form onSubmit={handleAddResolution} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label className="form-label" style={{ fontWeight: 700 }}>Meeting Agenda & Policy Subject</label>
              <textarea
                rows={3}
                required
                className="form-textarea"
                placeholder="e.g. Sanction of ₹50 Lakhs for Palamu Drip Irrigation Innovation Project..."
                value={newAgenda}
                onChange={(e) => setNewAgenda(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label" style={{ fontWeight: 700 }}>Committee Decision & Directives</label>
              <textarea
                rows={4}
                required
                className="form-textarea"
                placeholder="Detail the sanctioned budget, assigned university responsibilities, and timeline..."
                value={newDecision}
                onChange={(e) => setNewDecision(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              🏛️ Log Resolution to State Record
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
