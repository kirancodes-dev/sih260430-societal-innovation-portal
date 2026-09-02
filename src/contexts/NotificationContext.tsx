"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface PortalNotification {
  id: string;
  type: "challenge_submitted" | "status_change" | "challenge_assigned" | "proposal_submitted" | "proposal_approved" | "industry_interest" | "milestone_due" | "message";
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  targetRole?: string;
  link?: string;
}

interface NotificationContextType {
  notifications: PortalNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<PortalNotification, "id" | "timestamp" | "read">) => void;
}

const INITIAL_NOTIFICATIONS: PortalNotification[] = [
  {
    id: "notif-1",
    type: "challenge_submitted",
    title: "New Challenge Submitted",
    body: "Latehar Gram Sabha submitted 'High Fluoride & Arsenic Contamination in Rural Hand Pumps'. AI Triage completed.",
    timestamp: "10 mins ago",
    read: false,
    targetRole: "admin",
    link: "/admin/review/CH-JH-2026-001"
  },
  {
    id: "notif-2",
    type: "challenge_assigned",
    title: "Challenge Assigned to BIT Mesra",
    body: "Govt Admin allocated Latehar Water challenge to your department under State Innovation Fund.",
    timestamp: "1 hour ago",
    read: false,
    targetRole: "university",
    link: "/university/project/CH-JH-2026-001"
  },
  {
    id: "notif-3",
    type: "industry_interest",
    title: "CSR Partnership Offer Received",
    body: "Tata Steel CSR expressed interest to co-fund ₹25 Lakhs for the Fluoride Filtration pilot.",
    timestamp: "3 hours ago",
    read: false,
    targetRole: "university",
    link: "/industry/collaborate/CH-JH-2026-001"
  },
  {
    id: "notif-4",
    type: "proposal_approved",
    title: "Solution Proposal Approved",
    body: "Dept of Higher & Technical Education approved the proposal for Chaibasa Mahua Storage Unit.",
    timestamp: "1 day ago",
    read: true,
    targetRole: "citizen",
    link: "/my-submissions"
  },
  {
    id: "notif-5",
    type: "milestone_due",
    title: "Milestone 2 Due Soon",
    body: "Solar Microgrid & IoT Sensor Integration benchmark deadline is approaching (10 Oct).",
    timestamp: "2 days ago",
    read: true,
    targetRole: "university",
    link: "/university/project/CH-JH-2026-001"
  }
];

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<PortalNotification[]>(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (notif: Omit<PortalNotification, "id" | "timestamp" | "read">) => {
    const newNotif: PortalNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: "Just now",
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
