import React, { useState, useEffect } from 'react';
import { AiToolComponentProps, VoiceMessageToolProps } from '../../types';

// Icons
const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" /></svg>;
const StopIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" /></svg>;

const VoiceMessageTool: React.FC<AiToolComponentProps> = ({ tool, onGenerationComplete }) => {
    const { placeholder } = tool.props as VoiceMessageToolProps;
    const [text, setText] = useState('');
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<string | undefined>(undefined);
    const [pitch, setPitch] = useState(1);
    const [rate, setRate] = useState(1);
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = speechSynthesis.getVoices();
            setVoices(availableVoices);
            if (availableVoices.length > 0 && !selectedVoice) {
                const defaultVoice = availableVoices.find(v => v.default);
                setSelectedVoice(defaultVoice ? defaultVoice.name : availableVoices[0].name);
            }
        };
        speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
        return () => { 
            speechSynthesis.onvoiceschanged = null; 
            speechSynthesis.cancel();
        };
    }, [selectedVoice]);

    const handleSpeak = () => {
        if (!text || isSpeaking) return;
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const voice = voices.find(v => v.name === selectedVoice);
        if (voice) utterance.voice = voice;
        utterance.pitch = pitch;
        utterance.rate = rate;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = (e) => {
            console.error('Speech synthesis error:', e);
            setIsSpeaking(false);
        };
        speechSynthesis.speak(utterance);
        onGenerationComplete(text, `Generated voice message.`);
    };
    
    const handleStop = () => {
        speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    return (
        <div className="flex flex-col h-full gap-4">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={placeholder}
                className="w-full flex-grow p-4 bg-black/30 border border-white/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-black/20 border border-white/10 rounded-lg">
                <div>
                    <label className="block text-xs text-gray-400 mb-1">Voice</label>
                    <select value={selectedVoice} onChange={e => setSelectedVoice(e.target.value)} className="w-full p-2 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all text-sm">
                        {voices.map(voice => (
                            <option key={voice.name} value={voice.name}>{voice.name} ({voice.lang})</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-xs text-gray-400 mb-1">Pitch: {pitch.toFixed(1)}</label>
                    <input type="range" min="0" max="2" step="0.1" value={pitch} onChange={e => setPitch(parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                </div>
                <div>
                    <label className="block text-xs text-gray-400 mb-1">Speed: {rate.toFixed(1)}x</label>
                    <input type="range" min="0.1" max="2" step="0.1" value={rate} onChange={e => setRate(parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                </div>
            </div>

            <button
                onClick={isSpeaking ? handleStop : handleSpeak}
                disabled={!text}
                className={`w-full flex justify-center items-center gap-2 text-white font-semibold py-3 px-4 rounded-lg transition-all ${isSpeaking ? 'bg-red-600 hover:bg-red-700' : 'bg-cyan-600 hover:bg-cyan-700'} disabled:bg-gray-600 disabled:cursor-not-allowed`}
            >
                {isSpeaking ? <><StopIcon /> Stop Playback</> : <><PlayIcon /> Generate & Play</>}
            </button>
        </div>
    );
};

export default VoiceMessageTool;