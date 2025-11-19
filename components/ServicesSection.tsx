import React from 'react';
import { SectionHeader } from './SectionHeader';

const servicesData = [
  {
    title: 'Omnichannel Ads (Digital & Offline)',
    description: 'One platform for Google, Social Media, TV, Radio, and Theatre ads to focus on your city.',
  },
  {
    title: 'Advanced CRM & AI Chatbot',
    description: 'Auto-followup leads with chatbots capable of sending photos, videos, and business details.',
  },
  {
    title: 'LinkedIn B2B Marketing',
    description: 'Target decision-makers by job title and industry. Automate outreach and content to drive high-value B2B leads.',
  },
  {
    title: 'Seamless API Integrations',
    description: 'Fully cloned integration environment. Simply paste provider API keys to work seamlessly.',
  },
  {
    title: 'Integrated Payment Systems',
    description: 'Connect payment gateways with an easy interface to manage transactions.',
  },
  {
    title: 'Meta & Google Ads',
    description: 'Capture high-intent audiences across Facebook, Instagram, Search, and YouTube.',
  },
  {
    title: 'Click to WhatsApp Ads',
    description: 'Start 1:1 conversations directly in WhatsApp.',
  },
  {
    title: 'Bulk WhatsApp Marketing',
    description: 'Let prospects call you with one tap.',
  },
  {
    title: 'All Business Categories',
    description: 'Tailored strategies supported for every kind of business category.',
  },
];

const ServiceCard: React.FC<{ index: number; title: string; description: string }> = ({ index, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-start gap-4">
      <span className="text-4xl font-bold text-gray-300">0{index + 1}</span>
      <div>
        <h3 className="text-lg font-semibold text-[#2A5652] mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  </div>
);

export const ServicesSection: React.FC = () => {
  return (
    <section>
      <SectionHeader title="Our Services" subtitle="Comprehensive tools to drive measurable growth" />
      <div className="py-16 sm:py-20 bg-gray-50 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <ServiceCard key={index} index={index} title={service.title} description={service.description} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};