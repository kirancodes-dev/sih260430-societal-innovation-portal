"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface TrainingCourse {
  id: string;
  title: string;
  targetRole: string;
  duration: string;
  modulesCount: number;
  description: string;
  progress: number;
  certified: boolean;
  syllabus: string[];
}

export default function CapacityBuildingTrainingPage() {
  const { user } = useAuth();
  const { t, language } = useLanguage();

  const [courses, setCourses] = useState<TrainingCourse[]>([
    {
      id: "crs-govt-01",
      title: "State Nodal Triage & Problem Validation Protocol",
      targetRole: "Government Admin & Department Heads",
      duration: "3 Hours • 4 Modules",
      modulesCount: 4,
      description: "Comprehensive training on reviewing AI classifications, verifying ground reality with district collectors, and executing 1-click university R&D allocation.",
      progress: 100,
      certified: true,
      syllabus: [
        "Module 1: Overview of SIH 260430 & Jharkhand Innovation Framework",
        "Module 2: Explainable AI Diagnostics & Human-in-the-Loop Override Protocols",
        "Module 3: Mapping State Schemes (JJM, BHGY, MMKAY) to Problem Grants",
        "Module 4: Milestone Gate Reviews & Multi-Departmental Oversight"
      ]
    },
    {
      id: "crs-univ-01",
      title: "NEP 2020 Multidisciplinary Team Formation & AICTE Credits",
      targetRole: "University Deans & Faculty Mentors",
      duration: "4.5 Hours • 5 Modules",
      modulesCount: 5,
      description: "Guidelines on constituting cross-departmental student research cohorts (enforcing ≥2 departments), proposal budgeting, and capstone credit certification.",
      progress: 60,
      certified: false,
      syllabus: [
        "Module 1: NEP 2020 Experiential Learning Principles in HEIs",
        "Module 2: Constituting Multidisciplinary Faculty-Student Teams",
        "Module 3: Proposal Writing, Prototyping Budgets & Timeline Milestones",
        "Module 4: Laboratory Safety, Testing Protocols & Field Pilot Handover",
        "Module 5: Intellectual Property (IP) Filing & Academic Credit Ledgers"
      ]
    },
    {
      id: "crs-ind-01",
      title: "Industry CSR Co-Development & Tripartite MoU Structuring",
      targetRole: "Corporate CSR Leads, Startups & MSMEs",
      duration: "2 Hours • 3 Modules",
      modulesCount: 3,
      description: "Best practices for deploying corporate CSR innovation grants, providing technical engineering mentorship, and co-licensing grassroots technology.",
      progress: 0,
      certified: false,
      syllabus: [
        "Module 1: Corporate Social Responsibility (CSR) Framework for Societal Tech",
        "Module 2: Executing Digital Tripartite MoUs with e-Signatures",
        "Module 3: Prototyping Testbeds, Pilot Sites & Technology Transfer"
      ]
    }
  ]);

  const [selectedCourse, setSelectedCourse] = useState<TrainingCourse>(courses[0]);
  const [showCertModal, setShowCertModal] = useState(false);

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
            marginBottom: "0.5rem"
          }}>
            🎓 State Capacity Building & Training Academy
          </div>
          <h1 className="heading-section">
            Jharkhand Innovation Academy & Certification
          </h1>
          <p className="subheading">
            Certified capacity building programs designed for Government Nodal Officers, University Faculty Mentors, and Industry CSR Leaders under NEP 2020.
          </p>
        </div>

        <Link href="/" className="btn btn-secondary btn-sm">
          ← Back to Portal Home
        </Link>
      </div>

      {/* Course Cards Grid */}
      <div className="grid-3" style={{ marginBottom: "3rem" }}>
        {courses.map(crs => {
          const isSelected = selectedCourse.id === crs.id;
          return (
            <div
              key={crs.id}
              onClick={() => setSelectedCourse(crs)}
              className="card shadow-sm"
              style={{
                cursor: "pointer",
                borderTop: isSelected ? "4px solid var(--brand-primary)" : "1px solid var(--border-medium)",
                background: isSelected ? "var(--bg-main)" : "var(--bg-card)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <span className="badge badge-assigned" style={{ fontSize: "0.7rem" }}>
                    {crs.targetRole.split("&")[0]}
                  </span>
                  {crs.certified ? (
                    <span className="badge badge-validated">✓ Certified</span>
                  ) : (
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{crs.progress}% Done</span>
                  )}
                </div>

                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text-main)", lineHeight: 1.35 }}>
                  {crs.title}
                </h3>

                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "1rem" }}>
                  {crs.description}
                </p>
              </div>

              <div>
                <div style={{ height: "6px", background: "var(--border-light)", borderRadius: "3px", overflow: "hidden", marginBottom: "0.75rem" }}>
                  <div style={{ width: `${crs.progress}%`, height: "100%", background: crs.certified ? "#10b981" : "var(--brand-primary)", borderRadius: "3px" }} />
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>
                  ⏱️ {crs.duration}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Course Syllabus & Certification Viewer */}
      <div className="card shadow-md">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--brand-primary)" }}>
              Detailed Syllabus & Learning Outcomes
            </span>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-main)", marginTop: "0.2rem" }}>
              {selectedCourse.title}
            </h2>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Target Audience: <strong>{selectedCourse.targetRole}</strong> • Duration: {selectedCourse.duration}
            </div>
          </div>

          {selectedCourse.certified ? (
            <button
              onClick={() => setShowCertModal(true)}
              className="btn btn-primary"
            >
              📜 View Digital State Certificate
            </button>
          ) : (
            <button
              onClick={() => {
                setCourses(prev => prev.map(c => c.id === selectedCourse.id ? { ...c, progress: 100, certified: true } : c));
                setSelectedCourse(prev => ({ ...prev, progress: 100, certified: true }));
              }}
              className="btn btn-accent"
            >
              ▶ Complete Training Modules & Certify
            </button>
          )}
        </div>

        {/* Syllabus Modules */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {selectedCourse.syllabus.map((mod, idx) => (
            <div
              key={idx}
              style={{
                padding: "1rem",
                background: "var(--bg-main)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "var(--brand-primary-light)",
                  color: "var(--brand-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "0.8rem"
                }}>
                  {idx + 1}
                </span>
                <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{mod}</span>
              </div>
              <span className="badge badge-validated" style={{ fontSize: "0.7rem" }}>
                ✓ Completed
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Digital Certificate Modal */}
      {showCertModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          zIndex: 9999
        }}>
          <div className="card shadow-xl" style={{ maxWidth: "680px", width: "100%", padding: "2.5rem", border: "4px double var(--brand-primary)", textAlign: "center", background: "#ffffff", color: "#0f172a" }}>
            <div style={{ fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--brand-primary)", marginBottom: "0.5rem" }}>
              Government of Jharkhand • Department of Higher & Technical Education
            </div>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "0.5rem", color: "#1e293b" }}>
              CERTIFICATE OF COMPLETION
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "1.5rem" }}>
              Under the National Education Policy (NEP 2020) Societal Innovation Framework
            </p>

            <div style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
              This certifies that <strong>{user?.displayName || "Dr. Arvind Kumar, IAS"}</strong> has successfully completed the advanced program in:
            </div>

            <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--brand-primary)", padding: "1rem", background: "rgba(4,120,87,0.06)", borderRadius: "8px", marginBottom: "1.5rem" }}>
              {selectedCourse.title}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #e2e8f0", paddingTop: "1rem", fontSize: "0.8rem", color: "#64748b" }}>
              <div>
                <div>Certificate ID: <strong>JH-SICP-CERT-2026-894</strong></div>
                <div>Issued on: 2026-08-20 • NIC Verified</div>
              </div>
              <div style={{ fontWeight: 700, color: "#1e293b" }}>
                [Digitally Signed by Secretary, HED]
              </div>
            </div>

            <div style={{ marginTop: "1.5rem" }}>
              <button onClick={() => setShowCertModal(false)} className="btn btn-secondary btn-sm">
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
