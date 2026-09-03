"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { INITIAL_MOCK_CHALLENGES, THEMATIC_DOMAINS, JHARKHAND_DISTRICTS } from "@/lib/constants";
import StatusBadge from "@/components/ui/StatusBadge";
import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function AnalystDepartmentDashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [challenges, setChallenges] = useState<any[]>(INITIAL_MOCK_CHALLENGES);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"pending" | "in_progress" | "resolved" | "all">("all");
  const [actionAlert, setActionAlert] = useState<string | null>(null);

  // Determine officer department based on email or profile
  const email = (user?.email || "").toLowerCase();
  
  let departmentName = "State Multi-Sectoral Innovation Cell";
  let domainFilter = "all";
  let departmentIcon = "🏛️";

  if (email.includes("transport") || email.includes("road") || email.includes("pwd")) {
    departmentName = "Road Construction & Transport Department";
    domainFilter = "Urban Infrastructure & Smart Mobility";
    departmentIcon = "🚗";
  } else if (email.includes("water") || email.includes("jal") || email.includes("sanitation")) {
    departmentName = "Drinking Water & Sanitation Department (JJM)";
    domainFilter = "Water Resources & Smart Irrigation";
    departmentIcon = "💧";
  } else if (email.includes("health") || email.includes("medical") || email.includes("aiims")) {
    departmentName = "Health, Medical Education & Family Welfare";
    domainFilter = "Healthcare Accessibility & Telemedicine";
    departmentIcon = "🏥";
  } else if (email.includes("agri") || email.includes("kisan") || email.includes("bau")) {
    departmentName = "Agriculture, Animal Husbandry & Rural Development";
    domainFilter = "Agriculture & Forest Produce Innovation";
    departmentIcon = "🌾";
  } else if (email.includes("bitmesra") || email.includes("univ") || email.includes("research")) {
    departmentName = "Academic Research & Technology Innovation (HEI)";
    domainFilter = "all";
    departmentIcon = "🎓";
  } else {
    departmentName = "Chief State Innovation & Triage Directorate";
    domainFilter = "all";
    departmentIcon = "🏛️";
  }

  // Fetch Firestore challenges
  useEffect(() => {
    async function loadData() {
      try {
        if (db) {
          const snap = await getDocs(collection(db, "challenges"));
          if (!snap.empty) {
            const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            setChallenges(list);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Firestore fetch fallback:", err);
      }
      setChallenges(INITIAL_MOCK_CHALLENGES);
      setLoading(false);
    }
    loadData();
  }, []);

  // Filter issues relevant to this officer/department
  const relevantChallenges = challenges.filter(c => {
    if (domainFilter === "all") return true;
    const domain = (c.domain || "").toLowerCase();
    const title = (c.title || "").toLowerCase();
    const desc = (c.description || "").toLowerCase();

    if (domainFilter.includes("Transport")) {
      return domain.includes("urban") || domain.includes("transport") || title.includes("road") || desc.includes("bridge") || title.includes("traffic");
    }
    if (domainFilter.includes("Water")) {
      return domain.includes("water") || title.includes("fluoride") || title.includes("water") || desc.includes("pump");
    }
    if (domainFilter.includes("Health")) {
      return domain.includes("health") || title.includes("sickle") || desc.includes("doctor") || title.includes("hospital");
    }
    if (domainFilter.includes("Agri")) {
      return domain.includes("agri") || domain.includes("forest") || title.includes("crop") || desc.includes("farmer");
    }
    return true;
  });

  const tabFiltered = activeTab === "all"
    ? relevantChallenges
    : relevantChallenges.filter(c => {
        if (activeTab === "pending") return c.status === "submitted" || c.status === "under_review";
        if (activeTab === "in_progress") return c.status === "in_progress" || c.status === "assigned" || c.status === "testing";
        if (activeTab === "resolved") return c.status === "deployed" || c.status === "resolved";
        return true;
      });

  const handleUpdateStatus = async (id: string, newStatus: string, statusText: string) => {
    try {
      if (db) {
        await updateDoc(doc(db, "challenges", id), {
          status: newStatus,
          lastUpdated: new Date().toISOString(),
          officerInCharge: user?.displayName || user?.email || "Department Nodal Officer"
        });
      }
    } catch (err) {
      console.warn("Firestore update error:", err);
    }

    setChallenges(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    setActionAlert(`✅ Issue #${id} status updated to "${statusText}" and synced in real-time!`);
    setTimeout(() => setActionAlert(null), 5000);
  };

  return (
    <div className="container" style={{ padding: "2rem 1rem 5rem", maxWidth: "1250px" }}>
      {/* High-End Glassmorphism Officer HUD Header */}
      <div className="card shadow-lg" style={{
        background: "linear-gradient(135deg, #064e3b 0%, #047857 50%, #0f766e 100%)",
        color: "#ffffff",
        padding: "1.75rem 1.25rem",
        borderRadius: "var(--radius-xl)",
        marginBottom: "1.75rem",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 20px 40px -10px rgba(4, 120, 87, 0.4)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.8rem",
              border: "1px solid rgba(255,255,255,0.3)"
            }}>
              {departmentIcon}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, background: "rgba(255,255,255,0.25)", padding: "0.2rem 0.6rem", borderRadius: "20px", letterSpacing: "0.04em" }}>
                  OFFICIAL NODAL WORKSPACE
                </span>
                <span style={{ fontSize: "0.75rem", color: "#a7f3d0" }}>
                  🟢 Live Active Session
                </span>
              </div>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 900, marginTop: "0.3rem", lineHeight: 1.2 }}>
                {departmentName}
              </h1>
              <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.85)", marginTop: "2px" }}>
                Logged in as: <strong>{user?.email || "officer@jharkhand.gov.in"}</strong> ({user?.displayName || "Nodal Authority"})
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <Link href="/accountability" className="btn btn-sm" style={{ background: "rgba(255,255,255,0.2)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.3)" }}>
              📊 State Accountability Matrix
            </Link>
            <button
              onClick={() => { logout(); router.push("/login"); }}
              className="btn btn-sm"
              style={{ background: "rgba(239,68,68,0.25)", color: "#ffffff", border: "1px solid rgba(239,68,68,0.4)" }}
            >
              🔒 Sign Out
            </button>
          </div>
        </div>

        {/* Quick Department Stats Row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
          gap: "0.75rem",
          marginTop: "1.5rem",
          paddingTop: "1.25rem",
          borderTop: "1px solid rgba(255,255,255,0.15)"
        }}>
          <div style={{ background: "rgba(255,255,255,0.1)", padding: "0.6rem 0.8rem", borderRadius: "10px" }}>
            <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.75)" }}>Assigned to Dept</div>
            <div style={{ fontSize: "1.3rem", fontWeight: 900 }}>{relevantChallenges.length}</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.1)", padding: "0.6rem 0.8rem", borderRadius: "10px" }}>
            <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.75)" }}>Awaiting Triage</div>
            <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#fef08a" }}>
              {relevantChallenges.filter(c => c.status === "submitted" || c.status === "under_review").length}
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.1)", padding: "0.6rem 0.8rem", borderRadius: "10px" }}>
            <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.75)" }}>In R&D / Field Pilot</div>
            <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#93c5fd" }}>
              {relevantChallenges.filter(c => c.status === "in_progress" || c.status === "assigned" || c.status === "testing").length}
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.1)", padding: "0.6rem 0.8rem", borderRadius: "10px" }}>
            <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.75)" }}>Resolved & Deployed</div>
            <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#86efac" }}>
              {relevantChallenges.filter(c => c.status === "deployed" || c.status === "resolved").length}
            </div>
          </div>
        </div>
      </div>

      {actionAlert && (
        <div style={{
          background: "var(--brand-primary-light)",
          border: "1.5px solid var(--brand-primary)",
          borderRadius: "var(--radius-md)",
          padding: "0.85rem 1rem",
          color: "var(--brand-primary)",
          fontWeight: 800,
          fontSize: "0.9rem",
          marginBottom: "1.5rem"
        }}>
          {actionAlert}
        </div>
      )}

      {/* Filter Tabs & Search Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
        <div style={{ display: "flex", gap: "0.4rem", background: "var(--bg-card)", padding: "0.3rem", borderRadius: "var(--radius-full)", border: "1px solid var(--border-medium)" }}>
          <button
            onClick={() => setActiveTab("all")}
            className={`btn btn-sm ${activeTab === "all" ? "btn-primary" : "btn-secondary"}`}
            style={{ borderRadius: "var(--radius-full)", fontSize: "0.78rem" }}
          >
            All Assigned ({relevantChallenges.length})
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`btn btn-sm ${activeTab === "pending" ? "btn-primary" : "btn-secondary"}`}
            style={{ borderRadius: "var(--radius-full)", fontSize: "0.78rem" }}
          >
            Pending Review ({relevantChallenges.filter(c => c.status === "submitted" || c.status === "under_review").length})
          </button>
          <button
            onClick={() => setActiveTab("in_progress")}
            className={`btn btn-sm ${activeTab === "in_progress" ? "btn-primary" : "btn-secondary"}`}
            style={{ borderRadius: "var(--radius-full)", fontSize: "0.78rem" }}
          >
            In Execution ({relevantChallenges.filter(c => c.status === "in_progress" || c.status === "assigned" || c.status === "testing").length})
          </button>
          <button
            onClick={() => setActiveTab("resolved")}
            className={`btn btn-sm ${activeTab === "resolved" ? "btn-primary" : "btn-secondary"}`}
            style={{ borderRadius: "var(--radius-full)", fontSize: "0.78rem" }}
          >
            Resolved ({relevantChallenges.filter(c => c.status === "deployed" || c.status === "resolved").length})
          </button>
        </div>

        <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 600 }}>
          Filtering for domain: <span style={{ color: "var(--brand-primary)", fontWeight: 800 }}>{domainFilter === "all" ? "All Sectors" : domainFilter}</span>
        </div>
      </div>

      {/* Issues Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
        {tabFiltered.map(c => {
          const districtObj = JHARKHAND_DISTRICTS.find(d => d.id === c.district);

          return (
            <div
              key={c.id}
              className="card shadow-sm"
              style={{
                border: "1px solid var(--border-medium)",
                borderRadius: "var(--radius-lg)",
                padding: "1.25rem",
                transition: "all 0.2s ease"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem", marginBottom: "0.6rem" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.25rem" }}>
                    <span style={{ fontFamily: "monospace", fontSize: "0.8rem", fontWeight: 800, color: "var(--brand-primary)" }}>
                      #{c.id}
                    </span>
                    <StatusBadge status={c.status || "in_progress"} />
                    <StatusBadge status={c.priority || "High"} type="priority" />
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", background: "var(--bg-main)", padding: "0.15rem 0.5rem", borderRadius: "4px" }}>
                      📍 {districtObj?.name || c.district || "Latehar"}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-main)", lineHeight: 1.3 }}>
                    <Link href={`/project/${c.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                      {c.title}
                    </Link>
                  </h3>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-light)" }}>Reported by</div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-main)" }}>
                    {c.submittedBy?.name || "Citizen / Gram Sabha"}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "1rem" }}>
                {c.description}
              </p>

              {/* Handling Assignment & Action Controls */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.75rem",
                paddingTop: "0.85rem",
                borderTop: "1px solid var(--border-light)",
                background: "var(--bg-main)",
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-md)"
              }}>
                <div style={{ fontSize: "0.8rem", color: "var(--text-main)" }}>
                  🎓 Assigned R&D: <strong>{c.assignedUniversityName || "BIT Mesra Highway & Infrastructure Lab"}</strong>
                </div>

                <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
                  <Link href={`/project/${c.id}`} className="btn btn-outline btn-sm">
                    🔍 Full Tracking
                  </Link>

                  {c.status !== "in_progress" && (
                    <button
                      onClick={() => handleUpdateStatus(c.id, "in_progress", "In Progress / Team Assigned")}
                      className="btn btn-primary btn-sm"
                    >
                      🚀 Accept & Assign Team
                    </button>
                  )}

                  {c.status === "in_progress" && (
                    <button
                      onClick={() => handleUpdateStatus(c.id, "testing", "Field Pilot & Testing")}
                      className="btn btn-accent btn-sm"
                    >
                      🔬 Deploy Field Prototype
                    </button>
                  )}

                  {c.status === "testing" && (
                    <button
                      onClick={() => handleUpdateStatus(c.id, "deployed", "Resolved & Deployed")}
                      className="btn btn-sm"
                      style={{ background: "#059669", color: "#ffffff" }}
                    >
                      ✅ Mark Solved
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
