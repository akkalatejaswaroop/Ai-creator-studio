
import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Tool, ChatMessage } from '../types';
import { GoogleGenAI, Chat } from '@google/genai';
import { isApiAvailable } from '../services/geminiService';
import { Loader } from './Loader';

// SVGs
const ChatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;
const SendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>;

// Helper to create system instruction
const createSystemInstruction = (tools: Tool[]): string => {
  const toolList = tools.map(tool => `- Tool: ${tool.name}, Description: ${tool.description}`).join('\n');
  return `You are Ricky, a friendly and helpful AI assistant for the IntelliForge Ai application.
Your sole purpose is to guide users on how to use the app's features and answer questions about its tools.
Do not answer any questions that are not related to using the IntelliForge Ai app. If a user asks an unrelated question, politely refuse and steer the conversation back to the app's functionality. For example, say "I can only help with questions about the IntelliForge Ai application. What would you like to know about our tools?".
Keep your answers concise and easy to understand.

Here is a list of available tools in the application that you can talk about:
${toolList}
`;
};

export const ChatAssistant: React.FC<{ tools: Tool[] }> = ({ tools }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Hi! I'm Ricky. How can I help you navigate IntelliForge Ai today?" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const initializeChat = useCallback(async () => {
    if (!isApiAvailable()) {
      console.error('API key not available');
      return false;
    }
    try {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const systemInstruction = createSystemInstruction(tools);
      chatRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { systemInstruction },
      });
      return true;
    } catch (e) {
      console.error('Failed to initialize chat:', e);
      return false;
    }
  }, [tools]);

  const handleSendMessage = async () => {
    if (!userInput.trim() || isLoading) return;

    const newUserMessage: ChatMessage = { role: 'user', content: userInput };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      if (!chatRef.current) {
        const initialized = await initializeChat();
        if (!initialized) {
          throw new Error('Could not initialize chat assistant.');
        }
      }

      if (chatRef.current) {
        const response = await chatRef.current.sendMessage({ message: userInput });
        const modelResponse: ChatMessage = { role: 'model', content: response.text };
        setMessages(prev => [...prev, modelResponse]);
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        role: 'model',
        content: 'Sorry, I seem to be having some trouble right now. Please try again later.'
      };
      setMessages(prev => [...prev, errorMessage]);
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-cyan-600 text-white p-4 rounded-full shadow-lg hover:bg-cyan-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 z-50 ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Open AI Assistant"
      >
        <ChatIcon />
      </button>

      <div className={`fixed bottom-6 right-6 w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[600px] bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out z-50 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <h3 className="font-bold text-white">Ricky - AI Assistant</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors" aria-label="Close chat">
            <CloseIcon />
          </button>
        </header>

        {/* Messages */}
        <div className="flex-grow p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-cyan-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-200 rounded-bl-none'}`}>
                <pre className="whitespace-pre-wrap font-sans">{msg.content}</pre>
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-2xl text-sm bg-gray-700 text-gray-200 rounded-bl-none flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <footer className="p-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about a tool..."
              className="flex-grow bg-gray-800 border border-gray-600 rounded-full py-2 px-4 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              disabled={isLoading}
            />
            <button onClick={handleSendMessage} disabled={isLoading || !userInput.trim()} className="bg-cyan-600 text-white p-2.5 rounded-full hover:bg-cyan-700 disabled:bg-gray-600 transition-colors">
              <SendIcon />
            </button>
          </div>
        </footer>
      </div>
    </>
  );
};
