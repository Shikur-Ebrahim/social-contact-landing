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
    <div className="text-center py-12 px-4 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex flex-col items-center"
      >
        {logoUrl ? (
          <img 
            src={logoUrl} 
            alt={businessName} 
            className="w-24 h-24 rounded-full object-cover shadow-xl mb-4 border-4"
            style={{ borderColor: themeColor }}
          />
        ) : (
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-xl mb-4"
            style={{ backgroundColor: themeColor }}
          >
            {businessName.charAt(0).toUpperCase()}
          </div>
        )}
        
        <h2 className="text-sm font-medium tracking-widest uppercase text-gray-500 dark:text-gray-400">
          {businessName}
        </h2>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight"
      >
        {title}
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl md:text-3xl text-gray-600 dark:text-gray-300"
      >
        {subtitle}
      </motion.p>
    </div>
  );
};
