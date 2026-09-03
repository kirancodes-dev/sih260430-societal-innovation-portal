"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { language } = useLanguage();

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const sampleOfficerLogins = [
    {
      title: "Transport & Road Infrastructure",
      department: "Road Construction & PWD Dept",
      email: "transport.officer@jharkhand.gov.in",
      icon: "🚗",
      badge: "Highways & Mobility"
    },
    {
      title: "Drinking Water & Sanitation",
      department: "Jal Jeevan Mission (JJM)",
      email: "water.engineer@jharkhand.gov.in",
      icon: "💧",
      badge: "Groundwater & Quality"
    },
    {
      title: "Healthcare & Telemedicine",
      department: "Health & Family Welfare Dept",
      email: "health.nodal@jharkhand.gov.in",
      icon: "🏥",
      badge: "Diagnostics & PHC"
    },
    {
      title: "Agriculture & Forest Produce",
      department: "Dept of Agriculture & BAU",
      email: "agri.kisan@jharkhand.gov.in",
      icon: "🌾",
      badge: "Tribal Crops & Lac"
    },
    {
      title: "University R&D Lead (BIT Mesra)",
      department: "Academic Innovation Cell (NEP 2020)",
      email: "dean.research@bitmesra.ac.in",
      icon: "🎓",
      badge: "Faculty PI & Students"
    },
    {
      title: "Chief State AI Analyst",
      department: "Higher Authority / Secretariat",
      email: "chief.analyst@jharkhand.gov.in",
      icon: "🏛️",
      badge: "All 10 State Sectors"
    }
  ];

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const mail = emailInput.trim() || "officer@jharkhand.gov.in";
    login(mail, "admin");
    router.push("/analyst/dashboard");
  };

  const handleQuickOfficerLogin = (email: string) => {
    login(email, "admin");
    router.push("/analyst/dashboard");
  };

  return (
    <div className="container" style={{ padding: "3rem 1.25rem 5rem", maxWidth: "780px" }}>
      {/* Citizen Zero-Friction Banner */}
      <div style={{
        background: "var(--brand-primary-light)",
        border: "1.5px solid var(--brand-primary)",
        borderRadius: "var(--radius-lg)",
        padding: "1rem 1.25rem",
        marginBottom: "2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem"
      }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--brand-primary)" }}>
            📢 Are you a citizen wanting to report a local challenge?
          </div>
          <div style={{ fontSize: "0.82rem", color: "var(--text-main)", marginTop: "2px" }}>
            No login required! Citizens can upload issues directly in 1 click with GPS & camera.
          </div>
        </div>
        <Link href="/submit" className="btn btn-primary btn-sm">
          Report in 1-Click →
        </Link>
      </div>

      {/* Main Official & Analyser Card */}
      <div className="card shadow-lg" style={{ padding: "2.25rem 1.75rem", borderRadius: "var(--radius-xl)" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div className="nav-logo-emblem" style={{ margin: "0 auto 0.75rem", width: "52px", height: "52px", fontSize: "1.3rem" }}>
            JH
          </div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 900, marginBottom: "0.3rem" }}>
            Officer & Analyser Portal
          </h1>
          <p style={{ fontSize: "0.86rem", color: "var(--text-muted)" }}>
            Secure department login for government engineers, university labs & state evaluators
          </p>
        </div>

        {/* Enter Any Email ID Form */}
        <form onSubmit={handleCustomLogin} style={{ marginBottom: "2.25rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "0.4rem", color: "var(--text-main)" }}>
              Official Email ID (Enter any email to test):
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                required
                className="form-input"
                placeholder="e.g. transport.officer@jharkhand.gov.in or your.name@domain.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                style={{ fontSize: "0.95rem", padding: "0.85rem 1rem", width: "100%", borderRadius: "var(--radius-md)" }}
              />
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "4px" }}>
              💡 Tip: The system will automatically detect your department (Transport, Water, Health, Agriculture, or University) based on your email keyword!
            </div>
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "0.4rem", color: "var(--text-main)" }}>
              Official Access PIN / Password:
            </label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter PIN or password (or leave blank for test mode)"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              style={{ fontSize: "0.95rem", padding: "0.85rem 1rem", width: "100%", borderRadius: "var(--radius-md)" }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: "100%", justifyContent: "center", fontSize: "1rem", borderRadius: "var(--radius-md)" }}
          >
            ⚡ Login to Department Workspace →
          </button>
        </form>

        {/* Divider */}
        <div style={{ position: "relative", textAlign: "center", margin: "2rem 0" }}>
          <div style={{ borderTop: "1px solid var(--border-medium)", position: "absolute", top: "50%", left: 0, right: 0 }}></div>
          <span style={{ background: "var(--bg-card)", padding: "0 1rem", position: "relative", fontSize: "0.78rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>
            OR 1-CLICK SAMPLE LOGINS FOR TESTING
          </span>
        </div>

        {/* 6 Sample Department Buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.85rem" }}>
          {sampleOfficerLogins.map(s => (
            <button
              key={s.email}
              type="button"
              onClick={() => handleQuickOfficerLogin(s.email)}
              className="card shadow-sm"
              style={{
                textAlign: "left",
                padding: "1rem",
                borderRadius: "var(--radius-md)",
                border: "1.5px solid var(--border-light)",
                cursor: "pointer",
                background: "var(--bg-main)",
                transition: "all 0.15s ease",
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "1.5rem" }}>{s.icon}</span>
                <span style={{ fontSize: "0.68rem", fontWeight: 800, color: "var(--brand-primary)", background: "var(--brand-primary-light)", padding: "0.15rem 0.5rem", borderRadius: "var(--radius-full)" }}>
                  {s.badge}
                </span>
              </div>

              <div>
                <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--text-main)" }}>
                  {s.title}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  {s.department}
                </div>
              </div>

              <div style={{ fontSize: "0.72rem", color: "var(--brand-primary)", fontFamily: "monospace", marginTop: "2px" }}>
                🔑 {s.email}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
