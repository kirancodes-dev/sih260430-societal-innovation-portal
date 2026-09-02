"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, PERSONA_PROFILES } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/constants";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("admin");
  const [authMethod, setAuthMethod] = useState<"otp" | "password" | "persona">("persona");
  const [phone, setPhone] = useState("+91 98351 23456");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || "user@jharkhand.gov.in", role);
    navigateToRole(role);
  };

  const handleQuickLogin = (selectedRole: UserRole, demoEmail: string) => {
    login(demoEmail, selectedRole);
    navigateToRole(selectedRole);
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    setOtp("260430"); // demo SIH OTP
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    login(`${phone}@jharkhand.gov.in`, "citizen");
    router.push("/my-submissions");
  };

  const navigateToRole = (selectedRole: UserRole) => {
    if (selectedRole === "admin") router.push("/admin");
    else if (selectedRole === "university" || selectedRole === "faculty" || selectedRole === "student") router.push("/university");
    else if (selectedRole === "industry") router.push("/industry");
    else router.push("/my-submissions");
  };

  const personaList: { role: UserRole; title: string; subtitle: string; icon: string; email: string }[] = [
    { role: "admin", title: "Govt Admin", subtitle: "State Triage & Allocation", icon: "🏛️", email: "secy.hed@jharkhand.gov.in" },
    { role: "citizen", title: "Citizen / Mukhiya", subtitle: "Latehar Gram Sabha", icon: "👨🏽‍🌾", email: "ramesh.munda@ranchi.org" },
    { role: "university", title: "University Admin", subtitle: "Dean R&D • BIT Mesra", icon: "🎓", email: "dean.research@bitmesra.ac.in" },
    { role: "faculty", title: "Faculty PI", subtitle: "Chemical & Envt Dept", icon: "👨‍🏫", email: "anirban.roy@bitmesra.ac.in" },
    { role: "student", title: "Student Researcher", subtitle: "B.Tech Final Year (Credits)", icon: "🧑‍🎓", email: "amitabh.k@student.bitmesra.ac.in" },
    { role: "industry", title: "Industry CSR", subtitle: "Tata Steel Grants", icon: "🏭", email: "csr.jharkhand@tatasteel.com" }
  ];

  return (
    <div className="container" style={{ padding: "4rem 1.5rem", maxWidth: "680px" }}>
      <div className="card shadow-lg" style={{ padding: "2.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div className="nav-logo-emblem" style={{ margin: "0 auto 1rem", width: "52px", height: "52px", fontSize: "1.3rem" }}>
            JH
          </div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "0.4rem" }}>
            {language === "hi" ? "झारखंड इनोवेट में प्रवेश करें" : "Sign In to Jharkhand Innovate"}
          </h1>
          <p style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Government of Jharkhand • Societal Innovation Collaboration Portal (NEP 2020)
          </p>
        </div>

        {/* Auth Method Switcher Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", background: "var(--bg-main)", padding: "0.3rem", borderRadius: "var(--radius-md)" }}>
          <button
            type="button"
            onClick={() => setAuthMethod("persona")}
            className={`btn btn-sm ${authMethod === "persona" ? "btn-primary" : "btn-secondary"}`}
            style={{ flex: 1, border: "none" }}
          >
            ⚡ 1-Click Evaluation
          </button>
          <button
            type="button"
            onClick={() => setAuthMethod("otp")}
            className={`btn btn-sm ${authMethod === "otp" ? "btn-primary" : "btn-secondary"}`}
            style={{ flex: 1, border: "none" }}
          >
            📱 Mobile OTP
          </button>
          <button
            type="button"
            onClick={() => setAuthMethod("password")}
            className={`btn btn-sm ${authMethod === "password" ? "btn-primary" : "btn-secondary"}`}
            style={{ flex: 1, border: "none" }}
          >
            ✉️ Email Credentials
          </button>
        </div>

        {/* Method 1: Persona 1-Click Selector */}
        {authMethod === "persona" && (
          <div>
            <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--brand-primary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem", textAlign: "center" }}>
              Select Live Persona for Instant Evaluation:
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              {personaList.map(p => (
                <button
                  key={p.role}
                  type="button"
                  onClick={() => handleQuickLogin(p.role, p.email)}
                  className="btn btn-secondary btn-sm"
                  style={{
                    justifyContent: "flex-start",
                    padding: "0.75rem",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    border: "1px solid var(--border-medium)"
                  }}
                >
                  <span style={{ fontSize: "1.4rem" }}>{p.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text-main)" }}>{p.title}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{p.subtitle}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Method 2: Mobile OTP Login */}
        {authMethod === "otp" && (
          <form onSubmit={handleVerifyOtp} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label className="form-label">Mobile Number (Aadhaar / Citizen Registered)</label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="tel"
                  required
                  className="form-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="btn btn-secondary btn-sm"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {otpSent ? "Resend OTP" : "Send OTP"}
                </button>
              </div>
            </div>

            {otpSent && (
              <div>
                <label className="form-label">Enter 6-Digit OTP</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  className="form-input"
                  placeholder="Enter OTP (Auto-filled for demo: 260430)"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <div style={{ fontSize: "0.75rem", color: "var(--brand-primary)", marginTop: "0.2rem" }}>
                  ✓ Demo OTP 260430 sent to {phone}
                </div>
              </div>
            )}

            <button type="submit" disabled={!otpSent} className="btn btn-primary" style={{ marginTop: "0.5rem" }}>
              Verify & Sign In →
            </button>
          </form>
        )}

        {/* Method 3: Standard Email Form */}
        {authMethod === "password" && (
          <form onSubmit={handleCustomLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label className="form-label">Official Email Address</label>
              <input
                type="email"
                required
                className="form-input"
                placeholder="e.g. officer@jharkhand.gov.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label">Role</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
              >
                <option value="admin">Government Admin</option>
                <option value="university">University Admin</option>
                <option value="faculty">Faculty PI</option>
                <option value="student">Student Lead</option>
                <option value="industry">Industry / CSR Partner</option>
                <option value="citizen">Citizen / Gram Sabha</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: "0.5rem" }}>
              Sign In with Credentials →
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
