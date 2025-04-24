import React, { useCallback } from 'react';
import TranslationForm from './TranslationForm';
import DocumentPreview from './DocumentPreview';
import TranslationControls from './TranslationControls';
import { useTranslation } from '../../hooks/useTranslation';

export const TranslationTool: React.FC = () => {
  const {
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
  } = useTranslation();
  
  const handleCopy = useCallback(() => {
    if (translatedText) {
      navigator.clipboard.writeText(translatedText);
      // Could show a toast message here
    }
  }, [translatedText]);
  
  const handleDownload = useCallback(() => {
    if (translatedText) {
      const element = document.createElement('a');
      const file = new Blob([translatedText], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `translated_${new Date().toISOString().slice(0, 10)}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  }, [translatedText]);
  
  const clearFile = useCallback(() => {
    // Reset file-related state only
    setSelectedFile(null);
    setFileTranslationUrl('');
  }, [setSelectedFile, setFileTranslationUrl]);
  
  return (
    <div className="w-full space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Dịch văn bản
        </h2>
        
        <TranslationForm
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
          sourceText={sourceText}
          translatedText={translatedText}
          isLoading={isLoading}
          languageOptions={languageOptions}
          setSourceLanguage={setSourceLanguage}
          setTargetLanguage={setTargetLanguage}
          setSourceText={setSourceText}
          translateText={translateText}
          swapLanguages={swapLanguages}
        />
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        {translatedText && (
          <TranslationControls
            translatedText={translatedText}
            onCopy={handleCopy}
            onDownload={handleDownload}
            onReset={reset}
          />
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-sm">
        <DocumentPreview
          selectedFile={selectedFile}
          translationUrl={fileTranslationUrl}
          isLoading={isLoading}
          handleFileChange={handleFileChange}
          translateFile={translateFile}
          clearFile={clearFile}
        />
      </div>
    </div>
  );
};

export default TranslationTool;