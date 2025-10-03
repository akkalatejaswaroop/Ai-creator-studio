import React, { useState, useCallback } from 'react';
import { AiToolComponentProps, SentimentAnalyzerToolProps } from '../../types';
import { generateTextStream } from '../../services/geminiService';
import { Loader } from '../Loader';

interface SentimentResult {
    overall_sentiment: string;
    sentiment_score: number;
    key_emotions: string[];
    summary: string;
}

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
            <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={placeholder}
                className="w-full flex-grow p-4 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
            />
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