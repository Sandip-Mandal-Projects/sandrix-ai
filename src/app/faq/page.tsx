'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, HelpCircle } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const faqs = [
  {
    q: 'What is ShadowSec AI?',
    a: 'ShadowSec AI is an advanced AI-powered cybersecurity assistant built on Google Gemini. It specializes in ethical hacking, SOC operations, malware analysis, Linux security, network defense, and cybersecurity education.',
  },
  {
    q: 'Is ShadowSec AI free to use?',
    a: 'Yes. ShadowSec AI uses the Google Gemini free-tier API. You only need a free Gemini API key from Google AI Studio. There are no subscription fees for the application itself.',
  },
  {
    q: 'Will it help me hack someone\'s system?',
    a: 'No. ShadowSec AI strictly refuses any requests involving unauthorized access, illegal hacking, or malicious activity. It is built exclusively for ethical and educational purposes — testing systems you own or have written permission to test.',
  },
  {
    q: 'What topics can I ask about?',
    a: 'You can ask about ethical hacking methodology, CTF challenges, penetration testing concepts, network security, Linux hardening, malware analysis techniques, SOC operations, incident response, OSCP/CEH preparation, secure coding, cryptography, OSINT, and much more.',
  },
  {
    q: 'Does it support code syntax highlighting?',
    a: 'Yes. The chat interface renders full markdown including syntax-highlighted code blocks for Python, Bash, JavaScript, TypeScript, PowerShell, SQL, YAML, JSON, and more — with a one-click copy button.',
  },
  {
    q: 'How do I set up my own instance?',
    a: 'Clone the repository, add your GEMINI_API_KEY to a .env.local file, run npm install, then npm run dev. For production, deploy to Vercel by connecting your GitHub repo and adding the environment variable in the Vercel dashboard.',
  },
  {
    q: 'Is my conversation data stored?',
    a: 'Chat history is stored only in your browser\'s memory (React state) for the current session. It is not saved to any database or server. Refreshing the page clears all history.',
  },
  {
    q: 'What AI model powers ShadowSec AI?',
    a: 'It uses Google Gemini 1.5 Flash — a fast, capable model available on the free tier. The system prompt configures it as a cybersecurity specialist with ethical guardrails.',
  },
  {
    q: 'Can I deploy this on Vercel for free?',
    a: 'Yes. The project is fully optimized for Vercel\'s free Hobby tier. API routes use Edge-compatible Next.js 14 App Router, and there are no paid third-party services required.',
  },
  {
    q: 'How does rate limiting work?',
    a: 'The API route includes basic in-memory rate limiting (15 requests per minute per IP). This prevents abuse and helps stay within Gemini\'s free-tier quota. For production, you can upgrade to Redis-based rate limiting.',
  },
];

function FAQItem({ item, index }: { item: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      viewport={{ once: true }}
      className="rounded-xl overflow-hidden"
      style={{
        background: open ? 'rgba(0,212,255,0.05)' : 'rgba(13,20,37,0.6)',
        border: `1px solid ${open ? 'rgba(0,212,255,0.25)' : 'rgba(26,37,64,0.8)'}`,
        transition: 'background 0.3s, border-color 0.3s',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span
          className="font-semibold text-sm pr-4"
          style={{ color: open ? '#00d4ff' : '#e2e8f0', fontFamily: 'Syne, sans-serif' }}
        >
          {item.q}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: open ? '#00d4ff' : '#64748b' }} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p
              className="px-5 pb-5 text-sm leading-relaxed"
              style={{ color: 'rgba(148,163,184,0.85)', fontFamily: 'Syne, sans-serif' }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 min-h-screen pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.2)' }}
            >
              <HelpCircle className="w-4 h-4 text-cyber-blue" />
              <span className="text-xs font-medium text-cyber-blue" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                FREQUENTLY ASKED QUESTIONS
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: 'Orbitron, monospace', color: '#e2e8f0' }}>
              Got{' '}
              <span style={{ background: 'linear-gradient(135deg,#00d4ff,#7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Questions?
              </span>
            </h1>
            <p className="text-gray-400" style={{ fontFamily: 'Syne, sans-serif' }}>
              Everything you need to know about ShadowSec AI.
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((item, i) => (
              <FAQItem key={item.q} item={item} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center p-8 rounded-2xl"
            style={{ background: 'rgba(13,20,37,0.6)', border: '1px solid rgba(26,37,64,0.8)' }}
          >
            <Shield className="w-10 h-10 text-cyber-blue mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Orbitron, monospace' }}>
              Still have questions?
            </h3>
            <p className="text-gray-500 mb-4 text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>
              Ask ShadowSec AI directly — it can answer questions about itself too.
            </p>
            <a
              href="/chat"
              className="btn-cyber inline-flex px-6 py-3 rounded-xl text-sm items-center gap-2"
            >
              Open Chat
            </a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
