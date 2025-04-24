import { useState, useCallback } from 'react';
import { languageOptions } from '@/data/aiTools/translation/languageOptions';
import { translationService } from '../services/translationService';

export function useTranslation() {
  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [targetLanguage, setTargetLanguage] = useState('vi');
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileTranslationUrl, setFileTranslationUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const translateText = useCallback(async () => {
    if (!sourceText.trim()) {
      setError('Please enter text to translate');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      const result = await translationService.translateText(
        sourceText,
        sourceLanguage,
        targetLanguage
      );
      
      setTranslatedText(result);
    } catch (err) {
      setError('Translation failed. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [sourceText, sourceLanguage, targetLanguage]);
  
  const translateFile = useCallback(async () => {
    if (!selectedFile) {
      setError('Please select a file to translate');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      const result = await translationService.translateFile(
        selectedFile,
        sourceLanguage,
        targetLanguage
      );
      
      setFileTranslationUrl(result.url);
    } catch (err) {
      setError('File translation failed. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile, sourceLanguage, targetLanguage]);
  
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setFileTranslationUrl('');
  }, []);
  
  const swapLanguages = useCallback(() => {
    if (sourceLanguage !== 'auto') {
      setSourceLanguage(targetLanguage);
      setTargetLanguage(sourceLanguage);
    }
  }, [sourceLanguage, targetLanguage]);
  
  const reset = useCallback(() => {
    setSourceText('');
    setTranslatedText('');
    setSelectedFile(null);
    setFileTranslationUrl('');
    setError('');
  }, []);
  
  return {
    languageOptions,
    sourceLanguage,
    setSourceLanguage,
    targetLanguage,
    setTargetLanguage,
    sourceText,
    setSourceText,
    translatedText,
    selectedFile,
    fileTranslationUrl,
    isLoading,
    error,
    translateText,
    translateFile,
    handleFileChange,
    swapLanguages,
    reset
  };
}