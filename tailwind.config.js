/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          black: "#0a0a0a",
          white: "#f5f5f5",
          dim: "#bfbfbf",
        },
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Inter", "Segoe UI", "Roboto"],
        serif: ["ui-serif", "Georgia", "Times New Roman"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(255,255,255,0.08), inset 0 0 18px rgba(255,255,255,0.06)",
        btn: "0 0 0 1px rgba(245,245,245,0.22), 0 8px 24px rgba(0,0,0,0.6)",
      },
      keyframes: {
        shine: {
          "0%": { backgroundPosition: "-200% 0%" },
          "100%": { backgroundPosition: "200% 0%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-1%, -1%)" },
          "20%": { transform: "translate(1%, -1%)" },
          "30%": { transform: "translate(-1%, 1%)" },
          "40%": { transform: "translate(1%, 1%)" },
          "50%": { transform: "translate(-0.5%, 0.5%)" },
          "60%": { transform: "translate(0.5%, -0.5%)" },
          "70%": { transform: "translate(-1%, 0.5%)" },
          "80%": { transform: "translate(1%, -0.5%)" },
          "90%": { transform: "translate(0%, 0%)" },
        },
      },
      animation: {
        shine: "shine 2.75s linear infinite",
        float: "float 6s ease-in-out infinite",
        grain: "grain 7s steps(12) infinite",
      },
      backgroundImage: {
        "bw-gradient":
          "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%)",
      },
    },
  },
  plugins: [],
}
