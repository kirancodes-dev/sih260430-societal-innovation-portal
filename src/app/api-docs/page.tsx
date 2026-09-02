"use client";

import React, { useState } from "react";
import Link from "next/link";

interface EndpointDoc {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  category: "Authentication" | "Challenges" | "AI Triage" | "Universities & Proposals" | "Industry & MoUs" | "Analytics & Telemetry";
  authRequired: boolean;
  roleAllowed: string[];
  summary: string;
  requestSchema?: string;
  responseSample: string;
}

export default function ApiDocumentationPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeEndpointIndex, setActiveEndpointIndex] = useState<number | null>(0);
  const [testResponse, setTestResponse] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const endpoints: EndpointDoc[] = [
    {
      method: "POST",
      path: "/api/v1/auth/login",
      category: "Authentication",
      authRequired: false,
      roleAllowed: ["Public", "Citizen", "Govt Admin", "Faculty", "Student", "Industry"],
      summary: "Authenticate user and issue RS256 signed JWT access token and refresh token.",
      requestSchema: JSON.stringify({ email: "arvind.kumar@jharkhand.gov.in", password: "SecurePass123!" }, null, 2),
      responseSample: JSON.stringify({
        access_token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
        refresh_token: "eyJhbGciOiJSUzI1NiIs...",
        token_type: "Bearer",
        expires_in: 3600,
        user: { uid: "usr-admin-01", role: "admin", name: "Dr. Arvind Kumar, IAS", district: "ranchi" }
      }, null, 2)
    },
    {
      method: "POST",
      path: "/api/v1/challenges",
      category: "Challenges",
      authRequired: true,
      roleAllowed: ["Citizen", "PRI", "ULB", "NGO", "Govt Admin"],
      summary: "Submit a new societal challenge with GPS location, multimedia metadata, and auto-triage trigger.",
      requestSchema: JSON.stringify({
        title: "High Fluoride & Arsenic Contamination in Rural Hand Pumps across Latehar",
        description: "More than 28 villages in Mahuadanr suffer from fluorosis exceeding 3.5 mg/L. Need low-cost filtration.",
        district: "latehar",
        block: "Mahuadanr",
        coordinates: [23.7438, 84.4984],
        submittedBy: { name: "Gram Panchayat Mahuadanr", role: "pri", contact: "mukhiya.mahuadanr@jharkhand.gov.in", anonymous: false },
        alignedSchemeIds: ["jal-jeevan-mission"],
        dpdpConsent: true
      }, null, 2),
      responseSample: JSON.stringify({
        challenge_id: "CH-JH-2026-784",
        status: "Submitted",
        ai_triage: {
          category: "Water Resources & Sanitation",
          subcategory: "Arsenic & Fluoride Filtration",
          priority: "Critical",
          priority_score: 94,
          confidence: 0.96,
          suggested_universities: ["bit-mesra", "iit-ism-dhanbad"]
        },
        deduplication: { is_duplicate: false, similarity_score: 0.08 },
        created_at: "2026-09-01T14:30:00Z"
      }, null, 2)
    },
    {
      method: "POST",
      path: "/api/classify",
      category: "AI Triage",
      authRequired: false,
      roleAllowed: ["Public", "System", "Internal"],
      summary: "Run high-precision NLP multi-label classification, prioritization scoring, deduplication, and XAI feature weights.",
      requestSchema: JSON.stringify({
        title: "Ecological Restoration of Abandoned Coal Mines in Jharia",
        description: "Open-cast overburden produces fugitive dust and acid mine drainage. Need bioremediation.",
        district: "dhanbad",
        block: "Jharia"
      }, null, 2),
      responseSample: JSON.stringify({
        category: "Environment & Forestry",
        subcategory: "Abandoned Mine Land Reclamation",
        confidence: 0.98,
        priority: "Critical",
        priorityScore: 96,
        thematicTags: ["Mine Reclamation", "Fly Ash", "Acid Mine Drainage", "Air Quality"],
        suggestedUniversities: [
          { id: "iit-ism-dhanbad", name: "IIT (ISM) Dhanbad", matchScore: 98, matchReason: "Center of Excellence in Mine Environment" }
        ],
        duplicateCheck: { isDuplicate: false, similarityScore: 0.04 },
        sdgAlignment: ["SDG 15: Life on Land", "SDG 13: Climate Action"],
        tokenWeights: [{ token: "mine", weight: 0.98 }, { token: "reclamation", weight: 0.94 }],
        biasMitigationScore: 98.2
      }, null, 2)
    },
    {
      method: "PUT",
      path: "/api/v1/challenges/{id}/allocate",
      category: "Challenges",
      authRequired: true,
      roleAllowed: ["Govt Admin"],
      summary: "One-click allocation of validated challenge to Higher Education Institutions (HEIs) with state grant earmark.",
      requestSchema: JSON.stringify({
        assignedUniversityId: "bit-mesra",
        status: "Assigned",
        priorityScore: 95,
        stateGrantAllocationLakhs: 25.0,
        comments: "Approved under Jal Jeevan Mission Har Ghar Nal Se Jal tech innovation grant."
      }, null, 2),
      responseSample: JSON.stringify({
        success: true,
        challengeId: "CH-JH-2026-001",
        assignedUniversity: "Birla Institute of Technology (BIT) Mesra",
        status: "Assigned",
        allocatedAt: "2026-09-01T15:00:00Z",
        sha256AuditHash: "8f7a9c1e2b3d4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a"
      }, null, 2)
    },
    {
      method: "POST",
      path: "/api/v1/universities/teams",
      category: "Universities & Proposals",
      authRequired: true,
      roleAllowed: ["Faculty PI", "University Admin"],
      summary: "Form multidisciplinary student research team (validating NEP 2020 requirement of >= 2 departments).",
      requestSchema: JSON.stringify({
        challengeId: "CH-JH-2026-001",
        facultyPiId: "fac-anirban-roy",
        facultyDepartment: "Chemical & Environmental Engineering",
        studentMembers: [
          { name: "Amitabh Kumar", rollNumber: "BT/ENV/22/045", department: "Environmental Science" },
          { name: "Priya Sharma", rollNumber: "BT/CS/22/102", department: "Computer Science & AI" }
        ],
        multidisciplinaryCompliant: true
      }, null, 2),
      responseSample: JSON.stringify({
        teamId: "TEAM-JH-2026-042",
        challengeId: "CH-JH-2026-001",
        departmentsRepresented: ["Chemical & Environmental Engineering", "Computer Science & AI"],
        nep2020Certified: true,
        academicCreditsEarmarked: 6.0,
        status: "Active"
      }, null, 2)
    },
    {
      method: "POST",
      path: "/api/v1/industry/mou/sign",
      category: "Industry & MoUs",
      authRequired: true,
      roleAllowed: ["Industry Partner", "University PI", "Govt Admin"],
      summary: "Execute Tripartite Digital MoU between Citizen / PRI, University PI, and Corporate CSR sponsor with e-Signature.",
      requestSchema: JSON.stringify({
        challengeId: "CH-JH-2026-001",
        industryPartnerId: "tata-steel-csr",
        grantAmountLakhs: 25.0,
        mentorshipHoursWeekly: 8,
        signerName: "Ananya Sengupta",
        signerDesignation: "VP Innovation & CSR",
        eSignaturePin: "784920"
      }, null, 2),
      responseSample: JSON.stringify({
        mouAgreementNumber: "MOU-JH-2026-001",
        status: "Executed_Legally_Binding",
        parties: ["Gram Panchayat Mahuadanr", "BIT Mesra (Dean R&D)", "Tata Steel CSR"],
        timestamp: "2026-09-01T15:30:00Z",
        sha256DigitalSignature: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2"
      }, null, 2)
    },
    {
      method: "GET",
      path: "/api/v1/analytics/telemetry",
      category: "Analytics & Telemetry",
      authRequired: true,
      roleAllowed: ["Govt Admin", "CM Dashboard", "DITEG"],
      summary: "Export live state telemetry payload to Chief Minister's Dashboard and e-Governance monitoring systems.",
      requestSchema: undefined,
      responseSample: JSON.stringify({
        timestamp: "2026-09-01T15:45:00Z",
        state: "Jharkhand",
        metrics: {
          totalChallenges: 1428,
          validatedChallenges: 942,
          assignedToUniversities: 685,
          activeProposals: 412,
          deployedSolutions: 145,
          totalCsrCommittedCr: 18.4,
          studentCapstoneParticipants: 2450
        },
        districtRankings: [
          { district: "ranchi", submissions: 320, resolved: 48 },
          { district: "dhanbad", submissions: 215, resolved: 34 },
          { district: "east-singhbhum", submissions: 198, resolved: 31 }
        ]
      }, null, 2)
    }
  ];

  const categories = ["All", "Authentication", "Challenges", "AI Triage", "Universities & Proposals", "Industry & MoUs", "Analytics & Telemetry"];

  const filteredEndpoints = selectedCategory === "All"
    ? endpoints
    : endpoints.filter(e => e.category === selectedCategory);

  const activeEp = activeEndpointIndex !== null ? filteredEndpoints[activeEndpointIndex] || filteredEndpoints[0] : filteredEndpoints[0];

  const handleExecuteMockApi = () => {
    setIsExecuting(true);
    setTestResponse(null);
    setTimeout(() => {
      setIsExecuting(false);
      setTestResponse(activeEp.responseSample);
    }, 600);
  };

  return (
    <div className="container" style={{ padding: "3.5rem 1.5rem", maxWidth: "1200px" }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
        <Link href="/">← Portal Home</Link> / <span style={{ color: "var(--text-main)" }}>OpenAPI 3.1 & REST API Specification Explorer</span>
      </div>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.3rem 0.8rem",
            background: "var(--brand-primary-light)",
            borderRadius: "var(--radius-full)",
            color: "var(--brand-primary)",
            fontSize: "0.8rem",
            fontWeight: 700,
            marginBottom: "0.5rem"
          }}>
            ⚡ Government-Grade Microservices & REST API Specification
          </div>
          <h1 className="heading-section">
            Jharkhand SICP REST API & OpenAPI 3.1 Specification
          </h1>
          <p className="subheading">
            Exhaustive API documentation for government system integrators, university technical cells, and external state telemetry bridges (CM Dashboard, DigiLocker, ServicePlus).
          </p>
        </div>

        <button
          onClick={() => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(endpoints, null, 2));
            const downloadAnchor = document.createElement("a");
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", "jharkhand_sicp_openapi_v1.json");
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
          }}
          className="btn btn-primary btn-sm"
        >
          📥 Download OpenAPI 3.1 Spec (JSON)
        </button>
      </div>

      {/* Category Pills */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
        {categories.map(c => (
          <button
            key={c}
            onClick={() => { setSelectedCategory(c); setActiveEndpointIndex(0); setTestResponse(null); }}
            style={{
              padding: "0.4rem 0.9rem",
              borderRadius: "var(--radius-full)",
              border: "1px solid var(--border-medium)",
              background: selectedCategory === c ? "var(--brand-primary)" : "var(--bg-card)",
              color: selectedCategory === c ? "#ffffff" : "var(--text-main)",
              fontSize: "0.82rem",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Main Grid: Sidebar + Inspector */}
      <div className="grid-2" style={{ gridTemplateColumns: "1.1fr 1.9fr", gap: "1.5rem", alignItems: "start" }}>
        {/* Endpoints List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {filteredEndpoints.map((ep, idx) => {
            const isSelected = activeEp.path === ep.path && activeEp.method === ep.method;
            const methodColor = ep.method === "POST" ? "#10b981" : ep.method === "GET" ? "#2563eb" : "#f59e0b";
            return (
              <div
                key={idx}
                onClick={() => { setActiveEndpointIndex(idx); setTestResponse(null); }}
                className="card shadow-sm"
                style={{
                  padding: "0.85rem 1rem",
                  cursor: "pointer",
                  borderLeft: isSelected ? `4px solid ${methodColor}` : "1px solid var(--border-medium)",
                  background: isSelected ? "var(--bg-main)" : "var(--bg-card)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.3rem" }}>
                  <span style={{
                    fontSize: "0.72rem",
                    fontWeight: 900,
                    padding: "0.15rem 0.45rem",
                    borderRadius: "4px",
                    background: methodColor,
                    color: "#ffffff"
                  }}>
                    {ep.method}
                  </span>
                  <code style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-main)" }}>
                    {ep.path}
                  </code>
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.3 }}>
                  {ep.summary}
                </div>
              </div>
            );
          })}
        </div>

        {/* Endpoint Inspector & Live Tester */}
        {activeEp && (
          <div className="card shadow-md">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{
                  fontSize: "0.8rem",
                  fontWeight: 900,
                  padding: "0.2rem 0.6rem",
                  borderRadius: "4px",
                  background: activeEp.method === "POST" ? "#10b981" : activeEp.method === "GET" ? "#2563eb" : "#f59e0b",
                  color: "#ffffff"
                }}>
                  {activeEp.method}
                </span>
                <span style={{ fontFamily: "monospace", fontWeight: 800, fontSize: "1.05rem" }}>
                  {activeEp.path}
                </span>
              </div>

              <div style={{ display: "flex", gap: "0.4rem" }}>
                <span className="badge badge-assigned" style={{ fontSize: "0.7rem" }}>
                  {activeEp.authRequired ? "🔒 Bearer JWT Required" : "🌐 Public"}
                </span>
              </div>
            </div>

            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "1.2rem" }}>
              {activeEp.summary}
            </p>

            <div style={{ fontSize: "0.78rem", color: "var(--text-light)", marginBottom: "1.2rem" }}>
              <strong>RBAC Roles Allowed:</strong> {activeEp.roleAllowed.join(" • ")}
            </div>

            {/* Request Schema (if applicable) */}
            {activeEp.requestSchema && (
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
                    Request Body Schema (JSON)
                  </span>
                </div>
                <pre style={{
                  background: "#0f172a",
                  color: "#38bdf8",
                  padding: "1rem",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.78rem",
                  overflowX: "auto",
                  fontFamily: "monospace"
                }}>
                  {activeEp.requestSchema}
                </pre>
              </div>
            )}

            {/* Action Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
                Response Contract (200 / 201 OK)
              </span>
              <button
                onClick={handleExecuteMockApi}
                disabled={isExecuting}
                className="btn btn-primary btn-sm"
              >
                {isExecuting ? "Executing REST Handshake..." : "⚡ Send Mock Request (Test Handshake)"}
              </button>
            </div>

            {/* Response Output */}
            <pre style={{
              background: "#0f172a",
              color: testResponse ? "#4ade80" : "#94a3b8",
              padding: "1rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.78rem",
              overflowX: "auto",
              fontFamily: "monospace",
              border: testResponse ? "2px solid #10b981" : "1px solid #334155"
            }}>
              {testResponse || activeEp.responseSample}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
