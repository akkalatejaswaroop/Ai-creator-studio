import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AiToolComponentProps, VideoScriptToolProps } from '../../types';
import { Loader } from '../Loader';
import { Select } from './shared/Select';
import { OutputDisplay } from './shared/OutputDisplay';
import { streamTextGeneration } from './shared/utils';

const MicrophoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 016 0v8.25a3 3 0 01-3 3z" /></svg>;

const VideoScriptTool: React.FC<AiToolComponentProps> = ({ tool, language, onGenerationComplete }) => {
    const { platforms, styles } = tool.props as VideoScriptToolProps;
    const [userInput, setUserInput] = useState('');
    const [platform, setPlatform] = useState(platforms[0]);
    const [style, setStyle] = useState(styles[0]);
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
        const inputs = { platform, style, userInput };
        streamTextGeneration(tool, language, inputs, onGenerationComplete, setGeneratedContent, setIsLoading, setError);
    }, [tool, language, onGenerationComplete, platform, style, userInput]);

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex gap-4">
                <Select label="Platform" value={platform} onChange={(e) => setPlatform(e.target.value)} options={platforms} />
                <Select label="Style" value={style} onChange={(e) => setStyle(e.target.value)} options={styles} />
            </div>
            <div className="relative flex-grow">
                <textarea
                    value={userInput} onChange={(e) => setUserInput(e.target.value)}
                    placeholder="e.g., A quick tutorial on how to use our new feature"
                    className="w-full h-full p-4 pr-12 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm" rows={5} />
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
            <button onClick={handleGenerate} disabled={isLoading || !userInput} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300">
                {isLoading ? <><Loader /> Generating...</> : 'Generate'}
            </button>
            <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your generated script will appear here." tool={tool} />
        </div>
    );
};

export default VideoScriptTool;