"use client";

import { motion } from "framer-motion";
import { Video, Megaphone, Rocket } from "lucide-react";

const services = [
    {
        icon: Rocket,
        title: "SaaS Launch Videos",
        description:
            "Captivating launch videos that introduce your product to the world with cinematic flair and compelling narratives.",
    },
    {
        icon: Megaphone,
        title: "SaaS Advertisement",
        description:
            "High-converting promotional content designed to capture attention and drive user acquisition across all platforms.",
    },
    {
        icon: Video,
        title: "Promotion Videos",
        description:
            "Dynamic promotional reels that showcase your features, benefits, and unique value proposition with stunning visuals.",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0, 0, 0.2, 1] as const, // easeOut cubic bezier
        },
    },
};

export default function Services() {
    return (
        <section id="services" className="py-32 bg-dark-900 relative overflow-hidden section-bg">
            {/* Animated background orbs using CSS */}
            <div
                className="absolute top-20 right-20 w-[300px] h-[300px] rounded-full animate-pulse opacity-50"
                style={{
                    background: "radial-gradient(circle, rgba(251, 191, 36, 0.08) 0%, transparent 60%)"
                }}
            />
            <div
                className="absolute bottom-20 left-10 w-[250px] h-[250px] rounded-full animate-pulse opacity-50"
                style={{
                    background: "radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, transparent 60%)",
                    animationDelay: "1.5s"
                }}
            />
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full animate-pulse opacity-30"
                style={{
                    background: "radial-gradient(circle, rgba(249, 115, 22, 0.06) 0%, transparent 70%)",
                    animationDelay: "0.5s"
                }}
            />

            <div className="relative max-w-7xl mx-auto px-4 md:px-8 z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-accent-orange text-sm font-medium tracking-[0.3em] uppercase mb-4 block"
                    >
                        What We Do
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                    >
                        Our <span className="text-gradient">Services</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-white/50 text-lg max-w-2xl mx-auto"
                    >
                        From concept to delivery, we create visual experiences that resonate with your audience and drive results.
                    </motion.p>
                </div>

                {/* Services Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            className="group relative p-8 rounded-2xl gradient-border cursor-pointer"
                        >
                            {/* Hover glow effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Icon */}
                            <div className="relative mb-6">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-orange/20 to-accent-gold/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <service.icon className="w-7 h-7 text-accent-orange" />
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="relative text-xl font-bold text-white mb-4 group-hover:text-gradient transition-all duration-300">
                                {service.title}
                            </h3>
                            <p className="relative text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                                {service.description}
                            </p>

                            {/* Arrow indicator */}
                            <div className="relative mt-6 flex items-center gap-2 text-accent-orange opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                                <span className="text-sm font-medium">Learn more</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
