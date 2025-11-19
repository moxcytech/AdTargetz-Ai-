import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { DashboardSidebar } from './DashboardSidebar';
import { CampaignsHome } from './CampaignsHome';
import { CampaignWizard } from './CampaignWizard';
import { LeadsPage } from './LeadsPage';
import { AnalyticsPage } from './AnalyticsPage';
import { SettingsPage } from './SettingsPage';
import { IntegrationsPage } from './IntegrationsPage';
import { LinkedInPage } from './LinkedInPage';

const PaymentsPlaceholder = () => (
    <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700">Payments & Billing</h2>
        <p className="text-gray-500 mt-2">Connect your payment gateways in Integrations to manage transactions here.</p>
    </div>
);

export const Dashboard: React.FC = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        window.location.hash = '/';
    };

    const hash = window.location.hash;
    const subRoute = hash.startsWith('#/dashboard/') ? hash.substring('#/dashboard/'.length) : '';

    const renderSubPage = () => {
        switch (subRoute) {
            case 'create':
                return <CampaignWizard />;
            case 'leads':
                return <LeadsPage />;
            case 'analytics':
                return <AnalyticsPage />;
            case 'integrations':
                return <IntegrationsPage />;
            case 'linkedin':
                return <LinkedInPage />;
            case 'payments':
                return <PaymentsPlaceholder />;
            case 'settings':
                return <SettingsPage />;
            case '':
            default:
                return <CampaignsHome />;
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            <DashboardSidebar activeRoute={subRoute} userEmail={user?.email || ''} onLogout={handleLogout} />
            <div className="flex-1 flex flex-col">
                <main className="flex-1 p-6 sm:p-8 lg:p-10">
                    {renderSubPage()}
                </main>
            </div>
        </div>
    );
};