import React from "react";

interface TitleSectionProps {
  currentDate: string;
}

export default function TitleSection({ currentDate }: TitleSectionProps) {
  return (
    <div className="text-center py-16 px-6 mt-20">
      <div className="max-w-4xl mx-auto">
        {/* Main Title */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-[#7A7FEE] via-[#4ECDC4] to-[#7A7FEE] bg-clip-text text-transparent">
            eDNA Biodiversity Analysis
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 font-medium">
          Generated on {currentDate}
        </p>
      </div>
    </div>
  );
}
