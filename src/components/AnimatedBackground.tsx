"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Floating orbs - using CSS animations for performance */}
            <div
                className="absolute w-[500px] h-[500px] rounded-full animate-float-slow"
                style={{
                    background: "radial-gradient(circle, rgba(249, 115, 22, 0.06) 0%, transparent 70%)",
                    top: "20%",
                    right: "-5%",
                }}
            />
            <div
                className="absolute w-[400px] h-[400px] rounded-full animate-float"
                style={{
                    background: "radial-gradient(circle, rgba(251, 191, 36, 0.05) 0%, transparent 70%)",
                    bottom: "30%",
                    left: "-5%",
                }}
            />
            <div
                className="absolute w-[350px] h-[350px] rounded-full animate-float-slow"
                style={{
                    background: "radial-gradient(circle, rgba(249, 115, 22, 0.04) 0%, transparent 70%)",
                    top: "60%",
                    left: "40%",
                }}
            />

            {/* Subtle grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(249, 115, 22, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249, 115, 22, 0.5) 1px, transparent 1px)
          `,
                    backgroundSize: '80px 80px',
                }}
            />
        </div>
    );
}
