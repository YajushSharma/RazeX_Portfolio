"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface VideoCardProps {
    index: number;
    title: string;
    category: string;
}

const videos = [
    {
        title: "SaaS Product Launch",
        category: "Launch Video",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    },
    {
        title: "Brand Story Campaign",
        category: "Advertisement",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    },
    {
        title: "App Promo Reel",
        category: "Promotion",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    },
    {
        title: "Feature Showcase",
        category: "Product Demo",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    },
];

function VideoCard({ index, title, category }: VideoCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        videoRef.current?.play();
                    } else {
                        setIsVisible(false);
                        videoRef.current?.pause();
                    }
                });
            },
            { root: null, rootMargin: "-20% 0px -20% 0px", threshold: 0 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center px-4 md:px-8 py-4"
        >
            {/* GLOW CARD WRAPPER (The Container) */}
            <div
                className={`glow-card relative w-full max-w-6xl rounded-2xl overflow-hidden transition-all duration-700 ${isVisible ? "scale-100 opacity-100" : "scale-90 opacity-60"
                    }`}
                style={{ aspectRatio: "16 / 9" }}
            >
                {/* THE GLOWING BALL (Animated Element) */}
                <div className="glow" />

                {/* INNER CONTENT (Video Container) */}
                {/* IMPORTANT: inset-[1px] creates the gap for the border to shine */}
                <div className="glow-card-inner absolute inset-[1px] rounded-2xl overflow-hidden bg-black z-10">

                    {/* Video */}
                    <video
                        ref={videoRef}
                        src={videos[index].videoUrl}
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover z-0"
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60 z-10" />

                    {/* Text Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 z-20">
                        <span className="text-accent-orange text-xs md:text-sm font-medium tracking-wider uppercase mb-1 md:mb-2 block">
                            {category}
                        </span>
                        <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-white">
                            {title}
                        </h3>
                    </div>

                    {/* Play indicator */}
                    <div
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-opacity duration-300 ${isVisible ? "opacity-0" : "opacity-100"
                            }`}
                    >
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                            <svg className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function Portfolio() {
    return (
        <section id="work" className="py-12 md:py-20 bg-black relative overflow-hidden">
            <div className="absolute inset-0 bg-black z-0" />

            <div className="text-center mb-8 md:mb-16 px-4 relative z-10">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-accent-orange text-sm font-medium tracking-[0.3em] uppercase mb-4 block"
                >
                    Featured Work
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
                >
                    Selected <span className="text-gradient">Projects</span>
                </motion.h2>
            </div>

            <div className="space-y-2 md:space-y-6 relative z-10">
                {videos.map((video, index) => (
                    <VideoCard
                        key={index}
                        index={index}
                        title={video.title}
                        category={video.category}
                    />
                ))}
            </div>
        </section>
    );
}