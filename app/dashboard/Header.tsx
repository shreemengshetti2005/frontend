import React from "react";

interface HeaderProps {
  currentDate: string;
}

export default function Header({ currentDate }: HeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#111111]/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#7A7FEE] to-[#4ECDC4] bg-clip-text text-transparent">
              eDNA Biodiversity Analysis
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Deep-sea analysis • Generated on {currentDate}
            </p>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-[#7A7FEE] text-white rounded-lg hover:bg-[#6366f1] transition-colors text-sm font-medium">
              Export PDF
            </button>
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
              Export CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
