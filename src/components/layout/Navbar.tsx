'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Menu, X, Terminal, Zap } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/chat', label: 'Chat' },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-strong border-b border-cyber-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center glow-blue group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyber-green rounded-full animate-pulse" />
            </div>
            <span
              className="text-lg font-bold neon-blue hidden sm:block"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              ShadowSec<span className="text-purple-400">AI</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group ${
                  pathname === link.href
                    ? 'text-cyber-blue'
                    : 'text-gray-400 hover:text-white'
                }`}
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {pathname === link.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'rgba(0, 212, 255, 0.08)',
                      border: '1px solid rgba(0, 212, 255, 0.2)',
                    }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/chat"
              className="btn-cyber px-5 py-2 rounded-lg text-sm flex items-center gap-2"
            >
              <Terminal className="w-4 h-4" />
              Launch Chat
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg glass text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-strong border-t border-cyber-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    pathname === link.href
                      ? 'text-cyber-blue bg-cyber-blue/10 border border-cyber-blue/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/chat"
                onClick={() => setIsOpen(false)}
                className="btn-cyber w-full py-3 rounded-lg text-sm flex items-center justify-center gap-2 mt-2"
              >
                <Zap className="w-4 h-4" />
                Launch Chat
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
