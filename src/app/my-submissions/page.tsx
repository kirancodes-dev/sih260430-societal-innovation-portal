"use client";

import React, { useState } from "react";
import Link from "next/link";
import { INITIAL_MOCK_CHALLENGES, ChallengeItem, JHARKHAND_DISTRICTS } from "@/lib/constants";
import StatusBadge from "@/components/ui/StatusBadge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNotifications } from "@/contexts/NotificationContext";

const LIFECYCLE_STAGES = [
  { key: "Submitted", label: "Submitted" },
  { key: "Under_Review", label: "Under Review" },
  { key: "Validated", label: "Validated" },
  { key: "Assigned", label: "Assigned to HEI" },
  { key: "In_Progress", label: "Team Formed" },
  { key: "Solution_Proposed", label: "Solution Proposed" },
  { key: "Under_Testing", label: "Field Testing" },
  { key: "Deployed", label: "Deployed" },
  { key: "Resolved", label: "Resolved" }
];

export default function MySubmissionsPage() {
  const { t, language } = useLanguage();
  const { addNotification } = useNotifications();

  const [challenges, setChallenges] = useState<ChallengeItem[]>(INITIAL_MOCK_CHALLENGES);
  const [selectedChallenge, setSelectedChallenge] = useState<ChallengeItem | null>(challenges[0]);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Citizen Rating Form State
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackComment, setFeedbackComment] = useState<string>("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);

  const filteredChallenges = challenges.filter(c => {
    if (filterStatus === "all") return true;
    return c.status === filterStatus;
  });

  const getStageIndex = (status: string) => {
    const idx = LIFECYCLE_STAGES.findIndex(s => s.key === status);
    return idx === -1 ? 0 : idx;
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChallenge) return;

    setChallenges(prev =>
      prev.map(c =>
        c.id === selectedChallenge.id
          ? {
              ...c,
              citizenFeedback: {
                rating: feedbackRating,
                comment: feedbackComment,
                evaluatedAt: new Date().toISOString().split("T")[0]
              }
            }
          : c
      )
    );

    setSelectedChallenge(prev =>
      prev
        ? {
            ...prev,
            citizenFeedback: {
              rating: feedbackRating,
              comment: feedbackComment,
              evaluatedAt: new Date().toISOString().split("T")[0]
            }
          }
        : null
    );

    setFeedbackSubmitted(true);
    addNotification({
      type: "status_change",
      title: "Citizen Feedback Received",
      body: `5-Star Citizen Rating submitted for Project ${selectedChallenge.id}.`,
      targetRole: "university"
    });
  };

  return (
    <div className="container" style={{ padding: "3.5rem 1.5rem", maxWidth: "1150px" }}>
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
            marginBottom: "0.75rem"
          }}>
            📋 {language === "hi" ? "नागरिक डैशबोर्ड" : "Citizen Tracking & Feedback"}
          </div>
          <h1 className="heading-section">
            {language === "hi" ? "मेरी प्रस्तुतियां एवं ट्रैकिंग" : "My Submissions & Project Lifecycle"}
          </h1>
          <p className="subheading">
            Track real-time progress of citizen-submitted challenges from Government validation to university R&D, prototype field pilot, and deployment.
          </p>
        </div>

        <Link href="/submit" className="btn btn-primary">
          + {language === "hi" ? "नई समस्या दर्ज करें" : "Submit New Challenge"}
        </Link>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
        {["all", "Assigned", "In_Progress", "Solution_Proposed", "Under_Testing", "Deployed"].map(st => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`btn btn-sm ${filterStatus === st ? "btn-primary" : "btn-secondary"}`}
            style={{ borderRadius: "var(--radius-full)", fontSize: "0.8rem" }}
          >
            {st === "all" ? "All Submissions" : st.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: "1fr 1.6fr", gap: "2rem", alignItems: "start" }}>
        {/* Left: Challenge List Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {filteredChallenges.map(c => {
            const isSelected = selectedChallenge?.id === c.id;
            const districtObj = JHARKHAND_DISTRICTS.find(d => d.id === c.district);

            return (
              <div
                key={c.id}
                onClick={() => {
                  setSelectedChallenge(c);
                  setFeedbackSubmitted(false);
                }}
                className="card"
                style={{
                  cursor: "pointer",
                  borderLeft: isSelected ? "4px solid var(--brand-primary)" : "1px solid var(--border-medium)",
                  background: isSelected ? "var(--bg-main)" : "var(--bg-card)",
                  transition: "all 0.2s ease"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "var(--text-light)" }}>
                    {c.id}
                  </span>
                  <StatusBadge status={c.status} />
                </div>

                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.4rem", color: "var(--text-main)", lineHeight: 1.3 }}>
                  {c.title}
                </h3>

                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "flex", justifyContent: "space-between", marginTop: "0.6rem" }}>
                  <span>📍 {districtObj?.name || c.district}</span>
                  <span>📅 {c.submittedAt.split("T")[0]}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed 10-Stage Lifecycle & Feedback Card */}
        {selectedChallenge && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Header summary */}
            <div className="card shadow-md" style={{ borderTop: "4px solid var(--brand-primary)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                    <span style={{ fontSize: "0.8rem", fontFamily: "monospace", color: "var(--brand-primary)", fontWeight: 700 }}>
                      {selectedChallenge.id}
                    </span>
                    <StatusBadge status={selectedChallenge.status} />
                    <StatusBadge status={selectedChallenge.priority} type="priority" />
                  </div>
                  <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-main)", lineHeight: 1.3 }}>
                    {selectedChallenge.title}
                  </h2>
                </div>

                <Link href={`/project/${selectedChallenge.id}`} className="btn btn-secondary btn-sm">
                  Public Project View 🌐
                </Link>
              </div>

              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1.2rem" }}>
                {selectedChallenge.description}
              </p>

              {/* Stakeholder Tripartite Info */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "1rem",
                padding: "1rem",
                background: "var(--bg-main)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-light)"
              }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Assigned University</div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--brand-indigo)" }}>
                    {selectedChallenge.assignedUniversityName || "Pending Assignment"}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Location Tag</div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                    {selectedChallenge.district.toUpperCase()} ({selectedChallenge.block || "District Wide"})
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>AI Priority Score</div>
                  <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--brand-primary)" }}>
                    {selectedChallenge.priorityScore}/100
                  </div>
                </div>
              </div>
            </div>

            {/* 10-Stage Visual Lifecycle Progress Tracker */}
            <div className="card">
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.5rem" }}>
                🚦 {language === "hi" ? "परियोजना जीवनचक्र प्रगति" : "10-Stage Project Lifecycle Progress"}
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {LIFECYCLE_STAGES.map((stage, idx) => {
                  const currentIdx = getStageIndex(selectedChallenge.status);
                  const isCompleted = idx < currentIdx;
                  const isCurrent = idx === currentIdx;

                  return (
                    <div
                      key={stage.key}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        opacity: idx > currentIdx ? 0.45 : 1
                      }}
                    >
                      <div style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: isCompleted ? "var(--brand-primary)" : isCurrent ? "var(--brand-accent)" : "var(--border-medium)",
                        color: isCompleted || isCurrent ? "#ffffff" : "var(--text-muted)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: "0.85rem",
                        flexShrink: 0
                      }}>
                        {isCompleted ? "✓" : idx + 1}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: isCurrent ? 800 : 600, fontSize: "0.9rem", color: isCurrent ? "var(--brand-primary)" : "var(--text-main)" }}>
                          {stage.label}
                        </div>
                        {isCurrent && (
                          <div style={{ fontSize: "0.75rem", color: "var(--brand-primary)", fontWeight: 600 }}>
                            ● Current Active Phase in State Portal
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Citizen Feedback & 5-Star Rating Section */}
            <div className="card" style={{ borderLeft: "4px solid var(--brand-accent)" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.8rem" }}>
                ⭐ {language === "hi" ? "नागरिक प्रतिक्रिया एवं मूल्यांकन" : "Citizen Feedback & Ground Impact Rating"}
              </h3>

              {selectedChallenge.citizenFeedback ? (
                <div style={{ padding: "1rem", background: "var(--brand-primary-light)", borderRadius: "var(--radius-md)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                    <span style={{ fontSize: "1.2rem" }}>
                      {"⭐".repeat(selectedChallenge.citizenFeedback.rating)}
                    </span>
                    <span style={{ fontWeight: 800, fontSize: "0.9rem" }}>
                      ({selectedChallenge.citizenFeedback.rating}/5 Stars)
                    </span>
                  </div>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-main)", fontStyle: "italic", margin: 0 }}>
                    &ldquo;{selectedChallenge.citizenFeedback.comment}&rdquo;
                  </p>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.4rem" }}>
                    Recorded on {selectedChallenge.citizenFeedback.evaluatedAt}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit}>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
                    Have you experienced the pilot testing or deployed solution? Rate the on-ground impact to help universities improve the technology.
                  </p>

                  <div style={{ marginBottom: "1rem" }}>
                    <label className="form-label">Rating (1 to 5 Stars)</label>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFeedbackRating(star)}
                          style={{
                            fontSize: "1.4rem",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            filter: star <= feedbackRating ? "none" : "grayscale(100%)",
                            transform: star <= feedbackRating ? "scale(1.1)" : "none",
                            transition: "all 0.15s"
                          }}
                        >
                          ⭐
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <label className="form-label">Comments & Field Observations</label>
                    <textarea
                      rows={3}
                      className="form-textarea"
                      placeholder="Share feedback on water purity, harvest preservation, device reliability..."
                      value={feedbackComment}
                      onChange={(e) => setFeedbackComment(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn btn-accent btn-sm">
                    Submit Impact Rating ⭐
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
