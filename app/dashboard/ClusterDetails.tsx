import React from "react";

interface ClusterData {
  id: number;
  name: string;
  abundance: number;
  similarity: number;
  novelty: string;
  conservation: string;
}

interface ClusterDetailsProps {
  isClient: boolean;
  clusterData: ClusterData[];
  selectedCluster: ClusterData | null;
  setSelectedCluster: (cluster: ClusterData | null) => void;
}

export default function ClusterDetails({
  isClient,
  clusterData,
  selectedCluster,
  setSelectedCluster,
}: ClusterDetailsProps) {
  if (!isClient) {
    return <div>Loading cluster details...</div>;
  }

  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
        <span className="mr-2">🔍</span>
        Detailed Cluster Analysis
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                Cluster
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                Abundance
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                Similarity
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                Status
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                Priority
              </th>
            </tr>
          </thead>
          <tbody>
            {clusterData.map((cluster, index) => (
              <tr
                key={cluster.id}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#111111] transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {cluster.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Cluster {cluster.id}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="font-mono text-lg font-bold text-[#7A7FEE]">
                    {cluster.abundance.toLocaleString()}
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-1">
                    <div
                      className="bg-[#7A7FEE] h-1 rounded-full"
                      style={{ width: `${(cluster.abundance / 1500) * 100}%` }}
                    ></div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="font-mono font-bold text-gray-900 dark:text-white">
                    {cluster.similarity}%
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      cluster.novelty === "Novel"
                        ? "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
                        : cluster.novelty === "Rare"
                        ? "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
                        : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    }`}
                  >
                    {cluster.novelty}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      cluster.conservation === "Critical"
                        ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                        : cluster.conservation === "High"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                    }`}
                  >
                    {cluster.conservation}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Interactive Cluster Network */}
      <div className="mt-8 p-6 bg-gray-50 dark:bg-[#111111] rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <span className="mr-2">🕸️</span>
          Cluster Relationships
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {clusterData.slice(0, 4).map((cluster, index) => (
            <div
              key={cluster.id}
              className="p-4 bg-white dark:bg-[#1a1a1a] rounded-lg border-2 border-transparent hover:border-[#7A7FEE] transition-all cursor-pointer transform hover:scale-105"
              onClick={() => setSelectedCluster(cluster)}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#7A7FEE] to-[#4ECDC4] flex items-center justify-center text-white font-bold text-lg">
                  {cluster.id}
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {cluster.name.split(" ")[0]}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {cluster.abundance} seq.
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedCluster && (
          <div className="mt-6 p-4 bg-[#7A7FEE]/10 rounded-lg border border-[#7A7FEE]/20">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-semibold text-[#7A7FEE]">
                {selectedCluster.name}
              </h5>
              <button
                onClick={() => setSelectedCluster(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  Abundance:
                </span>
                <span className="ml-2 font-semibold">
                  {selectedCluster.abundance.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  Similarity:
                </span>
                <span className="ml-2 font-semibold">
                  {selectedCluster.similarity}%
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  Status:
                </span>
                <span className="ml-2 font-semibold">
                  {selectedCluster.novelty}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">
                  Priority:
                </span>
                <span className="ml-2 font-semibold">
                  {selectedCluster.conservation}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
