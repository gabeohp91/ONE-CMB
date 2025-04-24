import { useState, useCallback } from 'react';
import { templateGroups } from '@/data/aiTools/templates/templateGroups';
import { templateService } from '../services/templateService';

export function useTemplates() {
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [formData, setFormData] = useState({
    description: '',
    requester: '',
    date: '',
    amount: '',
    reason: '',
    days: '',
    startDate: '',
    endDate: '',
    equipment: '',
  });
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }, []);
  
  const generateContent = useCallback(async () => {
    setIsLoading(true);
    try {
      const content = await templateService.generateTemplate(selectedTemplate, formData);
      setGeneratedContent(content);
    } catch (error) {
      console.error('Error generating template content:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedTemplate, formData]);
  
  const resetForm = useCallback(() => {
    setFormData({
      description: '',
      requester: '',
      date: '',
      amount: '',
      reason: '',
      days: '',
      startDate: '',
      endDate: '',
      equipment: '',
    });
    setGeneratedContent('');
  }, []);
  
  // Get available templates for selected group
  const availableTemplates = selectedGroup 
    ? templateGroups.find(g => g.id === selectedGroup)?.templates || []
    : [];
    
  // Get the template object for the selected template
  const selectedTemplateObject = selectedTemplate 
    ? templateGroups.flatMap(g => g.templates).find(t => t.id === selectedTemplate)
    : null;
  
  return {
    templateGroups,
    selectedGroup,
    setSelectedGroup,
    selectedTemplate,
    setSelectedTemplate,
    availableTemplates,
    selectedTemplateObject,
    formData,
    setFormData,
    handleInputChange,
    generateContent,
    generatedContent,
    isLoading,
    resetForm
  };
}