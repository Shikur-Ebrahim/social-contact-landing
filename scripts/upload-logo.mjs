/**
 * Run once: node scripts/upload-logo.mjs
 * Uploads the RoyalBet logo to Cloudinary and saves the URL to Firestore.
 */
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import https from "https";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serviceAccount = JSON.parse(
  readFileSync(path.join(__dirname, "..", "social-contact-landing.json"), "utf8")
);

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const CLOUD_NAME    = "dorg6c4ak";
const UPLOAD_PRESET = "ethiocoders-certify";

// Read the logo file as base64
const logoPath = path.join(__dirname, "..", "public", "logo.png");
const logoBase64 = readFileSync(logoPath).toString("base64");
const dataUri = `data:image/png;base64,${logoBase64}`;

console.log("⏳  Uploading logo to Cloudinary...");

const formBody = new URLSearchParams({
  file: dataUri,
  upload_preset: UPLOAD_PRESET,
}).toString();

const options = {
  hostname: "api.cloudinary.com",
  path: `/v1_1/${CLOUD_NAME}/image/upload`,
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Content-Length": Buffer.byteLength(formBody),
  },
};

const req = https.request(options, (res) => {
  let data = "";
  res.on("data", (chunk) => (data += chunk));
  res.on("end", async () => {
    const json = JSON.parse(data);
    if (!json.secure_url) {
      console.error("❌  Upload failed:", JSON.stringify(json, null, 2));
      return;
    }
    console.log("✅  Logo uploaded to Cloudinary:", json.secure_url);

    // Save URL to Firestore
    await db.collection("settings").doc("main").set(
      { logoUrl: json.secure_url, updatedAt: FieldValue.serverTimestamp() },
      { merge: true }
    );
    console.log("✅  Logo URL saved to Firestore!");
  });
});

req.on("error", (err) => console.error("❌  Error:", err.message));
req.write(formBody);
req.end();
