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
  orderBy
} from "firebase/firestore";
import { Proposal, UserProfile } from "@/types/portal";
import { logAuditEvent } from "./audit-repository";

const PROPOSALS_COLLECTION = "proposals";

export async function createProposal(
  proposalData: Omit<Proposal, "id" | "submittedAt" | "status">,
  actor: UserProfile
): Promise<string> {
  // Enforce NEP 2020 multidisciplinary requirement
  if (proposalData.participatingDepartments.length < 2) {
    throw new Error("NEP 2020 requires at least two distinct academic departments for multidisciplinary research collaboration.");
  }

  const id = `PROP-${proposalData.challengeId}-${Date.now().toString().slice(-4)}`;

  const newProposal: Proposal = {
    ...proposalData,
    id,
    status: "submitted",
    submittedAt: new Date().toISOString()
  };

  if (db) {
    await setDoc(doc(db, PROPOSALS_COLLECTION, id), newProposal);
    // Also update challenge status to proposal_submitted
    await updateDoc(doc(db, "challenges", proposalData.challengeId), {
      status: "proposal_submitted",
      updatedAt: new Date().toISOString()
    });

    await logAuditEvent(
      actor.uid,
      actor.displayName,
      actor.role,
      "PROPOSAL_SUBMITTED",
      "proposal",
      id,
      { challengeId: proposalData.challengeId, totalBudgetINR: proposalData.totalBudgetINR }
    );
  }

  return id;
}

export async function getProposalByChallengeId(challengeId: string): Promise<Proposal | null> {
  if (!db) return null;
  try {
    const q = query(collection(db, PROPOSALS_COLLECTION), where("challengeId", "==", challengeId));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return { id: snap.docs[0].id, ...snap.docs[0].data() } as Proposal;
    }
  } catch (err) {
    console.warn("Error fetching proposal:", err);
  }
  return null;
}

export async function listProposalsForUniversity(universityId: string): Promise<Proposal[]> {
  if (!db) return [];
  try {
    const q = query(
      collection(db, PROPOSALS_COLLECTION),
      where("universityId", "==", universityId),
      orderBy("submittedAt", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Proposal));
  } catch (err) {
    console.warn("Error listing university proposals:", err);
    return [];
  }
}

export async function updateProposalStatus(
  proposalId: string,
  newStatus: Proposal["status"],
  remarks: string,
  actor: UserProfile
): Promise<void> {
  if (!db) return;

  await updateDoc(doc(db, PROPOSALS_COLLECTION, proposalId), {
    status: newStatus,
    reviewedAt: new Date().toISOString(),
    reviewRemarks: remarks
  });

  await logAuditEvent(
    actor.uid,
    actor.displayName,
    actor.role,
    `PROPOSAL_STATUS_${newStatus.toUpperCase()}`,
    "proposal",
    proposalId,
    { newStatus, remarks }
  );
}
