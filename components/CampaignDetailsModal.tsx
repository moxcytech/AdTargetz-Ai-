import React from 'react';
import { Campaign } from '../types';

interface CampaignDetailsModalProps {
  campaign: Campaign;
  onClose: () => void;
}

const DetailItem: React.FC<{ label: string; value: string | React.ReactNode; fullWidth?: boolean }> = ({ label, value, fullWidth = false }) => (
    <div className={fullWidth ? 'col-span-2' : ''}>
        <h4 className="text-sm font-medium text-gray-500">{label}</h4>
        {typeof value === 'string' ? (
            <p className="mt-1 text-gray-800 whitespace-pre-wrap">{value}</p>
        ) : (
            <div className="mt-1">{value}</div>
        )}
    </div>
)

const StatusIndicator: React.FC<{ status: Campaign['status'] }> = ({ status }) => {
    const colors = {
        Active: 'bg-green-100 text-green-800',
        Paused: 'bg-yellow-100 text-yellow-800',
        Ended: 'bg-gray-100 text-gray-800',
    };
    return (
        <span className={`px-2.5 py-1 text-sm font-medium rounded-full ${colors[status]}`}>{status}</span>
    );
}

export const CampaignDetailsModal: React.FC<CampaignDetailsModalProps> = ({ campaign, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-start">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">{campaign.name}</h2>
                <p className="text-gray-500">{campaign.objective}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
        </div>
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailItem label="Status" value={<StatusIndicator status={campaign.status} />} />
                <DetailItem label="Budget" value={`$${Number(campaign.budget).toLocaleString()}`} />
                <DetailItem label="Leads Generated" value={campaign.leads.toLocaleString()} />
                <DetailItem label="Cost Per Lead" value={campaign.leads > 0 ? `$${(Number(campaign.budget) / campaign.leads).toFixed(2)}` : 'N/A'} />
                <DetailItem label="Business Name" value={campaign.businessName || 'N/A'} />
                <DetailItem label="Business Location" value={campaign.businessLocation || 'N/A'} />

                <DetailItem label="Target Audience" value={campaign.audience} fullWidth />
                <DetailItem label="Ad Copy" value={campaign.adCopy} fullWidth />
                <DetailItem label="Ad Image Idea" value={campaign.adImageIdea} fullWidth />
                <DetailItem label="Image Style" value={campaign.imageStyle || 'N/A'} />
                <DetailItem label="Aspect Ratio" value={campaign.aspectRatio || 'N/A'} />

                {campaign.generatedImageUrl && (
                  <DetailItem 
                    label="Generated Ad Banner" 
                    value={<img src={campaign.generatedImageUrl} alt="Generated ad banner" className="rounded-md border max-w-full" />} 
                    fullWidth 
                  />
                )}
            </div>
        </div>
        <div className="p-6 bg-gray-50 border-t flex justify-end">
            <button 
                type="button" 
                onClick={onClose} 
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none"
            >
              Close
            </button>
        </div>
      </div>
    </div>
  );
};