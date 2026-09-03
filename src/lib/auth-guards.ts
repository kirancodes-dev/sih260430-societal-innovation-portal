import { UserRole, UserProfile } from "@/types/portal";

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  admin: 100,
  university_admin: 80,
  faculty: 70,
  research: 70,
  industry: 60,
  csr: 60,
  startup: 50,
  msme: 50,
  student: 40,
  pri_ulb: 30,
  citizen: 10
};

export function hasRequiredRole(userRole: UserRole, allowedRoles: UserRole[]): boolean {
  if (allowedRoles.includes(userRole)) return true;
  if (userRole === "admin") return true; // Super-admin always has access
  return false;
}

export function canValidateChallenge(user: UserProfile | null): boolean {
  if (!user) return false;
  return user.role === "admin";
}

export function canAssignUniversity(user: UserProfile | null): boolean {
  if (!user) return false;
  return user.role === "admin";
}

export function canSubmitProposal(user: UserProfile | null): boolean {
  if (!user) return false;
  return user.role === "university_admin" || user.role === "faculty" || user.role === "research" || user.role === "admin";
}

export function canSubmitPartnershipOffer(user: UserProfile | null): boolean {
  if (!user) return false;
  return user.role === "industry" || user.role === "csr" || user.role === "startup" || user.role === "msme" || user.role === "admin";
}

export function canVerifyMilestone(user: UserProfile | null): boolean {
  if (!user) return false;
  return user.role === "admin";
}
