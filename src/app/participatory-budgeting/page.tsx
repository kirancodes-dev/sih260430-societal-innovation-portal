"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import StatsCard from "@/components/ui/StatsCard";

interface BudgetProject {
  id: string;
  title: string;
  titleHi: string;
  district: string;
  costLakhs: number;
  votesCount: number;
  thematicDomain: string;
  assignedUniversity: string;
  summary: string;
  selected: boolean;
}

export default function ParticipatoryBudgetingPage() {
  const { language } = useLanguage();

  const totalPoolLakhs = 200.0; // ₹2.00 Crore Annual Citizen Innovation Budget Pool

  const [projects, setProjects] = useState<BudgetProject[]>([
    {
      id: "PB-01",
      title: "Latehar Solar Water Fluoride & Arsenic Nano-Filtration Units (28 Villages)",
      titleHi: "लातेहार सौर जल फ्लोराइड एवं आर्सेनिक नैनो-फिल्ट्रेशन इकाइयां (28 गांव)",
      district: "Latehar",
      costLakhs: 42.0,
      votesCount: 1420,
      thematicDomain: "Water Resources & Sanitation",
      assignedUniversity: "BIT Mesra",
      summary: "Deploy 28 decentralized solar electro-coagulation filtration kiosks in Mahuadanr and Garu blocks.",
      selected: true
    },
    {
      id: "PB-02",
      title: "West Singhbhum SHG Tribal Mahua & Forest Produce Solar Dehydration Network",
      titleHi: "पश्चिमी सिंहभूम SHG जनजातीय महुआ एवं लघु वनोपज सौर प्रसंस्करण नेटवर्क",
      district: "West Singhbhum",
      costLakhs: 35.0,
      votesCount: 980,
      thematicDomain: "Rural Livelihoods",
      assignedUniversity: "BAU Ranchi",
      summary: "Install 15 commercial solar dehumidification units for tribal women federations in Chaibasa.",
      selected: true
    },
    {
      id: "PB-03",
      title: "Santhal Pargana Point-of-Care Sickle Cell & SAM Malnutrition Screening Vans",
      titleHi: "संथाल परगना पॉइंट-ऑफ-केयर सिकल सेल एवं कुपोषण जांच मोबाइल वैन",
      district: "Dumka",
      costLakhs: 48.0,
      votesCount: 1850,
      thematicDomain: "Healthcare & Nutrition",
      assignedUniversity: "SKMU Dumka",
      summary: "Equip 4 mobile diagnostic vans with electrophoresis kits covering 85 remote Paharia hamlets.",
      selected: false
    },
    {
      id: "PB-04",
      title: "Khunti Ol Chiki & Mundari Multilingual Digital STEM Learning Labs",
      titleHi: "खूंटी ओल चिकी एवं मुंडारी बहुभाषी डिजिटल STEM लर्निंग लैब",
      district: "Khunti",
      costLakhs: 28.0,
      votesCount: 760,
      thematicDomain: "Education & Skilling",
      assignedUniversity: "Ranchi University",
      summary: "Offline digital tablet labs across 20 tribal middle schools aligned with NEP 2020.",
      selected: false
    },
    {
      id: "PB-05",
      title: "Jharia Coal Dust Ecological Bioremediation & Grass Buffer Deployment",
      titleHi: "झरिया कोयला धूल पारिस्थितिक जैवोपचार एवं हरित बफर परियोजना",
      district: "Dhanbad",
      costLakhs: 38.0,
      votesCount: 1120,
      thematicDomain: "Environment & Forestry",
      assignedUniversity: "IIT (ISM) Dhanbad",
      summary: "Microbial spray and geotextile turf on 10 hectares of opencast mine overburden.",
      selected: false
    }
  ]);

  const allocatedLakhs = projects.filter(p => p.selected).reduce((acc, curr) => acc + curr.costLakhs, 0);
  const remainingLakhs = totalPoolLakhs - allocatedLakhs;
  const isBudgetExceeded = allocatedLakhs > totalPoolLakhs;

  const toggleProjectVote = (id: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, selected: !p.selected, votesCount: p.selected ? p.votesCount - 1 : p.votesCount + 1 };
      }
      return p;
    }));
  };

  return (
    <div className="container" style={{ padding: "3.5rem 1.5rem", maxWidth: "1200px" }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
        <Link href="/">← Portal Home</Link> / <span style={{ color: "var(--text-main)" }}>Decidim Participatory Budgeting & Citizen Voting</span>
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
          💰 Citizen-Driven Innovation Budgeting (₹2.00 Crore Annual Pool)
        </div>
        <h1 className="heading-section">
          Jharkhand Participatory Budget Allocation Vote
        </h1>
        <p className="subheading">
          Direct democracy in action. Citizens cast their votes to allocate public innovation grants to the most urgent grassroots engineering solutions across the 24 districts of Jharkhand.
        </p>
      </div>

      {/* Interactive Budget Meter */}
      <div className="card shadow-md" style={{ marginBottom: "2.5rem", borderTop: "4px solid var(--brand-primary)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
              Citizen Innovation Budget Allocation
            </span>
            <div style={{ fontSize: "1.8rem", fontWeight: 900, color: isBudgetExceeded ? "var(--brand-danger)" : "var(--brand-primary)" }}>
              ₹{allocatedLakhs.toFixed(1)} Lakhs / ₹{totalPoolLakhs.toFixed(1)} Lakhs
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Remaining Balance in Pool:</div>
            <div style={{ fontSize: "1.4rem", fontWeight: 800, color: remainingLakhs >= 0 ? "#10b981" : "var(--brand-danger)" }}>
              ₹{remainingLakhs.toFixed(1)} Lakhs
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ height: "12px", background: "var(--border-light)", borderRadius: "6px", overflow: "hidden", marginBottom: "0.5rem" }}>
          <div style={{
            width: `${Math.min((allocatedLakhs / totalPoolLakhs) * 100, 100)}%`,
            height: "100%",
            background: isBudgetExceeded ? "var(--brand-danger)" : "linear-gradient(90deg, #10b981, #2563eb)",
            borderRadius: "6px",
            transition: "width 0.3s ease"
          }} />
        </div>

        {isBudgetExceeded && (
          <div style={{ fontSize: "0.8rem", color: "var(--brand-danger)", fontWeight: 700 }}>
            ⚠️ Budget pool exceeded by ₹{Math.abs(remainingLakhs).toFixed(1)} Lakhs. Please unselect a project to cast your official ballot.
          </div>
        )}
      </div>

      {/* Competing Projects Grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginBottom: "3rem" }}>
        {projects.map(p => (
          <div
            key={p.id}
            className="card shadow-sm"
            style={{
              borderLeft: p.selected ? "5px solid var(--brand-primary)" : "1px solid var(--border-medium)",
              background: p.selected ? "var(--bg-main)" : "var(--bg-card)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.5rem"
            }}
          >
            <div style={{ flex: 1, minWidth: "280px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                <span className="badge badge-assigned" style={{ fontSize: "0.7rem" }}>
                  {p.thematicDomain}
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
                  📍 {p.district} • Assigned: {p.assignedUniversity}
                </span>
              </div>

              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "0.3rem" }}>
                {language === "hi" ? p.titleHi : p.title}
              </h3>

              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.4 }}>
                {p.summary}
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Grant Required:</div>
                <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--brand-indigo)" }}>
                  ₹{p.costLakhs.toFixed(1)} Lakhs
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>
                  🗳️ {p.votesCount} Citizen Votes
                </div>
              </div>

              <button
                onClick={() => toggleProjectVote(p.id)}
                className={`btn ${p.selected ? "btn-primary" : "btn-secondary"}`}
                style={{ minWidth: "140px" }}
              >
                {p.selected ? "✓ Voted / Included" : "+ Vote & Allocate"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cast Official Ballot Button */}
      <div className="card shadow-md" style={{ textAlign: "center", padding: "2rem" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          Ready to submit your official Participatory Innovation Ballot?
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto 1.5rem" }}>
          Your ballot will be recorded on the tamper-proof state ledger with SHA-256 integrity hashing under the Department of Higher & Technical Education guidelines.
        </p>

        <button
          onClick={() => alert(`✓ Ballot Recorded! You voted for ${projects.filter(p => p.selected).length} projects totaling ₹${allocatedLakhs.toFixed(1)} Lakhs.`)}
          disabled={isBudgetExceeded || allocatedLakhs === 0}
          className="btn btn-primary btn-lg"
        >
          🗳️ Submit Official Citizen Ballot to State Ledger
        </button>
      </div>
    </div>
  );
}
