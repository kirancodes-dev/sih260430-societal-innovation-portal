"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserRole, UserProfile } from "@/lib/constants";

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const PERSONA_PROFILES: Record<UserRole, UserProfile> = {
  citizen: {
    uid: "citizen-demo-01",
    email: "ramesh.munda@ranchi.org",
    displayName: "Ramesh Munda (Mukhiya / Gram Sabha)",
    role: "citizen",
    organization: "Mahuadanr Gram Sabha, Latehar",
    district: "latehar",
    phone: "+91 98351 23456",
    avatar: "👨🏽‍🌾"
  },
  admin: {
    uid: "admin-gov-01",
    email: "secy.hed@jharkhand.gov.in",
    displayName: "Dr. Arvind Kumar, IAS (State Nodal Officer)",
    role: "admin",
    organization: "Dept of Higher & Technical Education, Govt of Jharkhand",
    district: "ranchi",
    phone: "+91 651 2400123",
    avatar: "🏛️"
  },
  university: {
    uid: "univ-bit-01",
    email: "dean.research@bitmesra.ac.in",
    displayName: "Prof. S. N. Mukherjee (Dean R&D)",
    role: "university",
    organization: "Birla Institute of Technology (BIT) Mesra",
    district: "ranchi",
    phone: "+91 651 2275444",
    avatar: "🎓"
  },
  faculty: {
    uid: "fac-roy-01",
    email: "anirban.roy@bitmesra.ac.in",
    displayName: "Dr. Anirban Roy (Faculty Principal Investigator)",
    role: "faculty",
    organization: "Dept of Chemical & Environmental Engg, BIT Mesra",
    district: "ranchi",
    phone: "+91 651 2275890",
    avatar: "👨‍🏫"
  },
  student: {
    uid: "stud-amitabh-01",
    email: "amitabh.k@student.bitmesra.ac.in",
    displayName: "Amitabh Kumar (Student Project Lead)",
    role: "student",
    organization: "BIT Mesra • B.Tech Chemical (Final Year)",
    district: "ranchi",
    phone: "+91 91234 56780",
    avatar: "🧑‍🎓"
  },
  industry: {
    uid: "ind-tata-01",
    email: "csr.jharkhand@tatasteel.com",
    displayName: "Ananya Sengupta (VP Innovation & CSR Grants)",
    role: "industry",
    organization: "Tata Steel CSR & Innovation Hub",
    district: "east-singhbhum",
    phone: "+91 657 6644222",
    avatar: "🏭"
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("admin");
  const [user, setUser] = useState<UserProfile | null>(PERSONA_PROFILES["admin"]);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("sih_theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("sih_theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    setUser(PERSONA_PROFILES[newRole] || PERSONA_PROFILES["citizen"]);
  };

  const login = (email: string, selectedRole: UserRole) => {
    const customUser: UserProfile = {
      ...(PERSONA_PROFILES[selectedRole] || PERSONA_PROFILES["citizen"]),
      email,
      displayName: email.split("@")[0].toUpperCase()
    };
    setRoleState(selectedRole);
    setUser(customUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, setRole, login, logout, theme, toggleTheme }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
