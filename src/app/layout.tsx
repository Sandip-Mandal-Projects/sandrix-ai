import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ShadowSec AI — Cybersecurity Intelligence Platform',
  description:
    'Your AI-powered cybersecurity assistant specialized in ethical hacking, network security, malware analysis, SOC operations, and cyber education.',
  keywords: [
    'cybersecurity AI',
    'ethical hacking assistant',
    'security AI chatbot',
    'penetration testing help',
    'SOC analyst AI',
    'malware analysis AI',
    'network security assistant',
  ],
  openGraph: {
    title: 'ShadowSec AI — Cybersecurity Intelligence Platform',
    description: 'Your AI-powered cybersecurity assistant',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Preconnect to Google Fonts for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          fontFamily: 'Syne, sans-serif',
          backgroundColor: '#050810',
          color: '#e2e8f0',
          minHeight: '100vh',
        }}
      >
        {/* Scanline overlay for CRT effect */}
        <div className="scanline-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
