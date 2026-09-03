"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { INITIAL_MOCK_CHALLENGES, JHARKHAND_DISTRICTS, THEMATIC_DOMAINS } from "@/lib/constants";
import StatusBadge from "@/components/ui/StatusBadge";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface ProjectComment {
  id: string;
  author: string;
  role: string;
  avatar: string;
  timestamp: string;
  text: string;
}

export default function ProjectLifecycleViewPage() {
  const params = useParams();
  const { user, role } = useAuth();
  const { language } = useLanguage();

  const challengeId = (params.id as string) || "CH-JH-2026-001";
  const [challengeData, setChallengeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fallback default
  const defaultMock = INITIAL_MOCK_CHALLENGES.find(c => c.id === challengeId) || INITIAL_MOCK_CHALLENGES[0];

  useEffect(() => {
    async function loadChallenge() {
      try {
        if (db) {
          const docRef = doc(db, "challenges", challengeId);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            setChallengeData({ id: snap.id, ...snap.data() });
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Firestore fetch error, using local fallback:", err);
      }
      setChallengeData(defaultMock);
      setLoading(false);
    }
    loadChallenge();
  }, [challengeId]);

  const challenge = challengeData || defaultMock;
  const districtObj = JHARKHAND_DISTRICTS.find(d => d.id === challenge.district);
  const domainObj = THEMATIC_DOMAINS.find(d => d.id === challenge.domain || d.title === challenge.domain);

  // Department mapping based on domain
  const getDepartment = (domain: string) => {
    if (domain?.includes("Water")) return "Drinking Water & Sanitation Dept, Govt of Jharkhand";
    if (domain?.includes("Agri") || domain?.includes("Forest")) return "Agriculture, Animal Husbandry & Rural Dev Dept";
    if (domain?.includes("Health")) return "Health, Medical Education & Family Welfare Dept";
    if (domain?.includes("Urban") || domain?.includes("Transport")) return "Road Construction & Urban Development Dept";
    if (domain?.includes("Energy")) return "Energy & Renewable Energy (JREDA) Dept";
    return "Higher & Technical Education Dept, Govt of Jharkhand";
  };

  const [comments, setComments] = useState<ProjectComment[]>([
    {
      id: "c-1",
      author: "Dr. Anirban Roy",
      role: "Faculty PI • BIT Mesra",
      avatar: "👨‍🏫",
      timestamp: "2 days ago",
      text: "Field assessment report completed. Initial telemetry units dispatched to the district nodal office for pilot calibration."
    },
    {
      id: "c-2",
      author: "Ananya Sengupta",
      role: "VP Innovation • Tata Steel CSR",
      avatar: "🏭",
      timestamp: "1 day ago",
      text: "CSR fabrication team has approved ₹25 Lakhs tooling budget. Hardware assembly on schedule."
    },
    {
      id: "c-3",
      author: "Ramesh Munda",
      role: "Mukhiya • Mahuadanr Gram Sabha",
      avatar: "👨🏽‍🌾",
      timestamp: "5 hours ago",
      text: "The Gram Sabha has verified the site location. We look forward to the team's field deployment."
    }
  ]);

  const [newCommentText, setNewCommentText] = useState("");
  const [escalated, setEscalated] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: ProjectComment = {
      id: `c-${Date.now()}`,
      author: user?.displayName || "Community Stakeholder",
      role: user?.organization || user?.role || "Citizen",
      avatar: user?.avatar || "👤",
      timestamp: "Just now",
      text: newCommentText
    };

    setComments(prev => [...prev, newComment]);
    setNewCommentText("");
  };

  const handleEscalate = () => {
    setEscalated(true);
    setStatusMessage("⚡ Issue has been escalated directly to the District Magistrate & Department Secretary with Priority 1 alert!");
  };

  const stages = [
    { num: "1", label: "Reported", desc: "Geotagged & Logged", done: true },
    { num: "2", label: "AI Triage", desc: "Domain & Severity Analyzed", done: true },
    { num: "3", label: "Assigned", desc: `${challenge.assignedUniversityName || "BIT Mesra / Nodal Team"}`, done: true, active: challenge.status === "in_progress" || challenge.status === "assigned" },
    { num: "4", label: "Testing", desc: "Lab & Field Pilot", done: challenge.status === "testing" || challenge.status === "deployed" || challenge.status === "resolved", active: challenge.status === "testing" },
    { num: "5", label: "Resolved", desc: "Deployed & Verified", done: challenge.status === "deployed" || challenge.status === "resolved", active: challenge.status === "deployed" || challenge.status === "resolved" }
  ];

  return (
    <div className="container" style={{ padding: "2rem 1rem 4rem", maxWidth: "1050px" }}>
      {/* Breadcrumbs */}
      <div style={{ marginBottom: "1.25rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
        <Link href="/">← Back to Home</Link> / <span style={{ color: "var(--text-main)" }}>Live Tracking • {challenge.id}</span>
      </div>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
            <span style={{ fontSize: "0.82rem", fontFamily: "monospace", color: "var(--brand-primary)", fontWeight: 800 }}>
              {challenge.id}
            </span>
            <StatusBadge status={challenge.status || "in_progress"} />
            <StatusBadge status={challenge.priority || "High"} type="priority" />
          </div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-main)", lineHeight: 1.25 }}>
            {challenge.title}
          </h1>
          <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.35rem" }}>
            📍 {districtObj?.name || challenge.district}, Jharkhand • Reported by: <strong>{challenge.submittedBy?.name || "Citizen / PRI"}</strong>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button onClick={handleEscalate} className="btn btn-outline btn-sm" style={{ borderColor: "var(--brand-danger, #e11d48)", color: "var(--brand-danger, #e11d48)" }}>
            ⚡ Escalate to Higher Authority
          </button>
          <Link href={`/university/project/${challenge.id}`} className="btn btn-primary btn-sm">
            University Workspace 🎓
          </Link>
        </div>
      </div>

      {statusMessage && (
        <div style={{
          background: "rgba(225, 29, 72, 0.1)",
          border: "1.5px solid var(--brand-danger, #e11d48)",
          borderRadius: "var(--radius-md)",
          padding: "0.85rem 1rem",
          color: "var(--brand-danger, #e11d48)",
          fontWeight: 700,
          fontSize: "0.9rem",
          marginBottom: "1.5rem"
        }}>
          {statusMessage}
        </div>
      )}

      {/* 5-Stage Live Progression Stepper */}
      <div className="card shadow-md" style={{ marginBottom: "1.75rem", padding: "1.25rem 1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-main)" }}>
            📊 Live Resolution & Routing Tracker
          </h3>
          <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--brand-primary)", background: "var(--brand-primary-light)", padding: "0.2rem 0.6rem", borderRadius: "var(--radius-full)" }}>
            🟢 Live Cloud Firestore Sync
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.5rem", position: "relative" }}>
          {stages.map((st, idx) => (
            <div key={st.num} style={{ textAlign: "center" }}>
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: st.done ? "var(--brand-primary)" : "var(--border-medium)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "0.9rem",
                margin: "0 auto 0.4rem",
                boxShadow: st.done ? "0 4px 10px rgba(4, 120, 87, 0.3)" : "none"
              }}>
                {st.done ? "✓" : st.num}
              </div>
              <div style={{ fontSize: "0.8rem", fontWeight: 800, color: st.done ? "var(--text-main)" : "var(--text-muted)", lineHeight: 1.1 }}>
                {st.label}
              </div>
              <div style={{ fontSize: "0.68rem", color: "var(--text-light)", marginTop: "2px" }}>
                {st.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Handling Department & Higher Authority Accountability Box */}
      <div className="card" style={{
        background: "linear-gradient(135deg, rgba(4,120,87,0.08) 0%, rgba(67,56,202,0.06) 50%, rgba(245,158,11,0.06) 100%)",
        border: "1.5px solid var(--border-medium)",
        marginBottom: "1.75rem"
      }}>
        <div style={{ fontSize: "0.82rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--brand-primary)", marginBottom: "1rem" }}>
          🏛️ Responsible Department & Officer-in-Charge
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>Nodal State Department</div>
            <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--text-main)" }}>{getDepartment(challenge.domain || "")}</div>
            <div style={{ fontSize: "0.74rem", color: "var(--text-light)" }}>District Nodal Office • {districtObj?.name || challenge.district}</div>
          </div>

          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>Assigned Technical Lead / University</div>
            <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--brand-indigo)" }}>{challenge.assignedUniversityName || "BIT Mesra, Ranchi"}</div>
            <div style={{ fontSize: "0.74rem", color: "var(--text-light)" }}>R&D Incubation Lab (NEP 2020)</div>
          </div>

          <div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>SLA & Escalation Clock</div>
            <div style={{ fontWeight: 800, fontSize: "0.95rem", color: escalated ? "var(--brand-danger, #e11d48)" : "var(--brand-accent)" }}>
              {escalated ? "⚡ Escalated to DM & Secy" : "⏱️ Active • 4 Days Left"}
            </div>
            <div style={{ fontSize: "0.74rem", color: "var(--text-light)" }}>Escalation Level: {escalated ? "L2 (District Collector)" : "L1 (Nodal Officer)"}</div>
          </div>
        </div>
      </div>

      {/* Problem & Solution Specs */}
      <div className="grid-2" style={{ marginBottom: "1.75rem" }}>
        <div className="card shadow-sm">
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.6rem" }}>
            📋 Citizen Problem Description
          </h3>
          <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
            {challenge.description}
          </p>
        </div>

        <div className="card shadow-sm" style={{ borderLeft: "4px solid var(--brand-primary)" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.6rem" }}>
            🔬 Technical Approach & Solution
          </h3>
          <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
            Specialized engineering intervention designed with local materials and sensors. Telemetry synchronized directly to the state monitoring dashboard for continuous quality verification.
          </p>
        </div>
      </div>

      {/* Real-time Stakeholder Communication Thread */}
      <div className="card shadow-md">
        <h3 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: "0.4rem" }}>
          💬 Live Communication & Official Progress Notes
        </h3>
        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
          Transparent discussion channel connecting the reporting citizen, handling nodal officer, university faculty PI, and state higher authorities.
        </p>

        {/* Existing Comments */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "1.25rem" }}>
          {comments.map(c => (
            <div key={c.id} style={{ display: "flex", gap: "0.75rem", padding: "0.85rem", background: "var(--bg-main)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)" }}>
              <span style={{ fontSize: "1.6rem" }}>{c.avatar}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.2rem" }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: "0.88rem" }}>{c.author}</span>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginLeft: "0.4rem" }}>
                      ({c.role})
                    </span>
                  </div>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-light)" }}>{c.timestamp}</span>
                </div>
                <p style={{ fontSize: "0.84rem", color: "var(--text-main)", margin: 0, lineHeight: 1.45 }}>
                  {c.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Add Comment Box */}
        <form onSubmit={handlePostComment} style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <textarea
            rows={2}
            required
            className="form-textarea"
            placeholder="Write a progress note, inspection report, or response to the citizen..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="btn btn-primary btn-sm">
              💬 Post Official Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
