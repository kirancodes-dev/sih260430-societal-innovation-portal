import { z } from "zod";

export const ChallengeSubmissionSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200, "Title cannot exceed 200 characters"),
  description: z.string().min(20, "Please provide at least 20 characters of detailed description"),
  domain: z.string().min(1, "Domain is required"),
  subcategory: z.string().optional(),
  affectedPopulation: z.string().optional(),
  severityUrgency: z.string().optional(),
  district: z.string().min(1, "District is required"),
  block: z.string().min(1, "Block/Municipality is required"),
  village: z.string().optional(),
  address: z.string().optional(),
  locationCoordinates: z.tuple([z.number(), z.number()]),
  isAnonymous: z.boolean().default(false),
  submitterName: z.string().min(2, "Name is required"),
  submitterRole: z.enum(["citizen", "pri", "ulb", "ngo", "govt"]).default("citizen"),
  submitterContact: z.string().min(3, "Contact info is required"),
  submitterPhone: z.string().optional(),
  evidenceUrls: z.array(z.string()).default([]),
  consentTimestamp: z.string().optional()
});

export type ChallengeSubmissionInput = z.infer<typeof ChallengeSubmissionSchema>;

export const AITriageResponseSchema = z.object({
  category: z.string(),
  subcategory: z.string(),
  confidence: z.number().min(0).max(1),
  priority: z.enum(["Low", "Medium", "High", "Critical"]),
  priorityScore: z.number().min(0).max(100),
  impactScore: z.number().min(0).max(100),
  thematicTags: z.array(z.string()),
  suggestedUniversityIds: z.array(z.string()),
  duplicateCheck: z.object({
    isDuplicate: z.boolean(),
    similarChallengeId: z.string().optional(),
    similarChallengeTitle: z.string().optional(),
    similarityScore: z.number().min(0).max(1),
    explanation: z.string()
  }),
  reasoning: z.string(),
  sdgAlignment: z.array(z.string()),
  alignedStateSchemeIds: z.array(z.string()).default([])
});

export type AITriageResponseOutput = z.infer<typeof AITriageResponseSchema>;

export const ProposalSubmissionSchema = z.object({
  challengeId: z.string().min(1, "Challenge ID required"),
  universityId: z.string().min(1, "University ID required"),
  universityName: z.string().min(1, "University Name required"),
  facultyPI: z.object({
    name: z.string().min(2, "PI name required"),
    email: z.string().email("Valid PI email required"),
    department: z.string().min(2, "Department required")
  }),
  participatingDepartments: z.array(z.string()).min(2, "NEP 2020 requires at least 2 distinct academic departments for multidisciplinary research"),
  teamMembers: z.array(z.object({
    name: z.string(),
    role: z.enum(["faculty_pi", "co_pi", "student_lead", "student_researcher", "external_mentor"]),
    department: z.string(),
    email: z.string()
  })).min(1, "At least one team member required"),
  methodology: z.string().min(30, "Methodology description must be at least 30 characters"),
  expectedOutcomes: z.string().min(20, "Expected outcomes required"),
  requiredResources: z.string().min(10, "Required resources required"),
  totalBudgetINR: z.number().min(1000, "Budget must be at least ₹1,000"),
  milestones: z.array(z.object({
    name: z.string().min(2),
    targetDate: z.string(),
    deliverables: z.string().optional()
  })).min(1, "At least one project milestone required")
});

export const PartnershipOfferSchema = z.object({
  challengeId: z.string().min(1),
  industryId: z.string().min(1),
  industryName: z.string().min(1),
  partnerType: z.enum(["industry", "startup", "msme", "csr"]),
  offerType: z.enum(["funding", "technical_mentorship", "equipment_testing", "pilot_deployment", "joint_patenting"]),
  fundingAmountINR: z.number().optional(),
  mentorshipDescription: z.string().optional(),
  equipmentDescription: z.string().optional(),
  pilotLocation: z.string().optional()
});

export const CitizenFeedbackSchema = z.object({
  challengeId: z.string().min(1),
  citizenName: z.string().min(2),
  contact: z.string().optional(),
  satisfactionRating: z.number().min(1).max(5),
  feedbackText: z.string().min(5, "Please enter at least 5 characters of feedback"),
  fieldVerified: z.boolean().default(true)
});

export const PrivacyRequestSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  requestType: z.enum(["data_access", "data_correction", "data_deletion", "consent_withdrawal"]),
  details: z.string().min(10, "Please provide details for the request")
});
