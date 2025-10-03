import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AiToolComponentProps, AdvancedWritingToolProps } from '../../types';
import { Loader } from '../Loader';
import { Select } from './shared/Select';
import { OutputDisplay } from './shared/OutputDisplay';
import { streamTextGeneration } from './shared/utils';

// Microphone Icon
const MicrophoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 016 0v8.25a3 3 0 01-3 3z" /></svg>;

const AdvancedWritingTool: React.FC<AiToolComponentProps> = ({ tool, onGenerationComplete }) => {
    const { placeholder, tones, audiences, formalities, goals, languageVariants } = tool.props as AdvancedWritingToolProps;

    // State for inputs
    const [userInput, setUserInput] = useState('');
    const [tone, setTone] = useState(tones[0]);
    const [audience, setAudience] = useState(audiences[0]);
    const [formality, setFormality] = useState(formalities[0]);
    const [goal, setGoal] = useState(goals[0]);
    const [languageVariant, setLanguageVariant] = useState(languageVariants[0]);
    
    // State for generation
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // State for speech recognition
    const [isListening, setIsListening] = useState(false);
    const [isSpeechSupported, setIsSpeechSupported] = useState(false);
    // FIX: Use 'any' type for the SpeechRecognition object to avoid TypeScript errors
    // for non-standard browser APIs.
    const recognitionRef = useRef<any | null>(null);

    useEffect(() => {
        // FIX: Cast window to 'any' to access vendor-prefixed SpeechRecognition API
        // without causing TypeScript compilation errors.
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            setIsSpeechSupported(true);
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            
            recognitionRef.current.onresult = (event: any) => {
                let interimTranscript = '';
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
                setUserInput(prev => prev + finalTranscript);
            };
        }
    }, []);

    const handleListen = () => {
        if (!recognitionRef.current) return;
        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };
    
    const handleGenerate = useCallback(() => {
        const inputs = { tone, audience, formality, goal, languageVariant, userInput };
        streamTextGeneration(tool, '', inputs, onGenerationComplete, setGeneratedContent, setIsLoading, setError);
    }, [tool, onGenerationComplete, tone, audience, formality, goal, languageVariant, userInput]);

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <Select label="Tone" value={tone} onChange={(e) => setTone(e.target.value)} options={tones} />
                <Select label="Audience" value={audience} onChange={(e) => setAudience(e.target.value)} options={audiences} />
                <Select label="Formality" value={formality} onChange={(e) => setFormality(e.target.value)} options={formalities} />
                <Select label="Primary Goal" value={goal} onChange={(e) => setGoal(e.target.value)} options={goals} />
                <Select label="Language Variant" value={languageVariant} onChange={(e) => setLanguageVariant(e.target.value)} options={languageVariants} />
            </div>
            <div className="relative flex-grow">
                 <textarea
                    value={userInput} onChange={(e) => setUserInput(e.target.value)}
                    placeholder={placeholder}
                    className="w-full h-full p-4 pr-12 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm" />
                {isSpeechSupported && (
                     <button
                        onClick={handleListen}
                        title={isSpeechSupported ? "Dictate text" : "Speech recognition not supported"}
                        className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
                     >
                         <MicrophoneIcon />
                     </button>
                )}
            </div>
            <button onClick={handleGenerate} disabled={isLoading || !userInput} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all">
                {isLoading ? <><Loader /> Analyzing...</> : 'Analyze Text'}
            </button>
            <div className="flex-grow h-1/2 min-h-[200px]">
                <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your detailed writing analysis will appear here." tool={tool} />
            </div>
        </div>
    );
};

export default AdvancedWritingTool;
