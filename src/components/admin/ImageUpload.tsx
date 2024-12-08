import React from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageUpload(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-8">
      <label className="block mb-2 font-semibold">
        Upload Scene Image
        <div className="mt-2 flex items-center justify-center w-full h-32 px-4 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <span className="mt-2 block text-sm text-gray-600">
              Click to upload or drag and drop
            </span>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
      </label>
    </div>
  );
};