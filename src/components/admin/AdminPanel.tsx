import React, { useState } from 'react';
import { Bug } from '../../types';
import { useGameStore } from '../../store/gameStore';
import { ImageUpload } from './ImageUpload';
import { PolygonDrawer } from './PolygonDrawer';
import { BugForm } from './BugForm';
import { BugList } from './BugList';

export const AdminPanel = () => {
  const { addBug, updateBug, deleteBug, setSceneImage, sceneImage, bugs } = useGameStore();
  const [coordinates, setCoordinates] = useState<{ x: number; y: number }[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [editingBugId, setEditingBugId] = useState<string | null>(null);
  const [bugDetails, setBugDetails] = useState({
    name: '',
    funFact: '',
    prompt: '',
  });

  const handleImageUpload = (image: string) => {
    setSceneImage(image);
  };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isDrawing) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCoordinates([...coordinates, { x, y }]);
  };

  const handleStartDrawing = () => {
    setIsDrawing(true);
    setCoordinates([]);
  };

  const handleUndoPoint = () => {
    setCoordinates(coordinates.slice(0, -1));
  };

  const handleFinishDrawing = () => {
    if (coordinates.length < 3) {
      alert('Please define at least 3 points for the bug area');
      return;
    }
    setIsDrawing(false);
  };

  const handleCancelDrawing = () => {
    setIsDrawing(false);
    setCoordinates([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (coordinates.length < 3) {
      alert('Please define the bug area first');
      return;
    }

    if (editingBugId) {
      updateBug(editingBugId, { ...bugDetails, coordinates });
    } else {
      addBug({ ...bugDetails, coordinates });
    }

    setCoordinates([]);
    setBugDetails({ name: '', funFact: '', prompt: '' });
    setIsDrawing(false);
    setEditingBugId(null);
  };

  const handleEdit = (bug: Bug) => {
    setEditingBugId(bug.id);
    setBugDetails({
      name: bug.name,
      funFact: bug.funFact,
      prompt: bug.prompt,
    });
    setCoordinates(bug.coordinates);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this bug?')) {
      deleteBug(id);
    }
  };

  const handleCancelEdit = () => {
    setEditingBugId(null);
    setBugDetails({ name: '', funFact: '', prompt: '' });
    setCoordinates([]);
    setIsDrawing(false);
  };

  const handleBugDetailsChange = (field: string, value: string) => {
    setBugDetails({ ...bugDetails, [field]: value });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      
      <ImageUpload onImageUpload={handleImageUpload} />

      {sceneImage && (
        <PolygonDrawer
          isDrawing={isDrawing}
          coordinates={coordinates}
          editingBugId={editingBugId}
          onStartDrawing={handleStartDrawing}
          onUndoPoint={handleUndoPoint}
          onFinishDrawing={handleFinishDrawing}
          onCancelDrawing={handleCancelDrawing}
          onImageClick={handleImageClick}
          sceneImage={sceneImage}
        />
      )}

      <BugForm
        bugDetails={bugDetails}
        editingBugId={editingBugId}
        onSubmit={handleSubmit}
        onChange={handleBugDetailsChange}
        onCancelEdit={handleCancelEdit}
      />

      <BugList
        bugs={bugs}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};