import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";
import { AuditLogEntry, UserRole } from "@/types/portal";

const AUDIT_LOGS_COLLECTION = "auditLogs";

export async function logAuditEvent(
  actorId: string,
  actorName: string,
  actorRole: UserRole,
  action: string,
  entityType: AuditLogEntry["entityType"],
  entityId: string,
  metadata?: Record<string, unknown>
): Promise<string> {
  const entry: Omit<AuditLogEntry, "id"> = {
    actorId,
    actorName,
    actorRole,
    action,
    entityType,
    entityId,
    metadata: metadata || {},
    timestamp: new Date().toISOString()
  };

  try {
    if (db) {
      const docRef = await addDoc(collection(db, AUDIT_LOGS_COLLECTION), entry);
      return docRef.id;
    }
  } catch (err) {
    console.warn("Failed persisting audit log:", err);
  }
  return `local-${Date.now()}`;
}

export async function getRecentAuditLogs(count: number = 50): Promise<AuditLogEntry[]> {
  try {
    if (db) {
      const q = query(collection(db, AUDIT_LOGS_COLLECTION), orderBy("timestamp", "desc"), limit(count));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as AuditLogEntry));
    }
  } catch (err) {
    console.warn("Failed reading audit logs from Firestore:", err);
  }
  return [];
}
