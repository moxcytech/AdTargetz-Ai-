import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { LinkedInIcon, SparklesIcon, SendIcon, UsersIcon, CheckCircleIcon } from './icons';

// Using standard icons where specific ones aren't available, or reusing existing ones.
// Note: BarChartIcon is not in standard icons.tsx, simulating with SVG here for self-containment or use an existing one.
const ChartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const StatCard: React.FC<{ title: string; value: string; change: string; icon: React.ReactNode }> = ({ title, value, change, icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      <p className="text-xs text-green-600 font-semibold mt-1">{change}</p>
    </div>
    <div className="p-3 bg-blue-50 rounded-lg text-[#0077b5]">
      {icon}
    </div>
  </div>
);

export const LinkedInPage: React.FC = () => {
  const [postTopic, setPostTopic] = useState('');
  const [generatedPost, setGeneratedPost] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [targetJobTitle, setTargetJobTitle] = useState('');
  const [targetIndustry, setTargetIndustry] = useState('');
  const [outreachStatus, setOutreachStatus] = useState<'idle' | 'running'>('idle');

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const handleGeneratePost = async () => {
    if (!postTopic) return;
    setIsGenerating(true);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Write a professional, engaging LinkedIn post about "${postTopic}". 
        Include 3 relevant hashtags. 
        Tone: Thought Leadership, Professional but accessible. 
        Structure: Hook, Value Proposition, Call to Action.`,
      });
      setGeneratedPost(response.text.trim());
    } catch (error) {
      console.error("Error generating post", error);
      setGeneratedPost("Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStartOutreach = () => {
    setOutreachStatus('running');
    // Simulation of starting a process
    setTimeout(() => {
        alert(`Outreach campaign started for ${targetJobTitle} in ${targetIndustry}. AI is now visiting profiles.`);
        setOutreachStatus('idle');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <LinkedInIcon className="w-8 h-8 text-[#0077b5]" />
            LinkedIn Marketing Hub
          </h1>
          <p className="mt-2 text-gray-600">Automate your B2B growth, content, and connections.</p>
        </div>
        <button className="px-4 py-2 bg-[#0077b5] text-white rounded-lg font-semibold hover:bg-[#006097] transition-colors text-sm flex items-center gap-2">
            Connect Account
        </button>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
            title="Profile Views" 
            value="1,240" 
            change="+18% this week" 
            icon={<UsersIcon className="w-6 h-6" />} 
        />
        <StatCard 
            title="Post Impressions" 
            value="45.2K" 
            change="+5% vs last month" 
            icon={<ChartIcon className="w-6 h-6" />} 
        />
        <StatCard 
            title="Leads Generated" 
            value="38" 
            change="+12 new today" 
            icon={<CheckCircleIcon className="w-6 h-6" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Content Creator */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <SparklesIcon className="w-5 h-5 text-teal-600" />
            <h2 className="text-lg font-bold text-gray-800">AI Content Creator</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Post Topic / Idea</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={postTopic}
                  onChange={(e) => setPostTopic(e.target.value)}
                  placeholder="e.g. The future of AI in Real Estate..."
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-[#0077b5] focus:border-[#0077b5] text-sm"
                />
                <button 
                  onClick={handleGeneratePost}
                  disabled={isGenerating || !postTopic}
                  className="bg-[#2A5652] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-700 disabled:opacity-50 flex items-center gap-2"
                >
                   {isGenerating ? 'Thinking...' : 'Draft'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Generated Draft</label>
              <textarea 
                value={generatedPost}
                onChange={(e) => setGeneratedPost(e.target.value)}
                rows={8}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#0077b5] focus:border-[#0077b5] text-sm bg-gray-50"
                placeholder="AI draft will appear here..."
              />
            </div>

            <div className="flex justify-end gap-3">
               <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">Schedule</button>
               <button className="bg-[#0077b5] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#006097] flex items-center gap-2">
                 <SendIcon className="w-4 h-4" /> Post Now
               </button>
            </div>
          </div>
        </div>

        {/* Outreach Automation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
           <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <UsersIcon className="w-5 h-5 text-teal-600" />
            <h2 className="text-lg font-bold text-gray-800">B2B Outreach Automation</h2>
          </div>

          <div className="space-y-6">
             <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-sm text-blue-800 font-medium mb-2">Target Audience Strategy</p>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Job Title</label>
                      <input 
                        type="text" 
                        value={targetJobTitle}
                        onChange={(e) => setTargetJobTitle(e.target.value)}
                        placeholder="e.g. CEO, Founder"
                        className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm"
                      />
                   </div>
                   <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Industry</label>
                      <input 
                        type="text" 
                         value={targetIndustry}
                        onChange={(e) => setTargetIndustry(e.target.value)}
                        placeholder="e.g. SaaS, Finance"
                        className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm"
                      />
                   </div>
                </div>
             </div>

             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Connection Message Sequence</label>
                <div className="border border-gray-200 rounded-md divide-y divide-gray-200">
                    <div className="p-3 bg-gray-50 text-xs text-gray-500 flex justify-between">
                        <span>Step 1: Connection Request</span>
                        <span className="font-medium">Day 0</span>
                    </div>
                    <div className="p-3 text-sm text-gray-700 italic">
                        "Hi {'{{FirstName}}'}, noticed we both work in {targetIndustry || '[Industry]'}. Would love to connect..."
                    </div>
                    <div className="p-3 bg-gray-50 text-xs text-gray-500 flex justify-between">
                        <span>Step 2: Follow-up (Value Add)</span>
                        <span className="font-medium">Day 3</span>
                    </div>
                </div>
             </div>

             <button 
                onClick={handleStartOutreach}
                disabled={outreachStatus === 'running' || !targetJobTitle}
                className={`w-full py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors ${
                    outreachStatus === 'running' 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-[#2A5652] text-white hover:bg-teal-700'
                }`}
             >
                 {outreachStatus === 'running' ? (
                     <>Running Campaign...</>
                 ) : (
                     <>Launch Outreach Campaign</>
                 )}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};