import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  limit
} from "firebase/firestore";
import { NotificationItem, UserRole } from "@/types/portal";

const NOTIFICATIONS_COLLECTION = "notifications";

export async function sendNotification(
  title: string,
  body: string,
  type: NotificationItem["type"] = "info",
  targetUserId?: string,
  targetRole?: UserRole,
  link?: string,
  challengeId?: string
): Promise<string> {
  const item: Omit<NotificationItem, "id"> = {
    title,
    body,
    type,
    read: false,
    timestamp: new Date().toISOString()
  };

  if (targetUserId) item.userId = targetUserId;
  if (targetRole) item.role = targetRole;
  if (link) item.link = link;
  if (challengeId) item.challengeId = challengeId;

  try {
    if (db) {
      const docRef = await addDoc(collection(db, NOTIFICATIONS_COLLECTION), item);
      return docRef.id;
    }
  } catch (err) {
    console.warn("Failed persisting notification:", err);
  }
  return `notif-${Date.now()}`;
}

export async function fetchUserNotifications(userId?: string, role?: UserRole): Promise<NotificationItem[]> {
  if (!db) return [];
  try {
    const q = query(
      collection(db, NOTIFICATIONS_COLLECTION),
      orderBy("timestamp", "desc"),
      limit(25)
    );
    const snap = await getDocs(q);
    const all = snap.docs.map(d => ({ id: d.id, ...d.data() } as NotificationItem));

    // Filter by user or broadcast
    return all.filter(n => {
      if (!n.userId && !n.role) return true; // broadcast
      if (userId && n.userId === userId) return true;
      if (role && n.role === role) return true;
      return false;
    });
  } catch (err) {
    console.warn("Failed fetching notifications:", err);
    return [];
  }
}

export async function markNotificationAsRead(id: string): Promise<void> {
  if (!db) return;
  try {
    await updateDoc(doc(db, NOTIFICATIONS_COLLECTION, id), { read: true });
  } catch (err) {
    console.warn(`Failed marking notification ${id} read:`, err);
  }
}
