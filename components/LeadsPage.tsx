import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Lead, Campaign, Note, ChatMessage, Reminder } from '../types';
import { UsersIcon, PhoneIcon, MailIcon, WhatsAppIcon, SendIcon, PaperClipIcon, MicrophoneIcon, ChatIcon, CheckCircleIcon, BellIcon, CalendarIcon, PlusIcon, CloseIcon } from './icons';

const LeadStatusBadge: React.FC<{ status: Lead['status'] }> = ({ status }) => {
    const colors: Record<Lead['status'], string> = {
        New: 'bg-blue-100 text-blue-800 border border-blue-200',
        Contacted: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
        Qualified: 'bg-green-100 text-green-800 border border-green-200',
        Lost: 'bg-gray-100 text-gray-600 border border-gray-200',
    };
    return (
        <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${colors[status]}`}>{status}</span>
    );
};

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const isUser = message.sender === 'user';
    return (
        <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-sm ${
                message.sender === 'user' 
                    ? 'bg-[#128C7E] text-white rounded-br-none' 
                    : message.sender === 'ai' 
                        ? 'bg-white border border-teal-200 text-gray-800 rounded-bl-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
            }`}>
                {message.sender === 'ai' && (
                    <div className="flex items-center gap-2 mb-2 border-b border-teal-100 pb-1">
                         <div className="w-4 h-4 bg-teal-100 rounded-full flex items-center justify-center">
                            <ChatIcon className="w-2.5 h-2.5 text-[#128C7E]" />
                         </div>
                         <span className="text-xs font-bold text-[#128C7E]">AI Assistant</span>
                    </div>
                )}
                {message.sender === 'lead' && <p className="text-xs font-bold text-gray-500 mb-1">Lead</p>}
                
                <p className="leading-relaxed">{message.message}</p>
                
                 {message.mediaUrl && (
                    <div className="mt-3 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 p-2 flex items-center gap-3">
                         <div className="bg-white p-2 rounded border border-gray-200">
                            <PaperClipIcon className="w-4 h-4 text-gray-400" />
                         </div>
                         <div>
                             <p className="text-xs font-bold text-gray-700">Attachment Sent</p>
                             <p className="text-[10px] text-gray-500">{message.mediaUrl}</p>
                         </div>
                    </div>
                )}
                <p className={`text-[10px] mt-2 text-right opacity-70`}>
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>
        </div>
    );
};

const NoteItem: React.FC<{ note: Note }> = ({ note }) => {
    const icons = {
        Phone: <PhoneIcon className="w-3 h-3" />,
        WhatsApp: <WhatsAppIcon className="w-3 h-3" />,
        Email: <MailIcon className="w-3 h-3" />,
        Other: <ChatIcon className="w-3 h-3" />,
    };
    return (
        <div className="flex gap-3 mb-6 relative">
             {/* Timeline line */}
            <div className="absolute left-4 top-8 bottom-[-24px] w-px bg-gray-200"></div>
            
            <div className="flex flex-col items-center z-10">
                 <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 border border-gray-200 shadow-sm">
                    {icons[note.type] || icons.Other}
                </div>
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-bold text-gray-800">{note.type} Log</p>
                    <span className="text-xs text-gray-400">{new Date(note.date).toLocaleDateString()} • {new Date(note.date).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
                </div>
                <div className="text-sm text-gray-600 bg-yellow-50/50 p-3 rounded-lg border border-yellow-100">
                    {note.text}
                </div>
            </div>
        </div>
    );
};

const AddLeadModal = ({ onClose, onSave, campaigns }: { onClose: () => void, onSave: (lead: any) => void, campaigns: Campaign[] }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [campaignId, setCampaignId] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, email, phone, campaignId });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Add New Lead</h3>
                    <button onClick={onClose}><CloseIcon className="w-5 h-5 text-gray-500" /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Name</label>
                        <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-[#128C7E] focus:border-[#128C7E]" placeholder="John Doe" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-[#128C7E] focus:border-[#128C7E]" placeholder="john@example.com" />
                    </div>
                    <div>
                         <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone</label>
                        <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-[#128C7E] focus:border-[#128C7E]" placeholder="+1 234 567 8900" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Assign to Campaign (Optional)</label>
                        <select value={campaignId} onChange={e => setCampaignId(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-[#128C7E] focus:border-[#128C7E]">
                            <option value="">-- Manual Entry (User Lead) --</option>
                            {campaigns.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-[#128C7E] text-white rounded-lg text-sm hover:bg-[#075E54] font-medium shadow-md">Add Lead</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export const LeadsPage: React.FC = () => {    
    const [leads, setLeads] = useState<Lead[]>([]);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
    const [showAddLeadModal, setShowAddLeadModal] = useState(false);
    
    // Filter states
    const [filterCampaign, setFilterCampaign] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    // New Note State
    const [newNoteText, setNewNoteText] = useState('');
    const [newNoteType, setNewNoteType] = useState<Note['type']>('Phone');

    // Reminder State
    const [reminderText, setReminderText] = useState('');
    const [reminderDate, setReminderDate] = useState('');

    // Chat State
    const [chatInput, setChatInput] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsLoading(true);
        try {
            const storedCampaigns = localStorage.getItem('campaigns_v4');
            const campData = storedCampaigns ? JSON.parse(storedCampaigns) : [];
            setCampaigns(campData);

            const storedLeads = localStorage.getItem('leads_v4');
            const leadsData = storedLeads ? JSON.parse(storedLeads) : [];
            
            // Ensure leads have notes, chatHistory, and reminders arrays (migration for old data)
            const cleanLeads = leadsData.map((l: any) => ({
                ...l,
                notes: l.notes || [],
                chatHistory: l.chatHistory || [],
                reminders: l.reminders || [],
                source: l.source || 'campaign'
            }));
            
            setLeads(cleanLeads);
        } catch (error) {
            console.error("Failed to load data from localStorage:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Save leads whenever they change
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('leads_v4', JSON.stringify(leads));
        }
    }, [leads, isLoading]);

    const selectedLead = useMemo(() => leads.find(l => l.id === selectedLeadId), [leads, selectedLeadId]);

    // Scroll to bottom of chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [selectedLead?.chatHistory, selectedLeadId]);

    const handleStatusChange = (leadId: string, newStatus: Lead['status']) => {
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    };

    const handleAddManualLead = (leadData: { name: string; email: string; phone: string; campaignId: string }) => {
        const campaign = campaigns.find(c => c.id === leadData.campaignId);
        const newLead: Lead = {
            id: `manual-${Date.now()}`,
            name: leadData.name,
            email: leadData.email,
            phone: leadData.phone,
            campaignId: leadData.campaignId || 'manual',
            campaignName: campaign ? campaign.name : 'User Added',
            status: 'New',
            date: new Date().toISOString(),
            notes: [],
            chatHistory: [],
            reminders: [],
            source: 'manual'
        };

        const updatedLeads = [newLead, ...leads];
        setLeads(updatedLeads);
        localStorage.setItem('leads_v4', JSON.stringify(updatedLeads));
        setShowAddLeadModal(false);
    };

    const handleAddNote = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newNoteText.trim() || !selectedLeadId) return;

        const newNote: Note = {
            id: Date.now().toString(),
            text: newNoteText,
            type: newNoteType,
            date: new Date().toISOString(),
        };

        setLeads(prev => prev.map(l => 
            l.id === selectedLeadId 
            ? { ...l, notes: [newNote, ...l.notes] } 
            : l
        ));
        setNewNoteText('');
    };

    const handleAddReminder = (e: React.FormEvent) => {
        e.preventDefault();
        if (!reminderText.trim() || !reminderDate || !selectedLeadId) return;

        const newReminder: Reminder = {
            id: Date.now().toString(),
            text: reminderText,
            date: reminderDate,
            isCompleted: false,
        };

        setLeads(prev => prev.map(l => 
            l.id === selectedLeadId 
            ? { ...l, reminders: [...l.reminders, newReminder].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) } 
            : l
        ));
        setReminderText('');
        setReminderDate('');
    };

    const toggleReminder = (reminderId: string) => {
        if (!selectedLeadId) return;
        setLeads(prev => prev.map(l => 
            l.id === selectedLeadId
            ? { 
                ...l, 
                reminders: l.reminders.map(r => r.id === reminderId ? { ...r, isCompleted: !r.isCompleted } : r)
              }
            : l
        ));
    };

    const handleSendMessage = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!chatInput.trim() || !selectedLeadId) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            sender: 'user',
            message: chatInput,
            timestamp: new Date().toISOString(),
        };

        setLeads(prev => prev.map(l => 
            l.id === selectedLeadId 
            ? { ...l, chatHistory: [...l.chatHistory, userMsg] } 
            : l
        ));
        setChatInput('');

        // Simulate AI Lead Response
        setTimeout(() => {
             const responseMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                sender: 'lead',
                message: "Thanks for sending that over. I'll take a look and let you know.",
                timestamp: new Date().toISOString(),
            };
            setLeads(prev => prev.map(l => 
                l.id === selectedLeadId 
                ? { ...l, chatHistory: [...l.chatHistory, responseMsg] } 
                : l
            ));
        }, 2000);
    };
    
    const handleSendMedia = () => {
        if (!selectedLeadId) return;
         const userMsg: ChatMessage = {
            id: Date.now().toString(),
            sender: 'user',
            message: "Here is the business brochure and portfolio you requested.",
            timestamp: new Date().toISOString(),
            mediaUrl: "AdTargetz_Portfolio.pdf",
            type: "image"
        };
         setLeads(prev => prev.map(l => 
            l.id === selectedLeadId 
            ? { ...l, chatHistory: [...l.chatHistory, userMsg] } 
            : l
        ));
    }

    const filteredLeads = useMemo(() => {
        return leads
            .filter(lead => filterCampaign === 'all' || lead.campaignId === filterCampaign)
            .filter(lead => filterStatus === 'all' || lead.status === filterStatus)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [leads, filterCampaign, filterStatus]);


    if (isLoading) return <div>Loading...</div>;

    // --- DETAIL VIEW ---
    if (selectedLead) {
        return (
            <div className="h-[calc(100vh-7rem)] flex flex-col bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm z-10">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSelectedLeadId(null)} className="text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        </button>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-bold text-gray-900">{selectedLead.name}</h2>
                                {selectedLead.source === 'manual' && (
                                    <span className="bg-purple-100 text-purple-700 text-[10px] px-2 py-0.5 rounded-full border border-purple-200 font-semibold">User Added</span>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>Campaign: <span className="font-medium text-gray-700">{selectedLead.campaignName}</span></span>
                                <span>•</span>
                                <span>Added: {new Date(selectedLead.date).toLocaleDateString()}</span>
                            </div>
                        </div>
                         <LeadStatusBadge status={selectedLead.status} />
                    </div>
                    <div className="flex items-center gap-3">
                         <div className="text-right mr-4 hidden md:block">
                             <p className="text-xs text-gray-400 uppercase font-bold">Engagement Score</p>
                             <div className="flex items-center gap-1 justify-end">
                                 <span className="text-lg font-bold text-[#128C7E]">High</span>
                                 <div className="flex">
                                     <div className="h-2 w-2 bg-[#128C7E] rounded-full"></div>
                                     <div className="h-2 w-2 bg-[#128C7E] rounded-full ml-0.5"></div>
                                     <div className="h-2 w-2 bg-[#128C7E] rounded-full ml-0.5"></div>
                                 </div>
                             </div>
                         </div>
                        <select 
                            value={selectedLead.status} 
                            onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as Lead['status'])}
                            className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-[#128C7E] focus:border-[#128C7E] py-2"
                        >
                             <option value="New">New</option>
                             <option value="Contacted">Contacted</option>
                             <option value="Qualified">Qualified</option>
                             <option value="Lost">Lost</option>
                        </select>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 shadow-sm">
                            <WhatsAppIcon className="w-4 h-4" /> WhatsApp
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    {/* LEFT PANEL: CRM Data */}
                    <div className="w-1/3 border-r border-gray-200 flex flex-col bg-white overflow-y-auto custom-scrollbar">
                        {/* Contact Info Card */}
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Contact Details</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 group cursor-pointer">
                                    <div className="bg-gray-50 p-2 rounded-lg group-hover:bg-teal-50 transition-colors">
                                        <MailIcon className="w-4 h-4 text-gray-500 group-hover:text-[#128C7E]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Email Address</p>
                                        <p className="text-sm font-medium text-gray-800">{selectedLead.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 group cursor-pointer">
                                     <div className="bg-gray-50 p-2 rounded-lg group-hover:bg-teal-50 transition-colors">
                                        <PhoneIcon className="w-4 h-4 text-gray-500 group-hover:text-[#128C7E]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Phone Number</p>
                                        <p className="text-sm font-medium text-gray-800">{selectedLead.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Reminders Section */}
                         <div className="p-6 border-b border-gray-100 bg-teal-50/30">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                                <BellIcon className="w-4 h-4" /> Reminders
                            </h3>
                            
                            {/* List existing reminders */}
                            <div className="space-y-2 mb-4">
                                {selectedLead.reminders.length > 0 ? (
                                    selectedLead.reminders.map(reminder => (
                                        <div key={reminder.id} className={`flex items-center gap-2 p-2 rounded border ${reminder.isCompleted ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-teal-100'}`}>
                                            <input 
                                                type="checkbox" 
                                                checked={reminder.isCompleted} 
                                                onChange={() => toggleReminder(reminder.id)}
                                                className="h-4 w-4 text-[#128C7E] focus:ring-[#128C7E] border-gray-300 rounded"
                                            />
                                            <div className="flex-1">
                                                <p className={`text-xs font-medium ${reminder.isCompleted ? 'line-through text-gray-400' : 'text-gray-700'}`}>{reminder.text}</p>
                                                <p className="text-[10px] text-gray-400">{new Date(reminder.date).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-xs text-gray-400 italic">No reminders set.</p>
                                )}
                            </div>

                            {/* Add Reminder Form */}
                            <form onSubmit={handleAddReminder} className="flex flex-col gap-2 bg-white p-2 rounded-lg border border-gray-200">
                                <input 
                                    type="text" 
                                    value={reminderText}
                                    onChange={(e) => setReminderText(e.target.value)}
                                    placeholder="e.g. Call tomorrow"
                                    className="text-xs border-none focus:ring-0 p-1 w-full"
                                />
                                <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                                    <div className="flex items-center gap-1">
                                        <CalendarIcon className="w-3 h-3 text-gray-400" />
                                        <input 
                                            type="datetime-local" 
                                            value={reminderDate}
                                            onChange={(e) => setReminderDate(e.target.value)}
                                            className="text-[10px] border-none focus:ring-0 p-0 text-gray-500 w-32"
                                        />
                                    </div>
                                    <button type="submit" className="text-[10px] bg-[#128C7E] text-white px-2 py-1 rounded hover:bg-[#075E54]">Set</button>
                                </div>
                            </form>
                        </div>

                        {/* Activity Log / Notes */}
                        <div className="flex-1 flex flex-col bg-gray-50/50">
                             <div className="p-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Log Activity</h3>
                                <form onSubmit={handleAddNote}>
                                    <textarea 
                                        value={newNoteText}
                                        onChange={(e) => setNewNoteText(e.target.value)}
                                        placeholder="Log a call, meeting, or quick note..."
                                        className="w-full text-sm border-gray-200 bg-gray-50 rounded-lg focus:bg-white focus:ring-[#128C7E] focus:border-[#128C7E] resize-none mb-2 p-3 transition-all"
                                        rows={2}
                                    />
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                             <span className="text-xs text-gray-500">Type:</span>
                                             <select 
                                                value={newNoteType} 
                                                onChange={(e) => setNewNoteType(e.target.value as Note['type'])}
                                                className="text-xs border-gray-200 bg-white rounded-md py-1 pr-6 pl-2 focus:ring-0 focus:border-gray-300"
                                            >
                                                <option value="Phone">Call</option>
                                                <option value="WhatsApp">WhatsApp</option>
                                                <option value="Email">Email</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <button type="submit" className="text-xs bg-[#075E54] text-white px-3 py-1.5 rounded hover:bg-black transition-colors font-medium">Save Note</button>
                                    </div>
                                </form>
                             </div>
                             
                             <div className="flex-1 p-6">
                                {selectedLead.notes.length > 0 ? (
                                    selectedLead.notes.map(note => <NoteItem key={note.id} note={note} />)
                                ) : (
                                    <div className="text-center mt-10 opacity-50">
                                        <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <PaperClipIcon className="w-5 h-5 text-gray-500" />
                                        </div>
                                        <p className="text-sm text-gray-500">No activity logged yet.</p>
                                    </div>
                                )}
                             </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: Conversation */}
                    <div className="w-2/3 flex flex-col bg-[#f0f2f5] relative">
                         {/* Chat Header */}
                         <div className="bg-white p-3 border-b border-gray-200 flex justify-between items-center shadow-sm">
                            <div className="flex items-center gap-2">
                                <div className="bg-teal-100 p-1.5 rounded-md">
                                    <ChatIcon className="w-4 h-4 text-[#128C7E]" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-800">AdTargetz AI Assistant</h3>
                                    <p className="text-[10px] text-green-600 font-medium flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online & Active
                                    </p>
                                </div>
                            </div>
                         </div>

                        {/* Chat Body */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-pattern">
                             <div className="flex justify-center mb-6">
                                 <span className="text-[10px] bg-gray-200 text-gray-500 px-2 py-1 rounded-full">Conversation Started {new Date(selectedLead.date).toLocaleDateString()}</span>
                             </div>
                             
                             {selectedLead.chatHistory.length === 0 ? (
                                <div className="text-center mt-20">
                                    <p className="text-gray-500 text-sm mb-4">No conversation yet. The AI can break the ice.</p>
                                    <button 
                                        onClick={() => {
                                            const aiMsg: ChatMessage = { id: Date.now().toString(), sender: 'ai', message: `Hello ${selectedLead.name.split(' ')[0]}, thank you for your interest in ${selectedLead.campaignName}. Would you like to see our pricing plans?`, timestamp: new Date().toISOString() };
                                            setLeads(prev => prev.map(l => l.id === selectedLeadId ? { ...l, chatHistory: [...l.chatHistory, aiMsg] } : l));
                                        }}
                                        className="px-4 py-2 bg-white border border-teal-200 text-[#128C7E] rounded-full text-sm hover:bg-teal-50 transition-colors shadow-sm"
                                    >
                                        ✨ Trigger Welcome Message
                                    </button>
                                </div>
                             ) : (
                                 selectedLead.chatHistory.map(msg => <ChatBubble key={msg.id} message={msg} />)
                             )}
                             <div ref={chatEndRef} />
                        </div>

                        {/* Chat Input */}
                        <div className="p-4 bg-white border-t border-gray-200">
                             {/* Quick Actions */}
                             <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
                                <button onClick={handleSendMedia} className="whitespace-nowrap text-xs flex items-center gap-1 text-gray-600 hover:text-[#128C7E] bg-gray-50 hover:bg-teal-50 border border-gray-200 px-3 py-1.5 rounded-full transition-colors">
                                    <PaperClipIcon className="w-3 h-3" /> Send Brochure
                                </button>
                                <button className="whitespace-nowrap text-xs flex items-center gap-1 text-gray-600 hover:text-[#128C7E] bg-gray-50 hover:bg-teal-50 border border-gray-200 px-3 py-1.5 rounded-full transition-colors">
                                    📅 Book Meeting
                                </button>
                                <button className="whitespace-nowrap text-xs flex items-center gap-1 text-gray-600 hover:text-[#128C7E] bg-gray-50 hover:bg-teal-50 border border-gray-200 px-3 py-1.5 rounded-full transition-colors">
                                    💰 Send Quote
                                </button>
                             </div>

                            <form onSubmit={handleSendMessage} className="flex items-end gap-2 bg-gray-100 p-2 rounded-2xl border border-gray-200 focus-within:ring-2 focus-within:ring-teal-100 focus-within:border-teal-300 transition-all">
                                <button type="button" className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors">
                                    <PaperClipIcon className="w-5 h-5" />
                                </button>
                                <input 
                                    type="text" 
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    placeholder="Type a message to the lead..." 
                                    className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2.5 max-h-32 overflow-y-auto"
                                />
                                <button type="button" className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors">
                                    <MicrophoneIcon className="w-5 h-5" />
                                </button>
                                <button type="submit" disabled={!chatInput.trim()} className="p-2 bg-[#128C7E] text-white rounded-xl hover:bg-[#075E54] shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95">
                                    <SendIcon className="w-5 h-5 ml-0.5" />
                                </button>
                            </form>
                             <p className="text-[10px] text-gray-400 text-center mt-2">Press Enter to send • AI Auto-reply is ON</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- LIST VIEW ---
    return (
        <div>
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Leads Management</h1>
                    <p className="mt-1 text-gray-600">Track, manage, and convert your leads with AI-powered tools.</p>
                </div>
                <button 
                    onClick={() => setShowAddLeadModal(true)}
                    className="flex items-center gap-2 bg-[#128C7E] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-[#075E54] shadow-md transition-all"
                >
                    <PlusIcon className="w-5 h-5" /> Add Lead
                </button>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
                     <div className="flex justify-between items-start">
                        <div>
                             <p className="text-sm text-gray-500 font-medium">Total Leads</p>
                             <p className="text-3xl font-bold text-gray-800 mt-1">{leads.length}</p>
                        </div>
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <UsersIcon className="w-5 h-5 text-gray-500" />
                        </div>
                     </div>
                     <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                         <div className="h-full bg-gray-800 w-[70%]"></div>
                     </div>
                </div>
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
                     <div className="flex justify-between items-start">
                        <div>
                             <p className="text-sm text-gray-500 font-medium">Action Required</p>
                             <p className="text-3xl font-bold text-blue-600 mt-1">{leads.filter(l => l.status === 'New').length}</p>
                        </div>
                         <div className="p-2 bg-blue-50 rounded-lg">
                            <ChatIcon className="w-5 h-5 text-blue-500" />
                        </div>
                     </div>
                      <p className="text-xs text-blue-600 mt-4 font-medium">New inquiries waiting for response</p>
                </div>
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
                     <div className="flex justify-between items-start">
                        <div>
                             <p className="text-sm text-gray-500 font-medium">Qualified</p>
                             <p className="text-3xl font-bold text-green-600 mt-1">{leads.filter(l => l.status === 'Qualified').length}</p>
                        </div>
                         <div className="p-2 bg-green-50 rounded-lg">
                            <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        </div>
                     </div>
                     <p className="text-xs text-green-600 mt-4 font-medium">Ready for sales closing</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-5 border-b border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/50">
                    <h2 className="text-lg font-bold text-gray-800">All Leads</h2>
                    <div className="flex gap-3 w-full md:w-auto">
                        <select value={filterCampaign} onChange={e => setFilterCampaign(e.target.value)} className="rounded-lg border-gray-300 shadow-sm text-sm w-full md:w-auto py-2 focus:ring-[#128C7E] focus:border-[#128C7E]">
                            <option value="all">All Campaigns</option>
                            {campaigns.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                         <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="rounded-lg border-gray-300 shadow-sm text-sm w-full md:w-auto py-2 focus:ring-[#128C7E] focus:border-[#128C7E]">
                            <option value="all">All Statuses</option>
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Lost">Lost</option>
                        </select>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 hover:bg-gray-50">
                      <thead className="bg-gray-50">
                          <tr>
                              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Source</th>
                              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Added On</th>
                              <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                          </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                          {filteredLeads.map(lead => (
                              <tr key={lead.id} onClick={() => setSelectedLeadId(lead.id)} className="cursor-pointer hover:bg-blue-50/50 transition-colors group">
                                  <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center">
                                          <div className="h-8 w-8 rounded-full bg-[#128C7E] text-white flex items-center justify-center text-xs font-bold mr-3">
                                              {lead.name.charAt(0)}
                                          </div>
                                          <div>
                                              <div className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                                  {lead.name}
                                                  {lead.source === 'manual' && <span className="bg-purple-100 text-purple-700 text-[10px] px-2 py-0.5 rounded-full border border-purple-200 font-semibold">User Added</span>}
                                              </div>
                                          </div>
                                      </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm text-gray-600">{lead.email}</div>
                                      <div className="text-xs text-gray-400">{lead.phone}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{lead.campaignName}</td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                      <LeadStatusBadge status={lead.status} />
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(lead.date).toLocaleDateString()}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                      <span className="text-[#128C7E] font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end gap-1">
                                          Open <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                      </span>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
               {filteredLeads.length === 0 && (
                    <div className="text-center py-20 px-6">
                        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <UsersIcon className="h-8 w-8 text-gray-300" />
                        </div>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No leads found</h3>
                        <p className="mt-1 text-sm text-gray-500">Create a campaign or add a lead manually to get started.</p>
                         <button onClick={() => setShowAddLeadModal(true)} className="mt-4 text-[#128C7E] font-medium hover:underline">Add your first lead</button>
                    </div>
                )}
            </div>
            
            {showAddLeadModal && (
                <AddLeadModal 
                    onClose={() => setShowAddLeadModal(false)} 
                    onSave={handleAddManualLead} 
                    campaigns={campaigns} 
                />
            )}
        </div>
    );
};