"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import StatsCard from "@/components/ui/StatsCard";

interface AccountabilityResult {
  id: string;
  commitmentTitle: string;
  department: string;
  assignedUniversity: string;
  targetCompletion: string;
  progressPercent: number;
  status: "Completed" | "In_Execution" | "Under_Review";
  sanctionedBudgetLakhs: number;
  spentBudgetLakhs: number;
  beneficiariesImpacted: number;
  milestones: { name: string; date: string; status: "Done" | "Ongoing" | "Pending" }[];
}

export default function AccountabilityMatrixPage() {
  const { language } = useLanguage();

  const [statusFilter, setStatusFilter] = useState("all");

  const [results, setResults] = useState<AccountabilityResult[]>([
    {
      id: "ACC-01",
      commitmentTitle: "Latehar Rural Water Fluoride Electro-Coagulation Filtration Grid",
      department: "Drinking Water & Sanitation Dept",
      assignedUniversity: "BIT Mesra",
      targetCompletion: "October 2026",
      progressPercent: 75,
      status: "In_Execution",
      sanctionedBudgetLakhs: 42.0,
      spentBudgetLakhs: 31.5,
      beneficiariesImpacted: 18400,
      milestones: [
        { name: "Groundwater spectrometry & baseline testing", date: "June 2026", status: "Done" },
        { name: "Membrane electro-coagulation prototype fabrication", date: "July 2026", status: "Done" },
        { name: "Pilot installation across 10 Mahuadanr villages", date: "August 2026", status: "Done" },
        { name: "Full scale rollout to remaining 18 villages", date: "October 2026", status: "Ongoing" }
      ]
    },
    {
      id: "ACC-02",
      commitmentTitle: "Jharia Opencast Mine Overburden Bioremediation & Grass Buffer",
      department: "Forest, Environment & Climate Change Dept",
      assignedUniversity: "IIT (ISM) Dhanbad",
      targetCompletion: "August 2026",
      progressPercent: 100,
      status: "Completed",
      sanctionedBudgetLakhs: 38.0,
      spentBudgetLakhs: 37.2,
      beneficiariesImpacted: 45000,
      milestones: [
        { name: "Acid mine drainage pH baseline mapping", date: "May 2026", status: "Done" },
        { name: "Microbial formulation batch production", date: "June 2026", status: "Done" },
        { name: "Geotextile stabilization over 10 hectares", date: "July 2026", status: "Done" },
        { name: "Ground verification & citizen satisfaction signoff", date: "August 2026", status: "Done" }
      ]
    },
    {
      id: "ACC-03",
      commitmentTitle: "Santhal Pargana Mobile Sickle Cell Anemia & SAM Screening",
      department: "Health, Medical Education & Family Welfare Dept",
      assignedUniversity: "SKMU Dumka",
      targetCompletion: "December 2026",
      progressPercent: 60,
      status: "In_Execution",
      sanctionedBudgetLakhs: 48.0,
      spentBudgetLakhs: 28.8,
      beneficiariesImpacted: 22000,
      milestones: [
        { name: "4 Mobile diagnostic vans procurement & fabrication", date: "July 2026", status: "Done" },
        { name: "Anganwadi worker training in electrophoresis", date: "August 2026", status: "Done" },
        { name: "Screening of 5,000 children in Dumka & Pakur", date: "October 2026", status: "Ongoing" },
        { name: "Digital health card sync with Ayushman Bharat", date: "December 2026", status: "Pending" }
      ]
    },
    {
      id: "ACC-04",
      commitmentTitle: "Chaibasa Tribal Mahua & Forest Produce Solar Processing Kiosks",
      department: "Rural Development Department",
      assignedUniversity: "BAU Ranchi",
      targetCompletion: "November 2026",
      progressPercent: 45,
      status: "In_Execution",
      sanctionedBudgetLakhs: 35.0,
      spentBudgetLakhs: 15.7,
      beneficiariesImpacted: 6200,
      milestones: [
        { name: "Solar dehumidifier lab design optimization", date: "July 2026", status: "Done" },
        { name: "SHG federation location selection", date: "August 2026", status: "Done" },
        { name: "Fabrication of 15 commercial units", date: "September 2026", status: "Ongoing" },
        { name: "Handover and fair-price market link setup", date: "November 2026", status: "Pending" }
      ]
    }
  ]);

  const filteredResults = statusFilter === "all"
    ? results
    : results.filter(r => r.status === statusFilter);

  const avgProgress = Math.round(results.reduce((acc, r) => acc + r.progressPercent, 0) / results.length);
  const totalBeneficiaries = results.reduce((acc, r) => acc + r.beneficiariesImpacted, 0);
  const totalBudgetSpent = results.reduce((acc, r) => acc + r.spentBudgetLakhs, 0);

  return (
    <div className="container" style={{ padding: "3.5rem 1.5rem", maxWidth: "1200px" }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
        <Link href="/">← Portal Home</Link> / <span style={{ color: "var(--text-main)" }}>Decidim Accountability & Results Matrix</span>
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
          📊 Decidim-Standard Transparent Accountability Matrix
        </div>
        <h1 className="heading-section">
          State Innovation Commitment & Execution Tracker
        </h1>
        <p className="subheading">
          Radical transparency in government action. Track every public commitment, sanctioned budget expenditure, milestone deliverables, and audited citizen impact across Jharkhand.
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid-4" style={{ marginBottom: "2.5rem" }}>
        <StatsCard
          title="Overall Program Execution"
          value={`${avgProgress}%`}
          icon="📈"
          change="Across all state commitments"
          subtitle="Real-time audit"
          accentColor="var(--brand-primary)"
        />
        <StatsCard
          title="Direct Beneficiaries"
          value={totalBeneficiaries.toLocaleString("en-IN")}
          icon="👥"
          change="Verified ground impact"
          subtitle="Citizens positively affected"
          accentColor="#10b981"
        />
        <StatsCard
          title="Public & CSR Funds Spent"
          value={`₹${totalBudgetSpent.toFixed(1)} L`}
          icon="💰"
          change="₹163.0 L Total Sanctioned"
          subtitle="70% utilization rate"
          accentColor="var(--brand-indigo)"
        />
        <StatsCard
          title="Accountability Status"
          value="100% Audited"
          icon="🛡️"
          change="WORM Immutable Logs"
          subtitle="Zero unverified funds"
          accentColor="var(--brand-accent)"
        />
      </div>

      {/* Commitments Table */}
      <div className="card shadow-md">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800 }}>Formal State Innovation Commitments</h2>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Execution status monitored by Steering Committee</span>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            {["all", "Completed", "In_Execution"].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                style={{
                  padding: "0.3rem 0.75rem",
                  borderRadius: "var(--radius-full)",
                  border: "1px solid var(--border-medium)",
                  background: statusFilter === s ? "var(--brand-primary)" : "var(--bg-main)",
                  color: statusFilter === s ? "#ffffff" : "var(--text-main)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                {s === "all" ? "All Commitments" : s.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {filteredResults.map(res => (
            <div
              key={res.id}
              style={{
                padding: "1.25rem",
                borderRadius: "var(--radius-md)",
                background: "var(--bg-main)",
                borderLeft: res.status === "Completed" ? "5px solid #10b981" : "5px solid var(--brand-primary)",
                border: "1px solid var(--border-light)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.75rem" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
                    <span className={`badge ${res.status === "Completed" ? "badge-validated" : "badge-assigned"}`} style={{ fontSize: "0.7rem" }}>
                      {res.status.replace("_", " ")}
                    </span>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                      Dept: <strong>{res.department}</strong> • Lead: <strong>{res.assignedUniversity}</strong>
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-main)", margin: 0 }}>
                    {res.commitmentTitle}
                  </h3>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: 900, color: res.status === "Completed" ? "#10b981" : "var(--brand-primary)" }}>
                    {res.progressPercent}% Completed
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>
                    Target: {res.targetCompletion}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ height: "8px", background: "var(--border-light)", borderRadius: "4px", overflow: "hidden", marginBottom: "1rem" }}>
                <div style={{
                  width: `${res.progressPercent}%`,
                  height: "100%",
                  background: res.status === "Completed" ? "#10b981" : "var(--brand-primary)",
                  borderRadius: "4px"
                }} />
              </div>

              {/* Milestone Checklist */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.6rem", fontSize: "0.78rem" }}>
                {res.milestones.map((m, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "0.5rem 0.75rem",
                      background: "var(--bg-card)",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-light)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <span>{m.name}</span>
                    <span style={{ fontWeight: 700, color: m.status === "Done" ? "#10b981" : m.status === "Ongoing" ? "var(--brand-primary)" : "var(--text-muted)" }}>
                      {m.status === "Done" ? "✓" : m.status === "Ongoing" ? "⏳" : "○"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial & Impact Metrics */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border-light)", flexWrap: "wrap", gap: "0.5rem" }}>
                <span>💰 Budget Spent: <strong>₹{res.spentBudgetLakhs.toFixed(1)}L</strong> / ₹{res.sanctionedBudgetLakhs.toFixed(1)}L</span>
                <span>👥 Citizens Impacted: <strong>{res.beneficiariesImpacted.toLocaleString("en-IN")}</strong></span>
                <span>🛡️ Auditor: <strong>JSDC & NIC Third-Party Verification</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
