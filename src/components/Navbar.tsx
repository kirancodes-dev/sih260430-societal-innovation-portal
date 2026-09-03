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
  const { user, role } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [showNotifs, setShowNotifs] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Clean Main App Header */}
      <header className="nav-header">
        <div className="container nav-container">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Link href="/" className="nav-logo" onClick={() => setMobileMenuOpen(false)}>
              <div className="nav-logo-emblem">JH</div>
              <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-main)", letterSpacing: "-0.02em" }}>
                JH Innovate
              </span>
            </Link>

            {/* Officer & Analyser Portal Login Button (Backend Workers Only) */}
            <Link
              href="/login"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
                padding: "0.22rem 0.55rem",
                background: "var(--brand-primary-light)",
                border: "1px solid var(--brand-primary)",
                borderRadius: "var(--radius-full)",
                fontSize: "0.7rem",
                fontWeight: 800,
                color: "var(--brand-primary)",
                textDecoration: "none",
                whiteSpace: "nowrap"
              }}
              title="Official Portal for Dept Officers & Evaluators (Not for Public)"
            >
              <span>🔐</span>
              <span>Officer Login</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
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

              {(role === "university_admin" || role === "faculty" || role === "student" || role === "research") && (
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
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {/* Language Switch Button */}
            <button
              onClick={() => {
                const nextLang = language === "hi" ? "sat" : language === "sat" ? "bn" : language === "bn" ? "en" : "hi";
                setLanguage(nextLang);
              }}
              style={{
                background: "var(--bg-main)",
                border: "1px solid var(--border-medium)",
                borderRadius: "var(--radius-full)",
                padding: "0.25rem 0.6rem",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                cursor: "pointer",
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "var(--brand-primary)"
              }}
              title="Change Language (हिन्दी / English / ᱥᱟᱱᱛᱟᱲᱤ / বাংলা)"
            >
              🌐 {language === "hi" ? "हिन्दी" : language === "sat" ? "ᱥᱟᱱᱛᱟᱲᱤ" : language === "bn" ? "বাংলা" : "EN"}
            </button>

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
                    background: "var(--brand-danger, #e11d48)",
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
                  width: "290px",
                  maxHeight: "380px",
                  overflowY: "auto",
                  padding: "0.9rem",
                  zIndex: 1100,
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

            {/* Desktop Quick Submit Button */}
            <Link href="/submit" className="btn btn-primary btn-sm desktop-submit-btn">
              + {language === "hi" ? "चुनौती दर्ज" : language === "sat" ? "ᱚᱞ ᱢᱮ" : "New Challenge"}
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-hamburger-btn"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer animate-fade-in">
          <div className="mobile-drawer-content">
            {/* Official Auth Link in Mobile Drawer */}
            <div style={{ marginBottom: "1.25rem", padding: "0.75rem", background: "var(--brand-primary-light)", borderRadius: "var(--radius-md)" }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--brand-primary)", marginBottom: "0.3rem" }}>
                {user ? `👤 ${user.displayName}` : "🏛️ Official Officer Portal"}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-main)", marginBottom: "0.5rem" }}>
                {user ? `Role: ${role.toUpperCase()}` : "For Government Officers, Evaluators & Researchers"}
              </div>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary btn-sm"
                style={{ width: "100%", justifyContent: "center", fontSize: "0.78rem" }}
              >
                {user ? "Switch / Exit Account" : "🔐 Officer Sign In / Demo"}
              </Link>
            </div>

            {/* Main Links */}
            <div className="mobile-drawer-nav">
              <Link href="/" className={`mobile-drawer-link ${pathname === "/" ? "active" : ""}`} onClick={() => setMobileMenuOpen(false)}>
                <span>🏠</span> {t.navHome}
              </Link>
              <Link href="/submit" className={`mobile-drawer-link ${pathname === "/submit" ? "active" : ""}`} onClick={() => setMobileMenuOpen(false)}>
                <span>📢</span> {t.navSubmit}
              </Link>
              <Link href="/consultations" className={`mobile-drawer-link ${pathname === "/consultations" ? "active" : ""}`} onClick={() => setMobileMenuOpen(false)}>
                <span>🗳️</span> Policy Deliberations
              </Link>
              <Link href="/participatory-budgeting" className={`mobile-drawer-link ${pathname === "/participatory-budgeting" ? "active" : ""}`} onClick={() => setMobileMenuOpen(false)}>
                <span>💰</span> Citizen Budget Voting
              </Link>
              <Link href="/accountability" className={`mobile-drawer-link ${pathname === "/accountability" ? "active" : ""}`} onClick={() => setMobileMenuOpen(false)}>
                <span>📊</span> Real-Time Tracking & SLAs
              </Link>
              <Link href="/admin" className={`mobile-drawer-link ${pathname.startsWith("/admin") ? "active" : ""}`} onClick={() => setMobileMenuOpen(false)}>
                <span>🏛️</span> {t.navAdmin}
              </Link>
              <Link href="/university" className={`mobile-drawer-link ${pathname === "/university" ? "active" : ""}`} onClick={() => setMobileMenuOpen(false)}>
                <span>🎓</span> {t.navUniversity}
              </Link>
              <Link href="/industry" className={`mobile-drawer-link ${pathname.startsWith("/industry") ? "active" : ""}`} onClick={() => setMobileMenuOpen(false)}>
                <span>🏭</span> {t.navIndustry}
              </Link>
              <Link href="/training" className={`mobile-drawer-link ${pathname === "/training" ? "active" : ""}`} onClick={() => setMobileMenuOpen(false)}>
                <span>📚</span> {t.navTraining}
              </Link>
            </div>

            {/* Quick Action in Mobile Menu */}
            <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Link
                href="/submit"
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center", padding: "0.85rem" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                📢 {language === "hi" ? "नई चुनौती दर्ज करें" : "Report a Community Issue"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
