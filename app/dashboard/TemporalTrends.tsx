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

  useEffect(() => {
    if (!timelineRef.current || !isClient) return;

    const container = d3.select(timelineRef.current);
    container.selectAll("*").remove();

    const margin = { top: 20, right: 80, bottom: 40, left: 60 };
    const width = 700 - margin.left - margin.right;
    const height = 320 - margin.top - margin.bottom;

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

    // X scale
    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d: any) => d.date) as [Date, Date])
      .range([0, width]);

    // Y1 scale for sequences
    const y1 = d3
      .scaleLinear()
      .domain([0, (d3.max(data, (d: any) => d.sequences) as number) * 1.1])
      .range([height, 0])
      .nice();

    // Y2 scale for diversity
    const y2 = d3
      .scaleLinear()
      .domain([0, (d3.max(data, (d: any) => d.diversity) as number) * 1.1])
      .range([height, 0])
      .nice();

    // Line generators
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

    // Sequences line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#7A7FEE")
      .attr("stroke-width", 3)
      .attr("d", line1);

    // Diversity line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#4ECDC4")
      .attr("stroke-width", 3)
      .attr("d", line2);

    // Axes with gridlines
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b %Y") as any));

    svg
      .append("g")
      .call(d3.axisLeft(y1).ticks(6).tickSize(-width).tickFormat(d3.format("~s")))
      .selectAll("line")
      .style("stroke", "#e0e0e0");

    svg
      .append("g")
      .attr("transform", `translate(${width},0)`)
      .call(d3.axisRight(y2).ticks(6).tickSize(0));

    // Helper to add dots + tooltips
    const addDots = (
      className: string,
      color: string,
      yScale: any,
      valueKey: string,
      formatter: (d: any) => string
    ) => {
      svg
        .selectAll("." + className)
        .data(data)
        .enter()
        .append("circle")
        .attr("class", className)
        .attr("cx", (d: any) => x(d.date))
        .attr("cy", (d: any) => yScale(d[valueKey]))
        .attr("r", 5)
        .style("fill", color)
        .on("mouseover", function (event: any, d: any) {
          const tooltip = container
            .append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("background", "rgba(0,0,0,0.8)")
            .style("color", "white")
            .style("padding", "6px 10px")
            .style("border-radius", "4px")
            .style("font-size", "12px")
            .style("pointer-events", "none")
            .style("z-index", "1000")
            .html(formatter(d))
            .style("left", event.clientX + 12 + "px")
            .style("top", event.clientY - 20 + "px");
        })
        .on("mouseout", function () {
          container.selectAll(".tooltip").remove();
        });
    };

    addDots("dot1", "#7A7FEE", y1, "sequences", (d) =>
      `Sequences: ${d.sequences.toLocaleString()}<br/>Date: ${d3.timeFormat(
        "%b %Y"
      )(d.date)}`
    );

    addDots("dot2", "#4ECDC4", y2, "diversity", (d) =>
      `Diversity: ${d.diversity.toFixed(2)}<br/>Date: ${d3.timeFormat(
        "%b %Y"
      )(d.date)}`
    );

    // Legend
    const legend = svg.append("g").attr("transform", `translate(10, 10)`);
    const legendData = [
      { label: "Sequences", color: "#7A7FEE", y: 0 },
      { label: "Diversity", color: "#4ECDC4", y: 20 },
    ];

    legendData.forEach((item) => {
      legend
        .append("line")
        .attr("x1", 0)
        .attr("x2", 20)
        .attr("y1", item.y)
        .attr("y2", item.y)
        .style("stroke", item.color)
        .style("stroke-width", 3);

      legend
        .append("text")
        .attr("x", 25)
        .attr("y", item.y)
        .attr("dy", "0.35em")
        .style("font-size", "12px")
        .style("fill", "#333")
        .text(item.label);
    });
  }, [isClient]);

  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
        <span className="mr-2">⏱️</span>
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
