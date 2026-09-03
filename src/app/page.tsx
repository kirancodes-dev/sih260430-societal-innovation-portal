"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  THEMATIC_DOMAINS,
  INITIAL_MOCK_CHALLENGES,
  JHARKHAND_UNIVERSITIES,
  SAMPLE_INDUSTRY_PARTNERS,
  JHARKHAND_DISTRICTS,
  ChallengeItem
} from "@/lib/constants";
import StatsCard from "@/components/ui/StatsCard";
import ChallengeCard from "@/components/ui/ChallengeCard";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { getChallengesFromDb } from "@/lib/firestore-service";

export default function HomePage() {
  const { role } = useAuth();
  const { t, language } = useLanguage();
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
  const [challenges, setChallenges] = useState<ChallengeItem[]>(INITIAL_MOCK_CHALLENGES);
  const [loadingDb, setLoadingDb] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoadingDb(true);
      try {
        const liveData = await getChallengesFromDb();
        if (liveData && liveData.length > 0) {
          setChallenges(liveData);
        }
      } catch (err) {
        console.warn("Using offline mock challenges:", err);
      } finally {
        setLoadingDb(false);
      }
    }
    loadData();
  }, []);

  const filteredChallenges = challenges.filter(c => {
    const matchesDomain = selectedDomain === "all" || c.category === selectedDomain;
    const matchesDistrict = selectedDistrict === "all" || c.district === selectedDistrict;
    const matchesQuery = !searchQuery ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesDistrict && matchesQuery;
  });

  const isHindi = language === "hi";

  return (
    <div className="home-root">
      {/* 📱 Mobile App Home Banner & Action Hub (Visible on Mobile) */}
      <div className="mobile-only-app-hero">
        {/* Welcome Card */}
        <div className="mobile-app-welcome-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <span className="mobile-app-badge">🏛️ Govt of Jharkhand • NEP 2020</span>
              <h1 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#ffffff", lineHeight: 1.2, marginTop: "0.3rem" }}>
                {isHindi ? "झारखंड सामाजिक नवाचार पोर्टल" : "Jharkhand Societal Innovation"}
              </h1>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.85)", marginTop: "0.25rem", lineHeight: 1.4 }}>
                {isHindi ? "नागरिक समस्याओं का विश्वविद्यालयों व उद्योगों द्वारा तकनीकी समाधान" : "Solving grassroots challenges through Academic R&D & Industry CSR."}
              </p>
            </div>
          </div>

          {/* Quick Action Tiles (2x2 Native Mobile Grid) */}
          <div className="mobile-app-quick-actions">
            <Link href="/submit" className="mobile-app-action-tile highlight-green">
              <span className="tile-icon">📢</span>
              <div className="tile-text">
                <strong>{isHindi ? "समस्या दर्ज करें" : "Report Issue"}</strong>
                <span>{isHindi ? "GPS व फोटो सहित" : "With GPS & Camera"}</span>
              </div>
            </Link>

            <Link href="/consultations" className="mobile-app-action-tile highlight-blue">
              <span className="tile-icon">🗳️</span>
              <div className="tile-text">
                <strong>{isHindi ? "नीति विमर्श" : "Deliberation"}</strong>
                <span>{isHindi ? "राय व सुझाव दें" : "Community Voices"}</span>
              </div>
            </Link>

            <Link href="/participatory-budgeting" className="mobile-app-action-tile highlight-gold">
              <span className="tile-icon">💰</span>
              <div className="tile-text">
                <strong>{isHindi ? "बजट वोटिंग" : "Citizen Voting"}</strong>
                <span>{isHindi ? "जिले का बजट तय करें" : "Vote on Grants"}</span>
              </div>
            </Link>

            <Link href="/accountability" className="mobile-app-action-tile highlight-purple">
              <span className="tile-icon">📊</span>
              <div className="tile-text">
                <strong>{isHindi ? "जवाबदेही" : "Live Tracking"}</strong>
                <span>{isHindi ? "स्थिति व प्रगति देखें" : "Track SLAs & Labs"}</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Horizontal Category Scroll (Native Mobile Category Carousel) */}
        <div style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem", padding: "0 0.25rem" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--text-main)" }}>
              {isHindi ? "विषयगत क्षेत्र चुनें" : "Thematic Domains"}
            </span>
            <span style={{ fontSize: "0.75rem", color: "var(--brand-primary)", fontWeight: 700 }}>
              {THEMATIC_DOMAINS.length} Domains
            </span>
          </div>

          <div className="mobile-horizontal-scroll">
            <button
              onClick={() => setSelectedDomain("all")}
              className={`mobile-category-chip ${selectedDomain === "all" ? "active" : ""}`}
            >
              🌐 {isHindi ? "सभी" : "All"} ({challenges.length})
            </button>
            {THEMATIC_DOMAINS.map(d => {
              const isActive = selectedDomain === d.title;
              return (
                <button
                  key={d.id}
                  onClick={() => setSelectedDomain(isActive ? "all" : d.title)}
                  className={`mobile-category-chip ${isActive ? "active" : ""}`}
                >
                  <span>{d.icon}</span> {isHindi ? d.titleHi : d.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Search on Mobile */}
        <div style={{ margin: "0.75rem 0" }}>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder={isHindi ? "🔍 समस्या या जिला खोजें..." : "🔍 Search problems, hand pumps, roads..."}
              className="form-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                borderRadius: "var(--radius-full)",
                paddingLeft: "1.2rem",
                paddingRight: "2.5rem",
                height: "44px",
                background: "var(--bg-card)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{ position: "absolute", right: "12px", top: "12px", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "0.9rem" }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Quick District Filter Chips */}
        <div className="mobile-horizontal-scroll" style={{ marginBottom: "1rem" }}>
          <button
            onClick={() => setSelectedDistrict("all")}
            className={`mobile-district-chip ${selectedDistrict === "all" ? "active" : ""}`}
          >
            📍 {isHindi ? "सभी 24 जिले" : "All 24 Districts"}
          </button>
          {JHARKHAND_DISTRICTS.slice(0, 10).map(dist => {
            const isActive = selectedDistrict === dist.id;
            return (
              <button
                key={dist.id}
                onClick={() => setSelectedDistrict(isActive ? "all" : dist.id)}
                className={`mobile-district-chip ${isActive ? "active" : ""}`}
              >
                {dist.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 🖥️ Desktop Hero Section (Visible on Tablet/Desktop) */}
      <section className="desktop-only-hero" style={{
        background: "linear-gradient(180deg, rgba(4, 120, 87, 0.08) 0%, rgba(248, 250, 252, 0) 100%)",
        paddingTop: "3.5rem",
        paddingBottom: "4rem",
        borderBottom: "1px solid var(--border-light)"
      }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "980px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.4rem 1rem",
            background: "var(--brand-primary-light)",
            borderRadius: "var(--radius-full)",
            color: "var(--brand-primary)",
            fontSize: "0.85rem",
            fontWeight: 700,
            marginBottom: "1.5rem"
          }}>
            <span>🏛️</span> {t.heroBadge}
          </div>

          <h1 className="heading-hero" style={{ marginBottom: "1.5rem" }}>
            {t.heroHeading}{" "}
            <span className="text-gradient">{t.heroHeadingHighlight}</span>
          </h1>

          <p className="subheading" style={{ margin: "0 auto 2.5rem", fontSize: "1.15rem", lineHeight: 1.6 }}>
            {t.heroSubheading}
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
            <Link href="/submit" className="btn btn-primary btn-lg">
              📢 {t.submitChallenge} →
            </Link>
            <Link href="#explore" className="btn btn-secondary btn-lg">
              🔍 {t.exploreProjects}
            </Link>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid-4" style={{ textAlign: "left" }}>
            <StatsCard
              title={t.challengesReceived}
              value={`${challenges.length + 1420}`}
              icon="📋"
              change="+14% this month"
              subtitle="From all 24 districts"
              accentColor="var(--brand-primary)"
            />
            <StatsCard
              title={t.universitiesEngaged}
              value="42"
              icon="🎓"
              change="100% R&D Coverage"
              subtitle="BIT, IIT ISM, NIT, BAU..."
              accentColor="var(--brand-indigo)"
            />
            <StatsCard
              title={t.csrFundsPledged}
              value="₹18.4 Cr"
              icon="💼"
              change="28 Active Mentors"
              subtitle="Tata Steel, SAIL, CCL..."
              accentColor="var(--brand-accent)"
            />
            <StatsCard
              title={t.projectsResolved}
              value="145"
              icon="🚀"
              change="Field Pilots Deployed"
              subtitle="Measurable village impact"
              accentColor="#10b981"
            />
          </div>
        </div>
      </section>

      {/* 10 Thematic Domains Section (Desktop) */}
      <section className="desktop-only-section" style={{ padding: "4rem 0", background: "var(--bg-main)", borderBottom: "1px solid var(--border-light)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="heading-section">
              {t.thematicDomains}
            </h2>
            <p className="subheading">
              Aligned with National Education Policy (NEP 2020) and UN Sustainable Development Goals (SDGs) for grassroots empowerment.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {THEMATIC_DOMAINS.map(d => {
              const isSelected = selectedDomain === d.title;
              return (
                <div
                  key={d.id}
                  onClick={() => {
                    setSelectedDomain(isSelected ? "all" : d.title);
                    const el = document.getElementById("explore");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="card"
                  style={{
                    cursor: "pointer",
                    border: isSelected ? `2px solid ${d.color}` : "1px solid var(--border-light)",
                    transform: isSelected ? "scale(1.02)" : "none",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <div style={{
                      fontSize: "1.8rem",
                      width: "48px",
                      height: "48px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "var(--radius-md)",
                      background: "var(--bg-main)"
                    }}>
                      {d.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: 0, color: "var(--text-main)" }}>
                        {language === "hi" ? d.titleHi : d.title}
                      </h3>
                      <span style={{ fontSize: "0.75rem", color: d.color, fontWeight: 700 }}>
                        {d.subcategories.length} Specialized Sub-tracks
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1rem", lineHeight: 1.5 }}>
                    {language === "hi" ? d.descriptionHi : d.description}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {d.subcategories.slice(0, 2).map((sub, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: "0.72rem",
                          padding: "0.15rem 0.5rem",
                          background: "var(--bg-main)",
                          borderRadius: "var(--radius-full)",
                          color: "var(--text-muted)"
                        }}
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Explorer & Challenges Feed Section */}
      <section id="explore" style={{ padding: "2.5rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <div>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 800, margin: 0 }}>
                {isHindi ? "ताज़ा सामाजिक चुनौतियां" : "Recent Community Challenges"}
              </h2>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                Showing {filteredChallenges.length} validated issues across Jharkhand
              </span>
            </div>

            <Link href="/submit" className="btn btn-primary btn-sm desktop-only-btn">
              + {isHindi ? "समस्या दर्ज करें" : "Submit Challenge"}
            </Link>
          </div>

          {/* Desktop Search & Filter Controls */}
          <div className="card desktop-only-filter" style={{ marginBottom: "2rem", padding: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
              <div>
                <label className="form-label" style={{ fontSize: "0.78rem" }}>Search Keywords</label>
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  className="form-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label" style={{ fontSize: "0.78rem" }}>Filter by Domain</label>
                <select
                  className="form-select"
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                >
                  <option value="all">{t.allDomains}</option>
                  {THEMATIC_DOMAINS.map(d => (
                    <option key={d.id} value={d.title}>
                      {d.icon} {language === "hi" ? d.titleHi : d.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label" style={{ fontSize: "0.78rem" }}>Filter by District (24 Districts)</label>
                <select
                  className="form-select"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                  <option value="all">{t.allDistricts}</option>
                  {JHARKHAND_DISTRICTS.map(dist => (
                    <option key={dist.id} value={dist.id}>
                      {language === "hi" ? dist.nameHi : dist.name} ({dist.division})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Challenges Grid */}
          {filteredChallenges.length === 0 ? (
            <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🔍</div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>No challenges match your filter</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Try resetting your district or domain filters.</p>
              <button onClick={() => { setSelectedDomain("all"); setSelectedDistrict("all"); setSearchQuery(""); }} className="btn btn-secondary btn-sm">
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid-auto-fit">
              {filteredChallenges.map(challenge => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  role={role}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tripartite Ecosystem Stakeholders Section (Desktop) */}
      <section className="desktop-only-section" style={{ padding: "4rem 0", background: "var(--bg-main)", borderTop: "1px solid var(--border-light)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="heading-section">
              The Jharkhand Societal Innovation Ecosystem
            </h2>
            <p className="subheading">
              Four key pillars collaborating seamlessly to drive grassroots technological transformation under NEP 2020.
            </p>
          </div>

          <div className="grid-4">
            <div className="card shadow-sm">
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>👨🏽‍🌾</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>Citizens & PRIs</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                Gram Sabhas, Mukhiyas, NGOs, and citizens crowdsource real problems with multimedia evidence and GPS geotagging.
              </p>
            </div>

            <div className="card shadow-sm">
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🤖</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>AI Triage & Govt</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                Gemini NLP engine categorizes, prioritizes, deduplicates, and recommends best-fit university labs to the Department.
              </p>
            </div>

            <div className="card shadow-sm">
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🎓</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>Universities & HEIs</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                Faculty mentors and student innovators build multidisciplinary working prototypes for capstone NEP 2020 credits.
              </p>
            </div>

            <div className="card shadow-sm">
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🏭</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>Industry & CSR</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                Corporate sponsors and startups sign Tripartite MoUs, co-fund pilots, and provide testing grounds for state deployment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
