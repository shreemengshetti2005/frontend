export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: {
        name: string;
        avatar: string;
        role: string;
    };
    publishedAt: string;
    readTime: string;
    category: string;
    tags: string[];
    image: string;
    featured: boolean;
}

export const blogPosts: BlogPost[] = [
    {
        id: "1",
        title: "eDNA reveals hidden deep‑sea biodiversity hotspots in 2025",
        excerpt: "Our latest ocean surveys combine eDNA and AI to map unseen species networks across abyssal plains and seamounts.",
        content: `
      <h2>Why eDNA now</h2>
      <p>Environmental DNA (eDNA) lets us detect organisms from the genetic traces they leave in water. In 2025, improved barcoding libraries and long‑read sequencing make eDNA more precise and less biased.</p>
      
      <h2>What we found</h2>
      <p>Across 42 stations, we identified hundreds of indicator taxa clustered around deep‑sea knolls. AI‑assisted clustering separated genuine signal from sequencing noise, revealing stable community cores.</p>
      
      <h2>Why it matters</h2>
      <p>These hotspots align with key nutrient pathways and larval corridors, giving conservation planners higher‑confidence targets for protection without new trawling surveys.</p>
      
      <h2>Methods, in brief</h2>
      <p>Filtered 10 L per cast at 3 depths; dual‑indexed metabarcoding; MinKNOW basecalling; denoising and ASV curation; phylogenetic placement to reference trees; clustering via graph community detection.</p>
    `,
        author: {
            name: "Dr. Mira Rao",
            avatar: "/placeholder-user.jpg",
            role: "Marine Genomics Lead"
        },
        publishedAt: "2025-08-21",
        readTime: "7 min",
        category: "Biodiversity",
        tags: ["eDNA", "Metabarcoding", "Deep Sea", "Hotspots"],
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
        featured: true
    },
    {
        id: "2",
        title: "Integrating eDNA with optoacoustic imaging for deep‑sea monitoring",
        excerpt: "New workflows pair eDNA metabarcoding with optoacoustic imaging to map communities non‑invasively across depth gradients.",
        content: `
      <h2>Complementary signals</h2>
      <p>eDNA captures cryptic and rare taxa, while optoacoustic imaging provides spatial context and behavior. Together, they resolve both "who" and "where" in fragile deep‑sea habitats.</p>
      
      <h2>Field validation</h2>
      <p>Paired surveys across seamount flanks showed strong concordance between acoustic backscatter features and community shifts inferred from metabarcoding.</p>
      
      <h2>Implications</h2>
      <p>Managers gain decision‑ready layers for planning MPAs and assessing impact with minimal disturbance.</p>
    `,
        author: {
            name: "Research Fleet Team",
            avatar: "/placeholder-user.jpg",
            role: "Deep‑Sea Monitoring Group"
        },
        publishedAt: "2025-09-15",
        readTime: "6 min",
        category: "Technology",
        tags: ["eDNA", "Optoacoustics", "Monitoring"],
        image: "https://images.unsplash.com/photo-1505764706515-aa95265c5abc",
        featured: false
    },
    {
        id: "3",
        title: "AI‑assisted eDNA and optical imaging speed marine biodiversity surveys",
        excerpt: "Edge models fuse eDNA assignments with high‑resolution video to prioritize transects and reduce survey time.",
        content: `
      <h2>Multimodal pipeline</h2>
      <p>Onboard inference links sequence‑level detections to optical frames, guiding ROV transects to biodiversity hotspots in real time.</p>
      
      <h2>Measured gains</h2>
      <p>Teams completed equivalent taxonomic coverage with 38% fewer transects and fewer duplicate samples.</p>
    `,
        author: {
            name: "Ocean AI Lab",
            avatar: "/placeholder-user.jpg",
            role: "Computer Vision & Genomics"
        },
        publishedAt: "2025-09-08",
        readTime: "5 min",
        category: "Technology",
        tags: ["AI", "eDNA", "Imaging"],
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        featured: false
    },
    {
        id: "4",
        title: "Advanced imaging and AI accelerate ocean species discovery",
        excerpt: "High‑resolution 3D imaging with ML‑assisted curation streamlines taxonomic workflows for novel deep‑sea species.",
        content: `
      <h2>From pixels to taxa</h2>
      <p>Automated feature extraction and similarity search propose candidate taxa, which experts validate alongside genetic evidence.</p>
      
      <h2>Throughput</h2>
      <p>Specimen review time per candidate was reduced by nearly half in blinded trials.</p>
    `,
        author: {
            name: "Deep Discovery Network",
            avatar: "/placeholder-user.jpg",
            role: "Taxonomy & Imaging"
        },
        publishedAt: "2025-08-29",
        readTime: "6 min",
        category: "Biodiversity",
        tags: ["Imaging", "AI", "Discovery"],
        image: "https://images.unsplash.com/photo-1558980394-0c7b92899ab3",
        featured: false
    },
    {
        id: "5",
        title: "Sediment eDNA extends deep‑sea benthic biodiversity inventories",
        excerpt: "Metabarcoding of abyssal sediments captures taxa missed by trawls, improving baseline assessments.",
        content: `
      <h2>More complete baselines</h2>
      <p>Sediment eDNA added numerous meiofaunal and soft‑bodied groups under‑represented in physical collections.</p>
      
      <h2>Toward integration</h2>
      <p>Combining sediment eDNA with imagery and limited grabs provided the most stable community signal across sites.</p>
    `,
        author: {
            name: "Benthic Genomics Consortium",
            avatar: "/placeholder-user.jpg",
            role: "Abyssal Biodiversity"
        },
        publishedAt: "2025-08-18",
        readTime: "5 min",
        category: "Biodiversity",
        tags: ["Sediment", "Metabarcoding", "Benthic"],
        image: "https://images.unsplash.com/photo-1544552865-8ef8c1f1f7d1",
        featured: false
    },
    {
        id: "6",
        title: "Citizen scientists validate coastal eDNA finds",
        excerpt: "Community sampling weekends match lab detections for key coastal species with high agreement.",
        content: `
      <h2>Protocol</h2>
      <p>Simple kits with filtration, stabilization buffer, and QR‑guided metadata capture enabled high‑quality samples from volunteers.</p>
      
      <h2>Results</h2>
      <p>Agreement with lab‑collected controls exceeded 92% across 18 target taxa. Training modules reduced contamination events by 70%.</p>
    `,
        author: {
            name: "Lisa Wen",
            avatar: "/placeholder-user.jpg",
            role: "Citizen Science Coordinator"
        },
        publishedAt: "2025-03-16",
        readTime: "4 min",
        category: "Citizen Science",
        tags: ["Coastal", "Validation", "Community"],
        image: "/projects/flightpath.png",
        featured: false
    }
];

export const categories = [
    "All",
    "Biodiversity",
    "Technology",
    "Conservation",
    "Open Science",
    "Ethics",
    "Citizen Science"
];