"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import Image from "next/image";
import LightRays from "./LightRays";
import Particles from "./Particles";

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollY } = useScroll();
    const [isMobile, setIsMobile] = useState(false);
    const [isReady, setIsReady] = useState(false);

    // Calculate pinOffset on client side - use a reasonable default for SSR
    const pinOffset = typeof window !== "undefined" ? window.innerHeight * 1.5 : 1000;

    // Detect mobile on mount - only run once
    useEffect(() => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        // Small delay to prevent flicker during hydration
        requestAnimationFrame(() => setIsReady(true));
    }, []);

    // Parallax transforms - use calculated pinOffset directly
    const bgY = useTransform(scrollY, [pinOffset, pinOffset + 1000], [0, 1000]);
    const circleY = useTransform(scrollY, [pinOffset, pinOffset + 1000], [0, -150]);
    const textY = useTransform(scrollY, [pinOffset, pinOffset + 800], [0, 650]);
    const textOpacity = useTransform(scrollY, [pinOffset, pinOffset + 800], [1, 0]);

    // Static motion values for mobile
    const staticY = useMotionValue(0);
    const staticOpacity = useMotionValue(1);

    // Choose between animated and static based on mobile
    const useBgY = isMobile ? staticY : bgY;
    const useCircleY = isMobile ? staticY : circleY;
    const useTextY = isMobile ? staticY : textY;
    const useTextOpacity = isMobile ? staticOpacity : textOpacity;

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative min-h-screen w-full flex items-center justify-center overflow-visible"
        >
            {/* Layer 1: Star Background */}
            <motion.div
                className="absolute z-0 w-full"
                style={{
                    y: useBgY,
                    top: "0",
                    left: 0,
                    right: 0,
                    height: "140%",
                    willChange: isMobile ? "auto" : "transform",
                    // Prevent flicker during initial render
                    opacity: isReady ? 1 : 1,
                }}
            >
                <Image
                    src="/hero-bg-bg-4k.webp"
                    alt="Star Background"
                    fill
                    className="object-cover object-center"
                    priority
                    quality={100}
                    unoptimized
                />
            </motion.div>

            {/* Layer 2: Glowing Circle - optimized for ultrawide (21:9) */}
            <motion.div
                className="absolute left-0 right-0 z-[5] pointer-events-none w-screen flex justify-center glowing-circle-layer"
                style={{ y: useCircleY }}
            >
                <div className="absolute top-1/2 left-0 right-0 h-[200vh] bg-black -z-10" />
                <Image
                    src="/hero-bg-circle-4k.webp"
                    alt="Glowing Circle"
                    width={3840}
                    height={3840}
                    className="min-w-[100vw] w-auto h-auto object-contain 2xl:min-w-[120vw] 3xl:min-w-[140vw]"
                    style={{ maxWidth: "none" }}
                    priority
                    quality={100}
                    unoptimized
                />
            </motion.div>

            {/* WebGL Light Rays Effect - Hidden on mobile for performance */}
            <div className="hidden md:block">
                <LightRays />
            </div>

            {/* Floating Particles */}
            <Particles />

            {/* Content - adjusted margins for mobile */}
            <motion.div
                className="relative z-[3] w-full flex flex-col items-center text-center px-4 max-w-5xl mx-auto -mt-24 md:-mt-72"
                style={{
                    y: useTextY,
                    opacity: useTextOpacity,
                }}
            >
                {/* Subheading - HIDDEN on mobile */}
                <div className="mb-6 hero-reveal-content hidden md:block">
                    <span className="text-cinematic-label-orange text-sm md:text-base">
                        Motion Graphics Studio
                    </span>
                </div>

                {/* Main heading - optimized for mobile */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cinematic-heading tracking-tight mb-6 md:mb-8 hero-reveal-content">
                    <span>Complex Ideas</span>
                    <br />
                    <span className="text-gradient">Clear Motion.</span>
                </h1>

                {/* Description - hidden on extra small screens */}
                <p className="text-cinematic-body text-base md:text-xl max-w-2xl mx-auto mb-6 md:mb-12 hero-reveal-content hidden sm:block">
                    I craft cinematic motion visuals and high-converting video content that help brands stand out, tell better stories, and convert viewers into customers.
                </p>

                {/* CTA Button - wider on mobile for easy tapping */}
                <div className="hero-reveal-content w-full sm:w-auto px-4 sm:px-0">
                    <a
                        href="http://wa.me/7248197932"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center justify-center w-full sm:w-auto h-14 md:h-14 px-8 md:px-8 text-base md:text-lg font-semibold overflow-hidden btn-gradient-border btn-slide-up">

                        <span className="btn-text text-white transition-colors duration-300">
                            Start Your Project
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                        <span className="btn-text-hover text-white">
                            Contact Now
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </a>
                </div>
            </motion.div>

            {/* Scroll Indicator - hidden on mobile */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] hero-reveal-content hidden md:block"
                style={{ opacity: useTextOpacity }}
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
                >
                    <motion.div
                        animate={{ height: ["20%", "40%", "20%"] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1 bg-accent-orange/70 rounded-full"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
