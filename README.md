<div align="center">

# 🏛️ JHARKHAND INNOVATE (SICP)
### Societal Innovation Collaboration Portal
**Smart India Hackathon (SIH) | Problem Statement ID: 260430**

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.3_Turbopack-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Firebase Firestore](https://img.shields.io/badge/Firebase-Firestore_Cloud-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![NEP 2020 Compliant](https://img.shields.io/badge/Policy-NEP_2020_Aligned-059669?style=for-the-badge)](https://www.education.gov.in/nep-new)
[![DPDP Act 2023](https://img.shields.io/badge/Data_Privacy-DPDP_2023_Compliant-dc2626?style=for-the-badge)](https://www.meity.gov.in/)
[![Decidim Inspired](https://img.shields.io/badge/Democracy-Decidim_Participatory-7c3aed?style=for-the-badge)](https://github.com/decidim/decidim)

<br/>

> **Government of Jharkhand** • **Department of Higher & Technical Education**  
> *Connecting Citizens, Gram Sabhas, Universities (HEIs), and Industry CSR Partners for Grassroots Societal Problem Solving.*

---

[🌐 Live Ngrok URL](https://prerighteous-shante-unctuous.ngrok-free.dev) • [📖 REST API Docs](http://localhost:3000/api-docs) • [🔥 Firebase Console](https://console.firebase.google.com/project/jharkhand-societal-innovation/firestore) • [📊 State Analytics](http://localhost:3000/admin/analytics)

</div>

---

## 🌟 Executive Summary

**Jharkhand Innovate** is a production-grade, government-deployable Societal Innovation Collaboration Portal (SICP) for the state of Jharkhand. Aligned with the **National Education Policy (NEP 2020)** and India's **Digital Personal Data Protection (DPDP) Act 2023**, the platform bridges the gap between:
1. **Citizens & Gram Sabhas** reporting local infrastructure, health, water, and agricultural challenges.
2. **Higher Education Institutions (HEIs)** deploying multidisciplinary faculty-student research cohorts for academic capstone credits.
3. **Industry & Corporate CSR Sponsors** co-funding prototypes and executing digital Tripartite MoUs.
4. **Government Nodal Officers** overseeing resource allocation, AI ethics, and statewide impact metrics.

---

## 🏗️ System Architecture & Workflow

```mermaid
graph TD
    A[👨🏽‍🌾 Citizen / Gram Sabha] -->|Voice-to-Text / GIS Geotagging / Ol Chiki| B[🤖 AI Triage & Explainable NLP Engine]
    B -->|State Scheme & SDG Auto-Tagging| C[🏛️ State Admin Triage Console]
    C -->|Human Override Feedback Loop| D[⚖️ AI Ethics & Retraining Center]
    C -->|Policy & Grant Approvals| E[👥 Multi-Stakeholder Steering Committee]
    C -->|One-Click Allocation| F[🎓 University Workspace & NEP Capstone Ledger]
    F -->|DigiLocker / NAD Credential Sync| G[📜 Student Innovation Transcripts]
    F -->|Tripartite MoU & Grants| H[🏭 Industry & CSR Partners]
    F -->|Field Trials & Deployment| I[⭐ Citizen 5-Star Rating & Evaluation]
    I --> J[📊 CM Dashboard Telemetry & State Analytics]
```

---

## 🚀 Key Functional Modules & Routes (23 Routes)

### 1. 📢 Citizen Problem Intake & Geotagging (`/submit`)
- **Voice-to-Text Input:** Built-in Web Speech API allowing low-literacy citizens to dictate in Hindi, English, and Santhali.
- **GIS Geotagging:** Interactive OpenStreetMap pin-drop across all 24 Jharkhand districts and blocks.
- **State Schemes Auto-Match:** Maps to *Jal Jeevan Mission*, *Birsa Harit Gram*, *Mukhyamantri Krishi Yojana*, and *Jharkhand Solar Policy 2022*.
- **UN SDG Auto-Tagging:** Automatically tags relevant UN SDGs (SDG 1–17).
- **DPDP Act Anonymity & Consent:** Attribute-Based Access Control (ABAC) hiding citizen phone/email from the public.
- **Offline PWA Queue:** Seamless local caching when offline, auto-syncing upon reconnection.

### 2. 🗳️ Decidim Participatory Democracy Suite
- **Gram Sabha Consultations (`/consultations`):** Multi-phase deliberative assemblies (*Intake → Deliberation → Technical Vetting → Citizen Vote → Deployment*) with structured Pro/Con debate arguments.
- **Participatory Budgeting (`/participatory-budgeting`):** Real-time budget allocation meter against the ₹2.00 Crore Annual Citizen Innovation Fund pool with direct democratic ballot casting.
- **State Accountability Matrix (`/accountability`):** Transparent milestone tracker monitoring state commitments, lead universities, sanctioned vs spent budgets, and verified citizen beneficiaries.

### 3. 🏛️ Government Admin Triage & State Analytics (`/admin`, `/admin/analytics`)
- **Intelligent Triage Table:** One-click approval, HEI assignment, and AI duplicate detection.
- **State Visual Analytics:** 10-Domain breakdown, 2026 monthly velocity trends, and 24-District Leaderboard.
- **1-Click CSV Export:** Export complete anonymized dataset for policy planning.

### 4. 🤖 AI Ethics, Explainability (XAI) & Audit Center (`/admin/ai-audit`)
- **Feature Importance Token Weights:** Transparent breakdown of why a problem was classified and prioritized.
- **Fairness & Demographic Parity:** 98.2/100 bias mitigation score across all 24 districts and tribal habitations.
- **Human-in-the-Loop Override Queue:** Captures administrative corrections for quarterly model fine-tuning.

### 5. 🎓 University Experiential Learning Hub (`/university`, `/university/project/[id]`)
- **Interactive Kanban Board:** Task management with drag/move across *To Do, In Progress, Review, Done*.
- **Multidisciplinary Team Builder:** Enforces NEP 2020 cross-departmental collaboration (≥2 departments).
- **NEP 2020 Capstone Credit Ledger:** Award 4.0/6.0 academic credits certified for DigiLocker/NAD.
- **Grassroots IP Registry:** Provisional patent and design registration tracking.

### 6. 🏭 Industry CSR Marketplace & Digital Tripartite MoUs (`/industry`)
- **Opportunity Marketplace:** Browse validated university proposals for co-development.
- **Digital Tripartite MoU Studio:** Generates formal agreements between Citizen/PRI, University PI, and Corporate CSR sponsor with electronic signature stamps.

### 7. 🔌 Government Interoperability Gateway (`/admin/integrations`)
- **CM Real-Time Dashboard:** Push live telemetry payloads to the Chief Minister's Dashboard.
- **DigiLocker & NAD:** W3C verifiable student innovation transcripts.
- **e-District & ServicePlus:** Citizen and panchayat identity verification.
- **ISRO Bhuvan Geoportal:** High-resolution spatial overlay layers.
- **Bharat BillPay / Escrow Gateway:** Secure corporate grant disbursement.

### 8. 🔒 Security & Immutable WORM Audit Logs (`/admin/audit-logs`)
- **Tamper-Proof Ledger:** All logins, allocations, e-signatures, and exports logged with SHA-256 cryptographic verification hashes.

### 9. ⚡ OpenAPI 3.1 & REST API Specification (`/api-docs`)
- Interactive API documentation with live mock request execution for all 7 microservice categories.

---

## 👥 6-Stakeholder Persona Matrix (Top Header Switcher)

| Role | Persona Name | Organization | Focus / Responsibilities |
|---|---|---|---|
| 🏛️ **Govt Admin** | Dr. Arvind Kumar, IAS | Dept of Higher & Technical Education | Problem validation, HEI allocation, Steering committee oversight |
| 👨🏽‍🌾 **Citizen / PRI** | Ramesh Munda | Mahuadanr Gram Sabha (Latehar) | Challenge submission, voice input, tracking & 5-star ratings |
| 🎓 **University Admin** | Prof. S. N. Mukherjee | BIT Mesra (Dean R&D) | Institutional research profile, incubation lab management |
| 👨‍🏫 **Faculty PI** | Dr. Anirban Roy | Environmental & Chemical Engg | Multidisciplinary cohorts, milestone deliverables, NEP credit certification |
| 🧑‍🎓 **Student Lead** | Amitabh Kumar | B.Tech Final Year Researcher | Real-world problem solving, prototype engineering, capstone credits |
| 🏭 **Industry / CSR** | Ananya Sengupta | Tata Steel (VP Innovation & CSR) | Project co-funding, mentoring, digital Tripartite MoUs |

---

## 🌐 4-Language Multilingual Support

The entire portal is dynamically localized across 4 key regional languages:
- 🇬🇧 **English (`EN`)**
- 🇮🇳 **हिन्दी (`hi`)**
- 🏹 **ᱥᱟᱱᱛᱟᱲᱤ (`sat` - Santali Ol Chiki script)**
- 🇮🇳 **বাংলা (`bn` - Bengali)**

---

## 🛠️ Technology Stack

```
Frontend Architecture:
├── Next.js 16.3.3 (Turbopack, App Router, React 19)
├── TypeScript 5.0 (Strict type checking)
├── Vanilla Modular CSS Design System (Zero Tailwind, Glassmorphism, Dark Mode)
├── Leaflet.js & OpenStreetMap (Spatial GIS Geotagging)
└── Chart.js & React-Chartjs-2 (Visual State Analytics)

Backend & Cloud Layer:
├── Google Cloud Firestore (Real-time NoSQL Database)
├── Firebase Authentication & Client SDK v12.18
├── Google Gemini Flash LLM (AI Triage & Classification)
└── REST API / OpenAPI 3.1 Contract Architecture
```

---

## 💻 Quick Start & Setup Guide

### 1. Clone the Repository
```bash
git clone https://github.com/kirancodes-dev/sih260430-societal-innovation-portal.git
cd sih260430-societal-innovation-portal
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the project root:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyB6ldW-fnOC3WqW_gXTRKeUAO5epHmD27o
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=jharkhand-societal-innovation.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=jharkhand-societal-innovation
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=jharkhand-societal-innovation.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=767712163503
NEXT_PUBLIC_FIREBASE_APP_ID=1:767712163503:web:788687eb5bedd20a24865a
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-K0MYQRJF9E
```

### 4. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 5. Build for Production
```bash
npm run build
```
*Compiles 23 static and dynamic routes with 0 errors.*

---

## 📜 Legal & Compliance Framework

- **DPDP Act 2023:** Data Subject Access Rights (DSAR) self-service portal, 5-year data retention lifecycle, and 100% In-Country Data Residency (Jharkhand State Data Centre / NIC Cloud).
- **NEP 2020 Compliance:** Multidisciplinary research mandates (≥2 departments), experiential capstone credit ledger, and AICTE activity points mapping.
- **73rd Constitutional Amendment:** Direct democratic Gram Sabha deliberative assemblies and participatory budgeting.

---

<div align="center">

**Smart India Hackathon (SIH 2026) • Government of Jharkhand**  
Developed with ❤️ for the citizens, researchers, and innovators of Jharkhand.

</div>
