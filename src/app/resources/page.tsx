'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Shield, Book, Terminal, Globe, Cpu, Award } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

type Resource = {
  title: string;
  description: string;
  url: string;
  category: string;
  free: boolean;
};

const categories = [
  { id: 'all', label: 'All', icon: Globe },
  { id: 'learning', label: 'Learning', icon: Book },
  { id: 'tools', label: 'Tools', icon: Terminal },
  { id: 'practice', label: 'Practice', icon: Shield },
  { id: 'certifications', label: 'Certs', icon: Award },
];

const resources: Resource[] = [
  // Learning platforms
  { title: 'TryHackMe', description: 'Beginner-friendly cybersecurity learning platform with guided paths and hands-on labs.', url: 'https://tryhackme.com', category: 'learning', free: true },
  { title: 'HackTheBox', description: 'Advanced penetration testing labs and challenges for security professionals.', url: 'https://hackthebox.com', category: 'practice', free: true },
  { title: 'PortSwigger Web Security Academy', description: 'Free, comprehensive web security training with hands-on labs covering all OWASP Top 10.', url: 'https://portswigger.net/web-security', category: 'learning', free: true },
  { title: 'OWASP', description: 'Open Web Application Security Project — essential security standards and guides.', url: 'https://owasp.org', category: 'learning', free: true },
  { title: 'Cybrary', description: 'IT and cybersecurity training platform with free and premium courses.', url: 'https://cybrary.it', category: 'learning', free: true },
  { title: 'PentesterLab', description: 'Hands-on web security training with progressive exercises.', url: 'https://pentesterlab.com', category: 'practice', free: true },

  // Tools
  { title: 'Kali Linux', description: 'The premier penetration testing distribution with hundreds of preinstalled security tools.', url: 'https://kali.org', category: 'tools', free: true },
  { title: 'Metasploit Framework', description: 'The world\'s most used penetration testing framework for finding and exploiting vulnerabilities.', url: 'https://metasploit.com', category: 'tools', free: true },
  { title: 'Wireshark', description: 'Network protocol analyzer for capturing and interactively analyzing network traffic.', url: 'https://wireshark.org', category: 'tools', free: true },
  { title: 'Burp Suite Community', description: 'Essential web application security testing platform with intercepting proxy.', url: 'https://portswigger.net/burp', category: 'tools', free: true },
  { title: 'Nmap', description: 'The iconic network scanner for host discovery, port scanning, and service detection.', url: 'https://nmap.org', category: 'tools', free: true },
  { title: 'GHIDRA', description: 'NSA\'s open-source reverse engineering framework for malware analysis.', url: 'https://ghidra-sre.org', category: 'tools', free: true },

  // Practice
  { title: 'PicoCTF', description: 'Beginner CTF competition by Carnegie Mellon University with year-round challenges.', url: 'https://picoctf.org', category: 'practice', free: true },
  { title: 'VulnHub', description: 'Free downloadable vulnerable virtual machines for offline practice.', url: 'https://vulnhub.com', category: 'practice', free: true },
  { title: 'CTFtime', description: 'Calendar and archive of CTF competitions happening worldwide.', url: 'https://ctftime.org', category: 'practice', free: true },
  { title: 'DVWA', description: 'Damn Vulnerable Web Application — intentionally vulnerable PHP/MySQL app for learning.', url: 'https://dvwa.co.uk', category: 'practice', free: true },

  // Certifications
  { title: 'CompTIA Security+', description: 'Entry-level cybersecurity certification covering foundational security concepts.', url: 'https://comptia.org/certifications/security', category: 'certifications', free: false },
  { title: 'OSCP (OffSec)', description: 'Hands-on penetration testing certification — the gold standard in ethical hacking.', url: 'https://offsec.com/courses/pen-200', category: 'certifications', free: false },
  { title: 'CEH (EC-Council)', description: 'Certified Ethical Hacker — widely recognized security professional certification.', url: 'https://eccouncil.org/certified-ethical-hacker-training-education', category: 'certifications', free: false },
  { title: 'Google Cybersecurity Certificate', description: 'Free-to-audit Google Professional Certificate on Coursera covering SOC fundamentals.', url: 'https://coursera.org/google-certificates/cybersecurity-certificate', category: 'certifications', free: true },
];

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered =
    activeCategory === 'all'
      ? resources
      : resources.filter((r) => r.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className="relative z-10 min-h-screen pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: 'rgba(0, 212, 255, 0.07)',
                border: '1px solid rgba(0, 212, 255, 0.2)',
              }}
            >
              <Globe className="w-4 h-4 text-cyber-blue" />
              <span
                className="text-xs font-medium text-cyber-blue"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                CURATED RESOURCES
              </span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-bold mb-4"
              style={{ fontFamily: 'Orbitron, monospace', color: '#e2e8f0' }}
            >
              Cybersecurity{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Resources
              </span>
            </h1>
            <p
              className="text-gray-400 max-w-xl mx-auto"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Hand-picked tools, platforms, and learning resources for your cybersecurity
              journey — from beginner to professional.
            </p>
          </motion.div>

          {/* Category filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  background:
                    activeCategory === id
                      ? 'rgba(0, 212, 255, 0.15)'
                      : 'rgba(13, 20, 37, 0.6)',
                  border:
                    activeCategory === id
                      ? '1px solid rgba(0, 212, 255, 0.4)'
                      : '1px solid rgba(26, 37, 64, 0.8)',
                  color: activeCategory === id ? '#00d4ff' : 'rgba(148, 163, 184, 0.7)',
                  fontFamily: 'Syne, sans-serif',
                }}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Resource grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((resource, i) => (
              <motion.a
                key={resource.title}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="group block p-5 rounded-xl transition-all duration-300"
                style={{
                  background: 'rgba(13, 20, 37, 0.6)',
                  border: '1px solid rgba(26, 37, 64, 0.8)',
                  backdropFilter: 'blur(10px)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(26, 37, 64, 0.8)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3
                      className="font-bold text-white group-hover:text-cyber-blue transition-colors"
                      style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.95em' }}
                    >
                      {resource.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={
                        resource.free
                          ? {
                              background: 'rgba(0, 255, 136, 0.08)',
                              border: '1px solid rgba(0, 255, 136, 0.2)',
                              color: '#00ff88',
                              fontFamily: 'JetBrains Mono, monospace',
                            }
                          : {
                              background: 'rgba(255, 165, 0, 0.08)',
                              border: '1px solid rgba(255, 165, 0, 0.2)',
                              color: '#ffa500',
                              fontFamily: 'JetBrains Mono, monospace',
                            }
                      }
                    >
                      {resource.free ? 'FREE' : 'PAID'}
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-cyber-blue transition-colors" />
                  </div>
                </div>
                <p
                  className="text-sm text-gray-500 leading-relaxed"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {resource.description}
                </p>
                <div className="mt-3">
                  <span
                    className="text-xs px-2 py-1 rounded-md capitalize"
                    style={{
                      background: 'rgba(124, 58, 237, 0.08)',
                      border: '1px solid rgba(124, 58, 237, 0.15)',
                      color: 'rgba(168, 85, 247, 0.8)',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    {resource.category}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
