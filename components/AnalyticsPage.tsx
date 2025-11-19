import React, { useState, useEffect, useMemo } from 'react';
import { Campaign } from '../types';
import { DollarSignIcon, UsersIcon, CheckCircleIcon, EyeIcon } from './icons';

const KPICard: React.FC<{ title: string; value: string; icon: React.ReactNode; }> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-start gap-4">
        <div className="bg-teal-100 text-[#128C7E] rounded-full p-3 mt-1">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const Chart: React.FC<{ title: string; data: { label: string; value: number }[]; color: string }> = ({ title, data, color }) => {
    const maxValue = Math.max(...data.map(d => d.value), 0);
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
            <div className="space-y-4">
                {data.map(item => (
                    <div key={item.label} className="flex items-center gap-4">
                        <div className="w-1/3 text-sm text-gray-600 truncate">{item.label}</div>
                        <div className="w-2/3 bg-gray-200 rounded-full h-4">
                            <div
                                className={`h-4 rounded-full ${color}`}
                                style={{ width: `${maxValue > 0 ? (item.value / maxValue) * 100 : 0}%` }}
                            ></div>
                        </div>
                        <div className="text-sm font-medium text-gray-700">{item.value.toLocaleString()}</div>
                    </div>
                ))}
                {data.length === 0 && <p className="text-sm text-gray-500 text-center py-4">No data available.</p>}
            </div>
        </div>
    );
};

export const AnalyticsPage: React.FC = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        try {
            const storedCampaigns = localStorage.getItem('campaigns_v4');
            setCampaigns(storedCampaigns ? JSON.parse(storedCampaigns) : []);
        } catch (error) {
            console.error("Failed to load campaigns from localStorage:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const metrics = useMemo(() => {
        const totalSpend = campaigns.reduce((sum, c) => sum + Number(c.budget), 0);
        const totalLeads = campaigns.reduce((sum, c) => sum + c.leads, 0);
        const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);
        const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
        const costPerLead = totalLeads > 0 ? totalSpend / totalLeads : 0;
        const clickThroughRate = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
        
        return {
            totalSpend,
            totalLeads,
            totalImpressions,
            totalClicks,
            costPerLead,
            clickThroughRate,
        };
    }, [campaigns]);

    if (isLoading) return <div>Loading...</div>;

    const leadsByCampaignData = campaigns.map(c => ({ label: c.name, value: c.leads }));
    const budgetByCampaignData = campaigns.map(c => ({ label: c.name, value: Number(c.budget) }));

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="mt-1 text-gray-600">Dive deep into your campaign performance.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <KPICard title="Total Spend" value={metrics.totalSpend.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} icon={<DollarSignIcon className="w-6 h-6" />} />
                <KPICard title="Total Leads" value={metrics.totalLeads.toLocaleString()} icon={<UsersIcon className="w-6 h-6" />} />
                <KPICard title="Cost Per Lead" value={metrics.costPerLead.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} icon={<CheckCircleIcon className="w-6 h-6" />} />
                <KPICard title="Click-Through Rate" value={`${metrics.clickThroughRate.toFixed(2)}%`} icon={<EyeIcon className="w-6 h-6" />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <Chart title="Leads by Campaign" data={leadsByCampaignData} color="bg-[#128C7E]" />
                <Chart title="Budget Allocation" data={budgetByCampaignData} color="bg-blue-500" />
            </div>
            
             <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b">
                    <h2 className="text-2xl font-semibold text-gray-800">Campaign Performance</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                          <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spend</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impressions</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leads</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPL</th>
                          </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                          {campaigns.map(c => {
                            const cpl = c.leads > 0 ? (Number(c.budget) / c.leads) : 0;
                            return (
                              <tr key={c.id}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{c.name}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${Number(c.budget).toLocaleString()}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{c.impressions.toLocaleString()}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{c.clicks.toLocaleString()}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{c.leads.toLocaleString()}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${cpl.toFixed(2)}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                  </table>
              </div>
            </div>
        </div>
    );
};