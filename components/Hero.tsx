"use client";

import { motion } from "framer-motion";

interface HeroProps {
  businessName: string;
  title: string;
  subtitle: string;
  logoUrl?: string;
  themeColor: string;
}

export const Hero = ({ businessName, title, subtitle, logoUrl, themeColor }: HeroProps) => {
  return (
    <div className="text-center px-4 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        {logoUrl ? (
          <img 
            src={logoUrl} 
            alt={businessName} 
            className="w-32 h-32 rounded-full object-cover shadow-xl border-4"
            style={{ borderColor: themeColor }}
          />
        ) : (
          <div 
            className="w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-xl"
            style={{ backgroundColor: themeColor }}
          >
            {businessName.charAt(0).toUpperCase()}
          </div>
        )}
      </motion.div>
    </div>
  );
};
