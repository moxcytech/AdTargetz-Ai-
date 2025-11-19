import React, { useState, useEffect } from 'react';
import { MetaIcon, GoogleIcon, WhatsAppIcon, ZapierIcon, CheckCircleIcon, DollarSignIcon } from './icons';

const integrationsList = [
    {
        id: 'meta',
        name: 'Meta Ads (Facebook & Instagram)',
        icon: <MetaIcon className="w-10 h-10 text-blue-600" />,
        description: 'Connect your Meta Ads account to sync campaigns, ad sets, and performance data automatically.'
    },
    {
        id: 'google',
        name: 'Google Ads',
        icon: <GoogleIcon className="w-10 h-10" />,
        description: 'Link your Google Ads account to manage search, display, and YouTube campaigns.'
    },
    {
        id: 'whatsapp',
        name: 'WhatsApp Business',
        icon: <WhatsAppIcon className="w-10 h-10 text-green-500" />,
        description: 'Route new leads directly to your WhatsApp Business number for instant conversations.'
    },
    {
        id: 'zapier',
        name: 'Zapier',
        icon: <ZapierIcon className="w-10 h-10 text-orange-500" />,
        description: 'Connect AdTargetz to thousands of other apps and automate your workflows.'
    },
    {
        id: 'payments',
        name: 'Payment Gateways',
        icon: <DollarSignIcon className="w-10 h-10 text-teal-600" />,
        description: 'Connect Stripe, PayPal, or other gateways to manage payments securely.'
    }
];

const IntegrationCard: React.FC<{
    integration: typeof integrationsList[0];
    isConnected: boolean;
    onToggle: () => void;
}> = ({ integration, isConnected, onToggle }) => {
    const [showKeyInput, setShowKeyInput] = useState(false);

    const handleConnectClick = () => {
        if (isConnected) {
            onToggle();
        } else {
            setShowKeyInput(true);
        }
    };

    const handleSaveKey = () => {
        setShowKeyInput(false);
        onToggle();
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                {integration.icon}
            </div>
            <div className="flex-1 w-full">
                <h3 className="text-lg font-semibold text-gray-800">{integration.name}</h3>
                <p className="text-gray-600 mt-1 text-sm">{integration.description}</p>
                
                {showKeyInput && !isConnected && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                         <label className="block text-sm font-medium text-gray-700 mb-1">API Key / Access Token</label>
                         <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm mb-2" placeholder={`Paste ${integration.name} API Key`} />
                         <div className="flex gap-2">
                            <button onClick={handleSaveKey} className="px-3 py-1.5 bg-[#2A5652] text-white text-xs rounded font-medium hover:bg-teal-700">Save & Connect</button>
                            <button onClick={() => setShowKeyInput(false)} className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-xs rounded font-medium hover:bg-gray-50">Cancel</button>
                         </div>
                    </div>
                )}
            </div>
            <div className="w-full md:w-auto mt-4 md:mt-0">
                {isConnected ? (
                    <button
                        onClick={handleConnectClick}
                        className="w-full justify-center flex items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100"
                    >
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        Connected
                    </button>
                ) : (
                    !showKeyInput && (
                        <button
                            onClick={handleConnectClick}
                            className="w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2A5652] hover:bg-teal-700"
                        >
                            Connect
                        </button>
                    )
                )}
            </div>
        </div>
    );
};

export const IntegrationsPage: React.FC = () => {
    const [connectedIntegrations, setConnectedIntegrations] = useState<Record<string, boolean>>({});

    useEffect(() => {
        // Load connected status from localStorage
        const savedConnections = localStorage.getItem('integrations');
        if (savedConnections) {
            setConnectedIntegrations(JSON.parse(savedConnections));
        }
    }, []);

    const handleToggleConnection = (integrationId: string) => {
        const newConnections = {
            ...connectedIntegrations,
            [integrationId]: !connectedIntegrations[integrationId]
        };
        setConnectedIntegrations(newConnections);
        localStorage.setItem('integrations', JSON.stringify(newConnections));
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
                <p className="mt-1 text-gray-600">Paste your API keys to seamlessly connect platforms and tools.</p>
            </div>

            <div className="space-y-6">
                {integrationsList.map(integration => (
                    <IntegrationCard
                        key={integration.id}
                        integration={integration}
                        isConnected={!!connectedIntegrations[integration.id]}
                        onToggle={() => handleToggleConnection(integration.id)}
                    />
                ))}
            </div>
        </div>
    );
};