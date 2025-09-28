import React from "react";

interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function NavigationTabs({
  activeTab,
  setActiveTab,
}: NavigationTabsProps) {
  const tabs = [
    { id: "overview", label: "Taxonomic Overview", icon: "📊" },
    { id: "diversity", label: "Diversity Analysis", icon: "📈" },
    { id: "timeline", label: "Temporal Trends", icon: "⏱️" },
    { id: "clusters", label: "Cluster Details", icon: "🔍" },
  ];

  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg mb-8 p-2">
      <nav className="flex space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#7A7FEE] to-[#4ECDC4] text-white shadow-lg"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
