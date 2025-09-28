"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface ClusterData {
  id: number;
  name: string;
  abundance: number;
  similarity: number;
  novelty: string;
  conservation: string;
}

interface DiscoveryDetailsProps {
  clusterData: ClusterData[];
}

export default function DiscoveryDetails({ clusterData }: DiscoveryDetailsProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const pieRef = useRef<HTMLDivElement>(null);

  // Draw Bar Chart (Abundance & Similarity)
  useEffect(() => {
    if (!barRef.current) return;

    d3.select(barRef.current).selectAll("*").remove();

    const margin = { top: 30, right: 40, bottom: 70, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select(barRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x0 = d3
      .scaleBand()
      .domain(clusterData.map((d) => d.name))
      .range([0, width])
      .padding(0.2);

    const x1 = d3.scaleBand().domain(["Abundance", "Similarity"]).range([0, x0.bandwidth()]).padding(0.05);

    const y = d3.scaleLinear().domain([0, d3.max(clusterData, (d) => Math.max(d.abundance, d.similarity))! * 1.2]).range([height, 0]);

    const color = d3.scaleOrdinal<string>().domain(["Abundance", "Similarity"]).range(["#7A7FEE", "#4ECDC4"]);

    svg
      .append("g")
      .selectAll("g")
      .data(clusterData)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${x0(d.name)},0)`)
      .selectAll("rect")
      .data((d) => [
        { key: "Abundance", value: d.abundance },
        { key: "Similarity", value: d.similarity },
      ])
      .enter()
      .append("rect")
      .attr("x", (d) => x1(d.key)!)
      .attr("y", (d) => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", (d) => height - y(d.value))
      .attr("fill", (d) => color(d.key)!)
      .on("mouseover", function (event, d) {
        d3.select(this).attr("opacity", 0.7);
      })
      .on("mouseout", function () {
        d3.select(this).attr("opacity", 1);
      });

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x0))
      .selectAll("text")
      .attr("transform", "rotate(-30)")
      .style("text-anchor", "end");

    svg.append("g").call(d3.axisLeft(y));

    // Legend
    const legend = svg.append("g").attr("transform", `translate(${width - 100}, 0)`);
    ["Abundance", "Similarity"].forEach((key, i) => {
      legend
        .append("rect")
        .attr("x", 0)
        .attr("y", i * 20)
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", color(key)!);
      legend
        .append("text")
        .attr("x", 18)
        .attr("y", i * 20 + 10)
        .text(key)
        .attr("fill", "#333")
        .attr("font-size", "12px");
    });
  }, [clusterData]);

  // Draw Pie Chart for Novelty Distribution
  useEffect(() => {
    if (!pieRef.current) return;

    d3.select(pieRef.current).selectAll("*").remove();

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(pieRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const noveltyCount: Record<string, number> = {};
    clusterData.forEach((c) => (noveltyCount[c.novelty] = (noveltyCount[c.novelty] || 0) + 1));

    const pie = d3.pie<any>().value((d) => d.value)(Object.entries(noveltyCount).map(([name, value]) => ({ name, value })));

    const arc = d3.arc<any>().innerRadius(radius * 0.4).outerRadius(radius * 0.8);
    const color = d3.scaleOrdinal<string>().domain(Object.keys(noveltyCount)).range(["#FF6B6B", "#FFD93D", "#4ECDC4"]);

    svg
      .selectAll("path")
      .data(pie)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.name)!)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .on("mouseover", function (event, d) {
        d3.select(this).attr("opacity", 0.7);
      })
      .on("mouseout", function () {
        d3.selectAll("path").attr("opacity", 1);
      });

    // Labels
    svg
      .selectAll("text")
      .data(pie)
      .enter()
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text((d) => d.data.name)
      .attr("font-size", "12px")
      .attr("fill", "#fff");
  }, [clusterData]);

  return (
    <div className="space-y-6">
      {/* Discovery Highlights */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-[#7A7FEE]/10 rounded-xl border border-[#7A7FEE]/20">
          <div className="text-sm text-[#7A7FEE] font-medium">Most Abundant</div>
          <div className="text-2xl font-bold text-[#7A7FEE]">{d3.max(clusterData, (d) => d.abundance)?.toString()}</div>
        </div>
        <div className="p-4 bg-[#FF6B6B]/10 rounded-xl border border-[#FF6B6B]/20">
          <div className="text-sm text-[#FF6B6B] font-medium">Most Novel</div>
          <div className="text-2xl font-bold text-[#FF6B6B]">{clusterData.find((c) => c.novelty === "Novel")?.name || "—"}</div>
        </div>
        <div className="p-4 bg-[#FFD93D]/10 rounded-xl border border-[#FFD93D]/20">
          <div className="text-sm text-[#FFD93D] font-medium">Critical Priority</div>
          <div className="text-2xl font-bold text-[#FFD93D]">{clusterData.filter((c) => c.conservation === "Critical").length}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="flex flex-col md:flex-row gap-8">
        <div ref={barRef}></div>
        <div ref={pieRef}></div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-4 text-left">Cluster</th>
              <th className="py-2 px-4 text-left">Abundance</th>
              <th className="py-2 px-4 text-left">Similarity</th>
              <th className="py-2 px-4 text-left">Novelty</th>
              <th className="py-2 px-4 text-left">Priority</th>
            </tr>
          </thead>
          <tbody>
            {clusterData.map((cluster) => (
              <tr key={cluster.id} className="border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-[#111111]">
                <td className="py-2 px-4">{cluster.name}</td>
                <td className="py-2 px-4">{cluster.abundance.toLocaleString()}</td>
                <td className="py-2 px-4">{cluster.similarity}%</td>
                <td className="py-2 px-4">{cluster.novelty}</td>
                <td className="py-2 px-4">{cluster.conservation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
