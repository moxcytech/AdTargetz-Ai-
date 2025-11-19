import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { SparklesIcon, PlusIcon, PaperClipIcon } from './icons';
import { Campaign, Lead } from '../types';

// Fix for TypeScript error: Property 'google' does not exist on type 'Window & typeof globalThis'.
declare global {
  interface Window {
    google: any;
  }
}

const businessCategories = [
    "Accounting & Tax Services", "Advertising & Marketing", "Agriculture", "Architecture & Interior Design",
    "Arts & Crafts", "Automotive", "Beauty & Cosmetics", "Child Care", "Cleaning Services", "Coaching & Consulting",
    "Construction & Home Improvement", "E-commerce (General)", "Education & Tutoring", "Electronics",
    "Entertainment & Events", "Environmental Services", "Fashion & Apparel", "Financial Services",
    "Fitness & Gyms", "Food & Beverage (Restaurants, Cafes)", "Gaming", "Healthcare & Medical", "Hospitality (Hotels, Resorts)",
    "Human Resources", "Insurance", "IT Services & Tech Support", "Jewelry & Accessories", "Landscaping & Gardening",
    "Legal Services", "Manufacturing", "Non-Profit", "Pet Services", "Photography & Videography", "Real Estate",
    "Recruitment", "Retail (Brick & Mortar)", "SaaS (Software as a Service)", "Security Services",
    "Social Media & Influencers", "Sports & Recreation", "Telecommunications", "Transportation & Logistics",
    "Travel & Tourism", "Veterinary Services", "Web Design & Development", "Wellness & Spas", "Other"
];

const currencies = [
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'AED', symbol: 'AED', name: 'UAE Dirham' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
];


const AiButton: React.FC<{ onClick: () => void; isLoading: boolean; text?: string }> = ({ onClick, isLoading, text = 'Generate with AI' }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={isLoading}
    className="flex items-center gap-1 text-sm text-[#128C7E] font-semibold hover:text-[#075E54] disabled:opacity-50 disabled:cursor-wait transition-colors"
  >
    {isLoading ? (
        <svg className="animate-spin h-4 w-4 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    ) : (
        <SparklesIcon className="w-4 h-4" />
    )}
    {isLoading ? 'Generating...' : text}
  </button>
);


const GooglePlacesAutocomplete = ({ value, onChange, placeholder, types = ['(regions)'] }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    const [isApiLoaded, setIsApiLoaded] = useState(!!window.google?.maps?.places);

    useEffect(() => {
        if (isApiLoaded) return;
        const handleApiLoad = () => setIsApiLoaded(true);
        window.addEventListener('google-maps-api-loaded', handleApiLoad);
        return () => window.removeEventListener('google-maps-api-loaded', handleApiLoad);
    }, [isApiLoaded]);

    useEffect(() => {
        if (!isApiLoaded || !inputRef.current) return;

        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, { types });
        const listener = autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place?.formatted_address) {
                onChangeRef.current(place.formatted_address);
            }
        });
        
        // Geolocation removed to prevent browser prompts on load

        return () => {
            if (window.google?.maps) {
                window.google.maps.event.removeListener(listener);
                document.querySelectorAll('.pac-container').forEach(c => c.remove());
            }
        };
    }, [isApiLoaded, types]);

    return (
        <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#128C7E] focus:border-[#128C7E] sm:text-sm"
        />
    );
};

const BusinessDetailsStep = ({ data, setData, setErrors }) => {
    const [isGenerating, setIsGenerating] = useState({
        goal: false,
        kpis: false,
        competitors: false,
        description: false
    });

    const handleChange = (e) => {
        setErrors(null);
        setData({ ...data, [e.target.name]: e.target.value });
    };
    
    const handleBusinessLocationChange = (newValue) => {
        setErrors(null);
        setData({ ...data, businessLocation: newValue });
    };

    const generateAiContent = async (field, prompt, parser) => {
        setIsGenerating(prev => ({ ...prev, [field]: true }));
        setErrors(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            const parsedData = parser(response.text.trim());
            setData(prevData => ({ ...prevData, ...parsedData }));
        } catch (err) {
            console.error(`AI ${field} generation failed:`, err);
            setErrors(`AI suggestion for ${field} failed. Please ensure your business details are clear and try again.`);
        } finally {
            setIsGenerating(prev => ({ ...prev, [field]: false }));
        }
    };

    const handleAutoDraftDescription = () => {
        if (!data.businessName || !data.businessClassification) {
            setErrors('Please fill in Business Name and Category to auto-draft a description.');
            return;
        }
        const prompt = `Write a professional and concise product description for a business named "${data.businessName}" in the "${data.businessClassification}" industry. The description should highlight key services or products offered. Keep it under 50 words.`;
        generateAiContent('description', prompt, (text) => ({ productDescription: text }));
    };

    const handleGenerateGoal = () => {
         if (!data.businessName || !data.productDescription || !data.businessClassification) {
            setErrors('Please fill in Business Name, Category, and Product Description first for a better suggestion.');
            return;
        }
        const prompt = `Based on a business named "${data.businessName}" in the "${data.businessClassification}" category, described as: "${data.productDescription}", suggest a single, clear, and concise primary campaign goal. Provide only the goal text. Example: "Generate 50 new qualified leads in the next 30 days."`;
        generateAiContent('goal', prompt, (text) => ({ campaignGoal: text }));
    };

    const handleGenerateKPIs = () => {
        if (!data.campaignGoal) {
            setErrors('Please provide a Campaign Goal first to get relevant KPI suggestions.');
            return;
        }
        const prompt = `Based on a business named "${data.businessName}" in the "${data.businessClassification}" category, with a campaign goal of "${data.campaignGoal}", suggest a comma-separated list of 3-4 relevant Key Performance Indicators (KPIs). Provide only the list. Example: "Cost Per Lead, Conversion Rate, Click-Through Rate"`;
        generateAiContent('kpis', prompt, (text) => ({ kpis: text }));
    };
    
    const handleGenerateCompetitors = () => {
        if (!data.businessName || !data.businessLocation || !data.businessClassification) {
            setErrors('Please fill in Business Name, Location, and Category to get accurate competitor suggestions.');
            return;
        }
        const prompt = `Based on a business named "${data.businessName}" in the "${data.businessClassification}" category, located at "${data.businessLocation}", list 3 to 5 main competitors in the same area or niche. Provide only a comma-separated list of names.`;
        generateAiContent('competitors', prompt, (text) => ({ competitors: text }));
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-1 text-[#128C7E]">Business & Campaign Details</h2>
            <p className="text-gray-500 mb-6">Tell us about what you're promoting and your strategic goals.</p>
            <div className="space-y-6">
                 <div>
                    <label htmlFor="campaignName" className="block text-sm font-medium text-gray-700">Campaign Name</label>
                    <input type="text" id="campaignName" name="campaignName" value={data.campaignName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#128C7E] focus:border-[#128C7E] sm:text-sm" placeholder="e.g., Summer 2024 Sale" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">Business Name</label>
                        <input type="text" id="businessName" name="businessName" value={data.businessName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#128C7E] focus:border-[#128C7E] sm:text-sm" placeholder="e.g., Your Company LLC" />
                    </div>
                     <div>
                        <label htmlFor="businessLocation" className="block text-sm font-medium text-gray-700">Business Location</label>
                        <GooglePlacesAutocomplete
                            value={data.businessLocation}
                            onChange={handleBusinessLocationChange}
                            placeholder="e.g., New York, NY"
                            types={['geocode']}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="businessClassification" className="block text-sm font-medium text-gray-700">How do you classify your business as?</label>
                    <select id="businessClassification" name="businessClassification" value={data.businessClassification} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#128C7E] focus:border-[#128C7E] sm:text-sm rounded-md">
                        <option value="">Select a Category</option>
                        {businessCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <div>
                    <div className="flex justify-between items-center">
                         <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">What do you want to sell or promote?</label>
                         <AiButton onClick={handleAutoDraftDescription} isLoading={isGenerating.description} text="Auto-Draft" />
                    </div>
                    <textarea id="productDescription" name="productDescription" value={data.productDescription} onChange={handleChange} rows={4} className="mt-1 shadow-sm focus:ring-[#128C7E] focus:border-[#128C7E] block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Describe your product or service here in detail. The more detail you provide, the better the AI suggestions will be."></textarea>
                </div>

                <div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="campaignGoal" className="block text-sm font-medium text-gray-700">What is the primary goal of this campaign?</label>
                        <AiButton onClick={handleGenerateGoal} isLoading={isGenerating.goal} text="Suggest Goal" />
                    </div>
                    <textarea id="campaignGoal" name="campaignGoal" value={data.campaignGoal} onChange={handleChange} rows={2} className="mt-1 shadow-sm focus:ring-[#128C7E] focus:border-[#128C7E] block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="e.g., Generate 50 new qualified leads in the next 30 days."></textarea>
                </div>
                 <div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="kpis" className="block text-sm font-medium text-gray-700">What are your Key Performance Indicators (KPIs)?</label>
                        <AiButton onClick={handleGenerateKPIs} isLoading={isGenerating.kpis} text="Suggest KPIs" />
                    </div>
                    <input type="text" id="kpis" name="kpis" value={data.kpis} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#128C7E] focus:border-[#128C7E] sm:text-sm" placeholder="e.g., Cost Per Lead, Conversion Rate" />
                </div>
                 <div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="competitors" className="block text-sm font-medium text-gray-700">List your main competitors (Optional)</label>
                        <AiButton onClick={handleGenerateCompetitors} isLoading={isGenerating.competitors} text="Suggest Competitors" />
                    </div>
                    <textarea id="competitors" name="competitors" value={data.competitors} onChange={handleChange} rows={2} className="mt-1 shadow-sm focus:ring-[#128C7E] focus:border-[#128C7E] block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="e.g., Competitor A, Competitor B"></textarea>
                </div>
            </div>
        </div>
    );
};

const TargetAudienceStep = ({ data, setData, setErrors }) => {
    const [isGenerating, setIsGenerating] = useState({
        location: false,
        age: false,
        interests: false,
    });

    const handleChange = (e) => {
        setErrors(null);
        setData({ ...data, [e.target.name]: e.target.value });
    };
    
    const handleLocationChange = (newValue) => {
        setErrors(null);
        setData({ ...data, location: newValue });
    };

    const generateAiContent = async (field, prompt) => {
        if (!data.productDescription || !data.campaignGoal) {
            setErrors('Please complete the Business Details step first. Product Description and Campaign Goal are required for accurate suggestions.');
            return;
        }
        
        setIsGenerating(prev => ({ ...prev, [field]: true }));
        setErrors(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            setData(prevData => ({ ...prevData, [field]: response.text.trim() }));
        } catch (err) {
            console.error(`AI ${field} generation failed:`, err);
            setErrors(`AI suggestion for ${field} failed. This might be a network issue. Please try again or enter the information manually.`);
        } finally {
            setIsGenerating(prev => ({ ...prev, [field]: false }));
        }
    };

    const handleGenerateLocation = () => {
        const prompt = `Based on a marketing campaign for a product described as: "${data.productDescription}" with the goal of "${data.campaignGoal}", suggest a primary target location. Examples: "California, USA", "London, UK", "Global". Provide only the location name.`;
        generateAiContent('location', prompt);
    };

    const handleGenerateAge = () => {
        const prompt = `Based on a marketing campaign for a product described as: "${data.productDescription}" with the goal of "${data.campaignGoal}", suggest the ideal target age range. Provide only the range, for example: "25-45".`;
        generateAiContent('age', prompt);
    };

    const handleGenerateInterests = () => {
        const prompt = `Based on a marketing campaign for a product described as: "${data.productDescription}" with the goal of "${data.campaignGoal}".
The target audience is located in "${data.location}" and aged "${data.age}".
The main competitors are "${data.competitors}".
Suggest a detailed list of interests and behaviors for targeting on social media platforms like Facebook and Google Ads.
Provide the output as a single comma-separated string of keywords. For example: "digital marketing, small business owners, SaaS, productivity software, tech enthusiasts".`;
        generateAiContent('interests', prompt);
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-1 text-[#128C7E]">Target Audience</h2>
            <p className="text-gray-500 mb-6">Describe the customers you want to reach.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                        <AiButton onClick={handleGenerateLocation} isLoading={isGenerating.location} text="Suggest Location" />
                    </div>
                    <GooglePlacesAutocomplete
                        value={data.location}
                        onChange={handleLocationChange}
                        placeholder="e.g., New York, USA"
                    />
                </div>
                 <div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age Range</label>
                        <AiButton onClick={handleGenerateAge} isLoading={isGenerating.age} text="Suggest Age" />
                    </div>
                    <input type="text" id="age" name="age" value={data.age} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#128C7E] focus:border-[#128C7E] sm:text-sm" placeholder="e.g., 25-45" />
                </div>
                <div className="md:col-span-2">
                    <div className="flex justify-between items-center">
                        <label htmlFor="interests" className="block text-sm font-medium text-gray-700">Interests & Behaviors</label>
                        <AiButton onClick={handleGenerateInterests} isLoading={isGenerating.interests} text="Suggest Interests" />
                    </div>
                    <textarea id="interests" name="interests" value={data.interests} onChange={handleChange} rows={4} className="mt-1 shadow-sm block w-full sm:text-sm border border-gray-300 rounded-md focus:ring-[#128C7E] focus:border-[#128C7E]" placeholder="e.g., digital marketing, small business owners, SaaS... Or let our AI suggest interests based on your business details."></textarea>
                </div>
            </div>
        </div>
    );
};

const AdCreativeStep = ({ data, setData, setErrors }) => {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateAdCopy = async () => {
        if (!data.productDescription || !data.interests) {
            setErrors('Please complete the Business Details and Target Audience steps first for better ad copy.');
            return;
        }
        setIsGenerating(true);
        setErrors(null);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Write compelling ad copy for a product described as "${data.productDescription}". 
The target audience has interests in: "${data.interests}".
The campaign goal is: "${data.campaignGoal}".
The tone should be: "${data.adTone}".
Provide a catchy headline and a short, persuasive body text with a clear call to action.
Format the output as:
Headline: [Your Headline Here]
Body: [Your Body Text Here]`;

            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            setData({ ...data, adCopy: response.text.trim() });
        } catch (err) {
            console.error("AI ad copy generation failed:", err);
            setErrors('AI copy generation failed. Try refining your product description or target audience details for better results, or write the copy manually.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-1 text-[#128C7E]">Ad Creative</h2>
            <p className="text-gray-500 mb-6">Craft the message for your ad. Use AI to help you write compelling copy.</p>
            
            <div className="mb-4">
                 <label htmlFor="adTone" className="block text-sm font-medium text-gray-700 mb-1">Tone of Voice</label>
                 <select 
                    id="adTone" 
                    name="adTone" 
                    value={data.adTone} 
                    onChange={(e) => setData({...data, adTone: e.target.value})}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#128C7E] focus:border-[#128C7E] sm:text-sm rounded-md"
                 >
                     <option value="Professional">Professional</option>
                     <option value="Persuasive">Persuasive</option>
                     <option value="Friendly & Casual">Friendly & Casual</option>
                     <option value="Urgent (FOMO)">Urgent (FOMO)</option>
                     <option value="Witty & Humorous">Witty & Humorous</option>
                     <option value="Luxury & Elegant">Luxury & Elegant</option>
                 </select>
            </div>

            <div className="flex justify-between items-center">
                <label htmlFor="adCopy" className="block text-sm font-medium text-gray-700">Ad Copy (Headline & Body)</label>
                <AiButton onClick={handleGenerateAdCopy} isLoading={isGenerating} text="Generate Ad Copy" />
            </div>
            <textarea
                id="adCopy"
                name="adCopy"
                value={data.adCopy}
                onChange={(e) => setData({ ...data, adCopy: e.target.value })}
                rows={6}
                className="mt-1 shadow-sm block w-full sm:text-sm border border-gray-300 rounded-md focus:ring-[#128C7E] focus:border-[#128C7E]"
                placeholder="Example:&#10;Headline: Unlock Your Potential!&#10;Body: Our new tool helps you achieve more...&#10;Or click 'Generate Ad Copy' for an AI-drafted version."
            ></textarea>
        </div>
    );
};

const AdLanguageStep = ({ data, setData, setErrors }) => {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleSuggestLanguage = async () => {
        if (!data.location) {
            setErrors('Please provide a location in the Target Audience step to get language suggestions.');
            return;
        }
        setIsGenerating(true);
        setErrors(null);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Based on the target location "${data.location}", what are the primary languages spoken there? List the most common ones as a comma-separated list. For example: English, Spanish`;
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            setData({ ...data, adLanguage: response.text.trim() });
        } catch (err) {
            console.error("AI language suggestion failed:", err);
            setErrors('AI language suggestion failed. Please ensure you have set a location, or enter languages manually.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-1 text-[#128C7E]">Ad Language</h2>
            <p className="text-gray-500 mb-6">Select the languages for your ads to run in.</p>
            <div className="flex justify-between items-center">
                <label htmlFor="adLanguage" className="block text-sm font-medium text-gray-700">Languages</label>
                <AiButton onClick={handleSuggestLanguage} isLoading={isGenerating} text="Suggest Language" />
            </div>
            <input
                type="text"
                id="adLanguage"
                name="adLanguage"
                value={data.adLanguage}
                onChange={(e) => setData({ ...data, adLanguage: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#128C7E] focus:border-[#128C7E] sm:text-sm"
                placeholder="e.g., English, Spanish"
            />
        </div>
    );
};


const AdBannersStep = ({ data, setData, setErrors }) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [mode, setMode] = useState<'generate' | 'upload'>('generate');

    const handleFieldChange = (e) => {
        setErrors(null);
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setErrors('Please upload a valid image file (PNG, JPG, etc.).');
                return;
            }
            if (file.size > 4 * 1024 * 1024) { // 4MB limit
                setErrors('Image file size should not exceed 4MB.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                if(mode === 'upload') {
                    setData({ ...data, generatedImageUrl: reader.result as string, uploadedImage: '' }); // Treat uploaded final image as "generatedImageUrl" for display logic
                } else {
                    setData({ ...data, uploadedImage: reader.result as string });
                }
                setErrors(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerateImage = async () => {
        if (!data.imagePrompt) {
            setErrors('Please describe the image you want to generate in the Creative Brief.');
            return;
        }
        setIsGenerating(true);
        setErrors(null);
        setData({ ...data, generatedImageUrl: '' });

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Generate a compelling ad image with the following characteristics:
- Style: "${data.imageStyle}"
- Aspect Ratio: "${data.aspectRatio}"
- User's creative brief: "${data.imagePrompt}"
- The ad copy is: "${data.adCopy}"

The ad is for a product described as: "${data.productDescription}", with a campaign goal of: "${data.campaignGoal}".

${data.uploadedImage ? 'VERY IMPORTANT: Use the provided image as a strong visual reference. Modify it or incorporate its key elements and style into the new generation.' : 'Generate a new image from scratch based on the brief.'}

The final image should be vibrant, high-quality, and suitable for a professional online ad campaign.`;
            
            const parts: ({ text: string } | { inlineData: { mimeType: string; data: string } })[] = [{ text: prompt }];
            if (data.uploadedImage) {
                const [header, base64Data] = data.uploadedImage.split(',');
                const mimeType = header.match(/:(.*?);/)[1];
                parts.unshift({
                    inlineData: {
                        mimeType,
                        data: base64Data,
                    },
                });
            }

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts },
                config: {
                    responseModalities: [Modality.IMAGE],
                },
            });

            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64ImageBytes = part.inlineData.data;
                    const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
                    setData({ ...data, generatedImageUrl: imageUrl, imagePrompt: data.imagePrompt });
                    return; 
                }
            }
            throw new Error("No image data found in AI response.");

        } catch (err) {
            console.error("AI image generation failed:", err);
            setErrors('AI image generation failed. This can happen with very complex or abstract prompts. Please try simplifying your creative brief and try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-1 text-[#128C7E]">Ad Banners</h2>
            <p className="text-gray-500 mb-6">Design your visual creative. Use AI to generate it, or upload your own finished ad.</p>
            
            {/* Toggle Mode */}
            <div className="flex gap-4 border-b border-gray-200 mb-6">
                <button 
                    onClick={() => setMode('generate')} 
                    className={`pb-2 px-1 font-medium text-sm transition-colors border-b-2 ${mode === 'generate' ? 'border-[#128C7E] text-[#128C7E]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    <SparklesIcon className="w-4 h-4 inline mr-1" />
                    AI Generator
                </button>
                <button 
                    onClick={() => setMode('upload')} 
                    className={`pb-2 px-1 font-medium text-sm transition-colors border-b-2 ${mode === 'upload' ? 'border-[#128C7E] text-[#128C7E]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    <PlusIcon className="w-4 h-4 inline mr-1" />
                    Upload My Own
                </button>
            </div>

            <div className="space-y-6">
                {mode === 'generate' ? (
                    <>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Upload Reference Image (Optional)</label>
                            <p className="text-xs text-gray-500 mb-2">Upload a logo or product shot for the AI to use as inspiration.</p>
                            <div className="flex items-center gap-4">
                                <label className="cursor-pointer py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                    <span>{data.uploadedImage ? 'Change Reference' : 'Upload Reference'}</span>
                                    <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                                </label>
                                {data.uploadedImage && (
                                    <div className="flex items-center gap-2">
                                        <img src={data.uploadedImage} alt="Upload preview" className="h-12 w-12 object-cover rounded-md border" />
                                        <button type="button" onClick={() => setData({ ...data, uploadedImage: '' })} className="text-sm text-red-600 hover:text-red-800">Remove</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="imageStyle" className="block text-sm font-medium text-gray-700">Image Style</label>
                                <select id="imageStyle" name="imageStyle" value={data.imageStyle} onChange={handleFieldChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#128C7E] focus:border-[#128C7E] sm:text-sm rounded-md">
                                    <option>Photorealistic</option>
                                    <option>Illustration</option>
                                    <option>Cartoon</option>
                                    <option>Watercolor</option>
                                    <option>Abstract</option>
                                    <option>Minimalist</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="aspectRatio" className="block text-sm font-medium text-gray-700">Aspect Ratio</label>
                                <select id="aspectRatio" name="aspectRatio" value={data.aspectRatio} onChange={handleFieldChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#128C7E] focus:border-[#128C7E] sm:text-sm rounded-md">
                                    <option>1:1 Square</option>
                                    <option>16:9 Landscape</option>
                                    <option>9:16 Portrait</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center">
                                <label htmlFor="imagePrompt" className="block text-sm font-medium text-gray-700">Creative Brief / Prompt</label>
                                <AiButton onClick={handleGenerateImage} isLoading={isGenerating} text="Generate Image" />
                            </div>
                            <textarea 
                                id="imagePrompt" 
                                name="imagePrompt" 
                                value={data.imagePrompt} 
                                onChange={handleFieldChange} 
                                rows={3} 
                                className="mt-1 shadow-sm block w-full sm:text-sm border border-gray-300 rounded-md focus:ring-[#128C7E] focus:border-[#128C7E]" 
                                placeholder="Describe the image you want. Be specific about the subject, setting, colors, and mood. e.g., A photorealistic image of a person hiking at sunrise, looking at our product."></textarea>
                        </div>
                    </>
                ) : (
                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <div className="mx-auto h-12 w-12 text-gray-400">
                            <PaperClipIcon className="w-full h-full" />
                        </div>
                        <p className="mt-2 text-sm text-gray-600 font-medium">Click to upload your ready-to-use ad banner</p>
                         <p className="text-xs text-gray-500">PNG, JPG up to 4MB</p>
                        <label className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#128C7E] hover:bg-[#075E54] cursor-pointer shadow-sm">
                            Select File
                            <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                        </label>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {mode === 'generate' ? 'Generated Image Preview' : 'Uploaded Creative Preview'}
                    </label>
                    <div className="w-full aspect-video bg-gray-100 rounded-md border border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative">
                        {isGenerating ? (
                             <div className="text-center text-gray-500">
                                <svg className="animate-spin h-8 w-8 text-teal-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <p className="mt-2 text-sm">Generating your image...</p>
                                <p className="mt-1 text-xs text-gray-400">This may take a moment.</p>
                            </div>
                        ) : data.generatedImageUrl ? (
                            <>
                                <img src={data.generatedImageUrl} alt="Ad creative" className="object-contain w-full h-full" />
                                <button 
                                    onClick={() => setData({...data, generatedImageUrl: ''})}
                                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 shadow-sm"
                                    title="Remove Image"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                                </button>
                            </>
                        ) : (
                            <p className="text-gray-500 text-sm">
                                {mode === 'generate' ? 'Your generated image will appear here' : 'No image uploaded yet'}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const AdVideosStep = ({ data, setData, setErrors }) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [mode, setMode] = useState<'script' | 'upload'>('script');

    const handleGenerateVideoScript = async () => {
        if (!data.adCopy) {
            setErrors('Please generate or write your Ad Copy in the "Ad Creative" step first.');
            return;
        }
        setIsGenerating(true);
        setErrors(null);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Create a short video ad script.
Video Length: "${data.videoLength}"
Video Style: "${data.videoStyle}"
The ad is based on the following ad copy: "${data.adCopy}".
The product is: "${data.productDescription}".
The goal is: "${data.campaignGoal}".
Break down the script into scenes with visual descriptions and corresponding voiceover/text on screen.
Format the output clearly, for example:
Scene 1: [Visual description]
Voiceover: [Text]

Scene 2: [Visual description]
Text on Screen: [Text]`;

            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            setData({ ...data, videoScript: response.text.trim() });
        } catch (err) {
            console.error("AI video script generation failed:", err);
            setErrors('AI video idea generation failed. A clear and complete ad copy from the previous step is needed for the best results. Please review it and try again.');
        } finally {
            setIsGenerating(false);
        }
    };
    
    const handleVideoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('video/')) {
                 setErrors('Please upload a valid video file.');
                 return;
            }
             // For this demo, we just store the filename as a placeholder because we can't store large videos in localStorage.
             // In a real app, this would upload to cloud storage.
            setData({ ...data, videoScript: `[Uploaded Video File: ${file.name}]` });
            setErrors(null);
        }
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-1 text-[#128C7E]">Ad Videos</h2>
            <p className="text-gray-500 mb-6">Create a video strategy. Generate an AI script to film, or upload your finished video ad.</p>
            
            {/* Toggle Mode */}
            <div className="flex gap-4 border-b border-gray-200 mb-6">
                <button 
                    onClick={() => setMode('script')} 
                    className={`pb-2 px-1 font-medium text-sm transition-colors border-b-2 ${mode === 'script' ? 'border-[#128C7E] text-[#128C7E]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    <SparklesIcon className="w-4 h-4 inline mr-1" />
                    AI Script Generator
                </button>
                <button 
                    onClick={() => setMode('upload')} 
                    className={`pb-2 px-1 font-medium text-sm transition-colors border-b-2 ${mode === 'upload' ? 'border-[#128C7E] text-[#128C7E]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    <PlusIcon className="w-4 h-4 inline mr-1" />
                    Upload Video
                </button>
            </div>
            
            {mode === 'script' ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="videoStyle" className="block text-sm font-medium text-gray-700">Video Style</label>
                            <select 
                                id="videoStyle" 
                                name="videoStyle" 
                                value={data.videoStyle} 
                                onChange={(e) => setData({ ...data, videoStyle: e.target.value })} 
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#128C7E] focus:border-[#128C7E] sm:text-sm rounded-md"
                            >
                                <option>Modern & Fast-Paced</option>
                                <option>Cinematic & Emotional</option>
                                <option>Animated Explainer</option>
                                <option>User-Generated Content Style</option>
                                <option>Humorous & Quirky</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="videoLength" className="block text-sm font-medium text-gray-700">Target Video Length</label>
                            <select 
                                id="videoLength" 
                                name="videoLength" 
                                value={data.videoLength} 
                                onChange={(e) => setData({ ...data, videoLength: e.target.value })}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#128C7E] focus:border-[#128C7E] sm:text-sm rounded-md"
                            >
                                <option>15 seconds</option>
                                <option>30 seconds</option>
                                <option>60 seconds</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <label htmlFor="videoScript" className="block text-sm font-medium text-gray-700">Video Script & Storyboard</label>
                        <AiButton onClick={handleGenerateVideoScript} isLoading={isGenerating} text="Generate Video Idea" />
                    </div>
                    <textarea
                        id="videoScript"
                        name="videoScript"
                        value={data.videoScript}
                        onChange={(e) => setData({ ...data, videoScript: e.target.value })}
                        rows={10}
                        className="mt-1 shadow-sm block w-full sm:text-sm border border-gray-300 rounded-md focus:ring-[#128C7E] focus:border-[#128C7E]"
                        placeholder="A scene-by-scene script with visual ideas and voiceover text will be generated here. Click 'Generate Video Idea' to start."
                    ></textarea>
                </>
            ) : (
                 <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                        <div className="mx-auto h-12 w-12 text-gray-400">
                            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        </div>
                        <p className="mt-2 text-sm text-gray-600 font-medium">Click to upload your video creative</p>
                         <p className="text-xs text-gray-500">MP4, MOV up to 50MB</p>
                        <label className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#128C7E] hover:bg-[#075E54] cursor-pointer shadow-sm">
                            Select Video File
                            <input type="file" className="hidden" onChange={handleVideoUpload} accept="video/*" />
                        </label>
                        
                        {data.videoScript && data.videoScript.startsWith('[Uploaded') && (
                            <div className="mt-4 p-3 bg-white border border-green-200 rounded-md inline-flex items-center gap-2 text-green-700 text-sm font-medium">
                                <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                                {data.videoScript}
                            </div>
                        )}
                </div>
            )}
        </div>
    );
};


const AdBudgetStep = ({ data, setData, setErrors }) => {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleChange = (e) => {
        setErrors(null);
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleGenerateBudget = async () => {
        if (!data.productDescription || !data.campaignGoal || !data.interests) {
            setErrors('Please complete the Business Details and Target Audience steps first to get an accurate suggestion.');
            return;
        }
        setIsGenerating(true);
        setErrors(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Based on a marketing campaign for a product described as: "${data.productDescription}".
The campaign objective is: "${data.objective}" and the specific goal is "${data.campaignGoal}".
The target audience is located in "${data.location}".
Suggest a reasonable starting daily budget in ${data.currency} for this campaign to achieve its goals. Provide only the numerical value without currency symbols, commas, or any extra text. For example: 50`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            
            const budgetText = response.text.trim();
            const suggestedBudget = budgetText.replace(/[^0-9]/g, '');

            if (suggestedBudget && !isNaN(Number(suggestedBudget))) {
                setData({ ...data, budget: suggestedBudget });
            } else {
                throw new Error("AI did not return a valid number.");
            }

        } catch (err) {
            console.error("AI budget generation failed:", err);
            setErrors('AI budget suggestion failed. Please ensure all previous steps are filled and try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-1 text-[#128C7E]">Ad Budget</h2>
            <p className="text-gray-500 mb-6">Set your daily or lifetime budget for this campaign.</p>
            <div className="space-y-6">
                 <div>
                    <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency</label>
                    <select 
                        id="currency" 
                        name="currency" 
                        value={data.currency} 
                        onChange={handleChange} 
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#128C7E] focus:border-[#128C7E] sm:text-sm rounded-md"
                    >
                        {currencies.map(curr => (
                            <option key={curr.code} value={curr.code}>{curr.symbol} {curr.code} - {curr.name}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Daily Budget</label>
                        <AiButton onClick={handleGenerateBudget} isLoading={isGenerating} text="Suggest Budget" />
                    </div>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">
                                {currencies.find(c => c.code === data.currency)?.symbol}
                            </span>
                        </div>
                        <input 
                            type="number" 
                            id="budget" 
                            name="budget" 
                            value={data.budget} 
                            onChange={handleChange} 
                            className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-[#128C7E] focus:border-[#128C7E] sm:text-sm" 
                            placeholder="Enter amount" 
                        />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">This is the maximum amount you will spend per day.</p>
                </div>
            </div>
        </div>
    );
};


const steps = [
    { name: 'Business Details', component: BusinessDetailsStep },
    { name: 'Target Audience', component: TargetAudienceStep },
    { name: 'Ad Creative', component: AdCreativeStep },
    { name: 'Ad Language', component: AdLanguageStep },
    { name: 'Ad Banners', component: AdBannersStep },
    { name: 'Ad Videos', component: AdVideosStep },
    { name: 'Ad Budget', component: AdBudgetStep },
];

export const CampaignWizard = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [errors, setErrors] = useState(null);
    const [campaignData, setCampaignData] = useState({
        campaignName: 'New Campaign ' + new Date().toLocaleDateString(),
        businessName: '',
        businessLocation: '',
        businessClassification: '',
        productDescription: '',
        campaignGoal: '',
        kpis: '',
        competitors: '',
        location: '',
        age: '',
        interests: '',
        adCopy: '',
        adTone: 'Professional',
        adLanguage: '',
        imagePrompt: '',
        generatedImageUrl: '',
        uploadedImage: '',
        videoScript: '',
        videoStyle: 'Modern & Fast-Paced',
        videoLength: '15 seconds',
        imageStyle: 'Photorealistic',
        aspectRatio: '1:1 Square',
        budget: '500',
        currency: 'INR',
        objective: 'Lead Generation',
    });

    const handleNext = () => {
        if(currentStep === 0) {
            if(!campaignData.campaignName || !campaignData.businessName || !campaignData.businessLocation || !campaignData.businessClassification || !campaignData.productDescription || !campaignData.campaignGoal || !campaignData.kpis) {
                setErrors('Please fill out all required fields in Business Details to improve AI accuracy. Competitors are optional.');
                return;
            }
        }
        if (currentStep === 1) {
            if (!campaignData.location || !campaignData.age || !campaignData.interests) {
                setErrors('Please fill out all fields for Target Audience.');
                return;
            }
        }
        if (currentStep === 2) {
            if (!campaignData.adCopy) {
                setErrors('Please generate or write your Ad Copy.');
                return;
            }
        }
        if (currentStep === 3) {
            if (!campaignData.adLanguage) {
                setErrors('Please provide the ad language(s).');
                return;
            }
        }
        if (currentStep === 4) {
            if (!campaignData.generatedImageUrl) {
                setErrors('Please generate an ad image or upload your own creative.');
                return;
            }
        }
         if (currentStep === 5) {
            if (!campaignData.videoScript) {
                setErrors('Please generate a video script idea or upload a video.');
                return;
            }
        }
        if (currentStep === 6) {
            if (!campaignData.budget || isNaN(Number(campaignData.budget)) || Number(campaignData.budget) <= 0) {
                setErrors('Please enter a valid, positive number for the budget.');
                return;
            }
        }


        setErrors(null);

        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            try {
                const storedCampaigns = localStorage.getItem('campaigns_v4');
                const campaigns = storedCampaigns ? JSON.parse(storedCampaigns) : [];
                
                const newLeadCount = Math.floor(Math.random() * 50) + 5;
                const campaignId = Date.now().toString();

                const newCampaign: Campaign = {
                    id: campaignId,
                    name: campaignData.campaignName,
                    businessName: campaignData.businessName,
                    businessLocation: campaignData.businessLocation,
                    objective: campaignData.objective,
                    audience: `Location: ${campaignData.location}, Age: ${campaignData.age}, Interests: ${campaignData.interests}`,
                    budget: campaignData.budget, // Store as string, could add currency here too if type allowed
                    adCopy: campaignData.adCopy,
                    adImageIdea: campaignData.imagePrompt,
                    status: 'Active',
                    leads: newLeadCount,
                    impressions: Math.floor(Math.random() * 50000) + 10000,
                    clicks: Math.floor(Math.random() * 2000) + 500,
                    creationDate: new Date().toISOString(),
                    campaignGoal: campaignData.campaignGoal,
                    kpis: campaignData.kpis,
                    competitors: campaignData.competitors,
                    adLanguage: campaignData.adLanguage,
                    videoScript: campaignData.videoScript,
                    generatedImageUrl: campaignData.generatedImageUrl,
                    videoStyle: campaignData.videoStyle,
                    videoLength: campaignData.videoLength,
                    imageStyle: campaignData.imageStyle,
                    aspectRatio: campaignData.aspectRatio,
                };

                campaigns.push(newCampaign);
                localStorage.setItem('campaigns_v4', JSON.stringify(campaigns));
                
                // Generate initial leads for this campaign so the CRM is not empty
                const storedLeads = localStorage.getItem('leads_v4');
                const leads: Lead[] = storedLeads ? JSON.parse(storedLeads) : [];
                
                const firstNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Ethan', 'Fiona', 'George'];
                const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller'];
                
                for(let i = 0; i < newLeadCount; i++) {
                    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
                    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
                    leads.push({
                        id: `${campaignId}-${i}`,
                        name: `${firstName} ${lastName}`,
                        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
                        phone: `+1 555 01${Math.floor(Math.random() * 100).toString().padStart(2, '0')}`,
                        campaignId: campaignId,
                        campaignName: campaignData.campaignName,
                        status: 'New',
                        date: new Date().toISOString(),
                        notes: [],
                        chatHistory: [],
                        reminders: [],
                        source: 'campaign'
                    });
                }
                localStorage.setItem('leads_v4', JSON.stringify(leads));

                alert('Campaign created successfully! Leads have been generated in your CRM.');
                window.location.hash = '#/dashboard';
            } catch (error) {
                console.error('Failed to save campaign to localStorage:', error);
                setErrors('Could not save the campaign. Please check your browser settings.');
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setErrors(null);
            setCurrentStep(currentStep - 1);
        }
    };

    const ActiveStepComponent = steps[currentStep].component;

    return (
        <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
            <div className="px-8 py-6 border-b">
                <h1 className="text-2xl font-bold text-gray-800">Create a New Campaign</h1>
                <p className="text-gray-500 mt-1">Follow the steps to launch your next successful campaign.</p>
            </div>
            
             <div className="px-6 md:px-8 py-4 border-b overflow-x-auto">
                <div className="flex items-start" style={{ minWidth: '700px' }}>
                    {steps.map((step, stepIdx) => (
                        <div key={step.name} className={`flex-1 text-center px-1 pb-2`}>
                            <div className={`py-2 border-b-4 ${
                                stepIdx === currentStep ? 'border-[#128C7E]' : 
                                stepIdx < currentStep ? 'border-teal-400' : 'border-gray-200'
                            }`}>
                                <p className={`text-sm whitespace-nowrap ${
                                    stepIdx <= currentStep ? 'text-gray-800 font-medium' : 'text-gray-500'
                                }`}>{step.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-8">
                {errors && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-6 text-sm">{errors}</p>}
                <ActiveStepComponent data={campaignData} setData={setCampaignData} setErrors={setErrors} />
            </div>

            <div className="p-6 bg-gray-50 border-t flex justify-between items-center rounded-b-lg">
                <button
                    type="button"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Back
                </button>
                 <button
                    type="button"
                    onClick={handleNext}
                    className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#128C7E] hover:bg-[#075E54]"
                >
                    {currentStep === steps.length - 1 ? 'Finish & Launch' : 'Next'}
                </button>
            </div>
        </div>
    );
};