'use client';

import { motion } from 'framer-motion';
import { Shield, User, AlertTriangle } from 'lucide-react';
import { Message } from '@/types';
import { formatTime } from '@/lib/utils';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';

interface ChatMessageProps {
  message: Message;
}

// Typing indicator for AI response loading
export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-start gap-3 mb-6"
    >
      {/* AI Avatar */}
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center flex-shrink-0 glow-blue">
        <Shield className="w-4 h-4 text-white" />
      </div>

      {/* Typing bubble */}
      <div
        className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2"
        style={{
          background: 'rgba(13, 20, 37, 0.8)',
          border: '1px solid rgba(0, 212, 255, 0.15)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="flex items-center gap-1.5">
          <div className="typing-dot" />
          <div className="typing-dot" />
          <div className="typing-dot" />
        </div>
        <span
          className="text-xs ml-1"
          style={{ color: 'rgba(100, 116, 139, 0.8)', fontFamily: 'JetBrains Mono, monospace' }}
        >
          Analyzing...
        </span>
      </div>
    </motion.div>
  );
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isError = message.content.startsWith('⚠️ Error:');

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex items-start gap-3 mb-6 message-enter ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isUser
            ? 'bg-gradient-to-br from-purple-600 to-pink-600'
            : isError
            ? 'bg-gradient-to-br from-red-700 to-orange-700'
            : 'bg-gradient-to-br from-cyber-blue to-cyber-purple glow-blue'
        }`}
        style={{
          boxShadow: isUser
            ? '0 0 15px rgba(124, 58, 237, 0.4)'
            : isError
            ? '0 0 15px rgba(239, 68, 68, 0.4)'
            : '0 0 15px rgba(0, 212, 255, 0.4)',
        }}
      >
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : isError ? (
          <AlertTriangle className="w-4 h-4 text-white" />
        ) : (
          <Shield className="w-4 h-4 text-white" />
        )}
      </div>

      {/* Message content */}
      <div className={`flex flex-col max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Sender label */}
        <div
          className={`flex items-center gap-2 mb-1.5 ${isUser ? 'flex-row-reverse' : ''}`}
        >
          <span
            className="text-xs font-semibold"
            style={{
              color: isUser ? '#a855f7' : isError ? '#ef4444' : '#00d4ff',
              fontFamily: 'Orbitron, monospace',
            }}
          >
            {isUser ? 'You' : 'ShadowSec AI'}
          </span>
          <span
            className="text-xs"
            style={{ color: 'rgba(100, 116, 139, 0.5)', fontFamily: 'JetBrains Mono, monospace' }}
          >
            {formatTime(message.timestamp)}
          </span>
        </div>

        {/* Message bubble */}
        <div
          className={`px-4 py-3 rounded-2xl relative ${
            isUser ? 'rounded-tr-sm' : 'rounded-tl-sm'
          }`}
          style={
            isUser
              ? {
                  background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.25), rgba(255, 0, 153, 0.15))',
                  border: '1px solid rgba(124, 58, 237, 0.3)',
                  backdropFilter: 'blur(10px)',
                }
              : isError
              ? {
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  backdropFilter: 'blur(10px)',
                }
              : {
                  background: 'rgba(13, 20, 37, 0.85)',
                  border: '1px solid rgba(0, 212, 255, 0.12)',
                  backdropFilter: 'blur(10px)',
                }
          }
        >
          {isUser ? (
            // User message - plain text
            <p
              style={{
                color: 'rgba(226, 232, 240, 0.95)',
                lineHeight: '1.6',
                fontSize: '0.9em',
                fontFamily: 'Syne, sans-serif',
              }}
            >
              {message.content}
            </p>
          ) : (
            // AI message - markdown rendered
            <MarkdownRenderer
              content={message.content}
              isStreaming={message.isStreaming}
            />
          )}
        </div>

        {/* Streaming indicator */}
        {message.isStreaming && !isUser && (
          <div className="flex items-center gap-1.5 mt-1.5 pl-1">
            <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-pulse" />
            <span
              className="text-xs"
              style={{ color: 'rgba(0, 212, 255, 0.6)', fontFamily: 'JetBrains Mono, monospace' }}
            >
              Generating response...
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
