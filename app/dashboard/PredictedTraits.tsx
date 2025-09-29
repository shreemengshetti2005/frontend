import React, { useState } from "react";

interface PredictedTraits {
    attribute: string;
    value: string | number | boolean;
    tooltip: string;
}

const dummyData: PredictedTraits[] = [
    { attribute: "pathogenicToHumans", value: false, tooltip: "Whether it has known pathogenic potential in humans" },
    { attribute: "pathogenicToPlants", value: true, tooltip: "Whether it infects crops/woody plants" },
    { attribute: "parasiticPotential", value: "Parasitic", tooltip: "Classification of parasitic behavior and host dependency" },
    { attribute: "symbioticPotential", value: "Commensal", tooltip: "Type of symbiotic relationship with host organisms" },
    { attribute: "hostRangeBreadth", value: 3, tooltip: "Number of different host species this organism can infect" },
    { attribute: "genomeSizeMbp", value: 45, tooltip: "Estimated genome size in megabase pairs (Mbp)" },
    { attribute: "GCContent", value: 52.3, tooltip: "Percentage of guanine-cytosine content in genome" },
    { attribute: "secondaryMetabolitesKnown", value: true, tooltip: "Whether the organism produces secondary metabolites" },
    { attribute: "biotechnologicalPotential", value: false, tooltip: "Whether it has potential industrial/medical uses" },
    { attribute: "morphologicalReliability", value: 0.8, tooltip: "Confidence score for morphological trait predictions (0-1)" },
    { attribute: "cellSizeRange", value: "5-10 µm", tooltip: "Range of cell sizes measured in micrometers" },
    { attribute: "motility", value: "Flagellated", tooltip: "Primary mechanism of cellular movement" },
    { attribute: "reproductiveMode", value: "Sexual", tooltip: "Primary method of reproduction" },
    { attribute: "habitatDepthRange", value: "2000-3500 m", tooltip: "Depth range where organism is typically found" },
    { attribute: "temperatureTolerance", value: 4, tooltip: "Optimal temperature range in degrees Celsius" },
    { attribute: "salinityTolerance", value: 35, tooltip: "Salinity tolerance level in parts per thousand (ppt)" },
    { attribute: "trophicLevel", value: "Primary Consumer", tooltip: "Position in the food web hierarchy" },
    { attribute: "geographicDistribution", value: "Indo-Pacific", tooltip: "Primary geographic region where organism is found" },
    { attribute: "lifeCycleComplexity", value: "Complex", tooltip: "Complexity level of the organism's life cycle" },
    { attribute: "developmentalStages", value: 3, tooltip: "Number of distinct developmental stages in life cycle" },
];

const PredictedTraitsTab: React.FC = () => {
    const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);

    const formatValue = (value: string | number | boolean) => {
        if (typeof value === 'boolean') {
            return value ? 'Yes' : 'No';
        }
        return value.toString();
    };

    const formatAttributeName = (attribute: string) => {
        // Convert camelCase to readable format
        return attribute
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    };

    const StatusIcon = ({ status }: { status: boolean }) => {
        if (status) {
            return (
                <div className="flex items-center justify-center">
                    <svg
                        className="w-5 h-5 text-green-600 dark:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
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
                        className="w-5 h-5 text-red-600 dark:text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
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
                <div className="absolute top-full left-0 mt-2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg shadow-lg z-10 border border-gray-700 dark:border-gray-300 min-w-64 max-w-80">
                    <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 dark:bg-gray-100 border-l border-t border-gray-700 dark:border-gray-300 rotate-45"></div>
                    <div className="whitespace-normal break-words">
                        {tooltip}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg p-6">
            {/* Header with subtle animation */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 flex items-center group">
                    <span className="mr-2 transition-transform duration-300 group-hover:scale-110">🧬</span>
                    Predicted Traits
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    This species most closely matches <strong className="text-[#7A7FEE]">Species Y</strong>. Based on this similarity, the following insights are generated.
                </p>
            </div>

            {/* Traits Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                            Attribute
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                            Predicted Value
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {dummyData.map((trait, idx) => (
                        <tr
                            key={idx}
                            className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-[#111111] transition-colors"
                        >
                            <td className="py-4 px-4">
                                <TooltipWrapper
                                    tooltip={trait.tooltip}
                                    id={`trait-${idx}`}
                                >
                                        <span className="cursor-help border-b border-dotted border-gray-400 text-gray-800 dark:text-gray-200 font-medium">
                                            {formatAttributeName(trait.attribute)}
                                        </span>
                                </TooltipWrapper>
                            </td>
                            <td className="py-4 px-4">
                                <div className="flex items-center space-x-2">
                                    {typeof trait.value === 'boolean' && (
                                        <StatusIcon status={trait.value} />
                                    )}
                                    <span className="text-gray-800 dark:text-gray-200">
                                            {formatValue(trait.value)}
                                        </span>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {/* Padding row to prevent scrollbar on last tooltip */}
                    <tr>
                        <td colSpan={2} className="py-8"></td>
                    </tr>
                    </tbody>
                </table>
            </div>

            {/* Enhanced Warning Box */}
            <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 rounded-lg border border-orange-200 dark:border-orange-800/30 shadow-sm">
                <div className="flex items-start space-x-3">
                    <div className="text-orange-600 dark:text-orange-400 text-lg animate-pulse">⚠️</div>
                    <div className="text-sm text-orange-800 dark:text-orange-200 leading-relaxed">
                        <strong>Generated Insights from ML Models:</strong> These are generated insights from machine learning models.
                        These can be inaccurate and serve only as basis for further studies. Always validate through proper experimental methods.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PredictedTraitsTab;