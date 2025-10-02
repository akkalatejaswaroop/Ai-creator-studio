import { generateTextStream, isApiAvailable } from '../../../services/geminiService';
import { Tool } from '../../../types';

export const streamTextGeneration = async (
    tool: Tool,
    language: string,
    inputs: Record<string, string>,
    onGenerationComplete: (input: string, output: string) => void,
    setGeneratedContent: (content: string) => void,
    setIsLoading: (loading: boolean) => void,
    setError: (error: string) => void
) => {
    const hasAllInputs = Object.values(inputs).every(value => typeof value === 'string' && value.trim() !== '');
    if (!hasAllInputs) return;

    if (!isApiAvailable()) {
        setError('Gemini API key is not configured.');
        return;
    }

    setIsLoading(true);
    setGeneratedContent('');
    setError('');

    try {
        let finalPrompt = (tool.props as any).promptTemplate;
        let inputSummary = "";
        
        Object.entries(inputs).forEach(([key, value]) => {
            finalPrompt = finalPrompt.replace(new RegExp(`{${key}}`, 'g'), value);
            // Summarize user input for history, prioritizing keys with 'userInput'
            if (key.startsWith('userInput')) {
              inputSummary += value + " ";
            }
        });
        
        if (!inputSummary) { // Fallback for tools without 'userInput' key
            inputSummary = Object.values(inputs).join(' ');
        }

        let fullResponse = "";
        for await (const chunk of generateTextStream(finalPrompt, tool.systemInstruction, language)) {
            fullResponse += chunk;
            setGeneratedContent(fullResponse);
        }
        onGenerationComplete(inputSummary.trim(), fullResponse);
    } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
        setIsLoading(false);
    }
};
