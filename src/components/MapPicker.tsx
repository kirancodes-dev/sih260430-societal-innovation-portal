"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { JHARKHAND_DISTRICTS, DistrictInfo } from "@/lib/constants";

interface MapPickerProps {
  district: string;
  onDistrictChange?: (districtId: string) => void;
  onLocationSelect?: (lat: number, lng: number) => void;
}

const POPULAR_LOCATIONS = [
  { name: "Ranchi", id: "ranchi", coords: [23.3441, 85.3096] },
  { name: "Latehar / Mahuadanr", id: "latehar", coords: [23.7438, 84.4984] },
  { name: "Dhanbad / Jharia", id: "dhanbad", coords: [23.7957, 86.4304] },
  { name: "Jamshedpur", id: "east-singhbhum", coords: [22.8046, 86.2029] },
  { name: "Dumka (Santhal Pargana)", id: "dumka", coords: [24.2677, 87.2474] },
  { name: "Chaibasa", id: "west-singhbhum", coords: [22.5519, 85.8078] },
  { name: "Deoghar", id: "deoghar", coords: [24.4826, 86.7001] },
  { name: "Hazaribagh", id: "hazaribagh", coords: [23.9937, 85.3644] },
  { name: "Netarhat Hills", id: "latehar", coords: [23.4795, 84.2694] },
  { name: "Bundu Link Road", id: "ranchi", coords: [23.1783, 85.5867] }
];

function MapComponent({ district, onDistrictChange, onLocationSelect }: MapPickerProps) {
  const [position, setPosition] = useState<[number, number]>([23.7438, 84.4984]); // Default Latehar / Central JH
  const [mounted, setMounted] = useState(false);
  const [currentDistrict, setCurrentDistrict] = useState<DistrictInfo | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
    const found = JHARKHAND_DISTRICTS.find(d => d.id === district);
    if (found) {
      setPosition(found.coordinates);
      setCurrentDistrict(found);
    }
  }, [district]);

  const handleDistrictSelect = (d: DistrictInfo) => {
    setPosition(d.coordinates);
    setCurrentDistrict(d);
    onDistrictChange?.(d.id);
    onLocationSelect?.(d.coordinates[0], d.coordinates[1]);
  };

  const handlePopularSelect = (loc: typeof POPULAR_LOCATIONS[0]) => {
    setPosition([loc.coords[0], loc.coords[1]]);
    onLocationSelect?.(loc.coords[0], loc.coords[1]);
    const found = JHARKHAND_DISTRICTS.find(d => d.id === loc.id);
    if (found) {
      setCurrentDistrict(found);
      onDistrictChange?.(found.id);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Approximate Jharkhand bounding box: Lat [22.0 to 25.5], Lng [83.3 to 87.9]
    const lat = parseFloat((25.5 - y * 3.5).toFixed(4));
    const lng = parseFloat((83.3 + x * 4.6).toFixed(4));

    setPosition([lat, lng]);
    onLocationSelect?.(lat, lng);

    // Find nearest district
    let nearest = JHARKHAND_DISTRICTS[0];
    let minDist = 999;
    for (const d of JHARKHAND_DISTRICTS) {
      const dist = Math.hypot(d.coordinates[0] - lat, d.coordinates[1] - lng);
      if (dist < minDist) {
        minDist = dist;
        nearest = d;
      }
    }
    setCurrentDistrict(nearest);
    onDistrictChange?.(nearest.id);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const q = searchQuery.toLowerCase().trim();
    // Search in popular locations
    const pop = POPULAR_LOCATIONS.find(p => p.name.toLowerCase().includes(q));
    if (pop) {
      handlePopularSelect(pop);
      return;
    }

    // Search in districts & blocks
    const foundDist = JHARKHAND_DISTRICTS.find(d =>
      d.name.toLowerCase().includes(q) ||
      d.nameHi.includes(q) ||
      d.blocks.some(b => b.toLowerCase().includes(q))
    );

    if (foundDist) {
      handleDistrictSelect(foundDist);
    }
  };

  if (!mounted) {
    return (
      <div style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-main)", borderRadius: "var(--radius-md)" }}>
        Loading interactive Jharkhand GIS Map & Spatial Geotagger...
      </div>
    );
  }

  return (
    <div style={{ position: "relative", borderRadius: "var(--radius-md)", overflow: "hidden", border: "1.5px solid var(--border-medium)" }}>
      {/* Search & Tag Anywhere Header */}
      <div style={{
        padding: "0.75rem",
        background: "var(--bg-card)",
        borderBottom: "1px solid var(--border-light)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem", flexWrap: "wrap", gap: "0.4rem" }}>
          <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--text-main)" }}>
            🗺️ Tag Location Anywhere in Jharkhand
          </div>
          <span style={{ fontSize: "0.72rem", color: "var(--brand-primary)", fontWeight: 700 }}>
            Tap map to drop pin wherever
          </span>
        </div>

        {/* Location Search Bar */}
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.4rem", marginBottom: "0.5rem" }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search village, block or landmark (e.g. Mahuadanr, Netarhat, Bundu, Jharia)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ fontSize: "0.82rem", padding: "0.45rem 0.75rem", flex: 1 }}
          />
          <button type="submit" className="btn btn-secondary btn-sm" style={{ padding: "0.45rem 0.75rem", fontSize: "0.78rem" }}>
            🔍 Find
          </button>
        </form>

        {/* Quick Location Chips */}
        <div style={{
          display: "flex",
          gap: "0.35rem",
          overflowX: "auto",
          paddingBottom: "0.2rem",
          scrollbarWidth: "none"
        }}>
          {POPULAR_LOCATIONS.map(p => (
            <button
              key={p.name}
              type="button"
              onClick={() => handlePopularSelect(p)}
              style={{
                fontSize: "0.7rem",
                padding: "0.2rem 0.55rem",
                borderRadius: "var(--radius-full)",
                background: currentDistrict?.id === p.id ? "var(--brand-primary)" : "var(--bg-main)",
                color: currentDistrict?.id === p.id ? "#ffffff" : "var(--text-muted)",
                border: "1px solid var(--border-medium)",
                whiteSpace: "nowrap",
                cursor: "pointer",
                fontWeight: currentDistrict?.id === p.id ? 800 : 500
              }}
            >
              📍 {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Geotag Coordinates Status Ribbon */}
      <div style={{
        padding: "0.45rem 0.85rem",
        background: "rgba(4, 120, 87, 0.08)",
        borderBottom: "1px solid var(--border-light)",
        fontSize: "0.8rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "0.4rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span>📍 Tagged: <strong>{currentDistrict ? currentDistrict.name : "Jharkhand State"}</strong></span>
          <span style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "var(--brand-primary)", fontWeight: 700 }}>
            ({position[0].toFixed(4)}° N, {position[1].toFixed(4)}° E)
          </span>
        </div>
        <span style={{
          fontSize: "0.7rem",
          color: "var(--brand-primary)",
          background: "#ffffff",
          padding: "0.1rem 0.5rem",
          borderRadius: "var(--radius-full)",
          fontWeight: 800,
          border: "1px solid var(--brand-primary)"
        }}>
          ✓ GPS Tag Active
        </span>
      </div>

      {/* Interactive GIS Spatial Grid */}
      <div
        onClick={handleCanvasClick}
        title="Click or tap anywhere on the map to drop the GPS pin"
        style={{
          height: "280px",
          background: "radial-gradient(ellipse at center, #1e293b 0%, #090d16 100%)",
          position: "relative",
          cursor: "crosshair",
          overflow: "hidden",
          userSelect: "none"
        }}
      >
        {/* Spatial Grid Lines */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "25px 25px"
        }} />

        {/* State Boundary Outline Watermark */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "4.5rem",
          fontWeight: 900,
          color: "rgba(255, 255, 255, 0.03)",
          letterSpacing: "0.2em",
          pointerEvents: "none"
        }}>
          JHARKHAND
        </div>

        {/* 24 District Node Markers */}
        {JHARKHAND_DISTRICTS.map((d) => {
          const isSelected = currentDistrict?.id === d.id;
          const topPercent = ((25.5 - d.coordinates[0]) / 3.5) * 80 + 10;
          const leftPercent = ((d.coordinates[1] - 83.3) / 4.6) * 80 + 10;

          return (
            <div
              key={d.id}
              onClick={(e) => {
                e.stopPropagation();
                handleDistrictSelect(d);
              }}
              style={{
                position: "absolute",
                top: `${topPercent}%`,
                left: `${leftPercent}%`,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transform: "translate(-50%, -50%)",
                zIndex: isSelected ? 20 : 5,
                transition: "all 0.2s ease"
              }}
            >
              <div style={{
                width: isSelected ? "18px" : "9px",
                height: isSelected ? "18px" : "9px",
                borderRadius: "50%",
                background: isSelected ? "var(--brand-accent)" : "var(--brand-primary)",
                border: isSelected ? "2.5px solid #ffffff" : "1.5px solid rgba(255,255,255,0.8)",
                boxShadow: isSelected ? "0 0 16px #f59e0b" : "0 0 4px rgba(0,0,0,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.6rem"
              }}>
                {isSelected ? "📍" : ""}
              </div>
              <span style={{
                fontSize: isSelected ? "0.72rem" : "0.62rem",
                marginTop: "2px",
                padding: "1px 4px",
                background: isSelected ? "rgba(245, 158, 11, 0.95)" : "rgba(15, 23, 42, 0.75)",
                borderRadius: "3px",
                color: isSelected ? "#000" : "#cbd5e1",
                fontWeight: isSelected ? 800 : 500,
                whiteSpace: "nowrap"
              }}>
                {d.name}
              </span>
            </div>
          );
        })}

        {/* Active Dropped Pin */}
        <div style={{
          position: "absolute",
          top: `${((25.5 - position[0]) / 3.5) * 80 + 10}%`,
          left: `${((position[1] - 83.3) / 4.6) * 80 + 10}%`,
          transform: "translate(-50%, -100%)",
          pointerEvents: "none",
          zIndex: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <div style={{
            fontSize: "1.8rem",
            filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.8))"
          }}>
            📍
          </div>
        </div>

        {/* Instruction Footer Overlay */}
        <div style={{
          position: "absolute",
          bottom: "6px",
          left: "8px",
          right: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pointerEvents: "none"
        }}>
          <span style={{
            background: "rgba(0, 0, 0, 0.8)",
            padding: "2px 8px",
            borderRadius: "4px",
            fontSize: "0.68rem",
            color: "#94a3b8"
          }}>
            🎯 Tap anywhere on map to pin location wherever the issue occurred
          </span>
          <span style={{
            background: "rgba(0, 0, 0, 0.8)",
            padding: "2px 8px",
            borderRadius: "4px",
            fontSize: "0.68rem",
            color: "var(--brand-accent)",
            fontWeight: 700
          }}>
            24 Districts Spatial Grid
          </span>
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(MapComponent), {
  ssr: false
});
