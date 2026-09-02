"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "hi" | "sat" | "bn";

export interface Translations {
  portalTitle: string;
  portalSubtitle: string;
  navHome: string;
  navSubmit: string;
  navMySubmissions: string;
  navAdmin: string;
  navUniversity: string;
  navIndustry: string;
  navAnalytics: string;
  navGovernance: string;
  navTraining: string;
  navIntegrations: string;
  navPrivacy: string;
  submitChallenge: string;
  exploreProjects: string;
  heroHeading: string;
  heroHeadingHighlight: string;
  heroSubheading: string;
  heroBadge: string;
  roleCitizen: string;
  roleAdmin: string;
  roleUniversity: string;
  roleIndustry: string;
  challengesReceived: string;
  universitiesEngaged: string;
  csrFundsPledged: string;
  projectsResolved: string;
  thematicDomains: string;
  recentChallenges: string;
  allDistricts: string;
  allDomains: string;
  searchPlaceholder: string;
  statusSubmitted: string;
  statusUnderReview: string;
  statusValidated: string;
  statusAssigned: string;
  statusInProgress: string;
  statusSolutionProposed: string;
  statusTesting: string;
  statusDeployed: string;
  statusResolved: string;
  statusRejected: string;
  priorityCritical: string;
  priorityHigh: string;
  priorityMedium: string;
  priorityLow: string;
  viewDetails: string;
  collaborate: string;
  assignedTo: string;
  notifications: string;
  markAllRead: string;
  noNotifications: string;
  languageName: string;
}

const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    portalTitle: "Jharkhand Innovate",
    portalSubtitle: "Societal Innovation Collaboration Portal (SICP)",
    navHome: "Home",
    navSubmit: "Submit Challenge",
    navMySubmissions: "My Submissions",
    navAdmin: "Govt Admin",
    navUniversity: "University HEI",
    navIndustry: "Industry & CSR",
    navAnalytics: "State Analytics",
    navGovernance: "Governance & Committee",
    navTraining: "Training Academy",
    navIntegrations: "Govt Integrations",
    navPrivacy: "DPDP Privacy",
    submitChallenge: "Submit a Societal Challenge",
    exploreProjects: "Explore Active Projects",
    heroHeading: "Transforming Grassroots Challenges into",
    heroHeadingHighlight: "Innovations for Jharkhand",
    heroSubheading: "An AI-powered collaboration portal connecting citizens and local bodies with Higher Education Institutions (HEIs) and Industry CSR partners under NEP 2020 for deployable, high-impact solutions.",
    heroBadge: "🏛️ Govt of Jharkhand • Dept of Higher & Technical Education • NEP 2020",
    roleCitizen: "Citizen / PRI",
    roleAdmin: "Govt Admin",
    roleUniversity: "University HEI",
    roleIndustry: "Industry Partner",
    challengesReceived: "Challenges Received",
    universitiesEngaged: "Universities & HEIs",
    csrFundsPledged: "CSR Funds Committed",
    projectsResolved: "Deployed Solutions",
    thematicDomains: "Thematic Focus Domains",
    recentChallenges: "Crowdsourced Challenges & Active Projects",
    allDistricts: "All 24 Districts",
    allDomains: "All Domains",
    searchPlaceholder: "Search by keyword, district, or technology...",
    statusSubmitted: "Submitted",
    statusUnderReview: "Under Review",
    statusValidated: "Validated",
    statusAssigned: "Assigned",
    statusInProgress: "In Progress",
    statusSolutionProposed: "Solution Proposed",
    statusTesting: "Under Testing",
    statusDeployed: "Deployed",
    statusResolved: "Resolved",
    statusRejected: "Rejected",
    priorityCritical: "Critical",
    priorityHigh: "High",
    priorityMedium: "Medium",
    priorityLow: "Low",
    viewDetails: "View Project",
    collaborate: "Partner / Sponsor",
    assignedTo: "Assigned Institution",
    notifications: "Notifications",
    markAllRead: "Mark all as read",
    noNotifications: "No new notifications",
    languageName: "English"
  },
  hi: {
    portalTitle: "झारखंड इनोवेट",
    portalSubtitle: "सामाजिक नवाचार सहयोग पोर्टल (SICP)",
    navHome: "होम",
    navSubmit: "समस्या दर्ज करें",
    navMySubmissions: "मेरी प्रस्तुतियाँ",
    navAdmin: "प्रशासन",
    navUniversity: "विश्वविद्यालय",
    navIndustry: "उद्योग व CSR",
    navAnalytics: "राज्य विश्लेषण",
    navGovernance: "शासन एवं समिति",
    navTraining: "प्रशिक्षण अकादमी",
    navIntegrations: "सरकारी एकीकरण",
    navPrivacy: "DPDP गोपनीयता",
    submitChallenge: "सामाजिक चुनौती दर्ज करें",
    exploreProjects: "सक्रिय परियोजनाएं देखें",
    heroHeading: "स्थानीय समस्याओं का समाधान,",
    heroHeadingHighlight: "झारखंड के लिए नवाचार",
    heroSubheading: "राष्ट्रीय शिक्षा नीति (NEP 2020) के तहत नागरिकों, ग्राम पंचायतों और नगर निकायों को विश्वविद्यालयों तथा उद्योग CSR भागीदारों से जोड़ने वाला AI-संचालित नवाचार मंच।",
    heroBadge: "🏛️ झारखंड सरकार • उच्च एवं तकनीकी शिक्षा विभाग • NEP 2020",
    roleCitizen: "नागरिक / ग्राम सभा",
    roleAdmin: "सरकारी प्रशासक",
    roleUniversity: "विश्वविद्यालय (HEI)",
    roleIndustry: "उद्योग / CSR",
    challengesReceived: "कुल दर्ज समस्याएं",
    universitiesEngaged: "संबद्ध विश्वविद्यालय",
    csrFundsPledged: "प्रतिबद्ध CSR फंड",
    projectsResolved: "लागू समाधान",
    thematicDomains: "प्रमुख विषयगत क्षेत्र",
    recentChallenges: "नागरिक चुनौतियां एवं सक्रिय समाधान परियोजनाएं",
    allDistricts: "सभी 24 जिले",
    allDomains: "सभी विषय क्षेत्र",
    searchPlaceholder: "कीवर्ड, जिला या तकनीक द्वारा खोजें...",
    statusSubmitted: "दर्ज किया गया",
    statusUnderReview: "समीक्षाधीन",
    statusValidated: "सत्यापित",
    statusAssigned: "आवंटित",
    statusInProgress: "प्रगति पर",
    statusSolutionProposed: "प्रस्तावित समाधान",
    statusTesting: "परीक्षण जारी",
    statusDeployed: "लागू किया गया",
    statusResolved: "सफलतापूर्वक हल",
    statusRejected: "अस्वीकृत",
    priorityCritical: "अति आवश्यक (Critical)",
    priorityHigh: "उच्च (High)",
    priorityMedium: "मध्यम (Medium)",
    priorityLow: "सामान्य (Low)",
    viewDetails: "परियोजना विवरण",
    collaborate: "सहयोग / प्रायोजन",
    assignedTo: "आवंटित संस्थान",
    notifications: "सूचनाएं",
    markAllRead: "सभी पढ़ी गई चिह्नित करें",
    noNotifications: "कोई नई सूचना नहीं",
    languageName: "हिन्दी"
  },
  sat: {
    portalTitle: "ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱤᱱᱳᱵᱷᱮᱴ",
    portalSubtitle: "ᱥᱟᱶᱛᱟ ᱱᱟᱣᱟᱱ ᱜᱚᱲᱚ ᱯᱳᱨᱴᱟᱞ (SICP)",
    navHome: "ᱳᱲᱟᱜ",
    navSubmit: "ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ ᱢᱮ",
    navMySubmissions: "ᱤᱧᱟᱜ ᱚᱞ ᱠᱚ",
    navAdmin: "ᱥᱚᱨᱠᱟᱨ ᱥᱟᱥᱚᱱ",
    navUniversity: "ᱡᱮᱜᱮᱛ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ",
    navIndustry: "ᱵᱮᱯᱟᱨ ᱟᱨ CSR",
    navAnalytics: "ᱯᱚᱱᱚᱛ ᱞᱮᱠᱷᱟ",
    navGovernance: "ᱥᱟᱥᱚᱱ ᱠᱩᱢᱩᱴ",
    navTraining: "ᱥᱮᱪᱮᱫ ᱮᱠᱟᱰᱮᱢᱤ",
    navIntegrations: "ᱥᱚᱨᱠᱟᱨᱤ ᱡᱚᱲᱟᱣ",
    navPrivacy: "DPDP ᱫᱟᱱᱟᱝ",
    submitChallenge: "ᱥᱟᱶᱛᱟ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ ᱢᱮ",
    exploreProjects: "ᱪᱟᱹᱞᱩ ᱠᱟᱹᱢᱤᱦᱚᱨᱟ ᱧᱮᱞ ᱢᱮ",
    heroHeading: "ᱟᱹᱛᱩ ᱴᱚᱞᱟ ᱨᱮᱱᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱠᱷᱚᱱ",
    heroHeadingHighlight: "ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱞᱟᱹᱜᱤᱫ ᱱᱟᱣᱟᱱ ᱩᱭᱦᱟᱹᱨ",
    heroSubheading: "NEP 2020 ᱟᱛᱮ ᱟᱹᱛᱩ ᱨᱤᱱ ᱦᱚᱲ ᱟᱨ ᱡᱮᱜᱮᱛ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱠᱚ ᱡᱚᱲᱟᱣ ᱠᱟᱛᱮ ᱥᱚᱞᱦᱮ ᱧᱟᱢ ᱞᱟᱹᱜᱤᱫ AI ᱯᱳᱨᱴᱟᱞ᱾",
    heroBadge: "🏛️ ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱥᱚᱨᱠᱟᱨ • ᱪᱮᱛᱟᱱ ᱟᱨ ᱴᱮᱠᱱᱤᱠᱟᱞ ᱥᱮᱪᱮᱫ • NEP 2020",
    roleCitizen: "ᱨᱟᱹᱥᱤᱭᱟᱹ / ᱟᱹᱛᱩ ᱢᱳᱲᱮ ᱦᱚᱲ",
    roleAdmin: "ᱥᱚᱨᱠᱟᱨᱤ ᱟᱹᱢᱟᱹᱞᱤᱭᱟᱹ",
    roleUniversity: "ᱡᱮᱜᱮᱛ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ",
    roleIndustry: "ᱵᱮᱯᱟᱨ ᱜᱚᱲᱚ",
    challengesReceived: "ᱡᱚᱛᱚ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱠᱚ",
    universitiesEngaged: "ᱡᱚᱲᱟᱣ ᱡᱮᱜᱮᱛ ᱵᱤᱨᱫᱟᱹᱜᱟᱲ",
    csrFundsPledged: "CSR ᱠᱟᱹᱣᱰᱤ ᱜᱚᱲᱚ",
    projectsResolved: "ᱥᱚᱞᱦᱮ ᱟᱠᱟᱱ ᱠᱟᱹᱢᱤ",
    thematicDomains: "ᱢᱩᱬᱩᱛ ᱠᱟᱹᱢᱤ ᱴᱷᱟᱶ",
    recentChallenges: "ᱦᱚᱲ ᱠᱚᱣᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱟᱨ ᱥᱚᱞᱦᱮ ᱠᱟᱹᱢᱤ",
    allDistricts: "ᱡᱚᱛᱚ ᱒᱔ ᱦᱚᱱᱚᱛ",
    allDomains: "ᱡᱚᱛᱚ ᱦᱟᱹᱴᱤᱧ",
    searchPlaceholder: "ᱦᱚᱱᱚᱛ ᱵᱟᱝᱠᱷᱟᱱ ᱠᱟᱛᱷᱟ ᱛᱮ ᱥᱮᱸᱫᱽᱨᱟᱭ ᱢᱮ...",
    statusSubmitted: "ᱚᱞ ᱮᱱᱟ",
    statusUnderReview: "ᱯᱟᱨᱠᱷᱟᱣ ᱨᱮ",
    statusValidated: "ᱴᱷᱟᱹᱣᱠᱟᱹ ᱮᱱᱟ",
    statusAssigned: "ᱦᱟᱹᱴᱤᱧ ᱮᱱᱟ",
    statusInProgress: "ᱠᱟᱹᱢᱤ ᱪᱟᱞᱟᱜ ᱠᱟᱱᱟ",
    statusSolutionProposed: "ᱥᱚᱞᱦᱮ ᱩᱭᱦᱟᱹᱨ ᱮᱱᱟ",
    statusTesting: "ᱵᱤᱰᱟᱹᱣ ᱨᱮ",
    statusDeployed: "ᱞᱟᱜᱟᱣ ᱮᱱᱟ",
    statusResolved: "ᱥᱚᱞᱦᱮ ᱮᱱᱟ",
    statusRejected: "ᱵᱟᱝ ᱦᱩᱭ ᱞᱮᱱᱟ",
    priorityCritical: "ᱟᱹᱰᱤ ᱞᱟᱹᱠᱛᱤ",
    priorityHigh: "ᱩᱥᱩᱞ",
    priorityMedium: "ᱛᱟᱞᱟᱢᱟᱞᱟ",
    priorityLow: "ᱥᱟᱫᱷᱟᱨᱚᱱ",
    viewDetails: "ᱵᱤᱵᱚᱨᱚᱬ ᱧᱮᱞ ᱢᱮ",
    collaborate: "ᱜᱚᱲᱚ ᱮᱢ ᱢᱮ",
    assignedTo: "ᱦᱟᱹᱴᱤᱧ ᱴᱷᱟᱶ",
    notifications: "ᱠᱷᱚᱵᱚᱨ ᱠᱚ",
    markAllRead: "ᱡᱚᱛᱚ ᱯᱟᱲᱦᱟᱣ ᱮᱱᱟ",
    noNotifications: "ᱱᱟᱣᱟ ᱠᱷᱚᱵᱚᱨ ᱵᱟᱹᱱᱩᱜᱼᱟ",
    languageName: "ᱥᱟᱱᱛᱟᱲᱤ (Ol Chiki)"
  },
  bn: {
    portalTitle: "ঝাড়খণ্ড ইনোভেট",
    portalSubtitle: "সামাজিক উদ্ভাবন সহযোগিতা পোর্টাল (SICP)",
    navHome: "হোম",
    navSubmit: "সমস্যা জমা দিন",
    navMySubmissions: "আমার জমাকৃত সমস্যা",
    navAdmin: "প্রশাসন",
    navUniversity: "বিশ্ববিদ্যালয়",
    navIndustry: "শিল্প ও CSR",
    navAnalytics: "রাজ্য বিশ্লেষণ",
    navGovernance: "শাসন ও কমিটি",
    navTraining: "প্রশিক্ষণ একাডেমি",
    navIntegrations: "সরকারি ইন্টিগ্রেশন",
    navPrivacy: "DPDP গোপনীয়তা",
    submitChallenge: "সামাজিক চ্যালেঞ্জ জমা দিন",
    exploreProjects: "সক্রিয় প্রকল্পসমূহ দেখুন",
    heroHeading: "স্থানীয় সমস্যার সমাধান,",
    heroHeadingHighlight: "ঝাড়খণ্ডের জন্য উদ্ভাবন",
    heroSubheading: "NEP 2020-এর আওতায় নাগরিক এবং বিশ্ববিদ্যালয় গবেষকদের যুক্ত করে কার্যকর সমাধান তৈরির AI প্ল্যাটফর্ম।",
    heroBadge: "🏛️ ঝাড়খণ্ড সরকার • উচ্চ ও কারিগরি শিক্ষা বিভাগ • NEP 2020",
    roleCitizen: "নাগরিক / গ্রাম সভা",
    roleAdmin: "সরকারি প্রশাসক",
    roleUniversity: "বিশ্ববিদ্যালয় (HEI)",
    roleIndustry: "শিল্প / CSR পার্টনার",
    challengesReceived: "মোট জমা সমস্যা",
    universitiesEngaged: "যুক্ত বিশ্ববিদ্যালয়",
    csrFundsPledged: "প্রতিশ্রুত CSR তহবিল",
    projectsResolved: "বাস্তবায়িত সমাধান",
    thematicDomains: "প্রধান ক্ষেত্রসমূহ",
    recentChallenges: "নাগরিক সমস্যা ও সক্রিয় প্রকল্পসমূহ",
    allDistricts: "সকল ২৪টি জেলা",
    allDomains: "সকল ক্ষেত্র",
    searchPlaceholder: "কীওয়ার্ড বা জেলা দিয়ে খুঁজুন...",
    statusSubmitted: "জমা হয়েছে",
    statusUnderReview: "পর্যালোচনাধীন",
    statusValidated: "যাচাইকৃত",
    statusAssigned: "বরাদ্দকৃত",
    statusInProgress: "চলমান",
    statusSolutionProposed: "প্রস্তাবিত সমাধান",
    statusTesting: "পরীক্ষাধীন",
    statusDeployed: "মোতায়েনকৃত",
    statusResolved: "সমাধান সমাপ্ত",
    statusRejected: "প্রত্যাখ্যাত",
    priorityCritical: "জরুরি (Critical)",
    priorityHigh: "উচ্চ (High)",
    priorityMedium: "মাঝারি (Medium)",
    priorityLow: "সাধারণ (Low)",
    viewDetails: "প্রকল্পের বিবরণ",
    collaborate: "সহযোগিতা করুন",
    assignedTo: "বরাদ্দকৃত প্রতিষ্ঠান",
    notifications: "বিজ্ঞপ্তি",
    markAllRead: "সব পড়া হয়েছে",
    noNotifications: "নতুন বিজ্ঞপ্তি নেই",
    languageName: "বাংলা"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("sih_lang") as Language | null;
    if (saved === "en" || saved === "hi" || saved === "sat" || saved === "bn") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("sih_lang", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: TRANSLATIONS[language] || TRANSLATIONS.en }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
