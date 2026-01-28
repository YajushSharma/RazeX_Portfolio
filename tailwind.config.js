/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                accent: {
                    orange: "#F97316",
                    gold: "#FBBF24",
                    amber: "#D97706",
                },
                dark: {
                    900: "#0A0A0A",
                    800: "#111111",
                    700: "#1A1A1A",
                    600: "#262626",
                    500: "#404040",
                },
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
            },
            animation: {
                "float": "float 6s ease-in-out infinite",
                "float-slow": "float 8s ease-in-out infinite",
                "glow": "glow 2s ease-in-out infinite alternate",
                "god-rays": "godRays 20s linear infinite",
                "breathe": "breathe 4s ease-in-out infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                glow: {
                    "0%": { boxShadow: "0 0 20px rgba(249, 115, 22, 0.3)" },
                    "100%": { boxShadow: "0 0 40px rgba(249, 115, 22, 0.6)" },
                },
                godRays: {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
                breathe: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-15px)" },
                },
            },
            backdropBlur: {
                xs: "2px",
            },
        },
    },
    plugins: [],
};
