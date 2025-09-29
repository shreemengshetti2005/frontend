import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface SpeciesNode {
    id: string;
    name: string;
    time: number;
    gcContent: number;
    mutationRate: number;
    depth: number;
    lineage: number;
    isNovel: boolean;
    description: string;
}

interface EvolutionaryTrajectoryProps {
    isClient: boolean;
}

export default function EvolutionaryTrajectory({
                                                   isClient,
                                               }: EvolutionaryTrajectoryProps) {
    const chartRef = useRef<HTMLDivElement>(null);
    const [selectedSpecies, setSelectedSpecies] = useState<SpeciesNode | null>(
        null
    );
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Data represents the evolutionary divergence of our 7 reference species and the novel foram.
    const evolutionData: SpeciesNode[] = [
        // Lineage 0: Common Eukaryotic Ancestor Trunk
        {
            id: "anc0",
            name: "Eukaryotic Ancestor",
            time: -50,
            gcContent: 45.0,
            mutationRate: 0.05,
            depth: 1000,
            lineage: 0,
            isNovel: false,
            description: "Last Eukaryotic Common Ancestor (LECA), a hypothetical ancient protist.",
        },
        {
            id: "anc1",
            name: "Supergroup Divergence",
            time: 0,
            gcContent: 45.0,
            mutationRate: 0.08,
            depth: 1000,
            lineage: 0,
            isNovel: false,
            description: "Point of major divergence for eukaryotic supergroups.",
        },

        // Lineage 1: Opisthokonta (Animals & Fungi)
        {
            id: "opisthokonta_anc",
            name: "Opisthokont Ancestor",
            time: 50,
            gcContent: 41.0,
            mutationRate: 0.10,
            depth: 800,
            lineage: 1,
            isNovel: false,
            description: "Common ancestor of fungi and animals.",
        },
        {
            id: "sea_urchin",
            name: "S. purpuratus",
            time: 150,
            gcContent: 37.0,
            mutationRate: 0.15,
            depth: 50,
            lineage: 1,
            isNovel: false,
            description: "Represents the Animalia kingdom, diverged towards lower GC content.",
        },
        {
            id: "yeast",
            name: "S. cerevisiae",
            time: 130,
            gcContent: 38.0,
            mutationRate: 0.18,
            depth: 0,
            lineage: 1,
            isNovel: false,
            description: "Represents the Fungi kingdom, also with a low GC content.",
        },

        // Lineage 2: Archaeplastida (Plants)
        {
            id: "plant_anc",
            name: "Plant Ancestor",
            time: 60,
            gcContent: 44.0,
            mutationRate: 0.09,
            depth: 10,
            lineage: 2,
            isNovel: false,
            description: "Early ancestor of green plants.",
        },
        {
            id: "arabidopsis",
            name: "A. thaliana",
            time: 160,
            gcContent: 36.0,
            mutationRate: 0.13,
            depth: 0,
            lineage: 2,
            isNovel: false,
            description: "Represents the Plantae kingdom, showing significant GC content reduction.",
        },

        // Lineage 3: SAR Supergroup (Stramenopila, Alveolata)
        {
            id: "sar_anc",
            name: "SAR Ancestor",
            time: 40,
            gcContent: 47.0,
            mutationRate: 0.11,
            depth: 500,
            lineage: 3,
            isNovel: false,
            description: "Common ancestor for the Stramenopila, Alveolata, and Rhizaria supergroup.",
        },
        {
            id: "diatom",
            name: "T. pseudonana",
            time: 140,
            gcContent: 48.0,
            mutationRate: 0.14,
            depth: 100,
            lineage: 3,
            isNovel: false,
            description: "Represents Stramenopila (Diatom), maintaining a high GC content.",
        },
        {
            id: "paramecium",
            name: "P. tetraurelia",
            time: 120,
            gcContent: 28.0,
            mutationRate: 0.20,
            depth: 1,
            lineage: 3,
            isNovel: false,
            description: "Represents Alveolata (Ciliate), with a dramatically lowered GC content.",
        },

        // Lineage 4: Rhizaria (Our group of interest)
        {
            id: "rhizaria_anc",
            name: "Rhizarian Ancestor",
            time: 80,
            gcContent: 43.0,
            mutationRate: 0.12,
            depth: 800,
            lineage: 4,
            isNovel: false,
            description: "Ancestor of the Rhizaria group, including Foraminifera.",
        },
        {
            id: "foraminiferan",
            name: "G. siphonifera",
            time: 180,
            gcContent: 44.0,
            mutationRate: 0.16,
            depth: 200,
            lineage: 4,
            isNovel: false,
            description: "The known, planktonic foraminiferan, adapted to surface waters.",
        },
        {
            id: "novel_foram",
            name: "Novel Foram",
            time: 180,
            gcContent: 42.5,
            mutationRate: 0.19,
            depth: 2500,
            lineage: 4,
            isNovel: true,
            description: "Our novel species. Diverged from the same ancestor but adapted to the deep sea.",
        },

        // Lineage 5: Amoebozoa
        {
            id: "amoeba",
            name: "A. proteus",
            time: 150,
            gcContent: 26.0,
            mutationRate: 0.17,
            depth: 1,
            lineage: 5,
            isNovel: false,
            description: "Represents the Amoebozoa, characterized by a very low GC content.",
        },
    ];


    useEffect(() => {
        // Check if dark mode is active
        const checkDarkMode = () => {
            if(typeof window !== 'undefined' && window.document){
                const isDark = document.documentElement.classList.contains("dark");
                setIsDarkMode(isDark);
            }
        };

        checkDarkMode();

        // Watch for dark mode changes
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!chartRef.current || !isClient) return;

        const container = d3.select(chartRef.current);
        container.selectAll("*").remove();

        // --- MODIFICATION START ---
        // Dynamically get the width of the container
        const containerWidth = (container.node() as HTMLElement).getBoundingClientRect().width || 1000;

        const margin = { top: 20, right: 80, bottom: 60, left: 80 };
        // Calculate width based on container, ensuring it's not negative
        const width = Math.max(containerWidth - margin.left - margin.right, 0);
        const height = 500 - margin.top - margin.bottom;

        const svg = container
            .append("svg")
            // Set svg width to the full container width
            .attr("width", containerWidth)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
        // --- MODIFICATION END ---

        // Scales
        const xScale = d3
            .scaleLinear()
            .domain([-60, (d3.max(evolutionData, (d) => d.time) as number) + 20])
            .range([0, width]);

        const yScale = d3
            .scaleLinear()
            .domain([
                (d3.min(evolutionData, d => d.gcContent) as number) - 2,
                (d3.max(evolutionData, d => d.gcContent) as number) + 2,
            ])
            .range([height, 0]);

        // Color scheme
        const lineageColors: { [key: number]: string } = {
            0: isDarkMode ? "#a5b4fc" : "#4f46e5",
            1: "#ef4444", // Animalia/Fungi (Opisthokonta)
            2: "#10b981", // Plantae
            3: "#3b82f6", // SAR (Stramenopila/Alveolata part)
            4: "#ec4899", // Rhizaria
            5: "#8b5cf6", // Amoebozoa
        };

        // Add grid lines
        svg
            .append("g")
            .attr("class", "grid")
            .selectAll("line.horizontal")
            .data(yScale.ticks(8))
            .enter()
            .append("line")
            .attr("class", "horizontal")
            .attr("x1", 0)
            .attr("x2", width)
            .attr("y1", (d) => yScale(d))
            .attr("y2", (d) => yScale(d))
            .attr("stroke", isDarkMode ? "#374151" : "#e5e7eb")
            .attr("stroke-opacity", 0.8)
            .attr("stroke-dasharray", "3,3");

        // Function to draw a lineage
        const drawLineage = (lineageNum: number, connectTo: string) => {
            const ancestorNode = evolutionData.find(d => d.id === connectTo);
            if (!ancestorNode) return;

            const lineageNodes = evolutionData.filter(d => d.lineage === lineageNum);

            lineageNodes.forEach(node => {
                const pathData = [ancestorNode, node];
                const line = d3
                    .line<SpeciesNode>()
                    .x((d) => xScale(d.time))
                    .y((d) => yScale(d.gcContent))
                    .curve(d3.curveBumpX);

                svg
                    .append("path")
                    .datum(pathData)
                    .attr("fill", "none")
                    .attr("stroke", lineageColors[lineageNum])
                    .attr("stroke-width", 2.5)
                    .attr("opacity", 0.8)
                    .attr("d", line);
            });
        };

        // Draw connections based on narrative
        const ancestralTrunk = evolutionData.filter(d => d.lineage === 0);
        const lineGen = d3.line<SpeciesNode>().x(d => xScale(d.time)).y(d => yScale(d.gcContent));
        svg.append("path")
            .datum(ancestralTrunk)
            .attr("fill", "none")
            .attr("stroke", lineageColors[0])
            .attr("stroke-width", 4)
            .attr("d", lineGen);

        // Draw main branches from divergence point
        drawLineage(1, 'anc1'); // Opisthokonta
        drawLineage(2, 'anc1'); // Plantae
        drawLineage(3, 'anc1'); // SAR
        drawLineage(5, 'anc1'); // Amoebozoa

        // Draw sub-branches
        const sarAncestor = evolutionData.find(d => d.id === 'sar_anc');
        const rhizarianAncestor = evolutionData.find(d => d.id === 'rhizaria_anc');

        if(sarAncestor) {
            const rhizariaPath = [sarAncestor, evolutionData.find(d => d.id === 'rhizaria_anc') as SpeciesNode];
            const line = d3.line<SpeciesNode>().x(d => xScale(d.time)).y(d => yScale(d.gcContent)).curve(d3.curveBumpX);
            svg.append('path').datum(rhizariaPath).attr('fill', 'none').attr('stroke', lineageColors[4]).attr('stroke-width', 2.5).attr('d', line);
        }
        if (rhizarianAncestor) {
            drawLineage(4, 'rhizaria_anc');
        }

        // Add species nodes
        const nodes = svg
            .selectAll(".species-node")
            .data(evolutionData)
            .enter()
            .append("g")
            .attr("class", "species-node")
            .style("cursor", "pointer");

        // Node circles
        nodes
            .append("circle")
            .attr("cx", (d) => xScale(d.time))
            .attr("cy", (d) => yScale(d.gcContent))
            .attr("r", (d) => (d.isNovel ? 8 : 6))
            .style("fill", (d) => lineageColors[d.lineage] || "#9ca3af")
            .style("stroke", (d) => d.isNovel ? (isDarkMode ? "#fca5a5" : "#dc2626") : (isDarkMode ? "#1f2937" : "#fff"))
            .style("stroke-width", 3)
            .on("mouseover", function (event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("r", d.isNovel ? 12 : 9);

                const tooltip = container
                    .append("div")
                    .attr("class", "tooltip")
                    .style("position", "absolute")
                    .style("background", "rgba(0,0,0,0.8)")
                    .style("color", "white")
                    .style("padding", "12px")
                    .style("border-radius", "8px")
                    .style("font-size", "13px")
                    .style("pointer-events", "none")
                    .style("z-index", "1000")
                    .html(
                        `
            <strong>${d.name}</strong><br/>
            GC Content: ${d.gcContent}%<br/>
            Time: ${d.time} Mya<br/>
            ${
                            d.isNovel
                                ? `<span style="color: ${lineageColors[4]}">★ Novel Species</span>`
                                : ""
                        }
          `
                    )
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY - 10 + "px");
            })
            .on("mouseout", function (event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("r", d.isNovel ? 8 : 6);
                container.selectAll(".tooltip").remove();
            })
            .on("click", (event, d) => {
                setSelectedSpecies(d);
            });

        // Add labels
        nodes
            .append("text")
            .attr("x", (d) => xScale(d.time) + (d.id === 'anc0' ? -10 : d.id === 'anc1' ? 10 : 0))
            .attr("y", (d) => yScale(d.gcContent) + (d.id === 'anc0' ? 20 : d.id === 'anc1' ? 20 : -15))
            .attr("text-anchor", (d) => (d.id.includes('anc') ? "end" : "middle"))
            .style("font-size", "11px")
            .style("font-weight", "600")
            .style("fill", isDarkMode ? "#d1d5db" : "#1f2937")
            .text((d) => d.name);

        // Add axes
        const xAxis = svg
            .append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale).tickFormat((d) => `${d} Mya`));

        xAxis
            .selectAll("text")
            .style("fill", isDarkMode ? "#9ca3af" : "#374151")
            .style("font-weight", "500");
        xAxis
            .selectAll("line, path")
            .style("stroke", isDarkMode ? "#4b5563" : "#9ca3af")
            .style("stroke-width", "1.5");

        const yAxis = svg
            .append("g")
            .call(d3.axisLeft(yScale).tickFormat((d) => `${d}%`));

        yAxis
            .selectAll("text")
            .style("fill", isDarkMode ? "#9ca3af" : "#374151")
            .style("font-weight", "500");
        yAxis
            .selectAll("line, path")
            .style("stroke", isDarkMode ? "#4b5563" : "#9ca3af")
            .style("stroke-width", "1.5");

        // Axis labels
        svg
            .append("text")
            .attr("x", width / 2)
            .attr("y", height + 45)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .style("font-weight", "700")
            .style("fill", isDarkMode ? "#9ca3af" : "#1f2937")
            .text("Evolutionary Time (Million Years Ago)");

        svg
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -55)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .style("font-weight", "700")
            .style("fill", isDarkMode ? "#9ca3af" : "#1f2937")
            .text("GC Content (%)");
    }, [isClient, isDarkMode]);

    return (
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <svg
                    className="mr-2 h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M3 6l3 6h12l3-6" />
                    <path d="M3 18l3-6" />
                    <path d="M21 18l-3-6" />
                </svg>
                Evolutionary Trajectory Analysis
            </h3>

            <div ref={chartRef} className="w-full overflow-x-auto"></div>

            {selectedSpecies && (
                <div className="mt-6 p-4 bg-gray-50 dark:bg-[#111111] rounded-xl border border-gray-200 dark:border-gray-800">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                {selectedSpecies.name}
                            </h4>
                            {selectedSpecies.isNovel && (
                                <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold bg-red-100 text-red-600 rounded">
                  ★ Novel Species
                </span>
                            )}
                        </div>
                        <button
                            onClick={() => setSelectedSpecies(null)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            ✕
                        </button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {selectedSpecies.description}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="p-3 bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-gray-800">
                            <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                                GC Content
                            </div>
                            <div className="text-lg font-bold text-gray-900 dark:text-white">
                                {selectedSpecies.gcContent}%
                            </div>
                        </div>
                        <div className="p-3 bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-gray-800">
                            <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                                Mutation Rate
                            </div>
                            <div className="text-lg font-bold text-gray-900 dark:text-white">
                                {selectedSpecies.mutationRate}
                            </div>
                        </div>
                        <div className="p-3 bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-gray-800">
                            <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                                Depth
                            </div>
                            <div className="text-lg font-bold text-gray-900 dark:text-white">
                                {selectedSpecies.depth}m
                            </div>
                        </div>
                        <div className="p-3 bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-gray-800">
                            <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                                Time
                            </div>
                            <div className="text-lg font-bold text-gray-900 dark:text-white">
                                {selectedSpecies.time} Mya
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-[#111111] rounded-xl border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#ef4444" }}></div>
                        <div className="text-sm text-gray-900 dark:text-white font-semibold">Lineage 1</div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Opisthokonta (Fungi/Animals)</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-[#111111] rounded-xl border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#10b981" }}></div>
                        <div className="text-sm text-gray-900 dark:text-white font-semibold">Lineage 2</div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Archaeplastida (Plants)</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-[#111111] rounded-xl border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#3b82f6" }}></div>
                        <div className="text-sm text-gray-900 dark:text-white font-semibold">Lineage 3</div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">SAR Group</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-[#111111] rounded-xl border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#ec4899" }}></div>
                        <div className="text-sm text-gray-900 dark:text-white font-semibold">Lineage 4</div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Rhizaria (Forams)</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-[#111111] rounded-xl border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#8b5cf6" }}></div>
                        <div className="text-sm text-gray-900 dark:text-white font-semibold">Lineage 5</div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Amoebozoa</div>
                </div>
            </div>
        </div>
    );
}