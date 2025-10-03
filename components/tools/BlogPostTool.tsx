import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AiToolComponentProps, BlogPostToolProps } from '../../types';
import { Loader } from '../Loader';
import { Select } from './shared/Select';
import { OutputDisplay } from './shared/OutputDisplay';
import { generateTextStream } from '../../services/geminiService';

type Step = 'ideation' | 'outlining' | 'drafting' | 'enhancement';
type BrainstormedIdea = { title: string; audience: string; keywords: string; };

const MicrophoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 016 0v8.25a3 3 0 01-3 3z" /></svg>;

const BlogPostTool: React.FC<AiToolComponentProps> = ({ tool, language, onGenerationComplete }) => {
  const { placeholder, tones, styles, audiences, voices, lengths } = tool.props as BlogPostToolProps;

  // Global state
  const [step, setStep] = useState<Step>('ideation');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Step 1: Ideation state
  const [topic, setTopic] = useState('');
  const [brainstormedIdeas, setBrainstormedIdeas] = useState<BrainstormedIdea[]>([]);

  // Step 2: Outlining state
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState('');
  const [outline, setOutline] = useState('');

  // Step 3: Drafting state
  const [tone, setTone] = useState(tones[0]);
  const [style, setStyle] = useState(styles[0]);
  const [voice, setVoice] = useState(voices[0]);
  const [length, setLength] = useState(lengths[1]);
  const [draft, setDraft] = useState('');

  // Step 4: Enhancement state
  const [analysis, setAnalysis] = useState('');
  
  // Speech recognition state
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [listeningTarget, setListeningTarget] = useState<'topic' | 'outline' | null>(null);
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
          if (listeningTarget === 'topic') {
            setTopic(prev => prev.trim() + (prev ? ' ' : '') + finalTranscript);
          } else if (listeningTarget === 'outline') {
            setOutline(prev => prev.trim() + (prev ? ' ' : '') + finalTranscript);
          }
        }
      };
      recognition.onend = () => setListeningTarget(null);
      recognitionRef.current = recognition;
    }
    return () => recognitionRef.current?.stop();
  }, [listeningTarget]);

  const handleListen = (target: 'topic' | 'outline') => {
    if (!recognitionRef.current) return;
    if (listeningTarget === target) {
      recognitionRef.current.stop();
    } else {
      if (listeningTarget) recognitionRef.current.stop();
      setListeningTarget(target);
      recognitionRef.current.start();
    }
  };

  const handleStream = useCallback(async (prompt: string, setContent: (content: string) => void, inputSummary: string) => {
      setIsLoading(true);
      setContent('');
      setError('');
      try {
        let fullResponse = "";
        for await (const chunk of generateTextStream(prompt, tool.systemInstruction, language)) {
            fullResponse += chunk;
            setContent(fullResponse);
        }
        onGenerationComplete(inputSummary, fullResponse);
      } catch (err) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
          setIsLoading(false);
      }
  }, [tool.systemInstruction, language, onGenerationComplete]);

  // --- Step 1: Ideation Logic ---
  const handleBrainstorm = useCallback(async () => {
    const prompt = `Act as a content strategist. For the topic "${topic}", generate 3 distinct blog post ideas. For each idea, provide a catchy title, a suggested target audience from this list [${audiences.join(', ')}], and a comma-separated list of 5 primary SEO keywords. Format the output as a simple JSON array of objects with keys "title", "audience", and "keywords". Provide only the JSON, nothing else.`;
    setIsLoading(true);
    setBrainstormedIdeas([]);
    setError('');
    let rawResponse = "";
    try {
        for await (const chunk of generateTextStream(prompt, tool.systemInstruction, language)) {
            rawResponse += chunk;
        }
        const cleanedJsonString = rawResponse.replace(/```json\n?|\n?```/g, '').trim();
        setBrainstormedIdeas(JSON.parse(cleanedJsonString));
        onGenerationComplete(topic, cleanedJsonString);
    } catch (err) {
        setError("Failed to parse brainstorming ideas. Please try again.");
        console.error("Brainstorming parse error:", err, "Raw response:", rawResponse);
    } finally {
        setIsLoading(false);
    }
  }, [topic, audiences, tool.systemInstruction, language, onGenerationComplete]);
  
  const selectIdea = (idea: BrainstormedIdea) => {
    setSelectedTitle(idea.title);
    setSelectedAudience(idea.audience);
    setSelectedKeywords(idea.keywords);
    setStep('outlining');
  };

  // --- Step 2: Outlining Logic ---
  const handleGenerateOutline = useCallback(async () => {
    const prompt = `Act as an expert content outliner and SEO specialist. Create a detailed blog post outline for the title "${selectedTitle}". The target audience is ${selectedAudience} and the primary keywords are ${selectedKeywords}. The outline should include a logical flow of H2 and H3 headings, with 2-3 bullet points under each heading describing the key points to cover. Output in Markdown format.`;
    handleStream(prompt, setOutline, `Outline for: ${selectedTitle}`);
  }, [selectedTitle, selectedAudience, selectedKeywords, handleStream]);

  // --- Step 3: Drafting Logic ---
  const handleDraftPost = useCallback(async () => {
      const inputs = {
        outline,
        audience: selectedAudience,
        tone,
        style,
        voice,
        length,
        keywords: selectedKeywords
      };
      const promptTemplate = (tool.props as BlogPostToolProps).promptTemplate;
      let finalPrompt = promptTemplate;
      Object.entries(inputs).forEach(([key, value]) => {
          finalPrompt = finalPrompt.replace(new RegExp(`{${key}}`, 'g'), value);
      });
      await handleStream(finalPrompt, setDraft, `Draft for: ${selectedTitle}`);
      setStep('enhancement');
  }, [outline, selectedAudience, tone, style, voice, length, selectedKeywords, tool.props, handleStream, selectedTitle]);

  // --- Step 4: Enhancement Logic ---
  const handleAnalysis = useCallback(async () => {
    const prompt = `Act as an SEO and content optimization expert. Analyze the following blog post. Provide your feedback in Markdown format with these sections:\n\n### SEO Analysis\n- **Keyword Usage**: Comment on the integration of the primary keywords (${selectedKeywords}). Are they used naturally? Is there keyword stuffing?\n- **Title & Meta Description**: Rate the SEO Title and Meta Description for effectiveness and length.\n\n### Readability Analysis\n- **Overall Score**: Give a qualitative score (e.g., Easy to Read, Moderately Complex) and explain why.\n- **Suggestions**: Provide 2-3 actionable suggestions to improve readability.\n\n### Image Suggestions\n- Provide 3-5 ideas for images to accompany this post. For each, write a descriptive prompt that could be used in an AI image generator (e.g., "A photorealistic image of a person working on a laptop in a sunlit, modern cafe, with data visualizations in the background.").\n\n### Link Suggestions\n- Based on the content, suggest 2-3 specific topics for internal links (e.g., [Link to a blog post about 'Advanced SEO techniques']) and 1-2 authoritative external sources that could be cited.\n\nHere is the blog post:\n\n${draft}`;
    handleStream(prompt, setAnalysis, `Analysis for: ${selectedTitle}`);
  }, [draft, selectedKeywords, handleStream, selectedTitle]);

  const Stepper = () => (
    <div className="flex items-center justify-center w-full mb-6">
      {['Ideation', 'Outlining', 'Drafting', 'Enhancement'].map((stepName, index) => {
        const stepId = stepName.toLowerCase() as Step;
        const isCompleted = (step === 'outlining' && index < 1) || (step === 'drafting' && index < 2) || (step === 'enhancement' && index < 3);
        const isActive = step === stepId;
        return (
          <React.Fragment key={stepName}>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${isActive || isCompleted ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
                {isCompleted ? '✓' : index + 1}
              </div>
              <span className={`ml-2 mr-4 text-sm ${isActive ? 'text-white font-semibold' : 'text-gray-400'}`}>{stepName}</span>
            </div>
            {index < 3 && <div className={`flex-auto h-1 ${isCompleted ? 'bg-cyan-500' : 'bg-gray-700'}`}></div>}
          </React.Fragment>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col h-full gap-4">
      <Stepper />
      {error && <div className="text-red-400 p-2 bg-red-900/50 rounded">{error}</div>}
      
      {step === 'ideation' && (
        <div className="flex flex-col h-full gap-4 animate-fade-in-up">
          <div className="relative">
            <textarea value={topic} onChange={e => setTopic(e.target.value)} placeholder={placeholder} className="w-full p-4 pr-12 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200" rows={3}/>
            {isSpeechSupported && (
                <button onClick={() => handleListen('topic')} title="Dictate topic" className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${listeningTarget === 'topic' ? 'bg-red-500 text-white animate-pulse' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}>
                    <MicrophoneIcon />
                </button>
            )}
          </div>
          <button onClick={handleBrainstorm} disabled={isLoading || !topic} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600">
            {isLoading ? <><Loader /> Brainstorming...</> : 'Brainstorm Ideas'}
          </button>
          <div className="flex-grow overflow-y-auto space-y-4">
            {brainstormedIdeas.map((idea, i) => (
              <button key={i} onClick={() => selectIdea(idea)} className="w-full text-left p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-cyan-400 transition-all">
                <h3 className="font-bold text-cyan-300">{idea.title}</h3>
                <p className="text-sm text-gray-300 mt-1"><strong>Audience:</strong> {idea.audience}</p>
                <p className="text-sm text-gray-400 mt-1"><strong>Keywords:</strong> {idea.keywords}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'outlining' && (
         <div className="flex flex-col h-full gap-4 animate-fade-in-up">
            <div className="p-4 bg-black/30 rounded-lg border border-white/10">
                <h3 className="font-bold text-white text-lg">{selectedTitle}</h3>
                <p className="text-sm text-gray-300"><strong>Audience:</strong> {selectedAudience} | <strong>Keywords:</strong> {selectedKeywords}</p>
            </div>
            <button onClick={handleGenerateOutline} disabled={isLoading} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600">
                {isLoading && !outline ? <><Loader /> Generating Outline...</> : 'Generate Outline'}
            </button>
            <div className="relative flex-grow">
              <textarea value={outline} onChange={e => setOutline(e.target.value)} placeholder="Your outline will appear here. You can edit it before drafting." className="w-full h-full p-4 pr-12 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200" />
              {isSpeechSupported && (
                  <button onClick={() => handleListen('outline')} title="Dictate outline" className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${listeningTarget === 'outline' ? 'bg-red-500 text-white animate-pulse' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}>
                      <MicrophoneIcon />
                  </button>
              )}
            </div>
            <div className="flex gap-4">
                <button onClick={() => setStep('ideation')} className="w-full bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-700">Back</button>
                <button onClick={() => setStep('drafting')} disabled={!outline} className="w-full bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600">Next: Draft Post</button>
            </div>
         </div>
      )}

      {step === 'drafting' && (
          <div className="flex flex-col h-full gap-4 animate-fade-in-up">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Select label="Tone" value={tone} onChange={(e) => setTone(e.target.value)} options={tones} />
                <Select label="Style" value={style} onChange={(e) => setStyle(e.target.value)} options={styles} />
                <Select label="Voice" value={voice} onChange={(e) => setVoice(e.target.value)} options={voices} />
                <Select label="Length" value={length} onChange={(e) => setLength(e.target.value)} options={lengths} />
              </div>
              <textarea value={outline} readOnly className="w-full flex-grow p-4 bg-black/20 border border-white/10 rounded-lg resize-none text-gray-400 text-sm" />
              <div className="flex gap-4">
                  <button onClick={() => setStep('outlining')} className="w-full bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-700">Back to Outline</button>
                  <button onClick={handleDraftPost} disabled={isLoading} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600">
                      {isLoading ? <><Loader /> Drafting...</> : 'Generate Full Blog Post'}
                  </button>
              </div>
          </div>
      )}

      {step === 'enhancement' && (
        <div className="flex flex-col md:flex-row h-full gap-4 animate-fade-in-up min-h-0">
            <div className="w-full md:w-1/2 flex flex-col gap-4">
                <h3 className="text-lg font-bold text-white">Final Draft</h3>
                <OutputDisplay isLoading={isLoading && !draft} error={""} content={draft} defaultText="" tool={tool} />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-4">
                <h3 className="text-lg font-bold text-white">Enhancement & Analysis</h3>
                <div className="flex-grow min-h-0">
                    <OutputDisplay isLoading={isLoading && !analysis} error={""} content={analysis} defaultText="Click a button below to analyze your draft." tool={tool} />
                </div>
                <div className="flex gap-2">
                    <button onClick={handleAnalysis} disabled={isLoading} className="flex-1 flex justify-center items-center gap-2 bg-cyan-600/80 text-white font-semibold py-2 px-3 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600">
                      {isLoading && !analysis ? <Loader/> : 'Analyze'}
                    </button>
                    <button onClick={() => setStep('drafting')} className="flex-1 bg-gray-600 text-white font-semibold py-2 px-3 rounded-lg hover:bg-gray-700">Back to Drafting</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostTool;