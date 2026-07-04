"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

interface CountdownRedirectProps {
  enabled: boolean;
  delay: number;
  url: string;
}

export const CountdownRedirect = ({ enabled, delay, url }: CountdownRedirectProps) => {
  const [timeLeft, setTimeLeft] = useState(delay);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    if (!enabled || !url || isCancelled) return;

    if (timeLeft <= 0) {
      window.location.href = url;
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [enabled, url, timeLeft, isCancelled]);

  if (!enabled || !url || isCancelled) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-4 z-50 overflow-hidden"
    >
      <div 
        className="absolute bottom-0 left-0 h-1 bg-blue-600"
        style={{ 
          width: `${((delay - timeLeft) / delay) * 100}%`,
          transition: 'width 1s linear'
        }}
      />
      
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600">
          <Send size={20} />
        </div>
        
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-white">Redirecting to Telegram</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Opening channel in {timeLeft} second{timeLeft !== 1 ? 's' : ''}...
          </p>
        </div>
      </div>
      
      <div className="mt-4 flex gap-2">
        <button 
          onClick={() => setIsCancelled(true)}
          className="flex-1 py-2 px-4 rounded-xl text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button 
          onClick={() => window.location.href = url}
          className="flex-1 py-2 px-4 rounded-xl text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Open Now
        </button>
      </div>
    </motion.div>
  );
};
