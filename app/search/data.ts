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
        title: "Environmental DNA reveals cryptic biodiversity in deep-sea hydrothermal vent ecosystems",
        authors: ["Chen, L.", "Rodriguez, M.", "Thompson, K."],
        journal: "Nature Ecology & Evolution",
        year: 2024,
        doi: "10.1038/s41559-024-02341-x",
        abstract: "Deep-sea hydrothermal vents harbor unique ecosystems with high levels of endemism. Using environmental DNA (eDNA) metabarcoding of 18S rRNA genes, we surveyed microbial and meiofaunal diversity across five vent fields in the Pacific Ocean.",
        keywords: ["hydrothermal vents", "environmental DNA", "biodiversity", "deep-sea ecology"],
        publicationUrl: "https://doi.org/10.1038/s41559-024-02341-x"
    },
    {
        id: "2",
        title: "Machine learning approaches for taxonomic classification of marine eDNA sequences",
        authors: ["Smith, A.R.", "Johnson, P.", "Liu, X.", "Garcia, S."],
        journal: "Bioinformatics",
        year: 2023,
        doi: "10.1093/bioinformatics/btad542",
        abstract: "Traditional reference database-dependent methods for taxonomic assignment of environmental DNA sequences often fail in marine environments. We developed a novel machine learning pipeline that improves classification accuracy by 35%.",
        keywords: ["machine learning", "taxonomic classification", "marine genomics", "bioinformatics"],
        publicationUrl: "https://doi.org/10.1093/bioinformatics/btad542"
    },
    {
        id: "3",
        title: "Abyssal plain microbial communities revealed through high-throughput sequencing",
        authors: ["Williams, J.", "Brown, C.", "Davis, M."],
        journal: "Deep Sea Research Part I",
        year: 2023,
        doi: "10.1016/j.dsr.2023.104089",
        abstract: "The abyssal seafloor covers more than 50% of Earth's surface yet remains poorly understood. We analyzed sediment samples from the Clarion-Clipperton Zone to characterize microbial diversity and metabolic potential.",
        keywords: ["abyssal plains", "microbial ecology", "deep-sea sediments", "metagenomics"],
        publicationUrl: "https://doi.org/10.1016/j.dsr.2023.104089"
    },
    {
        id: "4",
        title: "AI-driven discovery of novel marine taxa from environmental DNA datasets",
        authors: ["Kumar, R.", "Anderson, L.", "Patel, N."],
        journal: "Science Advances",
        year: 2024,
        doi: "10.1126/sciadv.adk1234",
        abstract: "We present DeepSea-AI, an artificial intelligence framework for identifying potentially novel taxa from marine eDNA sequences without relying on traditional reference databases.",
        keywords: ["artificial intelligence", "novel taxa", "marine biology", "environmental DNA"],
        publicationUrl: "https://doi.org/10.1126/sciadv.adk1234"
    },
    {
        id: "5",
        title: "Comparative analysis of eDNA extraction methods for deep-sea sediment samples",
        authors: ["Taylor, E.", "Wilson, R.", "Martinez, A."],
        journal: "Marine Biology",
        year: 2023,
        doi: "10.1007/s00227-023-04267-8",
        abstract: "Environmental DNA extraction from deep-sea sediments presents unique challenges. We compared five extraction protocols and evaluated their efficiency for downstream metabarcoding applications.",
        keywords: ["DNA extraction", "sediment analysis", "methodology", "deep-sea research"],
        publicationUrl: "https://doi.org/10.1007/s00227-023-04267-8"
    },
    {
        id: "6",
        title: "Temporal dynamics of deep-sea microbial communities using long-term eDNA monitoring",
        authors: ["Zhang, H.", "O'Connor, S.", "Nielsen, K."],
        journal: "ISME Journal",
        year: 2024,
        doi: "10.1038/s41396-024-01423-x",
        abstract: "Understanding temporal variation in deep-sea ecosystems is crucial for monitoring environmental change. We established a 3-year eDNA time series at the Monterey Bay deep-sea observatory.",
        keywords: ["temporal dynamics", "long-term monitoring", "deep-sea observatory", "microbial communities"],
        publicationUrl: "https://doi.org/10.1038/s41396-024-01423-x"
    }
];