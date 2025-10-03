import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AiToolComponentProps, ImageInputToolProps } from '../../types';
import { generateTextFromImage, isApiAvailable } from '../../services/geminiService';
import { Loader } from '../Loader';
import { OutputDisplay } from './shared/OutputDisplay';

const MicrophoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 016 0v8.25a3 3 0 01-3 3z" /></svg>;

const ImageInputTool: React.FC<AiToolComponentProps> = ({ tool, language, onGenerationComplete }) => {
    const { promptTemplate, placeholder } = tool.props as ImageInputToolProps;
    const [userInput, setUserInput] = useState('');
    const [image, setImage] = useState<{ file: File; dataUrl: string } | null>(null);
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
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage({ file, dataUrl: reader.result as string });
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleGenerate = useCallback(async () => {
      if (!image) return;
      if (!isApiAvailable()) {
        setError('Gemini API key is not configured.');
        return;
      }
      setIsLoading(true);
      setGeneratedContent('');
      setError('');
  
      try {
        const finalPrompt = promptTemplate.replace('{userInput}', userInput);
        const base64Data = image.dataUrl.split(',')[1];
        const result = await generateTextFromImage(finalPrompt, tool.systemInstruction, { data: base64Data, mimeType: image.file.type }, language);
        setGeneratedContent(result);
        onGenerationComplete(userInput || 'Image Analysis', result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    }, [userInput, image, promptTemplate, tool.systemInstruction, language, onGenerationComplete]);
  
    return (
      <div className="flex flex-col h-full gap-4">
        <div className="flex flex-col md:flex-row gap-4 h-2/5">
          <div className="w-full md:w-1/2 h-full">
              <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-full p-4 bg-black/30 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:bg-black/50 transition-colors">
                  {image ? <img src={image.dataUrl} alt="Preview" className="max-h-full max-w-full object-contain rounded-md" /> : (
                      <div className="text-center text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                          <p className="mt-2 text-sm">Click to upload or drag & drop</p>
                      </div>
                  )}
              </label>
              <input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
          </div>
          <div className="relative w-full md:w-1/2 h-full">
            <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={placeholder}
                className="w-full h-full p-4 pr-12 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-sm"
            />
            {isSpeechSupported && (
                <button
                    onClick={handleListen}
                    title="Dictate context"
                    className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
                >
                    <MicrophoneIcon />
                </button>
            )}
          </div>
        </div>
        <button onClick={handleGenerate} disabled={isLoading || !image} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all">
          {isLoading ? <><Loader /> Generating...</> : 'Generate'}
        </button>
        <div className="flex-grow min-h-0">
          <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Generated caption & alt text will appear here." tool={tool} />
        </div>
      </div>
    );
};

export default ImageInputTool;