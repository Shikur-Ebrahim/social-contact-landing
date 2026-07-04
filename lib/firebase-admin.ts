import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

let app: App;

if (!getApps().length) {
  let credentialData;
  
  if (process.env.FIREBASE_ADMIN_CREDENTIALS) {
    credentialData = JSON.parse(Buffer.from(process.env.FIREBASE_ADMIN_CREDENTIALS, 'base64').toString('utf8'));
  } else {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Missing FIREBASE_ADMIN_CREDENTIALS environment variable in Vercel.");
    }
    // Local fallback
    const fs = require('fs');
    const path = require('path');
    credentialData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'social-contact-landing.json'), 'utf8'));
  }

  app = initializeApp({
    credential: cert(credentialData),
  });
} else {
  app = getApps()[0];
}

export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);
