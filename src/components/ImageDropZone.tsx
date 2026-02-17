// src/components/ImageDropzone.tsx
import { useId, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { supabase } from "../libs/supabaseClient";

type ImageDropzoneProps = {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  bucket?: string; // Supabase bucket name
  folder?: string; // folder inside the bucket
};

export function ImageDropzone({
  label = "Image",
  value,
  onChange,
  bucket = "public-assets",
  folder = "uploads",
}: ImageDropzoneProps) {
  const inputId = useId(); // ✅ unique per component instance

  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File) => {
    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }

    try {
      setUploading(true);

      const fileExt = file.name.split(".").pop() || "png";
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      // ✅ prevent "//" and leading/trailing slashes from creating weird paths
      const cleanFolder = folder.replace(/^\/+|\/+$/g, "");
      const filePath = `${cleanFolder}/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(data.path);

      onChange(publicUrl);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error uploading image.");
    } finally {
      setUploading(false);
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);

    // ✅ allow selecting the same file again
    e.currentTarget.value = "";
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm">{label}</label>
        {uploading && (
          <span className="text-xs text-slate-400">Uploading…</span>
        )}
      </div>

      <div
        className={`w-full rounded-md border px-3 py-4 text-sm cursor-pointer
          ${
            dragActive
              ? "border-cyan-400 bg-slate-800/80"
              : "border-slate-600 bg-slate-800/60 hover:bg-slate-800"
          }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id={inputId} // ✅ unique
          onChange={handleFileChange}
        />

        <label htmlFor={inputId} className="block cursor-pointer">
          <p className="font-medium">
            {value ? "Change image" : "Click to upload or drag & drop"}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            PNG, JPG, GIF up to a few MB.
          </p>
        </label>
      </div>

      {value && (
        <div className="flex items-center gap-3">
          <img
            src={value}
            alt="Preview"
            className="w-20 h-20 object-cover rounded-md border border-slate-600"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="text-xs px-3 py-1 rounded-md border border-slate-500 hover:bg-slate-800"
          >
            Remove
          </button>
        </div>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
