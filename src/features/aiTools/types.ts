// Shared types for the AI Tools feature

// Translation types
export interface TranslationRequest {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface TranslationResponse {
  translatedText: string;
  detectedLanguage?: string;
}

export interface FileTranslationRequest {
  file: File;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface FileTranslationResponse {
  url: string;
  fileName: string;
}

// Template types
export interface TemplateGenerationRequest {
  templateId: string;
  formData: Record<string, any>;
}

export interface TemplateGenerationResponse {
  generatedContent: string;
}