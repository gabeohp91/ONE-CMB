import axios from 'axios';

class TemplateService {
  // Method to generate content based on template and form data
  async generateTemplate(templateId: string, formData: Record<string, any>) {
    try {
      const response = await axios.post('/api/ai/generate-template', {
        templateId,
        formData
      });
      
      return response.data.generatedContent;
    } catch (error) {
      console.error('Template generation error:', error);
      throw new Error('Failed to generate template content');
    }
  }
  
  // Method to save generated content
  async saveGeneratedContent(content: string, fileName: string) {
    try {
      const response = await axios.post('/api/ai/save-template', {
        content,
        fileName
      });
      
      return response.data;
    } catch (error) {
      console.error('Error saving template:', error);
      throw new Error('Failed to save generated content');
    }
  }
}

export const templateService = new TemplateService();