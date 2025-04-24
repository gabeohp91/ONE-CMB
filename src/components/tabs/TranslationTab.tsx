import React, { useState } from 'react';
import { Upload, Download, Settings, RefreshCw, Copy, Pen, X, Save, ArrowLeftRight, ArrowRight, File } from 'lucide-react';
import { languageOptions } from '@/data/aiTools/translation/languageOptions';

const TranslationTab: React.FC = () => {
  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [targetLanguage, setTargetLanguage] = useState('vi');
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileTranslated, setFileTranslated] = useState(false);

  const handleTranslate = () => {
    if (!sourceText.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock translation
      let translated = '';
      if (sourceText && targetLanguage === 'vi') {
        translated = `Hệ thống ONE CMB là hệ thống quản lý nhân viên và công việc toàn diện được phát triển trên nền tảng Next.js và React. Hệ thống cung cấp giao diện trực quan để theo dõi và quản lý thông tin nhân viên, danh sách công việc, tài nguyên và các hoạt động trong doanh nghiệp. Được tích hợp trợ lý AI thông minh giúp nâng cao hiệu quả làm việc.

Các tính năng chính bao gồm bảng điều khiển tổng quan, quản lý công việc, quản lý tài nguyên, theo dõi hoạt động và tích hợp trợ lý AI. Hệ thống tương thích với nhiều kích thước màn hình và cung cấp giao diện đáp ứng.

Hệ thống được xây dựng với các công nghệ bao gồm Next.js 15.2.3, React 18.3.1, TypeScript, Tailwind CSS và nhiều thư viện khác để đảm bảo hiệu suất tối ưu và trải nghiệm người dùng.`;
      } else if (sourceText && targetLanguage === 'en') {
        translated = `The ONE CMB system is a comprehensive employee and work management system developed on the Next.js and React platform. The system provides an intuitive interface for tracking and managing employee information, task lists, resources, and activities within the enterprise. Integrated with intelligent AI assistants to improve work efficiency.

Key features include a dashboard overview, task management, resource management, activity tracking, and AI assistant integration. The system is compatible with multiple screen sizes and offers a responsive interface.

The system is built with technologies including Next.js 15.2.3, React 18.3.1, TypeScript, Tailwind CSS, and various other libraries to ensure optimal performance and user experience.`;
      } else {
        translated = `[Translated from ${sourceLanguage} to ${targetLanguage}]: ${sourceText}`;
      }
      
      setTranslatedText(translated);
      setIsLoading(false);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setFileTranslated(false);
  };

  const handleFileTranslate = () => {
    if (!selectedFile) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setFileTranslated(true);
      setIsLoading(false);
    }, 2000);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setFileTranslated(false);
  };
  
  const swapLanguages = () => {
    if (sourceLanguage !== 'auto') {
      setSourceLanguage(targetLanguage);
      setTargetLanguage(sourceLanguage);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dịch thuật bằng AI</h1>
        <button className="text-blue-600 hover:text-blue-800">
          <Settings size={20} />
        </button>
      </div>
      
      {/* Text Translation Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Dịch văn bản</h2>
        
        <div className="flex items-center mb-4 space-x-2">
          <select
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
            className="block w-40 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
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
            className="block w-40 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
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
              className="w-full h-64 p-3 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
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
            onClick={handleTranslate}
            disabled={isLoading || !sourceText.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 flex items-center space-x-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
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
      
      {/* Document Translation Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
            <File size={14} />
          </div>
          <h3 className="text-lg font-medium text-gray-800">Dịch tài liệu</h3>
        </div>
        
        {!selectedFile ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <File size={32} />
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Tải lên một tài liệu để dịch
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Hỗ trợ .doc, .docx, .pdf, .txt, .pptx, .xlsx
            </p>
            <label className="mt-4">
              <span className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer inline-block">
                Chọn tài liệu
              </span>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".doc,.docx,.pdf,.txt,.pptx,.xlsx"
              />
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
              <div className="flex items-center space-x-3">
                <File size={20} className="text-blue-600" />
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={clearFile}
                className="p-1 hover:bg-gray-200 rounded-full"
              >
                <X size={16} />
              </button>
            </div>
            
            {!fileTranslated ? (
              <button
                onClick={handleFileTranslate}
                disabled={isLoading}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Đang dịch...' : 'Dịch tài liệu'}
              </button>
            ) : (
              <button
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-1 focus:ring-green-500 flex items-center justify-center space-x-2"
              >
                <Download size={16} />
                <span>Tải xuống bản dịch</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslationTab;