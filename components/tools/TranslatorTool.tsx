import React, { useState, useEffect, useCallback } from 'react';
import { AiToolComponentProps, TranslatorToolProps } from '../../types';
import { Loader } from '../Loader';
import { Select } from './shared/Select';
import { streamTextGeneration } from './shared/utils';
import { isApiAvailable } from '../../services/geminiService';

const LANGUAGES = [
    { code: 'en-US', name: 'English' }, { code: 'es-ES', name: 'Spanish' },
    { code: 'fr-FR', name: 'French' }, { code: 'de-DE', name: 'German' },
    { code: 'it-IT', name: 'Italian' }, { code: 'pt-BR', name: 'Portuguese' },
    { code: 'ru-RU', name: 'Russian' }, { code: 'ja-JP', name: 'Japanese' },
    { code: 'ko-KR', name: 'Korean' }, { code: 'zh-CN', name: 'Chinese (Simplified)' },
    { code: 'ar-SA', name: 'Arabic' }, { code: 'hi-IN', name: 'Hindi' },
];

const SOURCE_LANGUAGES = [{ code: 'auto', name: 'Auto-detect' }, ...LANGUAGES];

// Icons
const SpeakerOnIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>;
const SpeakerOffIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>;
const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const SwapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>;


const TranslatorTool: React.FC<AiToolComponentProps> = ({ tool, onGenerationComplete }) => {
    const { placeholder, formalityLevels } = tool.props as TranslatorToolProps;
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [sourceLang, setSourceLang] = useState('auto');
    const [targetLang, setTargetLang] = useState('es-ES');
    const [formality, setFormality] = useState(formalityLevels[1]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const loadVoices = () => setVoices(speechSynthesis.getVoices());
        speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
        return () => { speechSynthesis.onvoiceschanged = null; };
    }, []);

    // FIX: Refactored handleTranslate to use the shared streamTextGeneration utility.
    // The previous implementation was attempting to re-implement the streaming logic
    // and incorrectly called `generateTextStream`, which was not imported.
    const handleTranslate = useCallback(() => {
        if (!inputText.trim()) return;

        const inputs = {
            sourceLang: sourceLang === 'auto' ? 'the detected language' : LANGUAGES.find(l => l.code === sourceLang)?.name || 'the detected language',
            targetLang: LANGUAGES.find(l => l.code === targetLang)?.name || 'English',
            formality,
            userInput: inputText,
        };

        // Pass an empty string for language to prevent the util from adding "output in language" text,
        // as the target language is already part of the prompt template.
        streamTextGeneration(
            tool,
            '',
            inputs,
            onGenerationComplete,
            setTranslatedText,
            setIsLoading,
            setError
        );
    }, [inputText, sourceLang, targetLang, formality, tool, onGenerationComplete]);

    const handleCopy = () => {
        navigator.clipboard.writeText(translatedText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSpeak = () => {
        if (!translatedText || isSpeaking) return;
        speechSynthesis.cancel(); // Cancel any previous speech
        const utterance = new SpeechSynthesisUtterance(translatedText);
        const targetVoice = voices.find(voice => voice.lang.startsWith(targetLang.split('-')[0]));
        utterance.voice = targetVoice || null;
        utterance.lang = targetLang;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        speechSynthesis.speak(utterance);
    };
    
    const handleStop = () => {
        speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    const handleSwap = () => {
        if (sourceLang === 'auto' || !translatedText) return;
        const newSourceLang = targetLang;
        const newTargetLang = sourceLang;
        setInputText(translatedText);
        setSourceLang(newSourceLang);
        setTargetLang(newTargetLang);
        setTranslatedText('');
    };
    
    return (
        <div className="flex flex-col h-full gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div className="w-full">
                    <label className="block text-xs text-gray-400 mb-1">From</label>
                    <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)} className="w-full p-2 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm">
                        {SOURCE_LANGUAGES.map(opt => <option key={opt.code} value={opt.code}>{opt.name}</option>)}
                    </select>
                </div>

                <button onClick={handleSwap} disabled={sourceLang === 'auto'} className="p-2 bg-black/30 border border-white/10 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors lg:col-start-2 lg:w-auto">
                    <SwapIcon />
                </button>

                <div className="w-full lg:col-start-3">
                    <label className="block text-xs text-gray-400 mb-1">To</label>
                    <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)} className="w-full p-2 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm">
                        {LANGUAGES.map(opt => <option key={opt.code} value={opt.code}>{opt.name}</option>)}
                    </select>
                </div>
                
                <div className="w-full">
                   <Select label="Formality Level" value={formality} onChange={(e) => setFormality(e.target.value)} options={formalityLevels} />
                </div>
            </div>

            <div className="flex-grow flex flex-col md:flex-row gap-4 min-h-0">
                <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={placeholder}
                    className="w-full md:w-1/2 h-full p-4 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
                />
                <div className="relative w-full md:w-1/2 h-full p-4 bg-black/20 border border-white/10 rounded-lg text-gray-200 text-sm overflow-y-auto">
                    {isLoading && !translatedText && <div className="absolute inset-0 flex items-center justify-center"><Loader /></div>}
                    {error && <div className="text-red-400">{error}</div>}
                    <pre className="whitespace-pre-wrap font-sans">{translatedText}</pre>
                    {isLoading && translatedText && <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse mt-2"></div>}
                    
                    {translatedText && !isLoading && (
                        <div className="absolute bottom-3 right-3 flex items-center gap-2">
                             {isSpeaking ? (
                                <button onClick={handleStop} className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors" aria-label="Stop speaking">
                                    <SpeakerOffIcon />
                                </button>
                             ) : (
                                <button onClick={handleSpeak} className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors" aria-label="Read text aloud">
                                    <SpeakerOnIcon />
                                </button>
                             )}
                            <button onClick={handleCopy} className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors" aria-label="Copy translated text">
                                {copied ? <CheckIcon /> : <CopyIcon />}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            
            <button onClick={handleTranslate} disabled={isLoading || !inputText} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300">
                {isLoading ? <><Loader /> Translating...</> : 'Translate'}
            </button>
        </div>
    );
};

export default TranslatorTool;
