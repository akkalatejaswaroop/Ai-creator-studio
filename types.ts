import type React from 'react';

export enum ToolCategory {
  Writing = 'Writing',
  Learning = 'Learning & Academia',
  Research = 'Research & Review',
  Coding = 'Coding & Development',
  Professional = 'Professional Growth',
  Marketing = 'SEO & Marketing',
  Creative = 'Creative Content',
  Engineering = 'Engineering & Tech',
}

export enum ToolComponentType {
  Generic = 'Generic',
  SocialMedia = 'SocialMedia',
  VideoScript = 'VideoScript',
  ImageInput = 'ImageInput',
  ImageGenerator = 'ImageGenerator',
  GroundedQA = 'GroundedQA',
  BlogPost = 'BlogPost',
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


export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: React.ReactNode;
  component: ToolComponentType;
  props: GenericToolProps | SocialMediaToolProps | VideoScriptToolProps | ImageInputToolProps | ImageGeneratorToolProps | GroundedQAToolProps | BlogPostToolProps;
  systemInstruction: string;
  context: ToolContext;
  featured?: boolean;
}