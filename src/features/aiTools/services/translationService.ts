import axios from 'axios';

class TranslationService {
  // Method to translate text
  async translateText(text: string, sourceLanguage: string, targetLanguage: string) {
    try {
      const response = await axios.post('/api/ai/translate', {
        text,
        sourceLanguage,
        targetLanguage
      });
      
      return response.data.translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      throw new Error('Failed to translate text');
    }
  }
  
  // Method to translate file
  async translateFile(file: File, sourceLanguage: string, targetLanguage: string) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('sourceLanguage', sourceLanguage);
      formData.append('targetLanguage', targetLanguage);
      
      const response = await axios.post('/api/ai/translate-file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('File translation error:', error);
      throw new Error('Failed to translate file');
    }
  }
}

export const translationService = new TranslationService();