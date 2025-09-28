"use client"

import React from 'react';
import { mockPapers } from './data';

export default function RecentPapersSection() {
    // Get first 4 papers for the 2x2 grid
    const recentPapers = mockPapers.slice(0, 4);

    return (
        <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-[#111111]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-3 sm:mb-4">
                        Recent <span className="text-[#7A7FEE]">Publications</span>
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Stay updated with the latest research in deep-sea biology and environmental DNA analysis
                    </p>
                </div>

                {/* Papers Grid - 2x2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
                    {recentPapers.map((paper) => (
                        <div
                            key={paper.id}
                            className="bg-gray-200 dark:bg-[#1a1a1a] rounded-2xl p-4 sm:p-6 border border-gray-100 dark:border-gray-800 hover:border-[#7A7FEE] transition-all duration-200 hover:shadow-lg"
                        >
                            {/* Paper Content */}
                            <div className="space-y-3 sm:space-y-4">
                                {/* Title */}
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black dark:text-white leading-tight line-clamp-2">
                                    {paper.title}
                                </h3>

                                {/* Authors */}
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <p className="text-sm lg:text-base truncate">
                                        {paper.authors.join(', ')}
                                    </p>
                                </div>

                                {/* Action Button */}
                                <div className="pt-2">
                                    <a
                                        href={paper.publicationUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 w-full bg-[#7A7FEE] hover:bg-[#6366f1] text-white px-4 py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-200"
                                    >
                                        <span>Go to Publication</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Papers Button */}
                <div className="text-center mt-8 sm:mt-12">
                    <a
                        href="/literature-search"
                        className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white dark:bg-[#1a1a1a] border-2 border-[#7A7FEE] text-[#7A7FEE] hover:bg-[#7A7FEE] hover:text-white rounded-xl font-medium text-sm sm:text-base transition-all duration-200"
                    >
                        <span>Explore All Publications</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}