import React, { useState, useCallback } from 'react';
import { AiToolComponentProps, MessageReplyToolProps } from '../../types';
import { Loader } from '../Loader';
import { Select } from './shared/Select';
import { OutputDisplay } from './shared/OutputDisplay';
import { streamTextGeneration } from './shared/utils';

const MessageReplyTool: React.FC<AiToolComponentProps> = ({ tool, language, onGenerationComplete }) => {
    const { placeholder, contextPlaceholder, intents, tones, formalities } = tool.props as MessageReplyToolProps;
    const [userInput, setUserInput] = useState('');
    const [context, setContext] = useState('');
    const [intent, setIntent] = useState(intents[0]);
    const [tone, setTone] = useState(tones[0]);
    const [formality, setFormality] = useState(formalities[1]); // Default to Neutral
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const handleGenerate = useCallback(() => {
        const inputs = { userInput, intent, tone, formality, context: context || 'No additional context provided.' };
        streamTextGeneration(tool, language, inputs, onGenerationComplete, setGeneratedContent, setIsLoading, setError);
    }, [tool, language, onGenerationComplete, userInput, intent, tone, formality, context]);

    const isGenerateDisabled = isLoading || !userInput.trim();

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select label="Goal / Intent" value={intent} onChange={(e) => setIntent(e.target.value)} options={intents} />
                <Select label="Tone" value={tone} onChange={(e) => setTone(e.target.value)} options={tones} />
                <Select label="Formality" value={formality} onChange={(e) => setFormality(e.target.value)} options={formalities} />
            </div>
            <div className="flex flex-col md:flex-row gap-4 flex-grow min-h-0">
                <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder={placeholder}
                    className="w-full md:w-1/2 h-full p-3 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
                />
                <textarea
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder={contextPlaceholder}
                    className="w-full md:w-1/2 h-full p-3 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
                />
            </div>
            <button
                onClick={handleGenerate}
                disabled={isGenerateDisabled}
                className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all"
            >
                {isLoading ? <><Loader /> Generating Replies...</> : 'Generate Replies'}
            </button>
            <div className="h-2/5 shrink-0">
                <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your generated reply variations will appear here." tool={tool} />
            </div>
        </div>
    );
};

export default MessageReplyTool;
