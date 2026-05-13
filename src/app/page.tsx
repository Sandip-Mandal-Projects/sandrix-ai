'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Shield,
  Terminal,
  Bug,
  FileSearch,
  Network,
  Lock,
  Code2,
  ArrowRight,
  Zap,
  Eye,
  Cpu,
  Globe,
} from 'lucide-react';
import { MatrixRain } from '@/components/ui/MatrixRain';
import { ParticleField } from '@/components/ui/ParticleField';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Feature card data
const features = [
  {
    icon: Shield,
    title: 'AI Cyber Assistant',
    description:
      'Powered by Gemini AI, get instant expert answers on any cybersecurity topic.',
    color: '#00d4ff',
    gradient: 'from-cyan-500/20 to-blue-600/10',
  },
  {
    icon: Bug,
    title: 'Malware Analysis',
    description:
      'Understand malware behavior, analysis techniques, and reverse engineering concepts.',
    color: '#ff0099',
    gradient: 'from-pink-500/20 to-red-600/10',
  },
  {
    icon: FileSearch,
    title: 'Log Investigation',
    description:
      'Learn to analyze security logs, detect intrusions, and perform forensics.',
    color: '#ffd700',
    gradient: 'from-yellow-500/20 to-amber-600/10',
  },
  {
    icon: Network,
    title: 'Linux & Networking',
    description:
      'Deep dive into Linux security, network protocols, and firewall configuration.',
    color: '#00ff88',
    gradient: 'from-green-500/20 to-emerald-600/10',
  },
  {
    icon: Eye,
    title: 'Ethical Hacking',
    description:
      'Learn penetration testing methodologies, tools, and responsible disclosure.',
    color: '#7c3aed',
    gradient: 'from-purple-500/20 to-violet-600/10',
  },
  {
    icon: Code2,
    title: 'Secure Coding',
    description:
      'Write secure code, understand CVEs, and implement security best practices.',
    color: '#00d4ff',
    gradient: 'from-sky-500/20 to-cyan-600/10',
  },
];

// Stats data
const stats = [
  { value: '50+', label: 'Security Topics', icon: Shield },
  { value: '24/7', label: 'Available', icon: Zap },
  { value: '100%', label: 'Ethical Only', icon: Lock },
  { value: 'AI', label: 'Powered', icon: Cpu },
];

// Feature card component
function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="relative group cursor-default"
      style={{
        background: 'rgba(13, 20, 37, 0.6)',
        border: '1px solid rgba(26, 37, 64, 0.8)',
        borderRadius: '16px',
        padding: '28px',
        backdropFilter: 'blur(10px)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = `${feature.color}40`;
        el.style.boxShadow = `0 0 30px ${feature.color}15`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'rgba(26, 37, 64, 0.8)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
        style={{
          background: `${feature.color}15`,
          border: `1px solid ${feature.color}30`,
        }}
      >
        <Icon className="w-6 h-6" style={{ color: feature.color }} />
      </div>

      {/* Content */}
      <h3
        className="text-base font-bold mb-2"
        style={{ color: '#e2e8f0', fontFamily: 'Orbitron, monospace', fontSize: '0.9em' }}
      >
        {feature.title}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: 'rgba(100, 116, 139, 0.9)', fontFamily: 'Syne, sans-serif' }}
      >
        {feature.description}
      </p>

      {/* Arrow on hover */}
      <div
        className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ color: feature.color }}
      >
        <span className="text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Explore
        </span>
        <ArrowRight className="w-3 h-3" />
      </div>

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-16 h-16 rounded-tr-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden="true"
      >
        <div
          className="absolute top-0 right-0 w-16 h-16"
          style={{
            background: `radial-gradient(circle at top right, ${feature.color}20, transparent 70%)`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const featuresInView = useInView(featuresRef, { once: true });

  return (
    <>
      <MatrixRain />
      <ParticleField />
      <Navbar />

      <main className="relative z-10">
        {/* ===================== HERO SECTION ===================== */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12 relative">
          {/* Background glow */}
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgba(0, 212, 255, 0.06) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />
          <div
            className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgba(124, 58, 237, 0.05) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="max-w-5xl mx-auto text-center relative">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: 'rgba(0, 212, 255, 0.07)',
                border: '1px solid rgba(0, 212, 255, 0.2)',
              }}
            >
              <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
              <span
                className="text-xs font-medium"
                style={{ color: 'rgba(0, 212, 255, 0.9)', fontFamily: 'JetBrains Mono, monospace' }}
              >
                Powered by Gemini AI • Now Online
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-7xl lg:text-8xl font-black mb-6 leading-none"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              <span
                style={{
                  background: 'linear-gradient(135deg, #00d4ff, #a855f7, #ff0099)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 30px rgba(0, 212, 255, 0.3))',
                }}
              >
                Shadow
              </span>
              <span className="text-white">Sec</span>
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #00d4ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                AI
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'rgba(148, 163, 184, 0.85)', fontFamily: 'Syne, sans-serif' }}
            >
              Your AI-Powered Cybersecurity Assistant — specialized in ethical hacking,
              SOC operations, malware analysis, and cyber education.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/chat"
                className="btn-cyber px-8 py-4 rounded-xl text-base flex items-center gap-3 min-w-[200px] justify-center"
              >
                <Terminal className="w-5 h-5" />
                Start Securing
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/resources"
                className="px-8 py-4 rounded-xl text-base flex items-center gap-3 transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'rgba(226, 232, 240, 0.8)',
                  fontFamily: 'Syne, sans-serif',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <Globe className="w-5 h-5" />
                Explore Resources
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-2xl mx-auto"
            >
              {stats.map(({ value, label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl"
                  style={{
                    background: 'rgba(13, 20, 37, 0.5)',
                    border: '1px solid rgba(26, 37, 64, 0.6)',
                  }}
                >
                  <Icon className="w-5 h-5 text-cyber-blue" />
                  <span
                    className="text-2xl font-bold neon-blue"
                    style={{ fontFamily: 'Orbitron, monospace' }}
                  >
                    {value}
                  </span>
                  <span
                    className="text-xs text-gray-500"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <div className="w-5 h-8 rounded-full border-2 border-cyber-blue/30 flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-cyber-blue/60 animate-bounce" />
            </div>
          </motion.div>
        </section>

        {/* ===================== FEATURES SECTION ===================== */}
        <section ref={featuresRef} className="relative px-4 py-20">
          {/* Section divider */}
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
                style={{
                  background: 'rgba(124, 58, 237, 0.07)',
                  border: '1px solid rgba(124, 58, 237, 0.2)',
                }}
              >
                <Zap className="w-3.5 h-3.5 text-purple-400" />
                <span
                  className="text-xs font-medium text-purple-400"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  CAPABILITIES
                </span>
              </div>
              <h2
                className="text-3xl sm:text-4xl font-bold mb-4"
                style={{ fontFamily: 'Orbitron, monospace', color: '#e2e8f0' }}
              >
                Everything You Need for{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Cyber Defense
                </span>
              </h2>
              <p
                className="text-gray-500 max-w-xl mx-auto"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                From beginner CTF challenges to advanced SOC operations — ShadowSec AI
                covers the full spectrum of cybersecurity knowledge.
              </p>
            </motion.div>

            {/* Feature cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((feature, index) => (
                <FeatureCard key={feature.title} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* ===================== CTA SECTION ===================== */}
        <section className="relative px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden p-12 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.07), rgba(124, 58, 237, 0.07))',
                border: '1px solid rgba(0, 212, 255, 0.15)',
              }}
            >
              {/* Background decoration */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 30% 50%, rgba(0, 212, 255, 0.05) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(124, 58, 237, 0.05) 0%, transparent 60%)',
                }}
                aria-hidden="true"
              />

              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Shield className="w-8 h-8 text-cyber-blue" />
                  <Terminal className="w-8 h-8 text-purple-400" />
                  <Lock className="w-8 h-8 text-cyber-green" />
                </div>

                <h2
                  className="text-3xl sm:text-4xl font-bold mb-4"
                  style={{ fontFamily: 'Orbitron, monospace', color: '#e2e8f0' }}
                >
                  Ready to{' '}
                  <span className="neon-blue">Hack the Learning Curve?</span>
                </h2>
                <p
                  className="text-gray-400 mb-8 max-w-lg mx-auto"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  Join security professionals and learners using ShadowSec AI for
                  cybersecurity education and responsible security research.
                </p>

                <Link
                  href="/chat"
                  className="btn-cyber inline-flex px-10 py-4 rounded-xl text-base items-center gap-3"
                >
                  <Terminal className="w-5 h-5" />
                  Launch ShadowSec AI
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
