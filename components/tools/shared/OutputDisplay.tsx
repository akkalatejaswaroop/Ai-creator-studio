import React, { useEffect, useRef } from 'react';
import { Loader } from '../../Loader';
import { ActionButtons } from './ActionButtons';
import { Tool } from '../../../types';

interface OutputDisplayProps {
    isLoading: boolean;
    error: string;
    content: string;
    defaultText: string;
    tool: Tool;
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ isLoading, error, content, defaultText, tool }) => {
    const outputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (outputRef.current && content) {
            // @ts-ignore
            outputRef.current.innerHTML = window.marked.parse(content);

            outputRef.current.querySelectorAll('pre code').forEach((block) => {
                // @ts-ignore
                window.hljs.highlightElement(block);
            });
        } else if (outputRef.current) {
            outputRef.current.innerHTML = '';
        }
    }, [content]);

    return (
        <div className="w-full h-full flex-grow bg-black/30 border border-white/10 rounded-lg p-4 pt-12 overflow-y-auto relative text-sm">
            {isLoading && !content && <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-10"><Loader /><p className="mt-4 text-gray-300 animate-pulse">AI is thinking...</p></div>}
            {error && <div className="text-red-400 p-4 bg-red-900/50 rounded-lg">{error}</div>}
            
            {content ? <ActionButtons text={content} toolName={tool.name} /> : null}
            
            <div ref={outputRef} className="markdown-body" aria-live="polite"></div>

            {!isLoading && !content && !error && (
                <div className="text-gray-500 flex items-center justify-center h-full">{defaultText}</div>
            )}
            {isLoading && content && (
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse ml-1"></div>
            )}
        </div>
    );
};
