import React, { useState, useCallback } from 'react';
import { AiToolComponentProps, GrantProposalToolProps } from '../../types';
import { Loader } from '../Loader';
import { OutputDisplay } from './shared/OutputDisplay';
import { streamTextGeneration } from './shared/utils';

const GrantProposalTool: React.FC<AiToolComponentProps> = ({ tool, language, onGenerationComplete }) => {
    const { placeholder, fundingBodyLabel, fundingBodyPlaceholder } = tool.props as GrantProposalToolProps;
    const [userInput, setUserInput] = useState('');
    const [fundingBody, setFundingBody] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = useCallback(() => {
        const inputs = { fundingBody: fundingBody || 'any', userInput };
        streamTextGeneration(tool, language, inputs, onGenerationComplete, setGeneratedContent, setIsLoading, setError);
    }, [tool, language, onGenerationComplete, fundingBody, userInput]);

    return (
        <div className="flex flex-col h-full gap-4">
        <div className="max-w-xs">
            <label className="block text-xs text-gray-400 mb-1">{fundingBodyLabel}</label>
            <input
            type="text"
            value={fundingBody}
            onChange={(e) => setFundingBody(e.target.value)}
            placeholder={fundingBodyPlaceholder}
            className="w-full p-2 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
            />
        </div>
        <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={placeholder}
            className="w-full flex-grow p-4 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
        />
        <button onClick={handleGenerate} disabled={isLoading || !userInput} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all">
            {isLoading ? <><Loader /> Drafting Proposal...</> : 'Generate Grant Proposal'}
        </button>
        <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your generated grant proposal draft will appear here." tool={tool} />
        </div>
    );
};

export default GrantProposalTool;
