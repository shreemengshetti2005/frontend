import React, { useRef, useEffect, useState } from "react";
import { TreePine, ZoomIn, ZoomOut, Maximize2, Minimize2 } from "lucide-react";
import * as d3 from "d3";

interface TreeNode {
    name: string;
    children?: TreeNode[];
    novel?: boolean;
    isEllipsis?: boolean;
}

const treeData: TreeNode = {
    name: "Eukaryota",
    children: [
        { name: "...", isEllipsis: true },
        {
            name: "Excavata",
            children: [
                { name: "...", isEllipsis: true },
                { name: "Fornicata sp." },
                { name: "Euglenozoa sp." },
                { name: "...", isEllipsis: true },
            ]
        },
        {
            name: "SAR",
            children: [
                { name: "...", isEllipsis: true },
                {
                    name: "Stramenopiles",
                    children: [
                        { name: "...", isEllipsis: true },
                        { name: "Bacillariophyta sp. 1" },
                        { name: "Bacillariophyta sp. 2" },
                        { name: "Phaeophyceae sp." },
                        { name: "Novel Species X", novel: true },
                        { name: "Chrysophyceae sp." },
                        { name: "Bacillariophyta sp. 3" },
                        { name: "Labyrinthulomycetes sp." },
                        { name: "...", isEllipsis: true }
                    ]
                },
                {
                    name: "Alveolata",
                    children: [
                        { name: "...", isEllipsis: true },
                        { name: "Dinoflagellate sp. 1" },
                        { name: "Ciliophora sp." },
                        { name: "...", isEllipsis: true },
                    ]
                },
                {
                    name: "Rhizaria",
                    children: [
                        { name: "Foraminifera sp." },
                        { name: "Radiolaria sp." },
                    ]
                },
                { name: "...", isEllipsis: true },
            ],
        },
        {
            name: "Archaeplastida",
            children: [
                { name: "...", isEllipsis: true },
                { name: "Chlorophyta sp." },
                { name: "Rhodophyta sp." },
                { name: "...", isEllipsis: true },
            ]
        },
        {
            name: "Amoebozoa",
            children: [
                { name: "...", isEllipsis: true },
                { name: "Tubulinea sp." },
                { name: "Discosea sp." },
                { name: "...", isEllipsis: true },
            ]
        },
        {
            name: "Opisthokonta",
            children: [
                { name: "...", isEllipsis: true },
                {
                    name: "Fungi",
                    children: [
                        { name: "...", isEllipsis: true },
                        { name: "Ascomycota sp." },
                        { name: "Basidiomycota sp." },
                        { name: "...", isEllipsis: true },
                    ]
                },
                {
                    name: "Metazoa",
                    children: [
                        { name: "...", isEllipsis: true },
                        { name: "Cnidaria sp." },
                        { name: "Arthropoda sp." },
                        { name: "Nematoda sp." },
                        { name: "...", isEllipsis: true },
                    ]
                },
                { name: "Choanoflagellate sp." },
                { name: "...", isEllipsis: true },
            ],
        },
        {
            name: "Haptophyta",
            children: [
                { name: "...", isEllipsis: true },
                { name: "Coccolithophore sp." },
                { name: "...", isEllipsis: true },
            ]
        },
        {
            name: "Cryptophyta",
            children: [
                { name: "...", isEllipsis: true },
                { name: "Cryptomonas sp." },
                { name: "...", isEllipsis: true },
            ]
        },
        { name: "...", isEllipsis: true },
    ],
};

const PhylogeneticTree: React.FC = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });

    const drawTree = () => {
        if (!svgRef.current || !containerRef.current) return;

        // Get container dimensions
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;

        // Base tree dimensions - increased to fit all nodes
        const baseWidth = 1600;
        const baseHeight = 1400;
        const padding = 100;

        // Actual dimensions with zoom
        const actualWidth = baseWidth * zoom;
        const actualHeight = baseHeight * zoom;

        const svg = d3.select(svgRef.current)
            .attr("width", actualWidth)
            .attr("height", actualHeight)
            .style("font", "14px sans-serif")
            .style("display", "block");

        svg.selectAll("*").remove();

        // Create main group
        const mainGroup = svg.append("g");

        const root = d3.hierarchy(treeData);
        const treeLayout = d3.tree<TreeNode>().size([baseHeight - padding * 2, baseWidth - 400]);
        treeLayout(root);

        // Create gradient for links
        const defs = svg.append("defs");
        const gradient = defs.append("linearGradient")
            .attr("id", "linkGradient")
            .attr("gradientUnits", "userSpaceOnUse");

        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#7A7FEE")
            .attr("stop-opacity", 0.6);

        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#4ECDC4")
            .attr("stop-opacity", 0.8);

        // Links
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
                .linkHorizontal<any, any>()
                .x((d) => (d.y + 200) * zoom)
                .y((d) => (d.x + padding) * zoom)
            )
            .style("opacity", 0.8);

        // Node groups
        const nodeGroup = mainGroup
            .append("g")
            .selectAll("g")
            .data(root.descendants())
            .join("g")
            .attr("transform", (d) => `translate(${(d.y + 200) * zoom},${(d.x + padding) * zoom})`)
            .style("cursor", "pointer");

        // Node backgrounds
        nodeGroup
            .append("circle")
            .attr("r", 15 * zoom)
            .attr("fill", "rgba(255, 255, 255, 0.9)")
            .attr("stroke", "none")
            .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.1))");

        // Main circles
        nodeGroup
            .append("circle")
            .attr("r", 10 * zoom)
            .attr("fill", (d) => {
                if (d.data.isEllipsis) return "#9CA3AF";
                if (d.data.novel) return "#7A7FEE";
                if (d.children) return "#4ECDC4";
                return "#ffffff";
            })
            .attr("stroke", (d) => {
                if (d.data.isEllipsis) return "#6B7280";
                if (d.data.novel) return "#6366F1";
                if (d.children) return "#06B6D4";
                return "#9CA3AF";
            })
            .attr("stroke-width", 3 * zoom);

        // Hover effects for nodes
        nodeGroup
            .on("mouseover", function(event, d) {
                d3.select(this).select("circle:last-child")
                    .transition()
                    .duration(200)
                    .attr("r", 12 * zoom)
                    .attr("stroke-width", 4 * zoom);

                // Highlight path to root
                const pathToRoot: any[] = [];
                let current = d;
                while (current) {
                    pathToRoot.push(current);
                    current = current.parent as any;
                }

                linkGroup.selectAll("path")
                    .style("opacity", (linkD: any) => {
                        const isInPath = pathToRoot.includes(linkD.target) && pathToRoot.includes(linkD.source);
                        return isInPath ? 1 : 0.3;
                    })
                    .style("stroke-width", (linkD: any) => {
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

        // Labels
        nodeGroup
            .append("text")
            .attr("dy", "0.32em")
            .attr("x", (d) => (d.children ? -20 : 20) * zoom)
            .attr("text-anchor", (d) => (d.children ? "end" : "start"))
            .attr("font-weight", (d) => d.data.novel ? "bold" : "normal")
            .attr("fill", (d) => {
                if (d.data.isEllipsis) return "#6B7280";
                return d.data.novel ? "#7A7FEE" : "#374151";
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

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.target === svgRef.current || (e.target as Element).closest('svg')) {
            setIsDragging(true);
            setLastPanPoint({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
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
                    {/* Zoom Controls */}
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

                    {/* Fullscreen Button */}
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
                className={`${isFullscreen ? "h-full" : "h-96"} overflow-auto cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <svg ref={svgRef} style={{ display: 'block' }}></svg>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full bg-[#7A7FEE] border-2 border-[#6366F1]"></div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Novel Species</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full bg-[#4ECDC4] border-2 border-[#06B6D4]"></div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Parent Groups</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full bg-white border-2 border-gray-400"></div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Known Species</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full bg-[#9CA3AF] border-2 border-[#6B7280]"></div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">More Species (...)</span>
                        </div>
                    </div>

                    <div className="text-xs text-gray-500 dark:text-gray-500">
                        "..." indicates additional species in database • Hover nodes to highlight lineage
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhylogeneticTree;