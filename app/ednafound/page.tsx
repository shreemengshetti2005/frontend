"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/landing-page/header";
import { ArrowLeft, Dna, Microscope, Download, Eye, ChevronRight, ChevronDown, Database, FlaskConical } from "lucide-react";
import { speciesData } from "./data";
import type { SpeciesData } from "./data";

export default function EdnaFoundPage() {
    const [selectedEdna, setSelectedEdna] = useState(speciesData[0]);
    const [isClient, setIsClient] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const toggleDropdown = (heading: string) => {
        setOpenDropdowns(prev => ({
            ...prev,
            [heading]: !prev[heading]
        }));
    };

    // Define the seven headings for insights
    const insightHeadings = [
        "Morphological / genetic basis",
        "Hosts / habitat",
        "Disease impact",
        "Environmental role",
        "Detection / identification challenges",
        "Genomic / evolutionary significance",
        "Applied / control potential"
    ];

    if (!isClient) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-[#111111] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-3 border-[#7A7FEE] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <div className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        Loading Results...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-[#111111]">
            <Header />

            <div className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
                            eDNA <span className="text-[#7A7FEE]">Analysis</span>
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {speciesData.length} species detected in your sample
                        </p>
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                        {/* Left Column - Species List + Back Button */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Species List */}
                            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-300 dark:border-gray-600 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Dna className="w-5 h-5 text-[#7A7FEE]" />
                                    Detected Species
                                </h2>

                                <div className="space-y-3">
                                    {speciesData.map((edna: SpeciesData, index: number) => (
                                        <button
                                            key={edna.id}
                                            onClick={() => setSelectedEdna(edna)}
                                            className={`w-full text-left p-4 rounded-2xl transition-all duration-200 ${
                                                selectedEdna.id === edna.id
                                                    ? "bg-[#7A7FEE]/10 dark:bg-[#7A7FEE]/20 border border-[#7A7FEE] shadow-sm"
                                                    : "bg-gray-50 dark:bg-[#2a2a2a] border border-transparent hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-sm"
                                            }`}
                                        >
                                            <div className="mb-2">
                                                <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                                                    {edna.name}
                                                </h3>
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                                <span>{edna.confidence}% confidence</span>
                                                <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">#{index + 1}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Back Button */}
                            <button
                                onClick={() => router.push("/upload")}
                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[#7A7FEE] bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-300 dark:border-gray-600 hover:border-[#7A7FEE] transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Upload
                            </button>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-300 dark:border-gray-600">

                                {/* Species Header */}
                                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {selectedEdna.name}
                                            </h2>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                ID: {selectedEdna.id}
                                            </p>
                                        </div>
                                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#7A7FEE]/10 dark:bg-[#7A7FEE]/20 text-[#7A7FEE] hover:bg-[#7A7FEE]/20 dark:hover:bg-[#7A7FEE]/30 rounded-2xl transition-colors duration-200">
                                            <Download className="w-4 h-4" />
                                            Download as PDF
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6 space-y-8">

                                    {/* Key Metrics */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                            Analysis Summary
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="bg-gray-50 dark:bg-[#2a2a2a] rounded-2xl p-4 border border-gray-200 dark:border-gray-600">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Microscope className="w-4 h-4 text-[#7A7FEE]" />
                                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Confidence Score
                          </span>
                                                </div>
                                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                                    {selectedEdna.confidence}%
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 dark:bg-[#2a2a2a] rounded-2xl p-4 border border-gray-200 dark:border-gray-600">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Dna className="w-4 h-4 text-[#7A7FEE]" />
                                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Sequence Length
                          </span>
                                                </div>
                                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                                    {selectedEdna.sequence.length} bp
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Taxonomic Classification */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                            <Database className="w-5 h-5 text-[#7A7FEE]" />
                                            Taxonomic Classification
                                        </h3>
                                        <div className="bg-gray-50 dark:bg-[#2a2a2a] rounded-2xl p-5 border border-gray-200 dark:border-gray-600">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {Object.entries(selectedEdna.taxonomy).map(([key, value]) => (
                                                    <div key={key} className="flex justify-between items-center py-3 px-4 rounded-xl bg-white/50 dark:bg-[#1a1a1a]/50">
                                                        <span className="text-gray-600 dark:text-gray-400 capitalize font-medium text-sm">
                                                            {key}
                                                        </span>
                                                        <span className="text-gray-900 dark:text-white font-mono text-sm font-semibold">
                                                            {String(value)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* DNA Sequence */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                            <FlaskConical className="w-5 h-5 text-[#7A7FEE]" />
                                            DNA Sequence
                                        </h3>
                                        <div className="bg-gray-50 dark:bg-[#2a2a2a] rounded-2xl p-4 border border-gray-200 dark:border-gray-600">
                                            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl p-4 border-t border-gray-200 dark:border-gray-600 max-h-32 overflow-auto">
                                                <p className="text-gray-700 dark:text-gray-300 font-mono text-sm break-all leading-relaxed">
                                                    {selectedEdna.sequence}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Scientific Insights */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                            <Eye className="w-5 h-5 text-[#7A7FEE]" />
                                            Scientific Insights
                                        </h3>
                                        <div className="space-y-3">
                                            {insightHeadings.map((heading, index) => (
                                                <div key={heading} className="border border-gray-200 dark:border-gray-600 rounded-2xl overflow-hidden">
                                                    <button
                                                        onClick={() => toggleDropdown(heading)}
                                                        className="w-full flex items-center justify-between p-4 text-left bg-gray-50 dark:bg-[#2a2a2a] hover:bg-gray-100 dark:hover:bg-[#333333] transition-colors duration-200"
                                                    >
                            <span className="font-medium text-gray-900 dark:text-white">
                              {heading}
                            </span>
                                                        {openDropdowns[heading] ? (
                                                            <ChevronDown className="w-4 h-4 text-[#7A7FEE]" />
                                                        ) : (
                                                            <ChevronRight className="w-4 h-4 text-gray-400" />
                                                        )}
                                                    </button>

                                                    {openDropdowns[heading] && (
                                                        <div className="p-4 bg-white dark:bg-[#1a1a1a] border-t border-gray-200 dark:border-gray-600">
                                                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                                                {selectedEdna.insights[index] || "Information not available for this category."}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}