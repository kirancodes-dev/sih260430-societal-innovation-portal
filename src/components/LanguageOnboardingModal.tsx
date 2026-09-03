"use client";

import React, { useState, useEffect } from "react";
import { useLanguage, Language } from "@/contexts/LanguageContext";

interface LanguageOnboardingModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function LanguageOnboardingModal({ isOpen, onClose }: LanguageOnboardingModalProps) {
  const { language, setLanguage } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [tempLang, setTempLang] = useState<Language>(language);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const chosen = localStorage.getItem("sih_user_lang_chosen");
      if (!chosen) {
        setShowModal(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen !== undefined) {
      setShowModal(isOpen);
    }
  }, [isOpen]);

  const languagesList: { code: Language; name: string; nativeName: string; script: string; greeting: string; icon: string }[] = [
    {
      code: "hi",
      name: "Hindi",
      nativeName: "हिन्दी",
      script: "देवनागरी",
      greeting: "नमस्ते • जोहार झारखंड",
      icon: "🇮🇳"
    },
    {
      code: "en",
      name: "English",
      nativeName: "English",
      script: "Latin",
      greeting: "Welcome • Johar Jharkhand",
      icon: "🌐"
    },
    {
      code: "sat",
      name: "Santali",
      nativeName: "ᱥᱟᱱᱛᱟᱲᱤ",
      script: "Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)",
      greeting: "ᱡᱚᱦᱟᱨ • ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ",
      icon: "🏹"
    },
    {
      code: "bn",
      name: "Bengali",
      nativeName: "বাংলা",
      script: "বাংলা লিপি",
      greeting: "নমস্কার • জোহার ঝাড়খণ্ড",
      icon: "📜"
    }
  ];

  const handleSelectLanguage = (code: Language) => {
    setTempLang(code);
    setLanguage(code);
  };

  const handleConfirm = () => {
    setLanguage(tempLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("sih_user_lang_chosen", "true");
    }
    setShowModal(false);
    onClose?.();
  };

  if (!showModal) return null;

  return (
    <div className="language-modal-overlay animate-fade-in">
      <div className="language-modal-box">
        {/* Top Header */}
        <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
          <div className="language-modal-emblem">JH</div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginTop: "0.5rem", color: "var(--text-main)", lineHeight: 1.2 }}>
            Select Your Language
          </h2>
          <div style={{ fontSize: "0.85rem", color: "var(--brand-primary)", fontWeight: 700, marginTop: "2px" }}>
            अपनी भाषा चुनें • ᱯᱟᱹᱨᱥᱤ ᱵᱟᱪᱷᱟᱣ ᱢᱮ
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>
            Choose how you want to read & report challenges in Jharkhand
          </p>
        </div>

        {/* 4 Language Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem", marginBottom: "1.25rem" }}>
          {languagesList.map((l) => {
            const isSelected = tempLang === l.code;
            return (
              <div
                key={l.code}
                onClick={() => handleSelectLanguage(l.code)}
                className={`language-card-item ${isSelected ? "selected" : ""}`}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                  <span style={{ fontSize: "1.25rem" }}>{l.icon}</span>
                  <div className={`lang-radio-indicator ${isSelected ? "checked" : ""}`}>
                    {isSelected && "✓"}
                  </div>
                </div>

                <div style={{ marginTop: "0.4rem" }}>
                  <div style={{ fontSize: "1.05rem", fontWeight: 800, color: isSelected ? "var(--brand-primary)" : "var(--text-main)", lineHeight: 1.1 }}>
                    {l.nativeName}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "2px" }}>
                    {l.name} ({l.script})
                  </div>
                </div>

                <div style={{
                  fontSize: "0.68rem",
                  color: isSelected ? "var(--brand-primary)" : "var(--text-light)",
                  fontWeight: 600,
                  marginTop: "0.35rem",
                  paddingTop: "0.25rem",
                  borderTop: "1px dashed var(--border-light)",
                  width: "100%"
                }}>
                  {l.greeting}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Confirm Button */}
        <button
          onClick={handleConfirm}
          className="btn btn-primary btn-lg"
          style={{ width: "100%", justifyContent: "center", fontSize: "1rem", padding: "0.85rem", borderRadius: "var(--radius-md)" }}
        >
          {tempLang === "hi"
            ? "पोर्टल शुरू करें (Continue) →"
            : tempLang === "sat"
            ? "ᱮᱦᱚᱵ ᱢᱮ (Continue) →"
            : tempLang === "bn"
            ? "চালিয়ে যান (Continue) →"
            : "Continue to Portal →"}
        </button>
      </div>
    </div>
  );
}
