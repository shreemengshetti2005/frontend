import React from "react";

interface HeaderProps {
  currentDate: string;
}

export default function Header({ currentDate }: HeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#111111]/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              <span className="text-[#7A7FEE]">eDNA</span> Biodiversity Analysis
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Deep-sea analysis • Generated on {currentDate}
            </p>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-[#7A7FEE] text-white rounded-full hover:bg-[#6b6fd8] transition-colors text-sm font-medium">
              Export PDF
            </button>
            <button className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium border border-gray-200 dark:border-gray-700">
              Export CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
