import { useState, useCallback, useEffect } from 'react';
import aiService, { MessageContext } from '@/services/aiService';
import { useErrorHandler } from '@/hooks/use-error-handler';
import { useToast } from '@/shared/hooks/useToast';

export interface Message {
  id: string;
  sender: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

export interface Suggestion {
  id: string;
  text: string;
  action: () => void;
}

export interface UseAIAssistantOptions {
  initialMessages?: Message[];
  contextProvider?: () => MessageContext;
  onError?: (error: Error) => void;
}

export const useAIAssistant = (options: UseAIAssistantOptions = {}) => {
  const { initialMessages = [], contextProvider, onError } = options;
  
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [helpText, setHelpText] = useState<string>('');
  
  const { handleError } = useErrorHandler();
  const toast = useToast();
  
  // Load suggestions on mount and when context changes
  useEffect(() => {
    if (contextProvider) {
      loadSuggestions();
    }
  }, [contextProvider]);
  
  const loadSuggestions = async () => {
    if (!contextProvider) return;
    
    try {
      const context = contextProvider();
      const suggestionTexts = await aiService.generateSuggestions(context);
      
      // Convert to suggestion objects with dummy actions
      const newSuggestions = suggestionTexts.map((text, index) => ({
        id: `suggestion-${index}`,
        text,
        action: () => executeAction(text),
      }));
      
      setSuggestions(newSuggestions);
    } catch (error) {
      console.error('Failed to load suggestions:', error);
      // Don't show toast for this, as it's a background operation
    }
  };
  
  const loadContextualHelp = async () => {
    if (!contextProvider) return;
    
    try {
      setIsLoading(true);
      const context = contextProvider();
      const contextString = JSON.stringify(context);
      const help = await aiService.getContextualHelp(contextString);
      setHelpText(help);
    } catch (error) {
      console.error('Failed to load contextual help:', error);
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const sendMessage = async (messageText: string = inputMessage) => {
    if (!messageText.trim() || isLoading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: messageText.trim(),
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      // Create array of previous messages for context
      const chatHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));
      
      // Add the new user message
      chatHistory.push({
        role: 'user',
        content: userMessage.content
      });
      
      // Get context if available
      const context = contextProvider ? contextProvider() : undefined;
      
      // Get AI response
      const response = await aiService.generateChat(chatHistory, context);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: response || "Sorry, I couldn't process your request at this time.",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      
      // Refresh suggestions after successful conversation
      if (contextProvider) {
        loadSuggestions();
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      handleError(error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: "Sorry, an error occurred while processing your request. Please try again later.",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      if (onError) {
        onError(error instanceof Error ? error : new Error(String(error)));
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);
  
  const executeAction = async (actionText: string) => {
    try {
      toast.success(`Executing: ${actionText}`);
      
      // Add action as user message
      sendMessage(`I want to ${actionText.toLowerCase()}`);
      
      // Here we would add actual action execution logic
      // For now, we just show a toast and add a message
      
    } catch (error) {
      console.error('Error executing action:', error);
      handleError(error);
    }
  };
  
  return {
    messages,
    isLoading,
    inputMessage,
    setInputMessage,
    sendMessage,
    clearMessages,
    suggestions,
    executeAction,
    helpText,
    loadContextualHelp,
    loadSuggestions,
  };
};