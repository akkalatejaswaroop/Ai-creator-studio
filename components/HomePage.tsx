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
const LinkedinIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>;
const TwitterIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const MailIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;

// Icons for Feature Showcase
const PenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-4 text-cyan-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>;
const CodeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-4 text-cyan-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-4 text-cyan-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const GraduationCapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-4 text-cyan-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12v5a2 2 0 002 2h18a2 2 0 002-2v-5" /></svg>;
const MegaphoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-4 text-cyan-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.514C18.358 1.84 19.17 1 20.243 1c.67 0 1.313.327 1.745.87l.271.305a1.5 1.5 0 010 2.118l-6.195 6.195a2.25 2.25 0 01-3.183 0l-1.42-1.42a2.25 2.25 0 00-3.182 0l-1.42 1.42a2.25 2.25 0 000 3.182l.026.026a2.25 2.25 0 003.182 0l1.42-1.42" /></svg>;
const PhotoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-4 text-cyan-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center transform hover:-translate-y-2 transition-transform duration-300">
        {icon}
        <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
    </div>
);


interface HomePageProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  tools: Tool[];
  onSelectTool: (tool: Tool) => void;
}

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
        <div className="flex flex-col items-center opacity-0 animate-fade-in-up w-full min-h-full">
            <header className={`flex flex-col items-center justify-center text-center w-full transition-all duration-500 ${hasSearch ? 'min-h-[25vh] pt-10' : 'pt-20 pb-16'}`}>
                <div className="mb-6">
                    <LogoIcon />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    Welcome to IntelliForge AI
                </h1>
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
                {!hasSearch && (
                  <a 
                    href="https://appsgeyser.io/19155806/IntelliForge-Ai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 transition-all animate-fade-in-up"
                    style={{ animationDelay: '200ms' }}
                  >
                    <DownloadIcon />
                    Download Mobile App
                  </a>
                )}
            </header>
            
            <main className="w-full max-w-6xl mx-auto px-4 pb-12 flex-grow">
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
                    <div className="text-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                        <h2 className="text-3xl font-bold text-white mb-4">A Universe of Capabilities</h2>
                        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">Explore a powerful suite of AI tools designed to enhance your workflow, from content creation and code assistance to professional and career development.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <FeatureCard icon={<PenIcon />} title="Advanced Content Creation" description="Effortlessly generate SEO-optimized blog posts, persuasive marketing copy, professional emails, and captivating stories. Fine-tune every creation with precise control over tone, style, and voice." />
                            <FeatureCard icon={<CodeIcon />} title="Intelligent Code Assistance" description="Accelerate your development workflow. Explain complex code, find and fix bugs, generate unit tests, refactor for readability, and translate between programming languages with expert precision." />
                            <FeatureCard icon={<BriefcaseIcon />} title="Professional Career Development" description="Navigate your career path with confidence. Craft achievement-oriented resumes, write tailored cover letters, and prepare for interviews with targeted questions and constructive feedback." />
                            <FeatureCard icon={<GraduationCapIcon />} title="Accelerated Learning & Research" description="Transform how you learn and research. Summarize dense lectures, create dynamic study guides, and get up-to-date, verifiable answers on any topic with cited sources from the web." />
                            <FeatureCard icon={<MegaphoneIcon />} title="SEO & Marketing Suite" description="Dominate your digital landscape. Discover high-impact SEO keywords, generate compelling ad copy, and create a full month's social media calendar to amplify your message and drive engagement." />
                            <FeatureCard icon={<PhotoIcon />} title="Creative Visual Generation" description="Bring your vision to life. Turn simple text descriptions into stunning, unique images for your projects, and enhance your ideas into detailed prompts for breathtaking AI-generated art." />
                        </div>
                    </div>
                )}
            </main>

            <footer className="text-center py-8 text-gray-500 text-sm w-full">
                 <div className="mb-4 font-semibold text-gray-400">Contact Developer</div>
                 <div className="flex justify-center items-center gap-6 mb-6">
                    <a href="https://www.linkedin.com/in/akkalatejaswaroop/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors" aria-label="LinkedIn">
                        <LinkedinIcon />
                    </a>
                    <a href="https://x.com/tejaswaroop_a" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors" aria-label="Twitter X">
                        <TwitterIcon />
                    </a>
                    <a href="mailto:Tejaswaroopakkala@gmail.com" className="hover:text-cyan-400 transition-colors" aria-label="Email Developer">
                        <MailIcon />
                    </a>
                 </div>
                 <p className="text-gray-600">&copy; {new Date().getFullYear()} IntelliForge Ai. v1.0.0</p>
            </footer>
        </div>
    );
};