"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AppSettings } from "../../types";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { ThemePicker } from "./ThemePicker";
import { UploadLogo } from "./UploadLogo";

const settingsSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  phone: z.string().optional(),
  phoneVisible: z.boolean(),
  heroTitle: z.string().min(1, "Hero title is required"),
  heroSubtitle: z.string().min(1, "Hero subtitle is required"),
  telegram: z.string().url("Must be a valid URL").or(z.literal("")),
  telegramChannel: z.string().url("Must be a valid URL").or(z.literal("")),
  whatsapp: z.string().url("Must be a valid URL").or(z.literal("")),
  imo: z.string().url("Must be a valid URL").or(z.literal("")),
  instagram: z.string().url("Must be a valid URL").or(z.literal("")),
  facebook: z.string().url("Must be a valid URL").or(z.literal("")),
  facebookVisible: z.boolean(),
  telegramVisible: z.boolean(),
  telegramChannelVisible: z.boolean(),
  whatsappVisible: z.boolean(),
  imoVisible: z.boolean(),
  instagramVisible: z.boolean(),
  logoUrl: z.string().optional(),
  theme: z.string(),
  autoRedirect: z.boolean(),
  redirectDelay: z.number().min(1).max(60),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

interface SettingsFormProps {
  initialData: AppSettings;
  onSave: (data: Partial<AppSettings>) => Promise<void>;
}

export const SettingsForm = ({ initialData, onSave }: SettingsFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: initialData,
  });

  // Update form when initialData changes (e.g. from realtime subscription)
  import("react").then((React) => {
    React.useEffect(() => {
      reset(initialData);
    }, [initialData, reset]);
  });

  const onSubmit = async (data: SettingsFormData) => {
    await onSave(data as Partial<AppSettings>);
  };

  const themeValue = watch("theme");
  const logoUrlValue = watch("logoUrl");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* General Settings */}
        <div className="space-y-6 md:col-span-2 border-b border-gray-200 dark:border-gray-800 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">General Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Business Name</label>
              <input 
                {...register("businessName")} 
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName.message as string}</p>}
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Phone Number</label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Visible</span>
                  <input 
                    type="checkbox" 
                    {...register("phoneVisible")} 
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
              </div>
              <input 
                {...register("phone")} 
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hero Title</label>
              <input 
                {...register("heroTitle")} 
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hero Subtitle</label>
              <input 
                {...register("heroSubtitle")} 
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Branding */}
        <div className="space-y-6 md:col-span-2 border-b border-gray-200 dark:border-gray-800 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Branding</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme Color</label>
              <ThemePicker 
                value={themeValue} 
                onChange={(val) => setValue("theme", val)} 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Logo</label>
              <UploadLogo 
                currentUrl={logoUrlValue} 
                onUpload={(url) => setValue("logoUrl", url)} 
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-6 md:col-span-2 border-b border-gray-200 dark:border-gray-800 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Social Links</h3>
          
          <div className="space-y-4">
            {['telegram', 'telegramChannel', 'whatsapp', 'imo', 'instagram', 'facebook'].map((platform) => {
              const visibleKey = `${platform}Visible` as keyof SettingsFormData;
              const urlKey = platform as keyof SettingsFormData;
              
              return (
                <div key={platform} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
                      {platform.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Visible</span>
                      <input 
                        type="checkbox" 
                        {...register(visibleKey)} 
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <input 
                    {...register(urlKey)} 
                    placeholder="https://..."
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                  />
                  {errors[urlKey] && (
                    <p className="text-red-500 text-xs mt-1">{(errors[urlKey] as any)?.message}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Auto Redirect */}
        <div className="space-y-6 md:col-span-2 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Auto Redirect</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                {...register("autoRedirect")} 
                id="autoRedirect"
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="autoRedirect" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enable Telegram Channel Auto-Redirect
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Redirect Delay (seconds)
              </label>
              <input 
                type="number"
                {...register("redirectDelay", { valueAsNumber: true })} 
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              {errors.redirectDelay && <p className="text-red-500 text-xs mt-1">{errors.redirectDelay.message as string}</p>}
            </div>
          </div>
        </div>

      </div>

      <div className="flex justify-end pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center py-3 px-8 rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50 transition-all font-medium disabled:opacity-70 min-w-[150px]"
        >
          {isSubmitting ? <LoadingSpinner size={20} className="text-white" /> : "Save Changes"}
        </button>
      </div>
    </form>
  );
};
