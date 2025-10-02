import React, { useState, useCallback } from 'react';
import { AiToolComponentProps, DualTextareaToolProps } from '../../types';
import { Loader } from '../Loader';
import { OutputDisplay } from './shared/OutputDisplay';
import { streamTextGeneration } from './shared/utils';

const DualTextareaTool: React.FC<AiToolComponentProps> = ({ tool, language, onGenerationComplete }) => {
    const { placeholder1, placeholder2, label1, label2 } = tool.props as DualTextareaToolProps;
    const [userInput1, setUserInput1] = useState('');
    const [userInput2, setUserInput2] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = useCallback(() => {
        const inputs = { userInput1, userInput2 };
        streamTextGeneration(tool, language, inputs, onGenerationComplete, setGeneratedContent, setIsLoading, setError);
    }, [tool, language, onGenerationComplete, userInput1, userInput2]);

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex flex-col md:flex-row gap-4 flex-grow min-h-0">
                <div className="w-full md:w-1/2 flex flex-col gap-2 h-full">
                    <label className="text-sm font-semibold text-gray-300">{label1}</label>
                    <textarea
                        value={userInput1}
                        onChange={(e) => setUserInput1(e.target.value)}
                        placeholder={placeholder1}
                        className="w-full h-full p-3 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
                    />
                </div>
                <div className="w-full md:w-1/2 flex flex-col gap-2 h-full">
                    <label className="text-sm font-semibold text-gray-300">{label2}</label>
                    <textarea
                        value={userInput2}
                        onChange={(e) => setUserInput2(e.target.value)}
                        placeholder={placeholder2}
                        className="w-full h-full p-3 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
                    />
                </div>
            </div>
            <button onClick={handleGenerate} disabled={isLoading || !userInput1 || !userInput2} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all">
                {isLoading ? <><Loader /> Generating...</> : 'Generate'}
            </button>
            <div className="h-2/5 shrink-0">
                <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your generated content will appear here." tool={tool} />
            </div>
        </div>
    );
};

export default DualTextareaTool;
