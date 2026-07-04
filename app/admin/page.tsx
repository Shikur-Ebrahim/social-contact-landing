"use client";

import { useEffect, useState } from "react";
import { AppSettings } from "../../types";
import { fetchSettings, subscribeToSettings, updateSettings } from "../../lib/firestore";
import { SettingsForm } from "../../components/admin/SettingsForm";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { StatsCard } from "../../components/admin/StatsCard";
import { Eye, MousePointerClick, Users } from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [settings, setSettings] = useState<AppSettings | null>(null);

  useEffect(() => {
    // Initial fetch to ensure document exists
    fetchSettings().catch(console.error);
    
    // Subscribe to realtime updates
    const unsubscribe = subscribeToSettings((data) => {
      setSettings(data);
    });

    return () => unsubscribe();
  }, []);

  if (!settings) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  const handleSave = async (newSettings: Partial<AppSettings>) => {
    try {
      await updateSettings(newSettings);
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your landing page settings and view statistics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Total Views" value="1,234" icon={Eye} trend="+12%" />
        <StatsCard title="Link Clicks" value="856" icon={MousePointerClick} trend="+5%" />
        <StatsCard title="Unique Visitors" value="945" icon={Users} trend="+8%" />
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Landing Page Settings</h2>
        <SettingsForm initialData={settings} onSave={handleSave} />
      </div>
    </div>
  );
}
