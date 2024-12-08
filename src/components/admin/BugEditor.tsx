import React, { useState } from 'react';
import { Bug, Scene } from '../../types';
import { useGameStore } from '../../store/gameStore';
import { Edit2, Trash2, Undo, Save, X, Upload } from 'lucide-react';

interface BugEditorProps {
  scene: Scene;
  bugs: Bug[];
}

export const BugEditor: React.FC<BugEditorProps> = ({ scene, bugs }) => {
  const { addBug, updateBug, deleteBug } = useGameStore();
  const [coordinates, setCoordinates] = useState<{ x: number; y: number }[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [editingBugId, setEditingBugId] = useState<string | null>(null);
  const [bugDetails, setBugDetails] = useState({
    name: '',
    funFact: '',
    prompt: '',
    image: null as string | null,
  });

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

  const handleBugImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBugDetails({ ...bugDetails, image: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
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
      addBug({ ...bugDetails, coordinates, sceneId: scene.id });
    }

    setCoordinates([]);
    setBugDetails({ name: '', funFact: '', prompt: '', image: null });
    setIsDrawing(false);
    setEditingBugId(null);
  };

  const handleEdit = (bug: Bug) => {
    setEditingBugId(bug.id);
    setBugDetails({
      name: bug.name,
      funFact: bug.funFact,
      prompt: bug.prompt,
      image: bug.image,
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
    setBugDetails({ name: '', funFact: '', prompt: '', image: null });
    setCoordinates([]);
    setIsDrawing(false);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">
            {editingBugId ? 'Edit Bug Area' : 'Define Bug Area'}
          </h3>
          {!isDrawing ? (
            <button
              onClick={handleStartDrawing}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
            >
              {editingBugId ? 'Redraw Area' : 'Start Drawing Area'}
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleUndoPoint}
                disabled={coordinates.length === 0}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Undo size={16} /> Undo Point
              </button>
              <button
                onClick={handleFinishDrawing}
                disabled={coordinates.length < 3}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Save size={16} /> Finish Area
              </button>
              <button
                onClick={handleCancelDrawing}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2"
              >
                <X size={16} /> Cancel
              </button>
            </div>
          )}
        </div>

        {isDrawing && (
          <div className="bg-blue-100 p-4 rounded-lg mb-4">
            <p className="text-blue-800">
              Click on the image to place points and create a polygon around the bug.
              Add at least 3 points to define the area.
            </p>
          </div>
        )}
        
        <div className="relative inline-block">
          <img
            src={scene.image}
            alt="Scene"
            className={`max-w-full ${isDrawing ? 'cursor-crosshair' : 'cursor-default'}`}
            onClick={handleImageClick}
          />
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {coordinates.map((point, i) => (
              <g key={i}>
                <circle
                  cx={`${point.x}%`}
                  cy={`${point.y}%`}
                  r="4"
                  fill="red"
                />
                {i > 0 && (
                  <line
                    x1={`${coordinates[i-1].x}%`}
                    y1={`${coordinates[i-1].y}%`}
                    x2={`${point.x}%`}
                    y2={`${point.y}%`}
                    stroke="red"
                    strokeWidth="2"
                  />
                )}
                {i === coordinates.length - 1 && coordinates.length > 2 && (
                  <line
                    x1={`${point.x}%`}
                    y1={`${point.y}%`}
                    x2={`${coordinates[0].x}%`}
                    y2={`${coordinates[0].y}%`}
                    stroke="red"
                    strokeWidth="2"
                    strokeDasharray="4"
                  />
                )}
              </g>
            ))}
            {coordinates.length > 2 && (
              <polygon
                points={coordinates
                  .map((point) => `${point.x},${point.y}`)
                  .join(' ')}
                fill="rgba(255,0,0,0.2)"
                stroke="red"
              />
            )}
          </svg>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-2">Bug Name</label>
          <input
            type="text"
            value={bugDetails.name}
            onChange={(e) =>
              setBugDetails({ ...bugDetails, name: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block font-semibold mb-2">Fun Fact</label>
          <textarea
            value={bugDetails.funFact}
            onChange={(e) =>
              setBugDetails({ ...bugDetails, funFact: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block font-semibold mb-2">Question Prompt</label>
          <input
            type="text"
            value={bugDetails.prompt}
            onChange={(e) =>
              setBugDetails({ ...bugDetails, prompt: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Bug Image</label>
          <div
            className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => document.getElementById('bug-image')?.click()}
          >
            {bugDetails.image ? (
              <div className="relative group">
                <img
                  src={bugDetails.image}
                  alt={bugDetails.name}
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
              id="bug-image"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleBugImageUpload}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editingBugId ? 'Update Bug' : 'Add Bug'}
          </button>
          {editingBugId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {bugs.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Defined Bugs</h3>
          <div className="space-y-3">
            {bugs.map((bug) => (
              <div
                key={bug.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
              >
                <div className="flex items-center gap-4">
                  {bug.image && (
                    <img
                      src={bug.image}
                      alt={bug.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <h4 className="font-medium">{bug.name}</h4>
                    <p className="text-sm text-gray-600">{bug.prompt}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(bug)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    title="Edit bug"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(bug.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                    title="Delete bug"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};