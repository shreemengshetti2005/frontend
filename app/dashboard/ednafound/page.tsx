"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Dna, Microscope, BarChart3, FileText, Download, Eye, ChevronRight, Sparkles, TrendingUp, AlertTriangle, Star, Copy, ExternalLink, Zap } from "lucide-react";
import Header from "@/components/landing-page/header";


// Sample eDNA data - enhanced with more visual elements
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
    color: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 to-cyan-900/20",
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
    color: "from-red-500 to-pink-500",
    bgGradient: "from-red-50 to-pink-50 dark:from-red-900/20 to-pink-900/20",
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
    color: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 to-emerald-900/20",
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
    color: "from-purple-500 to-violet-500",
    bgGradient: "from-purple-50 to-violet-50 dark:from-purple-900/20 to-violet-900/20",
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
    color: "from-orange-500 to-yellow-500",
    bgGradient: "from-orange-50 to-yellow-50 dark:from-orange-900/20 to-yellow-900/20",
    insights: [
      "Rare symbiotic bacteria with specialized functions",
      "Critical conservation status due to specialized niche",
      "Potential mutualistic relationship with host organisms",
      "Limited distribution makes it vulnerable to environmental changes"
    ]
  }
];

export default function EnhancedEdnaFoundPage() {
  const [selectedEdna, setSelectedEdna] = useState(ednaData[0]);
  const [isClient, setIsClient] = useState(false);
  const [copiedSequence, setCopiedSequence] = useState(false);
  const [animatingCard, setAnimatingCard] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCopySequence = () => {
    navigator.clipboard.writeText(selectedEdna.sequence);
    setCopiedSequence(true);
    setTimeout(() => setCopiedSequence(false), 2000);
  };

  const handleSpeciesSelect = (edna) => {
    setAnimatingCard(edna.id);
    setTimeout(() => {
      setSelectedEdna(edna);
      setAnimatingCard(null);
    }, 150);
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-200 dark:border-purple-700 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
          </div>
          <div className="mt-8 text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Analyzing eDNA Sequences...
          </div>
          <div className="mt-2 text-gray-500 dark:text-gray-400">
            Unlocking biodiversity insights
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <Header />
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative min-h-screen flex flex-col">
        {/* Header Section with enhanced styling */}
        <div className="pt-12 pb-8 px-4">
          <div className="container mx-auto max-w-7xl">
            {/* Back Button with hover effect */}
            <button className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-white bg-white/80 dark:bg-gray-800/80 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 rounded-full backdrop-blur-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg mb-8">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Upload
            </button>

            {/* Enhanced Title Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full text-sm font-medium text-purple-700 dark:text-purple-300 mb-6">
                <Sparkles className="w-4 h-4" />
                Analysis Complete
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 dark:from-gray-100 dark:via-purple-100 dark:to-gray-100 bg-clip-text text-transparent">
                  Sequences <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Discovered
                </span>
               </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
                Advanced eDNA analysis has uncovered <span className="font-semibold text-purple-600 dark:text-purple-400">{ednaData.length} unique species</span> in your sample. 
                Explore detailed taxonomic insights and conservation data below.
              </p>
            </div>

            {/* Enhanced Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Species List Section - Enhanced */}
              <div className="xl:col-span-1">
                <div className="sticky top-8">
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                        <Dna className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                          Detected Species
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {ednaData.length} unique sequences
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {ednaData.map((edna, index) => (
                        <button
                          key={edna.id}
                          onClick={() => handleSpeciesSelect(edna)}
                          className={`w-full text-left p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg group ${
                            selectedEdna.id === edna.id
                              ? `bg-gradient-to-r ${edna.bgGradient} border-2 border-current shadow-lg scale-105`
                              : "bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500"
                          } ${animatingCard === edna.id ? 'scale-95' : ''}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${edna.color} mt-2 shadow-lg`}></div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                                  {edna.name}
                                </h3>
                                {edna.novelty === "Novel" && (
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 text-yellow-500" />
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
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
                                <span className="font-medium">{edna.confidence}% match</span>
                                <span>{edna.abundance.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Species Details - Enhanced */}
              <div className="xl:col-span-3">
                <div className="space-y-8">
                  {/* Header Card */}
                  <div className={`bg-gradient-to-r ${selectedEdna.bgGradient} backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl`}>
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${selectedEdna.color} flex items-center justify-center shadow-lg`}>
                          <Dna className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {selectedEdna.name}
                          </h2>
                          <p className="text-gray-600 dark:text-gray-300 text-lg">
                            {selectedEdna.taxonomy.split(' > ').slice(0, 2).join(' → ')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                          selectedEdna.novelty === "Novel" 
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                            : selectedEdna.novelty === "Rare"
                            ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                            : "bg-gradient-to-r from-blue-400 to-cyan-500 text-white"
                        }`}>
                          {selectedEdna.novelty === "Novel" && <Sparkles className="inline w-4 h-4 mr-1" />}
                          {selectedEdna.novelty === "Rare" && <AlertTriangle className="inline w-4 h-4 mr-1" />}
                          {selectedEdna.novelty}
                        </span>
                        <button className="p-3 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Enhanced Key Metrics */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl">
                            <TrendingUp className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-sm font-bold text-gray-600 dark:text-gray-400">Confidence</span>
                        </div>
                        <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                          {selectedEdna.confidence}%
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${selectedEdna.confidence}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl">
                            <BarChart3 className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-sm font-bold text-gray-600 dark:text-gray-400">Abundance</span>
                        </div>
                        <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          {selectedEdna.abundance.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl">
                            <Dna className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-sm font-bold text-gray-600 dark:text-gray-400">Sequence</span>
                        </div>
                        <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                          {selectedEdna.sequence.length}bp
                        </div>
                      </div>
                      
                      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`p-2 rounded-xl ${
                            selectedEdna.conservation === "Critical" 
                              ? "bg-gradient-to-r from-red-400 to-red-600"
                              : selectedEdna.conservation === "High"
                              ? "bg-gradient-to-r from-orange-400 to-red-500"
                              : "bg-gradient-to-r from-green-400 to-green-600"
                          }`}>
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-sm font-bold text-gray-600 dark:text-gray-400">Priority</span>
                        </div>
                        <div className={`text-2xl font-bold ${
                          selectedEdna.conservation === "Critical" 
                            ? "bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent"
                            : selectedEdna.conservation === "High"
                            ? "bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
                            : "bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent"
                        }`}>
                          {selectedEdna.conservation}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Taxonomy Card */}
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
                          <Microscope className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          Taxonomic Classification
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {selectedEdna.taxonomy.split(' > ').map((level, index, array) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedEdna.color}`}></div>
                            <span className={`${index === array.length - 1 ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                              {level}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sequence Card */}
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl">
                            <Dna className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            DNA Sequence
                          </h3>
                        </div>
                        <button
                          onClick={handleCopySequence}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white rounded-xl transition-all duration-300 text-sm font-medium"
                        >
                          <Copy className="w-4 h-4" />
                          {copiedSequence ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-4 font-mono text-sm text-gray-700 dark:text-gray-300 break-all leading-relaxed border">
                        {selectedEdna.sequence}
                      </div>
                    </div>
                  </div>

                  {/* Insights Section */}
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Key Insights
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Scientific analysis and conservation implications
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedEdna.insights.map((insight, index) => (
                        <div key={index} className="group bg-gradient-to-r from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-800/50 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-600/50 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg group-hover:from-purple-500 group-hover:to-blue-500 transition-all duration-300">
                              <Zap className="w-4 h-4 text-white" />
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {insight}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                        <FileText className="w-5 h-5" />
                        Generate Report
                      </button>
                      <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-2xl font-bold border border-gray-200 dark:border-gray-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                        <ExternalLink className="w-5 h-5" />
                        View Database
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}