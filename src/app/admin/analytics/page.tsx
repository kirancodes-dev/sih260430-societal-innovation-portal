"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  THEMATIC_DOMAINS,
  JHARKHAND_UNIVERSITIES,
  SAMPLE_INDUSTRY_PARTNERS,
  JHARKHAND_DISTRICTS
} from "@/lib/constants";
import StatsCard from "@/components/ui/StatsCard";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AnalyticsDashboardPage() {
  const { t, language } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState("2026");
  const [selectedDivision, setSelectedDivision] = useState("all");

  const domainData = [
    { title: "Water Resources & Sanitation", count: 412, pct: 28.8, color: "#0284c7" },
    { title: "Agriculture & Rural Livelihoods", count: 356, pct: 24.9, color: "#16a34a" },
    { title: "Healthcare & Nutrition", count: 284, pct: 19.9, color: "#e11d48" },
    { title: "Education & Skilling", count: 198, pct: 13.9, color: "#7c3aed" },
    { title: "Environment & Mine Reclamation", count: 114, pct: 8.0, color: "#d97706" },
    { title: "Clean Energy & Urban Mobility", count: 64, pct: 4.5, color: "#2563eb" },
  ];

  const monthlyTrends = [
    { month: "Jan", submissions: 68, solved: 22 },
    { month: "Feb", submissions: 92, solved: 35 },
    { month: "Mar", submissions: 118, solved: 54 },
    { month: "Apr", submissions: 145, solved: 78 },
    { month: "May", submissions: 180, solved: 95 },
    { month: "Jun", submissions: 224, solved: 130 },
    { month: "Jul", submissions: 275, solved: 165 },
    { month: "Aug", submissions: 326, solved: 210 }
  ];

  const districtLeaderboard = [
    { name: "Latehar", division: "Palamu", challenges: 148, solved: 82, budgetCr: 2.4, rating: 4.8 },
    { name: "Ranchi", division: "South Chotanagpur", challenges: 215, solved: 140, budgetCr: 4.1, rating: 4.9 },
    { name: "Dhanbad", division: "North Chotanagpur", challenges: 184, solved: 112, budgetCr: 3.5, rating: 4.7 },
    { name: "East Singhbhum", division: "Kolhan", challenges: 162, solved: 98, budgetCr: 3.1, rating: 4.8 },
    { name: "Dumka", division: "Santhal Pargana", challenges: 135, solved: 64, budgetCr: 1.9, rating: 4.6 },
    { name: "West Singhbhum", division: "Kolhan", challenges: 122, solved: 55, budgetCr: 1.7, rating: 4.7 },
    { name: "Hazaribagh", division: "North Chotanagpur", challenges: 110, solved: 61, budgetCr: 1.5, rating: 4.5 },
    { name: "Khunti", division: "South Chotanagpur", challenges: 94, solved: 49, budgetCr: 1.2, rating: 4.6 }
  ];

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "District,Division,Challenges_Received,Resolved_Projects,Budget_Allocated_Cr,Average_Rating\n" +
      districtLeaderboard
        .map(d => `${d.name},${d.division},${d.challenges},${d.solved},${d.budgetCr},${d.rating}`)
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Jharkhand_SICP_Innovation_Analytics_2026.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem", maxWidth: "1200px" }}>
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
            📊 {language === "hi" ? "राज्य नवाचार विश्लेषण डैशबोर्ड" : "State Innovation Intelligence & Social Impact"}
          </div>
          <h1 className="heading-section">
            {language === "hi" ? "झारखंड नवाचार एवं अनुसंधान विश्लेषण" : "Jharkhand Societal Innovation Analytics"}
          </h1>
          <p className="subheading">
            Live telemetry monitoring crowdsourced challenge volume, Higher Education Institution (HEI) participation, CSR co-funding, and NEP 2020 student research engagement.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button onClick={handleExportCSV} className="btn btn-secondary btn-sm">
            📥 Export Analytics CSV
          </button>
          <Link href="/admin" className="btn btn-primary btn-sm">
            ← Back to Triage Console
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid-4" style={{ marginBottom: "2.5rem" }}>
        <StatsCard
          title="Total Challenges Logged"
          value="1,428"
          icon="📋"
          change="+18% YoY"
          subtitle="24 Districts, 260 Blocks"
          accentColor="var(--brand-primary)"
        />
        <StatsCard
          title="HEI Resolution Rate"
          value="74.2%"
          icon="⚡"
          change="+8.4% Turnaround"
          subtitle="Avg 38 days to pilot"
          accentColor="var(--brand-indigo)"
        />
        <StatsCard
          title="CSR Capital Deployed"
          value="₹18.4 Cr"
          icon="💼"
          change="5 Core Enterprise Donors"
          subtitle="Tata Steel, SAIL, CCL..."
          accentColor="var(--brand-accent)"
        />
        <StatsCard
          title="Student Capstone Credits"
          value="2,480"
          icon="🎓"
          change="NEP 2020 Experiential"
          subtitle="42 Colleges participating"
          accentColor="#10b981"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid-2" style={{ gap: "2rem", marginBottom: "2.5rem" }}>
        {/* Domain Distribution Chart */}
        <div className="card shadow-md">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>
              🥧 Thematic Domain Distribution (10 Domains)
            </h3>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>1,428 Challenges</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {domainData.map(d => (
              <div key={d.title}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                  <span style={{ fontWeight: 600 }}>{d.title}</span>
                  <span style={{ color: "var(--text-muted)" }}>{d.count} ({d.pct}%)</span>
                </div>
                <div style={{ height: "8px", background: "var(--border-light)", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ width: `${d.pct * 2.5}%`, height: "100%", background: d.color, borderRadius: "4px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Submission & Resolution Trend */}
        <div className="card shadow-md">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>
              📈 2026 Monthly Velocity Trend
            </h3>
            <span style={{ fontSize: "0.75rem", color: "var(--brand-primary)", fontWeight: 700 }}>
              ● Submissions vs ■ Solutions
            </span>
          </div>

          <div style={{ height: "220px", display: "flex", alignItems: "flex-end", gap: "1rem", paddingTop: "1rem" }}>
            {monthlyTrends.map(m => {
              const subHeight = (m.submissions / 350) * 180;
              const solHeight = (m.solved / 350) * 180;

              return (
                <div key={m.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end" }}>
                  <div style={{ display: "flex", gap: "3px", alignItems: "flex-end", height: "180px", width: "100%", justifyContent: "center" }}>
                    <div
                      title={`Submissions: ${m.submissions}`}
                      style={{
                        width: "45%",
                        height: `${subHeight}px`,
                        background: "var(--brand-primary)",
                        borderRadius: "3px 3px 0 0"
                      }}
                    />
                    <div
                      title={`Solved: ${m.solved}`}
                      style={{
                        width: "45%",
                        height: `${solHeight}px`,
                        background: "var(--brand-accent)",
                        borderRadius: "3px 3px 0 0"
                      }}
                    />
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.4rem" }}>
                    {m.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 24 District Performance Table */}
      <div className="card shadow-md" style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>
              📍 District-Wise Innovation & Deployment Leaderboard
            </h3>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: 0 }}>
              Ranked by citizen problem volume and university solution deployment rates.
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            {["all", "South Chotanagpur", "North Chotanagpur", "Kolhan", "Santhal Pargana", "Palamu"].map(div => (
              <button
                key={div}
                onClick={() => setSelectedDivision(div)}
                className={`btn btn-sm ${selectedDivision === div ? "btn-primary" : "btn-secondary"}`}
                style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem" }}
              >
                {div === "all" ? "All Divisions" : div}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border-medium)", textAlign: "left", color: "var(--text-muted)", fontSize: "0.78rem" }}>
                <th style={{ padding: "0.75rem" }}>DISTRICT</th>
                <th style={{ padding: "0.75rem" }}>DIVISION</th>
                <th style={{ padding: "0.75rem" }}>CHALLENGES</th>
                <th style={{ padding: "0.75rem" }}>SOLVED / PILOTS</th>
                <th style={{ padding: "0.75rem" }}>CSR BUDGET</th>
                <th style={{ padding: "0.75rem" }}>CITIZEN RATING</th>
                <th style={{ padding: "0.75rem" }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {districtLeaderboard
                .filter(d => selectedDivision === "all" || d.division === selectedDivision)
                .map(d => (
                  <tr key={d.name} style={{ borderBottom: "1px solid var(--border-light)" }}>
                    <td style={{ padding: "0.75rem", fontWeight: 700 }}>{d.name}</td>
                    <td style={{ padding: "0.75rem", color: "var(--text-muted)" }}>{d.division}</td>
                    <td style={{ padding: "0.75rem", fontWeight: 600 }}>{d.challenges}</td>
                    <td style={{ padding: "0.75rem" }}>
                      <span className="badge badge-validated">{d.solved} Deployed</span>
                    </td>
                    <td style={{ padding: "0.75rem", fontWeight: 700, color: "var(--brand-primary)" }}>
                      ₹{d.budgetCr} Cr
                    </td>
                    <td style={{ padding: "0.75rem" }}>
                      ⭐ {d.rating}/5.0
                    </td>
                    <td style={{ padding: "0.75rem" }}>
                      <Link href={`/admin?district=${d.name.toLowerCase()}`} className="btn btn-secondary btn-sm" style={{ padding: "0.2rem 0.5rem", fontSize: "0.75rem" }}>
                        View Queue →
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* University & HEI R&D Engagement Table */}
      <div className="grid-2" style={{ gap: "2rem" }}>
        <div className="card shadow-md">
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>
            🎓 Top Participating Universities (HEIs)
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {JHARKHAND_UNIVERSITIES.slice(0, 5).map(u => (
              <div key={u.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6rem", background: "var(--bg-main)", borderRadius: "var(--radius-sm)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{ fontSize: "1.3rem" }}>{u.avatar}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.88rem" }}>{u.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{u.studentsRegistered} Students • {u.facultyCount} Faculty PIs</div>
                  </div>
                </div>
                <span className="badge badge-assigned">{u.activeProjects} Active Projects</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card shadow-md">
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>
            🏭 Industry CSR Co-Funders & Grant Partners
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {SAMPLE_INDUSTRY_PARTNERS.map(ind => (
              <div key={ind.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6rem", background: "var(--bg-main)", borderRadius: "var(--radius-sm)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{ fontSize: "1.3rem" }}>{ind.logo}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.88rem" }}>{ind.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{ind.location} • {ind.category}</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 800, color: "var(--brand-accent)", fontSize: "0.9rem" }}>₹{ind.fundingOfferedCr} Cr</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{ind.mentorsProvided} Mentors</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
