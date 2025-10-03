import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AiToolComponentProps, ImageGeneratorToolProps } from '../../types';
import { generateImages, isApiAvailable } from '../../services/geminiService';
import { Loader } from '../Loader';

const MicrophoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 016 0v8.25a3 3 0 01-3 3z" /></svg>;

const ImageGeneratorTool: React.FC<AiToolComponentProps> = ({ tool, onGenerationComplete }) => {
    const { placeholder } = tool.props as ImageGeneratorToolProps;
    const [userInput, setUserInput] = useState('');
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
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
      setGeneratedImages([]);
      setError('');
  
      try {
        const result = await generateImages(userInput);
        setGeneratedImages(result);
        onGenerationComplete(userInput, "Generated an image.");
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
          {isLoading ? <><Loader /> Generating...</> : 'Generate'}
        </button>
        <div className="w-full flex-grow bg-black/30 border border-white/10 rounded-lg p-4 overflow-y-auto relative text-sm flex items-center justify-center">
          {isLoading && <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-10"><Loader /><p className="mt-4 text-gray-300 animate-pulse">AI is creating...</p></div>}
          {error && <div className="text-red-400 p-4 bg-red-900/50 rounded-lg">{error}</div>}
          {generatedImages.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {generatedImages.map((imgData, index) => <img key={index} src={`data:image/jpeg;base64,${imgData}`} alt={`Generated art ${index + 1}`} className="rounded-lg object-contain max-h-full" />)}
            </div>
          ) : (!isLoading && <div className="text-gray-500">Your generated images will appear here.</div>)}
        </div>
      </div>
    );
};

export default ImageGeneratorTool;