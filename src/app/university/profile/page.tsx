"use client";

import React, { useState } from "react";
import Link from "next/link";
import { JHARKHAND_UNIVERSITIES, UniversityInfo } from "@/lib/constants";

export default function UniversityProfileManagementPage() {
  const [university, setUniversity] = useState<UniversityInfo>(JHARKHAND_UNIVERSITIES[0]); // BIT Mesra
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const [name, setName] = useState(university.name);
  const [location, setLocation] = useState(university.location);
  const [contactEmail, setContactEmail] = useState(university.contactEmail);
  const [specializations, setSpecializations] = useState(university.specializations.join(", "));
  const [departments, setDepartments] = useState(university.departments.join(", "));
  const [incubationLabs, setIncubationLabs] = useState(university.incubationLabs.join(", "));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setIsEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="container" style={{ padding: "3.5rem 1.5rem", maxWidth: "980px" }}>
      <div style={{ marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
        <Link href="/university">← Back to University Workspace</Link> / <span style={{ color: "var(--text-main)" }}>Institutional Profile</span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
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
            🎓 AICTE / UGC Verified Higher Education Institution Profile
          </div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-main)" }}>
            {university.name}
          </h1>
          <div style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
            📍 {university.location}, Jharkhand • Rating: ⭐ {university.rating}/5.0 • Active R&D Projects: <strong>{university.activeProjects}</strong>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`btn ${isEditing ? "btn-secondary" : "btn-primary"}`}
        >
          {isEditing ? "Cancel Editing" : "✏️ Edit Institution Profile"}
        </button>
      </div>

      {saved && (
        <div style={{ padding: "0.8rem 1.2rem", background: "rgba(16, 185, 129, 0.1)", border: "1px solid #10b981", borderRadius: "var(--radius-md)", color: "#10b981", marginBottom: "1.5rem", fontWeight: 700 }}>
          ✓ Institutional profile and R&D laboratory capabilities updated successfully. AI smart routing will use these tags.
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSave} className="card shadow-md">
          <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1.25rem" }}>
            Edit Institutional Capabilities & Lab Tags
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label className="form-label">University / Institution Name</label>
              <input
                type="text"
                required
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid-2" style={{ gap: "1rem" }}>
              <div>
                <label className="form-label">Campus Location & District</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Dean R&D / Official Nodal Email</label>
                <input
                  type="email"
                  required
                  className="form-input"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="form-label">Key Research & Technological Specializations (Comma Separated)</label>
              <input
                type="text"
                className="form-input"
                value={specializations}
                onChange={(e) => setSpecializations(e.target.value)}
              />
              <div style={{ fontSize: "0.75rem", color: "var(--text-light)", marginTop: "0.2rem" }}>
                Used by AI routing to match relevant citizen problems to your labs
              </div>
            </div>

            <div>
              <label className="form-label">Academic Departments Participating in Societal Innovation (NEP 2020)</label>
              <textarea
                rows={2}
                className="form-textarea"
                value={departments}
                onChange={(e) => setDepartments(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label">Specialized Centers of Excellence & Incubation Labs</label>
              <textarea
                rows={2}
                className="form-textarea"
                value={incubationLabs}
                onChange={(e) => setIncubationLabs(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
              <button type="submit" className="btn btn-primary">
                Save & Update State Directory
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Overview Grid */}
          <div className="grid-3">
            <div className="card">
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Faculty Researchers</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--brand-primary)" }}>
                {university.facultyCount} PIs
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>Across 12 Departments</div>
            </div>

            <div className="card">
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Registered Students</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--brand-indigo)" }}>
                {university.studentsRegistered} Innovators
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>NEP 2020 Capstone Cohorts</div>
            </div>

            <div className="card">
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Active Solution Grants</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--brand-accent)" }}>
                {university.activeProjects} Grants
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>₹3.8 Cr Total Funding</div>
            </div>
          </div>

          {/* Research & Lab Capabilities */}
          <div className="card shadow-md">
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "1rem" }}>
              🔬 Research Specializations & Matching Domains
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
              {university.specializations.map((s, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: "0.35rem 0.85rem",
                    background: "var(--brand-primary-light)",
                    color: "var(--brand-primary)",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.85rem",
                    fontWeight: 700
                  }}
                >
                  ✓ {s}
                </span>
              ))}
            </div>

            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "1rem" }}>
              🧪 Specialized Centers & Incubation Labs
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
              {university.incubationLabs.map((lab, idx) => (
                <div key={idx} style={{ padding: "0.85rem", background: "var(--bg-main)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>🏢 {lab}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>Open for Multidisciplinary Prototyping</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
