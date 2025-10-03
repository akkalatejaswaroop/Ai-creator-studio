import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AiToolComponentProps, GroundedQAToolProps } from '../../types';
import { generateGroundedContent, isApiAvailable } from '../../services/geminiService';
import { Loader } from '../Loader';

const MicrophoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 016 0v8.25a3 3 0 01-3 3z" /></svg>;

const GroundedQATool: React.FC<AiToolComponentProps> = ({ tool, onGenerationComplete }) => {
    const { placeholder } = tool.props as GroundedQAToolProps;
    const [userInput, setUserInput] = useState('');
    const [result, setResult] = useState<{text: string; sources: any[]} | null>(null);
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
        <div className="relative">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={placeholder}
              className="w-full p-4 pr-12 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
              rows={3}
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