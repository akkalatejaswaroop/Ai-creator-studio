import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AiToolComponentProps, SyllabusDesignerToolProps } from '../../types';
import { generateGroundedContent, isApiAvailable } from '../../services/geminiService';
import { Loader } from '../Loader';
import { Select } from './shared/Select';
import { ActionButtons } from './shared/ActionButtons';

const MicrophoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 016 0v8.25a3 3 0 01-3 3z" /></svg>;

const SyllabusDesignerTool: React.FC<AiToolComponentProps> = ({ tool, onGenerationComplete }) => {
    const { promptTemplate, titlePlaceholder, descriptionPlaceholder, levels } = tool.props as SyllabusDesignerToolProps;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState(levels[0]);
    const [result, setResult] = useState<{ text: string; sources: any[] } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Speech recognition state
    const [isListening, setIsListening] = useState(false);
    const [isSpeechSupported, setIsSpeechSupported] = useState(false);
    const recognitionRef = useRef<any | null>(null);

    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            setIsSpeechSupported(true);
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.onresult = (event: any) => {
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                }
                if (finalTranscript) {
                  setDescription(prev => prev.trim() + (prev ? ' ' : '') + finalTranscript);
                }
            };
            recognition.onend = () => setIsListening(false);
            recognitionRef.current = recognition;
        }
        return () => recognitionRef.current?.stop();
    }, []);

    const handleListen = () => {
        if (!recognitionRef.current) return;
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };
  
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
            <div className="relative">
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={descriptionPlaceholder}
                    className="w-full p-3 pr-12 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
                    rows={4}
                />
                {isSpeechSupported && (
                    <button
                        onClick={handleListen}
                        title="Dictate description"
                        className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
                    >
                        <MicrophoneIcon />
                    </button>
                )}
            </div>
            <button onClick={handleGenerate} disabled={isLoading || !title || !description} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300">
                {isLoading ? <><Loader /> Designing Syllabus...</> : 'Generate Syllabus'}
            </button>
            <div className="w-full flex-grow bg-black/30 border border-white/10 rounded-lg p-4 pt-12 overflow-y-auto relative text-sm group">
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