import React, { useState, useCallback, Suspense } from 'react';
import { Tool, ToolComponentType, GenerationHistoryItem, ToolContext, AiToolComponentProps } from '../types';
import { Loader } from './Loader';

// Dynamic imports for code-splitting
const componentMap: { [key in ToolComponentType]: React.LazyExoticComponent<React.FC<AiToolComponentProps>> } = {
    [ToolComponentType.Generic]: React.lazy(() => import('./tools/GenericTool')),
    [ToolComponentType.SocialMedia]: React.lazy(() => import('./tools/SocialMediaTool')),
    [ToolComponentType.VideoScript]: React.lazy(() => import('./tools/VideoScriptTool')),
    [ToolComponentType.ImageInput]: React.lazy(() => import('./tools/ImageInputTool')),
    [ToolComponentType.ImageGenerator]: React.lazy(() => import('./tools/ImageGeneratorTool')),
    [ToolComponentType.GroundedQA]: React.lazy(() => import('./tools/GroundedQATool')),
    [ToolComponentType.BlogPost]: React.lazy(() => import('./tools/BlogPostTool')),
    [ToolComponentType.GrammarTool]: React.lazy(() => import('./tools/GrammarTool')),
    [ToolComponentType.ToneChangerTool]: React.lazy(() => import('./tools/ToneChangerTool')),
    [ToolComponentType.EmailWriterTool]: React.lazy(() => import('./tools/EmailWriterTool')),
    [ToolComponentType.StudyTool]: React.lazy(() => import('./tools/StudyTool')),
    [ToolComponentType.ResumeTool]: React.lazy(() => import('./tools/IndustryInputTool')), // Fallback for deprecated tool
    [ToolComponentType.SingleSelectTool]: React.lazy(() => import('./tools/SingleSelectTool')),
    [ToolComponentType.DoubleSelectTool]: React.lazy(() => import('./tools/DoubleSelectTool')),
    [ToolComponentType.DualTextareaTool]: React.lazy(() => import('./tools/DualTextareaTool')),
    [ToolComponentType.IndustryInputTool]: React.lazy(() => import('./tools/IndustryInputTool')),
};

const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese', 'Russian', 'Arabic'];

const GlobeAltIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m0 0a9 9 0 019-9m-9 9a9 9 0 009 9" /></svg>;

const ProTip = ({ context }: { context: ToolContext }) => (
    <details className="bg-cyan-900/40 border border-cyan-500/30 rounded-lg p-4 mb-6 transition-all open:pb-4">
        <summary className="font-semibold text-cyan-300 cursor-pointer flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 002 0v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
            How to Use This Tool
        </summary>
        <div className="mt-4 text-sm space-y-3 text-gray-300 animate-fade-in-up">
            <p><strong className="font-semibold text-white">Purpose:</strong> {context.purpose}</p>
            <p><strong className="font-semibold text-white">Benefit:</strong> {context.benefit}</p>
            <p><strong className="font-semibold text-cyan-300">Pro Tip:</strong> {context.proFeature}</p>
        </div>
    </details>
);


// --- Main ContentPanel Component ---

interface ContentPanelProps {
  tool: Tool;
  onBack: () => void;
  onAddToHistory: (item: Omit<GenerationHistoryItem, 'id' | 'timestamp'>) => void;
}

export const ContentPanel: React.FC<ContentPanelProps> = ({ tool, onBack, onAddToHistory }) => {
  const [language, setLanguage] = useState(LANGUAGES[0]);

  const handleGenerationComplete = useCallback((input: string, output: string) => {
    onAddToHistory({
        toolName: tool.name,
        inputSummary: input,
        output: output,
    });
  }, [onAddToHistory, tool.name]);

  const showLanguageSelector = tool.component !== ToolComponentType.ImageGenerator && tool.component !== ToolComponentType.GroundedQA;
  
  const ToolComponent = componentMap[tool.component] || componentMap[ToolComponentType.Generic];
  const toolProps = { tool, language, onGenerationComplete: handleGenerationComplete };

  return (
    <div className="flex flex-col h-full opacity-0 animate-fade-in-up">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
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
                 <div className="relative shrink-0">
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
        <ProTip context={tool.context} />
        <div className="flex-grow h-full min-h-0">
            <Suspense fallback={
                <div className="flex items-center justify-center h-full w-full">
                    <Loader />
                </div>
            }>
                <ToolComponent {...toolProps} />
            </Suspense>
        </div>
    </div>
  );
};
