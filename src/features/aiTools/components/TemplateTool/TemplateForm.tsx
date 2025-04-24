import React from 'react';
import { TemplateType, TemplateField } from '@/data/aiTools/templates/templateTypes';

interface TemplateFormProps {
  templateId: string;
  formData: Record<string, any>;
  isLoading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  generateContent: () => Promise<void>;
  resetForm: () => void;
}

export const TemplateForm: React.FC<TemplateFormProps> = ({
  templateId,
  formData,
  isLoading,
  handleInputChange,
  generateContent,
  resetForm
}) => {
  // Import template types using require to avoid issues with jest
  const { templateTypes } = require('@/data/aiTools/templates/templateTypes');
  
  // Find the template configuration based on the selected template ID
  const templateConfig: TemplateType | undefined = templateTypes.find(
    (t: TemplateType) => t.templateId === templateId
  );
  
  if (!templateConfig) {
    return (
      <div className="text-center py-6 text-gray-500">
        Vui lòng chọn mẫu để tiếp tục
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {templateConfig.fields.map((field: TemplateField) => (
        <div key={field.id}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.name} {field.required && <span className="text-red-500">*</span>}
          </label>
          
          {field.type === 'textarea' ? (
            <textarea
              name={field.id}
              value={formData[field.id] || ''}
              onChange={handleInputChange}
              placeholder={field.placeholder}
              required={field.required}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : field.type === 'date' ? (
            <input
              type="date"
              name={field.id}
              value={formData[field.id] || ''}
              onChange={handleInputChange}
              required={field.required}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : field.type === 'number' ? (
            <input
              type="number"
              name={field.id}
              value={formData[field.id] || ''}
              onChange={handleInputChange}
              placeholder={field.placeholder}
              required={field.required}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <input
              type="text"
              name={field.id}
              value={formData[field.id] || ''}
              onChange={handleInputChange}
              placeholder={field.placeholder}
              required={field.required}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          )}
        </div>
      ))}
      
      <div className="flex items-center space-x-3 pt-4">
        <button
          onClick={generateContent}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Đang tạo...' : 'Tạo nội dung'}
        </button>
        
        <button
          onClick={resetForm}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Làm mới
        </button>
      </div>
    </div>
  );
};

export default TemplateForm;