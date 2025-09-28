import React from "react";

interface NovelSpeciesBannerProps {
  isClient: boolean;
}

export default function NovelSpeciesBanner({ isClient }: NovelSpeciesBannerProps) {
  if (!isClient) {
    return <div>Loading novel species analysis...</div>;
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#7A7FEE] via-purple-600 to-[#4ECDC4] rounded-3xl shadow-2xl mb-8 border border-[#7A7FEE]/20">
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-500"></div>
      
      {/* Main Content */}
      <div className="relative z-10 p-8">
        <div className="flex items-center space-x-6">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
            <span className="text-3xl">🧬</span>
          </div>
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-white mb-3">
              Novel Species
            </h2>
            <p className="text-white/90 text-lg">
              The sequence you entered represents a novel species that has not been previously documented in our database.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
