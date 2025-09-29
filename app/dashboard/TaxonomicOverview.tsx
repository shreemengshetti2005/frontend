import React, { useEffect, useRef } from "react";
import { Target, Trophy } from "lucide-react";
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
      color: "#3B82F6",
      children: [
        { name: "Proteobacteria", value: 99.2, color: "#1E40AF" },
        { name: "Firmicutes", value: 98.8, color: "#2563EB" },
        { name: "Bacteroidetes", value: 98.1, color: "#60A5FA" },
      ],
    },
    {
      name: "Archaea",
      value: 96.8,
      color: "#EF4444",
      children: [
        { name: "Euryarchaeota", value: 97.3, color: "#DC2626" },
        { name: "Thaumarchaeota", value: 96.2, color: "#F87171" },
      ],
    },
    {
      name: "Eukaryota",
      value: 94.2,
      color: "#10B981",
      children: [
        { name: "Fungi", value: 95.1, color: "#059669" },
        { name: "Protists", value: 93.3, color: "#34D399" },
      ],
    },
    {
      name: "Viruses",
      value: 89.3,
      color: "#8B5CF6",
      children: [
        { name: "DNA Viruses", value: 90.7, color: "#7C3AED" },
        { name: "RNA Viruses", value: 87.9, color: "#A78BFA" },
      ],
    },
    {
      name: "Unclassified",
      value: 85.1,
      color: "#F59E0B",
      children: [
        { name: "Unknown Bacteria", value: 86.4, color: "#D97706" },
        { name: "Novel Sequences", value: 83.8, color: "#FCD34D" },
      ],
    },
  ];

  const calculateRankingBasedAreas = (data: TaxonomicItem[]) => {
    const sortedData = [...data].sort((a, b) => b.value - a.value);
    const totalRanks = sortedData.length;
    const rankWeights = sortedData.map((_, index) => {
      const rank = index + 1;
      return Math.pow(totalRanks - rank + 1, 1.5);
    });
    const totalWeight = rankWeights.reduce((sum, weight) => sum + weight, 0);
    return sortedData.map((item, index) => ({
      ...item,
      rank: index + 1,
      areaPercentage: (rankWeights[index] / totalWeight) * 100,
      pieValue: rankWeights[index],
    }));
  };

  useEffect(() => {
    if (!sunburstRef.current || !isClient) return;

    const container = d3.select(sunburstRef.current);
    container.selectAll("*").remove();

    const width = 700;
    const height = 700;
    const radius = Math.min(width, height) / 2 - 120;

    const svg = container
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const rankedData = calculateRankingBasedAreas(taxonomicData);

    const mainPie = d3
      .pie<any>()
      .value((d: any) => d.pieValue)
      .sort(null)
      .padAngle(0.005);

    const innerArc = d3
      .arc<d3.PieArcDatum<any>>()
      .innerRadius(0)
      .outerRadius(radius * 0.65);

    const outerArc = d3
      .arc<d3.PieArcDatum<any>>()
      .innerRadius(radius * 0.65)
      .outerRadius(radius * 1.0);

    const mainPieData = mainPie(rankedData);

    // Draw inner ring
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

    // Prepare outer ring data
    const outerRingData: any[] = [];
    mainPieData.forEach((parentSegment: any) => {
      const parent = parentSegment.data;
      const parentAngleSpan = parentSegment.endAngle - parentSegment.startAngle;

      if (parent.children && parent.children.length > 0) {
        const totalChildValue = parent.children.reduce(
          (sum: number, child: any) => sum + child.value,
          0
        );
        const sortedChildren = [...parent.children].sort(
          (a: any, b: any) => b.value - a.value
        );
        const maxChildValue = sortedChildren[0].value;
        const minChildValue = sortedChildren[sortedChildren.length - 1].value;

        let childStartAngle = parentSegment.startAngle;

        parent.children.forEach((child: any) => {
          const childProportion = child.value / totalChildValue;
          const childAngleSpan = parentAngleSpan * childProportion;
          const childEndAngle = childStartAngle + childAngleSpan;
          const intensityFactor =
            (child.value - minChildValue) / (maxChildValue - minChildValue);
          const darkerColor =
            d3.color(child.color)?.darker(0.5 + intensityFactor * 0.8) ||
            child.color;

          outerRingData.push({
            data: child,
            startAngle: childStartAngle,
            endAngle: childEndAngle,
            parentData: parent,
            adjustedColor: darkerColor,
          });

          childStartAngle = childEndAngle;
        });
      }
    });

    // Draw outer ring
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

    // Add labels with leader lines for outer ring (subcategories)
    const labelGroup = svg.append("g").attr("class", "labels");

    // Separate labels into left and right sides for better collision detection
    const leftLabels: any[] = [];
    const rightLabels: any[] = [];

    outerRingData.forEach((d: any, i: number) => {
      const centroid = outerArc.centroid(d);
      const midAngle = (d.startAngle + d.endAngle) / 2;
      const isRightSide = midAngle < Math.PI;

      const labelData = {
        data: d,
        centroid,
        midAngle,
        isRightSide,
        y: Math.sin(midAngle - Math.PI / 2) * radius * 1.35,
      };

      if (isRightSide) {
        rightLabels.push(labelData);
      } else {
        leftLabels.push(labelData);
      }
    });

    // Sort labels by vertical position
    leftLabels.sort((a, b) => a.y - b.y);
    rightLabels.sort((a, b) => a.y - b.y);

    // Adjust label positions to prevent overlap
    const adjustLabelPositions = (labels: any[], minSpacing: number) => {
      for (let i = 1; i < labels.length; i++) {
        const current = labels[i];
        const previous = labels[i - 1];

        if (current.y - previous.y < minSpacing) {
          current.y = previous.y + minSpacing;
        }
      }
    };

    adjustLabelPositions(leftLabels, 35);
    adjustLabelPositions(rightLabels, 35);

    // Draw labels for both sides
    const drawLabels = (labels: any[]) => {
      labels.forEach((labelData: any) => {
        const { data: d, centroid, midAngle, isRightSide, y } = labelData;
        const x = Math.cos(midAngle - Math.PI / 2) * radius * 1.35;

        const textAnchor = isRightSide ? "start" : "end";
        const textX = isRightSide ? x + 15 : x - 15;

        // Calculate smooth curved path for leader line
        const outerPoint = outerArc.centroid(d);
        const bendPoint = [
          Math.cos(midAngle - Math.PI / 2) * radius * 1.15,
          Math.sin(midAngle - Math.PI / 2) * radius * 1.15,
        ];
        const endPoint = [textX - (isRightSide ? 5 : -5), y];

        // Create a smooth path using cubic bezier
        const pathData = `
          M ${outerPoint[0]},${outerPoint[1]}
          L ${bendPoint[0]},${bendPoint[1]}
          L ${endPoint[0]},${endPoint[1]}
        `;

        labelGroup
          .append("path")
          .datum(d)
          .attr("d", pathData)
          .style("fill", "none")
          .style("stroke", d.data.color)
          .style("stroke-width", 1.2)
          .style("opacity", 0.6);

        // Add label text
        const text = labelGroup
          .append("text")
          .datum(d)
          .attr("x", textX)
          .attr("y", y)
          .attr("text-anchor", textAnchor)
          .style("font-size", "14px")
          .style("font-weight", "600")
          .style("fill", "#e5e7eb")
          .style("pointer-events", "none");

        text.append("tspan").text(d.data.name).attr("x", textX).attr("dy", "0");

        text
          .append("tspan")
          .text(`${d.data.value}%`)
          .attr("x", textX)
          .attr("dy", "1.2em")
          .style("font-size", "12px")
          .style("fill", "#9ca3af");
      });
    };

    drawLabels(leftLabels);
    drawLabels(rightLabels);

    // Hover effects for inner ring
    innerSegments
      .on("mouseover", function (event: any, d: any) {
        d3.select(this).style("opacity", 1).style("cursor", "pointer");
        outerSegments.style("opacity", (od: any) =>
          od.parentData.name === d.data.name ? 1 : 0.3
        );

        // Highlight corresponding outer ring labels
        labelGroup
          .selectAll("path")
          .style("opacity", function (this: any) {
            const polylineData = d3.select(this).datum();
            return polylineData &&
              polylineData.parentData &&
              polylineData.parentData.name === d.data.name
              ? 0.9
              : 0.15;
          })
          .style("stroke-width", function (this: any) {
            const polylineData = d3.select(this).datum();
            return polylineData &&
              polylineData.parentData &&
              polylineData.parentData.name === d.data.name
              ? 2
              : 1.2;
          });

        labelGroup.selectAll("text").style("opacity", function (this: any) {
          const textData = d3.select(this).datum();
          return textData &&
            textData.parentData &&
            textData.parentData.name === d.data.name
            ? 1
            : 0.3;
        });
      })
      .on("mouseout", function () {
        d3.select(this).style("opacity", 0.9);
        outerSegments.style("opacity", 0.85);
        labelGroup
          .selectAll("path")
          .style("opacity", 0.6)
          .style("stroke-width", 1.2);
        labelGroup.selectAll("text").style("opacity", 1);
      });

    // Hover effects for outer ring with detailed tooltip and label highlighting
    outerSegments
      .on("mouseover", function (event: any, d: any) {
        d3.select(this).style("opacity", 1).style("cursor", "pointer");

        // Highlight this segment's label
        labelGroup
          .selectAll("path")
          .style("opacity", function (ld: any) {
            return ld === d ? 0.9 : 0.15;
          })
          .style("stroke-width", function (ld: any) {
            return ld === d ? 2 : 1.2;
          });

        labelGroup.selectAll("text").style("opacity", function (ld: any) {
          return ld === d ? 1 : 0.3;
        });

        const tooltip = container
          .append("div")
          .attr("class", "tooltip")
          .style("position", "absolute")
          .style("background", "rgba(0,0,0,0.95)")
          .style("color", "white")
          .style("padding", "14px 18px")
          .style("border-radius", "10px")
          .style("font-size", "13px")
          .style("font-weight", "500")
          .style("pointer-events", "none")
          .style("z-index", "1000")
          .style("box-shadow", "0 10px 40px rgba(0,0,0,0.4)")
          .style("border", `2px solid ${d.data.color}`)
          .html(
            `
            <div style="font-size: 15px; font-weight: 700; margin-bottom: 8px;">${d.data.name}</div>
            <div style="color: #94a3b8; margin-bottom: 4px;">Parent: ${d.parentData.name}</div>
            <div style="font-size: 14px; color: #60a5fa;">Similarity: ${d.data.value}%</div>
          `
          )
          .style("left", event.pageX + 15 + "px")
          .style("top", event.pageY - 10 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).style("opacity", 0.85);
        labelGroup
          .selectAll("path")
          .style("opacity", 0.6)
          .style("stroke-width", 1.2);
        labelGroup.selectAll("text").style("opacity", 1);
        container.selectAll(".tooltip").remove();
      });
  }, [isClient, analysisData.totalSequences]);

  const rankedDisplayData = calculateRankingBasedAreas(taxonomicData);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
          <Target className="mr-3 h-6 w-6" />
          Similarity Analysis
        </h3>
        <div
          ref={sunburstRef}
          className="flex justify-center items-center"
        ></div>
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <Trophy className="mr-2 h-5 w-5" />
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
                    <div
                      key={childIndex}
                      className="flex items-center space-x-2 text-xs"
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: child.color }}
                      ></div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {child.name}
                      </span>
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
