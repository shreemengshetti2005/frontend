import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

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

export default function EvolutionaryTrajectory({ isClient }: EvolutionaryTrajectoryProps) {
    const chartRef = useRef<HTMLDivElement>(null);
    const [selectedSpecies, setSelectedSpecies] = useState<SpeciesNode | null>(null);

    // Dummy data - evolutionary trajectory with logical progression
    const evolutionData: SpeciesNode[] = [
        // Common Ancestral lineage (before divergence)
        { id: 'anc0', name: 'Proto-Ancestor', time: -30, gcContent: 49.5, mutationRate: 0.11, depth: 1950, lineage: 0, isNovel: false, description: 'Early ancestral population' },
        { id: 'anc1', name: 'Common Ancestor', time: 0, gcContent: 50.0, mutationRate: 0.12, depth: 2000, lineage: 0, isNovel: false, description: 'Deep-sea ancestral species from Abyssal Plain' },

        // Lineage 1 (Red) - Higher GC content trajectory
        { id: 'sp1', name: 'Species A', time: 50, gcContent: 52.0, mutationRate: 0.15, depth: 2100, lineage: 1, isNovel: false, description: 'Adapted to hydrothermal vent conditions' },
        { id: 'sp2', name: 'Species B', time: 120, gcContent: 54.0, mutationRate: 0.19, depth: 2250, lineage: 1, isNovel: false, description: 'Enhanced thermophilic capabilities' },
        { id: 'novel1', name: 'Novel', time: 200, gcContent: 57.0, mutationRate: 0.28, depth: 2500, lineage: 1, isNovel: true, description: 'Highly divergent thermophilic species - potential new genus' },

        // Lineage 2 (Teal) - Lower GC content trajectory
        { id: 'sp3', name: 'Species C', time: 50, gcContent: 48.5, mutationRate: 0.14, depth: 1950, lineage: 2, isNovel: false, description: 'Cold-adapted variant' },
        { id: 'sp4', name: 'Species D', time: 110, gcContent: 45.5, mutationRate: 0.17, depth: 1800, lineage: 2, isNovel: false, description: 'Shifted to oligotrophic environment' },
        { id: 'sp5', name: 'Species E', time: 170, gcContent: 43.0, mutationRate: 0.21, depth: 1600, lineage: 2, isNovel: false, description: 'Established in cold seep communities' },

        // Lineage 3 (Yellow) - Stable then rapid shift
        { id: 'sp6', name: 'Species F', time: 50, gcContent: 50.2, mutationRate: 0.13, depth: 2050, lineage: 3, isNovel: false, description: 'Maintained ancestral traits' },
        { id: 'sp7', name: 'Species G', time: 120, gcContent: 50.5, mutationRate: 0.14, depth: 2100, lineage: 3, isNovel: false, description: 'Conservative evolution pattern' },
        { id: 'sp8', name: 'Species H', time: 170, gcContent: 51.0, mutationRate: 0.16, depth: 2150, lineage: 3, isNovel: false, description: 'Gradual adaptation to seamount habitat' },
    ];

    useEffect(() => {
        if (!chartRef.current || !isClient) return;

        const container = d3.select(chartRef.current);
        container.selectAll("*").remove();

        const margin = { top: 20, right: 80, bottom: 60, left: 80 };
        const width = 1000 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        const svg = container
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Scales
        const xScale = d3.scaleLinear()
            .domain([-40, d3.max(evolutionData, d => d.time) as number + 10])
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([38, 59])
            .range([height, 0]);

        // Color scheme matching your design
        const lineageColors: { [key: number]: string } = {
            0: '#7A7FEE',
            1: '#FF6B6B',
            2: '#4ECDC4',
            3: '#FFD93D'
        };

        // Add grid lines
        svg.append('g')
            .attr('class', 'grid')
            .selectAll('line.horizontal')
            .data(yScale.ticks(8))
            .enter()
            .append('line')
            .attr('class', 'horizontal')
            .attr('x1', 0)
            .attr('x2', width)
            .attr('y1', d => yScale(d))
            .attr('y2', d => yScale(d))
            .attr('stroke', '#9ca3af')
            .attr('stroke-opacity', 0.6)
            .attr('stroke-dasharray', '3,3');

        // Draw common ancestral trunk first
        const ancestralData = evolutionData.filter(d => d.lineage === 0);
        ancestralData.sort((a, b) => a.time - b.time);

        const ancestorLine = d3.line<SpeciesNode>()
            .x(d => xScale(d.time))
            .y(d => yScale(d.gcContent))
            .curve(d3.curveCatmullRom);

        svg.append('path')
            .datum(ancestralData)
            .attr('fill', 'none')
            .attr('stroke', lineageColors[0])
            .attr('stroke-width', 4)
            .attr('d', ancestorLine);

        // Draw diverging lineages
        const lineages = [1, 2, 3];

        lineages.forEach(lineageNum => {
            const lineageData = evolutionData.filter(d =>
                (d.lineage === lineageNum || d.lineage === 0)
            );
            lineageData.sort((a, b) => a.time - b.time);

            // Create line generator
            const line = d3.line<SpeciesNode>()
                .x(d => xScale(d.time))
                .y(d => yScale(d.gcContent))
                .curve(d3.curveCatmullRom);

            // Draw evolutionary path
            svg.append('path')
                .datum(lineageData)
                .attr('fill', 'none')
                .attr('stroke', lineageColors[lineageNum])
                .attr('stroke-width', 4)
                .attr('d', line);
        });

        // Add species nodes
        const nodes = svg.selectAll('.species-node')
            .data(evolutionData)
            .enter()
            .append('g')
            .attr('class', 'species-node')
            .style('cursor', 'pointer');

        // Node circles
        nodes.append('circle')
            .attr('cx', d => xScale(d.time))
            .attr('cy', d => yScale(d.gcContent))
            .attr('r', d => d.isNovel ? 8 : 6)
            .style('fill', d => lineageColors[d.lineage])
            .style('stroke', '#fff')
            .style('stroke-width', 3)
            .on('mouseover', function(event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('r', d.isNovel ? 12 : 9);

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
                    .html(`
            <strong>${d.name}</strong><br/>
            GC Content: ${d.gcContent}%<br/>
            Time: ${d.time} Mya<br/>
            ${d.isNovel ? '<span style="color: #FF6B6B;">★ Novel Species</span>' : ''}
          `)
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY - 10 + "px");
            })
            .on('mouseout', function(event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('r', d.isNovel ? 8 : 6);
                container.selectAll(".tooltip").remove();
            })
            .on('click', (event, d) => {
                setSelectedSpecies(d);
            });

        // Add labels for key species
        nodes.filter(d => d.isNovel || d.lineage === 0)
            .append('text')
            .attr('x', d => xScale(d.time))
            .attr('y', d => yScale(d.gcContent) - 15)
            .attr('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('font-weight', '700')
            .style('fill', d => d.isNovel ? '#dc2626' : '#1f2937')
            .text(d => d.name);

        // Add axes
        const xAxis = svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale).tickFormat(d => `${d} Mya`));

        xAxis.selectAll("text")
            .style("fill", "#374151")
            .style("font-weight", "500");
        xAxis.selectAll("line, path")
            .style("stroke", "#6b7280")
            .style("stroke-width", "1.5");

        const yAxis = svg.append("g")
            .call(d3.axisLeft(yScale).tickFormat(d => `${d}%`));

        yAxis.selectAll("text")
            .style("fill", "#374151")
            .style("font-weight", "500");
        yAxis.selectAll("line, path")
            .style("stroke", "#6b7280")
            .style("stroke-width", "1.5");

        // Axis labels
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + 45)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .style("font-weight", "700")
            .style("fill", "#1f2937")
            .text("Predicted Divergence Time (Million Years Ago)");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -55)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .style("font-weight", "700")
            .style("fill", "#1f2937")
            .text("GC Content (%)");

    }, [isClient]);

    return (
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M17 7l-5-5-5 5M7 17l5 5 5-5"/>
                </svg>
                Evolutionary Trajectory Analysis
            </h3>

            <div ref={chartRef} className="w-full overflow-x-auto"></div>

            {selectedSpecies && (
                <div className="mt-6 p-4 bg-gray-50 dark:bg-[#111111] rounded-xl">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                {selectedSpecies.name}
                            </h4>
                            {selectedSpecies.isNovel && (
                                <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold bg-red-100 text-red-600 rounded">
                  Novel Species
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
                            <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">GC Content</div>
                            <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedSpecies.gcContent}%</div>
                        </div>
                        <div className="p-3 bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-gray-800">
                            <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Mutation Rate</div>
                            <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedSpecies.mutationRate}</div>
                        </div>
                        <div className="p-3 bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-gray-800">
                            <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Depth</div>
                            <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedSpecies.depth}m</div>
                        </div>
                        <div className="p-3 bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-gray-800">
                            <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Time</div>
                            <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedSpecies.time} Mya</div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-[#111111] rounded-xl border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FF6B6B' }}></div>
                        <div className="text-sm text-gray-900 dark:text-white font-semibold">Lineage 1</div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Thermophilic adaptation</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-[#111111] rounded-xl border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#4ECDC4' }}></div>
                        <div className="text-sm text-gray-900 dark:text-white font-semibold">Lineage 2</div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Cold-adapted variant</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-[#111111] rounded-xl border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FFD93D' }}></div>
                        <div className="text-sm text-gray-900 dark:text-white font-semibold">Lineage 3</div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Conservative evolution</div>
                </div>
            </div>
        </div>
    );
}