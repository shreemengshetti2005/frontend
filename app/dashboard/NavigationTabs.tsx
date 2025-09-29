import React from "react";
import { motion } from "framer-motion";
import {
    BarChart3,
    LineChart,
    Clock3,
    Layers3,
    Dna,
    TreePine
} from "lucide-react";

interface NavigationTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export default function NavigationTabs({
                                           activeTab,
                                           setActiveTab,
                                       }: NavigationTabsProps) {
    const tabs = [
        { id: "overview", label: "Taxonomic Overview", Icon: BarChart3 },
        { id: "diversity", label: "Diversity Analysis", Icon: LineChart },
        { id: "timeline", label: "Temporal Trends", Icon: Clock3 },
        { id: "clusters", label: "Cluster Details", Icon: Layers3 },
        { id: "novel", label: "Predicted Traits", Icon: Dna },
        { id: "phylo", label: "Phylogenetic Tree", Icon: TreePine },
    ];

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const currentIndex = tabs.findIndex(t => t.id === activeTab);
        if (e.key === "ArrowRight") {
            const next = (currentIndex + 1) % tabs.length;
            setActiveTab(tabs[next].id);
        } else if (e.key === "ArrowLeft") {
            const prev = (currentIndex - 1 + tabs.length) % tabs.length;
            setActiveTab(tabs[prev].id);
        }
    };

    return (
        <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl shadow-md border border-gray-200 dark:border-gray-800 mb-8 p-2">
            <nav
                className="relative p-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 auto-rows-fr sm:auto-rows-auto overflow-x-visible"
                role="tablist"
                aria-label="Dashboard sections"
                onKeyDown={handleKeyDown}
            >
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const { Icon } = tab;
                    return (
                        <button
                            key={tab.id}
                            role="tab"
                            aria-selected={isActive}
                            tabIndex={isActive ? 0 : -1}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative w-full justify-center flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A7FEE] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#1a1a1a] ${
                                isActive
                                    ? "text-white"
                                    : "text-gray-700 dark:text-gray-300 hover:text-[#7A7FEE] hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTabPill"
                                    className="absolute inset-0 rounded-full bg-[#7A7FEE] shadow-md"
                                    transition={{ type: "spring", stiffness: 500, damping: 40, mass: 0.6 }}
                                />
                            )}
                            <span className="relative z-10 inline-flex items-center gap-2">
                                <Icon className="h-4 w-4" />
                                <span>{tab.label}</span>
                            </span>
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}
