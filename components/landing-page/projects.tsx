"use client";

import React from "react";

const reasons = [
  {
    id: 1,
    title: "Lightning Speed",
    subtitle: "Blazing Fast Performance",
    description: "Experience unprecedented speed with our optimized AI algorithms that deliver results in milliseconds, not minutes.",
    iconSvg: (
      <svg className="w-6 h-6 text-white stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "from-[#7A7FEE] to-[#9D7FEE]",
    bgPattern: "bg-gradient-to-bl",
  },
  {
    id: 2,
    title: "Precision Accuracy",
    subtitle: "99.9% Accurate Results",
    description: "Our advanced machine learning models ensure exceptional accuracy with continuous learning and refinement.",
    iconSvg: (
      <svg className="w-6 h-6 text-white stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    color: "from-[#9D7FEE] to-[#7A7FEE]",
    bgPattern: "bg-gradient-to-bl",
  },
  {
    id: 3,
    title: "Smart Visualization",
    subtitle: "Crystal Clear Insights",
    description: "Transform complex data into beautiful, interactive visuals. See insights instantly, clearly, and effortlessly.",
    iconSvg: (
      <svg className="w-6 h-6 text-white stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    color: "from-[#7A7FEE] to-[#C77FEE]",
    bgPattern: "bg-gradient-to-br",
  },
  {
    id: 4,
    title: "Instant Downloads",
    subtitle: "One-Click Export",
    description: "Download your results, reports, and data in multiple formats instantly with our seamless export system.",
    iconSvg: (
      <svg className="w-6 h-6 text-white stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="7,10 12,15 17,10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
    color: "from-[#C77FEE] to-[#7A7FEE]",
    bgPattern: "bg-gradient-to-br",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="mt-24 mb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden py-10">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7A7FEE]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7A7FEE]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header Section */}
      <div className="text-center mb-16 sm:mb-20 lg:mb-24 relative z-10">
        <div className="inline-block mb-6">
          <span className="px-4 py-2 bg-[#7A7FEE]/10 text-[#7A7FEE] dark:bg-[#7A7FEE]/20 dark:text-[#7A7FEE] text-sm font-semibold rounded-full border border-[#7A7FEE]/20 dark:border-[#7A7FEE]/30 backdrop-blur-sm">
            <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
            </svg>
            OUR ADVANTAGE
          </span>
        </div>
        
        <h2 className="text-black dark:text-white mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
          Why Choose
          <span className="block text-[#7A7FEE] dark:text-[#7A7FEE] mt-2">
            Our Platform
          </span>
        </h2>
        
        <p className="mb-8 max-w-4xl mx-auto text-gray-600 dark:text-gray-300 text-lg sm:text-xl leading-relaxed px-4">
          Experience the perfect blend of speed, accuracy, and innovation. Our AI-powered platform delivers 
          exceptional results with unmatched performance and user experience.
        </p>
        
        <div className="flex justify-center">
          <div className="w-20 sm:w-32 h-1 bg-[#7A7FEE] rounded-full"></div>
        </div>
      </div>

      {/* Reasons Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <div
              key={reason.id}
              className="group relative"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Main Card */}
              <div className="relative overflow-hidden rounded-xl p-6 lg:p-8 bg-white/95 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-300 dark:border-gray-700/50 shadow-lg dark:shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group-hover:border-[#7A7FEE]/30 group-hover:bg-white/95 dark:group-hover:bg-gray-900">
                
                {/* Subtle Background Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br from-[#7A7FEE] to-[#9D7FEE] rounded-xl"></div>

                {/* Content */}
                <div className="relative z-20 flex items-start space-x-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 ${reason.bgPattern} ${reason.color} rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                      {reason.iconSvg}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    {/* Title & Subtitle */}
                    <div className="mb-3">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-[#7A7FEE] dark:group-hover:text-[#7A7FEE] transition-colors duration-300">
                        {reason.title}
                      </h3>
                      <p className="text-sm font-medium text-[#7A7FEE] dark:text-[#7A7FEE] mt-1 opacity-80">
                        {reason.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>

                {/* Subtle Border Accent */}
                <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-[#7A7FEE]/20 transition-all duration-300 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}