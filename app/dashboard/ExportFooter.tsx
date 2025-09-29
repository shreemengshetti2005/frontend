import React from "react";

export default function ExportFooter() {
  return (
    <div className="bg-white dark:bg-[#111111] border-t border-gray-200 dark:border-gray-800 py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-4 bg-[#7A7FEE] text-white rounded-full hover:bg-[#6b6fd8] transition-all duration-200 text-lg font-semibold shadow-md">
            Export PDF
          </button>
          <button className="px-8 py-4 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 text-lg font-semibold shadow-md border border-gray-200 dark:border-gray-700">
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}
