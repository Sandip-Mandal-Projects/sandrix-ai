'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Shield, Zap, Lock } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { ChatSidebar } from './ChatSidebar';
import { ChatMessage, TypingIndicator } from './ChatMessage';
import { ChatInput } from './ChatInput';

// Welcome screen shown when no active chat
function WelcomeScreen({ onStartChat }: { onStartChat: (msg: string) => void }) {
  const prompts = [
    { icon: '🔍', label: 'Analyze a log file for intrusions', color: '#00d4ff' },
    { icon: '🛡️', label: 'Explain OWASP Top 10 vulnerabilities', color: '#7c3aed' },
    { icon: '💻', label: 'Linux privilege escalation techniques', color: '#00ff88' },
    { icon: '🔐', label: 'How does SSL/TLS handshake work?', color: '#ff0099' },
    { icon: '🕸️', label: 'Explain network scanning with Nmap', color: '#ffd700' },
    { icon: '🦠', label: 'Malware analysis methodology', color: '#00d4ff' },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-y-auto">
      {/* Logo animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="mb-6"
      >
        <div className="relative">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(124, 58, 237, 0.2))',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              boxShadow: '0 0 40px rgba(0, 212, 255, 0.2)',
            }}
          >
            <Shield className="w-10 h-10 text-cyber-blue" />
          </div>
          {/* Pulse rings */}
          <div
            className="absolute inset-0 rounded-2xl animate-ping"
            style={{
              border: '1px solid rgba(0, 212, 255, 0.2)',
              animationDuration: '2s',
            }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1
          className="text-3xl font-bold neon-blue mb-3"
          style={{ fontFamily: 'Orbitron, monospace' }}
        >
          ShadowSec AI
        </h1>
        <p className="text-gray-400 max-w-md mx-auto leading-relaxed" style={{ fontFamily: 'Syne, sans-serif' }}>
          Your advanced cybersecurity intelligence platform. Ask me about ethical
          hacking, network security, malware analysis, SOC operations, and more.
        </p>

        {/* Status badges */}
        <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
          {[
            { icon: Zap, label: 'Gemini AI', color: '#00d4ff' },
            { icon: Lock, label: 'Ethical Only', color: '#00ff88' },
            { icon: Shield, label: 'Secure', color: '#7c3aed' },
          ].map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
              style={{
                background: `${color}10`,
                border: `1px solid ${color}30`,
                color,
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              <Icon className="w-3 h-3" />
              {label}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Suggested prompts */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-2xl"
      >
        {prompts.map((prompt, i) => (
          <motion.button
            key={prompt.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.08 }}
            onClick={() => onStartChat(prompt.label)}
            className="flex items-start gap-3 p-4 rounded-xl text-left transition-all duration-300 group"
            style={{
              background: 'rgba(13, 20, 37, 0.6)',
              border: `1px solid rgba(26, 37, 64, 0.8)`,
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${prompt.color}40`;
              e.currentTarget.style.background = `${prompt.color}08`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(26, 37, 64, 0.8)';
              e.currentTarget.style.background = 'rgba(13, 20, 37, 0.6)';
            }}
          >
            <span className="text-xl">{prompt.icon}</span>
            <span
              className="text-xs leading-relaxed"
              style={{ color: 'rgba(148, 163, 184, 0.8)', fontFamily: 'Syne, sans-serif' }}
            >
              {prompt.label}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}

export function ChatInterface() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    chats,
    activeChat,
    activeChatId,
    isLoading,
    createNewChat,
    deleteChat,
    sendMessage,
    setActiveChatId,
  } = useChat();

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  const handleSendMessage = (content: string) => {
    sendMessage(content);
  };

  const handleNewChat = () => {
    createNewChat();
  };

  return (
    <div
      className="flex h-screen"
      style={{ background: 'var(--cyber-bg)' }}
    >
      {/* Sidebar */}
      <ChatSidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onNewChat={handleNewChat}
        onDeleteChat={deleteChat}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{
            background: 'rgba(8, 12, 22, 0.9)',
            borderColor: 'rgba(26, 37, 64, 0.6)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex items-center gap-3">
            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h2
                className="text-sm font-semibold"
                style={{ color: '#e2e8f0', fontFamily: 'Orbitron, monospace' }}
              >
                {activeChat ? activeChat.title : 'ShadowSec AI'}
              </h2>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
                <span
                  className="text-xs"
                  style={{ color: 'rgba(0, 255, 136, 0.7)', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Active • Gemini 1.5 Flash
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
              style={{
                background: 'rgba(0, 212, 255, 0.06)',
                border: '1px solid rgba(0, 212, 255, 0.12)',
                color: 'rgba(0, 212, 255, 0.7)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              <Shield className="w-3 h-3" />
              <span className="hidden sm:inline">Ethical AI</span>
            </div>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto relative">
          {!activeChat || activeChat.messages.length === 0 ? (
            <WelcomeScreen onStartChat={handleSendMessage} />
          ) : (
            <div className="max-w-4xl mx-auto px-4 py-6">
              <AnimatePresence>
                {activeChat.messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}

                {/* Show typing indicator when loading and last message is from user */}
                {isLoading &&
                  activeChat.messages.length > 0 &&
                  activeChat.messages[activeChat.messages.length - 1].role === 'user' && (
                    <TypingIndicator key="typing" />
                  )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
