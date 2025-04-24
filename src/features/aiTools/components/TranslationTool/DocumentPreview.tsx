import React from 'react';
import { File, X, Download } from 'lucide-react';

interface DocumentPreviewProps {
  selectedFile: File | null;
  translationUrl: string;
  isLoading: boolean;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  translateFile: () => Promise<void>;
  clearFile: () => void;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  selectedFile,
  translationUrl,
  isLoading,
  handleFileChange,
  translateFile,
  clearFile
}) => {
  return (
    <div className="w-full border border-gray-300 rounded-md p-6">
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
            <span className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-block">
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
          
          {!translationUrl ? (
            <button
              onClick={translateFile}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Đang dịch...' : 'Dịch tài liệu'}
            </button>
          ) : (
            <a
              href={translationUrl}
              download
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
            >
              <Download size={16} />
              <span>Tải xuống bản dịch</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentPreview;