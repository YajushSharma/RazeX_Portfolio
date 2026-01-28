"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    life: number;
    maxLife: number;
    type: "light" | "circle" | "ambient";
}

export default function Particles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);
    const particlesRef = useRef<Particle[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Initialize particles - more particles now
        const lightParticles = 50; // From light rays (top-right)
        const circleParticles = 40; // Around the glowing circle
        const ambientParticles = 30; // Random ambient particles

        for (let i = 0; i < lightParticles; i++) {
            particlesRef.current.push(createParticle(canvas.width, canvas.height, "light"));
        }
        for (let i = 0; i < circleParticles; i++) {
            particlesRef.current.push(createParticle(canvas.width, canvas.height, "circle"));
        }
        for (let i = 0; i < ambientParticles; i++) {
            particlesRef.current.push(createParticle(canvas.width, canvas.height, "ambient"));
        }

        function createParticle(width: number, height: number, type: "light" | "circle" | "ambient"): Particle {
            let x: number, y: number, vx: number, vy: number, size: number;

            if (type === "light") {
                // Particles from top-right (light rays source)
                x = width * 0.6 + Math.random() * width * 0.4;
                y = Math.random() * height * 0.4;
                vx = (Math.random() - 0.7) * 0.3; // Drift left
                vy = Math.random() * 0.2 + 0.05; // Slow down
                size = Math.random() * 2 + 0.5;
            } else if (type === "circle") {
                // Particles around the glowing circle (center-bottom area)
                // Circle is at 35-65% from top, centered horizontally
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.random() * width * 0.3 + width * 0.1;
                x = width * 0.5 + Math.cos(angle) * radius;
                y = height * 0.5 + Math.sin(angle) * radius * 0.4; // Flatten for horizontal oval
                vx = (Math.random() - 0.5) * 0.15; // Gentle horizontal drift
                vy = (Math.random() - 0.5) * 0.1; // Gentle vertical drift
                size = Math.random() * 2.5 + 1; // Slightly larger
            } else {
                // Ambient particles throughout
                x = Math.random() * width;
                y = Math.random() * height;
                vx = (Math.random() - 0.5) * 0.1;
                vy = (Math.random() - 0.3) * 0.15;
                size = Math.random() * 1.5 + 0.3;
            }

            return {
                x,
                y,
                vx,
                vy,
                size,
                opacity: Math.random() * 0.5 + 0.1,
                life: Math.random() * 100, // Stagger initial life
                maxLife: Math.random() * 300 + 200,
                type,
            };
        }

        function updateParticle(p: Particle, width: number, height: number) {
            p.x += p.vx;
            p.y += p.vy;
            p.life++;

            // Fade in and out
            const lifeRatio = p.life / p.maxLife;
            if (lifeRatio < 0.1) {
                p.opacity = lifeRatio * 10 * (Math.random() * 0.5 + 0.1);
            } else if (lifeRatio > 0.8) {
                p.opacity = (1 - lifeRatio) * 5 * (Math.random() * 0.5 + 0.1);
            }

            // Reset if out of bounds or life ended
            if (p.x < -50 || p.x > width + 50 || p.y < -50 || p.y > height + 50 || p.life > p.maxLife) {
                Object.assign(p, createParticle(width, height, p.type));
                p.life = 0;
            }
        }

        function drawParticle(ctx: CanvasRenderingContext2D, p: Particle) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

            // Different colors based on type
            let color1: string, color2: string;
            if (p.type === "circle") {
                // Brighter gold for circle particles
                color1 = `rgba(251, 191, 36, ${p.opacity * 1.2})`;
                color2 = `rgba(249, 115, 22, 0)`;
            } else if (p.type === "light") {
                // Orange for light ray particles
                color1 = `rgba(249, 115, 22, ${p.opacity})`;
                color2 = `rgba(251, 191, 36, 0)`;
            } else {
                // Subtle white for ambient
                color1 = `rgba(255, 255, 255, ${p.opacity * 0.6})`;
                color2 = `rgba(255, 255, 255, 0)`;
            }

            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
            gradient.addColorStop(0, color1);
            gradient.addColorStop(1, color2);

            ctx.fillStyle = gradient;
            ctx.fill();
        }

        // Animation loop
        function animate() {
            if (!canvas || !ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach(p => {
                updateParticle(p, canvas.width, canvas.height);
                drawParticle(ctx, p);
            });

            animationRef.current = requestAnimationFrame(animate);
        }
        animate();

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-[3]"
            style={{ mixBlendMode: "screen" }}
        />
    );
}
