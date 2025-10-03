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
    [ToolComponentType.AdvancedWritingTool]: React.lazy(() => import('./tools/AdvancedWritingTool')),
    [ToolComponentType.AdvancedToneTunerTool]: React.lazy(() => import('./tools/AdvancedToneTunerTool')),
    [ToolComponentType.EmailWriterTool]: React.lazy(() => import('./tools/EmailWriterTool')),
    [ToolComponentType.StudyTool]: React.lazy(() => import('./tools/StudyTool')),
    [ToolComponentType.ResumeTool]: React.lazy(() => import('./tools/IndustryInputTool')), // Fallback for deprecated tool
    [ToolComponentType.SingleSelectTool]: React.lazy(() => import('./tools/SingleSelectTool')),
    [ToolComponentType.DoubleSelectTool]: React.lazy(() => import('./tools/DoubleSelectTool')),
    [ToolComponentType.DualTextareaTool]: React.lazy(() => import('./tools/DualTextareaTool')),
    [ToolComponentType.IndustryInputTool]: React.lazy(() => import('./tools/IndustryInputTool')),
    [ToolComponentType.MessageReplyTool]: React.lazy(() => import('./tools/MessageReplyTool')),
    [ToolComponentType.NoticeGeneratorTool]: React.lazy(() => import('./tools/NoticeGeneratorTool')),
    [ToolComponentType.AnnouncementGeneratorTool]: React.lazy(() => import('./tools/AnnouncementGeneratorTool')),
    [ToolComponentType.TranslatorTool]: React.lazy(() => import('./tools/TranslatorTool')),
    [ToolComponentType.SyllabusDesignerTool]: React.lazy(() => import('./tools/SyllabusDesignerTool')),
    [ToolComponentType.TimetableOptimizerTool]: React.lazy(() => import('./tools/TimetableOptimizerTool')),
    [ToolComponentType.GrantProposalTool]: React.lazy(() => import('./tools/GrantProposalTool')),
    [ToolComponentType.EssayAnalyzerTool]: React.lazy(() => import('./tools/EssayAnalyzerTool')),
    [ToolComponentType.VoiceMessageTool]: React.lazy(() => import('./tools/VoiceMessageTool')),
    [ToolComponentType.SentimentAnalyzerTool]: React.lazy(() => import('./tools/SentimentAnalyzerTool')),
};

const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese', 'Russian', 'Arabic'];

const GlobeAltIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m0 0a9 9 0 019-9m-9 9a9 9 0 009 9" /></svg>;

const ProTip = ({ context }: { context: ToolContext }) => (
    <details className="bg-cyan-900/30 border border-cyan-500/20 rounded-lg group transition-all duration-300 ease-in-out open:bg-cyan-900/40">
        <summary className="font-semibold text-cyan-300 cursor-pointer flex items-center justify-between p-4 list-none">
            <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 002 0v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                How to Use This Tool
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform transition-transform duration-300 group-open:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </summary>
        <div className="px-4 pb-4 text-sm space-y-3 text-gray-300 border-t border-cyan-500/20 pt-4">
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

  const showLanguageSelector = tool.component !== ToolComponentType.ImageGenerator 
    && tool.component !== ToolComponentType.GroundedQA 
    && tool.component !== ToolComponentType.SyllabusDesignerTool
    && tool.component !== ToolComponentType.TranslatorTool
    && tool.component !== ToolComponentType.VoiceMessageTool
    && tool.component !== ToolComponentType.SentimentAnalyzerTool;
  
  const ToolComponent = componentMap[tool.component] || componentMap[ToolComponentType.Generic];
  const toolProps = { tool, language, onGenerationComplete: handleGenerationComplete };

  return (
    <div className="flex flex-col h-full opacity-0 animate-fade-in-up">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
            <div>
                <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors text-sm mb-3 flex items-center gap-2" aria-label="Back to all tools">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    Back to Dashboard
                </button>
                <div className="flex items-center gap-4">
                    <span className="text-cyan-400 text-3xl">{tool.icon}</span>
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
        <div className="flex-grow h-full min-h-0 mt-6">
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