"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/landing-page/header";
import { ArrowLeft, Dna, Microscope, BarChart3, FileText, Download, Eye, ChevronRight } from "lucide-react";

// Sample eDNA data - this would come from your analysis
const ednaData = [
  {
    id: 1,
    name: "Marine Bacteria Cluster Alpha",
    sequence: "ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG",
    confidence: 98.5,
    abundance: 1234,
    taxonomy: "Bacteria > Proteobacteria > Gammaproteobacteria",
    conservation: "High",
    novelty: "Known",
    insights: [
      "Dominant species in the sample with high abundance",
      "Well-documented marine bacteria with established taxonomy",
      "Shows high conservation priority due to ecosystem importance",
      "Common in coastal marine environments"
    ]
  },
  {
    id: 2,
    name: "Deep-sea Archaea Beta",
    sequence: "GCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAG",
    confidence: 94.2,
    abundance: 856,
    taxonomy: "Archaea > Euryarchaeota > Thermoplasmata",
    conservation: "Critical",
    novelty: "Novel",
    insights: [
      "Novel species with unique genetic markers",
      "High conservation priority due to rarity",
      "Deep-sea extremophile with potential biotechnological applications",
      "Requires immediate conservation attention"
    ]
  },
  {
    id: 3,
    name: "Planktonic Eukaryotes Gamma",
    sequence: "TAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCT",
    confidence: 96.8,
    abundance: 745,
    taxonomy: "Eukaryota > Stramenopiles > Bacillariophyta",
    conservation: "Medium",
    novelty: "Known",
    insights: [
      "Important primary producer in marine ecosystem",
      "Diatom species with significant ecological role",
      "Moderate conservation status with stable population",
      "Key indicator species for water quality assessment"
    ]
  },
  {
    id: 4,
    name: "Viral Community Delta",
    sequence: "CGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGAT",
    confidence: 89.3,
    abundance: 567,
    taxonomy: "Viruses > Caudovirales > Myoviridae",
    conservation: "High",
    novelty: "Novel",
    insights: [
      "Novel viral species with unique genetic composition",
      "High abundance suggests active viral infection",
      "Potential impact on host bacterial communities",
      "Requires further investigation for ecological significance"
    ]
  },
  {
    id: 5,
    name: "Symbiotic Bacteria Epsilon",
    sequence: "ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG",
    confidence: 97.1,
    abundance: 423,
    taxonomy: "Bacteria > Firmicutes > Bacilli",
    conservation: "Critical",
    novelty: "Rare",
    insights: [
      "Rare symbiotic bacteria with specialized functions",
      "Critical conservation status due to specialized niche",
      "Potential mutualistic relationship with host organisms",
      "Limited distribution makes it vulnerable to environmental changes"
    ]
  }
];

export default function EdnaFoundPage() {
  const [selectedEdna, setSelectedEdna] = useState(ednaData[0]);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#111111] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#7A7FEE] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Loading eDNA Results...
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-[#111111]">
      <Header />

      {/* Main Content Container */}
      <div className="min-h-screen flex flex-col">
        {/* Header Section */}
        <div className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-8 px-4">
          <div className="container mx-auto max-w-6xl">
            {/* Back Button */}
            

            {/* Title Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-6">
                Sequence <span className="text-[#7A7FEE]">Found</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto">
                Advanced eDNA analysis has identified multiple species in your sample. 
                Explore detailed insights and taxonomic classifications below.
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* eDNA List Section */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Dna className="w-5 h-5 text-[#7A7FEE]" />
                    Detected Species
                  </h2>
                  
                  <div className="space-y-3">
                    {ednaData.map((edna) => (
                      <button
                        key={edna.id}
                        onClick={() => setSelectedEdna(edna)}
                        className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                          selectedEdna.id === edna.id
                            ? "bg-[#7A7FEE]/10 dark:bg-[#7A7FEE]/20 border-2 border-[#7A7FEE]"
                            : "bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-gray-600 hover:border-[#7A7FEE]/50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                            {edna.name}
                          </h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            edna.conservation === "Critical" 
                              ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                              : edna.conservation === "High"
                              ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
                              : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                          }`}>
                            {edna.conservation}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>Confidence: {edna.confidence}%</span>
                          <span>Abundance: {edna.abundance}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Selected eDNA Details */}
              <div className="lg:col-span-2">
                <div className="bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedEdna.name}
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedEdna.novelty === "Novel" 
                          ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                          : selectedEdna.novelty === "Rare"
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
                          : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      }`}>
                        {selectedEdna.novelty}
                      </span>
                      <button className="p-2 text-gray-500 hover:text-[#7A7FEE] transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white dark:bg-[#2a2a2a] rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-2 mb-2">
                        <Microscope className="w-4 h-4 text-[#7A7FEE]" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Confidence</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {selectedEdna.confidence}%
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-[#2a2a2a] rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="w-4 h-4 text-[#7A7FEE]" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Abundance</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {selectedEdna.abundance.toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-[#2a2a2a] rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-2 mb-2">
                        <Dna className="w-4 h-4 text-[#7A7FEE]" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Sequence Length</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {selectedEdna.sequence.length}
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-[#2a2a2a] rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-[#7A7FEE]" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Conservation</span>
                      </div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {selectedEdna.conservation}
                      </div>
                    </div>
                  </div>

                  {/* Taxonomy */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Taxonomic Classification
                    </h3>
                    <div className="bg-white dark:bg-[#2a2a2a] rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                      <p className="text-gray-700 dark:text-gray-300 font-mono text-sm">
                        {selectedEdna.taxonomy}
                      </p>
                    </div>
                  </div>

                  {/* Sequence */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      DNA Sequence
                    </h3>
                    <div className="bg-white dark:bg-[#2a2a2a] rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                      <p className="text-gray-700 dark:text-gray-300 font-mono text-sm break-all">
                        {selectedEdna.sequence}
                      </p>
                    </div>
                  </div>

                  {/* Insights Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Eye className="w-5 h-5 text-[#7A7FEE]" />
                      Key Insights
                    </h3>
                    <div className="space-y-3">
                      {selectedEdna.insights.map((insight, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-white dark:bg-[#2a2a2a] rounded-xl border border-gray-200 dark:border-gray-600">
                          <ChevronRight className="w-4 h-4 text-[#7A7FEE] mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700 dark:text-gray-300 text-sm">
                            {insight}
                          </p>
                        </div>
                      ))}
                      
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => router.push("/upload")}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[#7A7FEE] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Upload
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
