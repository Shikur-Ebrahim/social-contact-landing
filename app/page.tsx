"use client";

import { useEffect, useState } from "react";
import { AppSettings } from "../types";
import { defaultSettings, subscribeToSettings } from "../lib/firestore";
import { Hero } from "../components/Hero";
import { SocialCard } from "../components/SocialCard";
import { CountdownRedirect } from "../components/CountdownRedirect";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { 
  MessageCircle, 
  Phone, 
  MessageSquare,
  Send
} from "lucide-react";
import { Facebook, Instagram } from "../components/icons";

export default function Home() {
  const [settings, setSettings] = useState<AppSettings | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToSettings((data) => {
      setSettings(data);
    });

    return () => unsubscribe();
  }, []);

  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  // Fallback to default if values are empty strings but property exists
  const safeSettings = { ...defaultSettings, ...settings };

  const socialLinks = [
    {
      platform: "telegram",
      url: safeSettings.telegram,
      visible: safeSettings.telegramVisible,
      icon: Send,
      title: "Telegram",
      subtitle: "Chat with us instantly",
      gradientFrom: "#0088cc",
      gradientTo: "#00b2ff",
    },
    {
      platform: "whatsapp",
      url: safeSettings.whatsapp,
      visible: safeSettings.whatsappVisible,
      icon: MessageCircle,
      title: "WhatsApp",
      subtitle: "Send us a message",
      gradientFrom: "#25D366",
      gradientTo: "#128C7E",
    },
    {
      platform: "imo",
      url: safeSettings.imo,
      visible: safeSettings.imoVisible,
      icon: MessageSquare,
      title: "IMO",
      subtitle: "Video and voice calls",
      gradientFrom: "#0056b3",
      gradientTo: "#00a1ff",
    },
    {
      platform: "instagram",
      url: safeSettings.instagram,
      visible: safeSettings.instagramVisible,
      icon: Instagram,
      title: "Instagram",
      subtitle: "Follow our daily updates",
      gradientFrom: "#833AB4",
      gradientTo: "#F77737",
    },
    {
      platform: "facebook",
      url: safeSettings.facebook,
      visible: safeSettings.facebookVisible,
      icon: Facebook,
      title: "Facebook",
      subtitle: "Connect with our community",
      gradientFrom: "#1877F2",
      gradientTo: "#3b5998",
    },
    {
      platform: "phone",
      url: safeSettings.phone ? `tel:${safeSettings.phone}` : "",
      visible: safeSettings.phoneVisible,
      icon: Phone,
      title: "Phone Call",
      subtitle: "Call us directly",
      gradientFrom: "#4ade80",
      gradientTo: "#16a34a",
    },
    {
      platform: "telegramChannel",
      url: safeSettings.telegramChannel,
      visible: safeSettings.telegramChannelVisible,
      icon: Send,
      title: "Telegram Channel",
      subtitle: "Join our official channel",
      gradientFrom: "#0088cc",
      gradientTo: "#00b2ff",
    },
  ];

  const visibleLinks = socialLinks.filter(link => link.visible);

  return (
    <main 
      className="min-h-screen relative py-6 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center"
      style={{
        background: `radial-gradient(circle at top, ${safeSettings.theme}20 0%, transparent 60%)`
      }}
    >
      <div className="flex-1 w-full max-w-lg mx-auto space-y-6">
        <Hero 
          businessName={safeSettings.businessName}
          title={safeSettings.heroTitle}
          subtitle={safeSettings.heroSubtitle}
          logoUrl={safeSettings.logoUrl}
          themeColor={safeSettings.theme}
        />

        <div className="space-y-3 pb-16">
          {visibleLinks.map((link, i) => (
            <SocialCard key={i} {...link} themeColor={safeSettings.theme} />
          ))}
        </div>
      </div>

      <CountdownRedirect 
        enabled={safeSettings.autoRedirect} 
        delay={safeSettings.redirectDelay} 
        url={safeSettings.telegramChannel} 
      />
    </main>
  );
}
