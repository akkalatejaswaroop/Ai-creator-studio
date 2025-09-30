

import React, { useState, useMemo, useEffect } from 'react';
import { Tool, ToolCategory } from '../types';

interface SidebarProps {
  tools: Tool[];
  categories: ToolCategory[];
  onSelectTool: (tool: Tool) => void;
  onLogoClick: () => void;
  selectedToolId?: string;
  searchTerm: string;
  isOpen: boolean;
  onToggle: () => void;
}

const LogoIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-cyan-400">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ChevronRightIcon = ({ isExpanded }: { isExpanded: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transform transition-transform ${isExpanded ? 'rotate-90' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

const ChevronDoubleLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
    </svg>
);


export const Sidebar: React.FC<SidebarProps> = ({ tools, categories, onSelectTool, onLogoClick, selectedToolId, searchTerm, isOpen, onToggle }) => {
    const [expandedCategories, setExpandedCategories] = useState<Set<ToolCategory>>(() => {
        if (selectedToolId) {
            const tool = tools.find(t => t.id === selectedToolId);
            if (tool) {
                return new Set([tool.category]);
            }
        }
        // Start with all categories expanded if no specific tool is selected
        return new Set(categories);
    });
    
    const filteredTools = useMemo(() => {
        if (!searchTerm) return tools;
        return tools.filter(tool => 
            tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            tool.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [tools, searchTerm]);

    useEffect(() => {
        if (searchTerm) {
            // When searching, expand all categories that contain matching tools
            const matchingCategories = new Set<ToolCategory>(filteredTools.map(t => t.category));
            setExpandedCategories(matchingCategories);
        }
    }, [searchTerm, filteredTools]);


    const toolsByCategory = useMemo(() => {
        const grouped: { [key in ToolCategory]?: Tool[] } = {};
        filteredTools.forEach(tool => {
            if (!grouped[tool.category]) {
                grouped[tool.category] = [];
            }
            grouped[tool.category]!.push(tool);
        });
        return grouped;
    }, [filteredTools]);

    const handleToggleCategory = (category: ToolCategory) => {
        setExpandedCategories(prev => {
            const newSet = new Set(prev);
            if (newSet.has(category)) {
                newSet.delete(category);
            } else {
                newSet.add(category);
            }
            return newSet;
        });
    };

    return (
        <aside className={`h-screen bg-black/30 backdrop-blur-lg border-r border-white/10 flex flex-col shrink-0 transition-all duration-300 ease-in-out ${isOpen ? 'w-full max-w-xs p-4' : 'w-0 p-0 border-r-0 overflow-hidden'}`}>
            <div className="flex items-center justify-between mb-6 px-2 shrink-0">
                <button onClick={onLogoClick} className="flex items-center gap-2">
                    <LogoIcon />
                    <span className="font-bold text-lg whitespace-nowrap">IntelliForge Ai</span>
                </button>
                <button onClick={onToggle} className="p-1 rounded-md hover:bg-white/10" aria-label="Close sidebar">
                    <ChevronDoubleLeftIcon />
                </button>
            </div>
            
            <nav className="flex-grow overflow-y-auto -mr-4 pr-3">
                <ul className="space-y-2">
                    {categories.map(category => {
                        const categoryTools = toolsByCategory[category];
                        if (!categoryTools || categoryTools.length === 0) return null;

                        const isExpanded = expandedCategories.has(category);

                        return (
                            <li key={category}>
                                <button onClick={() => handleToggleCategory(category)} className="w-full flex items-center justify-between text-left px-2 py-2 text-sm font-semibold text-gray-300 rounded-md hover:bg-white/10 transition-colors">
                                    <span>{category}</span>
                                    <ChevronRightIcon isExpanded={isExpanded} />
                                </button>
                                {isExpanded && (
                                    <ul className="mt-1 space-y-1 pl-4 border-l border-white/10 ml-2">
                                        {categoryTools.map(tool => (
                                            <li key={tool.id}>
                                                <button 
                                                    onClick={() => onSelectTool(tool)} 
                                                    className={`w-full flex items-center gap-3 text-left p-2 rounded-md text-sm transition-colors ${
                                                        selectedToolId === tool.id 
                                                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold' 
                                                        : 'text-gray-400 hover:bg-white/10 hover:text-gray-200'
                                                    }`}
                                                >
                                                    <span className="w-6 h-6 flex items-center justify-center shrink-0">{tool.icon}</span>
                                                    <span className="whitespace-nowrap">{tool.name}</span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <footer className="text-center py-2 px-4 text-gray-600 text-xs shrink-0 whitespace-nowrap">
                 &copy; {new Date().getFullYear()} IntelliForge Ai. v1.0.0
            </footer>
        </aside>
    );
};