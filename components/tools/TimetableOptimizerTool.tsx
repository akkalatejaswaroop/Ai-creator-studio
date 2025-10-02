import React, { useState, useCallback } from 'react';
import { AiToolComponentProps, GenericToolProps } from '../../types';
import { Loader } from '../Loader';
import { OutputDisplay } from './shared/OutputDisplay';
import { streamTextGeneration } from './shared/utils';

const TimetableOptimizerTool: React.FC<AiToolComponentProps> = ({ tool, language, onGenerationComplete }) => {
  const { placeholder } = tool.props as GenericToolProps;
  const [userInput, setUserInput] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = useCallback(async () => {
    streamTextGeneration(tool, language, { userInput }, onGenerationComplete, setGeneratedContent, setIsLoading, setError);
  }, [userInput, tool, language, onGenerationComplete]);

  return (
    <div className="flex flex-col h-full gap-4">
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder={placeholder}
        className="w-full flex-grow p-4 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
      />
      <button
        onClick={handleGenerate}
        disabled={isLoading || !userInput}
        className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300"
      >
        {isLoading ? <><Loader /> Optimizing...</> : 'Generate Timetable Draft'}
      </button>
      <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your optimized timetable draft will appear here." tool={tool} />
    </div>
  );
};

export default TimetableOptimizerTool;
