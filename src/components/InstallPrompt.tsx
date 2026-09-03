"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function InstallPrompt() {
  const { language } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already running in standalone PWA mode (full screen)
    if (typeof window !== "undefined") {
      const isStandaloneMode = window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true;
      setIsStandalone(isStandaloneMode);

      const userDismissed = sessionStorage.getItem("pwa_prompt_dismissed");
      if (isStandaloneMode || userDismissed) {
        return;
      }

      // Check iOS device
      const isIosDevice = /iphone|ipad|ipod/i.test(window.navigator.userAgent.toLowerCase());
      setIsIOS(isIosDevice);

      // Listen for Android / Chrome PWA install prompt
      const handleBeforeInstall = (e: any) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setShowPrompt(true);
      };

      window.addEventListener("beforeinstallprompt", handleBeforeInstall);

      // If on mobile and not dismissed, show after 2 seconds
      if (window.innerWidth <= 768) {
        const timer = setTimeout(() => {
          setShowPrompt(true);
        }, 1500);
        return () => clearTimeout(timer);
      }

      return () => {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      };
    }
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("pwa_prompt_dismissed", "true");
    }
  };

  if (!showPrompt || isStandalone) {
    return null;
  }

  const isHindi = language === "hi";

  return (
    <div className="install-pwa-banner animate-fade-in">
      <div className="install-pwa-inner">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div className="install-pwa-icon">JH</div>
          <div>
            <div style={{ fontSize: "0.88rem", fontWeight: 800, lineHeight: 1.2, color: "var(--text-main)" }}>
              {isHindi ? "होम स्क्रीन पर जोड़ें (Full Screen App)" : "Add to Home Screen (Full Screen App)"}
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "2px" }}>
              {isIOS
                ? (isHindi ? "Safari में 'Share ⎋' दबाएं फिर 'Add to Home Screen ➕' चुनें" : "Tap Share ⎋ below, then choose 'Add to Home Screen ➕'")
                : (isHindi ? "फास्ट, फुल-स्क्रीन व आसान उपयोग के लिए इंस्टॉल करें" : "Install for full-screen app experience & fast offline access")}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.5rem" }}>
          {!isIOS && deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="btn btn-primary btn-sm"
              style={{ padding: "0.35rem 0.8rem", fontSize: "0.78rem" }}
            >
              📲 {isHindi ? "इंस्टॉल करें" : "Install App"}
            </button>
          )}

          <button
            onClick={handleDismiss}
            style={{
              padding: "0.35rem 0.6rem",
              fontSize: "0.75rem",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-medium)",
              background: "var(--bg-main)",
              color: "var(--text-muted)",
              cursor: "pointer"
            }}
          >
            {isHindi ? "बाद में" : "Dismiss"}
          </button>
        </div>
      </div>
    </div>
  );
}
