"use client";
import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            smoothWheel: true,
        });

        // 1. Tell ScrollTrigger to update whenever Lenis scrolls
        lenis.on('scroll', ScrollTrigger.update);

        // 2. Sync GSAP's ticker to Lenis's requestAnimationFrame
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // 3. Disable GSAP's internal lag smoothing (conflicts with Lenis)
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    return <>{children}</>;
}