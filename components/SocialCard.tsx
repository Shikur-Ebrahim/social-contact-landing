"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import React from "react";

interface SocialCardProps {
  platform: string;
  url: string;
  icon: LucideIcon | React.ElementType;
  title: string;
  subtitle: string;
  themeColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export const SocialCard = ({
  platform,
  url,
  icon: Icon,
  title,
  subtitle,
  themeColor = "#2563eb",
  gradientFrom,
  gradientTo,
}: SocialCardProps) => {
  
  const fromColor = gradientFrom || themeColor;
  const toColor = gradientTo || themeColor;

  if (!url) return null;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full max-w-md mx-auto"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="relative overflow-hidden rounded-2xl p-[2px] shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${fromColor}80, ${toColor}40)`
        }}
      >
        <div className="absolute inset-0 bg-white/40 backdrop-blur-xl"></div>
        <div className="relative flex items-center p-4 bg-white/80 dark:bg-gray-900/80 rounded-[14px] hover:bg-white/90 dark:hover:bg-gray-900/90 transition-colors">
          <div 
            className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full text-white shadow-md"
            style={{ background: `linear-gradient(135deg, ${fromColor}, ${toColor})` }}
          >
            <Icon size={24} />
          </div>
          
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          </div>
          
          <div className="text-gray-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </motion.a>
  );
};
