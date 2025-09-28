"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface TemporalTrendsProps {
  isClient: boolean;
}

export default function TemporalTrends({ isClient }: TemporalTrendsProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 350 });

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

    const margin = { top: 30, right: 80, bottom: 50, left: 60 };
    const width = timelineRef.current.clientWidth - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;

    const svg = container
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const parseTime = d3.timeParse("%Y-%m-%d");
    const data = timelineData.map((d) => ({ ...d, date: parseTime(d.date) }));

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d: any) => d.date) as [Date, Date])
      .range([0, width]);

    const y1 = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d: any) => d.sequences)! * 1.1])
      .range([height, 0]);

    const y2 = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d: any) => d.diversity)! * 1.1])
      .range([height, 0]);

    const lineSeq = d3
      .line<any>()
      .x((d) => x(d.date))
      .y((d) => y1(d.sequences))
      .curve(d3.curveMonotoneX);

    const lineDiv = d3
      .line<any>()
      .x((d) => x(d.date))
      .y((d) => y2(d.diversity))
      .curve(d3.curveMonotoneX);

    // Area under sequences line
    const areaSeq = d3
      .area<any>()
      .x((d) => x(d.date))
      .y0(height)
      .y1((d) => y1(d.sequences))
      .curve(d3.curveMonotoneX);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "rgba(122,127,238,0.2)")
      .attr("d", areaSeq);

    // Lines
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#7A7FEE")
      .attr("stroke-width", 3)
      .attr("d", lineSeq);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#4ECDC4")
      .attr("stroke-width", 3)
      .attr("d", lineDiv);

    // Axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b %Y") as any))
      .selectAll("text")
      .attr("transform", "rotate(-35)")
      .style("text-anchor", "end")
      .style("font-size", "12px");

    svg
      .append("g")
      .call(d3.axisLeft(y1))
      .selectAll("text")
      .style("font-size", "12px")
      .style("fill", "#7A7FEE");

    svg
      .append("g")
      .attr("transform", `translate(${width},0)`)
      .call(d3.axisRight(y2))
      .selectAll("text")
      .style("font-size", "12px")
      .style("fill", "#4ECDC4");

    // Tooltip
    const tooltip = container
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", "rgba(0,0,0,0.8)")
      .style("color", "#fff")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("z-index", "1000");

    const addDots = (data, yScale, color, label) => {
      svg
        .selectAll(`.${label}`)
        .data(data)
        .enter()
        .append("circle")
        .attr("class", label)
        .attr("cx", (d: any) => x(d.date))
        .attr("cy", (d: any) => yScale(d[label]))
        .attr("r", 6)
        .attr("fill", color)
        .on("mouseover", (event: any, d: any) => {
          tooltip
            .html(`${label}: ${d[label]}<br/>${d3.timeFormat("%b %Y")(d.date)}`)
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 30 + "px")
            .transition()
            .duration(200)
            .style("opacity", 1);
        })
        .on("mouseout", () => {
          tooltip.transition().duration(200).style("opacity", 0);
        });
    };

    addDots(data, y1, "#7A7FEE", "sequences");
    addDots(data, y2, "#4ECDC4", "diversity");

    // Legend
    const legend = svg.append("g").attr("transform", `translate(${width - 120},10)`);

    const legendItems = [
      { color: "#7A7FEE", text: "Sequences" },
      { color: "#4ECDC4", text: "Diversity" },
    ];

    legendItems.forEach((d, i) => {
      legend
        .append("rect")
        .attr("x", 0)
        .attr("y", i * 25)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", d.color);
      legend
        .append("text")
        .attr("x", 20)
        .attr("y", i * 25 + 12)
        .style("font-size", "12px")
        .style("fill", "#333")
        .text(d.text);
    });
  }, [isClient, dimensions]);

  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
        <span className="mr-2">⏱️</span>
        Temporal Analysis Trends
      </h3>
      <div
        ref={timelineRef}
        className="w-full overflow-x-auto"
        style={{ minHeight: "350px" }}
      ></div>
    </div>
  );
}
