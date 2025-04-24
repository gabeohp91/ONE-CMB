export interface TranslationConfig {
  maxTextLength: number;
  supportedFileTypes: string[];
  maxFileSize: number; // in bytes
}

export const translationConfig: TranslationConfig = {
  maxTextLength: 5000,
  supportedFileTypes: ['.txt', '.doc', '.docx', '.pdf', '.pptx', '.xlsx'],
  maxFileSize: 5 * 1024 * 1024 // 5MB
};