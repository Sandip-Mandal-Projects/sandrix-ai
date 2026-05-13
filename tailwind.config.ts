import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Primary display font - futuristic
        display: ["var(--font-orbitron)", "monospace"],
        // Body font - clean and readable
        body: ["var(--font-syne)", "sans-serif"],
        // Mono for code
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      colors: {
        cyber: {
          bg: "#050810",
          surface: "#0a0f1e",
          card: "#0d1425",
          border: "#1a2540",
          blue: "#00d4ff",
          purple: "#7c3aed",
          pink: "#ff0099",
          green: "#00ff88",
          yellow: "#ffd700",
        },
      },
      backgroundImage: {
        "cyber-grid":
          "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
        "glow-blue":
          "radial-gradient(ellipse at center, rgba(0,212,255,0.15) 0%, transparent 70%)",
        "glow-purple":
          "radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 70%)",
      },
      animation: {
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "scanline": "scanline 8s linear infinite",
        "matrix-rain": "matrixRain 20s linear infinite",
        "border-flow": "borderFlow 3s linear infinite",
        "typing": "typing 1.5s steps(3) infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "1", filter: "brightness(1)" },
          "50%": { opacity: "0.7", filter: "brightness(1.3)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        borderFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        typing: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      boxShadow: {
        "neon-blue": "0 0 20px rgba(0,212,255,0.5), 0 0 60px rgba(0,212,255,0.2)",
        "neon-purple": "0 0 20px rgba(124,58,237,0.5), 0 0 60px rgba(124,58,237,0.2)",
        "neon-pink": "0 0 20px rgba(255,0,153,0.5), 0 0 60px rgba(255,0,153,0.2)",
        "glass": "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
    },
  },
  plugins: [],
};
export default config;
