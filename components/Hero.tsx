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
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        {logoUrl ? (
          <img 
            src={logoUrl} 
            alt={businessName} 
            className="w-full aspect-[16/9] object-cover shadow-md"
            fetchPriority="high"
          />
        ) : (
          <div 
            className="w-full aspect-[16/9] flex items-center justify-center text-6xl font-bold text-white shadow-md"
            style={{ backgroundColor: themeColor }}
          >
            {businessName.charAt(0).toUpperCase()}
          </div>
        )}
      </motion.div>
    </div>
  );
};
