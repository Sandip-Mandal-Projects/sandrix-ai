// Core types for ShadowSec AI

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatState {
  chats: Chat[];
  activeChatId: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Resource {
  title: string;
  description: string;
  url: string;
  category: string;
  icon: string;
}
