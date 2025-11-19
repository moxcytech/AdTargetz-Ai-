import React from 'react';
import { SectionHeader } from './SectionHeader';
import { MetaIcon, GoogleIcon, LinkedInIcon, TwitterIcon, InstagramIcon, YouTubeIcon, WhatsAppIcon } from './icons';

// Define missing icons locally if they aren't in the main icons file yet, or reuse existing ones creatively.
const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const TvIcon = ({ className }: { className?: string }) => (
   <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
   </svg>
);

const RadioIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
);

const NewspaperIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
);


const platforms = [
  {
    icon: <GoogleIcon className="w-10 h-10" />,
    title: 'Google Ads',
    description: 'Capture high intent via Search, Display Network, and Performance Max campaigns.',
    color: 'bg-blue-50'
  },
  {
    icon: <MetaIcon className="w-10 h-10 text-blue-600" />,
    title: 'Facebook Ads',
    description: 'Precise demographic targeting and powerful retargeting on the world\'s largest social network.',
    color: 'bg-indigo-50'
  },
  {
    icon: <InstagramIcon className="w-10 h-10 text-pink-600" />,
    title: 'Instagram Ads',
    description: 'Engage younger audiences with visual Stories, Reels, and shoppable posts.',
    color: 'bg-pink-50'
  },
  {
    icon: <YouTubeIcon className="w-10 h-10 text-red-600" />,
    title: 'YouTube Ads',
    description: 'Video reach that rivals TV, targeting users based on interests and viewing habits.',
    color: 'bg-red-50'
  },
  {
    icon: <LinkedInIcon className="w-10 h-10 text-[#0077b5]" />,
    title: 'LinkedIn Ads',
    description: 'The #1 platform for B2B lead generation, targeting decision-makers by job title.',
    color: 'bg-blue-50'
  },
  {
    icon: <WhatsAppIcon className="w-10 h-10 text-green-500" />,
    title: 'WhatsApp Marketing',
    description: 'Direct-to-customer conversational marketing with open rates up to 98%.',
    color: 'bg-green-50'
  },
  {
    icon: <TwitterIcon className="w-10 h-10 text-sky-500" />,
    title: 'X (Twitter) Ads',
    description: 'Join real-time conversations and trending topics to boost brand relevance.',
    color: 'bg-sky-50'
  },
  {
    icon: <SpotifyIcon className="w-10 h-10 text-green-600" />,
    title: 'Spotify Ads',
    description: 'Reach listeners with audio ads during their favorite music and podcasts.',
    color: 'bg-green-50'
  },
  {
    icon: <TvIcon className="w-10 h-10 text-gray-700" />,
    title: 'Connected TV',
    description: 'Programmatic ads on smart TVs and streaming services like Hulu and Roku.',
    color: 'bg-gray-100'
  },
  {
    icon: <RadioIcon className="w-10 h-10 text-orange-600" />,
    title: 'Radio & Audio',
    description: 'Local radio spots and digital audio platforms to reach commuters.',
    color: 'bg-orange-50'
  },
  {
    icon: <svg className="w-10 h-10 text-purple-600" fill="currentColor" viewBox="0 0 24 24"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM5 15h14v3H5v-3zm0-4h14v3H5v-3zm0-4h14v3H5V7z"/></svg>,
    title: 'Theatre Ads',
    description: 'Captive audience advertising on cinema screens before blockbuster movies.',
    color: 'bg-purple-50'
  },
  {
    icon: <NewspaperIcon className="w-10 h-10 text-stone-600" />,
    title: 'Digital PR & News',
    description: 'Native advertising and sponsored content on top news websites and blogs.',
    color: 'bg-stone-50'
  },
];

const PlatformCard: React.FC<{ icon: React.ReactNode; title: string; description: string; color: string }> = ({ icon, title, description, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className="flex items-start gap-4">
      <div className={`flex-shrink-0 flex justify-center items-center w-16 h-16 rounded-2xl ${color}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

export const PlatformsSection: React.FC = () => {
  return (
    <section className="bg-white">
      <SectionHeader title="Platforms We Use" subtitle="Your brand, everywhere your customers are" />
      <div className="py-16 sm:py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((platform, index) => (
              <PlatformCard key={index} {...platform} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
              <p className="text-gray-500 text-sm">
                  Don't see a platform you need? <a href="mailto:info@adtargetz.ai" className="text-[#2A5652] font-semibold hover:underline">Contact us</a> for custom integrations.
              </p>
          </div>
        </div>
      </div>
    </section>
  );
};