import React, { useState } from 'react';
import { Bug, Scene } from '../types';
import { useGameStore } from '../store/gameStore';
import { Plus } from 'lucide-react';
import { SceneList } from './admin/SceneList';
import { SceneForm } from './admin/SceneForm';
import { BugEditor } from './admin/BugEditor';

export const AdminPanel = () => {
  const {
    scenes,
    currentSceneId,
    bugs,
    addScene,
    updateScene,
    deleteScene,
    setCurrentScene,
  } = useGameStore();

  const [showSceneForm, setShowSceneForm] = useState(false);
  const [editingScene, setEditingScene] = useState<Scene | null>(null);

  const handleSceneSubmit = (sceneData: { name: string; image: string }) => {
    if (editingScene) {
      updateScene(editingScene.id, sceneData);
    } else {
      addScene(sceneData);
    }
    setShowSceneForm(false);
    setEditingScene(null);
  };

  const handleEditScene = (scene: Scene) => {
    setEditingScene(scene);
    setShowSceneForm(true);
  };

  const handleDeleteScene = (id: string) => {
    if (window.confirm('Are you sure you want to delete this scene and all its bugs?')) {
      deleteScene(id);
    }
  };

  const handleCancelSceneForm = () => {
    setShowSceneForm(false);
    setEditingScene(null);
  };

  const currentScene = scenes.find(scene => scene.id === currentSceneId);
  const currentSceneBugs = bugs.filter(bug => bug.sceneId === currentSceneId);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <button
          onClick={() => setShowSceneForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus size={20} />
          Add New Scene
        </button>
      </div>

      {showSceneForm && (
        <SceneForm
          editingScene={editingScene}
          onSubmit={handleSceneSubmit}
          onCancel={handleCancelSceneForm}
        />
      )}

      <SceneList
        scenes={scenes}
        currentSceneId={currentSceneId}
        onSelectScene={setCurrentScene}
        onEditScene={handleEditScene}
        onDeleteScene={handleDeleteScene}
      />

      {currentScene && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">
            Bugs in {currentScene.name}
          </h3>
          <BugEditor
            scene={currentScene}
            bugs={currentSceneBugs}
          />
        </div>
      )}
    </div>
  );
};