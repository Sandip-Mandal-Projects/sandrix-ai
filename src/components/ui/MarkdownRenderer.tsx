'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './CodeBlock';

interface MarkdownRendererProps {
  content: string;
  isStreaming?: boolean;
}

export function MarkdownRenderer({ content, isStreaming }: MarkdownRendererProps) {
  return (
    <div className={`markdown-content ${isStreaming ? 'streaming-cursor' : ''}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom code block rendering
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');

            // Multi-line code = code block, single line = inline code
            const isBlock = codeString.includes('\n') || (match && match[1]);

            if (isBlock) {
              return (
                <CodeBlock
                  code={codeString}
                  language={match ? match[1] : 'bash'}
                />
              );
            }

            return (
              <code
                className={className}
                {...props}
                style={{
                  background: 'rgba(0, 212, 255, 0.08)',
                  border: '1px solid rgba(0, 212, 255, 0.15)',
                  borderRadius: '4px',
                  padding: '0.15em 0.4em',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.82em',
                  color: '#00d4ff',
                }}
              >
                {children}
              </code>
            );
          },

          // Custom paragraph spacing
          p({ children }) {
            return (
              <p style={{ marginBottom: '0.7em', lineHeight: '1.7' }}>
                {children}
              </p>
            );
          },

          // Custom headers
          h1({ children }) {
            return (
              <h1
                style={{
                  fontFamily: 'Orbitron, monospace',
                  color: '#00d4ff',
                  fontSize: '1.3em',
                  fontWeight: 700,
                  margin: '1.2em 0 0.6em',
                  borderBottom: '1px solid rgba(0, 212, 255, 0.2)',
                  paddingBottom: '0.3em',
                }}
              >
                {children}
              </h1>
            );
          },

          h2({ children }) {
            return (
              <h2
                style={{
                  fontFamily: 'Orbitron, monospace',
                  color: '#a855f7',
                  fontSize: '1.15em',
                  fontWeight: 600,
                  margin: '1em 0 0.5em',
                }}
              >
                {children}
              </h2>
            );
          },

          h3({ children }) {
            return (
              <h3
                style={{
                  fontFamily: 'Syne, sans-serif',
                  color: '#00ff88',
                  fontSize: '1em',
                  fontWeight: 600,
                  margin: '0.8em 0 0.4em',
                }}
              >
                {children}
              </h3>
            );
          },

          // Custom list styling
          ul({ children }) {
            return (
              <ul
                style={{
                  paddingLeft: '1.4em',
                  margin: '0.5em 0',
                  listStyleType: 'none',
                }}
              >
                {children}
              </ul>
            );
          },

          li({ children }) {
            return (
              <li
                style={{
                  margin: '0.3em 0',
                  paddingLeft: '0.5em',
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: '-1em',
                    color: '#00d4ff',
                    fontSize: '0.8em',
                  }}
                >
                  ▸
                </span>
                {children}
              </li>
            );
          },

          // Custom blockquote
          blockquote({ children }) {
            return (
              <blockquote
                style={{
                  borderLeft: '3px solid #00d4ff',
                  paddingLeft: '1em',
                  margin: '0.8em 0',
                  background: 'rgba(0, 212, 255, 0.04)',
                  borderRadius: '0 8px 8px 0',
                  padding: '0.6em 1em',
                  color: 'rgba(226, 232, 240, 0.7)',
                  fontStyle: 'italic',
                }}
              >
                {children}
              </blockquote>
            );
          },

          // Custom table
          table({ children }) {
            return (
              <div style={{ overflowX: 'auto', margin: '0.8em 0' }}>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '0.88em',
                  }}
                >
                  {children}
                </table>
              </div>
            );
          },

          th({ children }) {
            return (
              <th
                style={{
                  background: 'rgba(0, 212, 255, 0.08)',
                  color: '#00d4ff',
                  fontFamily: 'Orbitron, monospace',
                  fontSize: '0.75em',
                  padding: '0.6em 0.8em',
                  textAlign: 'left',
                  border: '1px solid rgba(26, 37, 64, 0.8)',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                {children}
              </th>
            );
          },

          td({ children }) {
            return (
              <td
                style={{
                  padding: '0.5em 0.8em',
                  border: '1px solid rgba(26, 37, 64, 0.8)',
                  color: 'rgba(226, 232, 240, 0.85)',
                }}
              >
                {children}
              </td>
            );
          },

          // Custom horizontal rule
          hr() {
            return (
              <hr
                style={{
                  border: 'none',
                  borderTop: '1px solid rgba(26, 37, 64, 0.8)',
                  margin: '1em 0',
                }}
              />
            );
          },

          // Custom link
          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#00d4ff',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(0, 212, 255, 0.3)',
                }}
              >
                {children}
              </a>
            );
          },

          // Custom strong
          strong({ children }) {
            return (
              <strong style={{ color: '#fff', fontWeight: 700 }}>
                {children}
              </strong>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
