import type React from 'react';

export enum ToolCategory {
  Writing = 'Writing',
  Business = 'Business & Marketing', // Renamed for clarity
  Communication = 'Communication',
  Learning = 'Learning & Academia',
  Research = 'Research & Review',
  Coding = 'Coding & Development',
  Professional = 'Professional Growth',
  Marketing = 'SEO & Marketing',
  Creative = 'Creative Content',
  Engineering = 'Engineering & Tech',
  FileUtilities = 'File & Media Utilities',
}

export enum ToolComponentType {
  Generic = 'Generic',
  SocialMedia = 'SocialMedia',
  VideoScript = 'VideoScript',
  ImageInput = 'ImageInput',
  ImageGenerator = 'ImageGenerator',
  GroundedQA = 'GroundedQA',
  BlogPost = 'BlogPost',
  GrammarTool = 'GrammarTool',
  ToneChangerTool = 'ToneChangerTool',
  EmailWriterTool = 'EmailWriterTool',
  StudyTool = 'StudyTool',
  ResumeTool = 'ResumeTool', // Deprecated, will be replaced by IndustryInputTool
  // New granular tool types for enhanced features
  SingleSelectTool = 'SingleSelectTool',
  DoubleSelectTool = 'DoubleSelectTool',
  DualTextareaTool = 'DualTextareaTool',
  IndustryInputTool = 'IndustryInputTool',
  MessageReplyTool = 'MessageReplyTool',
  NoticeGeneratorTool = 'NoticeGeneratorTool',
  AnnouncementGeneratorTool = 'AnnouncementGeneratorTool',
  // University Tools
  SyllabusDesignerTool = 'SyllabusDesignerTool',
  TimetableOptimizerTool = 'TimetableOptimizerTool',
  GrantProposalTool = 'GrantProposalTool',
  EssayAnalyzerTool = 'EssayAnalyzerTool',
}

export interface ToolContext {
  purpose: string;
  benefit: string;
  proFeature: string;
}

export interface GenericToolProps {
  promptTemplate: string;
  placeholder: string;
}

export interface SocialMediaToolProps {
  promptTemplate: string;
  platforms: string[];
  tones: string[];
}

export interface VideoScriptToolProps {
  promptTemplate: string;
  platforms: string[];
  styles: string[];
}

export interface BlogPostToolProps {
  promptTemplate: string;
  placeholder: string;
  tones: string[];
  styles: string[];
  audiences: string[];
}

export interface ImageInputToolProps {
  promptTemplate: string;
  placeholder: string;
}

export interface ImageGeneratorToolProps {
  placeholder: string;
}

export interface GroundedQAToolProps {
  placeholder: string;
}

export interface GrammarToolProps {
  promptTemplate: string;
  placeholder: string;
  styles: string[];
}

export interface ToneChangerToolProps {
  promptTemplate: string;
  placeholder: string;
  tones: string[];
  intensities: string[];
}

export interface EmailWriterToolProps {
  promptTemplate: string;
  placeholder: string;
  politenessLevels: string[];
}

export interface StudyToolProps {
  promptTemplate: string;
  placeholder: string;
  difficulties: string[];
}

// Kept for backward compatibility for now, but should be removed.
export interface ResumeToolProps {
  promptTemplate: string;
  placeholder: string;
}

export interface SingleSelectToolProps {
  promptTemplate: string;
  placeholder: string;
  select: {
    label: string;
    options: string[];
  };
}

export interface DoubleSelectToolProps {
  promptTemplate: string;
  placeholder: string;
  select1: {
    label: string;
    options: string[];
  };
  select2: {
    label: string;
    options: string[];
  };
}

export interface DualTextareaToolProps {
  promptTemplate: string;
  placeholder1: string;
  placeholder2: string;
  label1: string;
  label2: string;
}

export interface IndustryInputToolProps {
  promptTemplate: string;
  placeholder: string;
  industryLabel: string;
  industryPlaceholder: string;
}

export interface MessageReplyToolProps {
  promptTemplate: string;
  placeholder: string;
  contextPlaceholder: string;
  intents: string[];
  tones: string[];
  formalities: string[];
}

export interface NoticeGeneratorToolProps {
  promptTemplate: string;
  noticeTypes: string[];
  channels: string[];
  urgencyLevels: string[];
}

export interface AnnouncementGeneratorToolProps {
  promptTemplate: string;
  placeholder: string;
  ctaPlaceholder: string;
  announcementTypes: string[];
}

export interface SyllabusDesignerToolProps {
  promptTemplate: string;
  titlePlaceholder: string;
  descriptionPlaceholder: string;
  levels: string[];
}

export interface GrantProposalToolProps {
    promptTemplate: string;
    placeholder: string;
    fundingBodyLabel: string;
    fundingBodyPlaceholder: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: React.ReactNode;
  component: ToolComponentType;
  props: GenericToolProps | SocialMediaToolProps | VideoScriptToolProps | ImageInputToolProps | ImageGeneratorToolProps | GroundedQAToolProps | BlogPostToolProps | GrammarToolProps | ToneChangerToolProps | EmailWriterToolProps | StudyToolProps | ResumeToolProps | SingleSelectToolProps | DoubleSelectToolProps | DualTextareaToolProps | IndustryInputToolProps | MessageReplyToolProps | NoticeGeneratorToolProps | AnnouncementGeneratorToolProps | SyllabusDesignerToolProps | GrantProposalToolProps;
  systemInstruction: string;
  context: ToolContext;
  featured?: boolean;
}

export interface AiToolComponentProps {
    tool: Tool;
    language: string;
    onGenerationComplete: (input: string, output: string) => void;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface GenerationHistoryItem {
    id: string;
    toolName: string;
    inputSummary: string;
    output: string;
    timestamp: number;
}