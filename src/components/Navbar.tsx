"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { UserRole } from "@/lib/constants";

export default function Navbar() {
  const pathname = usePathname();
  const { user, role, setRole, theme, toggleTheme } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const [showNotifs, setShowNotifs] = useState(false);

  const roleLabels: { role: UserRole; label: string; icon: string }[] = [
    { role: "admin", label: "Govt Admin", icon: "🏛️" },
    { role: "citizen", label: "Citizen / PRI", icon: "👨🏽‍🌾" },
    { role: "university", label: "University Admin", icon: "🎓" },
    { role: "faculty", label: "Faculty PI", icon: "👨‍🏫" },
    { role: "student", label: "Student Lead", icon: "🧑‍🎓" },
    { role: "industry", label: "Industry / CSR", icon: "🏭" }
  ];

  return (
    <>
      {/* Role Switcher Demo Bar (For Live Evaluators / State Nodal Officers) */}
      <div className="role-bar">
        <div className="container role-bar-container">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--brand-primary)" }}>
              🏛️ SIH 260430 • Govt of Jharkhand
            </span>
            <span style={{ color: "var(--text-light)" }}>|</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              Persona Switcher:
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexWrap: "wrap" }}>
            {roleLabels.map(r => (
              <button
                key={r.role}
                onClick={() => setRole(r.role)}
                className={`role-pill ${role === r.role ? "active" : ""}`}
                title={`Switch view to ${r.label}`}
              >
                <span>{r.icon}</span> {r.label}
              </button>
            ))}

            {/* Multilingual Switcher (English, Hindi, Santali Ol Chiki, Bengali) */}
            <div style={{ display: "inline-flex", marginLeft: "0.4rem", borderRadius: "var(--radius-full)", border: "1px solid var(--border-medium)", overflow: "hidden", background: "var(--bg-main)" }}>
              <button
                onClick={() => setLanguage("en")}
                style={{
                  padding: "0.15rem 0.45rem",
                  fontSize: "0.75rem",
                  fontWeight: language === "en" ? 800 : 500,
                  background: language === "en" ? "var(--brand-primary)" : "transparent",
                  color: language === "en" ? "#ffffff" : "var(--text-muted)",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("hi")}
                style={{
                  padding: "0.15rem 0.45rem",
                  fontSize: "0.75rem",
                  fontWeight: language === "hi" ? 800 : 500,
                  background: language === "hi" ? "var(--brand-primary)" : "transparent",
                  color: language === "hi" ? "#ffffff" : "var(--text-muted)",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                हिन्दी
              </button>
              <button
                onClick={() => setLanguage("sat")}
                style={{
                  padding: "0.15rem 0.45rem",
                  fontSize: "0.75rem",
                  fontWeight: language === "sat" ? 800 : 500,
                  background: language === "sat" ? "var(--brand-primary)" : "transparent",
                  color: language === "sat" ? "#ffffff" : "var(--text-muted)",
                  border: "none",
                  cursor: "pointer"
                }}
                title="Santali (Ol Chiki)"
              >
                ᱥᱟᱱᱛᱟᱲᱤ
              </button>
              <button
                onClick={() => setLanguage("bn")}
                style={{
                  padding: "0.15rem 0.45rem",
                  fontSize: "0.75rem",
                  fontWeight: language === "bn" ? 800 : 500,
                  background: language === "bn" ? "var(--brand-primary)" : "transparent",
                  color: language === "bn" ? "#ffffff" : "var(--text-muted)",
                  border: "none",
                  cursor: "pointer"
                }}
                title="Bengali"
              >
                বাংলা
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              style={{
                marginLeft: "0.3rem",
                padding: "0.15rem 0.45rem",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--border-medium)",
                fontSize: "0.75rem",
                background: "var(--bg-main)",
                color: "var(--text-main)",
                cursor: "pointer"
              }}
              title="Toggle Dark / Light Theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="nav-header">
        <div className="container nav-container">
          <Link href="/" className="nav-logo">
            <div className="nav-logo-emblem">JH</div>
            <div>
              <div style={{ fontSize: "1.1rem", fontWeight: 800, lineHeight: 1.1 }}>
                {t.portalTitle}
              </div>
              <div style={{ fontSize: "0.68rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {t.portalSubtitle}
              </div>
            </div>
          </Link>

          <nav className="desktop-nav">
            <ul className="nav-links">
              <li>
                <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
                  {t.navHome}
                </Link>
              </li>

              <li>
                <Link href="/submit" className={`nav-link ${pathname === "/submit" ? "active" : ""}`}>
                  {t.navSubmit}
                </Link>
              </li>

              <li>
                <Link href="/consultations" className={`nav-link ${pathname === "/consultations" ? "active" : ""}`}>
                  🗳️ Deliberation
                </Link>
              </li>

              <li>
                <Link href="/participatory-budgeting" className={`nav-link ${pathname === "/participatory-budgeting" ? "active" : ""}`}>
                  💰 Citizen Voting
                </Link>
              </li>

              <li>
                <Link href="/accountability" className={`nav-link ${pathname === "/accountability" ? "active" : ""}`}>
                  📊 Accountability
                </Link>
              </li>

              {(role === "admin" || role === "citizen") && (
                <>
                  <li>
                    <Link href="/admin" className={`nav-link ${pathname === "/admin" ? "active" : ""}`}>
                      {t.navAdmin}
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/analytics" className={`nav-link ${pathname === "/admin/analytics" ? "active" : ""}`}>
                      {t.navAnalytics}
                    </Link>
                  </li>
                </>
              )}

              {(role === "university" || role === "faculty" || role === "student") && (
                <>
                  <li>
                    <Link href="/university" className={`nav-link ${pathname === "/university" ? "active" : ""}`}>
                      {t.navUniversity}
                    </Link>
                  </li>
                  <li>
                    <Link href="/training" className={`nav-link ${pathname === "/training" ? "active" : ""}`}>
                      {t.navTraining}
                    </Link>
                  </li>
                </>
              )}

              {role === "industry" && (
                <>
                  <li>
                    <Link href="/industry" className={`nav-link ${pathname.startsWith("/industry") ? "active" : ""}`}>
                      {t.navIndustry}
                    </Link>
                  </li>
                  <li>
                    <Link href="/training" className={`nav-link ${pathname === "/training" ? "active" : ""}`}>
                      {t.navTraining}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          {/* Right Action Bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", position: "relative" }}>
            {/* Notification Bell */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowNotifs(!showNotifs)}
                style={{
                  position: "relative",
                  background: "var(--bg-main)",
                  border: "1px solid var(--border-medium)",
                  borderRadius: "var(--radius-full)",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "1rem"
                }}
                aria-label="Toggle notifications"
              >
                🔔
                {unreadCount > 0 && (
                  <span style={{
                    position: "absolute",
                    top: "-3px",
                    right: "-3px",
                    background: "var(--brand-danger)",
                    color: "#ffffff",
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    borderRadius: "10px",
                    padding: "0.1rem 0.35rem",
                    lineHeight: 1
                  }}>
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Drawer Popover */}
              {showNotifs && (
                <div className="card shadow-lg" style={{
                  position: "absolute",
                  right: 0,
                  top: "45px",
                  width: "320px",
                  maxHeight: "400px",
                  overflowY: "auto",
                  padding: "1rem",
                  zIndex: 1000,
                  border: "1px solid var(--border-medium)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <div style={{ fontWeight: 800, fontSize: "0.9rem" }}>{t.notifications}</div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        style={{ background: "none", border: "none", color: "var(--brand-primary)", fontSize: "0.75rem", cursor: "pointer", fontWeight: 600 }}
                      >
                        {t.markAllRead}
                      </button>
                    )}
                  </div>

                  {notifications.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "1.5rem 0", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                      {t.noNotifications}
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                      {notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => markAsRead(n.id)}
                          style={{
                            padding: "0.6rem",
                            borderRadius: "var(--radius-sm)",
                            background: n.read ? "transparent" : "var(--brand-primary-light)",
                            borderLeft: n.read ? "2px solid transparent" : "3px solid var(--brand-primary)",
                            fontSize: "0.8rem",
                            cursor: "pointer"
                          }}
                        >
                          <div style={{ fontWeight: 700, color: "var(--text-main)", marginBottom: "0.15rem" }}>
                            {n.title}
                          </div>
                          <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", lineHeight: 1.3 }}>
                            {n.body}
                          </div>
                          <div style={{ fontSize: "0.65rem", color: "var(--text-light)", marginTop: "0.3rem" }}>
                            ⏱️ {n.timestamp}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User Persona Avatar */}
            {user && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "1.4rem" }}>{user.avatar || "👤"}</span>
                <div style={{ textAlign: "left", display: "none" }} className="user-text-meta">
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, lineHeight: 1.1 }}>
                    {user.displayName.split(" ")[0]}
                  </div>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
                    {user.role.toUpperCase()}
                  </div>
                </div>
              </div>
            )}

            <Link href="/submit" className="btn btn-primary btn-sm">
              + {language === "hi" ? "चुनौती दर्ज करें" : language === "sat" ? "ᱚᱞ ᱢᱮ" : "New Challenge"}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
