import React from 'react';
import { Copy, Download, Refresh } from 'lucide-react';

interface TranslationControlsProps {
  translatedText: string;
  onCopy: () => void;
  onDownload: () => void;
  onReset: () => void;
}

export const TranslationControls: React.FC<TranslationControlsProps> = ({
  translatedText,
  onCopy,
  onDownload,
  onReset
}) => {
  return (
    <div className="flex items-center space-x-2 mt-4">
      <button
        onClick={onCopy}
        disabled={!translatedText}
        className="flex items-center space-x-1 px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Copy size={14} />
        <span>Sao chép</span>
      </button>
      
      <button
        onClick={onDownload}
        disabled={!translatedText}
        className="flex items-center space-x-1 px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Download size={14} />
        <span>Tải xuống</span>
      </button>
      
      <button
        onClick={onReset}
        className="flex items-center space-x-1 px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-auto"
      >
        <Refresh size={14} />
        <span>Làm mới</span>
      </button>
    </div>
  );
};

export default TranslationControls;