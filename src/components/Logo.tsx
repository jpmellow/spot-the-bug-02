import React from 'react';
import { Bug } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Bug 
        size={32} 
        className="animate-bounce-slow"
      />
      <div className="flex flex-col">
        <span className="text-2xl font-bold">
          Spot the Bug!
        </span>
        <span className="text-xs opacity-90 -mt-1">A fun learning adventure</span>
      </div>
    </div>
  );
};