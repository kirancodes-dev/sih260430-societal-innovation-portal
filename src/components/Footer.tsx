import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: "var(--bg-card)",
      borderTop: "1px solid var(--border-light)",
      paddingTop: "3.5rem",
      paddingBottom: "2.5rem",
      marginTop: "5rem"
    }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "2.5rem",
          marginBottom: "3rem"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <div className="nav-logo-emblem">JH</div>
              <div>
                <div style={{ fontSize: "1.05rem", fontWeight: 800 }}>Govt of Jharkhand</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Dept of Higher & Technical Education</div>
              </div>
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
              A centralized digital platform under NEP 2020 connecting citizens, Higher Education Institutions (HEIs), and industry partners to solve real-world societal challenges.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem" }}>Stakeholder Portals</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
              <li><Link href="/submit" style={{ transition: "color 0.2s" }}>Citizen Problem Submission</Link></li>
              <li><Link href="/admin">Govt Department Triage</Link></li>
              <li><Link href="/university">Higher Education Institutions (HEIs)</Link></li>
              <li><Link href="/industry">Industry & CSR Partnerships</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem" }}>Thematic Domains</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
              <li>Agriculture & Tribal Livelihoods</li>
              <li>Water Sanitation & Arsenic Removal</li>
              <li>Healthcare & Sickle Cell Tracking</li>
              <li>Smart Education & Ol Chiki EdTech</li>
              <li>Mine Reclamation & Clean Energy</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem" }}>Hackathon Reference</h4>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
              <p><strong>Smart India Hackathon 2026</strong></p>
              <p>Problem Statement ID: <strong>26043</strong></p>
              <p>Category: <strong>Software</strong></p>
              <p>Theme: <strong>Smart Education</strong></p>
              <div style={{ marginTop: "0.75rem", padding: "0.5rem 0.75rem", background: "var(--brand-primary-light)", borderRadius: "var(--radius-md)", color: "var(--brand-primary)", fontWeight: 600, fontSize: "0.8rem" }}>
                ✓ NEP 2020 Aligned Collaboration Hub
              </div>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid var(--border-light)",
          paddingTop: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          fontSize: "0.82rem",
          color: "var(--text-light)"
        }}>
          <div>
            © 2026 Department of Higher & Technical Education, Government of Jharkhand. Built for Smart India Hackathon.
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#accessibility">Accessibility Statement</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
