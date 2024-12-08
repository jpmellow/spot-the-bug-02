import React, { useState } from 'react';
import { Scene } from '../../types';
import { Upload, X } from 'lucide-react';

interface SceneFormProps {
  editingScene: Scene | null;
  onSubmit: (scene: { name: string; image: string }) => void;
  onCancel: () => void;
}

export const SceneForm: React.FC<SceneFormProps> = ({
  editingScene,
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState(editingScene?.name || '');
  const [image, setImage] = useState(editingScene?.image || '');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert('Please upload an image');
      return;
    }
    onSubmit({ name, image });
    setName('');
    setImage('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">
          {editingScene ? 'Edit Scene' : 'Add New Scene'}
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-2">Scene Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Scene Image</label>
          <div
            className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => document.getElementById('scene-image')?.click()}
          >
            {image ? (
              <div className="relative group">
                <img
                  src={image}
                  alt={name}
                  className="max-h-64 mx-auto rounded"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white">Click to change image</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
              </div>
            )}
            <input
              id="scene-image"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            {editingScene ? 'Update Scene' : 'Add Scene'}
          </button>
        </div>
      </form>
    </div>
  );
};