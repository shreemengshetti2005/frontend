import React from "react";
import { AlertTriangle } from "lucide-react";

interface ClusterData {
  id: number;
  name: string;
  abundance: number;
  similarity: number;
  novelty: string;
  conservation: string;
}

interface ConservationAlertsProps {
  clusterData: ClusterData[];
}

export default function ConservationAlerts({
  clusterData,
}: ConservationAlertsProps) {
  const criticalClusters = clusterData.filter(
    (c) => c.conservation === "Critical"
  ).length;
  const novelSpecies = clusterData.filter((c) => c.novelty === "Novel").length;

  return (
    <div className="mt-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl shadow-lg p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Conservation Alerts
          </h3>
          <p className="text-white/90">
            {criticalClusters} clusters require immediate attention
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold">{novelSpecies}</div>
          <div className="text-white/90">Novel Species</div>
        </div>
      </div>
      <div className="mt-4 flex space-x-4">
        <button className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-sm font-medium">
          Generate Report
        </button>
        <button className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-sm font-medium">
          Contact Experts
        </button>
      </div>
    </div>
  );
}
