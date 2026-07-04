import React from "react";

const PRESET_COLORS = [
  "#2563eb", // Blue
  "#16a34a", // Green
  "#dc2626", // Red
  "#9333ea", // Purple
  "#ea580c", // Orange
  "#0f172a", // Slate
  "#ec4899", // Pink
  "#14b8a6", // Teal
];

interface ThemePickerProps {
  value: string;
  onChange: (color: string) => void;
}

export const ThemePicker = ({ value, onChange }: ThemePickerProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <input 
          type="color" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-12 rounded cursor-pointer border-0 p-0"
        />
        <input 
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white uppercase font-mono"
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        {PRESET_COLORS.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className={`w-8 h-8 rounded-full shadow-sm transition-transform hover:scale-110 ${
              value === color ? "ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-500" : ""
            }`}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>
    </div>
  );
};
