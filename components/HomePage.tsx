


import React, { useMemo } from 'react';
import { Tool } from '../types';

const LogoIcon = () => (
    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'rgb(34, 211, 238)', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'rgb(56, 189, 248)', stopOpacity: 1 }} />
            </linearGradient>
        </defs>
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#logoGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="url(#logoGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="url(#logoGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;

// --- Icons for Features & Metrics ---
const CheckCircleIcon = ({ className = "h-8 w-8" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CodeBracketIcon = ({ className = "h-8 w-8" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>;
const DocumentTextIcon = ({ className = "h-8 w-8" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>;
const SparklesIcon = ({ className = "h-6 w-6" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.5 21.75l-.398-1.188a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.188-.398a2.25 2.25 0 001.423-1.423L16.5 15.75l.398 1.188a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.188.398a2.25 2.25 0 00-1.423 1.423z" /></svg>;
const MagnifyingGlassCircleIcon = ({ className = "h-6 w-6" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


const metrics = [
    { icon: <CheckCircleIcon className="h-8 w-8 text-cyan-400"/>, value: "1M+", label: "Projects Created" },
    { icon: <CodeBracketIcon className="h-8 w-8 text-cyan-400"/>, value: "50M+", label: "Lines of Code Written" },
    { icon: <DocumentTextIcon className="h-8 w-8 text-cyan-400"/>, value: "500K+", label: "Blog Posts Drafted" },
];

const featureSets = [
    {
        title: "Generation & Editing",
        icon: <SparklesIcon className="h-7 w-7 text-cyan-300" />,
        features: [
            "Customizable tone and style options (e.g., formal, conversational, technical).",
            "Topic and keyword suggestion based on trending searches or user input.",
            "Multi-language support for creating content in different languages like English and Telugu.",
            "Real-time content preview as the blog post is generated.",
            "Editable sections with AI suggestions for improving clarity or impact.",
            "Inline grammar and plagiarism check integrated in the editor.",
        ],
    },
    {
        title: "Publishing & Enhancement",
        icon: <MagnifyingGlassCircleIcon className="h-7 w-7 text-cyan-300" />,
        features: [
            "Automatic generation of SEO-friendly titles, meta descriptions, and tags.",
            "Summarization of long articles into concise blog posts.",
            "Content enrichment with relevant data, quotes, or references from trusted sources.",
            "Ability to generate related social media posts or email newsletters from the blog content.",
        ],
    },
];

interface HomePageProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  tools: Tool[];
  onSelectTool: (tool: Tool) => void;
}

const MetricCard: React.FC<{ icon: React.ReactNode, value: string, label: string }> = ({ icon, value, label }) => (
    <div className="bg-white/5 p-6 rounded-xl flex items-center gap-6 border border-white/10">
        {icon}
        <div>
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-gray-400">{label}</p>
        </div>
    </div>
);

const FeatureCard: React.FC<{ title: string, icon: React.ReactNode, features: string[] }> = ({ title, icon, features }) => (
    <div className="bg-white/5 p-8 rounded-xl border border-white/10 h-full">
        <div className="flex items-center gap-4 mb-6">
            <div className="bg-cyan-500/10 p-2 rounded-full">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <ul className="space-y-4">
            {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                    <CheckCircleIcon className="h-5 w-5 text-green-400 mt-0.5 shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                </li>
            ))}
        </ul>
    </div>
);


export const HomePage: React.FC<HomePageProps> = ({ searchTerm, setSearchTerm, tools, onSelectTool }) => {
    const filteredTools = useMemo(() => {
        if (!searchTerm) return [];
        return tools.filter(tool => 
            tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            tool.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [tools, searchTerm]);

    const hasSearch = searchTerm.length > 0;

    return (
        <div className="flex flex-col items-center opacity-0 animate-fade-in-up">
            <div className={`flex flex-col items-center justify-center text-center w-full transition-all duration-500 ${hasSearch ? 'min-h-[25vh] pt-10' : 'min-h-[calc(100vh-10rem)] py-10'}`}>
                <div className="mb-6">
                    <LogoIcon />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    IntelliForge Ai
                </h1>
                <p className="text-gray-400 mt-4 max-w-xl mx-auto">
                    Your intelligent partner for content creation. Select a tool from the sidebar or search below to begin.
                </p>
                <div className="relative mt-8 w-full max-w-lg">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for a tool, e.g., 'Blog Post Generator'"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-lg"
                        aria-label="Search for a tool"
                    />
                </div>
            </div>
            
            <div className="w-full max-w-6xl mx-auto px-4 pb-12">
                {hasSearch ? (
                    <div>
                        {filteredTools.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredTools.map(tool => (
                                    <button 
                                        key={tool.id} 
                                        onClick={() => onSelectTool(tool)}
                                        className="bg-white/5 p-6 rounded-xl border border-white/10 text-left hover:border-cyan-400 hover:bg-white/10 transition-all duration-300 h-full flex flex-col items-start"
                                        aria-label={`Select tool: ${tool.name}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-cyan-400 shrink-0">{tool.icon}</span>
                                            <h3 className="font-bold text-white text-lg">{tool.name}</h3>
                                        </div>
                                        <p className="text-gray-400 text-sm mt-3 flex-grow">{tool.description}</p>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-gray-500 text-lg">No tools found for "{searchTerm}".</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                            {metrics.map(metric => <MetricCard key={metric.label} {...metric} />)}
                        </div>

                        <div className="mt-24 text-center">
                            <h2 className="text-3xl font-bold text-white mb-4">Powerful Features for Every Creator</h2>
                            <p className="text-gray-400 max-w-2xl mx-auto mb-12">Leverage cutting-edge AI to enhance your workflow, from content generation to advanced SEO and publishing.</p>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
                                {featureSets.map(set => <FeatureCard key={set.title} {...set} />)}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};