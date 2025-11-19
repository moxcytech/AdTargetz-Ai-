import React, { useState, useEffect, useMemo } from 'react';
import { PlusIcon, DollarSignIcon, CheckCircleIcon, UsersIcon, EyeIcon, TrashIcon, LogoIcon, LightbulbIcon, SparklesIcon, BellIcon, CalendarIcon } from './icons';
import { CampaignDetailsModal } from './CampaignDetailsModal';
import { Campaign, Lead, Reminder } from '../types';

const StatusIndicator: React.FC<{ status: Campaign['status'] }> = ({ status }) => {
    const color = {
        Active: 'bg-green-500',
        Paused: 'bg-yellow-500',
        Ended: 'bg-gray-500',
    }[status];
    return (
        <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${color}`}></span>
            <span className="text-sm font-medium">{status}</span>
        </div>
    );
}

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; trend?: string }> = ({ title, value, icon, trend }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4 hover:shadow-md transition-shadow">
        <div className="bg-teal-50 text-[#128C7E] rounded-lg p-3">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <div className="flex items-end gap-2">
                <p className="text-2xl font-bold text-gray-800">{value}</p>
                {trend && <p className="text-xs text-green-600 font-semibold mb-1">{trend}</p>}
            </div>
        </div>
    </div>
)

const AiInsightCard: React.FC<{ text: string }> = ({ text }) => (
    <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 flex gap-3 items-start">
        <div className="bg-indigo-100 p-2 rounded-full flex-shrink-0 mt-0.5">
            <SparklesIcon className="w-4 h-4 text-indigo-600" />
        </div>
        <div>
            <p className="text-xs font-bold text-indigo-800 mb-1 uppercase tracking-wide">AI Insight</p>
            <p className="text-sm text-indigo-900">{text}</p>
        </div>
    </div>
);

export const CampaignsHome: React.FC = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [upcomingReminders, setUpcomingReminders] = useState<{leadName: string, reminder: Reminder}[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    try {
        // USING V4 STORAGE KEYS FOR CLEAN START - NO DUMMY DATA
        const storedCampaigns = localStorage.getItem('campaigns_v4');
        
        const initialCampaigns = storedCampaigns ? JSON.parse(storedCampaigns) : [];
        setCampaigns(initialCampaigns);

        // Load Reminders
        const storedLeads = localStorage.getItem('leads_v4');
        if (storedLeads) {
            const leads: Lead[] = JSON.parse(storedLeads);
            const allReminders: {leadName: string, reminder: Reminder}[] = [];
            leads.forEach(lead => {
                if (lead.reminders) {
                    lead.reminders.forEach(r => {
                        if (!r.isCompleted) {
                            allReminders.push({ leadName: lead.name, reminder: r });
                        }
                    });
                }
            });
            // Sort by date ascending
            allReminders.sort((a, b) => new Date(a.reminder.date).getTime() - new Date(b.reminder.date).getTime());
            setUpcomingReminders(allReminders.slice(0, 5)); // Take top 5
        }

    } catch (err) {
        setError('Failed to load campaigns from local storage.');
        setCampaigns([]); 
    } finally {
        setIsLoading(false);
    }
  }, []);
  
  const analytics = useMemo(() => {
      const totalSpend = campaigns.reduce((sum, c) => sum + Number(c.budget), 0);
      const totalLeads = campaigns.reduce((sum, c) => sum + c.leads, 0);
      const costPerLead = totalLeads > 0 ? (totalSpend / totalLeads) : 0;
      return {
          totalCampaigns: campaigns.length,
          totalSpend: totalSpend.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
          totalLeads: totalLeads.toLocaleString(),
          costPerLead: costPerLead.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      }
  }, [campaigns]);

  const handleDeleteCampaign = (campaignId: string) => {
    if (window.confirm('Are you sure you want to delete this campaign? This action cannot be undone.')) {
      try {
        const updatedCampaigns = campaigns.filter(c => c.id !== campaignId);
        localStorage.setItem('campaigns_v4', JSON.stringify(updatedCampaigns));
        setCampaigns(updatedCampaigns);
      } catch (err) {
        alert('An error occurred while deleting the campaign from local storage.');
      }
    }
  };

  return (
    <>
      <div className="md:flex md:items-end md:justify-between mb-8">
          <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-gray-600">Overview of your AI-driven growth.</p>
          </div>
          <button
              onClick={() => window.location.hash = '#/dashboard/create'}
              className="mt-4 md:mt-0 w-full md:w-auto flex justify-center items-center gap-2 py-2.5 px-5 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-[#128C7E] hover:bg-[#075E54] focus:outline-none transition-all transform hover:scale-105"
          >
              <PlusIcon className="w-5 h-5" />
              Create New Campaign
          </button>
      </div>

      {/* Main Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Active Campaigns" value={analytics.totalCampaigns.toString()} icon={<LogoIcon className="w-6 h-6" />} trend={campaigns.length > 0 ? "Active" : "No Data"} />
          <StatCard title="Total Spend" value={analytics.totalSpend} icon={<DollarSignIcon className="w-6 h-6" />} />
          <StatCard title="Total Leads" value={analytics.totalLeads} icon={<UsersIcon className="w-6 h-6" />} trend={campaigns.length > 0 ? "Tracking" : ""} />
          <StatCard title="Avg. Cost Per Lead" value={analytics.costPerLead} icon={<CheckCircleIcon className="w-6 h-6" />} trend={campaigns.length > 0 ? "Optimizing" : ""} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Campaigns Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800">Recent Campaigns</h2>
                <button onClick={() => window.location.hash = '#/dashboard/analytics'} className="text-sm text-[#128C7E] font-medium hover:underline">View All Analytics</button>
            </div>
            
            {isLoading ? (
                <div className="text-center py-16 px-6">
                    <h3 className="text-lg font-medium text-gray-800">Loading campaigns...</h3>
                </div>
            ) : campaigns.length > 0 ? (
                <div className="overflow-x-auto flex-1">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Campaign</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Budget</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Results</th>
                                <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {campaigns.map(campaign => (
                                <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-bold text-gray-900">{campaign.name}</div>
                                        <div className="text-xs text-gray-500">{campaign.objective}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusIndicator status={campaign.status} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                                        ${Number(campaign.budget).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-gray-800">{campaign.leads} Leads</span>
                                            <span className="text-xs text-gray-400">({campaign.clicks} Clicks)</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-3">
                                            <button onClick={() => setSelectedCampaign(campaign)} className="text-gray-400 hover:text-[#128C7E] transition-colors" title="View Details"><EyeIcon className="w-5 h-5"/></button>
                                            <button onClick={() => handleDeleteCampaign(campaign.id)} className="text-gray-400 hover:text-red-600 transition-colors" title="Delete"><TrashIcon className="w-5 h-5"/></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-16 px-6">
                    <div className="mx-auto h-12 w-12 text-gray-300 mb-3">
                        <LightbulbIcon className="w-full h-full" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">No campaigns yet</h3>
                    <p className="text-gray-500 mt-1 mb-4">Your AI marketing journey starts here.</p>
                    <button onClick={() => window.location.hash = '#/dashboard/create'} className="text-[#128C7E] font-medium hover:underline">Create your first campaign</button>
                </div>
            )}
        </div>

        {/* Right Column: AI Insights & Reminders */}
        <div className="flex flex-col gap-8">
            {/* AI Insights Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <LightbulbIcon className="w-5 h-5 text-yellow-500" />
                    Live Recommendations
                </h2>
                {campaigns.length > 0 ? (
                    <div className="space-y-4 flex-1">
                         <AiInsightCard text="AdTargetz AI is monitoring your active campaigns. Data will appear here once enough traffic is generated." />
                        <div className="bg-green-50 border border-green-100 rounded-lg p-4 mt-4">
                            <p className="text-xs font-bold text-green-800 mb-1 uppercase tracking-wide">Optimization Status</p>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <span className="text-sm text-green-900 font-medium">Engine Active</span>
                            </div>
                            <p className="text-xs text-green-700">Waiting for initial campaign data...</p>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-400 py-6">
                        <p className="text-sm">Start a campaign to get AI insights.</p>
                    </div>
                )}
            </div>

            {/* Upcoming Reminders Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <BellIcon className="w-5 h-5 text-[#128C7E]" />
                        Upcoming Actions
                    </h2>
                    <button onClick={() => window.location.hash = '#/dashboard/leads'} className="text-xs text-[#128C7E] hover:underline font-medium">View Leads</button>
                </div>
                
                <div className="space-y-3">
                    {upcomingReminders.length > 0 ? (
                        upcomingReminders.map((item, idx) => (
                             <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="bg-white p-1.5 rounded border border-gray-200 text-[#128C7E]">
                                    <CalendarIcon className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">{item.reminder.text}</p>
                                    <p className="text-xs text-gray-500">
                                        <span className="font-medium text-gray-600">{item.leadName}</span> • {new Date(item.reminder.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-400">
                            <p className="text-sm">No pending reminders.</p>
                            <p className="text-xs mt-1">Great job staying on top of things!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>

      {selectedCampaign && (
        <CampaignDetailsModal
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
        />
      )}
    </>
  );
};