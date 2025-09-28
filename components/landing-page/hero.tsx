"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type React from "react";

interface ContactFormButtonProps {
  className?: string;
  children?: React.ReactNode;
}

function ContactFormButton({
  className = "",
  children,
}: ContactFormButtonProps) {
  return (
    <Link
      href="/start"
      className={
        className ||
        "btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition"
      }
    >
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
      className="relative mt-28 mb-28 h-[calc(100vh-200px)] overflow-hidden rounded-3xl bg-gray-50 shadow-md dark:bg-background"
    >
      <div className="relative z-10 flex h-full flex-col md:flex-row items-center md:items-start px-6 sm:px-10 lg:px-16 py-12">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-3/5 flex flex-col justify-center h-full"
        >
          <h1 className="text-black dark:text-white leading-tight">
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2">
              AI-Driven
            </span>
            <span className="block text-[#7A7FEE] dark:text-[#7A7FEE] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2">
              Deep-Sea eDNA
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              Analysis
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed">
            Revolutionizing marine biodiversity assessment with advanced AI
            pipelines that classify, annotate, and analyze deep-sea
            environmental DNA without relying on traditional reference
            databases.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <ContactFormButton />
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="hidden md:flex md:w-2/5 justify-end"
        >
          <Image
            src="/dna1.png"
            alt="DNA Illustration"
            width={500}
            height={500}
            className="max-w-[400px] lg:max-w-[500px] h-auto object-contain"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
