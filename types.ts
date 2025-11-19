export interface Campaign {
  id: string;
  name: string;
  objective: string;
  audience: string;
  budget: string;
  adCopy: string;
  adImageIdea: string;
  status: 'Active' | 'Paused' | 'Ended';
  leads: number;
  // New fields for analytics
  impressions: number;
  clicks: number;
  creationDate: string; // ISO string e.g., "2023-10-26T10:00:00Z"
  // Fields from wizard
  campaignGoal?: string;
  kpis?: string;
  competitors?: string;
  adLanguage?: string;
  videoScript?: string;
  generatedImageUrl?: string;
  videoStyle?: string;
  videoLength?: string;
  imageStyle?: string;
  aspectRatio?: string;
  businessName?: string;
  businessLocation?: string;
}

export interface Note {
    id: string;
    text: string;
    type: 'Phone' | 'WhatsApp' | 'Email' | 'Other';
    date: string;
}

export interface ChatMessage {
    id: string;
    sender: 'user' | 'lead' | 'ai';
    message: string;
    timestamp: string;
    type?: 'text' | 'image' | 'video';
    mediaUrl?: string;
}

export interface Reminder {
    id: string;
    text: string;
    date: string; // ISO string
    isCompleted: boolean;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  campaignId: string;
  campaignName: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
  date: string; // ISO string
  notes: Note[];
  chatHistory: ChatMessage[];
  reminders: Reminder[];
  source?: 'manual' | 'campaign'; // To distinguish user added leads
}