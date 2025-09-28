import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface AnalysisData {
  totalSequences: number;
  filteredSequences: number;
  taxonomicClusters: number;
  novelTaxa: number;
  shannonDiversity: number;
  simpsonDiversity: number;
  pielouEvenness: number;
  coverageIndex: number;
}

interface TaxonomicOverviewProps {
  isClient: boolean;
  analysisData: AnalysisData;
}

interface TaxonomicItem {
  name: string;
  value: number;
  color: string;
  children?: TaxonomicItem[];
}

export default function TaxonomicOverview({
  isClient,
  analysisData,
}: TaxonomicOverviewProps) {
  const sunburstRef = useRef<HTMLDivElement>(null);

  const taxonomicData: TaxonomicItem[] = [
    {
      name: "Bacteria",
      value: 98.5,
      color: "#3B82F6", // Bright Blue
      children: [
        { name: "Proteobacteria", value: 99.2, color: "#1E40AF" },
        { name: "Firmicutes", value: 98.8, color: "#2563EB" },
        { name: "Bacteroidetes", value: 98.1, color: "#60A5FA" },
      ],
    },
    {
      name: "Archaea",
      value: 96.8,
      color: "#EF4444", // Bright Red
      children: [
        { name: "Euryarchaeota", value: 97.3, color: "#DC2626" },
        { name: "Thaumarchaeota", value: 96.2, color: "#F87171" },
      ],
    },
    {
      name: "Eukaryota",
      value: 94.2,
      color: "#10B981", // Emerald Green
      children: [
        { name: "Fungi", value: 95.1, color: "#059669" },
        { name: "Protists", value: 93.3, color: "#34D399" },
      ],
    },
    {
      name: "Viruses",
      value: 89.3,
      color: "#8B5CF6", // Purple
      children: [
        { name: "DNA Viruses", value: 90.7, color: "#7C3AED" },
        { name: "RNA Viruses", value: 87.9, color: "#A78BFA" },
      ],
    },
    {
      name: "Unclassified",
      value: 85.1,
      color: "#F59E0B", // Amber/Orange
      children: [
        { name: "Unknown Bacteria", value: 86.4, color: "#D97706" },
        { name: "Novel Sequences", value: 83.8, color: "#FCD34D" },
      ],
    },
  ];

  // Function to calculate area distribution based on ranking
  const calculateRankingBasedAreas = (data: TaxonomicItem[]) => {
    // Sort by similarity score (descending) to establish ranking
    const sortedData = [...data].sort((a, b) => b.value - a.value);
    
    // Assign ranking-based weights using inverse ranking formula
    const totalRanks = sortedData.length;
    const rankWeights = sortedData.map((_, index) => {
      const rank = index + 1;
      return Math.pow(totalRanks - rank + 1, 1.5);
    });
    
    const totalWeight = rankWeights.reduce((sum, weight) => sum + weight, 0);
    
    // Calculate percentage areas based on weights
    return sortedData.map((item, index) => ({
      ...item,
      rank: index + 1,
      areaPercentage: (rankWeights[index] / totalWeight) * 100,
      pieValue: rankWeights[index]
    }));
  };

  // Multi-layer Donut Chart
  useEffect(() => {
    if (!sunburstRef.current || !isClient) return;

    const container = d3.select(sunburstRef.current);
    container.selectAll("*").remove();

    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2 - 20;

    const svg = container
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Calculate ranking-based areas
    const rankedData = calculateRankingBasedAreas(taxonomicData);

    // Create pie generator for main categories
    const mainPie = d3.pie<any>()
      .value((d: any) => d.pieValue)
      .sort(null)
      .padAngle(0.005);

    // Inner ring arc generator
    const innerArc = d3.arc<d3.PieArcDatum<any>>()
      .innerRadius(0)
      .outerRadius(radius * 0.65);

    // Outer ring arc generator
    const outerArc = d3.arc<d3.PieArcDatum<any>>()
      .innerRadius(radius * 0.65)
      .outerRadius(radius * 1.0);

    const mainPieData = mainPie(rankedData);

    // Draw inner ring (main categories)
    const innerSegments = svg
      .selectAll(".inner-segment")
      .data(mainPieData)
      .enter()
      .append("path")
      .attr("class", "inner-segment")
      .attr("d", innerArc)
      .style("fill", (d: any) => d.data.color)
      .style("stroke", "#2a2a2a")
      .style("stroke-width", 1.5)
      .style("opacity", 0.9);

    // Prepare data for outer ring (subcategories)
    const outerRingData: any[] = [];
    let cumulativeAngle = 0;

    mainPieData.forEach((parentSegment: any) => {
      const parent = parentSegment.data;
      const parentAngleSpan = parentSegment.endAngle - parentSegment.startAngle;
      
      if (parent.children && parent.children.length > 0) {
        // Calculate total value of children for proportional distribution
        const totalChildValue = parent.children.reduce((sum: number, child: any) => sum + child.value, 0);
        
        // Sort children by similarity score to determine color intensity
        const sortedChildren = [...parent.children].sort((a: any, b: any) => b.value - a.value);
        const maxChildValue = sortedChildren[0].value;
        const minChildValue = sortedChildren[sortedChildren.length - 1].value;
        
        let childStartAngle = parentSegment.startAngle;
        
        parent.children.forEach((child: any) => {
          // Calculate proportional angle for this child within parent's span
          const childProportion = child.value / totalChildValue;
          const childAngleSpan = parentAngleSpan * childProportion;
          const childEndAngle = childStartAngle + childAngleSpan;
          
          // Calculate color intensity based on similarity score
          const intensityFactor = (child.value - minChildValue) / (maxChildValue - minChildValue);
          const darkerColor = d3.color(child.color)?.darker(0.5 + intensityFactor * 0.8) || child.color;
          
          outerRingData.push({
            data: child,
            startAngle: childStartAngle,
            endAngle: childEndAngle,
            parentData: parent,
            adjustedColor: darkerColor
          });
          
          childStartAngle = childEndAngle;
        });
      }
    });

    // Draw outer ring (subcategories)
    const outerSegments = svg
      .selectAll(".outer-segment")
      .data(outerRingData)
      .enter()
      .append("path")
      .attr("class", "outer-segment")
      .attr("d", outerArc)
      .style("fill", (d: any) => d.adjustedColor)
      .style("stroke", "#2a2a2a")
      .style("stroke-width", 0.8)
      .style("opacity", 0.85);

    // Add hover effects for inner ring
    innerSegments
      .on("mouseover", function (event: any, d: any) {
        d3.select(this).style("opacity", 1);
        
        // Highlight corresponding outer segments
        outerSegments
          .style("opacity", (od: any) => od.parentData.name === d.data.name ? 1 : 0.3);
        
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
            <div><strong>${d.data.name}</strong></div>
            <div>Similarity: ${d.data.value}%</div>
            <div>Rank: #${d.data.rank}</div>
          `)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).style("opacity", 0.9);
        outerSegments.style("opacity", 0.85);
        container.selectAll(".tooltip").remove();
      });

    // Add hover effects for outer ring
    outerSegments
      .on("mouseover", function (event: any, d: any) {
        d3.select(this).style("opacity", 1);
        
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
            <div><strong>${d.data.name}</strong></div>
            <div>Parent: ${d.parentData.name}</div>
            <div>Similarity: ${d.data.value}%</div>
          `)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).style("opacity", 0.85);
        container.selectAll(".tooltip").remove();
      });

  }, [isClient, analysisData.totalSequences]);

  // Calculate ranked data for display
  const rankedDisplayData = calculateRankingBasedAreas(taxonomicData);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Multi-layer Donut Chart */}
      <div className="lg:col-span-2 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
          <span className="mr-3 text-2xl">🔬</span>
          Similarity Analysis
        </h3>
        <div ref={sunburstRef} className="flex justify-center items-center min-h-[500px]"></div>
      </div>

      {/* Color Legend */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <span className="mr-2">📊</span>
          Similarity Rankings
        </h3>
        <div className="space-y-4">
          {rankedDisplayData.map((group, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-[#111111] rounded-lg">
                <div 
                  className="w-4 h-4 rounded-full shadow-sm" 
                  style={{ backgroundColor: group.color }}
                ></div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">
                    {group.name}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {group.value}% similarity
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-gray-800 dark:text-gray-200">
                    Rank #{group.rank}
                  </div>
                </div>
              </div>
              {group.children && (
                <div className="ml-4 space-y-2">
                  {group.children.map((child, childIndex) => (
                    <div key={childIndex} className="flex items-center space-x-2 text-xs">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: child.color }}
                      ></div>
                      <span className="text-gray-700 dark:text-gray-300">{child.name}</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        ({child.value}%)
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}