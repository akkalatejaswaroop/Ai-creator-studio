import React, { useState, useCallback } from 'react';
import { AiToolComponentProps, ImageInputToolProps } from '../../types';
import { generateTextFromImage, isApiAvailable } from '../../services/geminiService';
import { Loader } from '../Loader';
import { OutputDisplay } from './shared/OutputDisplay';

const ImageInputTool: React.FC<AiToolComponentProps> = ({ tool, language, onGenerationComplete }) => {
    const { promptTemplate, placeholder } = tool.props as ImageInputToolProps;
    const [userInput, setUserInput] = useState('');
    const [image, setImage] = useState<{ file: File; dataUrl: string } | null>(null);
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
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
          <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={placeholder}
              className="w-full md:w-1/2 h-full p-4 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-sm"
          />
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
