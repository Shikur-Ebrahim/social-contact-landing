import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
}

export const StatsCard = ({ title, value, icon: Icon, trend }: StatsCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
        <div className="flex items-end gap-3">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
          <span className="text-sm font-medium text-green-600 mb-1">{trend}</span>
        </div>
      </div>
      <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
        <Icon size={24} />
      </div>
    </div>
  );
};
