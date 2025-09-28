import React, { useState, useCallback } from 'react';
import { Tool, ToolComponentType, GenericToolProps, SocialMediaToolProps, VideoScriptToolProps, ImageInputToolProps, GroundedQAToolProps, ImageGeneratorToolProps, BlogPostToolProps } from '../types';
import { generateTextContent, generateTextFromImage, generateGroundedContent, generateImages, isApiAvailable } from '../services/geminiService';
import { Loader } from './Loader';

// --- Reusable AI Tool Components (defined within this file) ---

interface AiToolComponentProps {
  tool: Tool;
  language: string;
}

const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese', 'Russian', 'Arabic'];

const Select = ({ label, value, onChange, options }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: string[] }) => (
  <div className="w-full">
    <label className="block text-xs text-gray-400 mb-1">{label}</label>
    <select value={value} onChange={onChange} className="w-full p-2 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm">
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const GenericTool: React.FC<AiToolComponentProps> = ({ tool, language }) => {
  const { promptTemplate, placeholder } = tool.props as GenericToolProps;
  const [userInput, setUserInput] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (!userInput) return;
    if (!isApiAvailable()) {
      setError('Gemini API key is not configured.');
      return;
    }
    setIsLoading(true);
    setGeneratedContent('');
    setError('');

    try {
      let finalPrompt;
      if (tool.id === 'cover-letter' && userInput.includes('---JOB DESCRIPTION---')) {
        const parts = userInput.split('---JOB DESCRIPTION---');
        const experience = parts[0] || '';
        const jobDescription = parts[1] || '';
        finalPrompt = promptTemplate
          .replace('{userInput}', experience.trim())
          .replace('{jobDescription}', jobDescription.trim());
      } else {
        finalPrompt = promptTemplate.replace('{userInput}', userInput);
      }
      
      const result = await generateTextContent(finalPrompt, tool.systemInstruction, language);
      setGeneratedContent(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [userInput, promptTemplate, tool.systemInstruction, tool.id, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder={placeholder}
        className="w-full flex-grow p-4 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
      />
      <button
        onClick={handleGenerate}
        disabled={isLoading || !userInput}
        className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300"
      >
        {isLoading ? <><Loader /> Generating...</> : 'Generate'}
      </button>
      <div className="w-full flex-grow bg-black/30 border border-white/10 rounded-lg p-4 overflow-y-auto relative text-sm">
        {isLoading && <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-10"><Loader /><p className="mt-4 text-gray-300 animate-pulse">AI is thinking...</p></div>}
        {error && <div className="text-red-400 p-4 bg-red-900/50 rounded-lg">{error}</div>}
        {generatedContent ? (
          <>
            <button onClick={handleCopy} className="absolute top-3 right-3 bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors">
              {copied ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}
            </button>
            <pre className="whitespace-pre-wrap text-gray-200 font-sans leading-relaxed">{generatedContent}</pre>
          </>
        ) : (!isLoading && <div className="text-gray-500 flex items-center justify-center h-full">Your generated content will appear here.</div>)}
      </div>
    </div>
  );
};

const BlogPostTool: React.FC<AiToolComponentProps> = ({ tool, language }) => {
  const { promptTemplate, placeholder, tones, styles } = tool.props as BlogPostToolProps;
  const [userInput, setUserInput] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState(tones[0]);
  const [style, setStyle] = useState(styles[0]);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (!userInput) return;
    if (!isApiAvailable()) {
      setError('Gemini API key is not configured.');
      return;
    }
    setIsLoading(true);
    setGeneratedContent('');
    setError('');

    try {
      const finalPrompt = promptTemplate
        .replace('{userInput}', userInput)
        .replace('{keywords}', keywords || 'none')
        .replace('{tone}', tone)
        .replace('{style}', style);
        
      const result = await generateTextContent(finalPrompt, tool.systemInstruction, language);
      setGeneratedContent(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [userInput, keywords, tone, style, promptTemplate, tool.systemInstruction, language]);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select label="Tone" value={tone} onChange={(e) => setTone(e.target.value)} options={tones} />
        <Select label="Style" value={style} onChange={(e) => setStyle(e.target.value)} options={styles} />
        <div>
          <label className="block text-xs text-gray-400 mb-1">Optional Keywords</label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g., SEO, content marketing"
            className="w-full p-2 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
          />
        </div>
      </div>
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder={placeholder}
        className="w-full flex-grow p-4 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
        rows={6}
      />
      <button
        onClick={handleGenerate}
        disabled={isLoading || !userInput}
        className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300"
      >
        {isLoading ? <><Loader /> Generating...</> : 'Generate'}
      </button>
      <div className="w-full flex-grow bg-black/30 border border-white/10 rounded-lg relative flex text-sm">
      {isLoading && <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-10"><Loader /><p className="mt-4 text-gray-300 animate-pulse">AI is writing...</p></div>}
        {error && <div className="text-red-400 p-4 bg-red-900/50 rounded-lg">{error}</div>}
        {generatedContent ? (
          <>
            <button onClick={handleCopy} className="absolute top-3 right-3 bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors z-20">
              {copied ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}
            </button>
            <textarea
              value={generatedContent}
              onChange={(e) => setGeneratedContent(e.target.value)}
              className="w-full h-full p-4 bg-transparent border-none rounded-lg resize-none focus:outline-none text-gray-200 font-sans leading-relaxed"
            />
          </>
        ) : (!isLoading && <div className="text-gray-500 flex items-center justify-center h-full">Your generated blog post will appear here.</div>)}
      </div>
    </div>
  );
};

const SocialMediaTool: React.FC<AiToolComponentProps> = ({ tool, language }) => {
  const { promptTemplate, platforms, tones } = tool.props as SocialMediaToolProps;
  const [userInput, setUserInput] = useState('');
  const [platform, setPlatform] = useState(platforms[0]);
  const [tone, setTone] = useState(tones[0]);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (!userInput) return;
    if (!isApiAvailable()) {
      setError('Gemini API key is not configured.');
      return;
    }
    setIsLoading(true);
    setGeneratedContent('');
    setError('');

    try {
      const finalPrompt = promptTemplate
        .replace('{platform}', platform)
        .replace('{tone}', tone)
        .replace('{userInput}', userInput);

      const result = await generateTextContent(finalPrompt, tool.systemInstruction, language);
      setGeneratedContent(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [userInput, platform, tone, promptTemplate, tool.systemInstruction, language]);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex gap-4">
        <Select label="Platform" value={platform} onChange={(e) => setPlatform(e.target.value)} options={platforms} />
        <Select label="Tone" value={tone} onChange={(e) => setTone(e.target.value)} options={tones} />
      </div>
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="e.g., The launch of our new productivity app"
        className="w-full flex-grow p-4 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
        rows={5}
      />
      <button
        onClick={handleGenerate}
        disabled={isLoading || !userInput}
        className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300"
      >
        {isLoading ? <><Loader /> Generating...</> : 'Generate'}
      </button>
      <div className="w-full flex-grow bg-black/30 border border-white/10 rounded-lg p-4 overflow-y-auto relative text-sm">
      {isLoading && <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-10"><Loader /><p className="mt-4 text-gray-300 animate-pulse">AI is thinking...</p></div>}
        {error && <div className="text-red-400 p-4 bg-red-900/50 rounded-lg">{error}</div>}
        {generatedContent ? (
          <>
            <button onClick={handleCopy} className="absolute top-3 right-3 bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors">
              {copied ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}
            </button>
            <pre className="whitespace-pre-wrap text-gray-200 font-sans leading-relaxed">{generatedContent}</pre>
          </>
        ) : (!isLoading && <div className="text-gray-500 flex items-center justify-center h-full">Your generated content will appear here.</div>)}
      </div>
    </div>
  );
};

const VideoScriptTool: React.FC<AiToolComponentProps> = ({ tool, language }) => {
  const { promptTemplate, platforms, styles } = tool.props as VideoScriptToolProps;
  const [userInput, setUserInput] = useState('');
  const [platform, setPlatform] = useState(platforms[0]);
  const [style, setStyle] = useState(styles[0]);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (!userInput) return;
    if (!isApiAvailable()) {
      setError('Gemini API key is not configured.');
      return;
    }
    setIsLoading(true);
    setGeneratedContent('');
    setError('');

    try {
      const finalPrompt = promptTemplate
        .replace('{platform}', platform)
        .replace('{style}', style)
        .replace('{userInput}', userInput);
      const result = await generateTextContent(finalPrompt, tool.systemInstruction, language);
      setGeneratedContent(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [userInput, platform, style, promptTemplate, tool.systemInstruction, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex gap-4">
        <Select label="Platform" value={platform} onChange={(e) => setPlatform(e.target.value)} options={platforms} />
        <Select label="Style" value={style} onChange={(e) => setStyle(e.target.value)} options={styles} />
      </div>
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="e.g., A quick tutorial on how to use our new feature"
        className="w-full flex-grow p-4 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
        rows={5}
      />
      <button
        onClick={handleGenerate}
        disabled={isLoading || !userInput}
        className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300"
      >
        {isLoading ? <><Loader /> Generating...</> : 'Generate'}
      </button>
      <div className="w-full flex-grow bg-black/30 border border-white/10 rounded-lg p-4 overflow-y-auto relative text-sm">
        {isLoading && <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-10"><Loader /><p className="mt-4 text-gray-300 animate-pulse">AI is thinking...</p></div>}
        {error && <div className="text-red-400 p-4 bg-red-900/50 rounded-lg">{error}</div>}
        {generatedContent ? (
          <>
            <button onClick={handleCopy} className="absolute top-3 right-3 bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors">
              {copied ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}
            </button>
            <pre className="whitespace-pre-wrap text-gray-200 font-sans leading-relaxed">{generatedContent}</pre>
          </>
        ) : (!isLoading && <div className="text-gray-500 flex items-center justify-center h-full">Your generated content will appear here.</div>)}
      </div>
    </div>
  );
};

const ImageInputTool: React.FC<AiToolComponentProps> = ({ tool, language }) => {
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [userInput, image, promptTemplate, tool.systemInstruction, language]);

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex gap-4 h-2/5">
        <div className="w-1/2">
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
            className="w-1/2 h-full p-4 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-sm"
        />
      </div>
      <button onClick={handleGenerate} disabled={isLoading || !image} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all">
        {isLoading ? <><Loader /> Generating...</> : 'Generate'}
      </button>
      <div className="w-full flex-grow bg-black/30 border border-white/10 rounded-lg p-4 overflow-y-auto relative text-sm">
        {isLoading && <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-10"><Loader /><p className="mt-4 text-gray-300 animate-pulse">AI is analyzing...</p></div>}
        {error && <div className="text-red-400 p-4 bg-red-900/50 rounded-lg">{error}</div>}
        {generatedContent ? <pre className="whitespace-pre-wrap text-gray-200 font-sans leading-relaxed">{generatedContent}</pre> : (!isLoading && <div className="text-gray-500 flex items-center justify-center h-full">Generated caption & alt text will appear here.</div>)}
      </div>
    </div>
  );
};

const ImageGeneratorTool: React.FC<AiToolComponentProps> = ({ tool }) => {
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [userInput]);

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

const GroundedQATool: React.FC<AiToolComponentProps> = ({ tool }) => {
  const { placeholder } = tool.props as GroundedQAToolProps;
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState<{text: string; sources: any[]} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [userInput]);
  
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
        {isLoading ? <><Loader /> Researching...</> : 'Generate'}
      </button>
      <div className="w-full flex-grow bg-black/30 border border-white/10 rounded-lg p-4 overflow-y-auto relative text-sm">
        {isLoading && <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-10"><Loader /><p className="mt-4 text-gray-300 animate-pulse">Searching the web...</p></div>}
        {error && <div className="text-red-400 p-4 bg-red-900/50 rounded-lg">{error}</div>}
        {result ? (
          <div>
            <pre className="whitespace-pre-wrap text-gray-200 font-sans leading-relaxed">{result.text}</pre>
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


// --- Main ContentPanel Component ---

interface ContentPanelProps {
  tool: Tool;
  onBack: () => void;
}
const GlobeAltIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m0 0a9 9 0 019-9m-9 9a9 9 0 009 9" /></svg>;

export const ContentPanel: React.FC<ContentPanelProps> = ({ tool, onBack }) => {
  const [language, setLanguage] = useState(LANGUAGES[0]);

  const showLanguageSelector = [
    ToolComponentType.Generic,
    ToolComponentType.SocialMedia,
    ToolComponentType.VideoScript,
    ToolComponentType.ImageInput,
    ToolComponentType.BlogPost,
  ].includes(tool.component);

  const renderTool = () => {
    const props = { tool, language };
    switch (tool.component) {
      case ToolComponentType.SocialMedia: return <SocialMediaTool {...props} />;
      case ToolComponentType.VideoScript: return <VideoScriptTool {...props} />;
      case ToolComponentType.BlogPost: return <BlogPostTool {...props} />;
      case ToolComponentType.ImageInput: return <ImageInputTool {...props} />;
      case ToolComponentType.ImageGenerator: return <ImageGeneratorTool {...props} />;
      case ToolComponentType.GroundedQA: return <GroundedQATool {...props} />;
      case ToolComponentType.Generic:
      default:
        return <GenericTool {...props} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full gap-6 opacity-0 animate-fade-in-up">
      <div className="w-full md:w-2/3 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button onClick={onBack} className="mr-4 p-2 rounded-full hover:bg-white/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div className="text-cyan-400 mr-3">{tool.icon}</div>
            <div><h2 className="text-2xl font-bold text-white">{tool.name}</h2></div>
          </div>
          {showLanguageSelector && (
             <div className="relative flex items-center gap-2">
                <GlobeAltIcon />
                <select 
                    value={language} 
                    onChange={e => setLanguage(e.target.value)}
                    className="bg-transparent border-0 text-gray-200 text-sm focus:outline-none focus:ring-0 appearance-none pr-4"
                    style={{backgroundImage: 'none'}}
                >
                    {LANGUAGES.map(lang => <option key={lang} value={lang} className="bg-[#161B22]">{lang}</option>)}
                </select>
            </div>
          )}
        </div>
        <div className="flex-grow">
          {renderTool()}
        </div>
      </div>
      <div className="w-full md:w-1/3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-6 overflow-y-auto">
        <ContextItem title="Purpose" text={tool.context.purpose} />
        <ContextItem title="Benefit" text={tool.context.benefit} />
        <ContextItem title="Pro Feature" text={tool.context.proFeature} />
      </div>
    </div>
  );
};

const ContextItem = ({ title, text }: { title: string, text: string }) => (
  <div>
    <h3 className="text-lg font-semibold text-cyan-400 mb-2">{title}</h3>
    <p className="text-gray-300 text-sm leading-relaxed">{text}</p>
  </div>
);