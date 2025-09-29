import React, { useState } from "react";

interface SpeciesData {
  id: number;
  name: string;
  pathogenicToHumans: boolean;
  pathogenicToPlants: boolean;
  biotechnologicalPotential: boolean;
  color?: string;
}

interface SpeciesAnalysisProps {
  isClient: boolean;
  speciesData?: SpeciesData[];
  selectedSpecies: SpeciesData | null;
  setSelectedSpecies: (species: SpeciesData | null) => void;
}

// Default data with the requested species
const defaultSpeciesData: SpeciesData[] = [
  { id: 1, name: "Proteobacteria", pathogenicToHumans: true, pathogenicToPlants: true, biotechnologicalPotential: true, color: "#1E40AF" },
  { id: 2, name: "Firmicutes", pathogenicToHumans: true, pathogenicToPlants: false, biotechnologicalPotential: true, color: "#2563EB" },
  { id: 3, name: "Bacteroidetes", pathogenicToHumans: false, pathogenicToPlants: false, biotechnologicalPotential: true, color: "#60A5FA" },
  { id: 4, name: "Euryarchaeota", pathogenicToHumans: false, pathogenicToPlants: false, biotechnologicalPotential: true, color: "#DC2626" },
  { id: 5, name: "Thaumarchaeota", pathogenicToHumans: false, pathogenicToPlants: false, biotechnologicalPotential: true, color: "#F87171" },
  { id: 6, name: "Fungi", pathogenicToHumans: true, pathogenicToPlants: true, biotechnologicalPotential: true, color: "#059669" },
  { id: 7, name: "Protists", pathogenicToHumans: true, pathogenicToPlants: true, biotechnologicalPotential: false, color: "#34D399" },
  { id: 8, name: "DNA Viruses", pathogenicToHumans: true, pathogenicToPlants: true, biotechnologicalPotential: false, color: "#7C3AED" },
  { id: 9, name: "RNA Viruses", pathogenicToHumans: true, pathogenicToPlants: true, biotechnologicalPotential: false, color: "#A78BFA" },
  { id: 10, name: "Unknown Bacteria", pathogenicToHumans: false, pathogenicToPlants: false, biotechnologicalPotential: false, color: "#D97706" },
  { id: 11, name: "Novel Sequences", pathogenicToHumans: false, pathogenicToPlants: false, biotechnologicalPotential: true, color: "#FCD34D" },
];

export default function SpeciesAnalysis({
  isClient,
  speciesData = defaultSpeciesData,
  selectedSpecies,
  setSelectedSpecies,
}: SpeciesAnalysisProps) {
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);

  if (!isClient) {
    return <div>Loading species analysis...</div>;
  }

  const StatusIcon = ({ status }: { status: boolean }) => {
    if (status) {
      return (
        <div className="flex items-center justify-center">
          <svg 
            className="w-6 h-6 text-gray-900 dark:text-gray-100" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            strokeWidth="3"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center">
          <svg 
            className="w-6 h-6 text-gray-900 dark:text-gray-100" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            strokeWidth="3"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </div>
      );
    }
  };

  const TooltipWrapper = ({ 
    children, 
    tooltip, 
    id 
  }: { 
    children: React.ReactNode; 
    tooltip: string; 
    id: string; 
  }) => (
    <div 
      className="relative"
      onMouseEnter={() => setTooltipVisible(id)}
      onMouseLeave={() => setTooltipVisible(null)}
    >
      {children}
      {tooltipVisible === id && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg shadow-lg whitespace-nowrap z-10 border border-gray-700 dark:border-gray-300">
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-100 border-l border-t border-gray-700 dark:border-gray-300 rotate-45"></div>
          {tooltip}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
        <span className="mr-2">🔍</span>
        Species Analysis
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                Species
              </th>
              <th className="text-center py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                <TooltipWrapper 
                  tooltip="Whether it has known pathogenic potential in humans"
                  id="pathogenic-humans"
                >
                  <span className="cursor-help border-b border-dotted border-gray-400">
                    Pathogenic to Humans
                  </span>
                </TooltipWrapper>
              </th>
              <th className="text-center py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                <TooltipWrapper 
                  tooltip="Whether it infects crops/woody plants"
                  id="pathogenic-plants"
                >
                  <span className="cursor-help border-b border-dotted border-gray-400">
                    Pathogenic to Plants
                  </span>
                </TooltipWrapper>
              </th>
              <th className="text-center py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                <TooltipWrapper 
                  tooltip="Whether it has potential industrial/medical uses"
                  id="biotech-potential"
                >
                  <span className="cursor-help border-b border-dotted border-gray-400">
                    Biotechnological Potential
                  </span>
                </TooltipWrapper>
              </th>
            </tr>
          </thead>
          <tbody>
            {speciesData.map((species, index) => (
              <tr
                key={species.id}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-[#111111] transition-colors"
              >
                <td className="py-4 px-4">
                  <div 
                    className="font-medium"
                    style={{ color: species.color || '#374151' }}
                  >
                    {species.name}
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <StatusIcon status={species.pathogenicToHumans} />
                </td>
                <td className="py-4 px-4 text-center">
                  <StatusIcon status={species.pathogenicToPlants} />
                </td>
                <td className="py-4 px-4 text-center">
                  <StatusIcon status={species.biotechnologicalPotential} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Taxonomic Color Classes */}
      <div className="mt-8 p-6 bg-gray-200 dark:bg-[#111111] rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <span className="mr-2">🎨</span>
          Taxonomic Color Classes
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Bacteria */}
          <div className="flex items-center space-x-3 p-3 bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-gray-700">
            <div 
              className="w-6 h-6 rounded-full shadow-sm" 
              style={{ backgroundColor: "#3B82F6" }}
            ></div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white text-sm">
                Bacteria
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Proteobacteria, Firmicutes, Bacteroidetes
              </div>
            </div>
          </div>

          {/* Archaea */}
          <div className="flex items-center space-x-3 p-3 bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-gray-700">
            <div 
              className="w-6 h-6 rounded-full shadow-sm" 
              style={{ backgroundColor: "#EF4444" }}
            ></div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white text-sm">
                Archaea
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Euryarchaeota, Thaumarchaeota
              </div>
            </div>
          </div>

          {/* Eukaryota */}
          <div className="flex items-center space-x-3 p-3 bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-gray-700">
            <div 
              className="w-6 h-6 rounded-full shadow-sm" 
              style={{ backgroundColor: "#10B981" }}
            ></div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white text-sm">
                Eukaryota
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Fungi, Protists
              </div>
            </div>
          </div>

          {/* Viruses */}
          <div className="flex items-center space-x-3 p-3 bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-gray-700">
            <div 
              className="w-6 h-6 rounded-full shadow-sm" 
              style={{ backgroundColor: "#8B5CF6" }}
            ></div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white text-sm">
                Viruses
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                DNA Viruses, RNA Viruses
              </div>
            </div>
          </div>

          {/* Unclassified */}
          <div className="flex items-center space-x-3 p-3 bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-gray-700">
            <div 
              className="w-6 h-6 rounded-full shadow-sm" 
              style={{ backgroundColor: "#F59E0B" }}
            ></div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white text-sm">
                Unclassified
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Unknown Bacteria, Novel Sequences
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start space-x-2">
            <div className="text-blue-600 dark:text-blue-400 text-lg">💡</div>
            <div className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Color Legend:</strong> Each taxonomic group has a distinct color scheme. 
              Species names in the table above are colored according to their taxonomic classification 
              to help you quickly identify and categorize different organisms.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
