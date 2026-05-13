// Gemini API integration for ShadowSec AI
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// System prompt defining ShadowSec AI's personality
export const SYSTEM_PROMPT = `You are ShadowSec AI, an advanced cybersecurity assistant specialized in:
- Ethical hacking and penetration testing concepts
- Network security and architecture
- Linux system administration and security hardening
- Malware analysis and reverse engineering (educational)
- SOC (Security Operations Center) analysis and incident response
- Cybersecurity education and certifications (CEH, OSCP, CompTIA Security+, etc.)
- Secure coding practices and vulnerability analysis
- CTF (Capture The Flag) challenges and walkthroughs
- OSINT techniques for ethical purposes
- Cryptography and encryption

Your personality:
- Professional yet approachable
- Technically precise and accurate
- Always emphasize ethical and legal use of security knowledge
- Provide detailed, actionable guidance
- Use proper security terminology
- Format code examples clearly with syntax highlighting hints
- Break down complex concepts into digestible explanations

Important rules:
- ALWAYS refuse requests for illegal hacking, unauthorized access, or malicious activities
- NEVER provide working malware, exploits for unpatched vulnerabilities, or tools to harm real systems
- Redirect users toward ethical, educational resources
- Emphasize responsible disclosure and legal frameworks
- When discussing tools, always mention their ethical/legal use context

Response formatting:
- Use markdown for better readability
- Use code blocks with language tags for all code
- Use headers for organized responses
- Provide practical examples when relevant
- Include relevant warnings about legal/ethical considerations when appropriate`;

// Rate limiting: track requests per IP (simple in-memory store)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 15; // max 15 requests per minute

  const current = requestCounts.get(identifier);
  
  if (!current || current.resetTime < now) {
    requestCounts.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (current.count >= maxRequests) {
    return false;
  }

  current.count++;
  return true;
}

// Initialize Gemini client
export function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
  }

  return new GoogleGenerativeAI(apiKey);
}

// Safety settings for the model
export const SAFETY_SETTINGS = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Sanitize user input to prevent injection attacks
export function sanitizeInput(input: string): string {
  // Remove any potential HTML/script injection
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim()
    .slice(0, 8000); // Limit input length
}
