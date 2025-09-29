import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface TemporalTrendsProps {
  isClient: boolean;
}

export default function TemporalTrends({ isClient }: TemporalTrendsProps) {
  const timelineRef = useRef<HTMLDivElement>(null);

  const timelineData = [
    { date: "2024-01-15", sequences: 1245, diversity: 2.1 },
    { date: "2024-02-15", sequences: 2134, diversity: 2.8 },
    { date: "2024-03-15", sequences: 3456, diversity: 3.1 },
    { date: "2024-04-15", sequences: 4523, diversity: 3.3 },
    { date: "2024-05-15", sequences: 5203, diversity: 3.42 },
  ];

  // Timeline Chart
  useEffect(() => {
    if (!timelineRef.current || !isClient) return;

    const container = d3.select(timelineRef.current);
    container.selectAll("*").remove();

    const margin = { top: 20, right: 80, bottom: 40, left: 60 };
    const width = 700 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = container
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const parseTime = d3.timeParse("%Y-%m-%d");
    const data = timelineData.map((d) => ({
      ...d,
      date: parseTime(d.date),
    }));

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d: any) => d.date) as [Date, Date])
      .range([0, width]);

    const y1 = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d: any) => d.sequences) as number])
      .range([height, 0]);

    const y2 = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d: any) => d.diversity) as number])
      .range([height, 0]);

    const line1 = d3
      .line<any>()
      .x((d: any) => x(d.date))
      .y((d: any) => y1(d.sequences))
      .curve(d3.curveMonotoneX);

    const line2 = d3
      .line<any>()
      .x((d: any) => x(d.date))
      .y((d: any) => y2(d.diversity))
      .curve(d3.curveMonotoneX);

    // Add sequences line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#7A7FEE")
      .attr("stroke-width", 3)
      .attr("d", line1);

    // Add diversity line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#4ECDC4")
      .attr("stroke-width", 3)
      .attr("d", line2);

    // Add dots for sequences
    svg
      .selectAll(".dot1")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot1")
      .attr("cx", (d: any) => x(d.date))
      .attr("cy", (d: any) => y1(d.sequences))
      .attr("r", 5)
      .style("fill", "#7A7FEE")
      .on("mouseover", function (event: any, d: any) {
        // Create tooltip
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
          .html(
            `Sequences: ${d.sequences.toLocaleString()}<br/>Date: ${d3.timeFormat(
              "%b %Y"
            )(d.date)}`
          )
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px");
      })
      .on("mouseout", function () {
        container.selectAll(".tooltip").remove();
      });

    // Add dots for diversity
    svg
      .selectAll(".dot2")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot2")
      .attr("cx", (d: any) => x(d.date))
      .attr("cy", (d: any) => y2(d.diversity))
      .attr("r", 5)
      .style("fill", "#4ECDC4")
      .on("mouseover", function (event: any, d: any) {
        // Create tooltip
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
          .html(
            `Diversity: ${d.diversity.toFixed(2)}<br/>Date: ${d3.timeFormat(
              "%b %Y"
            )(d.date)}`
          )
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px");
      })
      .on("mouseout", function () {
        container.selectAll(".tooltip").remove();
      });

    // Add axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b %Y") as any));

    svg
      .append("g")
      .call(d3.axisLeft(y1))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .style("fill", "#7A7FEE")
      .style("font-size", "12px")
      .text("Sequences");

    svg
      .append("g")
      .attr("transform", `translate(${width},0)`)
      .call(d3.axisRight(y2))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .style("fill", "#4ECDC4")
      .style("font-size", "12px")
      .text("Diversity");

    // Add legend
    const legend = svg.append("g").attr("transform", `translate(10, 10)`);

    // Sequences legend
    legend
      .append("line")
      .attr("x1", 0)
      .attr("x2", 20)
      .attr("y1", 0)
      .attr("y2", 0)
      .style("stroke", "#7A7FEE")
      .style("stroke-width", 3);

    legend
      .append("text")
      .attr("x", 25)
      .attr("y", 0)
      .attr("dy", "0.35em")
      .style("font-size", "12px")
      .style("fill", "#333")
      .text("Sequences");

    // Diversity legend
    legend
      .append("line")
      .attr("x1", 0)
      .attr("x2", 20)
      .attr("y1", 20)
      .attr("y2", 20)
      .style("stroke", "#4ECDC4")
      .style("stroke-width", 3);

    legend
      .append("text")
      .attr("x", 25)
      .attr("y", 20)
      .attr("dy", "0.35em")
      .style("font-size", "12px")
      .style("fill", "#333")
      .text("Diversity");
  }, [isClient]);

  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        Temporal Analysis Trends
      </h3>
      <div ref={timelineRef} className="w-full overflow-x-auto"></div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-[#7A7FEE]/10 rounded-xl border border-[#7A7FEE]/20">
          <div className="text-sm text-[#7A7FEE] font-medium">
            Peak Sequencing
          </div>
          <div className="text-2xl font-bold text-[#7A7FEE]">May 2024</div>
        </div>
        <div className="p-4 bg-[#4ECDC4]/10 rounded-xl border border-[#4ECDC4]/20">
          <div className="text-sm text-[#4ECDC4] font-medium">
            Diversity Growth
          </div>
          <div className="text-2xl font-bold text-[#4ECDC4]">+62%</div>
        </div>
        <div className="p-4 bg-[#FF6B6B]/10 rounded-xl border border-[#FF6B6B]/20">
          <div className="text-sm text-[#FF6B6B] font-medium">
            Analysis Period
          </div>
          <div className="text-2xl font-bold text-[#FF6B6B]">5 Months</div>
        </div>
      </div>
    </div>
  );
}
