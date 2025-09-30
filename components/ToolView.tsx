import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Tool, ToolComponentType, GenericToolProps, SocialMediaToolProps, VideoScriptToolProps, ImageInputToolProps, GroundedQAToolProps, ImageGeneratorToolProps, BlogPostToolProps, GrammarToolProps, ToneChangerToolProps, EmailWriterToolProps, StudyToolProps, SingleSelectToolProps, DoubleSelectToolProps, DualTextareaToolProps, IndustryInputToolProps, GenerationHistoryItem } from '../types';
import { generateTextStream, generateTextFromImage, generateGroundedContent, generateImages, isApiAvailable } from '../services/geminiService';
import { Loader } from './Loader';

// --- Reusable AI Tool Components (defined within this file) ---

interface AiToolComponentProps {
  tool: Tool;
  language: string;
  onGenerationComplete: (input: string, output: string) => void;
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

const ActionButtons = ({ text, toolName }: { text: string, toolName: string }) => {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${toolName.toLowerCase().replace(/\s/g, '_')}_output.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFeedback = (type: 'up' | 'down') => {
    setFeedback(type);
    // In a real app, you'd send this feedback to a server.
    // For now, we just show a temporary state.
  };

  return (
    <div className="absolute top-3 right-3 flex items-center gap-2">
       {/* Feedback Buttons */}
       <div className="flex items-center bg-white/10 rounded-lg p-0.5">
          <button onClick={() => handleFeedback('up')} className={`p-1.5 rounded-md ${feedback === 'up' ? 'bg-green-500/50' : 'hover:bg-white/20'}`} aria-label="Good response">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 18.236V6.73c0-.355.19-.684.493-.865l1.8-1.04c.306-.177.68-.177.986 0l1.8 1.04c.303.181.493.51.493.865v3.27z" /></svg>
          </button>
          <div className="w-px h-4 bg-white/20"></div>
          <button onClick={() => handleFeedback('down')} className={`p-1.5 rounded-md ${feedback === 'down' ? 'bg-red-500/50' : 'hover:bg-white/20'}`} aria-label="Bad response">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.738 3h4.017c.163 0 .326.02.485.06L17 5.764V17.27c0 .355-.19.684-.493.865l-1.8 1.04a.996.996 0 01-.986 0l-1.8-1.04a.996.996 0 01-.493-.865v-3.27z" /></svg>
          </button>
       </div>
       {/* Action Buttons */}
       <button onClick={handleDownload} className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors" aria-label="Download content">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
       </button>
       <button onClick={handleCopy} className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors" aria-label="Copy content">
         {copied ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}
       </button>
    </div>
  );
};

const OutputDisplay = ({ isLoading, error, content, defaultText, tool }: { isLoading: boolean; error: string; content: string; defaultText: string; tool: Tool; }) => {
    const outputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (outputRef.current && content) {
            // Render Markdown
            // @ts-ignore
            outputRef.current.innerHTML = window.marked.parse(content);

            // Apply syntax highlighting to code blocks within the markdown
            outputRef.current.querySelectorAll('pre code').forEach((block) => {
                // @ts-ignore
                window.hljs.highlightElement(block);
            });
        } else if (outputRef.current) {
            outputRef.current.innerHTML = '';
        }
      }, [content]);

    return (
    <div className="w-full h-full flex-grow bg-black/30 border border-white/10 rounded-lg p-4 pt-12 overflow-y-auto relative text-sm">
        {isLoading && !content && <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-10"><Loader /><p className="mt-4 text-gray-300 animate-pulse">AI is thinking...</p></div>}
        {error && <div className="text-red-400 p-4 bg-red-900/50 rounded-lg">{error}</div>}
        
        {content ? <ActionButtons text={content} toolName={tool.name} /> : null}
        
        <div ref={outputRef} className="markdown-body"></div>

        {!isLoading && !content && !error && (
            <div className="text-gray-500 flex items-center justify-center h-full">{defaultText}</div>
        )}
        {isLoading && content && (
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse ml-1"></div>
        )}
    </div>
    );
};

const GenericTool: React.FC<AiToolComponentProps> = ({ tool, language, onGenerationComplete }) => {
  const { promptTemplate, placeholder } = tool.props as GenericToolProps;
  const [userInput, setUserInput] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
      const finalPrompt = promptTemplate.replace('{userInput}', userInput);
      let fullResponse = "";
      for await (const chunk of generateTextStream(finalPrompt, tool.systemInstruction, language)) {
        fullResponse += chunk;
        setGeneratedContent(fullResponse);
      }
      onGenerationComplete(userInput, fullResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [userInput, promptTemplate, tool.systemInstruction, language, onGenerationComplete]);

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
      <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your generated content will appear here." tool={tool} />
    </div>
  );
};


const BlogPostTool: React.FC<AiToolComponentProps> = ({ tool, language, onGenerationComplete }) => {
  const { promptTemplate, placeholder, tones, styles, audiences } = tool.props as BlogPostToolProps;
  const [userInput, setUserInput] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState(tones[0]);
  const [style, setStyle] = useState(styles[0]);
  const [audience, setAudience] = useState(audiences[0]);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
        .replace('{style}', style)
        .replace('{audience}', audience);
        
      let fullResponse = "";
      for await (const chunk of generateTextStream(finalPrompt, tool.systemInstruction, language)) {
        fullResponse += chunk;
        setGeneratedContent(fullResponse);
      }
      onGenerationComplete(userInput, fullResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [userInput, keywords, tone, style, audience, promptTemplate, tool.systemInstruction, language, onGenerationComplete]);
  
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select label="Tone" value={tone} onChange={(e) => setTone(e.target.value)} options={tones} />
        <Select label="Style" value={style} onChange={(e) => setStyle(e.target.value)} options={styles} />
        <Select label="Audience" value={audience} onChange={(e) => setAudience(e.target.value)} options={audiences} />
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
      <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your generated blog post will appear here." tool={tool} />
    </div>
  );
};

const getHandleGenerate = (
  props: { tool: Tool; language: string; onGenerationComplete: (input: string, output: string) => void },
  inputs: Record<string, string>
) => {
  return async (
    setGeneratedContent: React.Dispatch<React.SetStateAction<string>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const { tool, language, onGenerationComplete } = props;

    const hasAllInputs = Object.values(inputs).every(Boolean);
    if (!hasAllInputs) return;
    if (!isApiAvailable()) {
      setError('Gemini API key is not configured.');
      return;
    }

    setIsLoading(true);
    setGeneratedContent('');
    setError('');

    try {
      let finalPrompt = (tool.props as any).promptTemplate;
      let inputSummary = "";
      Object.entries(inputs).forEach(([key, value]) => {
        finalPrompt = finalPrompt.replace(new RegExp(`{${key}}`, 'g'), value);
        if (key.startsWith('userInput')) inputSummary += value + " ";
      });

      let fullResponse = "";
      for await (const chunk of generateTextStream(finalPrompt, tool.systemInstruction, language)) {
        fullResponse += chunk;
        setGeneratedContent(fullResponse);
      }
      onGenerationComplete(inputSummary.trim(), fullResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
};

const SocialMediaTool: React.FC<AiToolComponentProps> = (props) => {
  const { tool } = props;
  const { platforms, tones } = tool.props as SocialMediaToolProps;
  const [userInput, setUserInput] = useState('');
  const [platform, setPlatform] = useState(platforms[0]);
  const [tone, setTone] = useState(tones[0]);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = useCallback(() => {
    const handler = getHandleGenerate(props, { platform, tone, userInput });
    handler(setGeneratedContent, setIsLoading, setError);
  }, [props, platform, tone, userInput]);

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex gap-4">
        <Select label="Platform" value={platform} onChange={(e) => setPlatform(e.target.value)} options={platforms} />
        <Select label="Tone" value={tone} onChange={(e) => setTone(e.target.value)} options={tones} />
      </div>
      <textarea
        value={userInput} onChange={(e) => setUserInput(e.target.value)}
        placeholder="e.g., The launch of our new productivity app"
        className="w-full flex-grow p-4 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm" rows={5} />
      <button onClick={handleGenerate} disabled={isLoading || !userInput} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300">
        {isLoading ? <><Loader /> Generating...</> : 'Generate'}
      </button>
      <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your generated post will appear here." tool={tool} />
    </div>
  );
};
const VideoScriptTool: React.FC<AiToolComponentProps> = (props) => {
    const { tool } = props;
    const { platforms, styles } = tool.props as VideoScriptToolProps;
    const [userInput, setUserInput] = useState('');
    const [platform, setPlatform] = useState(platforms[0]);
    const [style, setStyle] = useState(styles[0]);
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = useCallback(() => {
        const handler = getHandleGenerate(props, { platform, style, userInput });
        handler(setGeneratedContent, setIsLoading, setError);
    }, [props, platform, style, userInput]);

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex gap-4">
                <Select label="Platform" value={platform} onChange={(e) => setPlatform(e.target.value)} options={platforms} />
                <Select label="Style" value={style} onChange={(e) => setStyle(e.target.value)} options={styles} />
            </div>
            <textarea
                value={userInput} onChange={(e) => setUserInput(e.target.value)}
                placeholder="e.g., A quick tutorial on how to use our new feature"
                className="w-full flex-grow p-4 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm" rows={5} />
            <button onClick={handleGenerate} disabled={isLoading || !userInput} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300">
                {isLoading ? <><Loader /> Generating...</> : 'Generate'}
            </button>
            <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your generated script will appear here." tool={tool} />
        </div>
    );
};
const GrammarTool: React.FC<AiToolComponentProps> = (props) => {
    const { tool } = props;
    const { placeholder, styles } = tool.props as GrammarToolProps;
    const [userInput, setUserInput] = useState('');
    const [style, setStyle] = useState(styles[0]);
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = useCallback(() => {
        const handler = getHandleGenerate(props, { style, userInput });
        handler(setGeneratedContent, setIsLoading, setError);
    }, [props, style, userInput]);

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="max-w-xs">
                <Select label="Target Writing Style" value={style} onChange={(e) => setStyle(e.target.value)} options={styles} />
            </div>
            <textarea
                value={userInput} onChange={(e) => setUserInput(e.target.value)}
                placeholder={placeholder}
                className="w-full flex-grow p-4 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm" />
            <button onClick={handleGenerate} disabled={isLoading || !userInput} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all">
                {isLoading ? <><Loader /> Generating...</> : 'Generate'}
            </button>
            <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your corrected text will appear here." tool={tool} />
        </div>
    );
};
const ToneChangerTool: React.FC<AiToolComponentProps> = (props) => {
    const { tool } = props;
    const { placeholder, tones, intensities } = tool.props as ToneChangerToolProps;
    const [userInput, setUserInput] = useState('');
    const [tone, setTone] = useState(tones[0]);
    const [intensity, setIntensity] = useState(intensities[1]);
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const handleGenerate = useCallback(() => {
        const handler = getHandleGenerate(props, { intensity, tone, userInput });
        handler(setGeneratedContent, setIsLoading, setError);
    }, [props, intensity, tone, userInput]);

    return (
      <div className="flex flex-col h-full gap-4">
      <div className="flex gap-4">
        <Select label="Target Tone" value={tone} onChange={(e) => setTone(e.target.value)} options={tones} />
        <Select label="Intensity" value={intensity} onChange={(e) => setIntensity(e.target.value)} options={intensities} />
      </div>
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder={placeholder}
        className="w-full flex-grow p-4 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
      />
      <button onClick={handleGenerate} disabled={isLoading || !userInput} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all">
        {isLoading ? <><Loader /> Generating...</> : 'Generate'}
      </button>
      <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your rewritten text will appear here." tool={tool} />
    </div>
    );
};
const EmailWriterTool: React.FC<AiToolComponentProps> = (props) => {
    const { tool } = props;
    const { placeholder, politenessLevels } = tool.props as EmailWriterToolProps;
    const [userInput, setUserInput] = useState('');
    const [politeness, setPoliteness] = useState(politenessLevels[0]);
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = useCallback(() => {
        const handler = getHandleGenerate(props, { politeness, userInput });
        handler(setGeneratedContent, setIsLoading, setError);
    }, [props, politeness, userInput]);

    return (
        <div className="flex flex-col h-full gap-4">
          <div className="max-w-xs">
            <Select label="Politeness Level" value={politeness} onChange={(e) => setPoliteness(e.target.value)} options={politenessLevels} />
          </div>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={placeholder}
            className="w-full flex-grow p-4 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
          />
          <button onClick={handleGenerate} disabled={isLoading || !userInput} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all">
            {isLoading ? <><Loader /> Generating...</> : 'Generate'}
          </button>
          <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your generated email will appear here." tool={tool} />
        </div>
      );
};
const StudyTool: React.FC<AiToolComponentProps> = (props) => {
    const { tool } = props;
    const { placeholder, difficulties } = tool.props as StudyToolProps;
    const [userInput, setUserInput] = useState('');
    const [difficulty, setDifficulty] = useState(difficulties[0]);
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = useCallback(() => {
        const handler = getHandleGenerate(props, { difficulty, userInput });
        handler(setGeneratedContent, setIsLoading, setError);
    }, [props, difficulty, userInput]);

    return (
        <div className="flex flex-col h-full gap-4">
          <div className="max-w-xs">
            <Select label="Difficulty Level" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} options={difficulties} />
          </div>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={placeholder}
            className="w-full flex-grow p-4 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
          />
          <button onClick={handleGenerate} disabled={isLoading || !userInput} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all">
            {isLoading ? <><Loader /> Generating...</> : 'Generate'}
          </button>
          <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your study guide will appear here." tool={tool} />
        </div>
      );
};
const SingleSelectTool: React.FC<AiToolComponentProps> = (props) => {
    const { tool } = props;
    const { placeholder, select } = tool.props as SingleSelectToolProps;
    const [userInput, setUserInput] = useState('');
    const [selectValue, setSelectValue] = useState(select.options[0]);
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = useCallback(() => {
        const handler = getHandleGenerate(props, { selectValue, userInput });
        handler(setGeneratedContent, setIsLoading, setError);
    }, [props, selectValue, userInput]);

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="max-w-xs">
                <Select label={select.label} value={selectValue} onChange={(e) => setSelectValue(e.target.value)} options={select.options} />
            </div>
            <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={placeholder}
                className="w-full flex-grow p-4 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
            />
            <button onClick={handleGenerate} disabled={isLoading || !userInput} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all">
                {isLoading ? <><Loader /> Generating...</> : 'Generate'}
            </button>
            <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your generated content will appear here." tool={tool} />
        </div>
    );
};
const DoubleSelectTool: React.FC<AiToolComponentProps> = (props) => {
    const { tool } = props;
    const { placeholder, select1, select2 } = tool.props as DoubleSelectToolProps;
    const [userInput, setUserInput] = useState('');
    const [selectValue1, setSelectValue1] = useState(select1.options[0]);
    const [selectValue2, setSelectValue2] = useState(select2.options[0]);
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
  
    const handleGenerate = useCallback(() => {
        const handler = getHandleGenerate(props, { select1: selectValue1, select2: selectValue2, userInput });
        handler(setGeneratedContent, setIsLoading, setError);
    }, [props, selectValue1, selectValue2, userInput]);

    return (
      <div className="flex flex-col h-full gap-4">
        <div className="flex gap-4">
          <Select label={select1.label} value={selectValue1} onChange={(e) => setSelectValue1(e.target.value)} options={select1.options} />
          <Select label={select2.label} value={selectValue2} onChange={(e) => setSelectValue2(e.target.value)} options={select2.options} />
        </div>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={placeholder}
          className="w-full flex-grow p-4 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
        />
        <button onClick={handleGenerate} disabled={isLoading || !userInput} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all">
          {isLoading ? <><Loader /> Generating...</> : 'Generate'}
        </button>
        <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your generated content will appear here." tool={tool} />
      </div>
    );
};
const DualTextareaTool: React.FC<AiToolComponentProps> = (props) => {
    const { tool } = props;
    const { placeholder1, placeholder2, label1, label2 } = tool.props as DualTextareaToolProps;
    const [userInput1, setUserInput1] = useState('');
    const [userInput2, setUserInput2] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = useCallback(() => {
        const handler = getHandleGenerate(props, { userInput1, userInput2 });
        handler(setGeneratedContent, setIsLoading, setError);
    }, [props, userInput1, userInput2]);

    return (
        <div className="flex flex-col h-full gap-4">
        <div className="flex flex-col md:flex-row gap-4 flex-grow">
            <div className="w-full md:w-1/2 flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-300">{label1}</label>
                <textarea
                    value={userInput1}
                    onChange={(e) => setUserInput1(e.target.value)}
                    placeholder={placeholder1}
                    className="w-full h-full p-3 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
                />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-300">{label2}</label>
                <textarea
                    value={userInput2}
                    onChange={(e) => setUserInput2(e.target.value)}
                    placeholder={placeholder2}
                    className="w-full h-full p-3 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
                />
            </div>
        </div>
        <button onClick={handleGenerate} disabled={isLoading || !userInput1 || !userInput2} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all">
            {isLoading ? <><Loader /> Generating...</> : 'Generate'}
        </button>
        <div className="h-2/5">
            <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your generated content will appear here." tool={tool} />
        </div>
        </div>
    );
};
const IndustryInputTool: React.FC<AiToolComponentProps> = (props) => {
    const { tool } = props;
    const { placeholder, industryLabel, industryPlaceholder } = tool.props as IndustryInputToolProps;
    const [userInput, setUserInput] = useState('');
    const [industry, setIndustry] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = useCallback(() => {
        const handler = getHandleGenerate(props, { industry, userInput });
        handler(setGeneratedContent, setIsLoading, setError);
    }, [props, industry, userInput]);

    return (
        <div className="flex flex-col h-full gap-4">
        <div className="max-w-xs">
            <label className="block text-xs text-gray-400 mb-1">{industryLabel}</label>
            <input
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder={industryPlaceholder}
            className="w-full p-2 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
            />
        </div>
        <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={placeholder}
            className="w-full flex-grow p-4 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
        />
        <button onClick={handleGenerate} disabled={isLoading || !userInput} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all">
            {isLoading ? <><Loader /> Generating...</> : 'Generate'}
        </button>
        <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Your generated content will appear here." tool={tool} />
        </div>
    );
};
// Non-streaming tools (Image, GroundedQA) remain largely the same
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
        <OutputDisplay isLoading={isLoading} error={error} content={generatedContent} defaultText="Generated caption & alt text will appear here." tool={tool} />
      </div>
    );
};
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
const GroundedQATool: React.FC<AiToolComponentProps> = ({ tool, onGenerationComplete }) => {
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
        onGenerationComplete(userInput, response.text);
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

// --- Main ContentPanel Component ---

interface ContentPanelProps {
  tool: Tool;
  onBack: () => void;
  onAddToHistory: (item: Omit<GenerationHistoryItem, 'id' | 'timestamp'>) => void;
}
const GlobeAltIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m0 0a9 9 0 019-9m-9 9a9 9 0 009 9" /></svg>;

export const ContentPanel: React.FC<ContentPanelProps> = ({ tool, onBack, onAddToHistory }) => {
  const [language, setLanguage] = useState(LANGUAGES[0]);

  const handleGenerationComplete = (input: string, output: string) => {
    onAddToHistory({
        toolName: tool.name,
        inputSummary: input,
        output: output,
    });
  };

  const showLanguageSelector = tool.component !== ToolComponentType.ImageGenerator && tool.component !== ToolComponentType.GroundedQA;

  const renderTool = () => {
    const props = { tool, language, onGenerationComplete: handleGenerationComplete };
    switch (tool.component) {
      case ToolComponentType.SocialMedia: return <SocialMediaTool {...props} />;
      case ToolComponentType.VideoScript: return <VideoScriptTool {...props} />;
      case ToolComponentType.BlogPost: return <BlogPostTool {...props} />;
      case ToolComponentType.ImageInput: return <ImageInputTool {...props} />;
      case ToolComponentType.ImageGenerator: return <ImageGeneratorTool {...props} />;
      case ToolComponentType.GroundedQA: return <GroundedQATool {...props} />;
      case ToolComponentType.GrammarTool: return <GrammarTool {...props} />;
      case ToolComponentType.ToneChangerTool: return <ToneChangerTool {...props} />;
      case ToolComponentType.EmailWriterTool: return <EmailWriterTool {...props} />;
      case ToolComponentType.StudyTool: return <StudyTool {...props} />;
      case ToolComponentType.SingleSelectTool: return <SingleSelectTool {...props} />;
      case ToolComponentType.DoubleSelectTool: return <DoubleSelectTool {...props} />;
      case ToolComponentType.DualTextareaTool: return <DualTextareaTool {...props} />;
      case ToolComponentType.IndustryInputTool: return <IndustryInputTool {...props} />;
      case ToolComponentType.Generic:
      default:
        return <GenericTool {...props} />;
    }
  };

  return (
    <div className="flex flex-col h-full opacity-0 animate-fade-in-up">
        <div className="flex items-start justify-between mb-6">
            <div>
                <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors text-sm mb-2 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    Back to all tools
                </button>
                <div className="flex items-center gap-4">
                    <span className="text-cyan-400">{tool.icon}</span>
                    <div>
                        <h2 className="text-2xl font-bold text-white">{tool.name}</h2>
                        <p className="text-gray-400">{tool.description}</p>
                    </div>
                </div>
            </div>
            {showLanguageSelector && (
                 <div className="relative">
                    <label htmlFor="language-select" className="absolute -top-5 right-0 text-xs text-gray-500">Output Language</label>
                    <div className="flex items-center gap-2 bg-black/30 border border-white/10 rounded-lg pl-3">
                      <GlobeAltIcon />
                      <select 
                          id="language-select"
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="bg-transparent p-2 pr-8 text-sm focus:outline-none appearance-none"
                      >
                          {LANGUAGES.map(lang => <option key={lang} value={lang} className="bg-gray-800 text-white">{lang}</option>)}
                      </select>
                    </div>
                 </div>
            )}
        </div>
        <div className="flex-grow h-full">
            {renderTool()}
        </div>
    </div>
  );
};
