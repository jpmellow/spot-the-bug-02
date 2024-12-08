import React from 'react';
import { Scene } from '../../types';
import { Edit2, Trash2 } from 'lucide-react';

interface SceneListProps {
  scenes: Scene[];
  currentSceneId: string | null;
  onSelectScene: (sceneId: string) => void;
  onEditScene: (scene: Scene) => void;
  onDeleteScene: (id: string) => void;
}

export const SceneList: React.FC<SceneListProps> = ({
  scenes,
  currentSceneId,
  onSelectScene,
  onEditScene,
  onDeleteScene,
}) => {
  if (scenes.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Scenes</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {scenes.map((scene) => (
          <div
            key={scene.id}
            className={`relative group rounded-lg overflow-hidden shadow-md cursor-pointer
              ${currentSceneId === scene.id ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => onSelectScene(scene.id)}
          >
            <img
              src={scene.image}
              alt={scene.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
              <h4 className="text-white font-medium">{scene.name}</h4>
            </div>
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditScene(scene);
                }}
                className="p-2 bg-white rounded-full text-blue-600 hover:bg-blue-50"
                title="Edit scene"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteScene(scene.id);
                }}
                className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50"
                title="Delete scene"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};