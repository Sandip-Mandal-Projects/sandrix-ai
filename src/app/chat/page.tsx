import { ChatInterface } from '@/components/chat/ChatInterface';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chat — ShadowSec AI',
  description: 'Chat with ShadowSec AI, your cybersecurity intelligence assistant.',
};

export default function ChatPage() {
  return <ChatInterface />;
}
