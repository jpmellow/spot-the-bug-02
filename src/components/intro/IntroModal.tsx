import React from 'react';
import { Logo } from '../Logo';
import { useGameStore } from '../../store/gameStore';
import { Sparkles, Search, Target, Brain } from 'lucide-react';

export const IntroModal = () => {
  const { showIntro, hideIntro } = useGameStore();

  if (!showIntro) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl transform transition-all">
        <div className="relative px-6 py-8">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-green-100 rounded-full -translate-x-16 -translate-y-16 opacity-50" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-100 rounded-full translate-x-20 translate-y-20 opacity-50" />
          
          <div className="relative">
            {/* Logo section */}
            <div className="flex justify-center mb-8">
              <Logo className="scale-125" />
            </div>

            {/* Welcome text */}
            <div className="space-y-6">
              <p className="text-lg text-center mb-8 text-gray-700">
                Get ready to step into a world teeming with tiny critters and hidden surprises! 
                In this game, you'll explore vibrant scenes filled with all kinds of bugs, 
                from dazzling butterflies to sneaky beetles. 
                <span className="inline-block ml-2 animate-bounce-slow">🦋✨</span>
              </p>

              {/* Mission section */}
              <div className="bg-green-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                  <Target className="text-green-600" />
                  Your mission is simple:
                </h3>
                <ul className="space-y-3 text-green-800">
                  <li className="flex items-center gap-2">
                    <Search size={20} className="flex-shrink-0" />
                    Look closely at the scene in front of you.
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles size={20} className="flex-shrink-0" />
                    Spot the bug you're asked to find.
                  </li>
                  <li className="flex items-center gap-2">
                    <Brain size={20} className="flex-shrink-0" />
                    Click on it to see if you're right!
                  </li>
                </ul>
              </div>

              {/* Pro tips section */}
              <div className="bg-blue-50 rounded-xl p-6 mb-12">
                <h3 className="text-xl font-bold text-blue-800 mb-4">
                  Pro Tips for Bug Detectives:
                </h3>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-center gap-2">
                    <span className="text-2xl">🔍</span>
                    Take your time—some bugs are masters of disguise!
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-2xl">🌟</span>
                    Don't worry if you miss; you can always try again.
                  </li>
                </ul>
              </div>

              <p className="text-center text-gray-700 mb-32">
                Good luck, and may your eyes be sharper than a dragonfly's! 🕵️‍♂️🐜
              </p>
            </div>

            {/* Start button */}
            <div className="flex justify-center pt-8">
              <button
                onClick={hideIntro}
                className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl transform transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <span className="relative z-10">Start Your Adventure!</span>
                <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-20 transition-opacity" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};