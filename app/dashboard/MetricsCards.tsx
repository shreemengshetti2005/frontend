import React from "react";
import { Dna, Microscope, Leaf, Sparkles } from "lucide-react";

interface AnalysisData {
  totalSequences: number;
  filteredSequences: number;
  taxonomicClusters: number;
  novelTaxa: number;
}

interface MetricsCardsProps {
  analysisData: AnalysisData;
}

export default function MetricsCards({ analysisData }: MetricsCardsProps) {
  const metrics = [
    {
      label: "Total Sequences",
      value: analysisData.totalSequences,
      icon: <Dna className="h-6 w-6" />,
      color: "bg-gradient-to-br from-[#7A7FEE] to-[#8B86FF]",
    },
    {
      label: "Filtered Sequences",
      value: analysisData.filteredSequences,
      icon: <Microscope className="h-6 w-6" />,
      color: "bg-gradient-to-br from-[#4ECDC4] to-[#5ED5CC]",
    },
    {
      label: "Taxonomic Clusters",
      value: analysisData.taxonomicClusters,
      icon: <Leaf className="h-6 w-6" />,
      color: "bg-gradient-to-br from-[#FF6B6B] to-[#FF7F7F]",
    },
    {
      label: "Novel Taxa",
      value: analysisData.novelTaxa,
      icon: <Sparkles className="h-6 w-6" />,
      color: "bg-gradient-to-br from-[#45B7D1] to-[#5BC3D7]",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <div key={index} className="group">
          <div
            className={`${metric.color} p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">{metric.icon}</div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {metric.value.toLocaleString()}
                </div>
                <div className="text-sm opacity-90">{metric.label}</div>
              </div>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all duration-1000"
                style={{
                  width: `${Math.min((metric.value / 6000) * 100, 100)}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
