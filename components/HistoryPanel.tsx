
import React from 'react';
import { GenerationHistoryItem } from '../types';

interface HistoryPanelProps {
  history: GenerationHistoryItem[];
  onClearHistory: () => void;
}

const HistoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onClearHistory }) => {
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="flex flex-col h-full opacity-0 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <span className="text-cyan-400"><HistoryIcon /></span>
          <div>
            <h2 className="text-2xl font-bold text-white">Generation History</h2>
            <p className="text-gray-400">Your last 15 generations are saved here.</p>
          </div>
        </div>
        {history.length > 0 && (
          <button 
            onClick={onClearHistory}
            className="flex items-center gap-2 bg-red-600/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-600/40 transition-colors text-sm font-semibold"
          >
            <TrashIcon />
            Clear History
          </button>
        )}
      </div>

      <div className="flex-grow overflow-y-auto bg-black/20 rounded-lg p-4">
        {history.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>You haven't generated anything yet. Your history will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id} className="bg-white/5 p-4 rounded-lg border border-white/10">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-white">{item.toolName}</h3>
                    <p className="text-xs text-gray-500">{formatTimestamp(item.timestamp)}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-gray-400 mb-2 font-mono truncate" title={item.inputSummary}>
                    <strong className="text-gray-300">Input:</strong> {item.inputSummary}
                  </p>
                  <details className="group">
                      <summary className="text-sm text-cyan-400 cursor-pointer">View Output</summary>
                      <div className="mt-2 p-3 bg-black/30 rounded-md border border-white/10 max-h-48 overflow-y-auto">
                          <pre className="whitespace-pre-wrap text-xs text-gray-300 font-sans">{item.output}</pre>
                      </div>
                  </details>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
