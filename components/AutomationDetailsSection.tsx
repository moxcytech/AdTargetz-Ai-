import React from 'react';
import { SectionHeader } from './SectionHeader';
import { OptimizeIcon, NodesIcon, RocketIcon, CheckCircleIcon, UsersIcon, LightbulbIcon } from './icons';

const useCases = [
    {
        title: "Real Estate & Property",
        goal: "Site Visits & Bookings",
        aiAction: "Lead Qualification Bot",
        description: "When a user clicks an ad for a 'Luxury Apartment', our AI Chatbot on WhatsApp immediately sends the brochure and floor plans. It then asks qualifying questions: 'Budget?', 'Looking to buy in 3 months?'. Only high-intent leads are scheduled for site visits, saving agents hours of calling junk leads.",
        result: "40% More Site Visits, Zero Cold Calling."
    },
    {
        title: "Medical Clinics & Doctors",
        goal: "Patient Appointments",
        aiAction: "Local Trust & Booking",
        description: "For a Dental Clinic, AdTargetz runs 'Near Me' Google Map ads to capture emergency searches. The AI handles inquiries 24/7: 'Is Dr. Smith available on Saturday?'. It checks the calendar and books the slot directly. It also sends automated reminders to reduce no-shows.",
        result: "24/7 Receptionist, 15% Lower No-show Rate."
    },
    {
        title: "Local Retail (Cafe/Salon)",
        goal: "Walk-in Traffic",
        aiAction: "Geo-Fenced Promos",
        description: "The AI identifies when foot traffic is low (e.g., Tuesday afternoon) and automatically boosts Instagram Story ads within a 2km radius offering a 'Flash Sale: 20% Off for next 2 hours'. It targets existing customers via WhatsApp to drive immediate visits.",
        result: "On-demand Footfall, Inventory Clearance."
    },
    {
        title: "B2B & Medical Reps",
        goal: "Qualified Meetings",
        aiAction: "Cross-Platform Retargeting",
        description: "Target doctors or procurement officers on LinkedIn with educational content. If they engage but don't book a demo, the AI retargets them on YouTube with a case study video and sends a personalized email follow-up, nurturing them until they are ready to talk business.",
        result: "High-Quality Pipeline, Shorter Sales Cycle."
    }
];

const features = [
    {
        icon: <OptimizeIcon className="w-6 h-6 text-white" />,
        title: "Predictive Budget Allocation",
        desc: "Our AI analyzes 1,000+ data points/sec. It predicts which platform (Meta vs Google) will give the cheapest lead in the next hour and shifts your budget there instantly to maximize ROI."
    },
    {
        icon: <NodesIcon className="w-6 h-6 text-white" />,
        title: "Omnichannel Orchestration",
        desc: "Don't just run ads; run a strategy. The AI coordinates messages across SMS, WhatsApp, Email, and Social Media. If a user ignores an Email, it tries WhatsApp. If they click an ad, it stops the retargeting to save money."
    },
    {
        icon: <RocketIcon className="w-6 h-6 text-white" />,
        title: "Hyper-Local Creative Engine",
        desc: "For multi-location businesses, the AI generates unique ad creatives for each city or branch, mentioning local landmarks and using local language nuances to increase relevance and click-through rates."
    }
];

export const AutomationDetailsSection: React.FC = () => {
  return (
    <section className="bg-gray-50">
      <SectionHeader title="Intelligent Automation" subtitle="Tailored AI strategies for every industry" />
      
      <div className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        {/* AI Engine Logic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, idx) => (
                <div key={idx} className="bg-[#2A5652] rounded-xl p-6 text-white shadow-lg transform hover:-translate-y-1 transition-transform duration-300 border border-teal-800">
                    <div className="bg-white/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                        {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-teal-100 text-sm leading-relaxed opacity-90">{feature.desc}</p>
                </div>
            ))}
        </div>

        {/* Business Use Cases */}
        <div>
            <div className="text-center mb-12">
                <span className="text-teal-600 font-bold tracking-wide text-sm uppercase bg-teal-100 px-3 py-1 rounded-full">Industry Solutions</span>
                <h3 className="text-3xl font-bold text-gray-900 mt-3">Automation in Action</h3>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">See how AdTargetz Ai adapts its strategy to deliver results for specific business models.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {useCases.map((useCase, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 group">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                            <div className="bg-teal-50 p-3 rounded-xl group-hover:bg-teal-100 transition-colors">
                                <UsersIcon className="w-8 h-8 text-[#2A5652]" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-800">{useCase.title}</h4>
                                <p className="text-sm text-teal-600 font-semibold">{useCase.goal}</p>
                            </div>
                        </div>
                        
                        <div className="space-y-4 relative">
                            <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gray-100"></div>
                            
                            <div className="pl-6 relative">
                                <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-teal-500 border-2 border-white"></div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">AI Strategy</span>
                                <p className="text-gray-800 font-medium">{useCase.aiAction}</p>
                            </div>
                            
                             <div className="pl-6 relative">
                                <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-300 border-2 border-white"></div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Workflow</span>
                                <p className="text-sm text-gray-600 leading-relaxed">{useCase.description}</p>
                            </div>
                            
                             <div className="pl-6 pt-2">
                                <div className="bg-green-50 border border-green-100 p-3 rounded-lg flex items-start gap-2">
                                    <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <span className="text-xs font-bold text-green-800 uppercase">Outcome</span>
                                        <p className="text-sm text-green-900 font-medium">{useCase.result}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};