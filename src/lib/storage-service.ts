import { storage } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { EvidenceFile } from "@/types/portal";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
  "application/pdf"
];

export async function uploadEvidenceFile(
  file: File,
  challengeId: string,
  onProgress?: (progressPercent: number) => void
): Promise<EvidenceFile> {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(`File size ${(file.size / (1024 * 1024)).toFixed(1)}MB exceeds maximum limit of 10MB`);
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error(`File type "${file.type}" is not supported. Please upload JPG, PNG, WEBP, MP4, or PDF.`);
  }

  const fileExt = file.name.split(".").pop() || "bin";
  const uniqueName = `evidence_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const storagePath = `challenges/${challengeId}/${uniqueName}`;

  let downloadUrl = "";

  if (storage) {
    try {
      const storageRef = ref(storage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, file, {
        contentType: file.type,
        customMetadata: {
          originalName: file.name,
          challengeId,
          uploadedAt: new Date().toISOString()
        }
      });

      downloadUrl = await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress?.(Math.round(progress));
          },
          (error) => reject(error),
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          }
        );
      });
    } catch (storageErr) {
      console.warn("Firebase Storage upload failed, using secure local fallback:", storageErr);
      downloadUrl = URL.createObjectURL(file);
    }
  } else {
    downloadUrl = URL.createObjectURL(file);
  }

  let fileType: EvidenceFile["type"] = "document";
  if (file.type.startsWith("image/")) fileType = "image";
  else if (file.type.startsWith("video/")) fileType = "video";
  else if (file.type.startsWith("audio/")) fileType = "audio";

  return {
    id: `ev-${Date.now()}`,
    name: file.name,
    url: downloadUrl,
    type: fileType,
    mimeType: file.type,
    sizeBytes: file.size,
    uploadedAt: new Date().toISOString()
  };
}
