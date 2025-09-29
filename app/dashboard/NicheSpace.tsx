import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface SpeciesData {
    id: string;
    name: string;
    trophicRole: number; // 2-5 scale: Autotroph → Heterotroph
    hostAssociation: number; // 1.5-4 scale: Free-living → Symbiotic/Parasitic
    color: string;
    isNovel: boolean;
    taxonomicGroup: string;
    description: string;
    confidence?: number;
}

interface NicheSpaceProps {
    isClient: boolean;
    novelSpecies?: SpeciesData; // Input from AI pipeline
}

export default function NicheSpace({ isClient, novelSpecies }: NicheSpaceProps) {
    const nicheRef = useRef<HTMLDivElement>(null);
    const [selectedSpecies, setSelectedSpecies] = useState<SpeciesData | null>(null);

    // Reference species data from your existing components
    const referenceSpecies: SpeciesData[] = [
        // From Proteobacteria group
        {
            id: 'proteobacteria',
            name: 'Proteobacteria A',
            trophicRole: 2.8,
            hostAssociation: 1.8,
            color: '#1E40AF',
            isNovel: false,
            taxonomicGroup: 'Bacteria',
            description: 'Chemolithotrophic, free-living marine bacteria'
        },
        // From Firmicutes
        {
            id: 'firmicutes',
            name: 'Firmicutes B',
            trophicRole: 3.2,
            hostAssociation: 2.1,
            color: '#2563EB',
            isNovel: false,
            taxonomicGroup: 'Bacteria',
            description: 'Heterotrophic with low host association'
        },
        // From Euryarchaeota
        {
            id: 'euryarchaeota',
            name: 'Euryarchaeota C',
            trophicRole: 3.0,
            hostAssociation: 4.0,
            color: '#DC2626',
            isNovel: false,
            taxonomicGroup: 'Archaea',
            description: 'Methanogenic, highly symbiotic archaea'
        },
        // From Thaumarchaeota
        {
            id: 'thaumarchaeota',
            name: 'Thaumarchaeota D',
            trophicRole: 2.5,
            hostAssociation: 1.5,
            color: '#F87171',
            isNovel: false,
            taxonomicGroup: 'Archaea',
            description: 'Ammonia-oxidizing, free-living archaea'
        },
        // From Fungi
        {
            id: 'fungi',
            name: 'Deep-sea Fungi',
            trophicRole: 4.2,
            hostAssociation: 2.0,
            color: '#059669',
            isNovel: false,
            taxonomicGroup: 'Eukaryota',
            description: 'Saprophytic fungi in marine sediments'
        },
        // From Protists
        {
            id: 'protists',
            name: 'Marine Protists',
            trophicRole: 3.8,
            hostAssociation: 1.7,
            color: '#34D399',
            isNovel: false,
            taxonomicGroup: 'Eukaryota',
            description: 'Heterotrophic protists, mostly free-living'
        },
        // From DNA Viruses
        {
            id: 'dna_viruses',
            name: 'DNA Viruses',
            trophicRole: 4.5,
            hostAssociation: 3.8,
            color: '#7C3AED',
            isNovel: false,
            taxonomicGroup: 'Viruses',
            description: 'Host-dependent DNA viruses'
        },
        // From RNA Viruses
        {
            id: 'rna_viruses',
            name: 'RNA Viruses',
            trophicRole: 4.8,
            hostAssociation: 3.5,
            color: '#A78BFA',
            isNovel: false,
            taxonomicGroup: 'Viruses',
            description: 'Host-dependent RNA viruses'
        },
        // From Unknown Bacteria
        {
            id: 'unknown_bacteria',
            name: 'Unknown Bacteria',
            trophicRole: 3.5,
            hostAssociation: 2.5,
            color: '#D97706',
            isNovel: false,
            taxonomicGroup: 'Unclassified',
            description: 'Uncharacterized bacterial sequences'
        }
    ];

    // Only include novel species if provided
    const allSpecies = novelSpecies ? [...referenceSpecies, novelSpecies] : referenceSpecies;

    useEffect(() => {
        if (!nicheRef.current || !isClient) return;

        const container = d3.select(nicheRef.current);
        container.selectAll("*").remove();

        const margin = { top: 30, right: 20, bottom: 80, left: 100 };
        const width = 600 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        const svg = container
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Scales
        const xScale = d3.scaleLinear()
            .domain([2, 5])
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([1.5, 4])
            .range([height, 0]);

        // Add grid lines with better visibility for light theme
        const gridLines = svg.append('g').attr('class', 'grid');

        // Horizontal grid lines
        gridLines.selectAll('line.horizontal')
            .data(yScale.ticks(6))
            .enter()
            .append('line')
            .attr('class', 'horizontal')
            .attr('x1', 0)
            .attr('x2', width)
            .attr('y1', d => yScale(d))
            .attr('y2', d => yScale(d))
            .attr('stroke', '#d1d5db')
            .attr('stroke-opacity', 0.8)
            .attr('stroke-dasharray', '3,3');

        // Vertical grid lines
        gridLines.selectAll('line.vertical')
            .data(xScale.ticks(6))
            .enter()
            .append('line')
            .attr('class', 'vertical')
            .attr('x1', d => xScale(d))
            .attr('x2', d => xScale(d))
            .attr('y1', 0)
            .attr('y2', height)
            .attr('stroke', '#d1d5db')
            .attr('stroke-opacity', 0.8)
            .attr('stroke-dasharray', '3,3');

        // Add quadrant background regions with better light theme visibility
        const quadrants = [
            { x: 0, y: 0, width: width/2, height: height/2, label: 'Autotroph-Parasitic', color: '#fef3c7', opacity: 0.15 },
            { x: width/2, y: 0, width: width/2, height: height/2, label: 'Heterotroph-Parasitic', color: '#fee2e2', opacity: 0.15 },
            { x: 0, y: height/2, width: width/2, height: height/2, label: 'Autotroph-Free-living', color: '#d1fae5', opacity: 0.15 },
            { x: width/2, y: height/2, width: width/2, height: height/2, label: 'Heterotroph-Free-living', color: '#dbeafe', opacity: 0.15 }
        ];

        svg.selectAll('.quadrant')
            .data(quadrants)
            .enter()
            .append('rect')
            .attr('class', 'quadrant')
            .attr('x', d => d.x)
            .attr('y', d => d.y)
            .attr('width', d => d.width)
            .attr('height', d => d.height)
            .attr('fill', d => d.color)
            .attr('opacity', d => d.opacity);

        // Add species points
        const speciesNodes = svg.selectAll('.species-point')
            .data(allSpecies)
            .enter()
            .append('g')
            .attr('class', 'species-point')
            .style('cursor', 'pointer');

        // Species circles with better light theme visibility
        speciesNodes.append('circle')
            .attr('cx', d => xScale(d.trophicRole))
            .attr('cy', d => yScale(d.hostAssociation))
            .attr('r', d => d.isNovel ? 10 : 6)
            .style('fill', d => d.color)
            .style('stroke', d => d.isNovel ? '#374151' : '#ffffff')
            .style('stroke-width', d => d.isNovel ? 3 : 2)
            .style('opacity', 0.9)
            .on('mouseover', function(event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('r', d.isNovel ? 14 : 9)
                    .style('opacity', 1);

                const tooltip = container
                    .append("div")
                    .attr("class", "tooltip")
                    .style("position", "absolute")
                    .style("background", "rgba(0,0,0,0.9)")
                    .style("color", "white")
                    .style("padding", "12px 16px")
                    .style("border-radius", "8px")
                    .style("font-size", "13px")
                    .style("font-weight", "500")
                    .style("pointer-events", "none")
                    .style("z-index", "1000")
                    .style("box-shadow", "0 8px 32px rgba(0,0,0,0.3)")
                    .html(`
            <div><strong>${d.name}</strong></div>
            <div style="margin: 4px 0; color: #94a3b8;">${d.taxonomicGroup}</div>
            <div>Trophic Role: ${d.trophicRole}</div>
            <div>Host Association: ${d.hostAssociation}</div>
            ${d.confidence ? `<div style="color: #60a5fa;">Confidence: ${(d.confidence * 100).toFixed(1)}%</div>` : ''}
            ${d.isNovel ? '<div style="color: #f87171; margin-top: 6px;">★ Novel Species</div>' : ''}
          `)
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY - 10 + "px");
            })
            .on('mouseout', function(event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('r', d.isNovel ? 10 : 6)
                    .style('opacity', 0.9);
                container.selectAll(".tooltip").remove();
            })
            .on('click', (event, d) => {
                setSelectedSpecies(d);
            });

        // Add labels for species with better contrast
        speciesNodes.append('text')
            .attr('x', d => xScale(d.trophicRole))
            .attr('y', d => yScale(d.hostAssociation) - (d.isNovel ? 18 : 12))
            .attr('text-anchor', 'middle')
            .style('font-size', d => d.isNovel ? '12px' : '10px')
            .style('font-weight', d => d.isNovel ? '700' : '600')
            .style('fill', d => d.isNovel ? '#dc2626' : '#1f2937')
            .style('pointer-events', 'none')
            .text(d => d.name);

        // Add axes with better styling
        const xAxis = svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale)
                .tickValues([2, 2.5, 3, 3.5, 4, 4.5, 5])
                .tickFormat(d => {
                    const labels = {
                        2: 'Autotroph',
                        2.5: '',
                        3: '',
                        3.5: 'Mixed',
                        4: '',
                        4.5: '',
                        5: 'Heterotroph'
                    };
                    return labels[d as keyof typeof labels] || '';
                }));

        xAxis.selectAll("text")
            .style("fill", "#374151")
            .style("font-weight", "600")
            .style("font-size", "12px");
        xAxis.selectAll("line, path")
            .style("stroke", "#4b5563")
            .style("stroke-width", "1.5");

        const yAxis = svg.append("g")
            .call(d3.axisLeft(yScale)
                .tickValues([1.5, 2, 2.5, 3, 3.5, 4])
                .tickFormat(d => {
                    const labels = {
                        1.5: 'Free-living',
                        2: '',
                        2.5: '',
                        3: 'Facultative',
                        3.5: '',
                        4: 'Symbiotic/Parasitic'
                    };
                    return labels[d as keyof typeof labels] || '';
                }));

        yAxis.selectAll("text")
            .style("fill", "#374151")
            .style("font-weight", "600")
            .style("font-size", "12px");
        yAxis.selectAll("line, path")
            .style("stroke", "#4b5563")
            .style("stroke-width", "1.5");

        // Axis labels
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + 55)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .style("font-weight", "700")
            .style("fill", "#1f2937")
            .text("Trophic Role (Autotroph → Heterotroph)");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -65)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .style("font-weight", "700")
            .style("fill", "#1f2937")
            .text("Host Association (Free-living → Symbiotic/Parasitic)");

    }, [isClient, novelSpecies]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Niche Space Plot */}
            <div className="lg:col-span-2 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <circle cx="12" cy="12" r="6"/>
                        <circle cx="12" cy="12" r="2"/>
                    </svg>
                    Ecological Niche Space
                </h3>
                <div ref={nicheRef} className="w-full overflow-x-auto"></div>
            </div>

            {/* Species Legend */}
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="9" cy="9" r="2"/>
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-1.414-.586H13"/>
                        <circle cx="9" cy="9" r="2"/>
                    </svg>
                    Species Reference
                </h3>
                <div className="space-y-3">
                    {referenceSpecies.map((species, index) => (
                        <div
                            key={index}
                            className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                                selectedSpecies?.id === species.id
                                    ? 'bg-gray-100 dark:bg-[#2a2a2a] border-2 border-gray-300 dark:border-gray-600'
                                    : 'bg-gray-50 dark:bg-[#111111] hover:bg-gray-100 dark:hover:bg-[#2a2a2a]'
                            }`}
                            onClick={() => setSelectedSpecies(species)}
                        >
                            <div
                                className="w-4 h-4 rounded-full shadow-sm border border-white dark:border-gray-700"
                                style={{ backgroundColor: species.color }}
                            ></div>
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                                    {species.name}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {species.taxonomicGroup}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Show novel species in legend if present */}
                    {novelSpecies && (
                        <>
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                                    Novel Species
                                </div>
                            </div>
                            <div
                                className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 border-red-200 dark:border-red-800 ${
                                    selectedSpecies?.id === novelSpecies.id
                                        ? 'bg-red-50 dark:bg-red-900/20 border-red-400 dark:border-red-600'
                                        : 'bg-red-25 dark:bg-red-900/10 hover:bg-red-50 dark:hover:bg-red-900/20'
                                }`}
                                onClick={() => setSelectedSpecies(novelSpecies)}
                            >
                                <div
                                    className="w-4 h-4 rounded-full shadow-sm border-2 border-red-400"
                                    style={{ backgroundColor: novelSpecies.color }}
                                ></div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold text-red-600 dark:text-red-400 text-sm flex items-center">
                                        ★ {novelSpecies.name}
                                    </div>
                                    <div className="text-xs text-red-500 dark:text-red-400">
                                        {novelSpecies.confidence && `${(novelSpecies.confidence * 100).toFixed(1)}% confidence`}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Selected Species Details */}
            {selectedSpecies && (
                <div className="lg:col-span-3 p-6 bg-gray-50 dark:bg-[#111111] rounded-2xl border border-gray-200 dark:border-gray-800">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                                {selectedSpecies.name}
                            </h4>
                            <div className="flex items-center space-x-3 mt-2">
                <span className="px-3 py-1 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                  {selectedSpecies.taxonomicGroup}
                </span>
                                {selectedSpecies.isNovel && (
                                    <span className="px-3 py-1 text-sm font-semibold bg-red-100 text-red-600 rounded-full">
                    ★ Novel Species
                  </span>
                                )}
                                {selectedSpecies.confidence && (
                                    <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-600 rounded-full">
                    {(selectedSpecies.confidence * 100).toFixed(1)}% Confidence
                  </span>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={() => setSelectedSpecies(null)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl"
                        >
                            ✕
                        </button>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {selectedSpecies.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-gray-800">
                            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Trophic Role</div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{selectedSpecies.trophicRole}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                {selectedSpecies.trophicRole < 3 ? 'Autotrophic tendency' :
                                    selectedSpecies.trophicRole > 4 ? 'Heterotrophic tendency' : 'Mixed feeding'}
                            </div>
                        </div>
                        <div className="p-4 bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-gray-800">
                            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Host Association</div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{selectedSpecies.hostAssociation}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                {selectedSpecies.hostAssociation < 2.5 ? 'Free-living' :
                                    selectedSpecies.hostAssociation > 3.5 ? 'Symbiotic/Parasitic' : 'Facultative association'}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}