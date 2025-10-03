import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AiToolComponentProps, MessageReplyToolProps } from '../../types';
import { Loader } from '../Loader';
import { Select } from './shared/Select';
import { OutputDisplay } from './shared/OutputDisplay';
import { streamTextGeneration } from './shared/utils';

const MicrophoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 016 0v8.25a3 3 0 01-3 3z" /></svg>;

const MessageReplyTool: React.FC<AiToolComponentProps> = ({ tool, language, onGenerationComplete }) => {
    const { placeholder, contextPlaceholder, intents, tones, formalities } = tool.props as MessageReplyToolProps;
    const [userInput, setUserInput] = useState('');
    const [context, setContext] = useState('');
    const [intent, setIntent] = useState(intents[0]);
    const [tone, setTone] = useState(tones[0]);
    const [formality, setFormality] = useState(formalities[1]); // Default to Neutral
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Speech recognition state
    const [isSpeechSupported, setIsSpeechSupported] = useState(false);
    const [listeningTarget, setListeningTarget] = useState<'userInput' | 'context' | null>(null);
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
                    const toAdd = (prev: string) => prev.trim() + (prev ? ' ' : '') + finalTranscript;
                    if (listeningTarget === 'userInput') {
                        setUserInput(toAdd);
                    } else if (listeningTarget === 'context') {
                        setContext(toAdd);
                    }
                }
            };
            recognition.onend = () => setListeningTarget(null);
            recognitionRef.current = recognition;
        }
        return () => recognitionRef.current?.stop();
    }, [listeningTarget]);

    const handleListen = (target: 'userInput' | 'context') => {
        if (!recognitionRef.current) return;
        if (listeningTarget === target) {
            recognitionRef.current.stop();
        } else {
            if (listeningTarget) recognitionRef.current.stop();
            setListeningTarget(target);
            recognitionRef.current.start();
        }
    };
    
    const handleGenerate = useCallback(() => {
        const inputs = { userInput, intent, tone, formality, context: context || 'No additional context provided.' };
        streamTextGeneration(tool, language, inputs, onGenerationComplete, setGeneratedContent, setIsLoading, setError);
    }, [tool, language, onGenerationComplete, userInput, intent, tone, formality, context]);

    const isGenerateDisabled = isLoading || !userInput.trim();

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select label="Goal / Intent" value={intent} onChange={(e) => setIntent(e.target.value)} options={intents} />
                <Select label="Tone" value={tone} onChange={(e) => setTone(e.target.value)} options={tones} />
                <Select label="Formality" value={formality} onChange={(e) => setFormality(e.target.value)} options={formalities} />
            </div>
            <div className="flex flex-col md:flex-row gap-4 flex-grow min-h-0">
                <div className="relative w-full md:w-1/2 h-full">
                    <textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder={placeholder}
                        className="w-full h-full p-3 pr-12 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
                    />
                    {isSpeechSupported && (
                        <button onClick={() => handleListen('userInput')} title="Dictate message" className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${listeningTarget === 'userInput' ? 'bg-red-500 text-white animate-pulse' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}>
                            <MicrophoneIcon />
                        </button>
                    )}
                </div>
                <div className="relative w-full md:w-1/2 h-full">
                    <textarea
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        placeholder={contextPlaceholder}
                        className="w-full h-full p-3 pr-12 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
                    />
                    {isSpeechSupported && (
                        <button onClick={() => handleListen('context')} title="Dictate context" className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${listeningTarget === 'context' ? 'bg-red-500 text-white animate-pulse' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}>
                            <MicrophoneIcon />
                        </button>
                    )}
                </div>
            </div>
            <button
                onClick={handleGenerate}
                disabled={isGenerateDisabled}
                className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all"
            >
                {isLoading ? <><Loader /> Generating Replies...</> : 'Generate Replies'}
            </button>
            <div className="h-2/5 shrink-0">
                <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your generated reply variations will appear here." tool={tool} />
            </div>
        </div>
    );
};

export default MessageReplyTool;