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
      value: 2845,
      color: "#7A7FEE",
      children: [
        { name: "Proteobacteria", value: 1234, color: "#8B86FF" },
        { name: "Firmicutes", value: 856, color: "#9C95FF" },
        { name: "Bacteroidetes", value: 755, color: "#ADA4FF" },
      ],
    },
    {
      name: "Archaea",
      value: 1256,
      color: "#FF6B6B",
      children: [
        { name: "Euryarchaeota", value: 723, color: "#FF7F7F" },
        { name: "Thaumarchaeota", value: 533, color: "#FF9393" },
      ],
    },
    {
      name: "Eukaryota",
      value: 867,
      color: "#4ECDC4",
      children: [
        { name: "Fungi", value: 456, color: "#5ED5CC" },
        { name: "Protists", value: 411, color: "#6EDDD4" },
      ],
    },
    {
      name: "Viruses",
      value: 235,
      color: "#45B7D1",
      children: [
        { name: "DNA Viruses", value: 134, color: "#5BC3D7" },
        { name: "RNA Viruses", value: 101, color: "#71CFDD" },
      ],
    },
  ];

  // Sunburst Chart
  useEffect(() => {
    if (!sunburstRef.current || !isClient) return;

    const container = d3.select(sunburstRef.current);
    container.selectAll("*").remove();

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const svg = container
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const hierarchy = d3
      .hierarchy<TaxonomicItem>({ children: taxonomicData } as any)
      .sum((d: any) => d.value || 0)
      .sort((a: any, b: any) => (b.value || 0) - (a.value || 0));

    const partition = d3.partition<TaxonomicItem>().size([2 * Math.PI, radius]);
    const arc = d3
      .arc<d3.HierarchyRectangularNode<TaxonomicItem>>()
      .startAngle((d: any) => d.x0)
      .endAngle((d: any) => d.x1)
      .innerRadius((d: any) => d.y0)
      .outerRadius((d: any) => d.y1);

    partition(hierarchy);

    svg
      .selectAll("path")
      .data(hierarchy.descendants().slice(1))
      .enter()
      .append("path")
      .attr("d", arc)
      .style("fill", (d: any) => d.data.color)
      .style("stroke", "#111")
      .style("stroke-width", 2)
      .style("opacity", 0.8)
      .on("mouseover", function (event: any, d: any) {
        d3.select(this).style("opacity", 1);
        const tooltip = container
          .append("div")
          .attr("class", "tooltip")
          .style("position", "absolute")
          .style("background", "rgba(0,0,0,0.8)")
          .style("color", "white")
          .style("padding", "8px")
          .style("border-radius", "4px")
          .style("font-size", "12px")
          .style("pointer-events", "none")
          .style("z-index", "1000")
          .html(`${d.data.name}: ${d.value.toLocaleString()} sequences`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).style("opacity", 0.8);
        container.selectAll(".tooltip").remove();
      });

    // Add center text
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.5em")
      .style("font-size", "24px")
      .style("font-weight", "bold")
      .style("fill", "#7A7FEE")
      .text(analysisData.totalSequences.toLocaleString());

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1em")
      .style("font-size", "14px")
      .style("fill", "#666")
      .text("Total Sequences");
  }, [isClient, analysisData.totalSequences]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Sunburst Chart */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <span className="mr-2">🌍</span>
          Taxonomic Distribution
        </h3>
        <div ref={sunburstRef} className="flex justify-center"></div>
      </div>

      {/* Key Insights */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <span className="mr-2">💡</span>
          Key Insights
        </h3>
        <div className="space-y-4">
          {[
            {
              title: "Dominant Group",
              value: "Bacteria (48.7%)",
              status: "normal",
              icon: "🦠",
            },
            {
              title: "Diversity Index",
              value: "3.42 (Shannon)",
              status: "high",
              icon: "📊",
            },
            {
              title: "Novel Species",
              value: `${analysisData.novelTaxa} identified`,
              status: "high",
              icon: "🌟",
            },
            {
              title: "Coverage",
              value: "94% complete",
              status: "excellent",
              icon: "✅",
            },
          ].map((insight, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#111111] rounded-xl"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{insight.icon}</span>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {insight.title}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {insight.value}
                  </div>
                </div>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  insight.status === "excellent"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    : insight.status === "high"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                {insight.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
