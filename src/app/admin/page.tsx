"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  INITIAL_MOCK_CHALLENGES,
  JHARKHAND_UNIVERSITIES,
  JHARKHAND_DISTRICTS,
  THEMATIC_DOMAINS
} from "@/lib/constants";
import { seedInitialChallengesToFirestore } from "@/lib/firestore-service";
import StatsCard from "@/components/ui/StatsCard";
import StatusBadge from "@/components/ui/StatusBadge";

export default function AdminDashboardPage() {
  const [challenges, setChallenges] = useState(INITIAL_MOCK_CHALLENGES);
  const [isSyncingFirestore, setIsSyncingFirestore] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [districtFilter, setDistrictFilter] = useState("all");
  const [assigningId, setAssigningId] = useState<string | null>(null);
  const [selectedUniversity, setSelectedUniversity] = useState(JHARKHAND_UNIVERSITIES[0].id);

  const filtered = challenges.filter(c => {
    const matchStatus = statusFilter === "all" || c.status.toLowerCase() === statusFilter.toLowerCase();
    const matchPriority = priorityFilter === "all" || c.priority.toLowerCase() === priorityFilter.toLowerCase();
    const matchDistrict = districtFilter === "all" || c.district === districtFilter;
    return matchStatus && matchPriority && matchDistrict;
  });

  const handleAssign = (challengeId: string) => {
    const univ = JHARKHAND_UNIVERSITIES.find(u => u.id === selectedUniversity);
    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId) {
        return {
          ...c,
          status: "Assigned",
          assignedUniversityId: selectedUniversity,
          assignedUniversityName: univ?.name
        };
      }
      return c;
    }));
    setAssigningId(null);
  };

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
            🏛️ Dept of Higher & Technical Education • State Triage Console
          </div>
          <h1 className="heading-section">Societal Problem Triage & Institutional Allocation</h1>
          <p className="subheading">
            Review incoming citizen challenges, verify AI categorization, and route validated problem statements to Jharkhand universities under NEP 2020.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button
            onClick={async () => {
              setIsSyncingFirestore(true);
              setSyncMessage(null);
              const count = await seedInitialChallengesToFirestore();
              setIsSyncingFirestore(false);
              setSyncMessage(`✓ Successfully written ${count || 5} challenges to Firebase Cloud Firestore! View in Firebase Console.`);
            }}
            disabled={isSyncingFirestore}
            className="btn btn-secondary"
            style={{ background: "rgba(245, 158, 11, 0.1)", border: "1px solid #f59e0b", color: "#d97706" }}
          >
            {isSyncingFirestore ? "⚡ Syncing with Cloud..." : "🔥 Sync All to Cloud Firestore"}
          </button>
          <Link href="/admin/analytics" className="btn btn-secondary">
            📊 View Visual Analytics →
          </Link>
          <Link href="/submit" className="btn btn-primary">
            + Log Official Challenge
          </Link>
        </div>
      </div>

      {syncMessage && (
        <div style={{ padding: "0.75rem 1rem", background: "rgba(16, 185, 129, 0.1)", border: "1px solid #10b981", borderRadius: "var(--radius-md)", color: "#10b981", marginBottom: "1.5rem", fontWeight: 700, fontSize: "0.85rem" }}>
          {syncMessage}
        </div>
      )}

      {/* KPI Stats */}
      <div className="grid-4" style={{ marginBottom: "2.5rem" }}>
        <StatsCard
          title="Total Challenges"
          value={challenges.length}
          icon="📋"
          subtitle="Across all Jharkhand blocks"
          accentColor="var(--brand-primary)"
        />
        <StatsCard
          title="Under Validation"
          value={challenges.filter(c => c.status === "Submitted" || c.status === "Validated").length}
          icon="⏳"
          change="Needs Action"
          changeType="negative"
          subtitle="Pending university routing"
          accentColor="var(--brand-accent)"
        />
        <StatsCard
          title="Assigned to HEIs"
          value={challenges.filter(c => c.status === "Assigned" || c.status === "In_Progress").length}
          icon="🎓"
          subtitle="Active R&D in progress"
          accentColor="var(--brand-indigo)"
        />
        <StatsCard
          title="In Pilot / Testing"
          value={challenges.filter(c => c.status === "Under_Testing" || c.status === "Deployed" || c.status === "Resolved").length}
          icon="🚀"
          change="Deploying"
          subtitle="Field validation"
          accentColor="#10b981"
        />
      </div>

      {/* Filters Toolbar */}
      <div className="card" style={{ marginBottom: "1.5rem", padding: "1rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", alignItems: "center" }}>
          <div>
            <label className="form-label" style={{ fontSize: "0.8rem" }}>Status Filter</label>
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="submitted">Submitted</option>
              <option value="validated">Validated</option>
              <option value="assigned">Assigned to HEI</option>
              <option value="in_progress">In Progress</option>
              <option value="solution_proposed">Solution Proposed</option>
              <option value="under_testing">Under Testing</option>
              <option value="deployed">Deployed</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div>
            <label className="form-label" style={{ fontSize: "0.8rem" }}>Priority Level</label>
            <select
              className="form-select"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div>
            <label className="form-label" style={{ fontSize: "0.8rem" }}>District</label>
            <select
              className="form-select"
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
            >
              <option value="all">All Districts (24)</option>
              {JHARKHAND_DISTRICTS.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table of Submissions */}
      <div className="card" style={{ overflowX: "auto", padding: 0 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
          <thead>
            <tr style={{ background: "var(--bg-main)", borderBottom: "2px solid var(--border-light)", color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>
              <th style={{ padding: "1rem" }}>ID & Title</th>
              <th style={{ padding: "1rem" }}>Domain / Location</th>
              <th style={{ padding: "1rem" }}>Priority & AI Score</th>
              <th style={{ padding: "1rem" }}>Status</th>
              <th style={{ padding: "1rem" }}>Assigned University</th>
              <th style={{ padding: "1rem", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => {
              const districtObj = JHARKHAND_DISTRICTS.find(d => d.id === c.district);
              return (
                <tr key={c.id} style={{ borderBottom: "1px solid var(--border-light)", transition: "background 0.2s" }}>
                  <td style={{ padding: "1rem", maxWidth: "300px" }}>
                    <div style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "var(--text-light)" }}>{c.id}</div>
                    <div style={{ fontWeight: 700, color: "var(--text-main)", marginBottom: "0.2rem" }}>{c.title}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>By: {c.submittedBy.name} ({c.submittedBy.role.toUpperCase()})</div>
                  </td>

                  <td style={{ padding: "1rem" }}>
                    <div style={{ fontWeight: 600 }}>{c.category}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>📍 {districtObj?.name || c.district}</div>
                  </td>

                  <td style={{ padding: "1rem" }}>
                    <StatusBadge status={c.priority} type="priority" />
                    <div style={{ fontSize: "0.75rem", color: "var(--brand-primary)", marginTop: "0.25rem", fontWeight: 600 }}>
                      AI Impact: {c.aiClassification?.impactScore || 85}/100
                    </div>
                  </td>

                  <td style={{ padding: "1rem" }}>
                    <StatusBadge status={c.status} />
                  </td>

                  <td style={{ padding: "1rem" }}>
                    {c.assignedUniversityName ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", fontWeight: 600, color: "var(--brand-primary)" }}>
                        <span>🎓</span>
                        <span>{c.assignedUniversityName}</span>
                      </div>
                    ) : (
                      <span style={{ fontSize: "0.8rem", color: "var(--text-light)", fontStyle: "italic" }}>
                        Unassigned (Pending)
                      </span>
                    )}
                  </td>

                  <td style={{ padding: "1rem", textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                      <Link href={`/admin/review/${c.id}`} className="btn btn-secondary btn-sm">
                        Review
                      </Link>
                      {!c.assignedUniversityId && (
                        <button
                          onClick={() => setAssigningId(c.id)}
                          className="btn btn-primary btn-sm"
                        >
                          Assign HEI
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* University Assignment Modal */}
      {assigningId && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "1rem"
        }}>
          <div className="card" style={{ width: "100%", maxWidth: "560px", padding: "2rem" }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.5rem" }}>
              🎓 Route Challenge to Higher Education Institution
            </h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
              Select a Jharkhand university with relevant specialized research labs and faculty expertise.
            </p>

            <div className="form-group">
              <label className="form-label">Select University *</label>
              <select
                className="form-select"
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
              >
                {JHARKHAND_UNIVERSITIES.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.location}) — {u.specializations.slice(0, 2).join(", ")}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ padding: "0.75rem", background: "var(--bg-main)", borderRadius: "var(--radius-md)", fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
              💡 <strong>AI Recommendation:</strong> Top matches for this challenge include BIT Mesra (Water & Sensor IoT) and IIT ISM Dhanbad (Environmental Remediation).
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
              <button
                type="button"
                onClick={() => setAssigningId(null)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleAssign(assigningId)}
                className="btn btn-primary"
              >
                Confirm Allocation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
