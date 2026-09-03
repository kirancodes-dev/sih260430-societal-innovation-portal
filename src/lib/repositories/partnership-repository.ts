import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy
} from "firebase/firestore";
import { PartnershipOffer, MoUItem, UserProfile } from "@/types/portal";
import { logAuditEvent } from "./audit-repository";

const PARTNERSHIPS_COLLECTION = "partnerships";
const MOUS_COLLECTION = "mous";

export async function createPartnershipOffer(
  offerData: Omit<PartnershipOffer, "id" | "submittedAt" | "status">,
  actor: UserProfile
): Promise<string> {
  const id = `OFFER-${offerData.challengeId}-${Date.now().toString().slice(-4)}`;

  const newOffer: PartnershipOffer = {
    ...offerData,
    id,
    status: "pending",
    submittedAt: new Date().toISOString()
  };

  if (db) {
    await setDoc(doc(db, PARTNERSHIPS_COLLECTION, id), newOffer);
    await logAuditEvent(
      actor.uid,
      actor.displayName,
      actor.role,
      "PARTNERSHIP_OFFER_SUBMITTED",
      "proposal",
      id,
      { challengeId: offerData.challengeId, offerType: offerData.offerType }
    );
  }

  return id;
}

export async function listOffersForChallenge(challengeId: string): Promise<PartnershipOffer[]> {
  if (!db) return [];
  try {
    const q = query(
      collection(db, PARTNERSHIPS_COLLECTION),
      where("challengeId", "==", challengeId),
      orderBy("submittedAt", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as PartnershipOffer));
  } catch (err) {
    console.warn("Error listing partnership offers:", err);
    return [];
  }
}

export async function createMoUAcknowledgement(
  mouData: Omit<MoUItem, "id" | "createdAt" | "updatedAt">,
  actor: UserProfile
): Promise<string> {
  const id = `MOU-${mouData.challengeId}-${Date.now().toString().slice(-4)}`;

  const newMoU: MoUItem = {
    ...mouData,
    id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (db) {
    await setDoc(doc(db, MOUS_COLLECTION, id), newMoU);
    await logAuditEvent(
      actor.uid,
      actor.displayName,
      actor.role,
      "MOU_CREATED_OR_ACKNOWLEDGED",
      "mou",
      id,
      { challengeId: mouData.challengeId, universityName: mouData.universityName, industryName: mouData.industryName }
    );
  }

  return id;
}
