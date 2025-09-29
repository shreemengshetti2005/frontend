export interface Paper {
    id: string;
    title: string;
    authors: string[];
    journal: string;
    year: number;
    doi?: string;
    abstract: string;
    keywords: string[];
    publicationUrl: string;
}

export const searchSuggestions = [
    "deep-sea biodiversity",
    "environmental DNA sequencing",
    "marine metagenomics",
    "hydrothermal vent ecosystems",
    "abyssal plain organisms",
    "ocean microbiome analysis",
    "benthic community structure",
    "deep-sea taxonomy",
    "marine bioinformatics",
    "underwater ecosystem monitoring"
];

export const mockPapers: Paper[] = [
    {
        id: "1",
        title: "Optimization of environmental DNA analysis using pumped deep-sea water for the monitoring of fish biodiversity",
        authors: ["Yamamoto, S.", "Minami, K.", "Fukaya, K.", "Takahashi, K."],
        journal: "Frontiers in Marine Science",
        year: 2022,
        doi: "10.3389/fmars.2022.965800",
        abstract: "Deep-sea environments remain largely unexplored due to logistical challenges. This study optimizes eDNA analysis methods using pumped deep-sea water to effectively monitor fish biodiversity in these extreme environments, providing a non-invasive approach to deep-sea biodiversity assessment.",
        keywords: ["Deep-sea eDNA", "Fish biodiversity", "Pumped water", "Monitoring"],
        publicationUrl: "https://www.frontiersin.org/journals/marine-science/articles/10.3389/fmars.2022.965800/full"
    },
    {
        id: "2",
        title: "From Sea Surface to Seafloor: A Benthic Allochthonous eDNA Survey for the Abyssal Ocean",
        authors: ["Canals, O.", "Mendibil, I.", "Santos, M.", "Irigoien, X."],
        journal: "Frontiers in Marine Science",
        year: 2020,
        doi: "10.3389/fmars.2020.00682",
        abstract: "We investigate the presence and distribution of allochthonous eDNA from surface to abyssal depths, demonstrating that eDNA can be transported from surface waters to the deep seafloor. This study uses QIIME2 for comprehensive biodiversity analysis across depth gradients.",
        keywords: ["Abyssal ocean", "eDNA", "Deep-sea biodiversity", "QIIME2"],
        publicationUrl: "https://www.frontiersin.org/journals/marine-science/articles/10.3389/fmars.2020.00682/full"
    },
    {
        id: "3",
        title: "Exploring Environmental DNA (eDNA) to Assess Biodiversity of Deep-Sea Hard Substratum Communities",
        authors: ["Guardiola, M.", "Uriz, M.J.", "Taberlet, P.", "Coissac, E."],
        journal: "Frontiers in Marine Science",
        year: 2019,
        doi: "10.3389/fmars.2019.00783",
        abstract: "Deep-sea hard substrates harbor diverse benthic communities that are difficult to sample using traditional methods. We demonstrate that eDNA metabarcoding provides an effective tool for biodiversity assessment of these communities, revealing cryptic diversity that conventional surveys miss.",
        keywords: ["eDNA metabarcoding", "Deep-sea benthic", "Biodiversity assessment"],
        publicationUrl: "https://www.frontiersin.org/journals/marine-science/articles/10.3389/fmars.2019.00783/full"
    },
    {
        id: "4",
        title: "Framing integrative deep-sea biodiversity monitoring via eDNA and optoacoustic methods",
        authors: ["Thomsen, P.F.", "Sigsgaard, E.E.", "Knudsen, S.W."],
        journal: "Frontiers in Marine Science",
        year: 2021,
        doi: "10.3389/fmars.2021.797140",
        abstract: "We propose an integrative framework for deep-sea biodiversity monitoring that combines eDNA analysis with optoacoustic methods and AI integration. This multi-faceted approach provides comprehensive insights into deep-sea ecosystems while addressing the challenges of monitoring these remote environments.",
        keywords: ["Deep-sea monitoring", "eDNA", "Optoacoustics", "AI integration"],
        publicationUrl: "https://www.frontiersin.org/journals/marine-science/articles/10.3389/fmars.2021.797140/full"
    },
    {
        id: "5",
        title: "Deep reinforcement learning-based pairwise DNA sequence alignment method compatible with embedded edge devices (EdgeAlign)",
        authors: ["Kim, J.", "Lee, S.", "Park, H.", "Choi, M."],
        journal: "Scientific Reports",
        year: 2023,
        doi: "10.1038/s41598-023-29277-6",
        abstract: "Traditional BLAST-based alignment methods are computationally intensive. We present EdgeAlign, a deep reinforcement learning approach for pairwise DNA sequence alignment that can run efficiently on embedded edge devices, opening new possibilities for field-based genomic analysis.",
        keywords: ["AI", "Deep reinforcement learning", "BLAST alternative", "Sequence alignment"],
        publicationUrl: "https://www.nature.com/articles/s41598-023-29277-6"
    },
    {
        id: "6",
        title: "Multiple sequence alignment based on deep reinforcement learning with self-attention and positional encoding",
        authors: ["Zhang, Y.", "Wang, L.", "Chen, X.", "Liu, J."],
        journal: "Bioinformatics",
        year: 2023,
        doi: "10.1093/bioinformatics/btad636",
        abstract: "We introduce a novel multiple sequence alignment method leveraging deep reinforcement learning with self-attention mechanisms and positional encoding. This approach significantly improves alignment accuracy for divergent sequences, particularly relevant for environmental DNA studies.",
        keywords: ["AI", "Deep learning", "Multiple sequence alignment", "Bioinformatics"],
        publicationUrl: "https://academic.oup.com/bioinformatics/article/39/11/btad636/7323576"
    },
    {
        id: "7",
        title: "Biodiversity and community structures across the Magellan seamount and adjacent abyssal plains using eDNA metabarcoding",
        authors: ["Fernández-Urruzola, I.", "Cordier, T.", "Ransome, E.", "Pawlowski, J."],
        journal: "Frontiers in Marine Science",
        year: 2024,
        doi: "10.3389/fmars.2024.1412678",
        abstract: "We characterize biodiversity and community structures across contrasting deep-sea habitats using eDNA metabarcoding. The study reveals distinct communities between seamount and abyssal plain environments, highlighting the importance of habitat heterogeneity in deep-sea biodiversity.",
        keywords: ["Seamount", "Abyssal plains", "eDNA metabarcoding", "Community structure"],
        publicationUrl: "https://www.frontiersin.org/journals/marine-science/articles/10.3389/fmars.2024.1412678/full"
    }
];