import React, { useState, useCallback } from 'react';
import { AiToolComponentProps, AnnouncementGeneratorToolProps } from '../../types';
import { Loader } from '../Loader';
import { Select } from './shared/Select';
import { OutputDisplay } from './shared/OutputDisplay';
import { streamTextGeneration } from './shared/utils';

const AnnouncementGeneratorTool: React.FC<AiToolComponentProps> = ({ tool, language, onGenerationComplete }) => {
    const { placeholder, ctaPlaceholder, announcementTypes } = tool.props as AnnouncementGeneratorToolProps;
    const [announcementType, setAnnouncementType] = useState(announcementTypes[0]);
    const [userInput, setUserInput] = useState('');
    const [cta, setCta] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = useCallback(() => {
        const inputs = { announcementType, userInput, cta: cta || 'None' };
        streamTextGeneration(tool, language, inputs, onGenerationComplete, setGeneratedContent, setIsLoading, setError);
    }, [tool, language, onGenerationComplete, announcementType, userInput, cta]);

    const isGenerateDisabled = isLoading || !userInput.trim();

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <Select label="Announcement Type" value={announcementType} onChange={(e) => setAnnouncementType(e.target.value)} options={announcementTypes} />
                </div>
                <div className="flex-1">
                    <label className="block text-xs text-gray-400 mb-1">Call-to-Action (CTA)</label>
                    <input
                        type="text"
                        value={cta}
                        onChange={(e) => setCta(e.target.value)}
                        placeholder={ctaPlaceholder}
                        className="w-full p-2 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
                    />
                </div>
            </div>
            <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={placeholder}
                className="w-full flex-grow p-4 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
                rows={5}
            />
            <button
                onClick={handleGenerate}
                disabled={isGenerateDisabled}
                className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all"
            >
                {isLoading ? <><Loader /> Generating...</> : 'Generate Announcement Package'}
            </button>
            <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your multi-channel announcement package will appear here." tool={tool} />
        </div>
    );
};

export default AnnouncementGeneratorTool;
