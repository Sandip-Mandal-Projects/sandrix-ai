# 🛡️ ShadowSec AI

> Your AI-Powered Cybersecurity Assistant — ethical hacking, SOC analysis, malware research, Linux, networking, and cyber education.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff69b4)
![Gemini AI](https://img.shields.io/badge/Gemini-1.5_Flash-4285f4?logo=google)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)

---

## ✨ Features

- 🤖 **AI Chat** — Gemini 1.5 Flash powered cybersecurity assistant
- 💬 **ChatGPT-style UI** — Sidebar with chat history, streaming responses
- 🎨 **Cyberpunk Design** — Glassmorphism, neon glows, matrix rain, particle field
- 📝 **Full Markdown** — Headers, tables, lists, blockquotes, inline code
- 🖥️ **Syntax Highlighting** — Python, Bash, JS, TS, PowerShell, SQL, YAML, JSON
- 📋 **Copy Button** — One-click copy on every code block
- 📱 **Mobile Responsive** — Mobile-first design, collapsible sidebar
- 🔒 **Ethical Guardrails** — Refuses illegal/malicious requests
- ⚡ **Rate Limiting** — Built-in API abuse protection
- 🚀 **Vercel Ready** — Zero-config deployment

---

## 📁 Project Structure

```
shadowsec-ai/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts          # Gemini API endpoint
│   │   ├── about/
│   │   │   └── page.tsx              # About page
│   │   ├── chat/
│   │   │   └── page.tsx              # Chat interface page
│   │   ├── faq/
│   │   │   └── page.tsx              # FAQ accordion page
│   │   ├── resources/
│   │   │   └── page.tsx              # Curated resources page
│   │   ├── globals.css               # Global styles + animations
│   │   ├── layout.tsx                # Root layout + fonts
│   │   └── page.tsx                  # Homepage (hero + features)
│   │
│   ├── components/
│   │   ├── chat/
│   │   │   ├── ChatInput.tsx         # Auto-resizing textarea + send button
│   │   │   ├── ChatInterface.tsx     # Main chat layout + welcome screen
│   │   │   ├── ChatMessage.tsx       # Message bubbles + typing indicator
│   │   │   └── ChatSidebar.tsx       # Collapsible chat history sidebar
│   │   ├── layout/
│   │   │   ├── Footer.tsx            # Futuristic footer with terminal widget
│   │   │   └── Navbar.tsx            # Animated sticky navbar
│   │   └── ui/
│   │       ├── CodeBlock.tsx         # Syntax highlighted + copy button
│   │       ├── MarkdownRenderer.tsx  # Full markdown with custom styling
│   │       ├── MatrixRain.tsx        # Canvas matrix rain background
│   │       └── ParticleField.tsx     # Canvas particle + connection lines
│   │
│   ├── hooks/
│   │   └── useChat.ts                # Chat state + streaming simulation
│   │
│   ├── lib/
│   │   ├── gemini.ts                 # Gemini client + rate limiter + sanitizer
│   │   └── utils.ts                  # cn(), formatTime(), generateChatTitle()
│   │
│   └── types/
│       └── index.ts                  # TypeScript interfaces
│
├── .env.example                      # Environment variable template
├── .gitignore
├── next.config.mjs                   # Next.js config + security headers
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts                # Cyber theme + custom animations
└── tsconfig.json
```

---

## 🚀 Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/your-username/shadowsec-ai.git
cd shadowsec-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Get your Gemini API key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the key

### 4. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deploy to Vercel (Free)

### Option A — One-Click (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **"New Project"** → Import your GitHub repo
4. In **Environment Variables**, add:
   - Key: `GEMINI_API_KEY`
   - Value: your Gemini API key
5. Click **Deploy**

Done! Your app will be live at `https://your-project.vercel.app`

### Option B — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
# Follow the prompts, add GEMINI_API_KEY when asked
```

---

## 🔑 Gemini API Setup Guide

| Step | Action |
|------|--------|
| 1 | Visit [aistudio.google.com](https://aistudio.google.com/app/apikey) |
| 2 | Sign in with Google |
| 3 | Click **Create API Key** |
| 4 | Select or create a Google Cloud project |
| 5 | Copy the generated key |
| 6 | Add to `.env.local` as `GEMINI_API_KEY` |

**Free Tier Limits (as of 2024):**
- 15 requests per minute (RPM)
- 1 million tokens per minute (TPM)
- 1,500 requests per day (RPD)

The app includes built-in rate limiting (15 req/min per IP) to stay within these limits.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router + API Routes |
| **TypeScript** | Type safety throughout |
| **Tailwind CSS 3** | Utility-first styling |
| **Framer Motion 11** | Animations and transitions |
| **@google/generative-ai** | Official Gemini SDK |
| **react-markdown** | Markdown rendering in chat |
| **react-syntax-highlighter** | Code syntax highlighting |
| **lucide-react** | Icon set |
| **uuid** | Unique IDs for messages/chats |
| **clsx + tailwind-merge** | Safe class merging |

---

## ⚙️ Configuration

### Changing the AI Model

In `src/lib/gemini.ts`, edit the `model` field:

```typescript
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',  // Change to 'gemini-1.5-pro' for better quality
  ...
});
```

### Modifying the AI Personality

Edit `SYSTEM_PROMPT` in `src/lib/gemini.ts` to customize the AI's behavior, tone, and specializations.

### Adjusting Rate Limits

In `src/lib/gemini.ts`:

```typescript
const windowMs = 60 * 1000;  // 1 minute window
const maxRequests = 15;       // max requests per window
```

---

## 🔒 Security Features

- ✅ Input sanitization (strips HTML/scripts, limits to 8000 chars)
- ✅ API key stored server-side only (never exposed to client)
- ✅ Rate limiting per IP address
- ✅ Security headers (X-Frame-Options, X-Content-Type-Options)
- ✅ Gemini safety filters (harassment, hate speech, dangerous content)
- ✅ Ethical guardrails in system prompt

---

## ⚠️ Legal & Ethical Notice

ShadowSec AI is for **educational purposes only**. All cybersecurity knowledge provided must be used:
- Only on systems you own or have **explicit written permission** to test
- In compliance with all applicable laws and regulations
- Following responsible disclosure practices

Unauthorized access to computer systems is **illegal** everywhere.

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

*Built with ⚡ for the cybersecurity community*
