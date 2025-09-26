"use client"

import Image from "next/image";
import Link from "next/link";
import type React from "react";

interface ContactFormButtonProps {
    className?: string;
    children?: React.ReactNode;
}

function ContactFormButton({ className = "", children }: ContactFormButtonProps) {
    return (
        <Link href="/start" className={className || "btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg flex items-center justify-center gap-2"}>
            {children || "Get Started"}
            <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
            </svg>
        </Link>
    );
}

export default function Hero() {
    return (
        <section
            id="hero"
            className="card mt-32 mb-32 relative overflow-hidden shadow-md h-[calc(100vh-200px)] bg-gray-50 dark:bg-background"
        >
            <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col md:flex-row items-start h-full">
                {/* Text content - takes full width on mobile, positioned more to the left on larger screens */}
                <div className="w-full md:w-3/5 z-10 pl-2 sm:pl-4 md:pl-8 lg:pl-12 flex flex-col justify-center h-full">
                    <h1 className="text-black dark:text-white">
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-1 sm:mb-2">
              AI-Driven
            </span>
                        <span className="block text-[#7A7FEE] dark:text-[#7A7FEE] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight mb-1 sm:mb-2">
              Deep-Sea eDNA
            </span>
                        <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight">
              Analysis
            </span>
                    </h1>
                    <p className="mt-4 sm:mt-6 md:mt-8 mb-6 sm:mb-8 md:mb-10 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
                        Revolutionizing marine biodiversity assessment with advanced AI pipelines that classify, annotate, and analyze deep-sea environmental DNA without relying on traditional reference databases.
                    </p>
                    <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-6">
                        <ContactFormButton />
                    </div>
                </div>

                {/* Image - hidden on mobile, visible on md and up */}
                <div className="hidden md:flex md:w-2/5 md:absolute md:right-0 md:top-0 md:bottom-0 md:items-center">
                    <Image
                        src="/dna1.png"
                        alt="DNA Pattern"
                        width={500}
                        height={500}
                        className="w-full h-auto md:h-full md:w-auto md:object-cover md:object-left"
                    />
                </div>
            </div>
        </section>
    );
}