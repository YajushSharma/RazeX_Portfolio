"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Work", href: "#work" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("home");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        // Intersection Observer for active section
        const observerOptions = {
            root: null,
            rootMargin: "-40% 0px -60% 0px",
            threshold: 0,
        };

        const observerCallback: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all sections
        const sections = document.querySelectorAll("section[id]");
        sections.forEach((section) => observer.observe(section));

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
        >
            <div
                className={`flex items-center gap-2 md:gap-8 px-4 md:px-8 py-3 rounded-full transition-all duration-500 ${scrolled
                    ? "glass shadow-lg shadow-black/30"
                    : "bg-white/5 backdrop-blur-sm border border-white/5"
                    }`}
            >
                {/* Logo */}
                <Link href="#home" className="text-lg md:text-xl font-bold text-gradient mr-2">
                    RazeX
                </Link>

                {/* Nav Links */}
                <ul className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className={`relative text-sm font-medium transition-all duration-300 ${activeSection === link.href.slice(1)
                                    ? "text-white"
                                    : "text-white/50 hover:text-white/80"
                                    }`}
                            >
                                {link.name}
                                {activeSection === link.href.slice(1) && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-orange to-accent-gold rounded-full"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Links */}
                <ul className="flex md:hidden items-center gap-4">
                    {navLinks.slice(0, 3).map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className={`text-xs font-medium transition-all duration-300 ${activeSection === link.href.slice(1)
                                    ? "text-white"
                                    : "text-white/50"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* CTA Button with slide-up animation */}
                <Link
                    href="#contact"
                    className="relative h-9 px-4 md:px-6 flex items-center justify-center text-xs md:text-sm font-medium rounded-full border border-accent-orange/50 overflow-hidden group btn-glow btn-slide-up"
                >
                    <span className="btn-text text-white group-hover:text-dark-900 transition-colors duration-300">
                        Let&apos;s Talk
                    </span>
                    <span className="btn-text-hover text-dark-900">
                        Let&apos;s Talk
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-orange to-accent-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out -z-10" />
                </Link>
            </div>
        </motion.nav>
    );
}
