import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Bug } from '../../types';

interface BugListProps {
  bugs: Bug[];
  onEdit: (bug: Bug) => void;
  onDelete: (id: string) => void;
}

export const BugList: React.FC<BugListProps> = ({ bugs, onEdit, onDelete }) => {
  if (bugs.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Defined Bugs</h3>
      <div className="space-y-3">
        {bugs.map((bug) => (
          <div
            key={bug.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
          >
            <div>
              <h4 className="font-medium">{bug.name}</h4>
              <p className="text-sm text-gray-600">{bug.prompt}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(bug)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                title="Edit bug"
              >
                <Edit2 size={20} />
              </button>
              <button
                onClick={() => onDelete(bug.id)}
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
  );
};