"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserRole, UserProfile } from "@/types/portal";
import { auth, db } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface AuthContextType {
  user: UserProfile | null;
  firebaseUser: FirebaseUser | null;
  role: UserRole;
  loading: boolean;
  isDemoMode: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signUp: (email: string, pass: string, name: string, role: UserRole, org?: string) => Promise<void>;
  signInDemoEvaluator: (role: UserRole, email: string, name: string) => void;
  logout: () => Promise<void>;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const DEMO_EVALUATOR_PROFILES: Record<UserRole, UserProfile> = {
  admin: {
    uid: "demo-admin-hed",
    email: "admin.hed@jharkhand.gov.in",
    displayName: "Dr. Arvind Kumar, IAS (State Nodal Officer)",
    role: "admin",
    organization: "Dept of Higher & Technical Education, Govt of Jharkhand",
    district: "ranchi",
    phone: "+91 651 2400123",
    avatar: "🏛️"
  },
  citizen: {
    uid: "demo-citizen-munda",
    email: "ramesh.munda@latehar.org",
    displayName: "Ramesh Munda (Gram Sabha Mukhiya)",
    role: "citizen",
    organization: "Mahuadanr Gram Panchayat, Latehar",
    district: "latehar",
    phone: "+91 98351 23456",
    avatar: "👨🏽‍🌾"
  },
  pri_ulb: {
    uid: "demo-pri-sarpanch",
    email: "sarpanch.bundu@jharkhand.gov.in",
    displayName: "Sushila Devi (Panchayat Samiti Head)",
    role: "pri_ulb",
    organization: "Bundu Block Panchayat Samiti",
    district: "ranchi",
    phone: "+91 94311 88776",
    avatar: "🗳️"
  },
  university_admin: {
    uid: "demo-univ-bit",
    email: "dean.research@bitmesra.ac.in",
    displayName: "Prof. S. N. Mukherjee (Dean R&D)",
    role: "university_admin",
    organization: "Birla Institute of Technology (BIT) Mesra",
    district: "ranchi",
    phone: "+91 651 2275444",
    avatar: "🎓"
  },
  faculty: {
    uid: "demo-fac-roy",
    email: "anirban.roy@bitmesra.ac.in",
    displayName: "Dr. Anirban Roy (Faculty Principal Investigator)",
    role: "faculty",
    organization: "Dept of Chemical & Environmental Engineering, BIT Mesra",
    district: "ranchi",
    phone: "+91 651 2275890",
    avatar: "👨‍🏫"
  },
  student: {
    uid: "demo-stud-amitabh",
    email: "amitabh.k@student.bitmesra.ac.in",
    displayName: "Amitabh Kumar (Student Project Lead)",
    role: "student",
    organization: "BIT Mesra • B.Tech Chemical Engg",
    district: "ranchi",
    phone: "+91 91234 56780",
    avatar: "🧑‍🎓"
  },
  industry: {
    uid: "demo-ind-tata",
    email: "csr.jharkhand@tatasteel.com",
    displayName: "Ananya Sengupta (VP Innovation & CSR Grants)",
    role: "industry",
    organization: "Tata Steel CSR & Innovation Hub",
    district: "east-singhbhum",
    phone: "+91 657 6644222",
    avatar: "🏭"
  },
  startup: {
    uid: "demo-startup-agri",
    email: "founder@jharkhandagritech.in",
    displayName: "Vikram Mahto (Founder)",
    role: "startup",
    organization: "KisanDrone AgTech Solutions",
    district: "ranchi",
    phone: "+91 98765 43210",
    avatar: "🚀"
  },
  msme: {
    uid: "demo-msme-adityapur",
    email: "director@adityapurtools.co.in",
    displayName: "Rajesh Sharma (Managing Director)",
    role: "msme",
    organization: "Adityapur Precision Tooling Works",
    district: "saraikela-kharsawan",
    phone: "+91 657 2389100",
    avatar: "⚙️"
  },
  csr: {
    uid: "demo-csr-sail",
    email: "csr@bokarosteel.sail.in",
    displayName: "Manoj Hansda (Head of Community Development)",
    role: "csr",
    organization: "SAIL Bokaro Steel CSR Foundation",
    district: "bokaro",
    phone: "+91 6542 240111",
    avatar: "🤝"
  },
  research: {
    uid: "demo-res-ism",
    email: "envlab@iitism.ac.in",
    displayName: "Dr. Priyadarshi Sen (Director of Research)",
    role: "research",
    organization: "IIT (ISM) Dhanbad Clean Earth Lab",
    district: "dhanbad",
    phone: "+91 326 2235000",
    avatar: "🔬"
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Safe theme initializer without setState cascading warning
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("sih_theme") as "light" | "dark" | null;
      if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
      }
    }
  }, []);

  // Listen to true Firebase Auth state changes
  useEffect(() => {
    // Check if evaluator demo session is active in sessionStorage
    if (typeof window !== "undefined") {
      const demoSession = sessionStorage.getItem("sih_demo_user");
      if (demoSession) {
        try {
          const parsed = JSON.parse(demoSession);
          setUser(parsed);
          setIsDemoMode(true);
          setLoading(false);
          return;
        } catch (e) {
          console.warn("Invalid demo session stored", e);
        }
      }
    }

    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        try {
          if (db) {
            const userDoc = await getDoc(doc(db, "users", fbUser.uid));
            if (userDoc.exists()) {
              setUser({ uid: fbUser.uid, ...userDoc.data() } as UserProfile);
            } else {
              // Create default profile for newly authenticated user
              const defaultProfile: UserProfile = {
                uid: fbUser.uid,
                email: fbUser.email || "",
                displayName: fbUser.displayName || fbUser.email?.split("@")[0] || "User",
                role: "citizen",
                createdAt: new Date().toISOString()
              };
              await setDoc(doc(db, "users", fbUser.uid), defaultProfile);
              setUser(defaultProfile);
            }
          }
        } catch (err) {
          console.warn("Failed fetching user profile from Firestore:", err);
          setUser({
            uid: fbUser.uid,
            email: fbUser.email || "",
            displayName: fbUser.displayName || "User",
            role: "citizen"
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, pass: string) => {
    if (!auth) throw new Error("Firebase Auth is not initialized");
    setLoading(true);
    try {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("sih_demo_user");
      }
      setIsDemoMode(false);
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      setFirebaseUser(cred.user);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, pass: string, name: string, role: UserRole, org?: string) => {
    if (!auth) throw new Error("Firebase Auth is not initialized");
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      const newProfile: UserProfile = {
        uid: cred.user.uid,
        email,
        displayName: name,
        role,
        organization: org || "",
        createdAt: new Date().toISOString()
      };
      if (db) {
        await setDoc(doc(db, "users", cred.user.uid), newProfile);
      }
      setUser(newProfile);
      setFirebaseUser(cred.user);
    } finally {
      setLoading(false);
    }
  };

  const signInDemoEvaluator = (selectedRole: UserRole, demoEmail: string, demoName: string) => {
    const base = DEMO_EVALUATOR_PROFILES[selectedRole] || DEMO_EVALUATOR_PROFILES.citizen;
    const demoProfile: UserProfile = {
      ...base,
      email: demoEmail || base.email,
      displayName: demoName || base.displayName,
      role: selectedRole
    };
    if (typeof window !== "undefined") {
      sessionStorage.setItem("sih_demo_user", JSON.stringify(demoProfile));
    }
    setUser(demoProfile);
    setIsDemoMode(true);
  };

  const logout = async () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("sih_demo_user");
    }
    setIsDemoMode(false);
    setUser(null);
    if (auth) {
      await firebaseSignOut(auth);
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("sih_theme", nextTheme);
      document.documentElement.setAttribute("data-theme", nextTheme);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        role: user?.role || "citizen",
        loading,
        isDemoMode,
        signIn,
        signUp,
        signInDemoEvaluator,
        logout,
        theme,
        toggleTheme
      }}
    >
      {/* Demo Evaluator Watermark Banner if in Demo Mode */}
      {isDemoMode && (
        <div style={{
          background: "linear-gradient(90deg, #92400e 0%, #b45309 100%)",
          color: "#ffffff",
          fontSize: "0.72rem",
          fontWeight: 800,
          textAlign: "center",
          padding: "0.25rem 0.5rem",
          letterSpacing: "0.04em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          zIndex: 9999,
          position: "sticky",
          top: 0
        }}>
          <span>⚡ [DEMO MODE: Evaluator Session as {user?.role?.toUpperCase()}]</span>
          <span style={{ opacity: 0.85 }}>({user?.displayName})</span>
          <button
            onClick={logout}
            style={{
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.4)",
              color: "#fff",
              borderRadius: "4px",
              padding: "0.1rem 0.4rem",
              fontSize: "0.68rem",
              cursor: "pointer"
            }}
          >
            Exit Demo
          </button>
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
