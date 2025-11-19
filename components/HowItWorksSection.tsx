import React from 'react';
import { SectionHeader } from './SectionHeader';
import { TargetIcon, RocketIcon, NodesIcon, GearIcon } from './icons';

const processSteps = [
  {
    icon: <TargetIcon className="w-8 h-8 text-white" />,
    label: 'Share brief & goals',
    color: 'bg-teal-300',
  },
  {
    icon: <RocketIcon className="w-8 h-8 text-white" />,
    label: 'Launch ads across channels',
    color: 'bg-teal-400',
  },
  {
    icon: <NodesIcon className="w-8 h-8 text-white" />,
    label: 'Leads routed to CRM/WhatsApp',
    color: 'bg-teal-500',
  },
  {
    icon: <GearIcon className="w-8 h-8 text-white" />,
    label: 'Optimize & scale performance',
    color: 'bg-teal-600',
  },
];

const ChevronStep: React.FC<{ step: typeof processSteps[0]; isLast: boolean }> = ({ step, isLast }) => (
  <div
    className={`relative flex-1 flex items-center justify-center text-center p-4 min-h-[120px] ${step.color}`}
    style={{ clipPath: isLast ? undefined : 'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)' }}
  >
    <div className="flex flex-col items-center text-white">
      <div className="mb-2">{step.icon}</div>
      <span className="font-semibold">{step.label}</span>
    </div>
  </div>
);


export const HowItWorksSection: React.FC = () => {
  return (
    <section>
      <SectionHeader title="How It Works" subtitle="From brief to qualified lead" />
      <div className="py-16 sm:py-20 bg-gray-50 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-[-1.5rem] lg:space-x-[-2.5rem]">
            {processSteps.map((step, index) => (
              <ChevronStep key={index} step={step} isLast={index === processSteps.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};