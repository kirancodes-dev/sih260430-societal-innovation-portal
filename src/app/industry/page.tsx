"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  INITIAL_MOCK_CHALLENGES,
  SAMPLE_INDUSTRY_PARTNERS,
  THEMATIC_DOMAINS
} from "@/lib/constants";
import StatsCard from "@/components/ui/StatsCard";
import ChallengeCard from "@/components/ui/ChallengeCard";

export default function IndustryPortalPage() {
  const [selectedDomain, setSelectedDomain] = useState("all");

  const openForPartnership = INITIAL_MOCK_CHALLENGES.filter(
    c => selectedDomain === "all" || c.category === selectedDomain
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
            background: "var(--brand-accent-light)",
            borderRadius: "var(--radius-full)",
            color: "var(--brand-accent-hover)",
            fontSize: "0.8rem",
            fontWeight: 700,
            marginBottom: "0.5rem"
          }}>
            🏭 Industry, Startup & CSR Innovation Hub
          </div>
          <h1 className="heading-section">Industry & CSR Partnership Marketplace</h1>
          <p className="subheading">
            Connect corporate CSR capital, startup innovation, and MSME manufacturing with university R&D to scale grassroots solutions across Jharkhand.
          </p>
        </div>

        <Link href="#opportunities" className="btn btn-accent">
          🤝 Browse Co-Funding Opportunities
        </Link>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: "2.5rem" }}>
        <StatsCard
          title="Active Industry Partners"
          value="38"
          icon="🏭"
          change="Enterprises & Startups"
          subtitle="Tata Steel, SAIL, CCL, MSMEs"
          accentColor="var(--brand-accent)"
        />
        <StatsCard
          title="Total CSR Capital Pledged"
          value="₹18.4 Cr"
          icon="💰"
          change="+₹3.2 Cr in 2026"
          subtitle="Direct university grants"
          accentColor="var(--brand-primary)"
        />
        <StatsCard
          title="Corporate Mentors"
          value="74"
          icon="🧑‍💼"
          subtitle="Technical advisors & engineers"
          accentColor="var(--brand-indigo)"
        />
        <StatsCard
          title="Commercial Pilots"
          value="19"
          icon="🚀"
          change="Scaling to 240 Blocks"
          subtitle="On-ground deployment"
          accentColor="#10b981"
        />
      </div>

      {/* Featured Corporate CSR Partners */}
      <section style={{ marginBottom: "3.5rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.25rem" }}>
          Leading Corporate & Startup Ecosystem Partners
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
          {SAMPLE_INDUSTRY_PARTNERS.map(p => (
            <div key={p.id} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "2rem" }}>{p.logo}</span>
                  <div>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700 }}>{p.name}</h4>
                    <span style={{ fontSize: "0.75rem", color: "var(--brand-primary)", fontWeight: 600 }}>
                      📍 {p.location} • {p.category}
                    </span>
                  </div>
                </div>

                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                  <strong>CSR Focus:</strong> {p.focusDomains.join(", ")}
                </div>
              </div>

              <div style={{
                borderTop: "1px solid var(--border-light)",
                paddingTop: "0.75rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "0.85rem"
              }}>
                <span style={{ fontWeight: 700, color: "var(--brand-accent)" }}>
                  ₹{p.fundingOfferedCr} Cr Committed
                </span>
                <span style={{ fontSize: "0.78rem", color: "var(--text-light)" }}>
                  {p.mentorsProvided} Mentors Assigned
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Open Collaboration Opportunities */}
      <section id="opportunities">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700 }}>
              Societal Projects Seeking Industry Partnership & Co-Development
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Pick a challenge to offer mentorship, grant funding, or prototyping pilot sites.
            </p>
          </div>

          <select
            className="form-select"
            style={{ width: "auto", minWidth: "220px" }}
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
          >
            <option value="all">All Domains ({THEMATIC_DOMAINS.length})</option>
            {THEMATIC_DOMAINS.map(d => (
              <option key={d.id} value={d.title}>{d.title}</option>
            ))}
          </select>
        </div>

        <div className="grid-auto-fit">
          {openForPartnership.map(c => (
            <ChallengeCard
              key={c.id}
              challenge={c}
              role="industry"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
