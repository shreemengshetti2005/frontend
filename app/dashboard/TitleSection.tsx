import React from "react";

interface TitleSectionProps {
  currentDate: string;
}

export default function TitleSection({ currentDate }: TitleSectionProps) {
  return (
    <div className="text-center py-14 px-6 mt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
          <span className="text-[#7A7FEE]">eDNA</span> Biodiversity Analysis
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-medium">
          Generated on {currentDate}
        </p>
      </div>
    </div>
  );
}
