import { doc, getDoc, setDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { AppSettings } from "../types";

const SETTINGS_DOC_ID = "main";
const SETTINGS_COLLECTION = "settings";

export const defaultSettings: AppSettings = {
  businessName: "Royal Bet",
  phone: "+251988944687",
  phoneVisible: true,
  heroTitle: "Welcome to Royal Bet",
  heroSubtitle: "Join us on your favorite platform",
  telegram: "https://t.me/Robel_v",
  telegramVisible: true,
  telegramChannel: "https://t.me/Royal_Bet_vip1",
  telegramChannelVisible: true,
  whatsapp: "https://wa.me/251988944687",
  whatsappVisible: true,
  imo: "https://imo.im/p/imoid_ftOyDkFgmu",
  imoVisible: true,
  instagram: "https://www.instagram.com/royalbetv",
  instagramVisible: true,
  facebook: "",
  facebookVisible: false,
  logoUrl: "/logo.png",
  theme: "#2563eb",
  autoRedirect: false,
  redirectDelay: 5,
};

export const getSettingsRef = () => doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);

export const fetchSettings = async (): Promise<AppSettings> => {
  const docRef = getSettingsRef();
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data() as AppSettings;
  } else {
    // Initialize with defaults if it doesn't exist
    await setDoc(docRef, {
      ...defaultSettings,
      updatedAt: serverTimestamp(),
    });
    return defaultSettings;
  }
};

export const updateSettings = async (settings: Partial<AppSettings>): Promise<void> => {
  const docRef = getSettingsRef();
  await setDoc(docRef, {
    ...settings,
    updatedAt: serverTimestamp(),
  }, { merge: true });
};

export const subscribeToSettings = (callback: (settings: AppSettings) => void) => {
  const docRef = getSettingsRef();
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data() as AppSettings);
    }
  });
};
