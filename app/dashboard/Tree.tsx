"use client";
import React, { useRef, useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

interface TaxonomyNode {
  name: string;
  rank?: string;
  attributes?: Record<string, string>;
  children?: TaxonomyNode[];
}

// Improved dataset
const taxonomyData: TaxonomyNode = {
  name: "Bacteria",
  rank: "Domain",
  children: [
    {
      name: "Proteobacteria",
      rank: "Phylum",
      children: [
        {
          name: "Gammaproteobacteria",
          rank: "Class",
          children: [
            {
              name: "Enterobacterales",
              rank: "Order",
              children: [
                {
                  name: "Enterobacteriaceae",
                  rank: "Family",
                  children: [
                    {
                      name: "Escherichia",
                      rank: "Genus",
                      children: [
                        {
                          name: "E. coli",
                          rank: "Species",
                          attributes: {
                            abundance: "15%",
                            reads: "230,456",
                            status: "Known",
                          },
                        },
                        {
                          name: "E. albertii",
                          rank: "Species",
                          attributes: {
                            abundance: "2%",
                            reads: "34,210",
                            status: "Known",
                          },
                        },
                      ],
                    },
                    {
                      name: "Salmonella",
                      rank: "Genus",
                      children: [
                        {
                          name: "S. enterica",
                          rank: "Species",
                          attributes: {
                            abundance: "5%",
                            reads: "98,342",
                            status: "Known",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "Alphaproteobacteria",
          rank: "Class",
          children: [
            {
              name: "Rhizobiales",
              rank: "Order",
              children: [
                {
                  name: "Rhizobiaceae",
                  rank: "Family",
                  children: [
                    {
                      name: "Rhizobium",
                      rank: "Genus",
                      children: [
                        {
                          name: "R. leguminosarum",
                          rank: "Species",
                          attributes: {
                            abundance: "5%",
                            reads: "98,342",
                            status: "Known",
                          },
                        },
                        {
                          name: "R. etli",
                          rank: "Species",
                          attributes: {
                            abundance: "1%",
                            reads: "15,200",
                            status: "Known",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Firmicutes",
      rank: "Phylum",
      children: [
        {
          name: "Bacilli",
          rank: "Class",
          children: [
            {
              name: "Lactobacillales",
              rank: "Order",
              children: [
                {
                  name: "Lactobacillaceae",
                  rank: "Family",
                  children: [
                    {
                      name: "Lactobacillus",
                      rank: "Genus",
                      children: [
                        {
                          name: "L. acidophilus",
                          rank: "Species",
                          attributes: {
                            abundance: "4%",
                            reads: "67,890",
                            status: "Known",
                          },
                        },
                        {
                          name: "L. casei",
                          rank: "Species",
                          attributes: {
                            abundance: "3%",
                            reads: "54,230",
                            status: "Known",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Novel Cluster A",
      rank: "Phylum",
      attributes: {
        similarity: "<85%",
        status: "Potential new lineage",
      },
    },
    {
      name: "Novel Cluster B",
      rank: "Phylum",
      attributes: {
        similarity: "<80%",
        status: "Potential new lineage",
      },
    },
  ],
};

// Color function
const getRankColor = (rank?: string) => {
  switch (rank) {
    case "Class":
      return "#FF6B6B";
    case "Family":
      return "#FFD93D";
    case "Genus":
      return "#6A82FB";
    case "Species":
      return "#FC5C7D";
    case "Phylum":
      return "#4ECDC4";
    case "Order":
      return "#FFA500";
    default:
      return "#A9A9A9";
  }
};

// Format for ECharts
const formatTreeData = (node: TaxonomyNode): any => {
  return {
    name: node.name,
    value: node.rank,
    itemStyle: { color: getRankColor(node.rank) },
    tooltip: {
      formatter: () => {
        let tooltipText = `<strong>${node.name}</strong><br/>Rank: ${node.rank}`;
        if (node.attributes) {
          for (const [key, val] of Object.entries(node.attributes)) {
            tooltipText += `<br/>${key}: ${val}`;
          }
        }
        return tooltipText;
      },
    },
    children: node.children?.map(formatTreeData),
  };
};

export default function PhylogeneticTree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartSize, setChartSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setChartSize({ width, height });
    }
  }, []);

  const option = {
    tooltip: { trigger: "item", triggerOn: "mousemove" },
    series: [
      {
        type: "tree",
        data: [formatTreeData(taxonomyData)],
        top: "5%",
        left: "10%",
        bottom: "5%",
        right: "20%",
        symbol: "circle",
        symbolSize: 20, // bigger node
        orient: "vertical",
        expandAndCollapse: true,
        initialTreeDepth: 2,
        label: {
          position: "top",
          verticalAlign: "middle",
          align: "center",
          fontSize: 12,
          lineHeight: 25, // increased line height for spacing
          formatter: "{b}",
        },
        leaves: {
          label: { position: "bottom", verticalAlign: "middle", fontSize: 12 },
        },
        lineStyle: {
          width: 2,
          curveness: 0.5,
        },
        itemStyle: { borderColor: "#fff", borderWidth: 2 },
        layout: "orthogonal", // better spacing for vertical trees
        nodeGap: 50, // horizontal gap between nodes
        levelGap: 80, // vertical gap between levels
      },
    ],
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "80vh",
        background: "linear-gradient(135deg, #FFDEE9, #B5FFFC, #FFDAB9)",
        borderRadius: "16px",
        padding: "10px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      }}
    >
      <ReactECharts
        option={option}
        style={{ width: "100%", height: "100%" }}
        opts={{ renderer: "svg" }}
      />
    </div>
  );
}
