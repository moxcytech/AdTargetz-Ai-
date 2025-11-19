import React from 'react';
import { SectionHeader } from './SectionHeader';
import { CheckCircleIcon, SparklesIcon, LinkedInIcon } from './icons';

const FeatureItem = ({ text, highlighted = false }: { text: string; highlighted?: boolean }) => (
    <div className="flex items-start gap-2 mb-2">
        <CheckCircleIcon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${highlighted ? 'text-white' : 'text-[#128C7E]'}`} />
        <span className={`text-sm ${highlighted ? 'text-teal-50' : 'text-gray-600'}`}>{text}</span>
    </div>
);

const BudgetCard = ({ title, price, duration, recommended, leadsEstimate }: { title: string; price: string; duration: string; recommended?: boolean; leadsEstimate: string }) => (
    <div className={`relative flex flex-col p-6 rounded-xl border ${recommended ? 'border-[#128C7E] shadow-lg bg-white' : 'border-gray-200 bg-gray-50'} transition-transform hover:scale-105`}>
        {recommended && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#128C7E] text-white text-xs font-bold px-3 py-1 rounded-full">
                Most Popular
            </div>
        )}
        <h4 className="text-gray-500 font-medium text-sm uppercase tracking-wide text-center">{title}</h4>
        <div className="text-center my-4">
            <span className="text-3xl font-bold text-gray-900">{price}</span>
            <span className="text-sm text-gray-500 block mt-1">{duration} Campaign</span>
        </div>
        <ul className="text-sm text-gray-600 space-y-2 mb-6">
             <li className="flex justify-between border-b border-gray-200 pb-1"><span>Est. Leads:</span> <span className="font-bold text-[#075E54]">{leadsEstimate}</span></li>
             <li className="flex justify-between border-b border-gray-200 pb-1"><span>Estimated Reach:</span> <span className="font-semibold">High</span></li>
             <li className="flex justify-between border-b border-gray-200 pb-1"><span>Platforms:</span> <span className="font-semibold">All</span></li>
             <li className="flex justify-between"><span>AI Optimization:</span> <span className="font-semibold text-green-600">Included</span></li>
        </ul>
        <button className={`w-full py-2 rounded-lg font-semibold transition-colors ${recommended ? 'bg-[#128C7E] text-white hover:bg-[#075E54]' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
            Select Pack
        </button>
    </div>
);

export const PricingSection: React.FC = () => {
  return (
    <section>
      <SectionHeader title="Simple, Transparent Pricing" subtitle="Choose a plan that fits your business stage" />
      <div className="py-16 sm:py-20 bg-white px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-20">

          {/* 1. Platform Access Plans */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">1. Choose Your Platform Access</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                
                {/* Starter Plan */}
                <div className="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow flex flex-col">
                    <div className="mb-6">
                        <h4 className="text-2xl font-bold text-gray-800">Starter Plan</h4>
                        <p className="text-gray-500 mt-2">For Small Businesses, Clinics, Agents.</p>
                    </div>
                    <div className="mb-6">
                        <span className="text-4xl font-bold text-[#128C7E]">Free</span>
                        <span className="text-gray-500"> / month</span>
                    </div>
                    <div className="flex-1 space-y-4 mb-8">
                        <FeatureItem text="Access to AdTargetz AI Platform" />
                        <FeatureItem text="Use GrowEasy Ad Accounts (No Setup)" />
                        <FeatureItem text="AI Powered Ad Creatives" />
                        <FeatureItem text="Basic Lead Dashboard" />
                        <FeatureItem text="Monthly Ad Spend Limit: ₹50,000" />
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                         <p className="text-xs text-gray-500 font-bold uppercase">How it works</p>
                         <p className="text-sm text-gray-700 mt-1">You pay for <strong>Ad Budget Packs</strong> (see below). A 20% service fee is included in the pack price to cover AI costs.</p>
                    </div>
                    <button onClick={() => window.location.hash = '#/signup'} className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition-colors">Start for Free</button>
                </div>

                {/* Growth Plan */}
                <div className="border border-teal-200 bg-teal-50/30 rounded-2xl p-8 hover:shadow-xl transition-shadow flex flex-col relative overflow-hidden">
                     <div className="absolute top-0 right-0 bg-[#128C7E] text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                        Recommended for Brands
                    </div>
                    <div className="mb-6">
                        <h4 className="text-2xl font-bold text-[#128C7E]">Growth Plan</h4>
                        <p className="text-gray-500 mt-2">For D2C Brands, Startups, Agencies.</p>
                    </div>
                    <div className="mb-6">
                        <span className="text-4xl font-bold text-[#128C7E]">₹14,000</span>
                        <span className="text-gray-500"> / month</span>
                    </div>
                    <div className="flex-1 space-y-4 mb-8">
                        <FeatureItem text="Everything in Starter" />
                        <FeatureItem text="Connect YOUR Own Ad Accounts" />
                        <FeatureItem text="Unlimited Monthly Ad Spend" />
                        <FeatureItem text="Advanced Audience Targeting" />
                        <FeatureItem text="LinkedIn B2B Ads Support" />
                        <FeatureItem text="Dedicated Account Support Manager" />
                    </div>
                     <div className="bg-white p-4 rounded-lg border border-teal-100 mb-6">
                         <p className="text-xs text-gray-500 font-bold uppercase">How it works</p>
                         <p className="text-sm text-gray-700 mt-1">Monthly subscription fee. You pay actual ad costs directly to Google/Meta/LinkedIn. <br/><span className="text-[#075E54] font-semibold">Or buy Ad Packs for convenience.</span></p>
                    </div>
                    <button onClick={() => window.location.hash = '#/signup'} className="w-full py-3 bg-[#128C7E] text-white rounded-xl font-semibold hover:bg-[#075E54] transition-colors">Go Pro</button>
                </div>
            </div>
          </div>

          {/* 2. Ad Budget Packs */}
          <div className="bg-gray-50 rounded-3xl p-8 sm:p-12">
            <div className="text-center mb-10">
                <h3 className="text-2xl font-bold text-gray-800">2. Select Your Campaign Budget</h3>
                <p className="text-gray-600 mt-2">Purchase these packs to run ads instantly. 20% service fee is deducted for platform costs.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <BudgetCard title="Trial Run" price="₹2,100" duration="3 Days" leadsEstimate="~15 - 30 Leads" />
                <BudgetCard title="Weekly Push" price="₹5,000" duration="7 Days" leadsEstimate="~40 - 80 Leads" recommended={true} />
                <BudgetCard title="Monthly Scale" price="₹11,000" duration="20 Days" leadsEstimate="~100 - 180 Leads" />
            </div>
            <p className="text-center text-sm text-gray-500 mt-8 italic">*Custom budget options available for enterprise needs.</p>
          </div>

          {/* 3. Software Suite */}
           <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">3. Power Up with Software Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                
                {/* CRM Suite */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all group">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-indigo-100 p-3 rounded-lg">
                            <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-gray-800">CRM Suite</h4>
                            <p className="text-sm text-gray-500">Pipeline Management</p>
                        </div>
                    </div>
                    <div className="mb-6 pb-6 border-b border-gray-100">
                         <span className="text-3xl font-bold text-gray-900">₹20,000</span>
                         <span className="text-gray-500"> / year</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                        <FeatureItem text="Multi-User Access" />
                        <FeatureItem text="Lead Distribution Logic" />
                        <FeatureItem text="Auto Follow-up Workflows" />
                        <FeatureItem text="Detailed Analytics" />
                    </ul>
                    <button onClick={() => window.location.hash = '#/signup'} className="w-full py-2.5 border border-indigo-600 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-50 transition-colors">Add CRM</button>
                </div>

                 {/* LinkedIn Power Pack */}
                 <div className="bg-white border border-[#0077b5]/30 rounded-2xl p-8 hover:shadow-lg transition-all group">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-[#0077b5]/10 p-3 rounded-lg">
                            <LinkedInIcon className="w-8 h-8 text-[#0077b5]" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-gray-800">LinkedIn Pack</h4>
                            <p className="text-sm text-gray-500">B2B Automation</p>
                        </div>
                    </div>
                    <div className="mb-6 pb-6 border-b border-gray-100">
                         <span className="text-3xl font-bold text-gray-900">₹15,000</span>
                         <span className="text-gray-500"> / year</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                        <FeatureItem text="AI Content Creator" />
                        <FeatureItem text="Auto-Connect Sequences" />
                        <FeatureItem text="B2B Lead Scraper" />
                        <FeatureItem text="Profile Analytics" />
                    </ul>
                    <button onClick={() => window.location.hash = '#/signup'} className="w-full py-2.5 border border-[#0077b5] text-[#0077b5] font-semibold rounded-lg hover:bg-[#0077b5]/10 transition-colors">Add LinkedIn</button>
                </div>

                {/* WhatsApp Marketing */}
                <div className="bg-[#25D366]/5 border border-[#25D366]/20 rounded-2xl p-8 hover:shadow-lg transition-all group">
                     <div className="flex items-center gap-4 mb-6">
                        <div className="bg-[#25D366]/20 p-3 rounded-lg">
                            <svg className="w-8 h-8 text-[#128C7E]" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12.04 20.12c-1.48 0-2.91-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.83-1.26-4.38 0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.23.86 5.82 2.45s2.45 3.62 2.45 5.82c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.13c-.25-.12-1.47-.72-1.7-.82-.23-.09-.39-.12-.56.12-.17.25-.64.82-.79.98-.15.17-.29.19-.54.06-.25-.12-1.06-.39-2.02-1.25-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.55-.42h-.5c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.02 2.56.12.17 1.76 2.68 4.27 3.77 2.51 1.08 2.51.72 2.96.69.45-.03 1.47-.6 1.68-1.18.2-.58.2-1.08.15-1.18-.07-.1-.22-.16-.47-.28z"/></svg>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-gray-800">WhatsApp</h4>
                            <p className="text-sm text-gray-500">Bulk Messaging</p>
                        </div>
                    </div>
                     <div className="mb-6 pb-6 border-b border-green-100">
                         <span className="text-3xl font-bold text-gray-900">₹25,000</span>
                         <span className="text-gray-500"> Setup</span>
                         <p className="text-xs text-gray-500 mt-1">+ usage charges</p>
                    </div>
                    
                     <div className="space-y-4 mb-6">
                        <div className="flex items-start gap-2 bg-white p-3 rounded border border-green-100 shadow-sm">
                             <SparklesIcon className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                             <p className="text-xs text-gray-700"><strong>Pro Offer:</strong> Setup fee 100% WAIVED with All-in-One Solution.</p>
                        </div>
                         <ul className="space-y-2">
                             <FeatureItem text="Official Business API" />
                             <FeatureItem text="Green Tick Assistance" />
                             <FeatureItem text="Chatbot Flows" />
                         </ul>
                    </div>
                    <button onClick={() => window.location.hash = '#/signup'} className="w-full py-2.5 border border-green-600 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors">Get WhatsApp</button>
                </div>
            </div>
           </div>

        </div>
      </div>
    </section>
  );
};