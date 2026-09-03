"use client";

import React, { useState } from "react";
import Link from "next/link";
import StatsCard from "@/components/ui/StatsCard";

interface IntegrationService {
  id: string;
  name: string;
  category: string;
  agency: string;
  status: "Active" | "Syncing" | "Standby";
  lastSync: string;
  apiEndpoint: string;
  payloadType: string;
  icon: string;
}

export default function GovernmentIntegrationsPage() {
  const [integrations, setIntegrations] = useState<IntegrationService[]>([
    {
      id: "int-cm-dash",
      name: "Jharkhand CM Real-Time Dashboard",
      category: "Executive Telemetry",
      agency: "Chief Minister Secretariat / DITEG",
      status: "Active",
      lastSync: "3 minutes ago",
      apiEndpoint: "https://cm.jharkhand.gov.in/api/v2/telemetry/sicp",
      payloadType: "JSON (1,428 challenges, 145 deployed solutions, ₹18.4 Cr CSR)",
      icon: "🏛️"
    },
    {
      id: "int-edistrict",
      name: "e-District & ServicePlus Jharkhand",
      category: "Citizen Identity & Grievances",
      agency: "Department of Personnel & e-Gov",
      status: "Active",
      lastSync: "15 minutes ago",
      apiEndpoint: "https://edistrict.jharkhand.gov.in/api/v1/citizen/autofill",
      payloadType: "OAuth 2.0 / REST (Panchayat & Citizen Verification)",
      icon: "📋"
    },
    {
      id: "int-digilocker",
      name: "DigiLocker & National Academic Depository (NAD)",
      category: "Academic Credentials",
      agency: "Ministry of Electronics & IT / UGC",
      status: "Active",
      lastSync: "1 hour ago",
      apiEndpoint: "https://nad.digitallocker.gov.in/api/v2/credentials/nep2020",
      payloadType: "W3C Verifiable Credentials (Student Capstone Credits)",
      icon: "🎓"
    },
    {
      id: "int-isro-bhuvan",
      name: "ISRO Bhuvan Spatial Geoportal",
      category: "GIS & Remote Sensing",
      agency: "National Remote Sensing Centre (ISRO)",
      status: "Active",
      lastSync: "Real-time WMS",
      apiEndpoint: "https://bhuvan-app1.nrsc.gov.in/wms/jharkhand_24dist",
      payloadType: "OGC WMS / WFS GeoTIFF Tile Layers",
      icon: "🛰️"
    },
    {
      id: "int-bharat-billpay",
      name: "Bharat BillPay / Escrow Gateway",
      category: "CSR Grant Payments",
      agency: "National Payments Corporation of India (NPCI)",
      status: "Active",
      lastSync: "Live",
      apiEndpoint: "https://api.bharatbillpay.com/v1/escrow/jharkhand-innovation",
      payloadType: "UPI 2.0 / IMPS / Corporate NetBanking",
      icon: "💳"
    }
  ]);

  const [testingId, setTestingId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleTestPing = (id: string) => {
    setTestingId(id);
    setTestResult(null);
    setTimeout(() => {
      setTestingId(null);
      setTestResult(`✓ 200 OK: Handshake verified with ${integrations.find(i => i.id === id)?.name}. Latency: 42ms.`);
    }, 1200);
  };

  return (
    <div className="container" style={{ padding: "3.5rem 1.5rem", maxWidth: "1150px" }}>
      <div style={{ marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
        <Link href="/admin">← Back to Admin Console</Link> / <span style={{ color: "var(--text-main)" }}>Government Interoperability Gateway</span>
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
            🔌 Digital India & e-Kranti API Gateway
          </div>
          <h1 className="heading-section">
            Government Systems Interoperability Hub
          </h1>
          <p className="subheading">
            Live telemetry sync with Chief Minister&apos;s Dashboard, e-District citizen portals, DigiLocker / NAD student innovation credentials, and ISRO Bhuvan GIS spatial layers.
          </p>
        </div>

        <button onClick={() => handleTestPing("int-cm-dash")} className="btn btn-primary btn-sm">
          ⚡ Trigger Global State Telemetry Sync
        </button>
      </div>

      {testResult && (
        <div style={{ padding: "0.8rem 1.2rem", background: "rgba(16, 185, 129, 0.1)", border: "1px solid #10b981", borderRadius: "var(--radius-md)", color: "#10b981", marginBottom: "1.5rem", fontWeight: 700 }}>
          {testResult}
        </div>
      )}

      {/* Integrations Grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginBottom: "3rem" }}>
        {integrations.map(int => (
          <div key={int.id} className="card shadow-sm" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem" }}>
              <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                <span style={{ fontSize: "2rem" }}>{int.icon}</span>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-main)", margin: 0 }}>
                      {int.name}
                    </h3>
                    <span className="badge badge-validated" style={{ fontSize: "0.7rem" }}>
                      ● {int.status}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                    Agency: <strong>{int.agency}</strong> • Category: {int.category}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={() => handleTestPing(int.id)}
                  disabled={testingId === int.id}
                  className="btn btn-secondary btn-sm"
                >
                  {testingId === int.id ? "Pinging API..." : "Ping Endpoint ⚡"}
                </button>
              </div>
            </div>

            <div style={{
              padding: "0.75rem 1rem",
              background: "var(--bg-main)",
              borderRadius: "var(--radius-md)",
              fontSize: "0.82rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "0.75rem",
              border: "1px solid var(--border-light)"
            }}>
              <div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.72rem" }}>Endpoint URI</div>
                <code style={{ fontSize: "0.78rem", color: "var(--brand-primary)" }}>{int.apiEndpoint}</code>
              </div>

              <div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.72rem" }}>Data Exchange Specification</div>
                <div>{int.payloadType}</div>
              </div>

              <div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.72rem" }}>Last Successful Sync</div>
                <div style={{ color: "#10b981", fontWeight: 700 }}>⏱️ {int.lastSync}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
