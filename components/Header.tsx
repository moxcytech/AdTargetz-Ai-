import React from 'react';
import { LogoIcon } from './icons';
import { useAuth } from '../contexts/AuthContext';

export const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.hash = '/';
  }

  const navigate = (hash: string) => {
      window.location.hash = hash;
  }

  return (
    <header className="bg-[#075E54] text-white text-center pt-10 pb-20 md:pb-32 relative">
      <nav className="absolute top-0 left-0 right-0 p-4 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer" aria-label="Go to homepage">
            <div className="bg-white p-1 rounded-md">
              <LogoIcon className="w-6 h-6 text-[#075E54]" />
            </div>
            <span className="text-xl font-bold">AdTargetz Ai</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            {isAuthenticated ? (
              <>
                <button onClick={() => navigate('/dashboard')} className="bg-white text-[#075E54] font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition-colors text-sm sm:text-base">
                  Dashboard
                </button>
                <button onClick={handleLogout} className="font-semibold py-2 px-4 rounded-md hover:bg-white/10 transition-colors text-sm sm:text-base">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="font-semibold py-2 px-4 rounded-md hover:bg-white/10 transition-colors text-sm sm:text-base">
                  Login
                </button>
                <button onClick={() => navigate('/signup')} className="bg-white text-[#075E54] font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition-colors text-sm sm:text-base">
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto px-4 pt-16">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="bg-white p-2 rounded-md">
            <LogoIcon className="w-8 h-8 text-[#075E54]" />
          </div>
          <span className="text-3xl font-bold">AdTargetz Ai</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">AdTargetz Ai</h1>
        <p className="mt-6 text-2xl md:text-4xl font-semibold opacity-95">
          Turn Ad Spend Into Revenue on Autopilot
        </p>
        <p className="mt-6 text-lg md:text-xl opacity-80 max-w-2xl mx-auto leading-relaxed font-light">
          Launch high-converting ads, automate lead follow-ups, and <br className="hidden md:block" /> scale your business 24/7 with intelligent AI.
        </p>
      </div>
    </header>
  );
};