import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { RobotIcon, SendIcon, CloseIcon, ChatIcon } from './icons';

interface Message {
    sender: 'user' | 'bot';
    text: string;
}

export const LandingPageChatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'bot', text: 'Hi there! 👋 I can answer questions about our Pricing, Services, or how AI Automation works. How can I help you grow your business today?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    useEffect(() => {
        if (isOpen) {
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: userMsg,
                config: {
                    systemInstruction: `You are a friendly and professional sales assistant for AdTargetz Ai. 
                    
                    About AdTargetz Ai:
                    - An AI-powered customer acquisition platform.
                    - Services: Omnichannel Ads (Google, Meta, TV, Radio, Theatre), CRM Suite, WhatsApp Marketing, API Integrations.
                    - Key Features: Predictive budget allocation, automated creative generation, cross-platform retargeting.
                    
                    Pricing Plans:
                    1. Starter: Free platform access, you pay for Ad Packs (e.g., ₹2,100 for 3 days). 20% service fee included in packs. Ideal for small businesses.
                    2. Growth: ₹14,000/month. Connect own ad accounts, unlimited spend, dedicated support. Ideal for brands.
                    3. CRM Suite: ₹20,000/year. Pipeline management, lead distribution.
                    4. WhatsApp Marketing: ₹25,000 setup fee (waived for All-in-One), plus usage charges.

                    Your Goal:
                    Answer questions concisely and encourage the user to Sign Up or Contact Sales. Be helpful and persuasive but honest.
                    `,
                }
            });

            const botReply = response.text.trim();
            setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
        } catch (error) {
            console.error('Chatbot error:', error);
            setMessages(prev => [...prev, { sender: 'bot', text: "I'm having trouble connecting to my brain right now. Please try again later or contact support directly." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-24 z-50 flex flex-col items-end">
            {isOpen ? (
                <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 flex flex-col h-[500px] border border-gray-200 mb-4 overflow-hidden animate-fade-in-up">
                    {/* Header */}
                    <div className="bg-[#2A5652] p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <div className="bg-white/20 p-1.5 rounded-full">
                                <RobotIcon className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">AdTargetz Assistant</h3>
                                <p className="text-xs opacity-80">Ask me anything!</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors">
                            <CloseIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                                    msg.sender === 'user' 
                                    ? 'bg-[#2A5652] text-white rounded-br-none' 
                                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                             <div className="flex justify-start">
                                <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex gap-2">
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your question..." 
                            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#2A5652] focus:ring-1 focus:ring-[#2A5652]"
                        />
                        <button 
                            type="submit" 
                            disabled={!input.trim() || isTyping}
                            className="bg-[#2A5652] text-white p-2.5 rounded-full hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <SendIcon className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            ) : (
                // Trigger Button
                <div className="flex flex-col items-center gap-2">
                    {/* Tooltip Label */}
                    <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-100 animate-bounce cursor-pointer" onClick={() => setIsOpen(true)}>
                        <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">Chat with AI Assistant 👋</p>
                    </div>
                    
                    <button 
                        onClick={() => setIsOpen(true)}
                        className="bg-white text-[#2A5652] p-4 rounded-full shadow-xl hover:bg-gray-50 transition-all duration-300 hover:scale-110 border border-gray-200 group relative"
                        aria-label="Open Chat Assistant"
                    >
                         <div className="absolute -top-1 -right-1 bg-red-500 w-3.5 h-3.5 rounded-full border-2 border-white"></div>
                         <RobotIcon className="w-8 h-8" />
                    </button>
                </div>
            )}
        </div>
    );
};