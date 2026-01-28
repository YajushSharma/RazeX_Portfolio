"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function EndCTA() {
    return (
        <section
            id="contact"
            className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-dark-900 section-bg"
        >
            {/* Animated background orbs */}
            <div
                className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full animate-pulse"
                style={{
                    background: "radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, transparent 60%)"
                }}
            />
            <div
                className="absolute bottom-1/3 left-1/4 w-[250px] h-[250px] rounded-full animate-pulse"
                style={{
                    background: "radial-gradient(circle, rgba(251, 191, 36, 0.06) 0%, transparent 60%)",
                    animationDelay: "1s"
                }}
            />

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-20">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-accent-orange text-sm font-medium tracking-[0.3em] uppercase mb-6 block"
                >
                    Start Your Project
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8"
                >
                    Ready to bring it{" "}
                    <span className="text-gradient">home?</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-12"
                >
                    Let&apos;s discuss your vision and create something extraordinary together.
                    Book a call to get started.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <Link
                        href="mailto:hello@visualalchemy.com"
                        className="group relative inline-flex items-center justify-center h-16 px-10 text-lg font-semibold overflow-hidden btn-gradient-border btn-slide-up"
                    >
                        <span className="btn-text text-white transition-colors duration-300">
                            Book a chat
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </span>
                        <span className="btn-text-hover text-white">
                            Book a chat
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </span>
                    </Link>
                </motion.div>
            </div>

            {/* CTA Image - Centered at extreme bottom, NO animation */}
            <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[400px] md:w-[500px] lg:w-[600px] pointer-events-none">
                <Image
                    src="/cta-image.png"
                    alt="Decorative element"
                    width={600}
                    height={400}
                    className="object-contain"
                    priority
                />
            </div>

            {/* Decorative blur elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-accent-orange/5 rounded-full blur-3xl" />
            <div className="absolute bottom-40 left-20 w-48 h-48 bg-accent-gold/5 rounded-full blur-3xl" />
        </section>
    );
}
