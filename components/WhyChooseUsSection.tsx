import React from 'react';
import { SectionHeader } from './SectionHeader';
import { CreativeAiIcon, TargetIcon, OptimizeIcon } from './icons';

const whyData = [
  {
    icon: <CreativeAiIcon className="w-10 h-10 text-[#2A5652]" />,
    title: 'Creative AI',
    description: 'Auto-generate on-brand ad images and variations from your brief.',
  },
  {
    icon: <TargetIcon className="w-10 h-10 text-[#2A5652]" />,
    title: 'Targeting',
    description: 'AI understand the Business and suggest right keywords and audiences.',
  },
  {
    icon: <OptimizeIcon className="w-10 h-10 text-[#2A5652]" />,
    title: 'Optimizing & Reporting',
    description: 'Budget optimization, live dashboards and Inbuilt CRM.',
  },
];

const WhyCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center hover:shadow-xl transition-shadow duration-300">
    <div className="flex justify-center items-center mb-4 bg-teal-50 rounded-full w-20 h-20 mx-auto">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section>
      <SectionHeader title="Why Choose AdTargetz Ai" subtitle="Three AI-driven pillars" />
      <div className="py-16 sm:py-20 bg-gray-50 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyData.map((item, index) => (
              <WhyCard key={index} icon={item.icon} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};