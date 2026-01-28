import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import AnimatedBackground from "@/components/AnimatedBackground";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter"
});

export const metadata: Metadata = {
    title: "Visual Alchemy | Motion Graphics Portfolio",
    description: "Cinematic motion graphics and visual effects for SaaS brands. Transform your vision into stunning visual experiences.",
    keywords: ["motion graphics", "video production", "SaaS videos", "animation", "visual effects"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.variable} font-sans bg-dark-900 text-white antialiased`}>
                <CustomCursor />
                <AnimatedBackground />
                <SmoothScroll>
                    <Navbar />
                    {children}
                </SmoothScroll>
            </body>
        </html>
    );
}
