import React, { useState, useCallback } from 'react';
import { AiToolComponentProps, NoticeGeneratorToolProps } from '../../types';
import { Loader } from '../Loader';
import { OutputDisplay } from './shared/OutputDisplay';
import { streamTextGeneration } from './shared/utils';

const LabeledInput = ({ label, name, value, onChange, placeholder }: { label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string }) => (
    <div>
        <label className="block text-xs text-gray-400 mb-1">{label}</label>
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full p-2 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
        />
    </div>
);

const NoticeGeneratorTool: React.FC<AiToolComponentProps> = ({ tool, language, onGenerationComplete }) => {
    const { noticeTypes, channels, urgencyLevels } = tool.props as NoticeGeneratorToolProps;
    
    const [formData, setFormData] = useState({
        noticeType: noticeTypes[0],
        audience: '',
        channel: channels[0],
        urgency: urgencyLevels[0],
        dateTime: '',
        affectedServices: '',
        reason: '',
        contactPerson: '',
    });
    
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGenerate = useCallback(() => {
        streamTextGeneration(tool, language, formData, onGenerationComplete, setGeneratedContent, setIsLoading, setError);
    }, [tool, language, formData, onGenerationComplete]);

    const isGenerateDisabled = isLoading || !formData.reason.trim() || !formData.audience.trim();

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <label className="block text-xs text-gray-400 mb-1">Notice Type</label>
                    <select name="noticeType" value={formData.noticeType} onChange={handleInputChange} className="w-full p-2 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm">
                        {noticeTypes.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-xs text-gray-400 mb-1">Channel</label>
                    <select name="channel" value={formData.channel} onChange={handleInputChange} className="w-full p-2 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm">
                        {channels.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-xs text-gray-400 mb-1">Urgency Level</label>
                    <select name="urgency" value={formData.urgency} onChange={handleInputChange} className="w-full p-2 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm">
                        {urgencyLevels.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
                <LabeledInput label="Target Audience" name="audience" value={formData.audience} onChange={handleInputChange} placeholder="e.g., All Employees" />
                <LabeledInput label="Date & Time of Event" name="dateTime" value={formData.dateTime} onChange={handleInputChange} placeholder="e.g., Friday, Oct 27 at 5 PM PST" />
                <LabeledInput label="Services/Areas Affected" name="affectedServices" value={formData.affectedServices} onChange={handleInputChange} placeholder="e.g., Main login service" />
                <LabeledInput label="Reason/Purpose" name="reason" value={formData.reason} onChange={handleInputChange} placeholder="e.g., To deploy critical security patch" />
                <LabeledInput label="Contact Person for Questions" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} placeholder="e.g., The IT Help Desk" />
            </div>
            
            <button
                onClick={handleGenerate}
                disabled={isGenerateDisabled}
                className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all mt-2"
            >
                {isLoading ? <><Loader /> Generating Notice...</> : 'Generate Notice'}
            </button>
            <div className="flex-grow min-h-0">
                <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your generated notice will appear here." tool={tool} />
            </div>
        </div>
    );
};

export default NoticeGeneratorTool;