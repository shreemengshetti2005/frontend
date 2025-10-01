"use client"

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronRight, Mail, ArrowLeft, Share2, BookOpen, Plus } from 'lucide-react';
import { blogPosts, BlogPost } from './data';
import Header from "@/components/landing-page/header";

export default function BlogPage() {
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [isClient, setIsClient] = useState(false);
    const [email, setEmail] = useState("");
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const featuredPosts = blogPosts.filter(post => post.featured);
    const displayedPosts = showMore ? blogPosts.slice(1) : blogPosts.slice(1, 5);

    const handleSubscribe = () => {
        if (email) {
            console.log("Newsletter subscription:", email);
            setEmail("");
            alert("Thank you for subscribing to our newsletter!");
        }
    };

    if (selectedPost) {
        return (
            <div>
                <Header />
                <div className="min-h-screen bg-white dark:bg-[#111111] pt-20">
                    <div className="max-w-6xl mx-auto px-4 py-8">
                        <button
                            onClick={() => setSelectedPost(null)}
                            className="flex items-center gap-2 text-[#7A7FEE] hover:text-[#6366f1] mb-8 transition-colors group"
                        >
                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Back to insights
                        </button>

                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                                <span className="px-4 py-2 bg-[#7A7FEE]/10 text-[#7A7FEE] rounded-full font-medium">
                                    {selectedPost.category}
                                </span>
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {isClient ? new Date(selectedPost.publishedAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }) : selectedPost.publishedAt}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {selectedPost.readTime}
                                </div>
                            </div>

                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                                {selectedPost.title}
                            </h1>

                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={selectedPost.author.avatar}
                                        alt={selectedPost.author.name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                                    />
                                    <div>
                                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {selectedPost.author.name}
                                        </div>
                                        <div className="text-gray-600 dark:text-gray-400">
                                            {selectedPost.author.role}
                                        </div>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 text-[#7A7FEE] hover:bg-[#7A7FEE]/10 rounded-full transition-colors">
                                    <Share2 className="h-4 w-4" />
                                    Share
                                </button>
                            </div>

                            <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src={selectedPost.image}
                                    alt={selectedPost.title}
                                    className="w-full h-64 md:h-[500px] object-cover"
                                />
                            </div>

                            <div className="prose prose-xl max-w-none">
                                <div
                                    className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:dark:text-white [&>h2]:mb-6 [&>h2]:mt-12 [&>p]:mb-8 [&>p]:text-lg [&>p]:leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                                />
                            </div>

                            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Topics</h3>
                                <div className="flex flex-wrap gap-3">
                                    {selectedPost.tags.map((tag: string, index: number) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-gradient-to-r from-[#7A7FEE]/10 to-[#7A7FEE]/5 text-[#7A7FEE] rounded-full text-sm font-medium border border-[#7A7FEE]/20 hover:border-[#7A7FEE]/40 transition-colors cursor-pointer"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className="min-h-screen bg-white dark:bg-[#111111]">
                <div className="relative pt-20 pb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7A7FEE]/3 via-transparent to-[#7A7FEE]/2"></div>
                    <div className="relative max-w-7xl mx-auto px-4 py-8">
                        <div className="text-center max-w-4xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-3 py-2 bg-[#7A7FEE]/10 text-[#7A7FEE] rounded-full text-sm font-medium mb-4">
                                <BookOpen className="h-4 w-4" />
                                Marine Research & Deep Sea Discovery
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                                Deep Ocean
                                <span className="text-[#7A7FEE] bg-gradient-to-r from-[#7A7FEE] to-[#6366f1] bg-clip-text text-transparent"> Biodiversity</span>
                            </h1>
                            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
                                Exploring marine ecosystems through environmental DNA and AI-driven analysis
                            </p>
                        </div>
                    </div>
                </div>

                {featuredPosts.length > 0 && (
                    <div className="max-w-7xl mx-auto px-4 pb-12">
                        <div className="relative">
                            <div
                                className="relative h-[450px] md:h-[500px] rounded-2xl overflow-hidden cursor-pointer group shadow-2xl"
                                onClick={() => setSelectedPost(featuredPosts[0])}
                            >
                                <img
                                    src={featuredPosts[0].image}
                                    alt={featuredPosts[0].title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                                    <div className="max-w-4xl">
                                        <span className="inline-block px-4 py-2 bg-[#7A7FEE] text-white rounded-full text-sm font-semibold mb-4">
                                            Featured Research
                                        </span>
                                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                            {featuredPosts[0].title}
                                        </h2>
                                        <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed max-w-3xl">
                                            {featuredPosts[0].excerpt}
                                        </p>
                                        <div className="flex items-center gap-6 text-gray-300">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={featuredPosts[0].author.avatar}
                                                    alt={featuredPosts[0].author.name}
                                                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white/30"
                                                />
                                                <div>
                                                    <span className="font-semibold text-white">{featuredPosts[0].author.name}</span>
                                                    <div className="text-sm text-gray-300">{featuredPosts[0].author.role}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    {featuredPosts[0].readTime}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    {isClient ? new Date(featuredPosts[0].publishedAt).toLocaleDateString() : featuredPosts[0].publishedAt}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Latest Research Articles
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Discover cutting-edge marine research and deep-sea biodiversity studies
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {displayedPosts.map((post) => (
                            <div
                                key={post.id}
                                className="group cursor-pointer"
                                onClick={() => setSelectedPost(post)}
                            >
                                <div className="bg-white dark:bg-[#1a1a1a] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-800 h-full">
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-2 bg-[#7A7FEE]/95 text-white rounded-lg text-sm font-semibold backdrop-blur-sm shadow-lg">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                {post.readTime}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                {isClient ? new Date(post.publishedAt).toLocaleDateString() : post.publishedAt}
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#7A7FEE] transition-colors leading-tight">
                                            {post.title}
                                        </h3>

                                        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={post.author.avatar}
                                                    alt={post.author.name}
                                                    className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                                                />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {post.author.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                        {post.author.role}
                                                    </div>
                                                </div>
                                            </div>
                                            <ChevronRight className="h-6 w-6 text-[#7A7FEE] group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {!showMore && blogPosts.length > 5 && (
                        <div className="text-center mt-16">
                            <button
                                onClick={() => setShowMore(true)}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#7A7FEE] to-[#6366f1] text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-[#7A7FEE]/25 transition-all duration-300 transform hover:scale-105"
                            >
                                <Plus className="h-5 w-5" />
                                Explore More Research
                            </button>
                        </div>
                    )}
                </div>


                <div className="py-20 bg-white dark:bg-[#111111]">
                    {/* <div className="absolute inset-0 bg-gradient-to-br from-[#7A7FEE]/5 via-transparent to-[#6366f1]/5"></div> */}
                    <div className="relative max-w-4xl mx-auto px-4 text-center">
                        <div className="bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-2xl rounded-3xl p-12 shadow-2xl border border-gray-200/50 dark:border-gray-800/50">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#7A7FEE] to-[#6366f1] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <Mail className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                Stay Informed on <span className="text-[#7A7FEE]">Marine Research</span>
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                                Get exclusive insights on deep-sea biodiversity research, eDNA analysis breakthroughs, and marine ecosystem discoveries delivered to your inbox.
                            </p>
                            <div className="max-w-md mx-auto">
                                <div className="flex gap-4">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111111] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-[#7A7FEE] focus:ring-2 focus:ring-[#7A7FEE]/20 transition-all"
                                    />
                                    <button
                                        onClick={handleSubscribe}
                                        className="px-8 py-4 bg-gradient-to-r from-[#7A7FEE] to-[#6366f1] text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-[#7A7FEE]/25 transition-all duration-300 transform hover:scale-105"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                                    Join 5+ marine researchers and conservationists. Unsubscribe anytime.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}