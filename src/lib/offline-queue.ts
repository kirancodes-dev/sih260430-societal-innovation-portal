import { openDB, IDBPDatabase } from "idb";
import { createChallenge } from "@/lib/repositories/challenge-repository";

const DB_NAME = "sih_offline_db";
const STORE_NAME = "submission_queue";

interface QueuedSubmission {
  idempotencyKey: string;
  data: any;
  queuedAt: string;
  attempts: number;
}

async function getDb(): Promise<IDBPDatabase | null> {
  if (typeof window === "undefined") return null;
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "idempotencyKey" });
      }
    }
  });
}

export async function enqueueOfflineSubmission(data: any): Promise<string> {
  const db = await getDb();
  const idempotencyKey = `offline-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  if (db) {
    await db.put(STORE_NAME, {
      idempotencyKey,
      data,
      queuedAt: new Date().toISOString(),
      attempts: 0
    });
  }

  return idempotencyKey;
}

export async function getQueuedCount(): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  return db.count(STORE_NAME);
}

export async function syncQueuedSubmissions(): Promise<{ synced: number; failed: number }> {
  const db = await getDb();
  if (!db) return { synced: 0, failed: 0 };

  const allQueued: QueuedSubmission[] = await db.getAll(STORE_NAME);
  if (allQueued.length === 0) return { synced: 0, failed: 0 };

  let synced = 0;
  let failed = 0;

  for (const item of allQueued) {
    try {
      await createChallenge(item.data);
      await db.delete(STORE_NAME, item.idempotencyKey);
      synced++;
    } catch (err) {
      console.warn(`Failed syncing queued item ${item.idempotencyKey}:`, err);
      item.attempts++;
      await db.put(STORE_NAME, item);
      failed++;
    }
  }

  return { synced, failed };
}

// Auto-register network online listener
if (typeof window !== "undefined") {
  window.addEventListener("online", () => {
    syncQueuedSubmissions().then(res => {
      if (res.synced > 0) {
        console.log(`[Offline Sync] Successfully synchronized ${res.synced} offline submissions.`);
      }
    });
  });
}
