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
        title: "The Future of Research: AI-Powered Discovery",
        excerpt: "Explore how artificial intelligence is revolutionizing the way we conduct research and accelerating scientific breakthroughs across multiple disciplines.",
        content: `
      <h2>Introduction</h2>
      <p>The landscape of scientific research is undergoing a profound transformation. Artificial intelligence, once confined to the realm of science fiction, has become an indispensable tool in the researcher's arsenal.</p>
      
      <h2>AI in Data Analysis</h2>
      <p>Machine learning algorithms can now process vast datasets in minutes, identifying patterns that would take human researchers months to discover. This capability is particularly valuable in fields like genomics, climate science, and particle physics.</p>
      
      <h2>Accelerating Discovery</h2>
      <p>AI-powered tools are not just making research faster—they're making it smarter. By analyzing existing literature and identifying gaps in knowledge, AI can suggest new research directions and hypotheses.</p>
      
      <h2>The Human Element</h2>
      <p>While AI is transforming research, the human element remains crucial. Creativity, intuition, and ethical reasoning are irreplaceable qualities that researchers bring to the scientific process.</p>
      
      <h2>Looking Forward</h2>
      <p>As we look to the future, the partnership between human researchers and AI promises to unlock discoveries we can barely imagine today.</p>
    `,
        author: {
            name: "Dr. Sarah Chen",
            avatar: "/avatars/sarah-chen.jpg",
            role: "AI Research Director"
        },
        publishedAt: "2024-01-15",
        readTime: "8 min",
        category: "Technology",
        tags: ["AI", "Research", "Innovation", "Future"],
        image: "/blog/ai-research.jpg",
        featured: true
    },
    {
        id: "2",
        title: "Collaborative Science: Breaking Down Silos",
        excerpt: "Learn how modern research platforms are enabling unprecedented collaboration between scientists worldwide, fostering innovation and accelerating progress.",
        content: `
      <h2>The Power of Collaboration</h2>
      <p>Modern science is increasingly collaborative. The days of isolated researchers working in silos are giving way to interconnected networks of scientists sharing knowledge and resources.</p>
      
      <h2>Digital Platforms</h2>
      <p>Cloud-based research platforms are making it easier than ever for scientists to collaborate across geographical and institutional boundaries. Real-time data sharing, collaborative analysis tools, and virtual laboratories are becoming the norm.</p>
      
      <h2>Cross-Disciplinary Research</h2>
      <p>The most exciting breakthroughs often happen at the intersection of different fields. Collaborative platforms are facilitating these cross-disciplinary connections.</p>
      
      <h2>Challenges and Solutions</h2>
      <p>While collaboration offers immense benefits, it also presents challenges around data security, intellectual property, and coordination. Modern platforms are addressing these concerns with sophisticated access controls and collaboration frameworks.</p>
    `,
        author: {
            name: "Prof. Michael Rodriguez",
            avatar: "/avatars/michael-rodriguez.jpg",
            role: "Collaboration Specialist"
        },
        publishedAt: "2024-01-12",
        readTime: "6 min",
        category: "Collaboration",
        tags: ["Collaboration", "Science", "Platforms", "Innovation"],
        image: "/blog/collaboration.jpg",
        featured: false
    },
    {
        id: "3",
        title: "Open Science Movement: Democratizing Knowledge",
        excerpt: "Discover how the open science movement is making research more accessible, transparent, and reproducible, ultimately benefiting society as a whole.",
        content: `
      <h2>What is Open Science?</h2>
      <p>Open science is a movement to make scientific research, data, and dissemination accessible to all levels of an inquiring society, amateur or professional.</p>
      
      <h2>Benefits of Open Access</h2>
      <p>Open access publishing ensures that research findings are available to everyone, not just those with institutional subscriptions. This democratization of knowledge accelerates innovation and enables more equitable participation in scientific discourse.</p>
      
      <h2>Data Sharing</h2>
      <p>Open data initiatives allow researchers to build upon each other's work more effectively, leading to faster scientific progress and better reproducibility of results.</p>
      
      <h2>Challenges and Opportunities</h2>
      <p>While open science presents challenges around quality control and funding models, it also offers unprecedented opportunities for global collaboration and knowledge sharing.</p>
    `,
        author: {
            name: "Dr. Emma Thompson",
            avatar: "/avatars/emma-thompson.jpg",
            role: "Open Science Advocate"
        },
        publishedAt: "2024-01-10",
        readTime: "7 min",
        category: "Open Science",
        tags: ["Open Science", "Access", "Knowledge", "Democracy"],
        image: "/blog/open-science.jpg",
        featured: false
    },
    {
        id: "4",
        title: "Research Ethics in the Digital Age",
        excerpt: "Navigate the complex ethical landscape of modern research, from data privacy to AI bias, and learn best practices for responsible scientific inquiry.",
        content: `
      <h2>Digital Ethics Challenges</h2>
      <p>The digital transformation of research has introduced new ethical challenges that researchers must navigate carefully. From data privacy to algorithmic bias, the stakes have never been higher.</p>
      
      <h2>Data Privacy and Consent</h2>
      <p>With the increasing use of personal data in research, obtaining proper consent and ensuring privacy protection has become more complex but also more critical.</p>
      
      <h2>AI and Algorithmic Bias</h2>
      <p>As AI becomes more prevalent in research, we must be vigilant about algorithmic bias and ensure that our tools don't perpetuate or amplify existing inequalities.</p>
      
      <h2>Best Practices</h2>
      <p>Establishing clear ethical guidelines, regular ethics reviews, and transparent reporting practices are essential for maintaining public trust in scientific research.</p>
    `,
        author: {
            name: "Prof. David Kim",
            avatar: "/avatars/david-kim.jpg",
            role: "Ethics Committee Chair"
        },
        publishedAt: "2024-01-08",
        readTime: "9 min",
        category: "Ethics",
        tags: ["Ethics", "Privacy", "AI", "Responsibility"],
        image: "/blog/research-ethics.jpg",
        featured: false
    },
    {
        id: "5",
        title: "The Rise of Citizen Science",
        excerpt: "Explore how technology is enabling ordinary citizens to contribute meaningfully to scientific research, creating new opportunities for discovery and engagement.",
        content: `
      <h2>Democratizing Research</h2>
      <p>Citizen science is transforming how we think about who can contribute to scientific knowledge. Modern technology platforms are making it possible for anyone with curiosity and dedication to participate in meaningful research.</p>
      
      <h2>Technology as an Enabler</h2>
      <p>Smartphone apps, online platforms, and simplified data collection tools are lowering the barriers to participation in scientific research.</p>
      
      <h2>Success Stories</h2>
      <p>From astronomical discoveries to biodiversity monitoring, citizen scientists have made significant contributions to our understanding of the world around us.</p>
      
      <h2>Quality and Validation</h2>
      <p>While citizen science offers tremendous opportunities, ensuring data quality and proper validation remains crucial for maintaining scientific rigor.</p>
    `,
        author: {
            name: "Dr. Lisa Wang",
            avatar: "/avatars/lisa-wang.jpg",
            role: "Citizen Science Coordinator"
        },
        publishedAt: "2024-01-05",
        readTime: "5 min",
        category: "Citizen Science",
        tags: ["Citizen Science", "Technology", "Participation", "Discovery"],
        image: "/blog/citizen-science.jpg",
        featured: true
    },
    {
        id: "6",
        title: "Sustainable Research Practices",
        excerpt: "Learn about environmentally conscious research methods and how institutions are reducing their carbon footprint while maintaining scientific excellence.",
        content: `
      <h2>The Environmental Impact of Research</h2>
      <p>Scientific research, while advancing human knowledge, also has an environmental footprint. From energy-intensive computing to travel for conferences, researchers are increasingly aware of their environmental impact.</p>
      
      <h2>Green Computing</h2>
      <p>Cloud computing and energy-efficient data centers are helping reduce the carbon footprint of computational research while maintaining performance.</p>
      
      <h2>Virtual Collaboration</h2>
      <p>The pandemic accelerated the adoption of virtual collaboration tools, which continue to reduce travel-related emissions while enabling global research partnerships.</p>
      
      <h2>Sustainable Lab Practices</h2>
      <p>From reducing waste to using renewable energy, research institutions are implementing comprehensive sustainability programs.</p>
    `,
        author: {
            name: "Dr. James Miller",
            avatar: "/avatars/james-miller.jpg",
            role: "Sustainability Officer"
        },
        publishedAt: "2024-01-03",
        readTime: "6 min",
        category: "Sustainability",
        tags: ["Sustainability", "Environment", "Green", "Practices"],
        image: "/blog/sustainable-research.jpg",
        featured: false
    }
];

export const categories = [
    "All",
    "Technology",
    "Collaboration",
    "Open Science",
    "Ethics",
    "Citizen Science",
    "Sustainability"
];