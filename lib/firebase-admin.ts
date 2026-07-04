import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../social-contact-landing.json";

let app: App;

if (!getApps().length) {
  app = initializeApp({
    credential: cert(serviceAccount as Parameters<typeof cert>[0]),
  });
} else {
  app = getApps()[0];
}

export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);
