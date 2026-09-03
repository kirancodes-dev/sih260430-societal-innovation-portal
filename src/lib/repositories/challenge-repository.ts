import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit
} from "firebase/firestore";
import { Challenge, ChallengeStatus, UserProfile } from "@/types/portal";
import { logAuditEvent } from "./audit-repository";

const CHALLENGES_COLLECTION = "challenges";

function cleanObject<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return obj.map(cleanObject) as unknown as T;
  if (typeof obj === "object" && !(obj instanceof Date)) {
    const cleaned: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined) {
        cleaned[key] = cleanObject(value);
      }
    }
    return cleaned as T;
  }
  return obj;
}

export function redactPrivateData(challenge: Challenge, isPrivilegedViewer: boolean): Challenge {
  if (!challenge.isAnonymous || isPrivilegedViewer) {
    return challenge;
  }
  return {
    ...challenge,
    submittedBy: {
      ...challenge.submittedBy,
      name: "Anonymous Citizen / Local Resident",
      contact: "Protected under DPDP Act 2023",
      phone: undefined
    }
  };
}

export async function getChallengeById(id: string, isPrivileged: boolean = false): Promise<Challenge | null> {
  if (!db) return null;
  try {
    const snap = await getDoc(doc(db, CHALLENGES_COLLECTION, id));
    if (snap.exists()) {
      const data = { id: snap.id, ...snap.data() } as Challenge;
      return redactPrivateData(data, isPrivileged);
    }
  } catch (err) {
    console.warn(`Error fetching challenge ${id}:`, err);
  }
  return null;
}

export interface ListChallengesFilter {
  district?: string;
  domain?: string;
  status?: ChallengeStatus | "all";
  search?: string;
  limitCount?: number;
}

export async function listChallenges(
  filter: ListChallengesFilter = {},
  isPrivileged: boolean = false
): Promise<Challenge[]> {
  if (!db) return [];
  try {
    let q = query(
      collection(db, CHALLENGES_COLLECTION),
      orderBy("submittedAt", "desc"),
      limit(filter.limitCount || 100)
    );

    if (filter.district && filter.district !== "all") {
      q = query(collection(db, CHALLENGES_COLLECTION), where("district", "==", filter.district));
    }

    const snap = await getDocs(q);
    let items: Challenge[] = snap.docs.map(d => ({ id: d.id, ...d.data() } as Challenge));

    // Client-side filtering for search and domain if needed
    if (filter.domain && filter.domain !== "all") {
      items = items.filter(c => c.domain?.toLowerCase().includes(filter.domain!.toLowerCase()));
    }

    if (filter.status && filter.status !== "all") {
      items = items.filter(c => c.status === filter.status);
    }

    if (filter.search && filter.search.trim()) {
      const searchLower = filter.search.toLowerCase().trim();
      items = items.filter(c =>
        c.title.toLowerCase().includes(searchLower) ||
        c.description.toLowerCase().includes(searchLower) ||
        c.district.toLowerCase().includes(searchLower) ||
        c.id.toLowerCase().includes(searchLower)
      );
    }

    return items.map(c => redactPrivateData(c, isPrivileged));
  } catch (err) {
    console.warn("Error listing challenges from Firestore:", err);
    return [];
  }
}

export async function createChallenge(challengeData: Omit<Challenge, "id" | "upvotes" | "views" | "submittedAt" | "updatedAt">): Promise<string> {
  const timestamp = Date.now();
  const randomSuffix = Math.floor(100 + Math.random() * 900);
  const id = `CH-JH-2026-${randomSuffix}`;

  const newChallenge: Challenge = {
    ...challengeData,
    id,
    upvotes: 0,
    views: 1,
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const cleaned = cleanObject(newChallenge);

  if (db) {
    await setDoc(doc(db, CHALLENGES_COLLECTION, id), cleaned);
    await logAuditEvent(
      challengeData.submittedBy.contact || "citizen",
      challengeData.submittedBy.name,
      "citizen",
      "CHALLENGE_SUBMITTED",
      "challenge",
      id,
      { district: challengeData.district, domain: challengeData.domain, priority: challengeData.priority }
    );
  }

  return id;
}

export async function updateChallengeStatus(
  challengeId: string,
  newStatus: ChallengeStatus,
  actor: UserProfile,
  note?: string
): Promise<void> {
  if (!db) return;

  const updatePayload: Record<string, unknown> = {
    status: newStatus,
    updatedAt: new Date().toISOString()
  };

  if (note) {
    updatePayload.statusNote = note;
  }

  if (newStatus === "resolved") {
    updatePayload.resolvedAt = new Date().toISOString();
  }

  await updateDoc(doc(db, CHALLENGES_COLLECTION, challengeId), updatePayload);

  await logAuditEvent(
    actor.uid,
    actor.displayName,
    actor.role,
    `STATUS_CHANGED_TO_${newStatus.toUpperCase()}`,
    "challenge",
    challengeId,
    { newStatus, note }
  );
}

export async function assignUniversity(
  challengeId: string,
  universityId: string,
  universityName: string,
  actor: UserProfile
): Promise<void> {
  if (!db) return;

  await updateDoc(doc(db, CHALLENGES_COLLECTION, challengeId), {
    status: "assigned",
    assignedUniversityId: universityId,
    assignedUniversityName: universityName,
    updatedAt: new Date().toISOString()
  });

  await logAuditEvent(
    actor.uid,
    actor.displayName,
    actor.role,
    "UNIVERSITY_ASSIGNED",
    "challenge",
    challengeId,
    { universityId, universityName }
  );
}
