import React, { useState, useCallback } from 'react';
import { AiToolComponentProps, DoubleSelectToolProps } from '../../types';
import { Loader } from '../Loader';
import { Select } from './shared/Select';
import { OutputDisplay } from './shared/OutputDisplay';
import { streamTextGeneration } from './shared/utils';

const DoubleSelectTool: React.FC<AiToolComponentProps> = ({ tool, language, onGenerationComplete }) => {
    const { placeholder, select1, select2 } = tool.props as DoubleSelectToolProps;
    const [userInput, setUserInput] = useState('');
    const [selectValue1, setSelectValue1] = useState(select1.options[0]);
    const [selectValue2, setSelectValue2] = useState(select2.options[0]);
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
  
    const handleGenerate = useCallback(() => {
        const inputs = { select1: selectValue1, select2: selectValue2, userInput };
        streamTextGeneration(tool, language, inputs, onGenerationComplete, setGeneratedContent, setIsLoading, setError);
    }, [tool, language, onGenerationComplete, selectValue1, selectValue2, userInput]);

    return (
      <div className="flex flex-col h-full gap-4">
        <div className="flex gap-4">
          <Select label={select1.label} value={selectValue1} onChange={(e) => setSelectValue1(e.target.value)} options={select1.options} />
          <Select label={select2.label} value={selectValue2} onChange={(e) => setSelectValue2(e.target.value)} options={select2.options} />
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
        <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your generated content will appear here." tool={tool} />
      </div>
    );
};

export default DoubleSelectTool;
