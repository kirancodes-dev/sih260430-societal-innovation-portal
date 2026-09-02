"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { INITIAL_MOCK_CHALLENGES, JHARKHAND_DISTRICTS } from "@/lib/constants";
import StatusBadge from "@/components/ui/StatusBadge";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { user } = useAuth();
  const { language } = useLanguage();

  const challengeId = (params.id as string) || "CH-JH-2026-001";
  const challenge = INITIAL_MOCK_CHALLENGES.find(c => c.id === challengeId) || INITIAL_MOCK_CHALLENGES[0];
  const districtObj = JHARKHAND_DISTRICTS.find(d => d.id === challenge.district);

  const [comments, setComments] = useState<ProjectComment[]>([
    {
      id: "c-1",
      author: "Dr. Anirban Roy",
      role: "Faculty PI • BIT Mesra",
      avatar: "👨‍🏫",
      timestamp: "2 days ago",
      text: "We completed bench tests with laterite clay adsorption columns. Fluoride levels dropped from 3.8 mg/L to 0.65 mg/L, comfortably below the BIS 10500 permissible limit."
    },
    {
      id: "c-2",
      author: "Ananya Sengupta",
      role: "VP Innovation • Tata Steel CSR",
      avatar: "🏭",
      timestamp: "1 day ago",
      text: "Tata Steel fabrication lab in Jamshedpur has manufactured the stainless steel casing and solar bracket for the Mahuadanr pilot test."
    },
    {
      id: "c-3",
      author: "Ramesh Munda",
      role: "Mukhiya • Mahuadanr Gram Sabha",
      avatar: "👨🏽‍🌾",
      timestamp: "5 hours ago",
      text: "The Gram Sabha has identified the solar hand pump location near Mahuadanr community hall. We eagerly await the team's arrival for field installation."
    }
  ]);

  const [newCommentText, setNewCommentText] = useState("");

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

  const timelineEvents = [
    { date: "15 Aug 2026", title: "Problem Crowdsourced", actor: "Mahuadanr Gram Sabha", desc: "Submitted with water test lab data and 3 photos.", badge: "Initiated" },
    { date: "16 Aug 2026", title: "AI Triage & Classification", actor: "Gemini AI Engine", desc: "Classified into Water Resources & Sanitation, assigned Critical priority.", badge: "Automated" },
    { date: "20 Aug 2026", title: "Allocated to University", actor: "Dept of Higher & Technical Education", desc: "Assigned to Birla Institute of Technology (BIT) Mesra under State Innovation Grant.", badge: "Govt Direct" },
    { date: "25 Aug 2026", title: "Multidisciplinary Team Constituted", actor: "BIT Mesra R&D Cell", desc: "Faculty PI Dr. Anirban Roy + 4 B.Tech/M.Tech researchers formed team.", badge: "Academic" },
    { date: "28 Aug 2026", title: "Industry CSR Co-Sponsor Joined", actor: "Tata Steel CSR Foundation", desc: "Pledged ₹25 Lakhs for pilot hardware fabrication and sensor tooling.", badge: "Industry" }
  ];

  return (
    <div className="container" style={{ padding: "3.5rem 1.5rem", maxWidth: "1050px" }}>
      {/* Breadcrumbs */}
      <div style={{ marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
        <Link href="/">← Back to Home</Link> / <span style={{ color: "var(--text-main)" }}>Project {challenge.id}</span>
      </div>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", fontFamily: "monospace", color: "var(--brand-primary)", fontWeight: 700 }}>
              {challenge.id}
            </span>
            <StatusBadge status={challenge.status} />
            <StatusBadge status={challenge.priority} type="priority" />
          </div>
          <h1 style={{ fontSize: "1.7rem", fontWeight: 800, color: "var(--text-main)", lineHeight: 1.3 }}>
            {challenge.title}
          </h1>
          <div style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginTop: "0.4rem" }}>
            📍 {districtObj?.name || challenge.district}, Jharkhand • Submitted by: <strong>{challenge.submittedBy.name}</strong>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <Link href={`/university/project/${challenge.id}`} className="btn btn-primary btn-sm">
            University Workspace 🎓
          </Link>
          <Link href={`/industry/collaborate/${challenge.id}`} className="btn btn-accent btn-sm">
            Partner on this Project 🤝
          </Link>
        </div>
      </div>

      {/* Tripartite Collaboration Banner */}
      <div className="card" style={{
        background: "linear-gradient(135deg, rgba(4,120,87,0.06) 0%, rgba(67,56,202,0.06) 50%, rgba(245,158,11,0.06) 100%)",
        border: "1.5px solid var(--border-medium)",
        marginBottom: "2.5rem"
      }}>
        <div style={{ fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--brand-primary)", marginBottom: "1rem" }}>
          🏛️ Active Tripartite Innovation Consortium (NEP 2020)
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
          <div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Originating Community</div>
            <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{challenge.submittedBy.name}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-light)" }}>{districtObj?.name || challenge.district} District, Jharkhand</div>
          </div>

          <div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Academic R&D Partner</div>
            <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--brand-indigo)" }}>{challenge.assignedUniversityName || "BIT Mesra, Ranchi"}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-light)" }}>Chemical & Environmental Dept (NEP 2020)</div>
          </div>

          <div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Industry Co-Funder & Mentors</div>
            <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--brand-accent)" }}>Tata Steel CSR & Innovation</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-light)" }}>₹25L Grant + Tooling Mentorship</div>
          </div>
        </div>
      </div>

      {/* Problem Background & Prototype Solution */}
      <div className="grid-2" style={{ marginBottom: "2.5rem" }}>
        <div className="card shadow-sm">
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            The Grassroots Challenge
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
            {challenge.description}
          </p>
        </div>

        <div className="card shadow-sm" style={{ borderLeft: "4px solid var(--brand-primary)" }}>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Engineered Solution & Prototype Specs
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
            A solar-assisted continuous electro-coagulation and red-laterite adsorption unit capable of reducing fluoride to &lt;0.8 mg/L and arsenic to &lt;0.01 mg/L at 500 L/hr. Fitted with IoT optical sensors syncing telemetry to the district water portal.
          </p>
        </div>
      </div>

      {/* Lifecycle Progress Timeline */}
      <div className="card shadow-md" style={{ marginBottom: "2.5rem" }}>
        <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "1.25rem" }}>
          ⏱️ Project Milestone & Allocation Timeline
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {timelineEvents.map((ev, idx) => (
            <div key={idx} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "var(--brand-primary)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "0.75rem",
                flexShrink: 0
              }}>
                ✓
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{ev.title}</div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>{ev.date}</span>
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--brand-indigo)", fontWeight: 600, margin: "0.15rem 0" }}>
                  {ev.actor}
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  {ev.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Real-time Stakeholder Discussion Thread */}
      <div className="card shadow-md">
        <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1rem" }}>
          💬 Project Stakeholder Collaboration Thread
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
          Direct communication channel connecting citizens, faculty PIs, student researchers, and industry CSR mentors.
        </p>

        {/* Existing Comments */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
          {comments.map(c => (
            <div key={c.id} style={{ display: "flex", gap: "0.85rem", padding: "1rem", background: "var(--bg-main)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)" }}>
              <span style={{ fontSize: "1.8rem" }}>{c.avatar}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: "0.92rem" }}>{c.author}</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: "0.5rem" }}>
                      ({c.role})
                    </span>
                  </div>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-light)" }}>{c.timestamp}</span>
                </div>
                <p style={{ fontSize: "0.88rem", color: "var(--text-main)", margin: 0, lineHeight: 1.5 }}>
                  {c.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Add Comment Box */}
        <form onSubmit={handlePostComment} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <textarea
            rows={3}
            required
            className="form-textarea"
            placeholder="Post a technical update, field observation, or question..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="btn btn-primary btn-sm">
              💬 Post Comment to Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
