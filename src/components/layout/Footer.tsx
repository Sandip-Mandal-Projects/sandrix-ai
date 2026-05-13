'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Github, Twitter, Mail, Terminal, Lock } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-cyber-border mt-20">
      {/* Glow line at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyber-blue to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span
                className="text-lg font-bold neon-blue"
                style={{ fontFamily: 'Orbitron, monospace' }}
              >
                ShadowSec<span className="text-purple-400">AI</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Advanced AI-powered cybersecurity intelligence platform for ethical
              hackers, SOC analysts, and security professionals.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="#"
                className="w-8 h-8 rounded-lg glass flex items-center justify-center text-gray-500 hover:text-cyber-blue hover:border-cyber-blue/30 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg glass flex items-center justify-center text-gray-500 hover:text-cyber-blue hover:border-cyber-blue/30 transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@shadowsec.ai"
                className="w-8 h-8 rounded-lg glass flex items-center justify-center text-gray-500 hover:text-cyber-blue hover:border-cyber-blue/30 transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest text-cyber-blue mb-4"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/chat', label: 'Chat Interface' },
                { href: '/resources', label: 'Resources' },
                { href: '/about', label: 'About' },
                { href: '/faq', label: 'FAQ' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-cyber-blue/50 group-hover:bg-cyber-blue transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest text-cyber-blue mb-4"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              Capabilities
            </h4>
            <ul className="space-y-2">
              {[
                'Ethical Hacking',
                'Malware Analysis',
                'SOC Operations',
                'Linux Security',
                'Network Defense',
                'Secure Coding',
              ].map((item) => (
                <li key={item}>
                  <span className="text-gray-500 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-purple-500/50" />
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Terminal widget */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest text-cyber-blue mb-4"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              System Status
            </h4>
            <div className="glass rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="w-4 h-4 text-cyber-green" />
                <span
                  className="text-xs text-cyber-green"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  shadowsec@ai:~$
                </span>
              </div>
              <div
                className="space-y-1 text-xs"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                  <span className="text-cyber-green">AI Engine: Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyber-blue animate-pulse" />
                  <span className="text-cyber-blue">Threat DB: Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  <span className="text-purple-400">API: Connected</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-cyber-border flex items-center gap-2">
                <Lock className="w-3 h-3 text-cyber-blue" />
                <span className="text-xs text-gray-500">Encrypted connection</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-cyber-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © {currentYear} ShadowSec AI. For educational and ethical purposes only.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Use', 'Legal'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-600 hover:text-gray-400 text-xs transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
