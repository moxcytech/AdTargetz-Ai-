import React from 'react';
import { SectionHeader } from './SectionHeader';
import { TargetIcon, LightbulbIcon, QuestionIcon } from './icons';

const aboutData = [
  {
    icon: <TargetIcon className="w-10 h-10 text-[#2A5652]" />,
    title: 'Our Mission',
    description: 'To revolutionize customer acquisition. We exist to bridge the gap between complex digital marketing technology and business owners, ensuring that every dollar spent on advertising yields profitable, measurable growth through the power of Artificial Intelligence.',
  },
  {
    icon: <LightbulbIcon className="w-10 h-10 text-[#2A5652]" />,
    title: 'Our Vision',
    description: 'We see a future where business growth is not limited by marketing expertise. Our vision is to build the world\'s most intelligent, autonomous growth engine that makes sophisticated, cross-channel advertising accessible, transparent, and effective for everyone.',
  },
  {
    icon: <QuestionIcon className="w-10 h-10 text-[#2A5652]" />,
    title: 'What We Do',
    description: 'We don\'t just run ads; we build ecosystems. AdTargetz Ai automates the entire marketing funnel—from crafting high-converting creatives and selecting precise target audiences to optimizing bids in real-time across Google, Meta, and offline channels.',
  },
];

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-lg transition-all duration-300 h-full flex flex-col">
    <div className="flex justify-center items-center mb-6 bg-teal-50 rounded-full w-20 h-20 mx-auto">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-sm md:text-base flex-1">{description}</p>
  </div>
);

export const AboutSection: React.FC = () => {
  return (
    <section>
      <SectionHeader title="About Us" subtitle="Who we are and what we do" />
      <div className="py-16 sm:py-24 bg-gray-50 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
             <h3 className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed">
              At AdTargetz, we let AI handle the <span className="font-bold text-[#2A5652]">heavy lifting of selling</span> for your business, allowing you to focus entirely on <span className="font-bold text-[#2A5652]">closing the deals</span>.
             </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {aboutData.map((item, index) => (
              <InfoCard key={index} icon={item.icon} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};