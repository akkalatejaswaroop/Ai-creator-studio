import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AiToolComponentProps, GrantProposalToolProps } from '../../types';
import { Loader } from '../Loader';
import { OutputDisplay } from './shared/OutputDisplay';
import { streamTextGeneration } from './shared/utils';

const MicrophoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 016 0v8.25a3 3 0 01-3 3z" /></svg>;

const GrantProposalTool: React.FC<AiToolComponentProps> = ({ tool, language, onGenerationComplete }) => {
    const { placeholder, fundingBodyLabel, fundingBodyPlaceholder } = tool.props as GrantProposalToolProps;
    const [userInput, setUserInput] = useState('');
    const [fundingBody, setFundingBody] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');
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
                  setUserInput(prev => prev.trim() + (prev ? ' ' : '') + finalTranscript);
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

    const handleGenerate = useCallback(() => {
        const inputs = { fundingBody: fundingBody || 'any', userInput };
        streamTextGeneration(tool, language, inputs, onGenerationComplete, setGeneratedContent, setIsLoading, setError);
    }, [tool, language, onGenerationComplete, fundingBody, userInput]);

    return (
        <div className="flex flex-col h-full gap-4">
        <div className="max-w-xs">
            <label className="block text-xs text-gray-400 mb-1">{fundingBodyLabel}</label>
            <input
            type="text"
            value={fundingBody}
            onChange={(e) => setFundingBody(e.target.value)}
            placeholder={fundingBodyPlaceholder}
            className="w-full p-2 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
            />
        </div>
        <div className="relative flex-grow">
            <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={placeholder}
                className="w-full h-full p-4 pr-12 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
            />
            {isSpeechSupported && (
                <button
                    onClick={handleListen}
                    title="Dictate text"
                    className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
                >
                    <MicrophoneIcon />
                </button>
            )}
        </div>
        <button onClick={handleGenerate} disabled={isLoading || !userInput} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all">
            {isLoading ? <><Loader /> Drafting Proposal...</> : 'Generate Grant Proposal'}
        </button>
        <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your generated grant proposal draft will appear here." tool={tool} />
        </div>
    );
};

export default GrantProposalTool;