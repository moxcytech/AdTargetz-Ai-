import React from 'react';
import { SectionArrowIcon } from './icons';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => (
  <div className="bg-[#075E54] text-white py-6 px-4 sm:px-8 md:px-16 lg:px-24">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
        <p className="text-base md:text-lg opacity-80 mt-1">{subtitle}</p>
      </div>
      <SectionArrowIcon className="hidden sm:block" />
    </div>
  </div>
);