import React from "react";
import {
    CloudUpload,
    Dna,
    CheckCircle2,
    BarChart4,
    FileText,
} from "lucide-react";

const processSteps = [
    {
        id: 1,
        title: "Upload Datasets or Sequence",
        description:
            "Upload raw eDNA sequences in FASTQ/FASTA formats with automated quality control and validation",
        icon: CloudUpload,
        color: "from-[#7A7FEE] to-[#9D7FEE]",
        bgPattern: "bg-gradient-to-br",
        position: "left",
    },
    {
        id: 2,
        title: "Automated DNA Analysis",
        description:
            "AI-driven embeddings using Mamba architecture convert sequences into high-dimensional vectors for rapid similarity analysis",
        icon: Dna,
        color: "from-[#9D7FEE] to-[#7A7FEE]",
        bgPattern: "bg-gradient-to-bl",
        position: "right",
    },
    {
        id: 3,
        title: "Identify & Cluster Species",
        description:
            "Hybrid approach combines vector database searches (Milvus) with HDBSCAN clustering to identify both known and novel species groups",
        icon: CheckCircle2,
        color: "from-[#7A7FEE] to-[#C77FEE]",
        bgPattern: "bg-gradient-to-br",
        position: "left",
    },
    {
        id: 4,
        title: "Visualize Taxonomy",
        description:
            "Explore biodiversity metrics, abundance estimates, and taxonomic distributions through interactive visualizations and 3D mapping",
        icon: BarChart4,
        color: "from-[#C77FEE] to-[#7A7FEE]",
        bgPattern: "bg-gradient-to-bl",
        position: "right",
    },
    {
        id: 5,
        title: "Export Reports",
        description:
            "Generate comprehensive reports with biodiversity metrics, taxonomic annotations, and Discovery Cards for novel taxa",
        icon: FileText,
        color: "from-[#7A7FEE] to-[#9D7FEE]",
        bgPattern: "bg-gradient-to-br",
        position: "left",
    },
];

export default function DNAAnalysisProcess() {
    return (
        <section
            id="services"
            className="mt-14 mb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        >
            {/* Header Section */}
            <div className="text-center mb-12 sm:mb-16 lg:mb-20 relative z-10 py-5">
                <div className="inline-block mb-4">
          <span
              className="px-3 sm:px-4 py-2 bg-[#7A7FEE]/10 text-[#7A7FEE] dark:bg-[#7A7FEE]/20 dark:text-[#7A7FEE] text-xs sm:text-sm font-semibold rounded-full border border-[#7A7FEE]/20 dark:border-[#7A7FEE]/30">
            OUR PROCESS
          </span>
                </div>
                <h2 className="text-black dark:text-white mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                    Streamlined
                    <span
                        className="block text-[#7A7FEE] dark:text-[#7A7FEE] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-2">
            Analysis Pipeline
          </span>
                </h2>
                <p className="mb-6 sm:mb-8 max-w-4xl mx-auto text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed px-4">
                    Transform raw eDNA sequences into actionable biodiversity insights
                    through our sophisticated 5-step automated workflow, powered by
                    hybrid AI and advanced bioinformatics algorithms.
                </p>
                <div className="flex justify-center">
                    <div className="w-16 sm:w-24 h-1 bg-[#7A7FEE] dark:bg-[#7A7FEE] rounded-full"></div>
                </div>
            </div>

            {/* Process Flow */}
            <div className="max-w-7xl mx-auto relative">
                {/* Central Connection Line - Hidden on mobile, visible on desktop */}
                <div
                    className="hidden lg:block absolute left-1/2 transform -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-[#7A7FEE]/60 via-[#7A7FEE]/40 to-[#7A7FEE]/60 opacity-60"></div>

                <div className="space-y-12 sm:space-y-16 lg:space-y-24">
                    {processSteps.map((step, index) => (
                        <div key={step.id} className="relative">
                            {/* Desktop Layout */}
                            <div className="hidden lg:block">
                                <div
                                    className={`flex items-center gap-8 xl:gap-12 ${
                                        step.position === "right" ? "flex-row-reverse" : ""
                                    }`}
                                >
                                    {/* Content Card */}
                                    <div className="flex-1 max-w-lg xl:max-w-xl">
                                        <div
                                            className={`group relative overflow-hidden rounded-2xl p-6 xl:p-8 shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-2 hover:scale-105 ${step.bgPattern} ${step.color} backdrop-blur-sm border border-white/10`}
                                        >
                                            {/* Subtle Background Pattern */}
                                            <div className="absolute inset-0 opacity-5">
                                                <div
                                                    className="absolute top-8 right-8 w-20 h-20 border border-white/40 rounded-2xl rotate-12"></div>
                                                <div
                                                    className="absolute bottom-8 left-8 w-28 h-28 border border-white/30 rounded-full"></div>
                                                <div
                                                    className="absolute top-1/2 right-1/3 w-14 h-14 border border-white/25 rounded-xl rotate-45"></div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex items-start gap-4 xl:gap-6 relative z-20">
                                                <div className="flex-shrink-0">
                                                    <div
                                                        className="w-12 h-12 xl:w-14 xl:h-14 bg-white/95 backdrop-blur-lg rounded-xl flex items-center justify-center shadow-2xl border border-white/20 group-hover:scale-110 transition-all duration-500">
                                                        <step.icon
                                                            className="w-6 h-6 xl:w-7 xl:h-7 text-[#7A7FEE] stroke-2"/>
                                                    </div>
                                                </div>

                                                <div className="flex-1 pt-1">
                                                    <h3 className="text-xl xl:text-2xl font-bold text-white mb-3 leading-tight">
                                                        {step.title}
                                                    </h3>
                                                    <p className="text-white/95 text-base xl:text-lg leading-relaxed font-light">
                                                        {step.description}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Enhanced effects */}
                                            <div
                                                className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                                            <div
                                                className="absolute inset-0 rounded-2xl border-2 border-white/10 group-hover:border-white/30 transition-all duration-500"></div>
                                        </div>
                                    </div>

                                    {/* Center Connection Point - Properly positioned */}
                                    <div className="relative z-20 flex items-center justify-center">
                                        <div className="relative">
                                            <div
                                                className="w-6 h-6 xl:w-8 xl:h-8 bg-[#7A7FEE] rounded-full shadow-xl border-4 border-white dark:border-gray-900">
                                                <div
                                                    className="w-full h-full bg-[#7A7FEE] rounded-full animate-pulse"></div>
                                            </div>
                                            <div
                                                className="absolute inset-0 w-6 h-6 xl:w-8 xl:h-8 bg-[#7A7FEE] rounded-full opacity-30 animate-ping"></div>
                                        </div>
                                    </div>

                                    {/* Spacer for alignment */}
                                    <div className="flex-1 max-w-lg xl:max-w-xl"></div>
                                </div>
                            </div>

                            {/* Mobile and Tablet Layout */}
                            <div className="block lg:hidden">
                                <div className="flex flex-col items-center">
                                    {/* Content Card */}
                                    <div className="w-full max-w-md sm:max-w-lg">
                                        <div
                                            className={`group relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-2 hover:scale-105 ${step.bgPattern} ${step.color} backdrop-blur-sm border border-white/10`}
                                        >
                                            {/* Subtle Background Pattern */}
                                            <div className="absolute inset-0 opacity-5">
                                                <div
                                                    className="absolute top-4 right-4 sm:top-6 sm:right-6 w-16 sm:w-20 h-16 sm:h-20 border border-white/40 rounded-xl sm:rounded-2xl rotate-12"></div>
                                                <div
                                                    className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-20 sm:w-24 h-20 sm:h-24 border border-white/30 rounded-full"></div>
                                                <div
                                                    className="absolute top-1/2 right-1/4 w-10 sm:w-12 h-10 sm:h-12 border border-white/25 rounded-lg rotate-45"></div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex items-start gap-3 sm:gap-4 relative z-20">
                                                <div className="flex-shrink-0">
                                                    <div
                                                        className="w-10 h-10 sm:w-12 sm:h-12 bg-white/95 backdrop-blur-lg rounded-lg sm:rounded-xl flex items-center justify-center shadow-2xl border border-white/20 group-hover:scale-110 transition-all duration-500">
                                                        <step.icon
                                                            className="w-5 h-5 sm:w-6 sm:h-6 text-[#7A7FEE] stroke-2"/>
                                                    </div>
                                                </div>

                                                <div className="flex-1 pt-1">
                                                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                                                        {step.title}
                                                    </h3>
                                                    <p className="text-white/95 text-sm sm:text-base leading-relaxed font-light">
                                                        {step.description}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Enhanced effects */}
                                            <div
                                                className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                                            <div
                                                className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-white/10 group-hover:border-white/30 transition-all duration-500"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Connection Arrow */}
                            {index < processSteps.length - 1 && (
                                <div className="lg:hidden flex justify-center my-8 sm:my-10">
                                    <div className="flex flex-col items-center space-y-1 sm:space-y-2">
                                        <div
                                            className="w-px h-8 sm:h-10 bg-gradient-to-b from-[#7A7FEE]/60 to-[#7A7FEE]/40 opacity-60"></div>
                                        <div
                                            className="w-4 h-4 sm:w-5 sm:h-5 bg-[#7A7FEE] rounded-full shadow-lg border-2 border-white dark:border-gray-900">
                                            <div
                                                className="w-full h-full bg-[#7A7FEE] rounded-full animate-bounce"></div>
                                        </div>
                                        <div
                                            className="w-px h-8 sm:h-10 bg-gradient-to-b from-[#7A7FEE]/40 to-[#7A7FEE]/60 opacity-60"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}