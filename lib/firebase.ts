import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDxDbE5RdmLBYqM4ZZh48PxL2L0kl_dK70",
  authDomain: "social-contact-landing.firebaseapp.com",
  projectId: "social-contact-landing",
  storageBucket: "social-contact-landing.firebasestorage.app",
  messagingSenderId: "967231308622",
  appId: "1:967231308622:web:6b57ced00d8c36ed3f141f",
  measurementId: "G-19LH6DEKYL"
};

// Initialize Firebase (prevent re-initialization in Next.js development)
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const analytics =
  typeof window !== "undefined"
    ? getAnalytics(app)
    : null;
