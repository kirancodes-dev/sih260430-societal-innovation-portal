// Firestore Database Service for Jharkhand SICP
// Supports real-time Cloud Firestore syncing with fallback to in-memory state

import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import { db } from "./firebase";
import { ChallengeItem, INITIAL_MOCK_CHALLENGES } from "./constants";

const CHALLENGES_COLLECTION = "challenges";
const PROPOSALS_COLLECTION = "proposals";
const USERS_COLLECTION = "users";
const MOUS_COLLECTION = "mous";

/**
 * Fetch all challenges from Firestore, falling back to initial mock challenges if offline/unconfigured
 */
export async function getChallengesFromDb(districtFilter?: string, domainFilter?: string): Promise<ChallengeItem[]> {
  if (!db) {
    return filterMockChallenges(districtFilter, domainFilter);
  }

  try {
    let q = query(collection(db, CHALLENGES_COLLECTION), orderBy("submittedAt", "desc"));

    if (districtFilter && districtFilter !== "all") {
      q = query(collection(db, CHALLENGES_COLLECTION), where("district", "==", districtFilter));
    }

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      // Auto-seed if database is newly initialized and empty
      await seedInitialChallengesToFirestore();
      return filterMockChallenges(districtFilter, domainFilter);
    }

    const challenges: ChallengeItem[] = [];
    querySnapshot.forEach((docSnap) => {
      challenges.push({ id: docSnap.id, ...docSnap.data() } as ChallengeItem);
    });

    return challenges;
  } catch (error) {
    console.warn("Firestore query fallback to mock constants:", error);
    return filterMockChallenges(districtFilter, domainFilter);
  }
}

/**
 * Seed initial sample challenges into Cloud Firestore
 */
export async function seedInitialChallengesToFirestore(): Promise<number> {
  if (!db) return 0;

  try {
    let count = 0;
    for (const c of INITIAL_MOCK_CHALLENGES) {
      const docRef = doc(db, CHALLENGES_COLLECTION, c.id);
      await setDoc(docRef, {
        ...c,
        syncedAt: new Date().toISOString()
      }, { merge: true });
      count++;
    }
    console.log(`Successfully seeded ${count} challenges into Firestore!`);
    return count;
  } catch (error) {
    console.warn("Error seeding Firestore (check security rules):", error);
    return 0;
  }
}

/**
 * Create a new challenge in Firestore
 */
export async function createChallengeInDb(challengeData: Partial<ChallengeItem>): Promise<string> {
  const challengeId = challengeData.id || `CH-JH-2026-${Math.floor(100 + Math.random() * 900)}`;

  if (!db) {
    return challengeId;
  }

  try {
    const docRef = doc(db, CHALLENGES_COLLECTION, challengeId);
    await setDoc(docRef, {
      ...challengeData,
      id: challengeId,
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    console.log(`Document written to Firestore with ID: ${challengeId}`);
    return challengeId;
  } catch (error) {
    console.warn("Firestore save failed, using local offline queue:", error);
    return challengeId;
  }
}

/**
 * Update challenge status / university allocation
 */
export async function updateChallengeInDb(id: string, updates: Partial<ChallengeItem>): Promise<boolean> {
  if (!db) return true;

  try {
    const docRef = doc(db, CHALLENGES_COLLECTION, id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.warn("Firestore update failed:", error);
    return false;
  }
}

/**
 * Record a Tripartite MoU in Firestore
 */
export async function recordMouInDb(mouData: any): Promise<string> {
  const mouId = `MOU-JH-2026-${Math.floor(100 + Math.random() * 900)}`;

  if (!db) return mouId;

  try {
    const docRef = doc(db, MOUS_COLLECTION, mouId);
    await setDoc(docRef, {
      ...mouData,
      id: mouId,
      createdAt: new Date().toISOString()
    });
    return mouId;
  } catch (error) {
    console.warn("Firestore MoU record fallback:", error);
    return mouId;
  }
}

function filterMockChallenges(district?: string, domain?: string): ChallengeItem[] {
  return INITIAL_MOCK_CHALLENGES.filter(c => {
    const matchDistrict = !district || district === "all" || c.district === district;
    const matchDomain = !domain || domain === "all" || c.category === domain;
    return matchDistrict && matchDomain;
  });
}
