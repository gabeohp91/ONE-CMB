import React from 'react';
import { ArrowRight, ArrowLeftRight } from 'lucide-react';
import { LanguageOption } from '@/data/aiTools/translation';

interface TranslationFormProps {
  sourceLanguage: string;
  targetLanguage: string;
  sourceText: string;
  translatedText: string;
  isLoading: boolean;
  languageOptions: LanguageOption[];
  setSourceLanguage: (lang: string) => void;
  setTargetLanguage: (lang: string) => void;
  setSourceText: (text: string) => void;
  translateText: () => Promise<void>;
  swapLanguages: () => void;
}

export const TranslationForm: React.FC<TranslationFormProps> = ({
  sourceLanguage,
  targetLanguage,
  sourceText,
  translatedText,
  isLoading,
  languageOptions,
  setSourceLanguage,
  setTargetLanguage,
  setSourceText,
  translateText,
  swapLanguages
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center mb-4 space-x-2">
        <select
          value={sourceLanguage}
          onChange={(e) => setSourceLanguage(e.target.value)}
          className="block w-40 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {languageOptions.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.nativeName}
            </option>
          ))}
        </select>
        
        <button
          onClick={swapLanguages}
          disabled={sourceLanguage === 'auto'}
          className={`p-2 rounded-full ${sourceLanguage === 'auto' ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
        >
          <ArrowLeftRight size={16} />
        </button>
        
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          className="block w-40 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {languageOptions.filter(lang => lang.code !== 'auto').map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.nativeName}
            </option>
          ))}
        </select>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="mb-1 flex justify-between">
            <label className="text-sm font-medium text-gray-700">Văn bản nguồn</label>
            <span className="text-xs text-gray-500">{sourceText.length}/5000 ký tự</span>
          </div>
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="Nhập văn bản để dịch..."
            className="w-full h-64 p-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <div className="mb-1">
            <label className="text-sm font-medium text-gray-700">Văn bản đã dịch</label>
          </div>
          <textarea
            value={translatedText}
            readOnly
            placeholder="Bản dịch sẽ xuất hiện ở đây..."
            className="w-full h-64 p-3 border border-gray-300 rounded-md text-sm shadow-sm bg-gray-50"
          />
        </div>
      </div>
      
      <div className="mt-4 flex justify-center">
        <button
          onClick={translateText}
          disabled={isLoading || !sourceText.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center space-x-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span>Đang dịch...</span>
          ) : (
            <>
              <span>Dịch</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TranslationForm;