import React from 'react';

interface BugFormProps {
  bugDetails: {
    name: string;
    funFact: string;
    prompt: string;
  };
  editingBugId: string | null;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: string) => void;
  onCancelEdit: () => void;
}

export const BugForm: React.FC<BugFormProps> = ({
  bugDetails,
  editingBugId,
  onSubmit,
  onChange,
  onCancelEdit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold mb-2">Bug Name</label>
        <input
          type="text"
          value={bugDetails.name}
          onChange={(e) => onChange('name', e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">Fun Fact</label>
        <textarea
          value={bugDetails.funFact}
          onChange={(e) => onChange('funFact', e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">Question Prompt</label>
        <input
          type="text"
          value={bugDetails.prompt}
          onChange={(e) => onChange('prompt', e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
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
            onClick={onCancelEdit}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
};