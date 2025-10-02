import React, { useState, useCallback } from 'react';
import { AiToolComponentProps, ImageGeneratorToolProps } from '../../types';
import { generateImages, isApiAvailable } from '../../services/geminiService';
import { Loader } from '../Loader';

const ImageGeneratorTool: React.FC<AiToolComponentProps> = ({ tool, onGenerationComplete }) => {
    const { placeholder } = tool.props as ImageGeneratorToolProps;
    const [userInput, setUserInput] = useState('');
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
  
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
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={placeholder}
          className="w-full p-4 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
          rows={3}
        />
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
