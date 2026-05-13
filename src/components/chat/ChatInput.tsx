'use client';

import { useState, useRef, useCallback, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, Shield } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

// Suggested starter prompts
const SUGGESTIONS = [
  'Explain SQL injection and prevention',
  'How to set up a basic firewall with iptables?',
  'What is a reverse shell in CTF challenges?',
  'Explain the OWASP Top 10 vulnerabilities',
  'How to analyze a suspicious log file?',
  'Explain buffer overflow attacks',
];

export function ChatInput({ onSendMessage, isLoading, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea as content grows
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    adjustHeight();
  };

  const handleSubmit = () => {
    const trimmed = message.trim();
    if (!trimmed || isLoading || disabled) return;
    onSendMessage(trimmed);
    setMessage('');
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  // Submit on Enter (not Shift+Enter)
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (isLoading || disabled) return;
    onSendMessage(suggestion);
  };

  const canSend = message.trim().length > 0 && !isLoading && !disabled;

  return (
    <div className="p-4 border-t" style={{ borderColor: 'rgba(26, 37, 64, 0.6)' }}>
      {/* Suggestion pills */}
      <div className="flex flex-wrap gap-2 mb-3">
        {SUGGESTIONS.slice(0, 3).map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => handleSuggestionClick(suggestion)}
            disabled={isLoading || disabled}
            className="text-xs px-3 py-1.5 rounded-full transition-all duration-300 truncate max-w-[180px]"
            style={{
              background: 'rgba(0, 212, 255, 0.05)',
              border: '1px solid rgba(0, 212, 255, 0.12)',
              color: 'rgba(0, 212, 255, 0.7)',
              fontFamily: 'Syne, sans-serif',
              cursor: isLoading ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={(e) => {
              if (!isLoading && !disabled) {
                e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.25)';
                e.currentTarget.style.color = '#00d4ff';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 212, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.12)';
              e.currentTarget.style.color = 'rgba(0, 212, 255, 0.7)';
            }}
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div
        className="flex items-end gap-3 p-3 rounded-2xl transition-all duration-300"
        style={{
          background: 'rgba(10, 15, 30, 0.8)',
          border: '1px solid rgba(0, 212, 255, 0.15)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 20px rgba(0, 212, 255, 0.05)',
        }}
        onFocus={() => {}}
      >
        {/* AI icon */}
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 flex items-center justify-center flex-shrink-0 mb-0.5">
          <Shield className="w-4 h-4" style={{ color: '#00d4ff' }} />
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask about cybersecurity, ethical hacking, Linux, networking..."
          disabled={isLoading || disabled}
          rows={1}
          className="flex-1 bg-transparent resize-none outline-none text-sm leading-relaxed"
          style={{
            color: 'rgba(226, 232, 240, 0.9)',
            fontFamily: 'Syne, sans-serif',
            maxHeight: '200px',
            minHeight: '24px',
            caretColor: '#00d4ff',
          }}
        />

        {/* Send button */}
        <motion.button
          onClick={handleSubmit}
          disabled={!canSend}
          whileHover={canSend ? { scale: 1.05 } : {}}
          whileTap={canSend ? { scale: 0.95 } : {}}
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            background: canSend
              ? 'linear-gradient(135deg, #00d4ff, #7c3aed)'
              : 'rgba(26, 37, 64, 0.5)',
            boxShadow: canSend ? '0 0 20px rgba(0, 212, 255, 0.3)' : 'none',
            cursor: canSend ? 'pointer' : 'not-allowed',
          }}
          aria-label="Send message"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 text-white animate-spin" />
          ) : (
            <Send className="w-4 h-4 text-white" />
          )}
        </motion.button>
      </div>

      {/* Help text */}
      <p
        className="text-center text-xs mt-2"
        style={{ color: 'rgba(100, 116, 139, 0.5)', fontFamily: 'Syne, sans-serif' }}
      >
        Press Enter to send · Shift+Enter for new line · For educational purposes only
      </p>
    </div>
  );
}
