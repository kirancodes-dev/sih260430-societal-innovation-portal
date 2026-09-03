import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import InstallPrompt from "@/components/InstallPrompt";
import LanguageOnboardingModal from "@/components/LanguageOnboardingModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#047857",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover"
};

export const metadata: Metadata = {
  title: "Jharkhand Innovate — Societal Innovation Collaboration Portal (SICP)",
  description: "AI-enabled platform connecting citizens, Higher Education Institutions (HEIs), and industry partners to solve local challenges across Jharkhand. Built for Smart India Hackathon (SIH 260430 / NEP 2020).",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "JH Innovate"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="has-mobile-nav">
        <LanguageProvider>
          <AuthProvider>
            <NotificationProvider>
              <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100%", maxWidth: "100vw", overflowX: "hidden" }}>
                <Navbar />
                <main style={{ flex: 1, width: "100%", maxWidth: "100vw", overflowX: "hidden" }}>{children}</main>
                <Footer />
                <InstallPrompt />
                <LanguageOnboardingModal />
                <MobileBottomNav />
              </div>
            </NotificationProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
