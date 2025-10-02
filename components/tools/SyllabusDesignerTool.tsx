import React, { useState, useCallback } from 'react';
import { AiToolComponentProps, SyllabusDesignerToolProps } from '../../types';
import { generateGroundedContent, isApiAvailable } from '../../services/geminiService';
import { Loader } from '../Loader';
import { Select } from './shared/Select';
import { ActionButtons } from './shared/ActionButtons';

const SyllabusDesignerTool: React.FC<AiToolComponentProps> = ({ tool, onGenerationComplete }) => {
    const { promptTemplate, titlePlaceholder, descriptionPlaceholder, levels } = tool.props as SyllabusDesignerToolProps;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState(levels[0]);
    const [result, setResult] = useState<{ text: string; sources: any[] } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
  
    const handleGenerate = useCallback(async () => {
        if (!title || !description) return;
        if (!isApiAvailable()) {
            setError('Gemini API key is not configured.');
            return;
        }
        setIsLoading(true);
        setResult(null);
        setError('');
  
        try {
            const finalPrompt = promptTemplate
                .replace('{title}', title)
                .replace('{description}', description)
                .replace('{level}', level);

            const response = await generateGroundedContent(finalPrompt);
            setResult(response);
            onGenerationComplete(`${title} - ${level}`, response.text);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [title, description, level, promptTemplate, onGenerationComplete]);
    
    return (
        <div className="flex flex-col h-full gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs text-gray-400 mb-1">Course Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={titlePlaceholder}
                        className="w-full p-2 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
                    />
                </div>
                <Select label="Learning Level" value={level} onChange={(e) => setLevel(e.target.value)} options={levels} />
            </div>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={descriptionPlaceholder}
                className="w-full p-3 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
                rows={4}
            />
            <button onClick={handleGenerate} disabled={isLoading || !title || !description} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300">
                {isLoading ? <><Loader /> Designing Syllabus...</> : 'Generate Syllabus'}
            </button>
            <div className="w-full flex-grow bg-black/30 border border-white/10 rounded-lg p-4 pt-12 overflow-y-auto relative text-sm">
                {isLoading && <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-10"><Loader /><p className="mt-4 text-gray-300 animate-pulse">Researching & Designing...</p></div>}
                {error && <div className="text-red-400 p-4 bg-red-900/50 rounded-lg">{error}</div>}
                {result ? (
                    <>
                        <ActionButtons text={result.text} toolName={tool.name} />
                        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: result.text.replace(/\n/g, '<br />') }} />
                        {result.sources.length > 0 && (
                            <div className="mt-6 pt-4 border-t border-white/10">
                                <h4 className="text-base font-semibold text-gray-300 mb-2">Cited Reading Materials:</h4>
                                <ul className="space-y-2">
                                    {result.sources.map((source, index) => (
                                        <li key={index} className="flex items-center">
                                            <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 text-sm truncate transition-colors">
                                                {source.web.title || source.web.uri}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </>
                ) : (!isLoading && <div className="text-gray-500 flex items-center justify-center h-full">Your generated syllabus will appear here.</div>)}
            </div>
        </div>
    );
};

export default SyllabusDesignerTool;
