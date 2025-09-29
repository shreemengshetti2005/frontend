"use client";

import React, {useState, useEffect} from "react";
import FloatingNavbar from "../../components/landing-page/header";
import TitleSection from "./TitleSection";
import NovelSpeciesBanner from "./NovelSpeciesBanner";
import NavigationTabs from "./NavigationTabs";
import ExportFooter from "./ExportFooter";
import TaxonomicOverview from "./TaxonomicOverview";
import NicheSpace from "./NicheSpace";
import DivergencePath from "./DivergencePath";
import ClusterDetails from "./ClusterDetails";
import PredictedTraits from "./PredictedTraits";
import PhylogeneticTree from "./PhylogeneticTree"

interface ClusterData {
    id: number;
    name: string;
    abundance: number;
    similarity: number;
    novelty: string;
    conservation: string;
}

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState("overview");
    const [selectedCluster, setSelectedCluster] = useState<ClusterData | null>(
        null
    );
    const [isClient, setIsClient] = useState(false);
    const [currentDate, setCurrentDate] = useState("");

    // Sample data - move this to a separate data file if needed
    const analysisData = {
        totalSequences: 5847,
        filteredSequences: 5203,
        taxonomicClusters: 73,
        novelTaxa: 28,
        shannonDiversity: 3.42,
        simpsonDiversity: 0.891,
        pielouEvenness: 0.782,
        coverageIndex: 0.94,
    };

    const clusterData: ClusterData[] = [
        {
            id: 1,
            name: "Marine Bacteria Cluster",
            abundance: 1234,
            similarity: 98.5,
            novelty: "Known",
            conservation: "High",
        },
        {
            id: 2,
            name: "Deep-sea Archaea",
            abundance: 856,
            similarity: 94.2,
            novelty: "Novel",
            conservation: "Critical",
        },
        {
            id: 3,
            name: "Planktonic Eukaryotes",
            abundance: 745,
            similarity: 96.8,
            novelty: "Known",
            conservation: "Medium",
        },
        {
            id: 4,
            name: "Viral Community",
            abundance: 567,
            similarity: 89.3,
            novelty: "Novel",
            conservation: "High",
        },
        {
            id: 5,
            name: "Symbiotic Bacteria",
            abundance: 423,
            similarity: 97.1,
            novelty: "Rare",
            conservation: "Critical",
        },
    ];

    // Fix hydration issues
    useEffect(() => {
        setIsClient(true);
        setCurrentDate(
            new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })
        );
    }, []);

    // Prevent hydration mismatch by not rendering until client-side
    if (!isClient) {
        return (
            <div
                className="min-h-screen bg-gray-200 dark:bg-[#111111] flex items-center justify-center">
                <div className="text-center">
                    <div
                        className="w-16 h-16 border-4 border-[#7A7FEE] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        Loading eDNA Analysis...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-200 dark:bg-[#111111]">
            <FloatingNavbar/>

            <TitleSection currentDate={currentDate}/>

            <div className="pb-8">
                <div className="container">
                    <NovelSpeciesBanner isClient={isClient}/>
                    <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab}/>

                    {/* Content Sections */}
                    {activeTab === "overview" && (
                        <TaxonomicOverview
                            isClient={isClient}
                            analysisData={analysisData}
                        />
                    )}

                    {activeTab === "diversity" && (
                        <NicheSpace
                            isClient={isClient}
                        />
                    )}

                    {activeTab === "timeline" && <DivergencePath isClient={isClient}/>}

                    {activeTab === "clusters" && (
                        <ClusterDetails
                            isClient={isClient}
                            selectedSpecies={null}
                            setSelectedSpecies={() => {
                            }}
                        />
                    )}

                    {activeTab === "novel" && <PredictedTraits/>}

                    {activeTab === "phylo" && <PhylogeneticTree/>}
                </div>
            </div>

            <ExportFooter/>
        </div>
    );
}
