"use client"

import React, { useState, useEffect } from 'react';
import Header from "@/components/landing-page/header";
import RecentPapersSection from './recent';
import { mockPapers, searchSuggestions, type Paper } from './data';

export default function LiteratureSearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchResults, setSearchResults] = useState<Paper[]>([]);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        if (searchQuery.length > 0) {
            const filtered = searchSuggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredSuggestions(filtered.slice(0, 5));
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }, [searchQuery]);

    const handleSearch = (query?: string) => {
        const searchTerm = query || searchQuery;
        if (searchTerm.trim() === '') return;

        const results = mockPapers.filter(paper =>
            paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            paper.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
            paper.keywords.some(keyword =>
                keyword.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

        setSearchResults(results);
        setHasSearched(true);
        setShowSuggestions(false);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setSearchQuery(suggestion);
        setShowSuggestions(false);
        handleSearch(suggestion);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleGetAISummary = (paperId: string) => {
        console.log('Getting AI summary for paper:', paperId);
    };

    return (
        <main className="min-h-screen bg-white dark:bg-[#111111]">
            <Header />
            <div className="pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header - Centered and moved down */}
                    <div className="text-center mb-20 pt-16">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-6">
                            Literature <span className="text-[#7A7FEE]">Search</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-16">
                            Discover research papers in marine biology, environmental DNA, and deep-sea ecology
                        </p>

                        {/* Centered Search Bar */}
                        <div className="max-w-2xl mx-auto relative">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Search for papers, topics, or keywords..."
                                    className="w-full px-6 py-4 pr-16 text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7A7FEE] focus:border-transparent transition-all duration-200 shadow-lg"
                                />
                                <button
                                    onClick={() => handleSearch()}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 bg-[#7A7FEE] hover:bg-[#6366f1] rounded-xl transition-colors duration-200"
                                >
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Search Suggestions */}
                            {showSuggestions && filteredSuggestions.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-10">
                                    {filteredSuggestions.map((suggestion, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            className="w-full px-6 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#2a2a2a] transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Search Results */}
                    {hasSearched && (
                        <div className="max-w-6xl mx-auto">
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-black dark:text-white">
                                    Search Results
                                    <span className="ml-3 text-lg text-gray-500 dark:text-gray-400">
                    ({searchResults.length} papers found)
                  </span>
                                </h2>
                            </div>

                            {searchResults.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 mb-4">
                                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-xl text-gray-500 dark:text-gray-400">No papers found</p>
                                    <p className="text-gray-400 dark:text-gray-500 mt-2">Try different keywords</p>
                                </div>
                            ) : (
                                <div className="grid gap-6">
                                    {searchResults.map((paper) => (
                                        <div
                                            key={paper.id}
                                            className="bg-gray-200 dark:bg-[#1a1a1a] rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:border-[#7A7FEE] transition-all duration-200 hover:shadow-lg"
                                        >
                                            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                                                {/* Paper Info */}
                                                <div className="flex-1">
                                                    <h3 className="text-xl lg:text-2xl font-bold text-black dark:text-white mb-3 leading-tight">
                                                        {paper.title}
                                                    </h3>

                                                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                                                        <div className="flex items-center gap-1">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                            <span>{paper.authors.join(', ')}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                            </svg>
                                                            <span>{paper.journal}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                            <span>{paper.year}</span>
                                                        </div>
                                                    </div>

                                                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                                                        {paper.abstract}
                                                    </p>

                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {paper.keywords.map((keyword, index) => (
                                                            <span
                                                                key={index}
                                                                className="px-3 py-1 bg-[#7A7FEE]/10 text-[#7A7FEE] rounded-full text-sm font-medium"
                                                            >
                                {keyword}
                              </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex flex-col gap-3 lg:w-48">
                                                    <a
                                                        href={paper.publicationUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn-primary text-center px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                        Go to Publication
                                                    </a>

                                                    <button
                                                        onClick={() => handleGetAISummary(paper.id)}
                                                        className="bg-white dark:bg-[#111111] border-2 border-[#7A7FEE] text-[#7A7FEE] hover:bg-[#7A7FEE] hover:text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                        </svg>
                                                        Get AI Summary
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="text-center mt-8 sm:mt-12">
                                <a
                                    className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white dark:bg-[#1a1a1a] border-2 border-[#7A7FEE] text-[#7A7FEE] hover:bg-[#7A7FEE] hover:text-white rounded-xl font-medium text-sm sm:text-base transition-all duration-200"
                                >
                                    <span>More Results</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Popular Topics and Recent Publications */}
                    {!hasSearched && (
                        <>
                            {/* Popular Topics */}
                            <div className="max-w-4xl mx-auto text-center mb-24">
                                <h3 className="text-2xl font-semibold text-black dark:text-white mb-8">
                                    Popular Search Topics
                                </h3>
                                <div className="flex flex-wrap justify-center gap-3 mb-16">
                                    {searchSuggestions.slice(0, 6).map((suggestion, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            className="px-4 py-2 bg-gray-100 dark:bg-[#1a1a1a] hover:bg-[#7A7FEE] hover:text-white text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-200 text-sm font-medium"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>

                                {/* Down Arrow with Text */}
                                <div className="flex flex-col items-center mb-16 pt-20">
                                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">Recent Publications</p>
                                    <div className="animate-bounce">
                                        <svg className="w-6 h-6 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Papers Section */}
                            <RecentPapersSection />
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}