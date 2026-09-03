"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, DEMO_EVALUATOR_PROFILES } from "@/contexts/AuthContext";
import { UserRole } from "@/types/portal";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signUp, signInDemoEvaluator, isDemoMode } = useAuth();

  const [activeTab, setActiveTab] = useState<"signin" | "register" | "demo">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("citizen");
  const [organization, setOrganization] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    try {
      await signIn(email, password);
      setSuccessMsg("Logged in successfully!");
      setTimeout(() => router.push("/"), 500);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to sign in. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    try {
      await signUp(email, password, displayName, selectedRole, organization);
      setSuccessMsg("Account registered successfully! Redirecting...");
      setTimeout(() => router.push("/"), 600);
    } catch (err: any) {
      setErrorMsg(err.message || "Registration failed. Try with another email.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role: UserRole) => {
    const profile = DEMO_EVALUATOR_PROFILES[role];
    signInDemoEvaluator(role, profile.email, profile.displayName);
    if (role === "admin") router.push("/admin");
    else if (role === "university_admin" || role === "faculty" || role === "student") router.push("/university");
    else if (role === "industry" || role === "csr" || role === "startup") router.push("/industry");
    else router.push("/");
  };

  return (
    <div className="container" style={{ padding: "3.5rem 1.25rem 5rem", maxWidth: "680px" }}>
      {/* Citizen Zero-Friction Banner */}
      <div style={{
        background: "var(--brand-primary-light)",
        border: "1.5px solid var(--brand-primary)",
        borderRadius: "var(--radius-lg)",
        padding: "0.9rem 1.25rem",
        marginBottom: "2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "0.75rem"
      }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "var(--brand-primary)" }}>
            📢 Reporting a community problem as a citizen?
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-main)", marginTop: "2px" }}>
            No login is required for citizens. You can submit issues directly with 1 click.
          </div>
        </div>
        <Link href="/submit" className="btn btn-primary btn-sm">
          Report Issue →
        </Link>
      </div>

      <div className="card" style={{ padding: "2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.3rem" }}>🏛️</div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.3rem" }}>
            JH SICP Portal Authentication
          </h1>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Official portal for Government, Academic Researchers, and Industry CSR Partners
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: "flex",
          borderBottom: "2px solid var(--border-light)",
          marginBottom: "1.5rem",
          gap: "0.5rem"
        }}>
          <button
            type="button"
            onClick={() => setActiveTab("signin")}
            style={{
              padding: "0.5rem 1rem",
              background: "none",
              border: "none",
              borderBottom: activeTab === "signin" ? "3px solid var(--brand-primary)" : "none",
              fontWeight: activeTab === "signin" ? 800 : 500,
              color: activeTab === "signin" ? "var(--brand-primary)" : "var(--text-muted)",
              cursor: "pointer",
              fontSize: "0.9rem"
            }}
          >
            Email Sign In
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("register")}
            style={{
              padding: "0.5rem 1rem",
              background: "none",
              border: "none",
              borderBottom: activeTab === "register" ? "3px solid var(--brand-primary)" : "none",
              fontWeight: activeTab === "register" ? 800 : 500,
              color: activeTab === "register" ? "var(--brand-primary)" : "var(--text-muted)",
              cursor: "pointer",
              fontSize: "0.9rem"
            }}
          >
            Register Account
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("demo")}
            style={{
              padding: "0.5rem 1rem",
              background: "none",
              border: "none",
              borderBottom: activeTab === "demo" ? "3px solid var(--brand-accent)" : "none",
              fontWeight: activeTab === "demo" ? 800 : 500,
              color: activeTab === "demo" ? "var(--brand-accent)" : "var(--text-muted)",
              cursor: "pointer",
              fontSize: "0.9rem"
            }}
          >
            ⚡ Demo Evaluators
          </button>
        </div>

        {errorMsg && (
          <div style={{ padding: "0.75rem", background: "var(--status-critical-bg)", color: "var(--status-critical)", borderRadius: "var(--radius-sm)", marginBottom: "1rem", fontSize: "0.85rem" }}>
            ⚠️ {errorMsg}
          </div>
        )}

        {successMsg && (
          <div style={{ padding: "0.75rem", background: "var(--status-low-bg)", color: "var(--status-low)", borderRadius: "var(--radius-sm)", marginBottom: "1rem", fontSize: "0.85rem" }}>
            ✓ {successMsg}
          </div>
        )}

        {/* Tab 1: Email Sign In */}
        {activeTab === "signin" && (
          <form onSubmit={handleSignIn} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                required
                className="form-input"
                placeholder="name@institution.gov.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label">Password</label>
              <input
                type="password"
                required
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
              {loading ? "Authenticating..." : "Sign In to Portal →"}
            </button>
          </form>
        )}

        {/* Tab 2: Register Account */}
        {activeTab === "register" && (
          <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="Dr. Rajesh Soren / Priya Sharma"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            <div className="grid-2" style={{ gap: "0.75rem" }}>
              <div>
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  required
                  className="form-input"
                  placeholder="name@bitmesra.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  className="form-input"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="grid-2" style={{ gap: "0.75rem" }}>
              <div>
                <label className="form-label">Stakeholder Role</label>
                <select
                  className="form-select"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                >
                  <option value="citizen">Citizen / Resident</option>
                  <option value="pri_ulb">Panchayati Raj / ULB Member</option>
                  <option value="faculty">University Faculty PI</option>
                  <option value="student">Student Innovator</option>
                  <option value="university_admin">University Dean / Admin</option>
                  <option value="industry">Industry / Corporate Partner</option>
                  <option value="csr">CSR Foundation Lead</option>
                  <option value="startup">Startup Founder</option>
                  <option value="msme">MSME Partner</option>
                  <option value="research">Independent Researcher</option>
                  <option value="admin">Government Department Nodal Officer</option>
                </select>
              </div>

              <div>
                <label className="form-label">Organization / Institution</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. BIT Mesra, Tata Steel, PWD"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
              {loading ? "Creating Account..." : "Create Account & Register →"}
            </button>
          </form>
        )}

        {/* Tab 3: Demo Evaluators for SIH Judges */}
        {activeTab === "demo" && (
          <div>
            <div style={{
              background: "rgba(245, 158, 11, 0.1)",
              border: "1px solid var(--brand-accent)",
              borderRadius: "var(--radius-sm)",
              padding: "0.75rem",
              marginBottom: "1rem",
              fontSize: "0.8rem",
              color: "var(--brand-accent)"
            }}>
              ⚡ <strong>Hackathon Quick Evaluation Mode:</strong> Click any persona below to immediately launch an isolated session with appropriate RBAC permissions.
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {(Object.keys(DEMO_EVALUATOR_PROFILES) as UserRole[]).map((roleKey) => {
                const p = DEMO_EVALUATOR_PROFILES[roleKey];
                return (
                  <div
                    key={roleKey}
                    onClick={() => handleDemoLogin(roleKey)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.75rem 1rem",
                      background: "var(--bg-main)",
                      border: "1px solid var(--border-medium)",
                      borderRadius: "var(--radius-md)",
                      cursor: "pointer",
                      transition: "all 0.15s ease"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span style={{ fontSize: "1.3rem" }}>{p.avatar}</span>
                      <div>
                        <div style={{ fontSize: "0.88rem", fontWeight: 800 }}>{p.displayName}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                          {p.organization || p.email}
                        </div>
                      </div>
                    </div>
                    <span style={{
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      padding: "0.2rem 0.6rem",
                      borderRadius: "var(--radius-full)",
                      background: "var(--brand-primary-light)",
                      color: "var(--brand-primary)"
                    }}>
                      {roleKey.toUpperCase()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
