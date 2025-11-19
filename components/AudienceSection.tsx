import React from 'react';
import { SectionHeader } from './SectionHeader';
import { LogoIcon } from './icons'; // Assuming LogoIcon can be imported

const audienceSteps = [
  { label: '1. Log in to AdTargetz', screen: 'login' },
  { label: '2. Create New Campaign', screen: 'dashboard' },
  { label: '3. Enter Your Business Info', screen: 'businessInfo' },
  { label: '4. Choose Your Audience Demographics', screen: 'audience' },
  { label: '5. Launch the Campaign', screen: 'launch' },
  { label: '6. Receive Real-Time Leads via Email & WhatsApp', screen: 'leads' },
];

const ScreenLogin: React.FC = () => (
  <div className="p-3 text-xs text-gray-700">
    <div className="flex items-center gap-1 mb-6">
      <div className="bg-[#2A5652] p-1 rounded-sm">
        <LogoIcon className="w-4 h-4 text-white" />
      </div>
      <span className="font-bold text-gray-800">AdTargetz Ai</span>
    </div>
    <h2 className="font-bold text-lg mb-1">Welcome back</h2>
    <p className="text-gray-500 mb-4">Login to continue</p>
    <div className="space-y-3">
        <div>
            <label className="font-semibold">Email</label>
            <div className="h-6 bg-gray-200 rounded-sm mt-1"></div>
        </div>
        <div>
            <label className="font-semibold">Password</label>
            <div className="h-6 bg-gray-200 rounded-sm mt-1"></div>
        </div>
    </div>
    <div className="mt-6 h-8 bg-[#2A5652] rounded-md flex items-center justify-center text-white font-semibold">
      Sign In
    </div>
  </div>
);

const ScreenDashboard: React.FC = () => (
    <div className="p-3 text-xs text-gray-700">
        <h2 className="font-bold text-lg mb-2">Dashboard</h2>
        <div className="h-8 bg-[#2A5652] rounded-md flex items-center justify-center text-white font-semibold mb-4">
        + Create Campaign
        </div>
        <h3 className="font-semibold mb-2">Your Campaigns</h3>
        <div className="space-y-2">
            <div className="p-2 bg-gray-100 rounded">
                <p className="font-bold">Summer Sale</p>
                <p className="text-gray-500">Objective: Sales</p>
            </div>
            <div className="p-2 bg-gray-100 rounded">
                <p className="font-bold">New Product Launch</p>
                <p className="text-gray-500">Objective: Awareness</p>
            </div>
        </div>
    </div>
);

const ScreenBusinessInfo: React.FC = () => (
  <div className="p-3 text-xs text-gray-700">
    <h2 className="font-bold text-lg mb-4">Create Campaign</h2>
    <div className="space-y-3">
      <div>
        <label className="font-semibold">Campaign Name</label>
        <div className="h-6 bg-gray-200 rounded-sm mt-1 flex items-center px-2 text-gray-500">Summer Sale</div>
      </div>
      <div>
        <label className="font-semibold">Business Details</label>
        <div className="h-10 bg-gray-200 rounded-sm mt-1"></div>
      </div>
       <div>
        <label className="font-semibold">Whatsapp Number</label>
        <div className="h-6 bg-gray-200 rounded-sm mt-1"></div>
      </div>
    </div>
    <div className="mt-4 h-8 bg-[#2A5652] rounded-md flex items-center justify-center text-white font-semibold">
      Next
    </div>
  </div>
);

const ScreenAudience: React.FC = () => (
    <div className="p-3 text-xs text-gray-700">
        <h2 className="font-bold text-lg mb-4">Target Audience</h2>
        <div className="space-y-3">
            <div>
                <label className="font-semibold">Location</label>
                <div className="h-6 bg-gray-200 rounded-sm mt-1 flex items-center px-2 text-gray-500">New York, USA</div>
            </div>
            <div>
                <label className="font-semibold">Age and Gender</label>
                 <div className="h-6 bg-gray-200 rounded-sm mt-1 flex items-center px-2 text-gray-500">18 - 45, All</div>
            </div>
            <div>
                <label className="font-semibold">Interests</label>
                <div className="h-10 bg-gray-200 rounded-sm mt-1"></div>
            </div>
        </div>
        <div className="mt-4 h-8 bg-[#2A5652] rounded-md flex items-center justify-center text-white font-semibold">
            Next
        </div>
    </div>
);

const ScreenLaunch: React.FC = () => (
    <div className="p-3 text-xs text-gray-700">
        <h2 className="font-bold text-lg mb-2">Review & Launch</h2>
        <p className="text-gray-500 mb-3">Your ad is ready to go!</p>
        <div className="bg-gray-100 rounded p-2">
            <div className="h-20 bg-teal-200 rounded-sm mb-2"></div>
            <p className="font-bold">50% Off Summer Sale!</p>
            <p className="text-gray-600">Don't miss out on our hottest deals.</p>
        </div>
        <div className="mt-3 h-10 bg-green-500 rounded-md flex items-center justify-center text-white font-bold text-base">
            Launch Campaign
        </div>
    </div>
);

const ScreenLeads: React.FC = () => (
    <div className="bg-[#E7FFDB] h-full">
        <div className="bg-[#075E54] p-2 flex items-center">
            <p className="text-white font-semibold">AdTargetz Leads</p>
        </div>
        <div className="p-2">
            <div className="bg-white p-2 rounded-lg shadow-sm text-xs">
                <p className="font-bold text-blue-600">AdTargetz Ai Bot</p>
                <p className="text-gray-800">
                    New Lead from 'Summer Sale'! <br/>
                    <b>Name:</b> Kumar Digvijay <br/>
                    <b>Email:</b> kumar.d@example.com
                </p>
                <p className="text-right text-gray-400 text-[10px] mt-1">9:41 PM</p>
            </div>
        </div>
    </div>
);

const PhoneMockup: React.FC<{ screen: string }> = ({ screen }) => {
  const renderScreen = () => {
    switch (screen) {
      case 'login': return <ScreenLogin />;
      case 'dashboard': return <ScreenDashboard />;
      case 'businessInfo': return <ScreenBusinessInfo />;
      case 'audience': return <ScreenAudience />;
      case 'launch': return <ScreenLaunch />;
      case 'leads': return <ScreenLeads />;
      default: return null;
    }
  };

  return (
    <div className="w-48 h-96 bg-gray-800 rounded-3xl p-2 mx-auto border-4 border-gray-900 shadow-xl">
      <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
        {renderScreen()}
      </div>
    </div>
  );
};


export const AudienceSection: React.FC = () => {
  return (
    <section>
      <SectionHeader title="How We Help You Reach the Right Audience" subtitle="We identify, attract, and convert the right customers for your business growth" />
      <div className="py-16 sm:py-20 bg-gray-50 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {audienceSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-4 transform hover:scale-105 transition-transform duration-300">
                  <PhoneMockup screen={step.screen} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{step.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};