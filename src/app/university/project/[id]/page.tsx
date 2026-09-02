"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { INITIAL_MOCK_CHALLENGES, JHARKHAND_UNIVERSITIES } from "@/lib/constants";
import StatusBadge from "@/components/ui/StatusBadge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNotifications } from "@/contexts/NotificationContext";

interface KanbanTask {
  id: string;
  title: string;
  assignee: string;
  dept: string;
  column: "todo" | "in_progress" | "review" | "done";
  priority: "High" | "Medium" | "Low";
  dueDate: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: "Faculty PI" | "Faculty Co-PI" | "Student Lead" | "Student Researcher" | "Student Developer" | "Field Engineer";
  dept: string;
  email: string;
  rollNo?: string;
  creditsEarned?: number;
}

interface MilestoneItem {
  id: number;
  title: string;
  stage: string;
  deadline: string;
  status: "Completed" | "In_Progress" | "Pending" | "Approved_by_Govt";
  deliverables: string;
  completionPct: number;
}

export default function UniversityProjectWorkspacePage() {
  const params = useParams();
  const { t, language } = useLanguage();
  const { addNotification } = useNotifications();

  const challengeId = (params.id as string) || "CH-JH-2026-001";
  const challenge = INITIAL_MOCK_CHALLENGES.find(c => c.id === challengeId) || INITIAL_MOCK_CHALLENGES[0];

  const [activeTab, setActiveTab] = useState<"proposal" | "team" | "kanban" | "milestones" | "ip" | "credits">("kanban");

  // Proposal State
  const [proposalTitle, setProposalTitle] = useState(
    `Decentralized Solar-Powered Electro-Coagulation & Adsorption Filter for ${challenge.district.toUpperCase()}`
  );
  const [proposalSummary, setProposalSummary] = useState(
    "Development of a solar-assisted electro-coagulation and red-laterite adsorption unit capable of removing fluoride (<0.8 mg/L) and arsenic (<0.01 mg/L) at 500 L/hr capacity for village hand pumps."
  );
  const [methodology, setMethodology] = useState(
    "1. Material characterization of locally sourced Jharkhand laterite clay.\n2. DC electro-coagulation with sacrificial aluminum-iron electrodes powered by a 200W solar PV panel.\n3. IoT enabled turbidity & fluoride optical sensor for real-time telemetry."
  );
  const [budgetCr, setBudgetCr] = useState("0.24");
  const [startDate, setStartDate] = useState("2026-09-01");
  const [endDate, setEndDate] = useState("2026-12-15");
  const [expectedImpact, setExpectedImpact] = useState("Clean drinking water conforming to BIS 10500 standards for 1,200 rural households across 3 habitations in Latehar.");
  const [requiredResources, setRequiredResources] = useState("Materials fabrication lab, Spectrophotometer testing facility, ₹15 Lakhs CSR prototyping grant, field trial permission from District Collector.");
  const [proposalSaved, setProposalSaved] = useState(false);

  // Multidisciplinary Team State (NEP 2020)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: "tm-1", name: "Dr. Anirban Roy", role: "Faculty PI", dept: "Chemical & Environmental Engg", email: "anirban@bitmesra.ac.in" },
    { id: "tm-2", name: "Prof. Priya Sinha", role: "Faculty Co-PI", dept: "Renewable Energy Research Cell", email: "priya.s@bitmesra.ac.in" },
    { id: "tm-3", name: "Amitabh Kumar", role: "Student Lead", dept: "Chemical Engineering", email: "amitabh.k@student.bitmesra.ac.in", rollNo: "BTECH/CHE/22045", creditsEarned: 4 },
    { id: "tm-4", name: "Neha Soren", role: "Student Researcher", dept: "Electronics & Embedded Systems", email: "neha.s@student.bitmesra.ac.in", rollNo: "BTECH/ECE/22018", creditsEarned: 4 },
    { id: "tm-5", name: "Rohan Bhagat", role: "Student Developer", dept: "Computer Science & IoT", email: "rohan.b@student.bitmesra.ac.in", rollNo: "BTECH/CSE/22089", creditsEarned: 4 }
  ]);

  // Check unique departments for multidisciplinary warning
  const uniqueDepartments = Array.from(new Set(teamMembers.map(m => m.dept)));
  const isMultidisciplinary = uniqueDepartments.length >= 2;

  // Kanban Tasks State
  const [tasks, setTasks] = useState<KanbanTask[]>([
    { id: "tsk-1", title: "Characterize Mahuadanr laterite red clay samples in lab", assignee: "Amitabh Kumar", dept: "Chemical", column: "done", priority: "High", dueDate: "10 Sep 2026" },
    { id: "tsk-2", title: "Design 200W solar PV circuit and DC electro-coagulation cell", assignee: "Neha Soren", dept: "ECE", column: "in_progress", priority: "High", dueDate: "25 Sep 2026" },
    { id: "tsk-3", title: "Develop IoT telemetry sensor firmware for water quality sync", assignee: "Rohan Bhagat", dept: "CSE", column: "todo", priority: "Medium", dueDate: "05 Oct 2026" },
    { id: "tsk-4", title: "Obtain District Water & Sanitation Department test clearance", assignee: "Dr. Anirban Roy", dept: "Faculty PI", column: "review", priority: "High", dueDate: "20 Oct 2026" }
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState(teamMembers[0].name);

  // Milestones State
  const [milestones, setMilestones] = useState<MilestoneItem[]>([
    { id: 1, title: "Requirement Analysis & Baseline Water Sampling", stage: "Phase 1", deadline: "2026-09-15", status: "Completed", deliverables: "Water Quality Baseline Report (Latehar), Chemical Assay", completionPct: 100 },
    { id: 2, title: "Lab-Scale Laterite & Solar Electro-Coagulation Prototype", stage: "Phase 2", deadline: "2026-10-10", status: "In_Progress", deliverables: "Bench Model, Fluoride Reduction Curves (<0.8 mg/L)", completionPct: 65 },
    { id: 3, title: "IoT Telemetry Integration & Field Hardware Fabrication", stage: "Phase 3", deadline: "2026-11-05", status: "Pending", deliverables: "Encased Hardware, Solar Panel Kit, Firmware Repo", completionPct: 0 },
    { id: 4, title: "On-Ground Village Pilot Installation & BIS 10500 Certification", stage: "Phase 4", deadline: "2026-11-30", status: "Pending", deliverables: "Panchayat Handover Certificate, State Water Quality Sign-off", completionPct: 0 }
  ]);

  // IP & Patent Registry State
  const [patents, setPatents] = useState([
    { id: "PAT-JH-2026-04", title: "Continuous Flow Solar Electro-Coagulation Filter using Natural Laterite Substrates", type: "Provisional Patent", filedBy: "BIT Mesra & Mahuadanr Gram Sabha", status: "Filed (App # 202631008452)", filingDate: "2026-08-25" },
    { id: "DES-JH-2026-12", title: "Ergonomic Modular Hand-Pump Encasement for Rural Multi-Stage Filtration", type: "Design Registration", filedBy: "BIT Mesra Innovation Cell", status: "Under Review", filingDate: "2026-08-28" }
  ]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return;
    const newTask: KanbanTask = {
      id: `tsk-${Date.now()}`,
      title: newTaskTitle,
      assignee: newTaskAssignee,
      dept: teamMembers.find(m => m.name === newTaskAssignee)?.dept || "Engineering",
      column: "todo",
      priority: "Medium",
      dueDate: "30 Oct 2026"
    };
    setTasks(prev => [...prev, newTask]);
    setNewTaskTitle("");
  };

  const handleMoveTask = (taskId: string, targetCol: "todo" | "in_progress" | "review" | "done") => {
    setTasks(prev => prev.map(t => (t.id === taskId ? { ...t, column: targetCol } : t)));
  };

  const handleAddMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const role = (form.elements.namedItem("role") as HTMLSelectElement).value as any;
    const dept = (form.elements.namedItem("dept") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const rollNo = (form.elements.namedItem("rollNo") as HTMLInputElement).value;

    if (name && dept) {
      setTeamMembers(prev => [
        ...prev,
        { id: `tm-${Date.now()}`, name, role, dept, email, rollNo, creditsEarned: 4 }
      ]);
      form.reset();
    }
  };

  const handleSaveProposal = (e: React.FormEvent) => {
    e.preventDefault();
    setProposalSaved(true);
    addNotification({
      type: "proposal_submitted",
      title: "Proposal Submitted for State Review",
      body: `BIT Mesra submitted proposal for ${challenge.id} (Budget: ₹${budgetCr} Cr).`,
      targetRole: "admin",
      link: `/admin/review/${challenge.id}`
    });
  };

  return (
    <div className="container" style={{ padding: "3.5rem 1.5rem", maxWidth: "1200px" }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
        <Link href="/university">← Back to University Workspace</Link> / <span style={{ color: "var(--text-main)" }}>Project {challenge.id}</span>
      </div>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", fontFamily: "monospace", color: "var(--brand-primary)", fontWeight: 700 }}>
              {challenge.id}
            </span>
            <StatusBadge status={challenge.status} />
            <StatusBadge status={challenge.priority} type="priority" />
          </div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-main)", lineHeight: 1.3 }}>
            {challenge.title}
          </h1>
          <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>
            Lead Institution: <strong>Birla Institute of Technology (BIT) Mesra</strong> • District: <strong>{challenge.district.toUpperCase()}</strong> • NEP 2020 Cohort
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <Link href={`/project/${challenge.id}`} className="btn btn-secondary btn-sm">
            Public Live View 🌐
          </Link>
          <Link href={`/industry/collaborate/${challenge.id}`} className="btn btn-accent btn-sm">
            Connect Industry Co-Funder 🤝
          </Link>
        </div>
      </div>

      {/* NEP 2020 Multidisciplinary Alert Banner */}
      {!isMultidisciplinary && (
        <div style={{ padding: "0.8rem 1.2rem", background: "rgba(239, 68, 68, 0.1)", border: "1px solid var(--brand-danger)", borderRadius: "var(--radius-md)", color: "var(--brand-danger)", marginBottom: "1.5rem", fontSize: "0.88rem" }}>
          ⚠️ <strong>NEP 2020 Warning:</strong> Project team must include researchers from at least 2 distinct academic departments to qualify for state innovation funding and capstone credit certification.
        </div>
      )}

      {/* Tab Navigation */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--border-medium)", marginBottom: "2rem", gap: "0.5rem", overflowX: "auto" }}>
        {[
          { key: "kanban", label: "📋 Kanban Board", count: tasks.length },
          { key: "proposal", label: "📝 Solution Proposal", count: null },
          { key: "team", label: "👥 Multidisciplinary Team", count: teamMembers.length },
          { key: "milestones", label: "🎯 Milestone Gates", count: milestones.length },
          { key: "credits", label: "🎓 NEP 2020 Credits", count: null },
          { key: "ip", label: "💡 IP & Patents", count: patents.length }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            style={{
              padding: "0.75rem 1.1rem",
              fontWeight: activeTab === tab.key ? 800 : 600,
              fontSize: "0.9rem",
              border: "none",
              background: "transparent",
              borderBottom: activeTab === tab.key ? "3px solid var(--brand-primary)" : "3px solid transparent",
              color: activeTab === tab.key ? "var(--brand-primary)" : "var(--text-muted)",
              cursor: "pointer",
              whiteSpace: "nowrap"
            }}
          >
            {tab.label} {tab.count !== null ? `(${tab.count})` : ""}
          </button>
        ))}
      </div>

      {/* Tab 1: Interactive Kanban Board */}
      {activeTab === "kanban" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Interactive Project Task Board</h2>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: 0 }}>
                Manage team sprint deliverables, student assignments, and faculty review.
              </p>
            </div>

            {/* Quick Add Task Form */}
            <form onSubmit={handleAddTask} style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <input
                type="text"
                className="form-input"
                placeholder="New task description..."
                style={{ width: "260px", padding: "0.35rem 0.75rem", fontSize: "0.85rem" }}
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
              <select
                className="form-select"
                style={{ width: "160px", padding: "0.35rem 0.5rem", fontSize: "0.85rem" }}
                value={newTaskAssignee}
                onChange={(e) => setNewTaskAssignee(e.target.value)}
              >
                {teamMembers.map(m => (
                  <option key={m.id} value={m.name}>
                    {m.name}
                  </option>
                ))}
              </select>
              <button type="submit" className="btn btn-primary btn-sm">
                + Add Task
              </button>
            </form>
          </div>

          {/* Kanban Columns Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
            {(["todo", "in_progress", "review", "done"] as const).map(colKey => {
              const colTasks = tasks.filter(t => t.column === colKey);
              const colTitles: Record<string, { label: string; icon: string; border: string }> = {
                todo: { label: "To Do / Backlog", icon: "📌", border: "var(--border-medium)" },
                in_progress: { label: "In Development", icon: "⚙️", border: "var(--brand-primary)" },
                review: { label: "Faculty / Lab Review", icon: "🧪", border: "var(--brand-accent)" },
                done: { label: "Completed & Verified", icon: "✅", border: "#10b981" }
              };

              return (
                <div
                  key={colKey}
                  style={{
                    background: "var(--bg-main)",
                    borderRadius: "var(--radius-md)",
                    padding: "1rem",
                    borderTop: `4px solid ${colTitles[colKey].border}`,
                    border: "1px solid var(--border-light)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.8rem",
                    minHeight: "350px"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 800, fontSize: "0.9rem" }}>
                      {colTitles[colKey].icon} {colTitles[colKey].label}
                    </span>
                    <span className="badge" style={{ background: "var(--bg-card)", fontSize: "0.75rem" }}>
                      {colTasks.length}
                    </span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                    {colTasks.map(task => (
                      <div
                        key={task.id}
                        className="card"
                        style={{
                          padding: "0.85rem",
                          background: "var(--bg-card)",
                          boxShadow: "var(--shadow-sm)",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.5rem"
                        }}
                      >
                        <div style={{ fontSize: "0.88rem", fontWeight: 700, lineHeight: 1.3 }}>
                          {task.title}
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                          <span>👤 {task.assignee}</span>
                          <span style={{ color: "var(--brand-indigo)", fontWeight: 600 }}>{task.dept}</span>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.72rem", color: "var(--text-light)", paddingTop: "0.4rem", borderTop: "1px solid var(--border-light)" }}>
                          <span>📅 Due: {task.dueDate}</span>

                          {/* Move Column Quick Actions */}
                          <div style={{ display: "flex", gap: "0.25rem" }}>
                            {colKey !== "todo" && (
                              <button
                                onClick={() => handleMoveTask(task.id, "todo")}
                                title="Move to Todo"
                                style={{ background: "none", border: "none", cursor: "pointer" }}
                              >
                                ◀
                              </button>
                            )}
                            {colKey !== "in_progress" && (
                              <button
                                onClick={() => handleMoveTask(task.id, "in_progress")}
                                title="Move to In Progress"
                                style={{ background: "none", border: "none", cursor: "pointer" }}
                              >
                                ⚙️
                              </button>
                            )}
                            {colKey !== "done" && (
                              <button
                                onClick={() => handleMoveTask(task.id, "done")}
                                title="Mark as Done"
                                style={{ background: "none", border: "none", cursor: "pointer" }}
                              >
                                ▶
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Solution Proposal Editor */}
      {activeTab === "proposal" && (
        <form onSubmit={handleSaveProposal} className="card shadow-md">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <div>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 800 }}>Formal Solution Proposal & Grant Application</h2>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>
                Submitted to State Department of Higher Education and Industry CSR Marketplace.
              </p>
            </div>
            {proposalSaved && (
              <span className="badge badge-validated">✓ Proposal Submitted & Pending State Review</span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div>
              <label className="form-label" style={{ fontWeight: 700 }}>Proposal Title</label>
              <input
                type="text"
                required
                className="form-input"
                value={proposalTitle}
                onChange={(e) => setProposalTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label" style={{ fontWeight: 700 }}>Executive Technical Summary (Max 500 words)</label>
              <textarea
                rows={3}
                required
                className="form-textarea"
                value={proposalSummary}
                onChange={(e) => setProposalSummary(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label" style={{ fontWeight: 700 }}>Engineering Methodology & Prototyping Stages</label>
              <textarea
                rows={4}
                required
                className="form-textarea"
                value={methodology}
                onChange={(e) => setMethodology(e.target.value)}
              />
            </div>

            <div className="grid-3" style={{ gap: "1rem" }}>
              <div>
                <label className="form-label" style={{ fontWeight: 700 }}>Estimated Budget (₹ in Crores)</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={budgetCr}
                  onChange={(e) => setBudgetCr(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label" style={{ fontWeight: 700 }}>Start Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label" style={{ fontWeight: 700 }}>Target Deployment Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div className="grid-2" style={{ gap: "1rem" }}>
              <div>
                <label className="form-label" style={{ fontWeight: 700 }}>Expected Social Impact & Beneficiaries</label>
                <textarea
                  rows={3}
                  className="form-textarea"
                  value={expectedImpact}
                  onChange={(e) => setExpectedImpact(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label" style={{ fontWeight: 700 }}>Required Lab Infrastructure & Industry CSR Mentorship</label>
                <textarea
                  rows={3}
                  className="form-textarea"
                  value={requiredResources}
                  onChange={(e) => setRequiredResources(e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
              <button type="submit" className="btn btn-primary btn-lg">
                🚀 Submit Proposal to State Admin & Industry
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Tab 3: Multidisciplinary Team Builder */}
      {activeTab === "team" && (
        <div className="grid-2" style={{ gap: "2rem", alignItems: "start" }}>
          {/* Team Member List */}
          <div className="card shadow-md">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>Project R&D Team (NEP 2020)</h3>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  {uniqueDepartments.length} Academic Departments Represented
                </span>
              </div>
              <span className="badge badge-assigned">
                {teamMembers.length} Members
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {teamMembers.map(m => (
                <div
                  key={m.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.75rem 1rem",
                    background: "var(--bg-main)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-light)"
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--text-main)" }}>
                      {m.name} {m.rollNo ? `(${m.rollNo})` : ""}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                      {m.role} • <strong style={{ color: "var(--brand-indigo)" }}>{m.dept}</strong>
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-light)" }}>
                      ✉️ {m.email}
                    </div>
                  </div>

                  <span className="badge badge-validated" style={{ fontSize: "0.72rem" }}>
                    {m.role.includes("Faculty") ? "Mentor" : "4 Credits"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Add Team Member Form */}
          <div className="card shadow-md">
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "1rem" }}>
              + Add Faculty / Student Innovator
            </h3>

            <form onSubmit={handleAddMember} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label className="form-label">Full Name</label>
                <input type="text" name="name" required className="form-input" placeholder="e.g. Sweta Marandi" />
              </div>

              <div className="grid-2" style={{ gap: "0.75rem" }}>
                <div>
                  <label className="form-label">Project Role</label>
                  <select name="role" className="form-select">
                    <option value="Student Researcher">Student Researcher</option>
                    <option value="Student Developer">Student Developer</option>
                    <option value="Student Lead">Student Lead</option>
                    <option value="Field Engineer">Field Engineer</option>
                    <option value="Faculty Co-PI">Faculty Co-PI</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Department / School</label>
                  <input type="text" name="dept" required className="form-input" placeholder="e.g. Civil Engg / Biotech" />
                </div>
              </div>

              <div className="grid-2" style={{ gap: "0.75rem" }}>
                <div>
                  <label className="form-label">University Email</label>
                  <input type="email" name="email" required className="form-input" placeholder="student@bitmesra.ac.in" />
                </div>

                <div>
                  <label className="form-label">Student Roll No (if student)</label>
                  <input type="text" name="rollNo" className="form-input" placeholder="BTECH/22/045" />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: "0.5rem" }}>
                + Add Member to Project Team
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab 4: Milestone Gate Tracking */}
      {activeTab === "milestones" && (
        <div className="card shadow-md">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800 }}>Project Milestones & Verification Gates</h2>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: 0 }}>
                Every milestone requires deliverable upload and faculty + government verification.
              </p>
            </div>
            <span className="badge badge-validated">Phase 2 In Progress</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {milestones.map((m, idx) => (
              <div
                key={m.id}
                style={{
                  padding: "1.2rem",
                  background: "var(--bg-main)",
                  borderRadius: "var(--radius-md)",
                  borderLeft: m.status === "Completed" ? "5px solid #10b981" : m.status === "In_Progress" ? "5px solid var(--brand-accent)" : "5px solid var(--border-medium)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
                  <div>
                    <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--brand-primary)", textTransform: "uppercase" }}>
                      {m.stage}
                    </span>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0.2rem 0" }}>
                      {m.title}
                    </h3>
                  </div>

                  <span className={`badge badge-${m.status.toLowerCase().replace("_", "")}`}>
                    {m.status.replace("_", " ")}
                  </span>
                </div>

                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.8rem" }}>
                  <strong>Key Deliverable:</strong> {m.deliverables} • 📅 Target: <strong>{m.deadline}</strong>
                </div>

                {/* Progress bar */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ flex: 1, height: "8px", background: "var(--border-light)", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ width: `${m.completionPct}%`, height: "100%", background: m.status === "Completed" ? "#10b981" : "var(--brand-accent)", borderRadius: "4px" }} />
                  </div>
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, minWidth: "45px" }}>
                    {m.completionPct}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: NEP 2020 Academic Credits Ledger */}
      {activeTab === "credits" && (
        <div className="card shadow-md">
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            🎓 NEP 2020 Experiential Learning & Capstone Credit Ledger
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            Under the National Education Policy 2020, university students contributing to grassroots societal innovation earn official academic credits certified by the Dean of Academics.
          </p>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border-medium)", textAlign: "left", color: "var(--text-muted)", fontSize: "0.78rem" }}>
                <th style={{ padding: "0.75rem" }}>STUDENT NAME</th>
                <th style={{ padding: "0.75rem" }}>ROLL NUMBER</th>
                <th style={{ padding: "0.75rem" }}>DEPARTMENT</th>
                <th style={{ padding: "0.75rem" }}>ROLE</th>
                <th style={{ padding: "0.75rem" }}>CAPSTONE CREDITS</th>
                <th style={{ padding: "0.75rem" }}>FACULTY SIGN-OFF</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.filter(m => !m.role.includes("Faculty")).map(s => (
                <tr key={s.id} style={{ borderBottom: "1px solid var(--border-light)" }}>
                  <td style={{ padding: "0.75rem", fontWeight: 700 }}>{s.name}</td>
                  <td style={{ padding: "0.75rem", fontFamily: "monospace", color: "var(--text-muted)" }}>{s.rollNo || "N/A"}</td>
                  <td style={{ padding: "0.75rem" }}>{s.dept}</td>
                  <td style={{ padding: "0.75rem" }}>{s.role}</td>
                  <td style={{ padding: "0.75rem", fontWeight: 800, color: "var(--brand-primary)" }}>
                    4.0 / 6.0 Credits
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    <span className="badge badge-validated">✓ Certified by PI</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 6: IP & Patents Registry */}
      {activeTab === "ip" && (
        <div className="card shadow-md">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800 }}>Grassroots Intellectual Property (IP) & Patent Registry</h2>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>
                Co-patenting between university researchers and local community bodies.
              </p>
            </div>
            <button className="btn btn-primary btn-sm">
              + File New Patent / Design
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {patents.map(p => (
              <div key={p.id} style={{ padding: "1.2rem", background: "var(--bg-main)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                  <span style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "var(--brand-accent)", fontWeight: 700 }}>
                    {p.id} • {p.type}
                  </span>
                  <span className="badge badge-assigned">{p.status}</span>
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.3rem" }}>
                  {p.title}
                </h3>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  Assignees: <strong>{p.filedBy}</strong> • Filed on: {p.filingDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
