import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        industrial: ['JetBrains Mono', 'Courier New', 'monospace'], // High-contrast mono for technical data
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.25', letterSpacing: '0em' }],
        'sm': ['0.875rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'base': ['0.9375rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        'lg': ['1.125rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
        'industrial-xs': ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.05em' }],
        'industrial-sm': ['0.875rem', { lineHeight: '1.3', letterSpacing: '0.03em' }],
        'industrial-base': ['1rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'industrial-lg': ['1.125rem', { lineHeight: '1.4', letterSpacing: '0.01em' }],
        'industrial-xl': ['1.25rem', { lineHeight: '1.4', letterSpacing: '0em' }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // High-Contrast Industrial Color System
        steel: {
          50: "hsl(var(--steel-50))",
          100: "hsl(var(--steel-100))",
          200: "hsl(var(--steel-200))",
          300: "hsl(var(--steel-300))",
          400: "hsl(var(--steel-400))",
          500: "hsl(var(--steel-500))",
          600: "hsl(var(--steel-600))",
          700: "hsl(var(--steel-700))",
          800: "hsl(var(--steel-800))",
          900: "hsl(var(--steel-900))",
          DEFAULT: "hsl(var(--steel-500))",
        },
        // HMI Cyan - Industrial control panel primary
        hmi: {
          50: "hsl(var(--hmi-50))",
          100: "hsl(var(--hmi-100))",
          200: "hsl(var(--hmi-200))",
          300: "hsl(var(--hmi-300))",
          400: "hsl(var(--hmi-400))",
          500: "hsl(var(--hmi-500))",
          600: "hsl(var(--hmi-600))",
          700: "hsl(var(--hmi-700))",
          800: "hsl(var(--hmi-800))",
          900: "hsl(var(--hmi-900))",
          DEFAULT: "hsl(var(--hmi-500))",
        },
        // Confidence Score Semantic Colors (from 04_DATA_MODELS.md)
        confidence: {
          high: "var(--confidence-high)",      // #00FF88 - score >= 0.7
          medium: "var(--confidence-medium)",   // #FFB800 - 0.5 <= score < 0.7
          low: "var(--confidence-low)",        // #FF6B00 - 0.3 <= score < 0.5
          "red-flag": "var(--confidence-red-flag)", // #FF3B30 - score < 0.5 or flags
        },
        // Risk Severity Colors
        risk: {
          high: "var(--risk-high)",            // #FF3B30
          medium: "var(--risk-medium)",        // #FFB800
          low: "var(--risk-low)",              // #FFD700
        },
        // Industrial Status Colors
        status: {
          success: "var(--status-success)",    // #00FF88
          warning: "var(--status-warning)",    // #FFB800
          error: "var(--status-error)",        // #FF3B30
          info: "var(--status-info)",          // #00D9FF
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 2px)",
        "2xl": "calc(var(--radius) + 4px)",
        "3xl": "calc(var(--radius) + 8px)",
        industrial: "0.25rem", // Sharp, functional corners for technical data
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.98)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(12px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 30px hsl(189 94% 43% / 0.2)" },
          "50%": { boxShadow: "0 0 60px hsl(189 94% 43% / 0.4)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "marquee-smooth": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "count-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.15s ease-out",
        "accordion-up": "accordion-up 0.15s ease-out",
        "fade-up": "fade-up 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        "fade-in": "fade-in 0.2s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        "slide-up": "slide-up 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        "scale-in": "scale-in 0.2s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        "slide-in-right": "slide-in-right 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "marquee-smooth": "marquee-smooth 50s linear infinite",
        "count-up": "count-up 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        "shimmer": "shimmer 2s linear infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-modern": "var(--gradient-hero)",
        "gradient-accent-soft": "var(--gradient-accent-soft)",
      },
      boxShadow: {
        "modern": "var(--shadow-sm)",
        "modern-md": "var(--shadow-md)",
        "modern-lg": "var(--shadow-lg)",
        "modern-xl": "var(--shadow-xl)",
        "glow-cyan": "var(--shadow-glow-cyan)",
        "glow-amber": "var(--shadow-glow-amber)",
        "industrial": "0 2px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        "industrial-lg": "0 4px 16px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
        "glow-hmi": "0 0 0 1px hsl(var(--hmi-500) / 0.1), 0 2px 4px 0 hsl(var(--hmi-500) / 0.1)",
        "glow-confidence-high": "0 0 12px rgba(0, 255, 136, 0.4)",
        "glow-confidence-red-flag": "0 0 12px rgba(255, 59, 48, 0.5), 0 0 24px rgba(255, 59, 48, 0.2)",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
