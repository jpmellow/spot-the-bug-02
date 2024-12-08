import React from 'react';
import { Scene } from '../../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SceneSelectorProps {
  scenes: Scene[];
  currentSceneId: string | null;
  onSelectScene: (sceneId: string) => void;
}

export const SceneSelector: React.FC<SceneSelectorProps> = ({
  scenes,
  currentSceneId,
  onSelectScene,
}) => {
  const currentIndex = scenes.findIndex(scene => scene.id === currentSceneId);

  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : scenes.length - 1;
    onSelectScene(scenes[newIndex].id);
  };

  const goToNext = () => {
    const newIndex = currentIndex < scenes.length - 1 ? currentIndex + 1 : 0;
    onSelectScene(scenes[newIndex].id);
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <button
        onClick={goToPrevious}
        className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
        title="Previous scene"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="flex-1">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
          {scenes.map((scene, index) => (
            <button
              key={scene.id}
              onClick={() => onSelectScene(scene.id)}
              className="group"
            >
              <div className={`relative aspect-video rounded-lg overflow-hidden transition-all duration-300
                ${currentSceneId === scene.id
                  ? 'ring-4 ring-green-500 scale-105 shadow-lg'
                  : 'opacity-60 hover:opacity-100 hover:scale-105'
                }`}
              >
                <img
                  src={scene.image}
                  alt={scene.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity">
                  <span className="text-white font-bold opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all">
                    {index + 1}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm text-center font-medium text-gray-700 truncate px-1">
                {scene.name}
              </p>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={goToNext}
        className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
        title="Next scene"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};