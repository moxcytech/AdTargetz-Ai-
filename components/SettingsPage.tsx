import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const SettingsCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <div className="p-6">
            {children}
        </div>
    </div>
);

export const SettingsPage: React.FC = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState({ name: '', company: '' });
    const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
    const [notifications, setNotifications] = useState({ email: true, push: false });
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        // Load settings from localStorage
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) setProfile(JSON.parse(savedProfile));

        const savedNotifications = localStorage.getItem('userNotifications');
        if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
    }, []);

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    };

    const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNotifications({ ...notifications, [e.target.name]: e.target.checked });
    };

    const handleProfileSave = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem('userProfile', JSON.stringify(profile));
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setTimeout(() => setMessage(null), 3000);
    };

    const handlePasswordSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (password.new !== password.confirm) {
            setMessage({ type: 'error', text: 'New passwords do not match.' });
            return;
        }
        if (password.new.length < 6) {
             setMessage({ type: 'error', text: 'New password must be at least 6 characters.' });
            return;
        }
        // This is a simulation, no real password change happens
        setPassword({ current: '', new: '', confirm: '' });
        setMessage({ type: 'success', text: 'Password changed successfully! (Simulated)' });
        setTimeout(() => setMessage(null), 3000);
    };
    
    const handleNotificationsSave = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem('userNotifications', JSON.stringify(notifications));
        setMessage({ type: 'success', text: 'Notification settings saved!' });
        setTimeout(() => setMessage(null), 3000);
    };


    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
                <p className="mt-1 text-gray-600">Manage your account details and preferences.</p>
            </div>

            {message && (
                <div className={`p-4 mb-6 rounded-md text-sm ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message.text}
                </div>
            )}
            
            <div className="space-y-8">
                <SettingsCard title="Profile Information">
                    <form onSubmit={handleProfileSave} className="space-y-4 max-w-lg">
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" value={user?.email || ''} readOnly disabled className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm" />
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" id="name" name="name" value={profile.name} onChange={handleProfileChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Your Name" />
                        </div>
                         <div>
                            <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                            <input type="text" id="company" name="company" value={profile.company} onChange={handleProfileChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Your Company Name" />
                        </div>
                        <div className="text-right">
                             <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2A5652] hover:bg-teal-700">Save Profile</button>
                        </div>
                    </form>
                </SettingsCard>

                <SettingsCard title="Change Password">
                    <form onSubmit={handlePasswordSave} className="space-y-4 max-w-lg">
                        <div>
                            <label htmlFor="current" className="block text-sm font-medium text-gray-700">Current Password</label>
                            <input type="password" id="current" name="current" value={password.current} onChange={handlePasswordChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                        </div>
                         <div>
                            <label htmlFor="new" className="block text-sm font-medium text-gray-700">New Password</label>
                            <input type="password" id="new" name="new" value={password.new} onChange={handlePasswordChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                        </div>
                         <div>
                            <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                            <input type="password" id="confirm" name="confirm" value={password.confirm} onChange={handlePasswordChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                        </div>
                         <div className="text-right">
                             <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2A5652] hover:bg-teal-700">Update Password</button>
                        </div>
                    </form>
                </SettingsCard>
                
                <SettingsCard title="Notification Settings">
                    <form onSubmit={handleNotificationsSave} className="space-y-4">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="email" name="email" type="checkbox" checked={notifications.email} onChange={handleNotificationChange} className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="email" className="font-medium text-gray-700">Email Notifications</label>
                                <p className="text-gray-500">Get emails about new leads, campaign performance, and product updates.</p>
                            </div>
                        </div>
                         <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="push" name="push" type="checkbox" checked={notifications.push} onChange={handleNotificationChange} className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="push" className="font-medium text-gray-700">Push Notifications</label>
                                <p className="text-gray-500">Get push notifications on your devices. (Feature coming soon)</p>
                            </div>
                        </div>
                         <div className="text-right">
                             <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2A5652] hover:bg-teal-700">Save Preferences</button>
                        </div>
                    </form>
                </SettingsCard>

            </div>
        </div>
    );
};