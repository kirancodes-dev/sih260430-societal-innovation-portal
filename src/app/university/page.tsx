"use client";

import React from "react";
import Link from "next/link";
import { INITIAL_MOCK_CHALLENGES, JHARKHAND_UNIVERSITIES } from "@/lib/constants";
import StatsCard from "@/components/ui/StatsCard";
import StatusBadge from "@/components/ui/StatusBadge";
import { useAuth } from "@/contexts/AuthContext";

export default function UniversityWorkspacePage() {
  const { user } = useAuth();
  const currentUniv = JHARKHAND_UNIVERSITIES[0]; // BIT Mesra default

  const assignedChallenges = INITIAL_MOCK_CHALLENGES.filter(
    c => c.assignedUniversityId === "bit-mesra" || c.status === "Assigned" || c.status === "In_Progress"
  );

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }}>
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
            🎓 Higher Education Institution (HEI) • NEP 2020 Experiential Innovation Cell
          </div>
          <h1 className="heading-section">{currentUniv.name}</h1>
          <p className="subheading">
            Constitutes multidisciplinary student and faculty teams to build real-world prototypes for assigned Jharkhand societal challenges.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link href="/industry" className="btn btn-secondary">
            🤝 Find Industry Co-Funders
          </Link>
          <Link href="#assigned" className="btn btn-primary">
            📋 Assigned Challenge Queue ({assignedChallenges.length})
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid-4" style={{ marginBottom: "2.5rem" }}>
        <StatsCard
          title="Assigned Challenges"
          value={assignedChallenges.length}
          icon="📋"
          subtitle="From Govt of Jharkhand"
          accentColor="var(--brand-primary)"
        />
        <StatsCard
          title="Active Project Teams"
          value="14"
          icon="👥"
          change="850 Students"
          subtitle="Multidisciplinary cohorts"
          accentColor="var(--brand-indigo)"
        />
        <StatsCard
          title="Industry Co-Sponsors"
          value="6"
          icon="🏭"
          change="₹2.8 Cr Grant"
          subtitle="Tata Steel, CCL & Startups"
          accentColor="var(--brand-accent)"
        />
        <StatsCard
          title="Patents & IP in Progress"
          value="8"
          icon="💡"
          change="3 Pilot Deployed"
          subtitle="Commercialization stage"
          accentColor="#10b981"
        />
      </div>

      {/* Assigned Challenges Queue */}
      <section id="assigned" style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700 }}>
            Assigned Societal Challenges for R&D
          </h2>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Showing challenges allocated by State Triage
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {assignedChallenges.map(c => (
            <div key={c.id} className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                    <span style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "var(--text-light)" }}>{c.id}</span>
                    <StatusBadge status={c.status} />
                    <StatusBadge status={c.priority} type="priority" />
                  </div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-main)" }}>
                    {c.title}
                  </h3>
                </div>

                <Link href={`/university/project/${c.id}`} className="btn btn-primary btn-sm">
                  Open Project Workspace →
                </Link>
              </div>

              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                {c.description}
              </p>

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
                paddingTop: "0.75rem",
                borderTop: "1px solid var(--border-light)",
                fontSize: "0.82rem",
                color: "var(--text-muted)"
              }}>
                <div style={{ display: "flex", gap: "1.25rem" }}>
                  <span>📂 {c.category}</span>
                  <span>📍 District: <strong>{c.district.toUpperCase()}</strong></span>
                  <span>🎯 AI Impact Score: <strong>{c.aiClassification?.impactScore || 90}/100</strong></span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "var(--brand-primary)", fontWeight: 600 }}>
                    👥 Faculty Mentors: 2 Assigned
                  </span>
                  <span>•</span>
                  <span>5 Student Innovators</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Multidisciplinary Team Constituent Guide */}
      <div className="card" style={{ background: "linear-gradient(135deg, rgba(4,120,87,0.05) 0%, rgba(67,56,202,0.05) 100%)", border: "1.5px solid var(--brand-primary)" }}>
        <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          💡 NEP 2020 Experiential Learning Framework
        </h3>
        <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "1rem", lineHeight: 1.6 }}>
          Under the National Education Policy 2020 guidelines, student teams working on approved societal challenges receive academic credits for capstone projects, access to state prototyping fabrication labs, and direct industry mentor review.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.8rem", padding: "0.3rem 0.75rem", background: "var(--bg-card)", borderRadius: "var(--radius-full)", border: "1px solid var(--border-medium)" }}>
            ✓ 6 Capstone Academic Credits
          </span>
          <span style={{ fontSize: "0.8rem", padding: "0.3rem 0.75rem", background: "var(--bg-card)", borderRadius: "var(--radius-full)", border: "1px solid var(--border-medium)" }}>
            ✓ Prototyping FabLab Access
          </span>
          <span style={{ fontSize: "0.8rem", padding: "0.3rem 0.75rem", background: "var(--bg-card)", borderRadius: "var(--radius-full)", border: "1px solid var(--border-medium)" }}>
            ✓ State Patent Filing Assistance
          </span>
        </div>
      </div>
    </div>
  );
}
