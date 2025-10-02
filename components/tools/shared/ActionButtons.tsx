import React, { useState } from 'react';

export const ActionButtons = ({ text, toolName }: { text: string, toolName: string }) => {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${toolName.toLowerCase().replace(/\s/g, '_')}_output.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFeedback = (type: 'up' | 'down') => {
    setFeedback(type);
    // In a real app, you'd send this feedback to a server.
    // For now, we just show a temporary state.
  };

  return (
    <div className="absolute top-3 right-3 flex items-center gap-2">
       {/* Feedback Buttons */}
       <div className="flex items-center bg-white/10 rounded-lg p-0.5">
          <button onClick={() => handleFeedback('up')} className={`p-1.5 rounded-md ${feedback === 'up' ? 'bg-green-500/50' : 'hover:bg-white/20'}`} aria-label="Good response">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 18.236V6.73c0-.355.19-.684.493-.865l1.8-1.04c.306-.177.68-.177.986 0l1.8 1.04c.303.181.493.51.493.865v3.27z" /></svg>
          </button>
          <div className="w-px h-4 bg-white/20"></div>
          <button onClick={() => handleFeedback('down')} className={`p-1.5 rounded-md ${feedback === 'down' ? 'bg-red-500/50' : 'hover:bg-white/20'}`} aria-label="Bad response">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.738 3h4.017c.163 0 .326.02.485.06L17 5.764V17.27c0 .355-.19.684-.493.865l-1.8 1.04a.996.996 0 01-.986 0l-1.8-1.04a.996.996 0 01-.493-.865v-3.27z" /></svg>
          </button>
       </div>
       {/* Action Buttons */}
       <button onClick={handleDownload} className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors" aria-label="Download content">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
       </button>
       <button onClick={handleCopy} className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors" aria-label="Copy content">
         {copied ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}
       </button>
    </div>
  );
};
