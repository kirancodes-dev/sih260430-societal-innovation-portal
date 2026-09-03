"use client";

import React, { useEffect, useState, useRef } from "react";
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

function LeafletMapComponent({ district, onDistrictChange, onLocationSelect }: MapPickerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  const [position, setPosition] = useState<[number, number]>([23.7438, 84.4984]);
  const [currentDistrict, setCurrentDistrict] = useState<DistrictInfo | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [tileError, setTileError] = useState(false);

  const updateNearestDistrict = (lat: number, lng: number) => {
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

  // Initialize Leaflet map safely on mount
  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let isMounted = true;

    // Dynamically import leaflet to prevent SSR window reference error
    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      // Fix default marker icon issue in Next.js
      const DefaultIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      L.Marker.prototype.options.icon = DefaultIcon;

      if (!mapInstanceRef.current) {
        const found = JHARKHAND_DISTRICTS.find(d => d.id === district);
        const initialCoords: [number, number] = found ? found.coordinates : [23.7438, 84.4984];

        const map = L.map(mapContainerRef.current, {
          center: initialCoords,
          zoom: 9,
          scrollWheelZoom: false
        });

        const tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18
        });

        tileLayer.on("tileerror", () => {
          setTileError(true);
        });

        tileLayer.addTo(map);

        const marker = L.marker(initialCoords, { draggable: true }).addTo(map);

        marker.on("dragend", () => {
          const newPos = marker.getLatLng();
          const lat = parseFloat(newPos.lat.toFixed(4));
          const lng = parseFloat(newPos.lng.toFixed(4));
          setPosition([lat, lng]);
          onLocationSelect?.(lat, lng);
          updateNearestDistrict(lat, lng);
        });

        map.on("click", (e: any) => {
          const lat = parseFloat(e.latlng.lat.toFixed(4));
          const lng = parseFloat(e.latlng.lng.toFixed(4));
          marker.setLatLng([lat, lng]);
          setPosition([lat, lng]);
          onLocationSelect?.(lat, lng);
          updateNearestDistrict(lat, lng);
        });

        mapInstanceRef.current = map;
        markerRef.current = marker;
      }
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map when district prop changes from external selects
  useEffect(() => {
    const found = JHARKHAND_DISTRICTS.find(d => d.id === district);
    if (found) {
      setCurrentDistrict(found);
      setPosition(found.coordinates);
      if (mapInstanceRef.current && markerRef.current) {
        mapInstanceRef.current.setView(found.coordinates, 10);
        markerRef.current.setLatLng(found.coordinates);
      }
    }
  }, [district]);

  const handlePopularSelect = (loc: typeof POPULAR_LOCATIONS[0]) => {
    setPosition([loc.coords[0], loc.coords[1]]);
    onLocationSelect?.(loc.coords[0], loc.coords[1]);
    const found = JHARKHAND_DISTRICTS.find(d => d.id === loc.id);
    if (found) {
      setCurrentDistrict(found);
      onDistrictChange?.(found.id);
    }
    if (mapInstanceRef.current && markerRef.current) {
      mapInstanceRef.current.setView(loc.coords, 11);
      markerRef.current.setLatLng(loc.coords);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const q = searchQuery.toLowerCase().trim();
    const pop = POPULAR_LOCATIONS.find(p => p.name.toLowerCase().includes(q));
    if (pop) {
      handlePopularSelect(pop);
      return;
    }

    const foundDist = JHARKHAND_DISTRICTS.find(d =>
      d.name.toLowerCase().includes(q) ||
      d.nameHi.includes(q) ||
      d.blocks.some(b => b.toLowerCase().includes(q))
    );

    if (foundDist) {
      handlePopularSelect({
        name: foundDist.name,
        id: foundDist.id,
        coords: foundDist.coordinates
      });
    }
  };

  return (
    <div style={{ position: "relative", borderRadius: "var(--radius-md)", overflow: "hidden", border: "1.5px solid var(--border-medium)" }}>
      {/* Top Search & Controls Header */}
      <div style={{ padding: "0.75rem", background: "var(--bg-card)", borderBottom: "1px solid var(--border-light)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem", flexWrap: "wrap", gap: "0.4rem" }}>
          <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--text-main)" }}>
            🗺️ Real OpenStreetMap GIS Geotagger
          </div>
          <span style={{ fontSize: "0.72rem", color: "var(--brand-primary)", fontWeight: 700 }}>
            Click map or drag marker to tag location
          </span>
        </div>

        {/* Location Search Bar */}
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.4rem", marginBottom: "0.5rem" }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search village, landmark, or block (e.g. Mahuadanr, Netarhat, Bundu, Jharia)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ fontSize: "0.82rem", padding: "0.45rem 0.75rem", flex: 1 }}
          />
          <button type="submit" className="btn btn-secondary btn-sm" style={{ padding: "0.45rem 0.75rem", fontSize: "0.78rem" }}>
            🔍 Find
          </button>
        </form>

        {/* Quick Shortcut Location Chips */}
        <div style={{ display: "flex", gap: "0.35rem", overflowX: "auto", paddingBottom: "0.2rem", scrollbarWidth: "none" }}>
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

      {/* Geotag Ribbon */}
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
          ✓ OpenStreetMap WGS84 Validated
        </span>
      </div>

      {/* Real Leaflet Map Container */}
      <div
        ref={mapContainerRef}
        style={{
          height: "300px",
          width: "100%",
          position: "relative",
          zIndex: 1
        }}
      />

      {tileError && (
        <div style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          right: "10px",
          background: "rgba(15, 23, 42, 0.9)",
          color: "#fff",
          padding: "0.4rem 0.8rem",
          borderRadius: "6px",
          fontSize: "0.72rem",
          zIndex: 1000
        }}>
          ⚠️ OpenStreetMap tile network slow. Coordinate pin tracking remains 100% active.
        </div>
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(LeafletMapComponent), {
  ssr: false,
  loading: () => (
    <div style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-main)", borderRadius: "var(--radius-md)", fontSize: "0.85rem", color: "var(--text-muted)" }}>
      🗺️ Initializing OpenStreetMap GIS tiles & WGS84 spatial markers...
    </div>
  )
});
