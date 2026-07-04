/**
 * Run once: node scripts/seed-settings.mjs
 * Seeds the Firestore settings/main document with real business data.
 */
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serviceAccount = JSON.parse(
  readFileSync(path.join(__dirname, "..", "social-contact-landing.json"), "utf8")
);

initializeApp({ credential: cert(serviceAccount) });

const db = getFirestore();

const settings = {
  businessName:     "Royal Bet",
  phone:            "+251988944687",
  phoneVisible:     true,
  heroTitle:        "Welcome to Royal Bet",
  heroSubtitle:     "Join us on your favorite platform",
  telegram:         "https://t.me/Robel_v",
  telegramVisible:  true,
  telegramChannel:  "https://t.me/Royal_Bet_vip1",
  telegramChannelVisible: true,
  whatsapp:         "https://wa.me/251988944687",
  whatsappVisible:  true,
  imo:              "https://imo.im/p/imoid_ftOyDkFgmu",
  imoVisible:       true,
  instagram:        "https://www.instagram.com/royalbetv",
  instagramVisible: true,
  facebook:         "",
  facebookVisible:  false,
  logoUrl:          "/logo.png",
  theme:            "#2563eb",
  autoRedirect:     false,
  redirectDelay:    5,
  updatedAt:        FieldValue.serverTimestamp(),
};

try {
  await db.collection("settings").doc("main").set(settings, { merge: true });
  console.log("✅  Settings saved to Firestore!");
  console.table({
    "Business Name":     settings.businessName,
    "Phone":             settings.phone,
    "Telegram":          settings.telegram,
    "Telegram Channel":  settings.telegramChannel,
    "WhatsApp":          settings.whatsapp,
    "IMO":               settings.imo,
    "Instagram":         settings.instagram,
  });
} catch (err) {
  console.error("❌  Error:", err.message);
}
