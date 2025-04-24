import React from 'react';
import { TemplateGroup, Template } from '@/data/aiTools/templates/templateGroups';

interface TemplateSelectorProps {
  templateGroups: TemplateGroup[];
  selectedGroup: string;
  selectedTemplate: string;
  setSelectedGroup: (group: string) => void;
  setSelectedTemplate: (template: string) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templateGroups,
  selectedGroup,
  selectedTemplate,
  setSelectedGroup,
  setSelectedTemplate
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nhóm mẫu
        </label>
        <div className="flex flex-wrap gap-2">
          {templateGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => {
                setSelectedGroup(group.id);
                setSelectedTemplate(''); // Reset the selected template
              }}
              className={`px-4 py-2 text-sm rounded-full font-medium ${
                selectedGroup === group.id
                  ? 'bg-purple-100 text-purple-700 border border-purple-300'
                  : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              {group.name}
            </button>
          ))}
        </div>
      </div>
      
      {selectedGroup && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loại mẫu
          </label>
          <div className="grid grid-cols-1 gap-2">
            {templateGroups
              .find((group) => group.id === selectedGroup)
              ?.templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`px-4 py-3 border text-left rounded-md hover:bg-gray-50 ${
                    selectedTemplate === template.id
                      ? 'border-blue-500 bg-blue-50 shadow-sm'
                      : 'border-gray-300'
                  }`}
                >
                  <div className="font-medium">{template.name}</div>
                  {template.description && (
                    <div className="text-sm text-gray-500 mt-1">
                      {template.description}
                    </div>
                  )}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;