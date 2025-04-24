import React, { useCallback } from 'react';
import { Copy, Download, FileText } from 'lucide-react';

interface TemplatePreviewProps {
  generatedContent: string;
  templateName: string;
}

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  generatedContent,
  templateName
}) => {
  const handleCopy = useCallback(() => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
      // Could show a toast message here
    }
  }, [generatedContent]);
  
  const handleDownload = useCallback(() => {
    if (generatedContent) {
      const element = document.createElement('a');
      const file = new Blob([generatedContent], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${templateName.replace(/\s+/g, '_').toLowerCase()}_${new Date().toISOString().slice(0, 10)}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  }, [generatedContent, templateName]);
  
  if (!generatedContent) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-gray-500">
        <FileText size={48} className="text-gray-300 mb-4" />
        <p>Nội dung tạo ra sẽ xuất hiện ở đây</p>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div className="font-medium">{templateName || 'Nội dung đã tạo'}</div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded hover:bg-gray-200"
            title="Sao chép"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={handleDownload}
            className="p-1.5 rounded hover:bg-gray-200"
            title="Tải xuống"
          >
            <Download size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-auto whitespace-pre-wrap bg-white border-t border-gray-200">
        {generatedContent}
      </div>
    </div>
  );
};

export default TemplatePreview;