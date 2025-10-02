import React, { useState, useCallback } from 'react';
import { AiToolComponentProps, VideoScriptToolProps } from '../../types';
import { Loader } from '../Loader';
import { Select } from './shared/Select';
import { OutputDisplay } from './shared/OutputDisplay';
import { streamTextGeneration } from './shared/utils';

const VideoScriptTool: React.FC<AiToolComponentProps> = ({ tool, language, onGenerationComplete }) => {
    const { platforms, styles } = tool.props as VideoScriptToolProps;
    const [userInput, setUserInput] = useState('');
    const [platform, setPlatform] = useState(platforms[0]);
    const [style, setStyle] = useState(styles[0]);
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = useCallback(() => {
        const inputs = { platform, style, userInput };
        streamTextGeneration(tool, language, inputs, onGenerationComplete, setGeneratedContent, setIsLoading, setError);
    }, [tool, language, onGenerationComplete, platform, style, userInput]);

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex gap-4">
                <Select label="Platform" value={platform} onChange={(e) => setPlatform(e.target.value)} options={platforms} />
                <Select label="Style" value={style} onChange={(e) => setStyle(e.target.value)} options={styles} />
            </div>
            <textarea
                value={userInput} onChange={(e) => setUserInput(e.target.value)}
                placeholder="e.g., A quick tutorial on how to use our new feature"
                className="w-full flex-grow p-4 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm" rows={5} />
            <button onClick={handleGenerate} disabled={isLoading || !userInput} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300">
                {isLoading ? <><Loader /> Generating...</> : 'Generate'}
            </button>
            <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your generated script will appear here." tool={tool} />
        </div>
    );
};

export default VideoScriptTool;
