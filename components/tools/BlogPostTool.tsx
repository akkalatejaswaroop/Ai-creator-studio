import React, { useState, useCallback } from 'react';
import { AiToolComponentProps, BlogPostToolProps } from '../../types';
import { Loader } from '../Loader';
import { Select } from './shared/Select';
import { OutputDisplay } from './shared/OutputDisplay';
import { streamTextGeneration } from './shared/utils';

const BlogPostTool: React.FC<AiToolComponentProps> = ({ tool, language, onGenerationComplete }) => {
  const { promptTemplate, placeholder, tones, styles, audiences } = tool.props as BlogPostToolProps;
  const [userInput, setUserInput] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState(tones[0]);
  const [style, setStyle] = useState(styles[0]);
  const [audience, setAudience] = useState(audiences[0]);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = useCallback(async () => {
    const inputs = {
        userInput,
        keywords: keywords || 'none',
        tone,
        style,
        audience,
    };
    streamTextGeneration(tool, language, inputs, onGenerationComplete, setGeneratedContent, setIsLoading, setError);
  }, [userInput, keywords, tone, style, audience, tool, language, onGenerationComplete]);
  
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select label="Tone" value={tone} onChange={(e) => setTone(e.target.value)} options={tones} />
        <Select label="Style" value={style} onChange={(e) => setStyle(e.target.value)} options={styles} />
        <Select label="Audience" value={audience} onChange={(e) => setAudience(e.target.value)} options={audiences} />
        <div>
          <label className="block text-xs text-gray-400 mb-1">Optional Keywords</label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g., SEO, content marketing"
            className="w-full p-2 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
          />
        </div>
      </div>
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder={placeholder}
        className="w-full flex-grow p-4 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
        rows={6}
      />
      <button
        onClick={handleGenerate}
        disabled={isLoading || !userInput}
        className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300"
      >
        {isLoading ? <><Loader /> Generating...</> : 'Generate'}
      </button>
      <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your generated blog post will appear here." tool={tool} />
    </div>
  );
};

export default BlogPostTool;
