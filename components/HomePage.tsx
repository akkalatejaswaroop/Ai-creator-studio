import React, { useMemo } from 'react';
import { Tool, ToolCategory } from '../types';

const LogoIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

const categoryIcons: { [key in ToolCategory]?: React.ReactNode } = {
    [ToolCategory.Writing]: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>,
    [ToolCategory.Coding]: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    [ToolCategory.Business]: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    [ToolCategory.Learning]: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12v5a2 2 0 002 2h18a2 2 0 002-2v-5" /></svg>,
    [ToolCategory.Marketing]: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.514C18.358 1.84 19.17 1 20.243 1c.67 0 1.313.327 1.745.87l.271.305a1.5 1.5 0 010 2.118l-6.195 6.195a2.25 2.25 0 01-3.183 0l-1.42-1.42a2.25 2.25 0 00-3.182 0l-1.42 1.42a2.25 2.25 0 000 3.182l.026.026a2.25 2.25 0 003.182 0l1.42-1.42" /></svg>,
    [ToolCategory.Creative]: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
};


interface HomePageProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  tools: Tool[];
  categories: ToolCategory[];
  onSelectTool: (tool: Tool) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ searchTerm, setSearchTerm, tools, categories, onSelectTool }) => {
    const featuredTools = useMemo(() => tools.filter(tool => tool.featured), [tools]);

    const filteredTools = useMemo(() => {
        if (!searchTerm) return [];
        return tools.filter(tool => 
            tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            tool.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [tools, searchTerm]);

    const hasSearch = searchTerm.length > 0;

    const DashboardContent = () => (
        <div className="space-y-12 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {/* Featured Tools Section */}
            <section>
                <h2 className="text-2xl font-bold text-white mb-6">Featured Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredTools.map(tool => (
                        <button 
                            key={tool.id} 
                            onClick={() => onSelectTool(tool)}
                            className="bg-white/5 p-5 rounded-xl border border-white/10 text-left hover:border-cyan-400 hover:bg-white/10 transition-all duration-300 h-full flex flex-col items-start group"
                            aria-label={`Select tool: ${tool.name}`}
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-cyan-400 shrink-0 group-hover:scale-110 transition-transform">{tool.icon}</span>
                                <h3 className="font-bold text-white text-base">{tool.name}</h3>
                            </div>
                            <p className="text-gray-400 text-sm mt-3 flex-grow">{tool.description}</p>
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );

    return (
        <div className="flex flex-col opacity-0 animate-fade-in-up w-full min-h-full">
            <header className="flex flex-col items-center justify-center text-center w-full pt-8 pb-12">
                <div className="mb-4">
                    <LogoIcon />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    IntelliForge AI
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-gray-400">
                    Your all-in-one AI toolkit. Forge brilliant ideas into reality.
                </p>
                <div className="relative mt-8 w-full max-w-2xl">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for any tool..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-base"
                        aria-label="Search for a tool"
                    />
                </div>
            </header>
            
            <main className="w-full max-w-7xl mx-auto px-4 pb-12 flex-grow">
                {hasSearch ? (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Search Results</h2>
                        {filteredTools.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredTools.map(tool => (
                                    <button 
                                        key={tool.id} 
                                        onClick={() => onSelectTool(tool)}
                                        className="bg-white/5 p-5 rounded-xl border border-white/10 text-left hover:border-cyan-400 hover:bg-white/10 transition-all duration-300 h-full flex flex-col items-start group"
                                        aria-label={`Select tool: ${tool.name}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-cyan-400 shrink-0 group-hover:scale-110 transition-transform">{tool.icon}</span>
                                            <h3 className="font-bold text-white text-base">{tool.name}</h3>
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
                    <DashboardContent />
                )}
            </main>
        </div>
    );
};