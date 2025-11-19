import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { SparklesIcon } from './icons';

interface CreateCampaignFormProps {
  onClose: () => void;
  onCampaignCreate: (campaignData: {
    name: string;
    objective: string;
    audience: string;
    budget: string;
    adCopy: string;
    adImageIdea: string;
  }) => void;
}

const AiButton: React.FC<{ onClick: () => void; isLoading: boolean }> = ({ onClick, isLoading }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={isLoading}
    className="flex items-center gap-1 text-sm text-[#128C7E] font-semibold hover:text-[#075E54] disabled:opacity-50 disabled:cursor-wait"
  >
    <SparklesIcon className="w-4 h-4" />
    {isLoading ? 'Generating...' : 'Generate with Ai'}
  </button>
);


export const CreateCampaignForm: React.FC<CreateCampaignFormProps> = ({ onClose, onCampaignCreate }) => {
  const [name, setName] = useState('');
  const [objective, setObjective] = useState('Lead Generation');
  const [audience, setAudience] = useState('');
  const [budget, setBudget] = useState('');
  const [adCopy, setAdCopy] = useState('');
  const [adImageIdea, setAdImageIdea] = useState('');

  const [isLoadingAudience, setIsLoadingAudience] = useState(false);
  const [isLoadingAdCopy, setIsLoadingAdCopy] = useState(false);
  const [isLoadingImageIdea, setIsLoadingImageIdea] = useState(false);
  const [error, setError] = useState('');

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const generateWithAi = async (prompt: string, setLoading: (loading: boolean) => void, setContent: (content: string) => void) => {
    setLoading(true);
    setError('');
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        setContent(response.text.trim());
    } catch (err) {
        console.error("AI generation failed:", err);
        setError('Failed to generate content. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  const handleGenerateAudience = () => {
    if (!name || !objective) {
        setError('Please enter a Campaign Name and select an Objective first.');
        return;
    }
    const prompt = `Based on a marketing campaign named "${name}" with the objective of "${objective}", describe a detailed target audience. Include demographics, interests, and behaviors.`;
    generateWithAi(prompt, setIsLoadingAudience, setAudience);
  };
  
  const handleGenerateAdCopy = () => {
     if (!name || !objective || !audience) {
        setError('Please fill in Campaign Name, Objective, and Target Audience first.');
        return;
    }
    const prompt = `Write a compelling and short ad copy for a marketing campaign named "${name}". The objective is "${objective}" and the target audience is "${audience}". The copy should be engaging and have a clear call to action.`;
    generateWithAi(prompt, setIsLoadingAdCopy, setAdCopy);
  };
  
  const handleGenerateImageIdea = () => {
    if (!name || !adCopy) {
        setError('Please fill in Campaign Name and Ad Copy first.');
        return;
    }
    const prompt = `Describe a visually appealing image for an ad. The campaign is "${name}" with the ad copy: "${adCopy}". Describe the image in detail, including subject, setting, colors, and mood.`;
    generateWithAi(prompt, setIsLoadingImageIdea, setAdImageIdea);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !objective || !audience || !budget || !adCopy || !adImageIdea) {
        setError('Please fill out all fields before creating the campaign.');
        return;
    }
    onCampaignCreate({ name, objective, audience, budget, adCopy, adImageIdea });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Create New Campaign</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {error && <p className="bg-red-100 text-red-700 p-3 rounded-md text-sm">{error}</p>}
            
            <div>
              <label htmlFor="campaignName" className="block text-sm font-medium text-gray-700">Campaign Name</label>
              <input type="text" id="campaignName" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#128C7E] focus:border-[#128C7E] sm:text-sm" placeholder="e.g., Summer Sale" />
            </div>

            <div>
              <label htmlFor="objective" className="block text-sm font-medium text-gray-700">Campaign Objective</label>
              <select id="objective" value={objective} onChange={e => setObjective(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#128C7E] focus:border-[#128C7E] sm:text-sm">
                <option>Lead Generation</option>
                <option>Website Traffic</option>
                <option>Brand Awareness</option>
                <option>Sales Conversion</option>
              </select>
            </div>
            
            <div>
              <div className="flex justify-between items-center">
                <label htmlFor="audience" className="block text-sm font-medium text-gray-700">Target Audience</label>
                <AiButton onClick={handleGenerateAudience} isLoading={isLoadingAudience} />
              </div>
              <textarea id="audience" value={audience} onChange={e => setAudience(e.target.value)} required rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#128C7E] focus:border-[#128C7E] sm:text-sm" placeholder="Describe your target audience or generate with AI."></textarea>
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget ($USD)</label>
              <input type="number" id="budget" value={budget} onChange={e => setBudget(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#128C7E] focus:border-[#128C7E] sm:text-sm" placeholder="e.g., 500" />
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label htmlFor="adCopy" className="block text-sm font-medium text-gray-700">Ad Copy</label>
                 <AiButton onClick={handleGenerateAdCopy} isLoading={isLoadingAdCopy} />
              </div>
              <textarea id="adCopy" value={adCopy} onChange={e => setAdCopy(e.target.value)} required rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#128C7E] focus:border-[#128C7E] sm:text-sm" placeholder="Write your ad copy or generate with AI."></textarea>
            </div>

             <div>
              <div className="flex justify-between items-center">
                <label htmlFor="adImageIdea" className="block text-sm font-medium text-gray-700">Ad Image Idea</label>
                <AiButton onClick={handleGenerateImageIdea} isLoading={isLoadingImageIdea} />
              </div>
              <textarea id="adImageIdea" value={adImageIdea} onChange={e => setAdImageIdea(e.target.value)} required rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#128C7E] focus:border-[#128C7E] sm:text-sm" placeholder="Describe the ad image or generate an idea with AI."></textarea>
            </div>

          </div>
          <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
            <button type="button" onClick={onClose}