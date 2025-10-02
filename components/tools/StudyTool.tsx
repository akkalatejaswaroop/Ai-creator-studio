import React, { useState, useCallback } from 'react';
import { AiToolComponentProps, StudyToolProps } from '../../types';
import { Loader } from '../Loader';
import { Select } from './shared/Select';
import { OutputDisplay } from './shared/OutputDisplay';
import { streamTextGeneration } from './shared/utils';

const StudyTool: React.FC<AiToolComponentProps> = ({ tool, language, onGenerationComplete }) => {
    const { placeholder, difficulties } = tool.props as StudyToolProps;
    const [userInput, setUserInput] = useState('');
    const [difficulty, setDifficulty] = useState(difficulties[0]);
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = useCallback(() => {
        const inputs = { difficulty, userInput };
        streamTextGeneration(tool, language, inputs, onGenerationComplete, setGeneratedContent, setIsLoading, setError);
    }, [tool, language, onGenerationComplete, difficulty, userInput]);

    return (
        <div className="flex flex-col h-full gap-4">
          <div className="max-w-xs">
            <Select label="Difficulty Level" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} options={difficulties} />
          </div>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={placeholder}
            className="w-full flex-grow p-4 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
          />
          <button onClick={handleGenerate} disabled={isLoading || !userInput} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all">
            {isLoading ? <><Loader /> Generating...</> : 'Generate'}
          </button>
          <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your study guide will appear here." tool={tool} />
        </div>
      );
};

export default StudyTool;
