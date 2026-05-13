'use client';

import { useState, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message, Chat } from '@/types';
import { generateChatTitle } from '@/lib/utils';

export function useChat() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Get the currently active chat
  const activeChat = chats.find((c) => c.id === activeChatId) || null;

  // Create a new chat session
  const createNewChat = useCallback(() => {
    const newChat: Chat = {
      id: uuidv4(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    setError(null);
    return newChat.id;
  }, []);

  // Delete a chat
  const deleteChat = useCallback(
    (chatId: string) => {
      setChats((prev) => prev.filter((c) => c.id !== chatId));
      if (activeChatId === chatId) {
        setActiveChatId(null);
      }
    },
    [activeChatId]
  );

  // Send a message and get AI response
  const sendMessage = useCallback(
    async (content: string, chatId?: string) => {
      // Use provided chatId or active chat, or create new one
      let currentChatId = chatId || activeChatId;
      if (!currentChatId) {
        currentChatId = createNewChat();
      }

      const userMessage: Message = {
        id: uuidv4(),
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
      };

      // Add user message to chat
      setChats((prev) =>
        prev.map((chat) => {
          if (chat.id === currentChatId) {
            const updatedMessages = [...chat.messages, userMessage];
            return {
              ...chat,
              messages: updatedMessages,
              title:
                chat.messages.length === 0
                  ? generateChatTitle(content)
                  : chat.title,
              updatedAt: new Date(),
            };
          }
          return chat;
        })
      );

      // Create placeholder AI message for streaming effect
      const aiMessageId = uuidv4();
      const aiMessage: Message = {
        id: aiMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true,
      };

      setChats((prev) =>
        prev.map((chat) => {
          if (chat.id === currentChatId) {
            return {
              ...chat,
              messages: [...chat.messages, aiMessage],
            };
          }
          return chat;
        })
      );

      setIsLoading(true);
      setError(null);

      // Abort previous request if any
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      try {
        // Get conversation history for context
        const currentChat = chats.find((c) => c.id === currentChatId);
        const history = currentChat?.messages || [];

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: content,
            history: history.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to get response');
        }

        const data = await response.json();
        const responseText = data.response;

        // Simulate streaming by revealing text progressively
        let displayedText = '';
        const words = responseText.split(' ');
        
        for (let i = 0; i < words.length; i++) {
          displayedText += (i === 0 ? '' : ' ') + words[i];
          const currentText = displayedText;
          
          setChats((prev) =>
            prev.map((chat) => {
              if (chat.id === currentChatId) {
                return {
                  ...chat,
                  messages: chat.messages.map((msg) =>
                    msg.id === aiMessageId
                      ? { ...msg, content: currentText, isStreaming: true }
                      : msg
                  ),
                };
              }
              return chat;
            })
          );
          
          // Small delay for streaming effect (faster for longer responses)
          await new Promise((resolve) =>
            setTimeout(resolve, Math.max(5, 20 - Math.floor(words.length / 50)))
          );
        }

        // Mark streaming as complete
        setChats((prev) =>
          prev.map((chat) => {
            if (chat.id === currentChatId) {
              return {
                ...chat,
                messages: chat.messages.map((msg) =>
                  msg.id === aiMessageId
                    ? { ...msg, content: responseText, isStreaming: false }
                    : msg
                ),
                updatedAt: new Date(),
              };
            }
            return chat;
          })
        );
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return; // User cancelled
        }

        const errorMsg =
          err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(errorMsg);

        // Update AI message with error
        setChats((prev) =>
          prev.map((chat) => {
            if (chat.id === currentChatId) {
              return {
                ...chat,
                messages: chat.messages.map((msg) =>
                  msg.id === aiMessageId
                    ? {
                        ...msg,
                        content: `⚠️ Error: ${errorMsg}\n\nPlease try again or check your API configuration.`,
                        isStreaming: false,
                      }
                    : msg
                ),
              };
            }
            return chat;
          })
        );
      } finally {
        setIsLoading(false);
      }
    },
    [activeChatId, chats, createNewChat]
  );

  return {
    chats,
    activeChat,
    activeChatId,
    isLoading,
    error,
    createNewChat,
    deleteChat,
    sendMessage,
    setActiveChatId,
  };
}
