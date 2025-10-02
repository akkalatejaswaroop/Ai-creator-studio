import React, { useState, useCallback } from 'react';
import { AiToolComponentProps, GrammarToolProps } from '../../types';
import { Loader } from '../Loader';
import { Select } from './shared/Select';
import { OutputDisplay } from './shared/OutputDisplay';
import { streamTextGeneration } from './shared/utils';

const GrammarTool: React.FC<AiToolComponentProps> = ({ tool, language, onGenerationComplete }) => {
    const { placeholder, styles } = tool.props as GrammarToolProps;
    const [userInput, setUserInput] = useState('');
    const [style, setStyle] = useState(styles[0]);
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = useCallback(() => {
        const inputs = { style, userInput };
        streamTextGeneration(tool, language, inputs, onGenerationComplete, setGeneratedContent, setIsLoading, setError);
    }, [tool, language, onGenerationComplete, style, userInput]);

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="max-w-xs">
                <Select label="Target Writing Style" value={style} onChange={(e) => setStyle(e.target.value)} options={styles} />
            </div>
            <textarea
                value={userInput} onChange={(e) => setUserInput(e.target.value)}
                placeholder={placeholder}
                className="w-full flex-grow p-4 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm" />
            <button onClick={handleGenerate} disabled={isLoading || !userInput} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all">
                {isLoading ? <><Loader /> Generating...</> : 'Generate'}
            </button>
            <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your corrected text will appear here." tool={tool} />
        </div>
    );
};

export default GrammarTool;
