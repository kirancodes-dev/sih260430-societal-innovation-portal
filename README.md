# Jharkhand Innovate — Societal Innovation Collaboration Portal
## Smart India Hackathon (SIH 2026) | Problem Statement ID: 26043

> **Organization:** Government of Jharkhand  
> **Department:** Department of Higher & Technical Education  
> **Category:** Software | **Theme:** Smart Education (NEP 2020)

---

## 🌟 Overview

**Jharkhand Innovate** is an AI-powered digital platform designed to crowdsource grassroots societal challenges across all 24 districts of Jharkhand and facilitate collaborative, multidisciplinary problem-solving through Higher Education Institutions (HEIs) and Industry/CSR partnerships.

Aligned with the **National Education Policy (NEP) 2020**, the platform bridges citizen-identified community issues with academic research capabilities and corporate funding to deliver measurable on-ground impact.

---

## 🚀 Key Modules & Capabilities

1. **Citizen & Community Engagement Module (`/submit`, `/my-submissions`)**
   - Crowdsource local challenges with photos, video proof, and documentation.
   - Interactive GIS Geolocation tagging for Jharkhand districts and blocks.
   - Real-time progress tracking from submission to field deployment.

2. **AI-Enabled Problem Management & Smart Routing (`/api/classify`, `lib/ai-classifier.ts`)**
   - Auto-categorization across 12 thematic domains (Water, Agriculture, Healthcare, Education, Mine Reclamation, etc.) via **Gemini AI**.
   - Automatic priority scoring based on urgency and demographic impact.
   - Instant semantic deduplication detection.
   - Smart routing recommending best-fit Jharkhand universities (BIT Mesra, IIT ISM Dhanbad, NIT Jamshedpur, BAU, etc.) based on laboratory specializations.

3. **Government Admin Triage & State Analytics (`/admin`, `/admin/analytics`, `/admin/review/[id]`)**
   - Department dashboard for reviewing, validating, and allocating challenges to HEIs.
   - State-level analytics monitoring domain distribution, district volume, university participation, and CSR capital deployed.

4. **University Experiential Learning Hub (`/university`, `/university/project/[id]`)**
   - HEI coordinator workspace for constituting multidisciplinary faculty and student teams.
   - Solution proposal editor, timeline milestone tracking, and student capstone credit allocation.
   - Grassroots patent and IP filing registry.

5. **Industry & CSR Partnership Marketplace (`/industry`, `/industry/collaborate/[id]`)**
   - Enterprise and startup marketplace for co-funding, mentorship, and prototype testing grounds.
   - Formal Tripartite MOU generation between Citizens, Universities, and Corporate Sponsors.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 15 (App Router, Server Components, TypeScript)
- **Styling:** Custom CSS Design System with responsive grid, glassmorphism & dark mode
- **AI Triage:** Google Gemini API (with fallback NLP heuristics)
- **Maps & Geotagging:** Leaflet.js / Custom GIS Spatial Grid
- **Backend & Database:** Firebase Firestore, Authentication & Cloud Storage

---

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to interact with the portal.

### 3. Persona Switcher (Live Demo)
Use the top header banner to switch between live stakeholder personas:
- **🏛️ Govt Admin:** State Triage, Allocation & Analytics
- **👨🏽‍🌾 Citizen / PRI:** Submit Challenges & Track Submissions
- **🎓 University HEI:** Multidisciplinary Teams & Proposal Editor
- **🏭 Industry Partner:** CSR Grants & Technical Mentorship
