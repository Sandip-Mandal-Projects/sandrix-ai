'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Terminal, Lock, Eye, Cpu, Globe, ArrowRight, CheckCircle } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const principles = [
  { icon: Shield, title: 'Ethical First', description: 'Every response prioritizes ethical and legal cybersecurity practices.' },
  { icon: Lock, title: 'Security Focused', description: 'Built with security-by-design principles throughout.' },
  { icon: Eye, title: 'Transparent', description: 'Clear about capabilities, limitations, and AI-generated content.' },
  { icon: Cpu, title: 'AI-Powered', description: 'Leverages Gemini AI for accurate, contextual security knowledge.' },
];

const useCases = [
  'CTF challenge guidance and walkthroughs',
  'Penetration testing methodology learning',
  'SOC analyst skill development',
  'Malware behavior analysis education',
  'Network security architecture review',
  'Secure code review assistance',
  'OSCP/CEH exam preparation',
  'Incident response procedures',
  'Vulnerability research concepts',
  'Security tool usage guidance',
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 min-h-screen pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: 'rgba(0, 212, 255, 0.07)',
                border: '1px solid rgba(0, 212, 255, 0.2)',
              }}
            >
              <Shield className="w-4 h-4 text-cyber-blue" />
              <span
                className="text-xs font-medium text-cyber-blue"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                ABOUT SHADOWSEC AI
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl font-bold mb-6"
              style={{ fontFamily: 'Orbitron, monospace', color: '#e2e8f0' }}
            >
              Built for the{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Security Community
              </span>
            </h1>

            <p
              className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              ShadowSec AI is an advanced AI-powered cybersecurity assistant designed to
              democratize security knowledge for ethical hackers, SOC analysts, students,
              and security professionals worldwide.
            </p>
          </motion.div>

          {/* Mission statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-8 mb-12"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.06), rgba(124, 58, 237, 0.06))',
              border: '1px solid rgba(0, 212, 255, 0.15)',
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'rgba(0, 212, 255, 0.1)',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                }}
              >
                <Terminal className="w-6 h-6 text-cyber-blue" />
              </div>
              <div>
                <h2
                  className="text-xl font-bold text-cyber-blue mb-3"
                  style={{ fontFamily: 'Orbitron, monospace' }}
                >
                  Our Mission
                </h2>
                <p
                  className="text-gray-300 leading-relaxed"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  To make cybersecurity education accessible, interactive, and practical.
                  We believe that knowledge of attack techniques is essential for building
                  better defenses — when used ethically and responsibly. ShadowSec AI
                  provides expert guidance on security concepts, tools, and methodologies
                  that help professionals protect systems and networks.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Core Principles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2
              className="text-2xl font-bold text-center mb-8"
              style={{ fontFamily: 'Orbitron, monospace', color: '#e2e8f0' }}
            >
              Core Principles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {principles.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-6 rounded-xl"
                    style={{
                      background: 'rgba(13, 20, 37, 0.6)',
                      border: '1px solid rgba(26, 37, 64, 0.8)',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'rgba(0, 212, 255, 0.08)',
                        border: '1px solid rgba(0, 212, 255, 0.15)',
                      }}
                    >
                      <Icon className="w-5 h-5 text-cyber-blue" />
                    </div>
                    <div>
                      <h3
                        className="font-semibold text-white mb-1"
                        style={{ fontFamily: 'Syne, sans-serif' }}
                      >
                        {p.title}
                      </h3>
                      <p
                        className="text-sm text-gray-500"
                        style={{ fontFamily: 'Syne, sans-serif' }}
                      >
                        {p.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Use Cases */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2
              className="text-2xl font-bold text-center mb-8"
              style={{ fontFamily: 'Orbitron, monospace', color: '#e2e8f0' }}
            >
              What You Can Learn
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {useCases.map((useCase, i) => (
                <motion.div
                  key={useCase}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 p-3 rounded-lg"
                  style={{
                    background: 'rgba(0, 255, 136, 0.04)',
                    border: '1px solid rgba(0, 255, 136, 0.1)',
                  }}
                >
                  <CheckCircle className="w-4 h-4 text-cyber-green flex-shrink-0" />
                  <span
                    className="text-sm text-gray-400"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    {useCase}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl mb-12"
            style={{
              background: 'rgba(255, 165, 0, 0.04)',
              border: '1px solid rgba(255, 165, 0, 0.2)',
            }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3
                  className="font-semibold text-yellow-400 mb-2"
                  style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.85em' }}
                >
                  Ethical Use Disclaimer
                </h3>
                <p
                  className="text-sm text-gray-400 leading-relaxed"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  ShadowSec AI is designed exclusively for educational purposes, ethical
                  security research, and authorized penetration testing. All information
                  provided should only be used on systems you own or have explicit written
                  permission to test. Unauthorized access to computer systems is illegal
                  and unethical. Always follow responsible disclosure practices.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link href="/chat" className="btn-cyber inline-flex px-8 py-4 rounded-xl items-center gap-3">
              <Terminal className="w-5 h-5" />
              Start Learning Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
