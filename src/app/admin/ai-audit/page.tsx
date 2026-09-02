"use client";

import React, { useState } from "react";
import Link from "next/link";
import StatsCard from "@/components/ui/StatsCard";

interface OverrideLog {
  id: string;
  challengeId: string;
  originalCategory: string;
  humanCategory: string;
  confidence: number;
  adminName: string;
  timestamp: string;
  reason: string;
}

export default function AIAuditAndFairnessPage() {
  const [overrideLogs, setOverrideLogs] = useState<OverrideLog[]>([
    {
      id: "ovr-1",
      challengeId: "CH-JH-2026-002",
      originalCategory: "Agriculture",
      humanCategory: "Rural Livelihoods",
      confidence: 0.81,
      adminName: "Dr. Arvind Kumar (IAS)",
      timestamp: "2026-08-19 14:30",
      reason: "Re-routed to Minor Forest Produce track under Birsa Harit Gram Yojana rather than crop agriculture."
    },
    {
      id: "ovr-2",
      challengeId: "CH-JH-2026-004",
      originalCategory: "Accessibility",
      humanCategory: "Education & Skilling",
      confidence: 0.76,
      adminName: "Shri Rajesh Prasad (DITEG)",
      timestamp: "2026-08-23 11:15",
      reason: "Classified Ol Chiki bilingual content under NEP 2020 multilingual education curriculum."
    }
  ]);

  return (
    <div className="container" style={{ padding: "3.5rem 1.5rem", maxWidth: "1150px" }}>
      <div style={{ marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
        <Link href="/admin">← Back to Admin Console</Link> / <span style={{ color: "var(--text-main)" }}>AI Ethics & Human-in-the-Loop Audit</span>
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
            🤖 AI Governance, Explainability (XAI) & Model Health Center
          </div>
          <h1 className="heading-section">AI Triage Fairness & Human Override Telemetry</h1>
          <p className="subheading">
            Continuous auditing of Natural Language Processing models for bias mitigation across 24 Jharkhand districts, tribal languages (Ol Chiki/Mundari), and human-in-the-loop override feedback loops.
          </p>
        </div>

        <button className="btn btn-secondary btn-sm" onClick={() => alert("Triggered quarterly model fine-tuning with 142 logged human overrides.")}>
          🔄 Trigger Model Retraining Pipeline
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid-4" style={{ marginBottom: "2.5rem" }}>
        <StatsCard
          title="Model Precision & F1"
          value="94.6%"
          icon="🎯"
          change="+2.1% after August Retraining"
          subtitle="Top 10 domain classifier"
          accentColor="var(--brand-primary)"
        />
        <StatsCard
          title="Bias Mitigation Score"
          value="98.2 / 100"
          icon="⚖️"
          change="Fairness Verified"
          subtitle="Equal coverage across 24 districts"
          accentColor="#10b981"
        />
        <StatsCard
          title="Human Overrides Logged"
          value={overrideLogs.length}
          icon="🧑‍💼"
          change="1.2% Override Rate"
          subtitle="Active feedback loops"
          accentColor="var(--brand-accent)"
        />
        <StatsCard
          title="Semantic Dedup Accuracy"
          value="96.8%"
          icon="🔍"
          change="Cosine Embedding >0.85"
          subtitle="Zero false duplicate merges"
          accentColor="var(--brand-indigo)"
        />
      </div>

      {/* Fairness & Explainability Breakdown Grid */}
      <div className="grid-2" style={{ gap: "2rem", marginBottom: "2.5rem" }}>
        {/* District Representation Fairness */}
        <div className="card shadow-md">
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "1rem" }}>
            📍 Regional & Tribal Demographic Fairness Index
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
            Evaluates model classification confidence parity between urban centers and remote tribal habitations.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { region: "South Chotanagpur (Ranchi, Khunti, Gumla)", score: 98.4, status: "Optimal" },
              { region: "Santhal Pargana (Dumka, Pakur, Godda)", score: 97.9, status: "Optimal" },
              { region: "Kolhan (East/West Singhbhum, Seraikela)", score: 98.1, status: "Optimal" },
              { region: "Palamu (Latehar, Garhwa, Medininagar)", score: 98.6, status: "Optimal" },
              { region: "North Chotanagpur (Dhanbad, Bokaro, Hazaribagh)", score: 98.2, status: "Optimal" }
            ].map(r => (
              <div key={r.region}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                  <span style={{ fontWeight: 600 }}>{r.region}</span>
                  <span style={{ color: "#10b981", fontWeight: 700 }}>{r.score}% ({r.status})</span>
                </div>
                <div style={{ height: "6px", background: "var(--border-light)", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ width: `${r.score}%`, height: "100%", background: "#10b981", borderRadius: "3px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explainability Engine Architecture */}
        <div className="card shadow-md" style={{ borderLeft: "4px solid var(--brand-indigo)" }}>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "1rem" }}>
            🧠 Explainable AI (XAI) Architecture
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1rem" }}>
            Every automated classification exposes full explainability parameters before routing to universities:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem", fontSize: "0.85rem" }}>
            <div style={{ padding: "0.6rem", background: "var(--bg-main)", borderRadius: "var(--radius-sm)" }}>
              <strong>1. Token Feature Weights:</strong> TF-IDF and transformer attention scores highlight why a domain was selected.
            </div>
            <div style={{ padding: "0.6rem", background: "var(--bg-main)", borderRadius: "var(--radius-sm)" }}>
              <strong>2. Priority Formula Transparency:</strong> Breakdown of Urgency (40%), Demographics (30%), SDGs (20%), and Recency (10%).
            </div>
            <div style={{ padding: "0.6rem", background: "var(--bg-main)", borderRadius: "var(--radius-sm)" }}>
              <strong>3. State Scheme Matching:</strong> Direct correlation with 6 active Jharkhand welfare & infrastructure initiatives.
            </div>
          </div>
        </div>
      </div>

      {/* Human-in-the-Loop Override Logs */}
      <div className="card shadow-md">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800 }}>Human-in-the-Loop (HITL) Override Audit Log</h2>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Administrative adjustments queued for quarterly fine-tuning
            </span>
          </div>
          <span className="badge badge-validated">Retraining Queue Active</span>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--border-medium)", textAlign: "left", color: "var(--text-muted)", fontSize: "0.78rem" }}>
              <th style={{ padding: "0.75rem" }}>CHALLENGE ID</th>
              <th style={{ padding: "0.75rem" }}>AI PREDICTION</th>
              <th style={{ padding: "0.75rem" }}>HUMAN CORRECTION</th>
              <th style={{ padding: "0.75rem" }}>OVERRIDE REASON</th>
              <th style={{ padding: "0.75rem" }}>OFFICER</th>
              <th style={{ padding: "0.75rem" }}>DATE</th>
            </tr>
          </thead>
          <tbody>
            {overrideLogs.map(log => (
              <tr key={log.id} style={{ borderBottom: "1px solid var(--border-light)" }}>
                <td style={{ padding: "0.75rem", fontFamily: "monospace", fontWeight: 700 }}>{log.challengeId}</td>
                <td style={{ padding: "0.75rem", color: "var(--brand-danger)" }}>{log.originalCategory} ({Math.round(log.confidence * 100)}%)</td>
                <td style={{ padding: "0.75rem", color: "var(--brand-primary)", fontWeight: 700 }}>{log.humanCategory}</td>
                <td style={{ padding: "0.75rem", color: "var(--text-muted)", fontSize: "0.82rem" }}>{log.reason}</td>
                <td style={{ padding: "0.75rem" }}>{log.adminName}</td>
                <td style={{ padding: "0.75rem", color: "var(--text-light)", fontSize: "0.78rem" }}>{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
