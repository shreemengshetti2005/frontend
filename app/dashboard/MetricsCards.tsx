import React from "react";

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
      icon: "🧬",
      color: "bg-gradient-to-br from-[#0D3B66] to-[#145DA0]", // Deep Blue → Ocean Blue
    },
    {
      label: "Filtered Sequences",
      value: analysisData.filteredSequences,
      icon: "🔬",
      color: "bg-gradient-to-br from-[#145DA0] to-[#2E8BC0]", // Ocean Blue → Sea Cyan
    },
    {
      label: "Taxonomic Clusters",
      value: analysisData.taxonomicClusters,
      icon: "🌊",
      color: "bg-gradient-to-br from-[#2E8BC0] to-[#00C2CB]", // Cyan → Bioluminescent Glow
    },
    {
      label: "Novel Taxa",
      value: analysisData.novelTaxa,
      icon: "✨",
      color: "bg-gradient-to-br from-[#0D3B66] to-[#2E8BC0]", // Deep Blue → Cyan
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
