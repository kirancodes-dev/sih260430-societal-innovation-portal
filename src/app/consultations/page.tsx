"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { JHARKHAND_DISTRICTS, THEMATIC_DOMAINS } from "@/lib/constants";

interface AssemblyConsultation {
  id: string;
  title: string;
  titleHi: string;
  district: string;
  block: string;
  gramPanchayat: string;
  thematicDomain: string;
  status: "Open_Deliberation" | "Voting" | "Resolved_Enacted";
  currentPhase: string;
  phases: { name: string; date: string; completed: boolean }[];
  participantsCount: number;
  endorsementsCount: number;
  proposalsCount: number;
  description: string;
  keyArguments: { type: "pro" | "con"; author: string; role: string; text: string; upvotes: number }[];
}

export default function ParticipatoryConsultationsPage() {
  const { language } = useLanguage();
  const { user } = useAuth();

  const [filterDistrict, setFilterDistrict] = useState("all");
  const [selectedAssembly, setSelectedAssembly] = useState<AssemblyConsultation | null>(null);

  const [consultations, setConsultations] = useState<AssemblyConsultation[]>([
    {
      id: "CON-JH-2026-01",
      title: "Palamu Drought Mitigation & Solar Micro-Lift Irrigation Citizen Consultation",
      titleHi: "पलामू सूखा निवारण एवं सौर माइक्रो-लिफ्ट सिंचाई जन परामर्श",
      district: "palamu",
      block: "Medininagar",
      gramPanchayat: "Satbarwa Gram Sabha",
      thematicDomain: "Water Resources & Sanitation",
      status: "Open_Deliberation",
      currentPhase: "Phase 2: Community Deliberation & Expert Hearing",
      phases: [
        { name: "1. Problem Intake & Soil Data Collection", date: "July 2026", completed: true },
        { name: "2. Gram Sabha Open Deliberation", date: "August 2026", completed: true },
        { name: "3. University Technical Vetting (BAU Ranchi)", date: "Sept 2026", completed: false },
        { name: "4. Citizen Endorsement & Voting", date: "Oct 2026", completed: false },
        { name: "5. State Grant Sanction & Field Deployment", date: "Nov 2026", completed: false }
      ],
      participantsCount: 420,
      endorsementsCount: 312,
      proposalsCount: 8,
      description: "Deliberative assembly with 12 Panchayats in Palamu plateau to decide the deployment route for solar-powered micro-lift pumps along the North Koel river basin.",
      keyArguments: [
        {
          type: "pro",
          author: "Ramesh Munda",
          role: "Mukhiya / PRI",
          text: "Decentralized solar micro-lift will reduce diesel pump expenditure by 75% for smallholder farmers during Rabi sowing season.",
          upvotes: 89
        },
        {
          type: "con",
          author: "Prof. S. K. Jha",
          role: "Agronomist (BAU)",
          text: "Need ground water recharge check dams upstream before lifting, otherwise downstream water table may drop during peak summer.",
          upvotes: 45
        }
      ]
    },
    {
      id: "CON-JH-2026-02",
      title: "Chaibasa Forest Produce Value-Addition & SHG Solar Processing Center",
      titleHi: "चाईबासा लघु वनोपज मूल्य संवर्धन एवं SHG सौर प्रसंस्करण केंद्र",
      district: "west-singhbhum",
      block: "Chaibasa",
      gramPanchayat: "Jhinkpani Mahila Sabha",
      thematicDomain: "Rural Livelihoods",
      status: "Voting",
      currentPhase: "Phase 4: Community Voting & Co-Funding Pledges",
      phases: [
        { name: "1. Mahua & Lac Yield Mapping", date: "June 2026", completed: true },
        { name: "2. SHG Collective Assembly", date: "July 2026", completed: true },
        { name: "3. Prototyping Solar Dehumidifiers", date: "August 2026", completed: true },
        { name: "4. Community Endorsement & Voting", date: "Sept 2026", completed: true },
        { name: "5. Handover to Women SHG Federation", date: "Oct 2026", completed: false }
      ],
      participantsCount: 580,
      endorsementsCount: 495,
      proposalsCount: 5,
      description: "Consultation on establishing community-owned solar processing micro-factories for Mahua and Tussar silk value addition across West Singhbhum.",
      keyArguments: [
        {
          type: "pro",
          author: "Sunita Soy",
          role: "SHG President",
          text: "Direct processing eliminates middlemen and guarantees minimum support price (MSP) of ₹45/kg for dried Mahua flowers.",
          upvotes: 142
        }
      ]
    },
    {
      id: "CON-JH-2026-03",
      title: "Jharia Coal Dust Bioremediation & Green Buffer Assembly",
      titleHi: "झरिया कोयला धूल जैवोपचार एवं हरित बफर जन सभा",
      district: "dhanbad",
      block: "Jharia",
      gramPanchayat: "Jharia Citizen Council",
      thematicDomain: "Environment & Forestry",
      status: "Resolved_Enacted",
      currentPhase: "Phase 5: State Sanctioned & Field Execution by IIT ISM",
      phases: [
        { name: "1. PM2.5 & Soil Toxicity Baseline", date: "May 2026", completed: true },
        { name: "2. Public Hearing with Coalfield Residents", date: "June 2026", completed: true },
        { name: "3. Microbial Formulation Laboratory Review", date: "July 2026", completed: true },
        { name: "4. Citizen Assembly Approval (94% Yes)", date: "August 2026", completed: true },
        { name: "5. ₹50L Pilot Execution by IIT ISM", date: "Sept 2026", completed: true }
      ],
      participantsCount: 890,
      endorsementsCount: 820,
      proposalsCount: 12,
      description: "Completed participatory process where 890 coalfield residents voted to deploy microbial geotextile grass buffers over 10 hectares of abandoned opencast overburden.",
      keyArguments: [
        {
          type: "pro",
          author: "Dr. Anirban Roy",
          role: "Faculty PI (IIT ISM)",
          text: "Microbial spray stabilizes topsoil within 21 days with 80% reduction in windblown particulate matter.",
          upvotes: 210
        }
      ]
    }
  ]);

  const [newCommentText, setNewCommentText] = useState("");
  const [argumentType, setArgumentType] = useState<"pro" | "con">("pro");

  const filteredConsultations = filterDistrict === "all"
    ? consultations
    : consultations.filter(c => c.district === filterDistrict);

  const handleAddArgument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText || !selectedAssembly) return;

    const newArg = {
      type: argumentType,
      author: user?.displayName || "Citizen Delegate",
      role: user?.role.toUpperCase() || "CITIZEN",
      text: newCommentText,
      upvotes: 1
    };

    setConsultations(prev => prev.map(c => {
      if (c.id === selectedAssembly.id) {
        return {
          ...c,
          keyArguments: [newArg, ...c.keyArguments],
          participantsCount: c.participantsCount + 1,
          endorsementsCount: c.endorsementsCount + 1
        };
      }
      return c;
    }));

    setSelectedAssembly(prev => prev ? {
      ...prev,
      keyArguments: [newArg, ...prev.keyArguments],
      participantsCount: prev.participantsCount + 1,
      endorsementsCount: prev.endorsementsCount + 1
    } : null);

    setNewCommentText("");
  };

  return (
    <div className="container" style={{ padding: "3.5rem 1.5rem", maxWidth: "1200px" }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
        <Link href="/">← Portal Home</Link> / <span style={{ color: "var(--text-main)" }}>Participatory Democracy & Gram Sabha Assemblies</span>
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
          🗳️ Decidim-Powered Participatory Governance (NEP 2020 & 73rd Constitutional Amendment)
        </div>
        <h1 className="heading-section">
          Gram Sabha Consultations & Citizen Deliberative Assemblies
        </h1>
        <p className="subheading">
          Empowering citizens, Panchayati Raj Institutions (PRIs), and local habitations to deliberate on societal challenges, vote on technological interventions, and co-design grassroots solutions.
        </p>
      </div>

      {/* District Filter Bar */}
      <div className="card" style={{ marginBottom: "2rem", padding: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>Filter District:</span>
            <select
              className="form-select"
              style={{ width: "200px" }}
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value)}
            >
              <option value="all">All 24 Districts</option>
              {JHARKHAND_DISTRICTS.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Showing <strong>{filteredConsultations.length}</strong> active Gram Sabha deliberative processes
          </div>
        </div>
      </div>

      {/* Consultations Grid */}
      <div className="grid-3" style={{ marginBottom: "3rem" }}>
        {filteredConsultations.map(c => {
          const isSelected = selectedAssembly?.id === c.id;
          const statusBadge = c.status === "Open_Deliberation" ? "badge-assigned" : c.status === "Voting" ? "badge-critical" : "badge-validated";
          return (
            <div
              key={c.id}
              onClick={() => setSelectedAssembly(c)}
              className="card shadow-sm"
              style={{
                cursor: "pointer",
                borderTop: isSelected ? "4px solid var(--brand-primary)" : "1px solid var(--border-medium)",
                background: isSelected ? "var(--bg-main)" : "var(--bg-card)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                  <span className={`badge ${statusBadge}`} style={{ fontSize: "0.7rem" }}>
                    ● {c.status.replace("_", " ")}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
                    📍 {c.district.toUpperCase()}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.5rem", color: "var(--text-main)", lineHeight: 1.35 }}>
                  {language === "hi" ? c.titleHi : c.title}
                </h3>

                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "1rem" }}>
                  {c.description}
                </p>
              </div>

              <div>
                <div style={{ padding: "0.5rem 0.75rem", background: "var(--bg-main)", borderRadius: "var(--radius-sm)", fontSize: "0.78rem", marginBottom: "0.75rem" }}>
                  <strong>Current Phase:</strong> {c.currentPhase}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem", color: "var(--text-light)" }}>
                  <span>👥 {c.participantsCount} Citizens</span>
                  <span>👍 {c.endorsementsCount} Endorsements</span>
                  <span>📝 {c.proposalsCount} Proposals</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Assembly Deliberation & Debate Panel */}
      {selectedAssembly && (
        <div className="card shadow-md" style={{ borderTop: "4px solid var(--brand-primary)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span className="badge badge-assigned" style={{ fontSize: "0.72rem", marginBottom: "0.4rem" }}>
                🏛️ {selectedAssembly.gramPanchayat} • {selectedAssembly.thematicDomain}
              </span>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-main)" }}>
                {selectedAssembly.title}
              </h2>
            </div>

            <button
              onClick={() => {
                setConsultations(prev => prev.map(c => c.id === selectedAssembly.id ? { ...c, endorsementsCount: c.endorsementsCount + 1 } : c));
                setSelectedAssembly(prev => prev ? { ...prev, endorsementsCount: prev.endorsementsCount + 1 } : null);
              }}
              className="btn btn-primary btn-sm"
            >
              👍 Endorse this Assembly Challenge ({selectedAssembly.endorsementsCount})
            </button>
          </div>

          {/* Phase Timeline Tracker */}
          <div style={{ marginBottom: "2rem" }}>
            <h4 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
              Participatory Process Phases
            </h4>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.75rem" }}>
              {selectedAssembly.phases.map((p, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "0.75rem",
                    borderRadius: "var(--radius-md)",
                    background: p.completed ? "rgba(16, 185, 129, 0.08)" : "var(--bg-main)",
                    borderLeft: p.completed ? "4px solid #10b981" : "3px solid var(--border-medium)"
                  }}
                >
                  <div style={{ fontSize: "0.72rem", color: p.completed ? "#10b981" : "var(--text-muted)", fontWeight: 700 }}>
                    {p.completed ? "✓ COMPLETED" : "⏳ UPCOMING"} ({p.date})
                  </div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 600, marginTop: "0.2rem" }}>
                    {p.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deliberative Debate & Arguments */}
          <div className="grid-2" style={{ gap: "2rem", alignItems: "start" }}>
            {/* Arguments Stream */}
            <div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: "1rem" }}>
                💬 Community Arguments & Perspectives
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {selectedAssembly.keyArguments.map((arg, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "1rem",
                      borderRadius: "var(--radius-md)",
                      background: "var(--bg-main)",
                      borderLeft: arg.type === "pro" ? "4px solid #10b981" : "4px solid var(--brand-accent)"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                      <div>
                        <span style={{ fontWeight: 700, fontSize: "0.85rem" }}>{arg.author}</span>
                        <span className="badge badge-validated" style={{ fontSize: "0.65rem", marginLeft: "0.4rem" }}>
                          {arg.role}
                        </span>
                      </div>
                      <span style={{ fontSize: "0.72rem", fontWeight: 700, color: arg.type === "pro" ? "#10b981" : "var(--brand-accent)" }}>
                        {arg.type === "pro" ? "IN FAVOR (PRO)" : "CONSIDERATION (CON)"}
                      </span>
                    </div>

                    <p style={{ fontSize: "0.85rem", color: "var(--text-main)", lineHeight: 1.4, margin: "0 0 0.5rem 0" }}>
                      &ldquo;{arg.text}&rdquo;
                    </p>

                    <div style={{ fontSize: "0.72rem", color: "var(--text-light)" }}>
                      👍 {arg.upvotes} Citizens Agree
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Argument Form */}
            <div className="card shadow-sm">
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.8rem" }}>
                ✍️ Submit Argument to Assembly
              </h3>

              <form onSubmit={handleAddArgument} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div>
                  <label className="form-label" style={{ fontSize: "0.78rem" }}>Argument Stance</label>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.85rem", cursor: "pointer" }}>
                      <input
                        type="radio"
                        name="argType"
                        value="pro"
                        checked={argumentType === "pro"}
                        onChange={() => setArgumentType("pro")}
                      />
                      <span>In Favor (Pro)</span>
                    </label>

                    <label style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.85rem", cursor: "pointer" }}>
                      <input
                        type="radio"
                        name="argType"
                        value="con"
                        checked={argumentType === "con"}
                        onChange={() => setArgumentType("con")}
                      />
                      <span>Critical Observation (Con)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: "0.78rem" }}>Your Perspective / Evidence</label>
                  <textarea
                    rows={4}
                    required
                    className="form-textarea"
                    placeholder="Provide technical feedback, field observation, or community constraint..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-sm">
                  📢 Post Argument to Gram Sabha Record
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
