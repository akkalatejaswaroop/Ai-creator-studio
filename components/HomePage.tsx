
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
const DocumentDuplicateIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const CodeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
const PenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>;
const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6.343 6.343l-2.828 2.829M17.657 17.657l2.828 2.829M18 5v.01M19.071 6.929l-2.829 2.829M12 2v2m-6.857 4.929l-2.829-2.829M21 12h-2m.465 6.464l-2.829-2.829M12 18v2m3.636-3.636l2.828-2.829" /></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;


interface HomePageProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  tools: Tool[];
  onSelectTool: (tool: Tool) => void;
}

const MetricCard: React.FC<{ icon: React.ReactNode; number: string; label: string }> = ({ icon, number, label }) => (
    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
        <div className="text-cyan-400 mx-auto mb-4 w-12 h-12 flex items-center justify-center bg-gray-800/50 rounded-xl border border-white/10">
            {icon}
        </div>
        <p className="text-4xl font-bold text-white">{number}</p>
        <p className="text-gray-400 mt-2">{label}</p>
    </div>
);

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 transform transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-900/20 hover:-translate-y-2">
        <div className="bg-gray-800/50 border border-white/10 p-3 rounded-xl mb-4 inline-block">
            <span className="text-cyan-400">{icon}</span>
        </div>
        <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
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
        <div className="flex flex-col items-center opacity-0 animate-fade-in-up w-full">
            <div className={`flex flex-col items-center justify-center text-center w-full transition-all duration-500 ${hasSearch ? 'min-h-[25vh] pt-10' : 'min-h-[calc(100vh-10rem)] py-10'}`}>
                <div className="mb-6">
                    <LogoIcon />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    IntelliForge Ai
                </h1>
                <p className="text-gray-400 mt-4 max-w-xl mx-auto">
                    An AI-powered toolkit to accelerate your creativity and productivity. What will you build today?
                </p>
                <div className="relative mt-8 w-full max-w-lg">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for a tool, e.g., 'Blog Post'"
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
                    <div className="space-y-24">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-white mb-4">Powering Innovation at Scale</h2>
                            <p className="text-gray-400 max-w-2xl mx-auto mb-12">
                                Join thousands of creators, developers, and professionals building the future with IntelliForge Ai.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <MetricCard icon={<DocumentDuplicateIcon/>} number="150,000+" label="Projects Created" />
                                <MetricCard icon={<CodeIcon/>} number="2.5M+" label="Lines of Code Generated" />
                                <MetricCard icon={<PenIcon/>} number="45,000+" label="Blog Posts Drafted" />
                            </div>
                        </div>

                        <div className="text-center">
                             <h2 className="text-3xl font-bold text-white mb-4">A Tool for Every Task</h2>
                            <p className="text-gray-400 max-w-2xl mx-auto mb-12">
                                From writing and coding to professional development, our comprehensive suite of AI tools has you covered.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                               <FeatureCard 
                                 icon={<PenIcon/>} 
                                 title="Content Creation" 
                                 description="Generate blog posts, social media updates, and professional emails in seconds." 
                               />
                               <FeatureCard 
                                 icon={<CodeIcon/>} 
                                 title="Code Assistance" 
                                 description="Explain, debug, and refactor code to accelerate your development workflow." 
                               />
                               <FeatureCard 
                                 icon={<SparklesIcon/>} 
                                 title="Creative Ideation" 
                                 description="Brainstorm story plots, generate unique images, and create video scripts effortlessly." 
                               />
                               <FeatureCard 
                                 icon={<BriefcaseIcon/>} 
                                 title="Professional Growth" 
                                 description="Craft the perfect resume, prepare for interviews, and optimize your LinkedIn profile." 
                               />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <footer className="text-center py-8 text-gray-600 text-sm">
                 &copy; {new Date().getFullYear()} IntelliForge Ai. v1.0.0
            </footer>
        </div>
    );
};