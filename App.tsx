
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ContentPanel } from './components/ToolView';
import { HomePage } from './components/HomePage';
import { Tool, GenerationHistoryItem } from './types';
import { TOOLS, CATEGORIES } from './constants';
import { ChatAssistant } from './components/ChatAssistant';
import { OnboardingModal } from './components/OnboardingModal';
import { HistoryPanel } from './components/HistoryPanel';

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'tool' | 'history'>('home');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [history, setHistory] = useState<GenerationHistoryItem[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Onboarding check
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowOnboarding(true);
      localStorage.setItem('hasVisited', 'true');
    }

    // Load history from localStorage
    try {
      const storedHistory = localStorage.getItem('generationHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to parse history from localStorage", error);
      localStorage.removeItem('generationHistory');
    }
  }, []);

  const handleSelectTool = (tool: Tool) => {
    setSelectedTool(tool);
    setCurrentView('tool');
    if (window.innerWidth < 768) { // Auto-close sidebar on mobile
        setIsSidebarOpen(false);
    }
  };

  const handleBack = () => {
    setSelectedTool(null);
    setCurrentView('home');
  };
  
  const handleLogoClick = () => {
    setSelectedTool(null);
    setCurrentView('home');
    setSearchTerm('');
  };

  const handleSelectHistory = () => {
    setSelectedTool(null);
    setCurrentView('history');
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const addToHistory = (item: Omit<GenerationHistoryItem, 'id' | 'timestamp'>) => {
    setHistory(prevHistory => {
      const newHistory = [
        { ...item, id: Date.now().toString(), timestamp: Date.now() },
        ...prevHistory,
      ].slice(0, 15); // Keep only the last 15 items
      localStorage.setItem('generationHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('generationHistory');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'tool':
        return selectedTool && <ContentPanel tool={selectedTool} onBack={handleBack} onAddToHistory={addToHistory} />;
      case 'history':
        return <HistoryPanel history={history} onClearHistory={clearHistory} />;
      case 'home':
      default:
        return <HomePage 
                  searchTerm={searchTerm} 
                  setSearchTerm={setSearchTerm} 
                  tools={TOOLS}
                  categories={CATEGORIES}
                  onSelectTool={handleSelectTool}
                />;
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#0D1117] via-[#161B22] to-[#010409] font-sans flex overflow-hidden">
      <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />
      <Sidebar 
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        tools={TOOLS}
        categories={CATEGORIES}
        onSelectTool={handleSelectTool}
        onLogoClick={handleLogoClick}
        onSelectHistory={handleSelectHistory}
        currentView={currentView}
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
        <div className="p-6 md:p-10 h-full">
          {renderContent()}
        </div>
      </main>
      <ChatAssistant tools={TOOLS} />
    </div>
  );
};

export default App;