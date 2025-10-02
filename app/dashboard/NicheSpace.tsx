import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface SpeciesData {
  id: string;
  name: string;
  trophicRole: number; // 2-5 scale: Autotroph → Heterotroph
  hostAssociation: number; // 1.5-4 scale: Free-living → Symbiotic/Parasitic
  color: string;
  isNovel: boolean;
  taxonomicGroup: string;
  description: string;
  confidence?: number;
}

interface NicheSpaceProps {
  isClient: boolean;
  // The component is designed to receive the novel species as a prop.
  // For demonstration, we will define it inside and add it to the main array.
  novelSpecies?: SpeciesData;
}

export default function NicheSpace({ isClient }: NicheSpaceProps) {
  const nicheRef = useRef<HTMLDivElement>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesData | null>(
    null
  );
  const [isDarkMode, setIsDarkMode] = useState(false);

  // --- MODIFIED DATA ---
  // Reference species data now reflects our 7 eukaryotic species
  const referenceSpecies: SpeciesData[] = [
    {
      id: "arabidopsis",
      name: "A. thaliana",
      trophicRole: 2.0, // Pure autotroph
      hostAssociation: 1.5, // Purely free-living
      color: "#10B981",
      isNovel: false,
      taxonomicGroup: "Plantae",
      description:
        "A model organism for plants, acting as a primary producer (autotroph).",
    },
    {
      id: "diatom",
      name: "T. pseudonana",
      trophicRole: 2.1, // Photosynthetic autotroph
      hostAssociation: 1.5, // Free-living plankton
      color: "#3B82F6",
      isNovel: false,
      taxonomicGroup: "Chromista",
      description:
        "A marine diatom, a key photosynthetic organism in ocean food webs.",
    },
    {
      id: "foraminiferan",
      name: "G. siphonifera",
      trophicRole: 3.5, // Mixotrophic (heterotroph with photosynthetic symbionts)
      hostAssociation: 3.0, // Free-living but highly symbiotic
      color: "#EC4899",
      isNovel: false,
      taxonomicGroup: "Rhizaria",
      description:
        "A planktonic foraminiferan with a mixotrophic feeding strategy, hosting algal symbionts.",
    },
    {
      id: "paramecium",
      name: "P. tetraurelia",
      trophicRole: 4.0, // Heterotroph (consumes bacteria/algae)
      hostAssociation: 1.6, // Free-living
      color: "#6366F1",
      isNovel: false,
      taxonomicGroup: "Chromista",
      description:
        "A free-living ciliate that feeds on microorganisms, making it a heterotroph.",
    },
    {
      id: "yeast",
      name: "S. cerevisiae",
      trophicRole: 4.2, // Decomposer (saprotrophic heterotroph)
      hostAssociation: 1.7, // Mostly free-living
      color: "#F59E0B",
      isNovel: false,
      taxonomicGroup: "Fungi",
      description:
        "A saprotrophic fungus that absorbs nutrients, classifying it as a heterotroph.",
    },
    {
      id: "sea_urchin",
      name: "S. purpuratus",
      trophicRole: 4.5, // Herbivore (heterotroph)
      hostAssociation: 1.6, // Free-living
      color: "#EF4444",
      isNovel: false,
      taxonomicGroup: "Animalia",
      description:
        "A marine herbivore that grazes on algae, placing it firmly as a heterotroph.",
    },
    {
      id: "amoeba",
      name: "A. proteus",
      trophicRole: 4.1, // Phagotroph (heterotroph)
      hostAssociation: 1.5, // Free-living
      color: "#8B5CF6",
      isNovel: false,
      taxonomicGroup: "Amoebozoa",
      description:
        "A classic free-living predator that engulfs its food (phagocytosis).",
    },
  ];

  // Data for our novel species, as would be passed into the component
  const novelSpeciesData: SpeciesData = {
    id: "novel_foram",
    name: "Novel",
    trophicRole: 4.6, // Predicted to be a pure heterotroph in the deep sea (no light for symbionts)
    hostAssociation: 1.8, // Predicted to be free-living on the seafloor
    color: "#D97706", // Distinct color for the novel species
    isNovel: true,
    taxonomicGroup: "Rhizaria (Predicted)",
    description:
      "A novel deep-sea foraminiferan species identified from eDNA, predicted to be a benthic heterotroph feeding on marine snow.",
    confidence: 0.972, // Confidence score from similarity analysis
  };

  const allSpecies = [...referenceSpecies, novelSpeciesData];

  useEffect(() => {
    // Check if dark mode is active
    const checkDarkMode = () => {
      if (typeof window !== "undefined" && window.document) {
        const isDark = document.documentElement.classList.contains("dark");
        setIsDarkMode(isDark);
      }
    };

    checkDarkMode();

    // Watch for dark mode changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!nicheRef.current || !isClient) return;

    const container = d3.select(nicheRef.current);
    container.selectAll("*").remove();

    const margin = { top: 80, right: 80, bottom: 120, left: 180 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const svg = container
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3.scaleLinear().domain([2, 5]).range([0, width]);

    const yScale = d3.scaleLinear().domain([1.5, 4]).range([height, 0]);

    // Add grid lines with better visibility for light theme
    const gridLines = svg.append("g").attr("class", "grid");

    // Horizontal grid lines
    gridLines
      .selectAll("line.horizontal")
      .data(yScale.ticks(6))
      .enter()
      .append("line")
      .attr("class", "horizontal")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", (d) => yScale(d))
      .attr("y2", (d) => yScale(d))
      .attr("stroke", isDarkMode ? "#374151" : "#d1d5db")
      .attr("stroke-opacity", 0.8)
      .attr("stroke-dasharray", "3,3");

    // Vertical grid lines
    gridLines
      .selectAll("line.vertical")
      .data(xScale.ticks(6))
      .enter()
      .append("line")
      .attr("class", "vertical")
      .attr("x1", (d) => xScale(d))
      .attr("x2", (d) => xScale(d))
      .attr("y1", 0)
      .attr("y2", height)
      .attr("stroke", isDarkMode ? "#374151" : "#d1d5db")
      .attr("stroke-opacity", 0.8)
      .attr("stroke-dasharray", "3,3");

    // Add quadrant background regions with better light theme visibility
    const quadrants = [
      {
        x: 0,
        y: 0,
        width:
          ((xScale(3.5) - xScale(2.0)) * width) / (xScale(5.0) - xScale(2.0)),
        height: height / 2,
        label: "Autotroph-Parasitic",
        color: isDarkMode ? "#4b2b00" : "#fef3c7",
        opacity: isDarkMode ? 0.3 : 0.4,
      },
      {
        x: ((xScale(3.5) - xScale(2.0)) * width) / (xScale(5.0) - xScale(2.0)),
        y: 0,
        width:
          ((xScale(5.0) - xScale(3.5)) * width) / (xScale(5.0) - xScale(2.0)),
        height: height / 2,
        label: "Heterotroph-Parasitic",
        color: isDarkMode ? "#4a0e0e" : "#fecaca",
        opacity: isDarkMode ? 0.3 : 0.4,
      },
      {
        x: 0,
        y: height / 2,
        width:
          ((xScale(3.5) - xScale(2.0)) * width) / (xScale(5.0) - xScale(2.0)),
        height: height / 2,
        label: "Autotroph-Free-living",
        color: isDarkMode ? "#042f1c" : "#a7f3d0",
        opacity: isDarkMode ? 0.3 : 0.4,
      },
      {
        x: ((xScale(3.5) - xScale(2.0)) * width) / (xScale(5.0) - xScale(2.0)),
        y: height / 2,
        width:
          ((xScale(5.0) - xScale(3.5)) * width) / (xScale(5.0) - xScale(2.0)),
        height: height / 2,
        label: "Heterotroph-Free-living",
        color: isDarkMode ? "#1e2c58" : "#bfdbfe",
        opacity: isDarkMode ? 0.3 : 0.4,
      },
    ];

    svg
      .selectAll(".quadrant")
      .data(quadrants)
      .enter()
      .append("rect")
      .attr("class", "quadrant")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y)
      .attr("width", (d) => d.width)
      .attr("height", (d) => d.height)
      .attr("fill", (d) => d.color)
      .attr("opacity", (d) => d.opacity);

    // Add species points
    const speciesNodes = svg
      .selectAll(".species-point")
      .data(allSpecies)
      .enter()
      .append("g")
      .attr("class", "species-point")
      .style("cursor", "pointer");

    // Species circles with better light theme visibility
    speciesNodes
      .append("circle")
      .attr("cx", (d) => xScale(d.trophicRole))
      .attr("cy", (d) => yScale(d.hostAssociation))
      .attr("r", (d) => (d.isNovel ? 10 : 6))
      .style("fill", (d) => d.color)
      .style("stroke", (d) =>
        d.isNovel
          ? isDarkMode
            ? "#fca5a5"
            : "#dc2626"
          : isDarkMode
          ? "#1f2937"
          : "#ffffff"
      )
      .style("stroke-width", (d) => (d.isNovel ? 3 : 2))
      .style("opacity", 0.9)
      .on("mouseover", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", d.isNovel ? 14 : 9)
          .style("opacity", 1);

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
          .html(
            `
<div><strong>${d.name}</strong></div>
<div style="margin: 4px 0; color: #94a3b8;">${d.taxonomicGroup}</div>
<div>Trophic Role: ${d.trophicRole}</div>
<div>Host Association: ${d.hostAssociation}</div>
${
  d.confidence
    ? `<div style="color: #60a5fa;">Confidence: ${(d.confidence * 100).toFixed(
        1
      )}%</div>`
    : ""
}
${
  d.isNovel
    ? '<div style="color: #f87171; margin-top: 6px;">★ Novel Species</div>'
    : ""
}
`
          )
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px");
      })
      .on("mouseout", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", d.isNovel ? 10 : 6)
          .style("opacity", 0.9);
        container.selectAll(".tooltip").remove();
      })
      .on("click", (event, d) => {
        setSelectedSpecies(d);
      });

    // Add text labels with precise positioning based on coordinate analysis
    speciesNodes
      .append("text")
      .attr("x", (d) => {
        // Arabidopsis (2.0, 1.5) - keep original positioning
        if (d.id === "arabidopsis") return xScale(d.trophicRole) - 8;
        // Diatom (2.1, 1.5) - keep original positioning
        if (d.id === "diatom") return xScale(d.trophicRole) + 8;
        // Foraminiferan (3.5, 3.0) - isolated above, center label above
        if (d.id === "foraminiferan") return xScale(d.trophicRole);
        // Paramecium (4.0, 1.6) - place to the LEFT of its point
        if (d.id === "paramecium") return xScale(d.trophicRole) - 8;
        // Yeast (4.2, 1.7) - place exactly ABOVE its point
        if (d.id === "yeast") return xScale(d.trophicRole);
        // Sea urchin (4.5, 1.6) - place to the RIGHT of its point
        if (d.id === "sea_urchin") return xScale(d.trophicRole) + 8;
        // Amoeba (4.1, 1.5) - clustered area, place below
        if (d.id === "amoeba") return xScale(d.trophicRole);
        // Novel (4.6, 1.8) - highlight position, place to the right and above
        if (d.id === "novel_foram") return xScale(d.trophicRole) + 10;
        return xScale(d.trophicRole);
      })
      .attr("y", (d) => {
        // Arabidopsis - keep original positioning
        if (d.id === "arabidopsis") return yScale(d.hostAssociation) - 12;
        // Diatom - keep original positioning
        if (d.id === "diatom") return yScale(d.hostAssociation) - 12;
        // Foraminiferan - isolated, place above
        if (d.id === "foraminiferan") return yScale(d.hostAssociation) - 14;
        // Paramecium - place below to avoid axis
        if (d.id === "paramecium") return yScale(d.hostAssociation) + 5;
        // Yeast - place exactly ABOVE its point
        if (d.id === "yeast") return yScale(d.hostAssociation) - 14;
        // Sea urchin - place below to avoid axis
        if (d.id === "sea_urchin") return yScale(d.hostAssociation) + 5;
        // Amoeba - in cluster, place below
        if (d.id === "amoeba") return yScale(d.hostAssociation) + 20;
        // Novel - place above to highlight
        if (d.id === "novel_foram") return yScale(d.hostAssociation) - 14;
        return yScale(d.hostAssociation) - 12;
      })
      .attr("text-anchor", (d) => {
        // Arabidopsis - keep left-aligned
        if (d.id === "arabidopsis") return "end";
        // Diatom - keep right-aligned
        if (d.id === "diatom") return "start";
        // Paramecium - LEFT of point, so right-aligned text
        if (d.id === "paramecium") return "end";
        // Yeast - ABOVE point, so center-aligned
        if (d.id === "yeast") return "middle";
        // Sea urchin - RIGHT of point, so left-aligned text
        if (d.id === "sea_urchin") return "start";
        // Novel - right of point
        if (d.id === "novel_foram") return "start";
        // Center for others
        return "middle";
      })
      .style("font-size", (d) => (d.isNovel ? "11px" : "10px"))
      .style("font-weight", "700")
      .style("fill", (d) => d.color)
      .style("paint-order", "stroke")
      .style("stroke", isDarkMode ? "#000" : "#fff")
      .style("stroke-width", "3px")
      .style("stroke-linejoin", "round")
      .style("pointer-events", "none")
      .text((d) => (d.isNovel ? `★ ${d.name}` : d.name));

    // Add axes with better styling
    const xAxis = svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickValues([2, 2.5, 3, 3.5, 4, 4.5, 5])
          .tickFormat((d) => {
            const labels = {
              2: "Autotroph",
              2.5: "",
              3: "",
              3.5: "Mixed",
              4: "",
              4.5: "",
              5: "Heterotroph",
            };
            return labels[d as keyof typeof labels] || "";
          })
      );

    xAxis
      .selectAll("text")
      .style("fill", isDarkMode ? "#9ca3af" : "#374151")
      .style("font-weight", "600")
      .style("font-size", "12px");
    xAxis
      .selectAll("line, path")
      .style("stroke", isDarkMode ? "#6b7280" : "#4b5563")
      .style("stroke-width", "1.5");

    const yAxis = svg.append("g").call(
      d3
        .axisLeft(yScale)
        .tickValues([1.5, 2, 2.5, 3, 3.5, 4])
        .tickFormat((d) => {
          const labels = {
            1.5: "Free-living",
            2: "",
            2.5: "",
            3: "Facultative",
            3.5: "",
            4: "Symbiotic/Parasitic",
          };
          return labels[d as keyof typeof labels] || "";
        })
    );

    yAxis
      .selectAll("text")
      .style("fill", isDarkMode ? "#9ca3af" : "#374151")
      .style("font-weight", "600")
      .style("font-size", "12px");
    yAxis
      .selectAll("line, path")
      .style("stroke", isDarkMode ? "#6b7280" : "#4b5563")
      .style("stroke-width", "1.5");

    // Axis labels with original styling
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + 90)
      .attr("text-anchor", "middle")
      .style("font-size", "15px")
      .style("font-weight", "700")
      .style("fill", isDarkMode ? "#9ca3af" : "#1f2937")
      .text("Trophic Role (Autotroph → Heterotroph)");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -120)
      .attr("text-anchor", "middle")
      .style("font-size", "15px")
      .style("font-weight", "700")
      .style("fill", isDarkMode ? "#9ca3af" : "#1f2937")
      .text("Host Association (Free-living → Symbiotic/Parasitic)");
  }, [isClient, isDarkMode]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Niche Space Plot */}
      <div className="lg:col-span-2 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <svg
            className="mr-2 h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
          Ecological Niche Space
        </h3>
        <div ref={nicheRef} className="w-full overflow-x-auto"></div>
      </div>

      {/* Species Legend */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <svg
            className="mr-2 h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-1.414-.586H13" />
            <circle cx="9" cy="9" r="2" />
          </svg>
          Species Reference
        </h3>
        <div className="space-y-3">
          {referenceSpecies.map((species, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                selectedSpecies?.id === species.id
                  ? "bg-gray-100 dark:bg-[#2a2a2a] border-2 border-gray-300 dark:border-gray-600"
                  : "bg-gray-50 dark:bg-[#111111] hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
              }`}
              onClick={() => setSelectedSpecies(species)}
            >
              <div
                className="w-4 h-4 rounded-full shadow-sm border border-white dark:border-gray-700"
                style={{ backgroundColor: species.color }}
              ></div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                  {species.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {species.taxonomicGroup}
                </div>
              </div>
            </div>
          ))}

          {/* Show novel species in legend if present */}
          {novelSpeciesData && (
            <>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                  Novel Species
                </div>
              </div>
              <div
                className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 border-red-200 dark:border-red-800 ${
                  selectedSpecies?.id === novelSpeciesData.id
                    ? "bg-red-50 dark:bg-red-900/20 border-red-400 dark:border-red-600"
                    : "bg-red-25 dark:bg-red-900/10 hover:bg-red-50 dark:hover:bg-red-900/20"
                }`}
                onClick={() => setSelectedSpecies(novelSpeciesData)}
              >
                <div
                  className="w-4 h-4 rounded-full shadow-sm border-2 border-red-400"
                  style={{ backgroundColor: novelSpeciesData.color }}
                ></div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-red-600 dark:text-red-400 text-sm flex items-center">
                    ★ {novelSpeciesData.name}
                  </div>
                  <div className="text-xs text-red-500 dark:text-red-400">
                    {novelSpeciesData.confidence &&
                      `${(novelSpeciesData.confidence * 100).toFixed(
                        1
                      )}% confidence`}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Selected Species Details */}
      {selectedSpecies && (
        <div className="lg:col-span-3 p-6 bg-gray-50 dark:bg-[#111111] rounded-2xl border border-gray-200 dark:border-gray-800">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                {selectedSpecies.name}
              </h4>
              <div className="flex items-center space-x-3 mt-2">
                <span className="px-3 py-1 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                  {selectedSpecies.taxonomicGroup}
                </span>
                {selectedSpecies.isNovel && (
                  <span className="px-3 py-1 text-sm font-semibold bg-red-100 text-red-600 rounded-full">
                    ★ Novel Species
                  </span>
                )}
                {selectedSpecies.confidence && (
                  <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-600 rounded-full">
                    {(selectedSpecies.confidence * 100).toFixed(1)}% Confidence
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => setSelectedSpecies(null)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {selectedSpecies.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Trophic Role
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedSpecies.trophicRole}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {selectedSpecies.trophicRole < 3
                  ? "Autotrophic tendency"
                  : selectedSpecies.trophicRole > 4
                  ? "Heterotrophic tendency"
                  : "Mixed feeding"}
              </div>
            </div>
            <div className="p-4 bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Host Association
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedSpecies.hostAssociation}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {selectedSpecies.hostAssociation < 2.5
                  ? "Free-living"
                  : selectedSpecies.hostAssociation > 3.5
                  ? "Symbiotic/Parasitic"
                  : "Facultative association"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
