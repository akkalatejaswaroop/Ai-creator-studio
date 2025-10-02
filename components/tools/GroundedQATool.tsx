import React, { useState, useCallback } from 'react';
import { AiToolComponentProps, GroundedQAToolProps } from '../../types';
import { generateGroundedContent, isApiAvailable } from '../../services/geminiService';
import { Loader } from '../Loader';

const GroundedQATool: React.FC<AiToolComponentProps> = ({ tool, onGenerationComplete }) => {
    const { placeholder } = tool.props as GroundedQAToolProps;
    const [userInput, setUserInput] = useState('');
    const [result, setResult] = useState<{text: string; sources: any[]} | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
  
    const handleGenerate = useCallback(async () => {
      if (!userInput) return;
      if (!isApiAvailable()) {
        setError('Gemini API key is not configured.');
        return;
      }
      setIsLoading(true);
      setResult(null);
      setError('');
  
      try {
        const response = await generateGroundedContent(userInput);
        setResult(response);
        onGenerationComplete(userInput, response.text);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    }, [userInput, onGenerationComplete]);
    
    return (
      <div className="flex flex-col h-full gap-4">
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={placeholder}
          className="w-full p-4 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
          rows={3}
        />
        <button onClick={handleGenerate} disabled={isLoading || !userInput} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300">
          {isLoading ? <><Loader /> Researching...</> : 'Generate'}
        </button>
        <div className="w-full flex-grow bg-black/30 border border-white/10 rounded-lg p-4 overflow-y-auto relative text-sm">
          {isLoading && <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-10"><Loader /><p className="mt-4 text-gray-300 animate-pulse">Searching the web...</p></div>}
          {error && <div className="text-red-400 p-4 bg-red-900/50 rounded-lg">{error}</div>}
          {result ? (
            <div>
              <div className="markdown-body" dangerouslySetInnerHTML={{ __html: result.text.replace(/\n/g, '<br />') }} />
              {result.sources.length > 0 && (
                <div className="mt-6 pt-4 border-t border-white/10">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Sources:</h4>
                  <ul className="space-y-2">
                    {result.sources.map((source, index) => (
                      <li key={index} className="flex items-center">
                        <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 text-xs truncate transition-colors">
                          {source.web.title || source.web.uri}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (!isLoading && <div className="text-gray-500 flex items-center justify-center h-full">Your up-to-date answer will appear here.</div>)}
        </div>
      </div>
    );
};

export default GroundedQATool;
