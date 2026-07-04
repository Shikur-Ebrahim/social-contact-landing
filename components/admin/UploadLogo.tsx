import React, { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { toast } from "sonner";

const CLOUDINARY_CLOUD_NAME = "dorg6c4ak";
const CLOUDINARY_UPLOAD_PRESET = "ethiocoders-certify";

interface UploadLogoProps {
  currentUrl?: string;
  onUpload: (url: string) => void;
}

export const UploadLogo = ({ currentUrl, onUpload }: UploadLogoProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    uploadToCloudinary(file);
  };

  const uploadToCloudinary = async (file: File) => {
    setIsUploading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", "social-contact-landing/logos");

      // Use XMLHttpRequest so we can show real upload progress
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            setProgress(Math.round((event.loaded / event.total) * 100));
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            onUpload(data.secure_url);
            toast.success("Logo uploaded successfully");
            resolve();
          } else {
            reject(new Error("Upload failed"));
          }
        };

        xhr.onerror = () => reject(new Error("Network error"));

        xhr.open(
          "POST",
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
        );
        xhr.send(formData);
      });
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
      setProgress(0);
      // Reset the file input so the same file can be re-selected if needed
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      {currentUrl ? (
        <div className="relative inline-block">
          <img
            src={currentUrl}
            alt="Logo"
            className="w-24 h-24 rounded-2xl object-cover border border-gray-200 dark:border-gray-800"
          />
          <button
            type="button"
            onClick={() => onUpload("")}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-sm"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className="w-full max-w-xs h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 w-full px-6">
              <LoadingSpinner size={24} />
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm text-gray-500">{progress}%</span>
            </div>
          ) : (
            <>
              <Upload className="text-gray-400 mb-2" size={24} />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Click to upload logo
              </span>
              <span className="text-xs text-gray-400 mt-1">Max 5MB</span>
            </>
          )}
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};
