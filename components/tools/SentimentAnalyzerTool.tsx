import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AiToolComponentProps, SentimentAnalyzerToolProps } from '../../types';
import { generateTextStream } from '../../services/geminiService';
import { Loader } from '../Loader';

interface SentimentResult {
    overall_sentiment: string;
    sentiment_score: number;
    key_emotions: string[];
    summary: string;
}

const MicrophoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 016 0v8.25a3 3 0 01-3 3z" /></svg>;

const getSentimentColor = (score: number) => {
    if (score > 0.3) return 'text-green-400';
    if (score < -0.3) return 'text-red-400';
    return 'text-yellow-400';
};

const SentimentAnalyzerTool: React.FC<AiToolComponentProps> = ({ tool, language, onGenerationComplete }) => {
    const { placeholder } = tool.props as SentimentAnalyzerToolProps;
    const [userInput, setUserInput] = useState('');
    const [result, setResult] = useState<SentimentResult | null>(null);
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

    const handleAnalyze = useCallback(async () => {
        if (!userInput.trim()) return;

        setIsLoading(true);
        setResult(null);
        setError('');

        try {
            const finalPrompt = (tool.props as any).promptTemplate.replace('{userInput}', userInput);

            let fullResponse = '';
            for await (const chunk of generateTextStream(finalPrompt, tool.systemInstruction, language)) {
                fullResponse += chunk;
            }

            const cleanedJsonString = fullResponse.replace(/```json\n?|\n?```/g, '').trim();
            const parsedResult = JSON.parse(cleanedJsonString);
            setResult(parsedResult);
            onGenerationComplete(userInput, cleanedJsonString);
        } catch (err) {
            setError('Failed to analyze sentiment. The AI response may not be valid JSON.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [userInput, tool, language, onGenerationComplete]);

    return (
        <div className="flex flex-col h-full gap-4">
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
            <button
                onClick={handleAnalyze}
                disabled={isLoading || !userInput}
                className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all"
            >
                {isLoading ? <><Loader /> Analyzing...</> : 'Analyze Sentiment'}
            </button>
            <div className="w-full flex-grow bg-black/30 border border-white/10 rounded-lg p-4 overflow-y-auto relative text-sm">
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-10">
                        <Loader />
                        <p className="mt-4 text-gray-300 animate-pulse">Analyzing text...</p>
                    </div>
                )}
                {error && <div className="text-red-400 p-4 bg-red-900/50 rounded-lg">{error}</div>}
                {result ? (
                    <div className="space-y-4 animate-fade-in-up">
                        <div>
                            <h3 className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Overall Sentiment</h3>
                            <p className={`text-2xl font-bold ${getSentimentColor(result.sentiment_score)}`}>{result.overall_sentiment}</p>
                        </div>
                        <div>
                            <h3 className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Summary</h3>
                            <p className="text-gray-300">{result.summary}</p>
                        </div>
                        <div>
                            <h3 className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Key Emotions</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {result.key_emotions.map((emotion) => (
                                    <span key={emotion} className="bg-cyan-500/20 text-cyan-300 text-xs font-medium px-2.5 py-1 rounded-full">
                                        {emotion}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    !isLoading && <div className="text-gray-500 flex items-center justify-center h-full">Your sentiment analysis will appear here.</div>
                )}
            </div>
        </div>
    );
};

export default SentimentAnalyzerTool;