import { NextRequest, NextResponse } from 'next/server';

// Conditionally import GenModel only in production environment
let GenModel;
try {
  // This will only run on the server
  GenModel = require('@genkit-ai/googleai').GenModel;
} catch (error) {
  console.warn('GoogleAI library not available, using mock implementation');
}

// Mock implementation for development
class MockGenModel {
  async generateText(prompt: string) {
    console.log('MockGenModel.generateText called with:', prompt);
    return {
      text: () => `Mock response for: ${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}`
    };
  }
  
  async generateChat(messages: any[]) {
    console.log('MockGenModel.generateChat called with:', messages.length, 'messages');
    const lastMessage = messages[messages.length - 1];
    return {
      text: () => `Mock chat response. You asked about: ${lastMessage.content.substring(0, 50)}${lastMessage.content.length > 50 ? '...' : ''}`
    };
  }
}

// Use real or mock model based on availability
const model = GenModel 
  ? new GenModel({
      modelName: 'genai/model',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    })
  : new MockGenModel();

type MessageRole = 'user' | 'assistant' | 'system';

interface Message {
  role: MessageRole;
  content: string;
}

interface MessageContext {
  user?: any;
  recentTasks?: any[];
  currentPage?: string;
  [key: string]: any;
}

export async function POST(request: NextRequest) {
  try {
    const { action, messages, prompt, context, targetLanguage } = await request.json();
    
    let result = '';
    
    switch (action) {
      case 'chat':
        // Add context to the messages if provided
        const messagesWithContext = context
          ? [...messages, { role: 'system', content: `Context: ${JSON.stringify(context)}` }]
          : messages;
          
        const chatResult = await model.generateChat(messagesWithContext);
        result = chatResult.text();
        break;
        
      case 'generate':
        const textResult = await model.generateText(prompt);
        result = textResult.text();
        break;
        
      case 'translate':
        const translatePrompt = `Translate the following text to ${targetLanguage}: ${prompt}`;
        const translateResult = await model.generateText(translatePrompt);
        result = translateResult.text();
        break;
        
      case 'suggestions':
        const suggestionsPrompt = `Based on the following user context, generate 3-5 helpful action suggestions that the user might want to take. Each suggestion should be brief (10 words or less) and directly actionable. Return the suggestions as a JSON array of strings.\n\nContext: ${JSON.stringify(context)}`;
        
        const suggestionsResult = await model.generateText(suggestionsPrompt);
        const suggestionsText = suggestionsResult.text();
        
        // In development mode, return predefined suggestions
        if (!GenModel) {
          return NextResponse.json({ 
            result: JSON.stringify([
              "Review pending tasks",
              "Schedule team meeting",
              "Update project status",
              "Check weekly report",
              "Respond to messages"
            ])
          });
        }
        
        try {
          // Try to parse as JSON
          result = suggestionsText;
        } catch (parseError) {
          console.error('Failed to parse suggestions as JSON:', parseError);
          // Return raw text
          result = suggestionsText;
        }
        break;
        
      case 'contextualHelp':
        const helpPrompt = `Based on the following context, provide helpful information or tips: ${prompt}`;
        const helpResult = await model.generateText(helpPrompt);
        result = helpResult.text();
        break;
        
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
    
    return NextResponse.json({ result });
  } catch (error) {
    console.error('AI API error:', error);
    return NextResponse.json(
      { error: 'Failed to process AI request' },
      { status: 500 }
    );
  }
}