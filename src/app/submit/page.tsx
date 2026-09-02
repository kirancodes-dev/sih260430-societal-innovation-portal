"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { THEMATIC_DOMAINS, JHARKHAND_DISTRICTS, JHARKHAND_STATE_SCHEMES, UN_SDGS } from "@/lib/constants";
import MapPicker from "@/components/MapPicker";
import { classifySocietalProblem, AIClassificationResult } from "@/lib/ai-classifier";
import { createChallengeInDb } from "@/lib/firestore-service";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNotifications } from "@/contexts/NotificationContext";

export default function SubmitChallengePage() {
  const { t, language } = useLanguage();
  const { addNotification } = useNotifications();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDomainId, setSelectedDomainId] = useState("water-resources");
  const [selectedSubdomain, setSelectedSubdomain] = useState("");
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>("jal-jeevan-mission");
  const [district, setDistrict] = useState("latehar");
  const [block, setBlock] = useState("Mahuadanr");
  const [address, setAddress] = useState("");
  const [gpsCoordinates, setGpsCoordinates] = useState<[number, number]>([23.7438, 84.4984]);

  const [submitterName, setSubmitterName] = useState("Ramesh Munda");
  const [submitterRole, setSubmitterRole] = useState<"citizen" | "pri" | "ulb" | "ngo" | "govt">("pri");
  const [submitterContact, setSubmitterContact] = useState("mukhiya.mahuadanr@jharkhand.gov.in");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [consentGiven, setConsentGiven] = useState(true);

  // Multimedia Files
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);

  // Voice-to-Text Speech Recognition State
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  // Offline Caching & Queue State
  const [isOffline, setIsOffline] = useState(false);
  const [offlineSaved, setOfflineSaved] = useState(false);

  // AI Triage State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<AIClassificationResult | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedId, setGeneratedId] = useState("");

  const currentDomainObj = THEMATIC_DOMAINS.find(d => d.id === selectedDomainId) || THEMATIC_DOMAINS[0];
  const currentDistrictObj = JHARKHAND_DISTRICTS.find(d => d.id === district) || JHARKHAND_DISTRICTS[0];

  useEffect(() => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      setSpeechSupported(true);
    }
  }, []);

  useEffect(() => {
    if (currentDomainObj && currentDomainObj.subcategories.length > 0) {
      setSelectedSubdomain(currentDomainObj.subcategories[0]);
    }
  }, [selectedDomainId]);

  useEffect(() => {
    if (currentDistrictObj && currentDistrictObj.blocks.length > 0) {
      setBlock(currentDistrictObj.blocks[0]);
      setGpsCoordinates(currentDistrictObj.coordinates);
    }
  }, [district]);

  // Voice-to-Text Handler (Web Speech API)
  const handleVoiceInput = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported on this browser. You can type directly in the box.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language === "hi" ? "hi-IN" : language === "bn" ? "bn-IN" : "en-IN";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setDescription(prev => (prev ? `${prev} ${transcript}` : transcript));
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleAIAnalyze = async () => {
    if (!title || description.length < 20) return;
    setIsAnalyzing(true);
    try {
      const result = await classifySocietalProblem(title, description, district, block);
      setAiResult(result);
      const foundDomain = THEMATIC_DOMAINS.find(d => d.title === result.category);
      if (foundDomain) {
        setSelectedDomainId(foundDomain.id);
        setSelectedSubdomain(result.subcategory);
      }
      if (result.alignedStateSchemes.length > 0) {
        setSelectedSchemeId(result.alignedStateSchemes[0].id);
      }
    } catch (e) {
      console.error("AI Analysis error:", e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 5);
      const names = files.map(f => f.name);
      setUploadedPhotos(prev => [...prev, ...names].slice(0, 5));
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedVideo(e.target.files[0].name);
    }
  };

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const names = Array.from(e.target.files).map(f => f.name);
      setUploadedDocs(prev => [...prev, ...names]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentGiven) {
      alert("Please accept the data sharing and privacy policy consent.");
      return;
    }

    const newId = `CH-JH-2026-${Math.floor(100 + Math.random() * 900)}`;
    setGeneratedId(newId);

    // Save directly to Cloud Firestore
    createChallengeInDb({
      id: newId,
      title,
      description,
      category: currentDomainObj.title,
      subcategory: selectedSubdomain,
      district,
      block,
      locationCoordinates: gpsCoordinates,
      priority: aiResult?.priority || "High",
      priorityScore: aiResult?.priorityScore || 85,
      status: "Submitted",
      alignedSchemeIds: selectedSchemeId ? [selectedSchemeId] : [],
      sdgGoals: aiResult?.sdgAlignment || [],
      submittedBy: {
        name: isAnonymous ? "Anonymous Citizen" : submitterName,
        role: submitterRole,
        contact: isAnonymous ? undefined : submitterContact,
        anonymous: isAnonymous
      },
      mediaUrls: uploadedPhotos,
      upvotes: 1,
      views: 1
    });

    // Check if user is in simulated offline mode
    if (isOffline) {
      const queue = JSON.parse(localStorage.getItem("sih_offline_queue") || "[]");
      queue.push({ id: newId, title, description, district, block, submittedAt: new Date().toISOString() });
      localStorage.setItem("sih_offline_queue", JSON.stringify(queue));
      setOfflineSaved(true);
    }

    setIsSubmitted(true);

    addNotification({
      type: "challenge_submitted",
      title: "Societal Challenge Logged",
      body: `Challenge #${newId} recorded for ${currentDistrictObj.name}. State Triage & AI Routing initiated.`,
      targetRole: "admin",
      link: `/admin/review/${newId}`
    });
  };

  return (
    <div className="container" style={{ padding: "3.5rem 1.5rem", maxWidth: "1050px" }}>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.35rem 0.85rem",
          background: "var(--brand-primary-light)",
          borderRadius: "var(--radius-full)",
          color: "var(--brand-primary)",
          fontSize: "0.82rem",
          fontWeight: 700,
          marginBottom: "0.75rem"
        }}>
          📢 {language === "hi" ? "नागरिक व समुदाय समस्या निवारण पोर्टल" : "Citizen & Community Problem Submission"}
        </div>
        <h1 className="heading-section">
          {language === "hi" ? "सामाजिक समस्या दर्ज करें" : "Submit a Grassroots Societal Challenge"}
        </h1>
        <p className="subheading">
          {language === "hi"
            ? "पानी, स्वास्थ्य, कृषि, शिक्षा और पर्यावरण से जुड़ी समस्याओं को दर्ज करें। AI द्वारा त्वरित वर्गीकरण, राज्य योजना मैपिंग और झारखंड के शीर्ष शोध संस्थानों को सीधी कनेक्टिविटी।"
            : "Report local issues with multimedia proof, voice-to-text, and GPS location. Integrated with State Schemes (Jal Jeevan Mission, Birsa Harit Gram) and UN SDGs."}
        </p>

        {/* Offline Mode Simulator Switch */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem", fontSize: "0.8rem", background: "var(--bg-card)", padding: "0.3rem 0.75rem", borderRadius: "var(--radius-full)", border: "1px solid var(--border-medium)" }}>
          <span>📶 Connectivity:</span>
          <button
            type="button"
            onClick={() => setIsOffline(!isOffline)}
            style={{
              padding: "0.15rem 0.6rem",
              borderRadius: "var(--radius-full)",
              border: "none",
              background: isOffline ? "var(--brand-accent)" : "var(--brand-primary)",
              color: "#ffffff",
              fontSize: "0.75rem",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            {isOffline ? "⚠️ Offline Mode (Local Sync Queue)" : "✓ Online (Cloud Live)"}
          </button>
        </div>
      </div>

      {isSubmitted ? (
        <div className="card" style={{ textAlign: "center", padding: "4rem 2rem", borderTop: "5px solid var(--brand-primary)" }}>
          <div style={{ fontSize: "4.5rem", marginBottom: "1rem" }}>🎉</div>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem", color: "var(--text-main)" }}>
            {language === "hi" ? "समस्या सफलतापूर्वक दर्ज की गई!" : "Challenge Successfully Logged!"}
          </h2>
          <p style={{ color: "var(--text-muted)", maxWidth: "620px", margin: "0 auto 1.5rem", lineHeight: 1.6 }}>
            {offlineSaved
              ? "Your submission has been cached securely in offline storage and will auto-synchronize to the State NIC database upon internet connection."
              : "Your challenge has been mapped to Jharkhand State Innovation Grants, tagged with UN SDGs, and routed to the Department of Higher & Technical Education."}
          </p>

          <div style={{
            display: "inline-block",
            padding: "1.2rem 2.5rem",
            background: "var(--bg-main)",
            borderRadius: "var(--radius-md)",
            border: "2px dashed var(--brand-primary)",
            marginBottom: "2rem"
          }}>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Unique Tracking Challenge ID
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--brand-primary)", fontFamily: "monospace", marginTop: "0.3rem" }}>
              {generatedId}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/my-submissions" className="btn btn-primary btn-lg">
              {language === "hi" ? "मेरी प्रस्तुतियां देखें →" : "Track My Submissions →"}
            </Link>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setTitle("");
                setDescription("");
                setAiResult(null);
                setUploadedPhotos([]);
              }}
              className="btn btn-secondary btn-lg"
            >
              {language === "hi" ? "+ एक और समस्या दर्ज करें" : "+ Submit Another Challenge"}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid-2" style={{ gap: "2rem", alignItems: "start" }}>
            {/* Left Column: Core Fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Challenge Title */}
              <div className="card">
                <label className="form-label" style={{ fontWeight: 700 }}>
                  {language === "hi" ? "समस्या का शीर्षक" : "Challenge Title"} <span style={{ color: "var(--brand-danger)" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={200}
                  className="form-input"
                  placeholder="e.g., High Fluoride & Arsenic Contamination in Rural Hand Pumps"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div style={{ fontSize: "0.75rem", color: "var(--text-light)", marginTop: "0.3rem", display: "flex", justifyContent: "space-between" }}>
                  <span>Be specific and concise (Max 200 chars)</span>
                  <span>{title.length}/200</span>
                </div>
              </div>

              {/* Description with Voice-to-Text */}
              <div className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <label className="form-label" style={{ fontWeight: 700, margin: 0 }}>
                    {language === "hi" ? "समस्या का विस्तृत विवरण" : "Detailed Description & Demographic Impact"} <span style={{ color: "var(--brand-danger)" }}>*</span>
                  </label>

                  {/* Voice-to-Text Button */}
                  <button
                    type="button"
                    onClick={handleVoiceInput}
                    className={`btn btn-sm ${isListening ? "btn-primary" : "btn-secondary"}`}
                    style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem" }}
                    title="Speak in Hindi, English or Santhali"
                  >
                    {isListening ? "🎙️ Listening... Speak Now" : "🎤 Speak (Voice-to-Text)"}
                  </button>
                </div>

                <textarea
                  required
                  rows={5}
                  minLength={40}
                  className="form-textarea"
                  placeholder="Describe the affected population, severity, current failed remedies, and technological solution needed (or click the microphone button to dictate in Hindi/English)..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.6rem" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>
                    Min 40 characters ({description.length} chars entered)
                  </span>
                  <button
                    type="button"
                    onClick={handleAIAnalyze}
                    disabled={isAnalyzing || !title || description.length < 20}
                    className="btn btn-secondary btn-sm"
                    style={{ background: "linear-gradient(135deg, rgba(67,56,202,0.1), rgba(4,120,87,0.1))", border: "1px solid var(--brand-indigo)" }}
                  >
                    {isAnalyzing ? "🤖 Analyzing with AI..." : "✨ Run AI Triage & Match"}
                  </button>
                </div>
              </div>

              {/* Thematic Domain, Sub-domain & State Schemes */}
              <div className="card">
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>
                  {language === "hi" ? "विषयगत क्षेत्र एवं सरकारी योजना मैपिंग" : "Thematic Domain & State Scheme Alignment"}
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label className="form-label">Primary Thematic Domain (NEP 2020)</label>
                    <select
                      className="form-select"
                      value={selectedDomainId}
                      onChange={(e) => setSelectedDomainId(e.target.value)}
                    >
                      {THEMATIC_DOMAINS.map(d => (
                        <option key={d.id} value={d.id}>
                          {d.icon} {language === "hi" ? d.titleHi : d.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Sub-Domain / Specialized Track</label>
                    <select
                      className="form-select"
                      value={selectedSubdomain}
                      onChange={(e) => setSelectedSubdomain(e.target.value)}
                    >
                      {currentDomainObj.subcategories.map((sub, idx) => (
                        <option key={idx} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Aligned Jharkhand State Government Scheme</label>
                    <select
                      className="form-select"
                      value={selectedSchemeId}
                      onChange={(e) => setSelectedSchemeId(e.target.value)}
                    >
                      <option value="">None / Open Challenge</option>
                      {JHARKHAND_STATE_SCHEMES.map(s => (
                        <option key={s.id} value={s.id}>
                          🏛️ {s.name} ({s.department})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Submitter Details & DPDP Act Anonymity */}
              <div className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>
                    {language === "hi" ? "प्रस्तुतकर्ता का विवरण" : "Submitter Information (DPDP 2023)"}
                  </h3>
                  <span className="badge badge-validated" style={{ fontSize: "0.7rem" }}>
                    🔒 ABAC Protected
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  <div>
                    <label className="form-label">Submitter Role</label>
                    <select
                      className="form-select"
                      value={submitterRole}
                      onChange={(e) => setSubmitterRole(e.target.value as any)}
                    >
                      <option value="citizen">Individual Citizen</option>
                      <option value="pri">Panchayati Raj Institution (PRI / Gram Sabha / Mukhiya)</option>
                      <option value="ulb">Urban Local Body (ULB / Nagar Nigam)</option>
                      <option value="ngo">Community NGO / Self-Help Group (SHG)</option>
                      <option value="govt">Government Field Official</option>
                    </select>
                  </div>

                  {!isAnonymous && (
                    <div className="grid-2" style={{ gap: "0.75rem" }}>
                      <div>
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-input"
                          value={submitterName}
                          onChange={(e) => setSubmitterName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="form-label">Phone / Email</label>
                        <input
                          type="text"
                          className="form-input"
                          value={submitterContact}
                          onChange={(e) => setSubmitterContact(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", cursor: "pointer", marginTop: "0.2rem" }}>
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                    />
                    <span>Submit anonymously (Visible only to assigned university PI & Govt Admin)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Location, Evidence, AI XAI Breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Location & GIS Geotagging */}
              <div className="card">
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.8rem" }}>
                  📍 {language === "hi" ? "स्थान व GIS जियोटैगिंग" : "Location & GIS Geotagging"}
                </h3>

                <div className="grid-2" style={{ gap: "0.75rem", marginBottom: "1rem" }}>
                  <div>
                    <label className="form-label">District (24 Districts)</label>
                    <select
                      className="form-select"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    >
                      {JHARKHAND_DISTRICTS.map(d => (
                        <option key={d.id} value={d.id}>
                          {language === "hi" ? d.nameHi : d.name} ({d.division})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Block / Municipality</label>
                    <select
                      className="form-select"
                      value={block}
                      onChange={(e) => setBlock(e.target.value)}
                    >
                      {currentDistrictObj.blocks.map(b => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label className="form-label">Village / Habitation Address</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Near Mahuadanr High School, Mahuadanr Panchayat"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <MapPicker
                  district={district}
                  onDistrictChange={(dId) => setDistrict(dId)}
                  onLocationSelect={(lat, lng) => setGpsCoordinates([lat, lng])}
                />
              </div>

              {/* Multimedia Evidence */}
              <div className="card">
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.8rem" }}>
                  📸 {language === "hi" ? "मल्टीमीडिया साक्ष्य" : "Multimedia Evidence & Test Data"}
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                  <div>
                    <label className="form-label">Upload Photos (Max 5, ≤5MB each)</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="form-input"
                      style={{ padding: "0.4rem" }}
                    />
                    {uploadedPhotos.length > 0 && (
                      <div style={{ fontSize: "0.8rem", color: "var(--brand-primary)", marginTop: "0.3rem" }}>
                        ✓ {uploadedPhotos.length} photo(s) attached: {uploadedPhotos.join(", ")}
                      </div>
                    )}
                  </div>

                  <div className="grid-2" style={{ gap: "0.75rem" }}>
                    <div>
                      <label className="form-label">Video (≤50MB, MP4/WebM)</label>
                      <input
                        type="file"
                        accept="video/mp4,video/webm"
                        onChange={handleVideoUpload}
                        className="form-input"
                        style={{ padding: "0.4rem" }}
                      />
                      {uploadedVideo && (
                        <div style={{ fontSize: "0.75rem", color: "var(--brand-primary)", marginTop: "0.2rem" }}>
                          ✓ Video attached: {uploadedVideo}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="form-label">Documents (Lab Reports / PDF ≤10MB)</label>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        multiple
                        onChange={handleDocUpload}
                        className="form-input"
                        style={{ padding: "0.4rem" }}
                      />
                      {uploadedDocs.length > 0 && (
                        <div style={{ fontSize: "0.75rem", color: "var(--brand-primary)", marginTop: "0.2rem" }}>
                          ✓ {uploadedDocs.length} doc(s) attached
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Explainable AI (XAI) Transparency Card */}
              {aiResult && (
                <div className="card shadow-md" style={{ background: "linear-gradient(135deg, rgba(4,120,87,0.06), rgba(67,56,202,0.06))", border: "1.5px solid var(--brand-primary)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                    <span style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--brand-primary)" }}>
                      🤖 Explainable AI (XAI) Triage Breakdown
                    </span>
                    <span className="badge badge-validated">
                      {Math.round(aiResult.confidence * 100)}% Confidence
                    </span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", fontSize: "0.85rem", marginBottom: "0.8rem" }}>
                    <div>
                      <div style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>Priority Score (Weighted)</div>
                      <div style={{ fontWeight: 800, fontSize: "1.1rem", color: aiResult.priority === "Critical" ? "var(--brand-danger)" : "var(--brand-primary)" }}>
                        {aiResult.priorityScore}/100 ({aiResult.priority})
                      </div>
                    </div>
                    <div>
                      <div style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>Bias & Representation Score</div>
                      <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "#10b981" }}>
                        {aiResult.biasMitigationScore}/100 (Fairness Verified)
                      </div>
                    </div>
                  </div>

                  {/* Token Weights Explanation */}
                  <div style={{ marginBottom: "0.8rem" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                      Key Token Explanations (Feature Importance):
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {aiResult.tokenWeights.map((tw, idx) => (
                        <span key={idx} style={{ fontSize: "0.72rem", padding: "0.15rem 0.5rem", background: "var(--bg-main)", borderRadius: "4px", border: "1px solid var(--border-medium)" }}>
                          <strong>{tw.token}</strong> ({Math.round(tw.weight * 100)}%)
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* UN SDGs Tagging */}
                  <div style={{ marginBottom: "0.8rem" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                      Matched UN Sustainable Development Goals (SDGs):
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                      {aiResult.sdgAlignment.map((sdg, idx) => (
                        <span key={idx} className="badge badge-assigned" style={{ fontSize: "0.72rem" }}>
                          🌐 {sdg}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ fontSize: "0.75rem", color: "var(--text-light)", fontStyle: "italic" }}>
                    {aiResult.reasoning}
                  </div>
                </div>
              )}

              {/* Consent & Submit Button */}
              <div className="card">
                <label style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.82rem", cursor: "pointer", marginBottom: "1.2rem" }}>
                  <input
                    type="checkbox"
                    required
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    style={{ marginTop: "0.2rem" }}
                  />
                  <span>
                    I consent to sharing this challenge data with Government of Jharkhand departments, Higher Education Institutions (HEIs), and Industry CSR partners under the <strong>Digital Personal Data Protection (DPDP) Act 2023</strong> & SIH Guidelines.
                  </span>
                </label>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  🚀 {language === "hi" ? "चुनौती राज्य पोर्टल पर दर्ज करें" : "Submit Challenge to State Portal"}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
