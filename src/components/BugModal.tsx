import React from 'react';
import { Bug } from '../types';
import { X } from 'lucide-react';

interface BugModalProps {
  isOpen: boolean;
  onClose: () => void;
  bug: Bug | undefined;
}

export const BugModal: React.FC<BugModalProps> = ({ isOpen, onClose, bug }) => {
  if (!isOpen || !bug) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-4">{bug.name}</h2>
        
        <div className="bg-green-100 p-4 rounded-lg mb-4">
          <p className="text-green-800 font-medium">Congratulations! You found it!</p>
        </div>

        {bug.image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img
              src={bug.image}
              alt={bug.name}
              className="w-full h-auto max-h-[400px] object-contain bg-gray-100"
            />
          </div>
        )}
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Fun Fact:</h3>
          <p className="text-gray-700">{bug.funFact}</p>
        </div>
      </div>
    </div>
  );
};