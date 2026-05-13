'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
}

// Custom syntax highlighting theme with cyber colors
const cyberTheme = {
  ...oneDark,
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: 'rgba(5, 8, 16, 0.9)',
    margin: '0',
    padding: '1.2em',
    fontSize: '0.85em',
    fontFamily: 'JetBrains Mono, monospace',
    border: 'none',
  },
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    background: 'transparent',
    fontFamily: 'JetBrains Mono, monospace',
  },
};

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Normalize language name for the syntax highlighter
  const normalizeLanguage = (lang: string): string => {
    const map: Record<string, string> = {
      sh: 'bash',
      shell: 'bash',
      ps: 'powershell',
      ps1: 'powershell',
      py: 'python',
      js: 'javascript',
      ts: 'typescript',
      yml: 'yaml',
    };
    return map[lang.toLowerCase()] || lang.toLowerCase();
  };

  const normalizedLang = normalizeLanguage(language || 'bash');
  const displayLang = language || 'code';

  // Language color mapping
  const langColors: Record<string, string> = {
    python: '#3776ab',
    bash: '#00d4ff',
    javascript: '#f7df1e',
    typescript: '#3178c6',
    powershell: '#5391fe',
    sql: '#336791',
    yaml: '#ff0099',
    json: '#00ff88',
  };

  const langColor = langColors[normalizedLang] || '#7c3aed';

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-cyber-border/50 shadow-lg">
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ background: 'rgba(13, 20, 37, 0.95)' }}
      >
        <div className="flex items-center gap-2">
          {/* Traffic light dots */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <div className="flex items-center gap-2 ml-2">
            <Terminal className="w-3.5 h-3.5" style={{ color: langColor }} />
            <span
              className="text-xs font-medium uppercase tracking-wider"
              style={{
                color: langColor,
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {displayLang}
            </span>
          </div>
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs transition-all duration-300 group"
          style={{
            background: copied ? 'rgba(0, 255, 136, 0.1)' : 'rgba(0, 212, 255, 0.08)',
            border: `1px solid ${copied ? 'rgba(0, 255, 136, 0.3)' : 'rgba(0, 212, 255, 0.2)'}`,
            color: copied ? '#00ff88' : '#00d4ff',
          }}
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <SyntaxHighlighter
          language={normalizedLang}
          style={cyberTheme}
          showLineNumbers={code.split('\n').length > 5}
          lineNumberStyle={{
            color: 'rgba(100, 116, 139, 0.5)',
            fontSize: '0.8em',
            paddingRight: '1em',
            minWidth: '2.5em',
          }}
          customStyle={{
            margin: 0,
            borderRadius: 0,
          }}
          wrapLongLines
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
