
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ContentPanel } from './components/ToolView';
import { HomePage } from './components/HomePage';
import { Tool } from './types';
import { TOOLS, CATEGORIES } from './constants';
import { ChatAssistant } from './components/ChatAssistant';

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const App: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSelectTool = (tool: Tool) => {
    setSelectedTool(tool);
    if (window.innerWidth < 768) { // Auto-close sidebar on mobile
        setIsSidebarOpen(false);
    }
  };

  const handleBack = () => {
    setSelectedTool(null);
  };
  
  const handleLogoClick = () => {
    setSelectedTool(null);
    setSearchTerm('');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#0D1117] via-[#161B22] to-[#010409] font-sans flex overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        tools={TOOLS}
        categories={CATEGORIES}
        onSelectTool={handleSelectTool}
        onLogoClick={handleLogoClick}
        selectedToolId={selectedTool?.id}
        searchTerm={searchTerm}
      />
      <main className="flex-grow overflow-y-auto relative">
        {!isSidebarOpen && (
            <button 
                onClick={toggleSidebar} 
                className="absolute top-5 left-5 z-20 p-2 bg-black/30 backdrop-blur-md rounded-md hover:bg-white/10 transition-colors"
                aria-label="Open sidebar"
            >
                <MenuIcon />
            </button>
        )}
        <div className="p-4 md:p-8 lg:p-12 h-full">
            {selectedTool ? (
              <ContentPanel tool={selectedTool} onBack={handleBack} />
            ) : (
              <HomePage 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                tools={TOOLS}
                onSelectTool={handleSelectTool}
              />
            )}
        </div>
      </main>
      <ChatAssistant tools={TOOLS} />
    </div>
  );
};

export default App;
