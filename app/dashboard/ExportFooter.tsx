import React from "react";

export default function ExportFooter() {
  return (
    <div className="bg-white dark:bg-[#1a1a1a] border-t border-gray-200 dark:border-gray-700 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-4 bg-[#7A7FEE] text-white rounded-2xl hover:bg-[#6366f1] transition-all duration-200 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Export PDF
          </button>
          <button className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-gray-200 dark:border-gray-600">
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}
