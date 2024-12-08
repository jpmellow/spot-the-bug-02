import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { BugModal } from './BugModal';
import { SceneSelector } from './game/SceneSelector';

export const GameScene = () => {
  const {
    scenes,
    currentSceneId,
    setCurrentScene,
    bugs,
    currentBugId,
    setCurrentBug
  } = useGameStore();

  const [showModal, setShowModal] = useState(false);
  const [selectedBug, setSelectedBug] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const currentScene = scenes.find(scene => scene.id === currentSceneId);
  const currentSceneBugs = bugs.filter(bug => bug.sceneId === currentSceneId);
  const currentBug = currentSceneBugs.find((bug) => bug.id === currentBugId);

  useEffect(() => {
    if (scenes.length > 0 && !currentSceneId) {
      setCurrentScene(scenes[0].id);
    }
  }, [scenes, currentSceneId, setCurrentScene]);

  useEffect(() => {
    if (currentSceneBugs.length > 0 && !currentBugId) {
      setCurrentBug(currentSceneBugs[0].id);
    }
  }, [currentSceneBugs, currentBugId, setCurrentBug]);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => {
        setFeedback(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const clickedBug = currentSceneBugs.find((bug) => isPointInPolygon({ x, y }, bug.coordinates));
    
    if (clickedBug?.id === currentBugId) {
      setSelectedBug(clickedBug.id);
      setShowModal(true);
      setFeedback(null);
    } else {
      setFeedback("Not quite! Try again!");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    const currentIndex = currentSceneBugs.findIndex(bug => bug.id === currentBugId);
    const nextIndex = (currentIndex + 1) % currentSceneBugs.length;
    setCurrentBug(currentSceneBugs[nextIndex].id);
  };

  const isPointInPolygon = (
    point: { x: number; y: number },
    polygon: { x: number; y: number }[]
  ) => {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x;
      const yi = polygon[i].y;
      const xj = polygon[j].x;
      const yj = polygon[j].y;

      const intersect =
        yi > point.y !== yj > point.y &&
        point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;

      if (intersect) inside = !inside;
    }
    return inside;
  };

  if (scenes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">No scenes available</p>
        <p className="text-gray-500 mt-2">Switch to admin mode to add scenes and bugs</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <SceneSelector
        scenes={scenes}
        currentSceneId={currentSceneId}
        onSelectScene={setCurrentScene}
      />

      {currentScene && (
        <div className="space-y-6">
          {/* Question Box */}
          {currentBug && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-amber-100 transform -skew-y-1" />
              <div className="relative bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-amber-200 rounded-lg p-6 shadow-lg">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0zMCAzMG0tMjggMGEyOCwyOCAwIDEsMSA1NiwwYTI4LDI4IDAgMSwxIC01NiwwIiBzdHJva2U9IiNmZGUwOGEiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4=')] opacity-10" />
                <p className="relative text-xl font-medium text-amber-900 text-center">
                  {currentBug.prompt}
                </p>
              </div>
            </div>
          )}

          {/* Scene Image */}
          <div className="relative w-full rounded-xl overflow-hidden shadow-xl">
            <img
              src={currentScene.image}
              alt="Bug Scene"
              className="w-full cursor-pointer"
              onClick={handleClick}
            />
            {feedback && (
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-red-100 text-red-800 px-6 py-3 rounded-lg shadow-lg animate-bounce font-medium">
                  {feedback}
                </div>
              </div>
            )}
          </div>

          <BugModal
            isOpen={showModal}
            onClose={handleModalClose}
            bug={currentSceneBugs.find((bug) => bug.id === selectedBug)}
          />
        </div>
      )}
    </div>
  );
};