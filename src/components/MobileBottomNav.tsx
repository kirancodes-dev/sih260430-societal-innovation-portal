"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { language } = useLanguage();

  const isHindi = language === "hi";
  const isSantali = language === "sat";

  const navItems = [
    {
      href: "/",
      icon: "🏠",
      label: isHindi ? "होम" : isSantali ? "ᱚᱲᱟᱜ" : "Home",
      isActive: pathname === "/"
    },
    {
      href: "/submit",
      icon: "📢",
      label: isHindi ? "चुनौती दर्ज" : isSantali ? "ᱨᱤᱯᱳᱨᱴ" : "Report",
      isActive: pathname === "/submit",
      highlight: true
    },
    {
      href: "/consultations",
      icon: "🗳️",
      label: isHindi ? "विमर्श" : isSantali ? "ᱵᱤᱪᱟᱹᱨ" : "Deliberation",
      isActive: pathname === "/consultations"
    },
    {
      href: "/participatory-budgeting",
      icon: "💰",
      label: isHindi ? "वोटिंग" : isSantali ? "ᱵᱷᱳᱴ" : "Voting",
      isActive: pathname === "/participatory-budgeting"
    },
    {
      href: "/accountability",
      icon: "📊",
      label: isHindi ? "जवाबदेही" : isSantali ? "ᱦᱤᱥᱟᱹᱵᱽ" : "Track",
      isActive: pathname === "/accountability"
    }
  ];

  return (
    <div className="mobile-bottom-nav">
      <div className="mobile-bottom-nav-inner">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`mobile-nav-tab ${item.isActive ? "active" : ""} ${item.highlight ? "highlight-tab" : ""}`}
          >
            <span className="mobile-nav-icon">{item.icon}</span>
            <span className="mobile-nav-label">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
