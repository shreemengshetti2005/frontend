import React, { useRef, useEffect, useState } from "react";
import { TreePine, ZoomIn, ZoomOut, Maximize2, Minimize2 } from "lucide-react";
import * as d3 from "d3";

interface TreeNode {
    name: string;
    children?: TreeNode[];
    novel?: boolean;
    isEllipsis?: boolean;
    domain?: string;
}

// Color mapping matching TaxonomicOverview
const domainColors = {
    bacteria: "#3B82F6",
    archaea: "#EF4444",
    eukaryota: "#10B981",
    viruses: "#8B5CF6",
    unclassified: "#F59E0B"
};

const treeData: TreeNode = {
    name: "Eukaryota",
    domain: "eukaryota",
    children: [
        { name: "<...>", isEllipsis: true },
        {
            name: "Excavata",
            domain: "eukaryota",
            children: [
                { name: "<...>", isEllipsis: true },
                { name: "Fornicata sp.", domain: "eukaryota" },
                { name: "Euglenozoa sp.", domain: "eukaryota" },
                { name: "<...>", isEllipsis: true },
            ]
        },
        {
            name: "SAR",
            domain: "eukaryota",
            children: [
                { name: "<...>", isEllipsis: true },
                {
                    name: "Stramenopiles",
                    domain: "eukaryota",
                    children: [
                        { name: "<...>", isEllipsis: true },
                        { name: "Bacillariophyta sp. 1", domain: "eukaryota" },
                        { name: "Bacillariophyta sp. 2", domain: "eukaryota" },
                        { name: "Phaeophyceae sp.", domain: "eukaryota" },
                        { name: "Novel Species X", novel: true, domain: "eukaryota" },
                        { name: "Chrysophyceae sp.", domain: "eukaryota" },
                        { name: "Bacillariophyta sp. 3", domain: "eukaryota" },
                        { name: "Labyrinthulomycetes sp.", domain: "eukaryota" },
                        { name: "<...>", isEllipsis: true }
                    ]
                },
                {
                    name: "Alveolata",
                    domain: "eukaryota",
                    children: [
                        { name: "<...>", isEllipsis: true },
                        { name: "Dinoflagellate sp. 1", domain: "eukaryota" },
                        { name: "Ciliophora sp.", domain: "eukaryota" },
                        { name: "<...>", isEllipsis: true },
                    ]
                },
                {
                    name: "Rhizaria",
                    domain: "eukaryota",
                    children: [
                        { name: "Foraminifera sp.", domain: "eukaryota" },
                        { name: "Radiolaria sp.", domain: "eukaryota" },
                    ]
                },
                { name: "<...>", isEllipsis: true },
            ],
        },
        {
            name: "Archaeplastida",
            domain: "eukaryota",
            children: [
                { name: "<...>", isEllipsis: true },
                { name: "Chlorophyta sp.", domain: "eukaryota" },
                { name: "Rhodophyta sp.", domain: "eukaryota" },
                { name: "<...>", isEllipsis: true },
            ]
        },
        {
            name: "Amoebozoa",
            domain: "eukaryota",
            children: [
                { name: "<...>", isEllipsis: true },
                { name: "Tubulinea sp.", domain: "eukaryota" },
                { name: "Discosea sp.", domain: "eukaryota" },
                { name: "<...>", isEllipsis: true },
            ]
        },
        {
            name: "Opisthokonta",
            domain: "eukaryota",
            children: [
                { name: "<...>", isEllipsis: true },
                {
                    name: "Fungi",
                    domain: "eukaryota",
                    children: [
                        { name: "<...>", isEllipsis: true },
                        { name: "Ascomycota sp.", domain: "eukaryota" },
                        { name: "Basidiomycota sp.", domain: "eukaryota" },
                        { name: "<...>", isEllipsis: true },
                    ]
                },
                {
                    name: "Metazoa",
                    domain: "eukaryota",
                    children: [
                        { name: "<...>", isEllipsis: true },
                        { name: "Cnidaria sp.", domain: "eukaryota" },
                        { name: "Arthropoda sp.", domain: "eukaryota" },
                        { name: "Nematoda sp.", domain: "eukaryota" },
                        { name: "<...>", isEllipsis: true },
                    ]
                },
                { name: "Choanoflagellate sp.", domain: "eukaryota" },
                { name: "<...>", isEllipsis: true },
            ],
        },
        {
            name: "Haptophyta",
            domain: "eukaryota",
            children: [
                { name: "<...>", isEllipsis: true },
                { name: "Coccolithophore sp.", domain: "eukaryota" },
                { name: "<...>", isEllipsis: true },
            ]
        },
        {
            name: "Cryptophyta",
            domain: "eukaryota",
            children: [
                { name: "<...>", isEllipsis: true },
                { name: "Cryptomonas sp.", domain: "eukaryota" },
                { name: "<...>", isEllipsis: true },
            ]
        },
        { name: "<...>", isEllipsis: true },
    ],
};

const PhylogeneticTree = () => {
    const svgRef = useRef(null);
    const containerRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });

    const drawTree = () => {
        if (!svgRef.current || !containerRef.current) return;

        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;

        const baseWidth = 1600;
        const baseHeight = 1400;
        const padding = 100;

        const actualWidth = baseWidth * zoom;
        const actualHeight = baseHeight * zoom;

        const svg = d3.select(svgRef.current)
            .attr("width", actualWidth)
            .attr("height", actualHeight)
            .style("font", "14px sans-serif")
            .style("display", "block");

        svg.selectAll("*").remove();

        const mainGroup = svg.append("g");

        const root = d3.hierarchy(treeData);
        const treeLayout = d3.tree().size([baseHeight - padding * 2, baseWidth - 400]);
        treeLayout(root);

        const defs = svg.append("defs");
        const gradient = defs.append("linearGradient")
            .attr("id", "linkGradient")
            .attr("gradientUnits", "userSpaceOnUse");

        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", domainColors.eukaryota)
            .attr("stop-opacity", 0.6);

        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", domainColors.eukaryota)
            .attr("stop-opacity", 0.4);

        const linkGroup = mainGroup
            .append("g")
            .attr("fill", "none")
            .attr("stroke", "url(#linkGradient)")
            .attr("stroke-width", 3 * zoom);

        linkGroup
            .selectAll("path")
            .data(root.links())
            .join("path")
            .attr("d", d3
                .linkHorizontal()
                .x((d) => (d.y + 200) * zoom)
                .y((d) => (d.x + padding) * zoom)
            )
            .style("opacity", 0.8);

        const nodeGroup = mainGroup
            .append("g")
            .selectAll("g")
            .data(root.descendants())
            .join("g")
            .attr("transform", (d) => `translate(${(d.y + 200) * zoom},${(d.x + padding) * zoom})`)
            .style("cursor", "pointer");

        // Node backgrounds with better visibility
        nodeGroup
            .append("circle")
            .attr("r", 15 * zoom)
            .attr("fill", (d) => {
                if (d.data.isEllipsis) return "rgba(156, 163, 175, 0.3)";
                if (d.data.novel) return "rgba(122, 127, 238, 0.2)";
                if (d.children) return "rgba(16, 185, 129, 0.2)";
                return "rgba(16, 185, 129, 0.15)";
            })
            .attr("stroke", "none")
            .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.1))");

        // Main circles with domain colors
        nodeGroup
            .append("circle")
            .attr("r", 10 * zoom)
            .attr("fill", (d) => {
                if (d.data.isEllipsis) return "#6B7280";
                if (d.data.novel) return "#7A7FEE";
                const domainColor = d.data.domain ? domainColors[d.data.domain] : domainColors.eukaryota;
                return d.children ? domainColor : `${domainColor}99`;
            })
            .attr("stroke", (d) => {
                if (d.data.isEllipsis) return "#4B5563";
                if (d.data.novel) return "#6366F1";
                const domainColor = d.data.domain ? domainColors[d.data.domain] : domainColors.eukaryota;
                return d3.color(domainColor).darker(0.5);
            })
            .attr("stroke-width", 3 * zoom);

        nodeGroup
            .on("mouseover", function(event, d) {
                d3.select(this).select("circle:last-child")
                    .transition()
                    .duration(200)
                    .attr("r", 12 * zoom)
                    .attr("stroke-width", 4 * zoom);

                const pathToRoot = [];
                let current = d;
                while (current) {
                    pathToRoot.push(current);
                    current = current.parent;
                }

                linkGroup.selectAll("path")
                    .style("opacity", (linkD) => {
                        const isInPath = pathToRoot.includes(linkD.target) && pathToRoot.includes(linkD.source);
                        return isInPath ? 1 : 0.3;
                    })
                    .style("stroke-width", (linkD) => {
                        const isInPath = pathToRoot.includes(linkD.target) && pathToRoot.includes(linkD.source);
                        return isInPath ? 5 * zoom : 3 * zoom;
                    });
            })
            .on("mouseout", function() {
                d3.select(this).select("circle:last-child")
                    .transition()
                    .duration(200)
                    .attr("r", 10 * zoom)
                    .attr("stroke-width", 3 * zoom);

                linkGroup.selectAll("path")
                    .style("opacity", 0.8)
                    .style("stroke-width", 3 * zoom);
            });

        nodeGroup
            .append("text")
            .attr("dy", "0.32em")
            .attr("x", (d) => (d.children ? -20 : 20) * zoom)
            .attr("text-anchor", (d) => (d.children ? "end" : "start"))
            .attr("font-weight", (d) => d.data.novel ? "bold" : "normal")
            .attr("fill", (d) => {
                if (d.data.isEllipsis) return "#9CA3AF";
                return d.data.novel ? "#7A7FEE" : "#E5E7EB";
            })
            .text((d) => d.data.name)
            .style("font-size", (d) => d.data.novel ? `${16 * zoom}px` : `${15 * zoom}px`);
    };

    const handleZoomIn = () => {
        setZoom(prev => Math.min(prev + 0.2, 3));
    };

    const handleZoomOut = () => {
        setZoom(prev => Math.max(prev - 0.2, 0.3));
    };

    const handleResetView = () => {
        setZoom(1);
        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
            containerRef.current.scrollLeft = 0;
        }
    };

    const handleMouseDown = (e) => {
        if (e.target === svgRef.current || e.target.closest('svg')) {
            setIsDragging(true);
            setLastPanPoint({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !containerRef.current) return;

        const deltaX = e.clientX - lastPanPoint.x;
        const deltaY = e.clientY - lastPanPoint.y;

        containerRef.current.scrollLeft -= deltaX;
        containerRef.current.scrollTop -= deltaY;

        setLastPanPoint({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    useEffect(() => {
        drawTree();
    }, [zoom, isFullscreen]);

    return (
        <div
            className={`${
                isFullscreen
                    ? "fixed inset-0 z-50 bg-white dark:bg-[#1a1a1a]"
                    : "bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg"
            } transition-all duration-300`}
        >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                        <TreePine className="mr-2 h-5 w-5" />
                        Phylogenetic Tree
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Deep-sea eDNA biodiversity - Novel species and closest relatives
                    </p>
                </div>

                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                        <button
                            onClick={handleZoomOut}
                            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                            title="Zoom out"
                        >
                            <ZoomOut className="w-4 h-4" />
                        </button>
                        <span className="px-2 text-sm font-mono text-gray-600 dark:text-gray-300 min-w-12 text-center">
                            {Math.round(zoom * 100)}%
                        </span>
                        <button
                            onClick={handleZoomIn}
                            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                            title="Zoom in"
                        >
                            <ZoomIn className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleResetView}
                            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors text-xs"
                            title="Reset view"
                        >
                            Reset
                        </button>
                    </div>

                    <button
                        onClick={toggleFullscreen}
                        className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                    >
                        {isFullscreen ? (
                            <Minimize2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        ) : (
                            <Maximize2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        )}
                    </button>
                </div>
            </div>

            <div
                ref={containerRef}
                className={`${isFullscreen ? "h-full" : "h-96"} overflow-auto cursor-grab ${isDragging ? 'cursor-grabbing' : ''} relative`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <svg ref={svgRef} style={{ display: 'block' }}></svg>

                <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-700">
                    <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Legend</div>
                    <div className="space-y-1.5">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-[#7A7FEE] border-2 border-[#6366F1] flex-shrink-0"></div>
                            <span className="text-xs text-gray-700 dark:text-gray-300">Novel Species</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full border-2 flex-shrink-0" style={{ backgroundColor: domainColors.eukaryota, borderColor: d3.color(domainColors.eukaryota).darker(0.5) }}></div>
                            <span className="text-xs text-gray-700 dark:text-gray-300">Eukaryota Groups</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full border-2 flex-shrink-0 opacity-60" style={{ backgroundColor: `${domainColors.eukaryota}99`, borderColor: d3.color(domainColors.eukaryota).darker(0.5) }}></div>
                            <span className="text-xs text-gray-700 dark:text-gray-300">Known Species</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-[#6B7280] border-2 border-[#4B5563] flex-shrink-0"></div>
                            <span className="text-xs text-gray-700 dark:text-gray-300">More Species</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full bg-[#7A7FEE] border-2 border-[#6366F1]"></div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Novel Species</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full border-2" style={{ backgroundColor: domainColors.eukaryota, borderColor: d3.color(domainColors.eukaryota).darker(0.5) }}></div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Eukaryota Groups</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full border-2 opacity-60" style={{ backgroundColor: `${domainColors.eukaryota}99`, borderColor: d3.color(domainColors.eukaryota).darker(0.5) }}></div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Known Species</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full bg-[#6B7280] border-2 border-[#4B5563]"></div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">More Species</span>
                        </div>
                    </div>

                    <div className="text-xs text-gray-500 dark:text-gray-500">
                        &quot;&lt;...&gt;&quot; indicates additional species in database • Hover nodes to highlight lineage
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhylogeneticTree;