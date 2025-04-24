import React from 'react';
import TemplateSelector from './TemplateSelector';
import TemplateForm from './TemplateForm';
import TemplatePreview from './TemplatePreview';
import { useTemplates } from '../../hooks/useTemplates';

export const TemplateTool: React.FC = () => {
  const {
    templateGroups,
    selectedGroup,
    setSelectedGroup,
    selectedTemplate,
    setSelectedTemplate,
    selectedTemplateObject,
    formData,
    handleInputChange,
    generateContent,
    generatedContent,
    isLoading,
    resetForm
  } = useTemplates();
  
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Viết nội dung theo mẫu
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <TemplateSelector
              templateGroups={templateGroups}
              selectedGroup={selectedGroup}
              selectedTemplate={selectedTemplate}
              setSelectedGroup={setSelectedGroup}
              setSelectedTemplate={setSelectedTemplate}
            />
            
            {selectedTemplate && (
              <TemplateForm
                templateId={selectedTemplate}
                formData={formData}
                isLoading={isLoading}
                handleInputChange={handleInputChange}
                generateContent={generateContent}
                resetForm={resetForm}
              />
            )}
          </div>
          
          <div className="border border-gray-200 rounded-md h-[500px] flex flex-col">
            <TemplatePreview
              generatedContent={generatedContent}
              templateName={selectedTemplateObject?.name || ''}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateTool;