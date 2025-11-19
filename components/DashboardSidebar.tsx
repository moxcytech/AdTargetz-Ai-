import React from 'react';
import { LogoIcon, UsersIcon, GearIcon, LightbulbIcon, NodesIcon, DollarSignIcon, LinkedInIcon } from './icons';

const NavLink: React.FC<{ href: string; icon: React.ReactNode; label: string; isActive: boolean }> = ({ href, icon, label, isActive }) => (
    <button
        onClick={() => window.location.hash = href}
        className={`w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            isActive 
                ? 'bg-[#128C7E]/10 text-[#128C7E]' 
                : 'text-gray-300 hover:bg-[#128C7E]/20 hover:text-white'
        }`}
    >
        {icon}
        {label}
    </button>
)

export const DashboardSidebar: React.FC<{ activeRoute: string, userEmail: string, onLogout: () => void }> = ({ activeRoute, userEmail, onLogout }) => {
    const navItems = [
        { href: '#/dashboard', label: 'Campaigns', icon: <LogoIcon className="w-5 h-5" />, id: '' },
        { href: '#/dashboard/leads', label: 'Leads & CRM', icon: <UsersIcon className="w-5 h-5" />, id: 'leads' },
        { href: '#/dashboard/linkedin', label: 'LinkedIn Tools', icon: <LinkedInIcon className="w-5 h-5" />, id: 'linkedin' },
        { href: '#/dashboard/analytics', label: 'Analytics', icon: <LightbulbIcon className="w-5 h-5" />, id: 'analytics' },
        { href: '#/dashboard/integrations', label: 'Integrations', icon: <NodesIcon className="w-5 h-5" />, id: 'integrations' },
        { href: '#/dashboard/payments', label: 'Payments', icon: <DollarSignIcon className="w-5 h-5" />, id: 'payments' },
    ];

    return (
        <aside className="w-64 bg-[#075E54] text-white p-4 flex-col hidden md:flex">
            <div onClick={() => window.location.hash = '#/'} className="flex items-center gap-2 p-4 mb-8 cursor-pointer" aria-label="Go to homepage">
                <div className="bg-white p-1 rounded-md">
                    <LogoIcon className="w-6 h-6 text-[#075E54]" />
                </div>
                <span className="text-xl font-bold">AdTargetz Ai</span>
            </div>
            <nav className="flex-1 space-y-2">
                {navItems.map(item => (
                    <NavLink 
                        key={item.id}
                        href={item.href}
                        icon={item.icon}
                        label={item.label}
                        isActive={activeRoute === item.id}
                    />
                ))}
            </nav>
            <div className="mt-auto">
                 <NavLink 
                    href="#/dashboard/settings"
                    icon={<GearIcon className="w-5 h-5" />}
                    label="Settings"
                    isActive={activeRoute === 'settings'}
                />
                 <div className="border-t border-white/20 my-4"></div>
                 <div className="p-2">
                    <p className="text-sm font-medium text-white truncate">{userEmail}</p>
                    <button onClick={onLogout} className="text-xs text-gray-300 hover:text-white">Logout</button>
                 </div>
            </div>
        </aside>
    );
};