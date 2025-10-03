import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AiToolComponentProps, DualTextareaToolProps } from '../../types';
import { Loader } from '../Loader';
import { OutputDisplay } from './shared/OutputDisplay';
import { streamTextGeneration } from './shared/utils';

const MicrophoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 016 0v8.25a3 3 0 01-3 3z" /></svg>;

const DualTextareaTool: React.FC<AiToolComponentProps> = ({ tool, language, onGenerationComplete }) => {
    const { placeholder1, placeholder2, label1, label2 } = tool.props as DualTextareaToolProps;
    const [userInput1, setUserInput1] = useState('');
    const [userInput2, setUserInput2] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    // Speech recognition state
    const [isSpeechSupported, setIsSpeechSupported] = useState(false);
    const [listeningTarget, setListeningTarget] = useState<'input1' | 'input2' | null>(null);
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
                    if (listeningTarget === 'input1') {
                        setUserInput1(toAdd);
                    } else if (listeningTarget === 'input2') {
                        setUserInput2(toAdd);
                    }
                }
            };
            recognition.onend = () => setListeningTarget(null);
            recognitionRef.current = recognition;
        }
        return () => recognitionRef.current?.stop();
    }, [listeningTarget]);

    const handleListen = (target: 'input1' | 'input2') => {
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
        const inputs = { userInput1, userInput2 };
        streamTextGeneration(tool, language, inputs, onGenerationComplete, setGeneratedContent, setIsLoading, setError);
    }, [tool, language, onGenerationComplete, userInput1, userInput2]);

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex flex-col md:flex-row gap-4 flex-grow min-h-0">
                <div className="w-full md:w-1/2 flex flex-col gap-2 h-full">
                    <label className="text-sm font-semibold text-gray-300">{label1}</label>
                    <div className="relative w-full h-full">
                        <textarea
                            value={userInput1}
                            onChange={(e) => setUserInput1(e.target.value)}
                            placeholder={placeholder1}
                            className="w-full h-full p-3 pr-12 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
                        />
                        {isSpeechSupported && (
                            <button onClick={() => handleListen('input1')} title="Dictate" className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${listeningTarget === 'input1' ? 'bg-red-500 text-white animate-pulse' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}>
                                <MicrophoneIcon />
                            </button>
                        )}
                    </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col gap-2 h-full">
                    <label className="text-sm font-semibold text-gray-300">{label2}</label>
                    <div className="relative w-full h-full">
                        <textarea
                            value={userInput2}
                            onChange={(e) => setUserInput2(e.target.value)}
                            placeholder={placeholder2}
                            className="w-full h-full p-3 pr-12 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
                        />
                         {isSpeechSupported && (
                            <button onClick={() => handleListen('input2')} title="Dictate" className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${listeningTarget === 'input2' ? 'bg-red-500 text-white animate-pulse' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}>
                                <MicrophoneIcon />
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <button onClick={handleGenerate} disabled={isLoading || !userInput1 || !userInput2} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all">
                {isLoading ? <><Loader /> Generating...</> : 'Generate'}
            </button>
            <div className="h-2/5 shrink-0">
                <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your generated content will appear here." tool={tool} />
            </div>
        </div>
    );
};

export default DualTextareaTool;