import React, { useState } from "react";
import { Dna, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

interface PredictedTraits {
    attribute: string;
    value: string | number | boolean;
    tooltip: string;
}

const dummyData: PredictedTraits[] = [
    { attribute: "pathogenicToHumans", value: false, tooltip: "Predicted pathogenic potential in humans based on related species." },
    { attribute: "pathogenicToPlants", value: false, tooltip: "Predicted pathogenic potential in plants." },
    { attribute: "parasiticPotential", value: "None", tooltip: "Prediction of parasitic behavior. Most foraminifera are free-living." },
    { attribute: "symbioticPotential", value: "Mutualistic", tooltip: "Many foraminifera host algal symbionts for nutrition." },
    { attribute: "hostRangeBreadth", value: 0, tooltip: "As a non-parasite, it does not have a host range." },
    { attribute: "genomeSizeMbp", value: 78, tooltip: "Estimated genome size in megabase pairs (Mbp). Foraminiferan genomes are often complex." },
    { attribute: "GCContent", value: 42.5, tooltip: "Predicted percentage of guanine-cytosine content in the genome." },
    { attribute: "secondaryMetabolitesKnown", value: false, tooltip: "Foraminifera are not typically known for producing diverse secondary metabolites." },
    { attribute: "biotechnologicalPotential", value: true, tooltip: "Fossilized shells (tests) are crucial for paleoclimate studies and oil exploration." },
    { attribute: "morphologicalReliability", value: 0.95, tooltip: "Confidence in morphological predictions is high, as shell structure is a key identifier." },
    { attribute: "cellSizeRange", value: "250-700 µm", tooltip: "Predicted size range for the single-celled organism." },
    { attribute: "motility", value: "Reticulopodial", tooltip: "Uses net-like pseudopods for movement and feeding, typical for this phylum." },
    { attribute: "reproductiveMode", value: "Asexual & Sexual", tooltip: "Exhibits a complex life cycle with alternating generations." },
    { attribute: "habitatDepthRange", value: "1500-4000 m", tooltip: "Predicted deep-sea benthic or bathypelagic habitat range." },
    { attribute: "temperatureTolerance", value: 2, tooltip: "Predicted optimal temperature in Celsius, reflecting cold deep-sea conditions." },
    { attribute: "salinityTolerance", value: 35, tooltip: "Predicted salinity tolerance in parts per thousand (ppt), typical for stable deep-sea environments." },
    { attribute: "trophicLevel", value: "Omnivore", tooltip: "Consumes bacteria, detritus, and small phytoplankton/zooplankton." },
    { attribute: "geographicDistribution", value: "Indo-Pacific", tooltip: "Predicted primary geographic region based on sample origin." },
    { attribute: "lifeCycleComplexity", value: "Complex", tooltip: "Features multiple life stages (alternation of generations)." },
    { attribute: "developmentalStages", value: 3, tooltip: "Predicted number of distinct developmental stages." },
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
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
            );
        } else {
            return (
                <div className="flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
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
                    <Dna className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
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
                    <AlertTriangle className="text-orange-600 dark:text-orange-400 h-5 w-5 mt-0.5" />
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