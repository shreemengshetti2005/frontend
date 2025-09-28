import React from "react";

export default function FooterStats() {
  const stats = [
    {
      label: "Processing Time",
      value: "2.3 hours",
      icon: "⏱️",
      trend: "-15% faster",
    },
    {
      label: "Data Quality",
      value: "98.5%",
      icon: "✅",
      trend: "+2.1% improved",
    },
    { label: "Rare Species", value: "12", icon: "🦋", trend: "+3 discovered" },
    { label: "Confidence", value: "94.2%", icon: "🎯", trend: "+1.8% higher" },
  ];

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{stat.icon}</span>
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
              {stat.trend}
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {stat.value}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
