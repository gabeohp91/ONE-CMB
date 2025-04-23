'use client';

import axios from 'axios';
import { ApiError } from './api';

export interface AIServiceProps {
  model?: string;
  temperature?: number;
  maxOutputTokens?: number;
}

export interface MessageContext {
  user?: any;
  recentTasks?: any[];
  currentPage?: string;
  [key: string]: any;
}

export class AIService {
  async generateText(prompt: string): Promise<string> {
    try {
      const response = await axios.post('/api/ai', {
        action: 'generate',
        prompt
      });
      return response.data.result;
    } catch (error) {
      console.error('Error generating text:', error);
      throw new ApiError('Failed to generate text. Please try again later.', 500);
    }
  }

  async generateChat(messages: { role: string; content: string }[], context?: MessageContext): Promise<string> {
    try {
      const response = await axios.post('/api/ai', {
        action: 'chat',
        messages,
        context
      });
      return response.data.result;
    } catch (error) {
      console.error('Error generating chat response:', error);
      throw new ApiError('Failed to generate chat response. Please try again later.', 500);
    }
  }

  async translate(text: string, targetLanguage: string): Promise<string> {
    try {
      const response = await axios.post('/api/ai', {
        action: 'translate',
        prompt: text,
        targetLanguage
      });
      return response.data.result;
    } catch (error) {
      console.error('Error translating text:', error);
      throw new ApiError('Translation service is currently unavailable. Please try again later.', 500);
    }
  }
  
  async getContextualHelp(context: string): Promise<string> {
    try {
      const response = await axios.post('/api/ai', {
        action: 'contextualHelp',
        prompt: context
      });
      return response.data.result;
    } catch (error) {
      console.error('Error getting contextual help:', error);
      throw new ApiError('Failed to get contextual help. Please try again later.', 500);
    }
  }
  
  async generateSuggestions(context: MessageContext): Promise<string[]> {
    try {
      const response = await axios.post('/api/ai', {
        action: 'suggestions',
        context
      });
      const text = response.data.result;
      
      try {
        // Try to parse as JSON
        return JSON.parse(text);
      } catch (parseError) {
        console.error('Failed to parse suggestions as JSON:', parseError);
        // Extract suggestions manually using regex
        const suggestions = text.match(/["'](.+?)["']/g);
        return suggestions 
          ? suggestions.map(s => s.replace(/^["']|["']$/g, '')) 
          : ['View recent tasks', 'Check notifications', 'Update profile'];
      }
    } catch (error) {
      console.error('Error generating suggestions:', error);
      return ['View recent tasks', 'Check notifications', 'Update profile'];
    }
  }
}

// Export singleton instance
const aiService = new AIService();
export default aiService;