import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface AnalysisData {
  shannonDiversity: number;
  simpsonDiversity: number;
  pielouEvenness: number;
  coverageIndex: number;
}

interface DiversityAnalysisProps {
  isClient: boolean;
  analysisData: AnalysisData;
}

interface DiversityMetric {
  metric: string;
  observed: number;
  literature: number;
  status: string;
}

export default function DiversityAnalysis({
  isClient,
  analysisData,
}: DiversityAnalysisProps) {
  const diversityRef = useRef<HTMLDivElement>(null);

  const diversityMetrics: DiversityMetric[] = [
    {
      metric: "Shannon Diversity",
      observed: 3.42,
      literature: 2.8,
      status: "above",
    },
    {
      metric: "Simpson Index",
      observed: 0.891,
      literature: 0.75,
      status: "above",
    },
    {
      metric: "Pielou Evenness",
      observed: 0.782,
      literature: 0.65,
      status: "above",
    },
    {
      metric: "Species Richness",
      observed: 73,
      literature: 68,
      status: "above",
    },
  ];

  // Diversity Comparison Chart
  useEffect(() => {
    if (!diversityRef.current || !isClient) return;

    const container = d3.select(diversityRef.current);
    container.selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 100 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.bottom - margin.top;

    const svg = container
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const y = d3
      .scaleBand()
      .range([0, height])
      .domain(diversityMetrics.map((d) => d.metric))
      .padding(0.2);

    const x = d3
      .scaleLinear()
      .domain([
        0,
        (d3.max(diversityMetrics, (d) =>
          Math.max(d.observed, d.literature)
        ) as number) * 1.1,
      ])
      .range([0, width]);

    // Add bars for observed values
    svg
      .selectAll(".bar-observed")
      .data(diversityMetrics)
      .enter()
      .append("rect")
      .attr("class", "bar-observed")
      .attr("x", 0)
      .attr("y", (d: DiversityMetric) => y(d.metric) as number)
      .attr("width", 0)
      .attr("height", y.bandwidth() / 2)
      .style("fill", "#7A7FEE")
      .on("mouseover", function (event: any, d: DiversityMetric) {
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
          .html(`${d.metric}<br/>Observed: ${d.observed}`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px");
      })
      .on("mouseout", function () {
        container.selectAll(".tooltip").remove();
      })
      .transition()
      .duration(1000)
      .attr("width", (d: DiversityMetric) => x(d.observed));

    // Add bars for literature values
    svg
      .selectAll(".bar-literature")
      .data(diversityMetrics)
      .enter()
      .append("rect")
      .attr("class", "bar-literature")
      .attr("x", 0)
      .attr(
        "y",
        (d: DiversityMetric) => (y(d.metric) as number) + y.bandwidth() / 2
      )
      .attr("width", 0)
      .attr("height", y.bandwidth() / 2)
      .style("fill", "#FF6B6B")
      .style("opacity", 0.7)
      .on("mouseover", function (event: any, d: DiversityMetric) {
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
          .html(`${d.metric}<br/>Literature: ${d.literature}`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px");
      })
      .on("mouseout", function () {
        container.selectAll(".tooltip").remove();
      })
      .transition()
      .duration(1000)
      .delay(500)
      .attr("width", (d: DiversityMetric) => x(d.literature));

    // Add axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    // Add legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - 120}, 10)`);

    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 12)
      .attr("height", 12)
      .style("fill", "#7A7FEE");

    legend
      .append("text")
      .attr("x", 18)
      .attr("y", 9)
      .style("font-size", "12px")
      .style("fill", "#333")
      .text("Observed");

    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 20)
      .attr("width", 12)
      .attr("height", 12)
      .style("fill", "#FF6B6B")
      .style("opacity", 0.7);

    legend
      .append("text")
      .attr("x", 18)
      .attr("y", 29)
      .style("font-size", "12px")
      .style("fill", "#333")
      .text("Literature");
  }, [isClient]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Diversity Metrics Comparison */}
      <div className="lg:col-span-2 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"></path><rect x="7" y="12" width="3" height="6"></rect><rect x="12" y="9" width="3" height="9"></rect><rect x="17" y="5" width="3" height="13"></rect></svg>
          Diversity Metrics vs Literature
        </h3>
        <div ref={diversityRef}></div>
      </div>

      {/* Diversity Summary */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 9h6"></path><path d="M9 13h6"></path><path d="M9 17h6"></path><rect x="4" y="4" width="16" height="16" rx="2"></rect></svg>
          Summary
        </h3>
        <div className="space-y-4">
          {[
            {
              metric: "Shannon H'",
              value: analysisData.shannonDiversity,
              unit: "",
              color: "text-[#7A7FEE]",
            },
            {
              metric: "Simpson D",
              value: analysisData.simpsonDiversity,
              unit: "",
              color: "text-[#4ECDC4]",
            },
            {
              metric: "Pielou J'",
              value: analysisData.pielouEvenness,
              unit: "",
              color: "text-[#FF6B6B]",
            },
            {
              metric: "Coverage",
              value: analysisData.coverageIndex,
              unit: "",
              color: "text-[#45B7D1]",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-4 bg-gray-200 dark:bg-[#111111] rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div className="font-medium text-gray-700 dark:text-gray-300">
                  {item.metric}
                </div>
                <div className={`text-xl font-bold ${item.color}`}>
                  {item.value.toFixed(3)}
                  {item.unit}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
