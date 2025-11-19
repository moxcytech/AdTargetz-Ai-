import React from 'react';
import { LogoIcon } from './icons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#075E54] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center text-center">
           <div onClick={() => window.location.hash = '#/'} className="flex items-center gap-2 cursor-pointer" aria-label="Go to homepage">
              <div className="bg-white p-1 rounded-md">
              <LogoIcon className="w-6 h-6 text-[#075E54]" />
              </div>
              <span className="text-xl font-bold">AdTargetz Ai</span>
          </div>
          <p className="mt-4 text-gray-400 max-w-md">
            AI Powered Customer Acquisition to help your business grow.
          </p>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} AdTargetz Ai. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};