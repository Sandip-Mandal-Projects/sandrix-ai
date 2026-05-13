'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MessageSquare, Trash2, Shield, X, ChevronRight } from 'lucide-react';
import { Chat } from '@/types';
import { formatRelativeTime } from '@/lib/utils';

interface ChatSidebarProps {
  chats: Chat[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  onDeleteChat: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function ChatSidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  isOpen,
  onClose,
}: ChatSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : '-100%',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed left-0 top-0 bottom-0 w-72 z-40 lg:relative lg:translate-x-0 lg:z-auto"
        style={{
          background: 'rgba(8, 12, 22, 0.98)',
          borderRight: '1px solid rgba(26, 37, 64, 0.8)',
        }}
      >
        {/* Sidebar Header */}
        <div
          className="flex items-center justify-between p-4 border-b"
          style={{ borderColor: 'rgba(26, 37, 64, 0.8)' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span
              className="font-bold text-sm neon-blue"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              ShadowSec AI
            </span>
          </div>

          {/* Close button (mobile) */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <button
            onClick={() => {
              onNewChat();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group"
            style={{
              background: 'rgba(0, 212, 255, 0.06)',
              border: '1px solid rgba(0, 212, 255, 0.15)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 212, 255, 0.12)';
              e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 212, 255, 0.06)';
              e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.15)';
            }}
          >
            <Plus className="w-4 h-4 text-cyber-blue" />
            <span className="text-sm text-cyber-blue font-medium" style={{ fontFamily: 'Syne, sans-serif' }}>
              New Chat
            </span>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-3 pb-4" style={{ maxHeight: 'calc(100vh - 160px)' }}>
          {chats.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="w-12 h-12 rounded-full bg-cyber-border/30 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-gray-600" />
              </div>
              <p className="text-gray-600 text-xs text-center">
                No chats yet. Start a new conversation!
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {/* Label */}
              <div className="px-2 py-2">
                <span
                  className="text-xs uppercase tracking-widest font-semibold"
                  style={{ color: 'rgba(100, 116, 139, 0.6)', fontFamily: 'Orbitron, monospace' }}
                >
                  Recent Chats
                </span>
              </div>

              {chats.map((chat) => (
                <AnimatePresence key={chat.id}>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="group relative flex items-center gap-2 rounded-xl cursor-pointer transition-all duration-200"
                    style={{
                      background:
                        activeChatId === chat.id
                          ? 'rgba(0, 212, 255, 0.08)'
                          : 'transparent',
                      border:
                        activeChatId === chat.id
                          ? '1px solid rgba(0, 212, 255, 0.15)'
                          : '1px solid transparent',
                    }}
                    onClick={() => {
                      onSelectChat(chat.id);
                      onClose();
                    }}
                  >
                    <div className="flex items-start gap-3 flex-1 p-3 min-w-0">
                      <div
                        className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background:
                            activeChatId === chat.id
                              ? 'rgba(0, 212, 255, 0.15)'
                              : 'rgba(26, 37, 64, 0.5)',
                        }}
                      >
                        <MessageSquare
                          className="w-3.5 h-3.5"
                          style={{
                            color:
                              activeChatId === chat.id
                                ? '#00d4ff'
                                : 'rgba(100, 116, 139, 0.7)',
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-xs font-medium truncate"
                          style={{
                            color:
                              activeChatId === chat.id
                                ? '#e2e8f0'
                                : 'rgba(148, 163, 184, 0.8)',
                            fontFamily: 'Syne, sans-serif',
                          }}
                        >
                          {chat.title}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: 'rgba(100, 116, 139, 0.6)' }}
                        >
                          {formatRelativeTime(chat.updatedAt)}
                        </p>
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteChat(chat.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-2 mr-1 rounded-lg transition-all duration-200 text-gray-600 hover:text-red-400 hover:bg-red-500/10"
                      aria-label="Delete chat"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                </AnimatePresence>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="absolute bottom-0 left-0 right-0 p-3 border-t"
          style={{
            borderColor: 'rgba(26, 37, 64, 0.6)',
            background: 'rgba(5, 8, 16, 0.8)',
          }}
        >
          <div className="flex items-center gap-2 px-2">
            <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
            <span
              className="text-xs"
              style={{ color: 'rgba(100, 116, 139, 0.7)', fontFamily: 'JetBrains Mono, monospace' }}
            >
              Gemini AI • Online
            </span>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
