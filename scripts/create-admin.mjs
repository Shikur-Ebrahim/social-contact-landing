/**
 * Run once with:  node scripts/create-admin.mjs
 * Creates a Firebase Auth user you can log into the admin dashboard with.
 */
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serviceAccount = JSON.parse(
  readFileSync(path.join(__dirname, "..", "social-contact-landing.json"), "utf8")
);

initializeApp({ credential: cert(serviceAccount) });

const auth = getAuth();

const EMAIL    = "admin@social-contact-landing.com";
const PASSWORD = "Admin@123456";

try {
  const user = await auth.createUser({ email: EMAIL, password: PASSWORD });
  console.log("✅  Admin user created!");
  console.log("   Email   :", EMAIL);
  console.log("   Password:", PASSWORD);
  console.log("   UID     :", user.uid);
} catch (err) {
  if (err.code === "auth/email-already-exists") {
    console.log("ℹ️  Admin user already exists.");
    console.log("   Email   :", EMAIL);
    console.log("   Password:", PASSWORD);
  } else {
    console.error("❌ Error:", err.message);
  }
}
