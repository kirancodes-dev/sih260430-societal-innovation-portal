// Centralized Typed Domain Models for Jharkhand Societal Innovation Collaboration Portal
// Aligned with SIH 260430, NEP 2020 Guidelines & DPDP Act 2023

export type UserRole =
  | "citizen"
  | "pri_ulb"
  | "admin"
  | "university_admin"
  | "faculty"
  | "student"
  | "industry"
  | "startup"
  | "msme"
  | "csr"
  | "research";

export type ChallengeStatus =
  | "submitted"
  | "under_review"
  | "validated"
  | "assigned"
  | "team_formed"
  | "proposal_submitted"
  | "approved"
  | "in_progress"
  | "testing"
  | "deployed"
  | "resolved"
  | "needs_clarification"
  | "rejected"
  | "paused";

export type ChallengePriority = "Low" | "Medium" | "High" | "Critical";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  organization?: string;
  department?: string;
  district?: string;
  block?: string;
  phone?: string;
  avatar?: string;
  createdAt?: string;
  lastLoginAt?: string;
  verified?: boolean;
}

export interface Organization {
  id: string;
  name: string;
  type: "university" | "industry" | "startup" | "msme" | "csr" | "government" | "ngo";
  district: string;
  address?: string;
  website?: string;
  contactEmail: string;
  contactPhone?: string;
  verified: boolean;
  specializations: string[];
  facilities?: string[];
  accreditation?: string;
  createdAt: string;
}

export interface SubmitterInfo {
  name: string;
  role: "citizen" | "pri" | "ulb" | "ngo" | "govt";
  contact: string;
  phone?: string;
  village?: string;
  panchayat?: string;
  isAnonymous?: boolean;
}

export interface AITriageResult {
  category: string;
  subcategory: string;
  confidence: number;
  priority: ChallengePriority;
  priorityScore: number;
  impactScore: number;
  thematicTags: string[];
  suggestedUniversityIds: string[];
  suggestedUniversities: {
    id: string;
    name: string;
    specializations: string[];
    matchScore: number;
    matchReason: string;
    incubationLabs: string[];
  }[];
  duplicateCheck: {
    isDuplicate: boolean;
    similarChallengeId?: string;
    similarChallengeTitle?: string;
    similarityScore: number;
    explanation: string;
  };
  reasoning: string;
  sdgAlignment: string[];
  alignedStateSchemes: { id: string; name: string; department: string; bonus: number }[];
  classificationSource: "gemini_llm" | "deterministic_rule_engine";
  modelVersion?: string;
  triagedAt: string;
}

export interface EvidenceFile {
  id: string;
  name: string;
  url: string;
  type: "image" | "video" | "document" | "audio";
  mimeType: string;
  sizeBytes: number;
  uploadedAt: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  domain: string;
  subcategory?: string;
  affectedPopulation?: string;
  severityUrgency?: string;
  district: string;
  block: string;
  village?: string;
  address?: string;
  locationCoordinates: [number, number]; // [lat, lng]
  priority: ChallengePriority;
  priorityScore: number;
  status: ChallengeStatus;
  submittedBy: SubmitterInfo;
  isAnonymous: boolean;
  evidenceFiles: EvidenceFile[];
  aiTriage?: AITriageResult;
  assignedUniversityId?: string;
  assignedUniversityName?: string;
  assignedDepartmentId?: string;
  assignedDepartmentName?: string;
  assignedOfficerName?: string;
  collaboratingIndustryIds?: string[];
  alignedSchemeIds?: string[];
  sdgGoals?: string[];
  upvotes: number;
  views: number;
  submittedAt: string;
  updatedAt: string;
  resolvedAt?: string;
  rejectionReason?: string;
  clarificationNote?: string;
}

export interface ChallengeEvent {
  id: string;
  challengeId: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  fromStatus?: ChallengeStatus;
  toStatus: ChallengeStatus;
  notes?: string;
  timestamp: string;
}

export interface UniversityTeamMember {
  id: string;
  name: string;
  role: "faculty_pi" | "co_pi" | "student_lead" | "student_researcher" | "external_mentor";
  department: string;
  email: string;
  phone?: string;
  academicLevel?: "B.Tech" | "M.Tech" | "Ph.D" | "Faculty";
}

export interface ProjectMilestone {
  id: string;
  name: string;
  description?: string;
  targetDate: string;
  status: "Pending" | "Ongoing" | "Completed" | "Verified";
  progressPercent: number;
  deliverableUrls?: string[];
  verifiedBy?: string;
  verifiedAt?: string;
  remarks?: string;
}

export interface Proposal {
  id: string;
  challengeId: string;
  universityId: string;
  universityName: string;
  facultyPI: {
    name: string;
    email: string;
    department: string;
  };
  participatingDepartments: string[]; // Enforces multidisciplinary >= 2 departments
  teamMembers: UniversityTeamMember[];
  methodology: string;
  expectedOutcomes: string;
  requiredResources: string;
  totalBudgetINR: number;
  budgetBreakdown: { category: string; amountINR: number; justification: string }[];
  milestones: ProjectMilestone[];
  status: "draft" | "submitted" | "approved" | "rejected" | "revision_requested";
  submittedAt: string;
  reviewedAt?: string;
  reviewRemarks?: string;
}

export interface PartnershipOffer {
  id: string;
  challengeId: string;
  proposalId?: string;
  industryId: string;
  industryName: string;
  partnerType: "industry" | "startup" | "msme" | "csr";
  offerType: "funding" | "technical_mentorship" | "equipment_testing" | "pilot_deployment" | "joint_patenting";
  fundingAmountINR?: number;
  mentorshipDescription?: string;
  equipmentDescription?: string;
  pilotLocation?: string;
  status: "pending" | "accepted" | "declined" | "withdrawn";
  submittedAt: string;
  reviewedAt?: string;
}

export interface MoUItem {
  id: string;
  challengeId: string;
  proposalId: string;
  universityId: string;
  universityName: string;
  industryId: string;
  industryName: string;
  stateNodalOfficerName: string;
  termsSummary: string;
  financialCommitmentINR: number;
  iprSharingTerms: string;
  status: "draft" | "under_review" | "acknowledged" | "active" | "completed" | "terminated";
  signedAcknowledgementTimestamp?: string;
  signedByUniversityRep?: string;
  signedByIndustryRep?: string;
  signedByGovtRep?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CitizenFeedback {
  id: string;
  challengeId: string;
  citizenName: string;
  contact?: string;
  satisfactionRating: 1 | 2 | 3 | 4 | 5;
  feedbackText: string;
  fieldVerified: boolean;
  verificationPhotos?: string[];
  submittedAt: string;
}

export interface NotificationItem {
  id: string;
  userId?: string; // empty means public / broadcast
  role?: UserRole;
  title: string;
  body: string;
  link?: string;
  challengeId?: string;
  read: boolean;
  type: "info" | "assignment" | "status" | "alert" | "milestone";
  timestamp: string;
}

export interface AuditLogEntry {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  entityType: "challenge" | "proposal" | "user" | "mou" | "milestone" | "privacy" | "auth";
  entityId: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  timestamp: string;
}

export interface PrivacyRequest {
  id: string;
  userId?: string;
  email: string;
  name: string;
  requestType: "data_access" | "data_correction" | "data_deletion" | "consent_withdrawal";
  status: "submitted" | "in_review" | "completed" | "rejected";
  details: string;
  submittedAt: string;
  resolvedAt?: string;
}
