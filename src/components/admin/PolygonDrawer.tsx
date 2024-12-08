import React from 'react';
import { Undo, Save, X } from 'lucide-react';
import { Coordinate } from '../../types';

interface PolygonDrawerProps {
  isDrawing: boolean;
  coordinates: Coordinate[];
  editingBugId: string | null;
  onStartDrawing: () => void;
  onUndoPoint: () => void;
  onFinishDrawing: () => void;
  onCancelDrawing: () => void;
  onImageClick: (e: React.MouseEvent<HTMLImageElement>) => void;
  sceneImage: string;
}

export const PolygonDrawer: React.FC<PolygonDrawerProps> = ({
  isDrawing,
  coordinates,
  editingBugId,
  onStartDrawing,
  onUndoPoint,
  onFinishDrawing,
  onCancelDrawing,
  onImageClick,
  sceneImage,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">
          {editingBugId ? 'Edit Bug Area' : 'Define Bug Area'}
        </h3>
        {!isDrawing ? (
          <button
            onClick={onStartDrawing}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
          >
            {editingBugId ? 'Redraw Area' : 'Start Drawing Area'}
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={onUndoPoint}
              disabled={coordinates.length === 0}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Undo size={16} /> Undo Point
            </button>
            <button
              onClick={onFinishDrawing}
              disabled={coordinates.length < 3}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Save size={16} /> Finish Area
            </button>
            <button
              onClick={onCancelDrawing}
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
          src={sceneImage}
          alt="Scene"
          className={`max-w-full ${isDrawing ? 'cursor-crosshair' : 'cursor-default'}`}
          onClick={onImageClick}
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
  );
};