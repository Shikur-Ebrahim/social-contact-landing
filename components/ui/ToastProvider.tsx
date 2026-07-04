"use client";

import { Toaster } from "sonner";

export const ToastProvider = () => {
  return (
    <Toaster 
      position="bottom-right" 
      toastOptions={{
        style: {
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#111827',
        }
      }} 
    />
  );
};
