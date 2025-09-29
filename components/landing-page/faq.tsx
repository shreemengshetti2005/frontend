"use client"

import {useState} from "react"
import {ChevronDown} from "lucide-react"

const faqs = [
    {
        id: 1,
        question: "How does the system handle incomplete reference databases?",
        answer:
            "Our solution uses AI-driven embeddings and unsupervised clustering (HDBSCAN) to characterize unknown eDNA sequences. This allows us to identify novel species groups even without database matches, eliminating 'unassigned reads' and providing a complete picture of deep-sea biodiversity.",
    },
    {
        id: 2,
        question: "How fast is the analysis compared to traditional methods?",
        answer:
            "Our hybrid approach significantly reduces computational time by replacing exhaustive alignments with fast vector searches using Milvus. We run targeted BLAST only on representative sequences from identified clusters rather than the entire dataset, dramatically improving efficiency and making high-throughput eDNA processing more feasible.",
    },
    {
        id: 3,
        question: "What technologies power the pipeline?",
        answer:
            "We use a modern tech stack including Next.js and Tailwind for frontend, Node.js and FastAPI for backend, Milvus vector database for similarity searches, MongoDB for data storage, and PyTorch with Gemini for AI/ML processing. Our AI pipeline leverages Mamba architecture, HNSW search, and HDBSCAN clustering.",
    },
    {
        id: 4,
        question: "Can the system discover completely new species?",
        answer:
            "Yes! Our pipeline is specifically designed to proactively identify and characterize novel species that don't exist in current reference databases. The system creates 'Discovery Cards' for novel taxa and allows new discoveries to be integrated back into the database, making it progressively smarter.",
    },
    {
        id: 5,
        question: "Is the platform compatible with existing eDNA workflows?",
        answer:
            "Absolutely. The system is designed with modularity in mind and integrates smoothly with existing bioinformatics tools. It accepts standard FASTQ/FASTA inputs and produces QIIME2/DADA2-compatible outputs, ensuring seamless integration with current lab pipelines.",
    },
    {
        id: 6,
        question: "How does the system scale with large datasets?",
        answer:
            "The platform uses cloud infrastructure that scales automatically with distributed Milvus vector database and ANN search to maintain efficiency at scale. The modular design keeps computational costs low while handling massive eDNA datasets, making high-throughput processing feasible for researchers worldwide.",
    },
]

export default function Faq() {
    const [openItem, setOpenItem] = useState<number | null>(null)

    const toggleItem = (id: number) => {
        setOpenItem(openItem === id ? null : id)
    }

    return (
        <section id="faq" className="my-20">
            <div className="card p-8 md:p-10 shadow-lg">
                {/* Header Section */}
                <div className="text-center mb-12 sm:mb-16 lg:mb-20 relative z-10">
                    <div className="inline-block mb-6">
            <span
                className="px-4 py-2 bg-[#7A7FEE]/10 text-[#7A7FEE] dark:bg-[#7A7FEE]/20 dark:text-[#7A7FEE] text-sm font-semibold rounded-full border border-[#7A7FEE]/20 dark:border-[#7A7FEE]/30 backdrop-blur-sm">
              <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path
                    d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z"/>
              </svg>
              FREQUENTLY ASKED
            </span>
                    </div>

                    <h2 className="text-black dark:text-white mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                        Frequently Asked
                        <span className="block text-[#7A7FEE] dark:text-[#7A7FEE] mt-2">
              Questions
            </span>
                    </h2>

                    <p className="mb-8 max-w-4xl mx-auto text-gray-600 dark:text-gray-300 text-lg sm:text-xl leading-relaxed px-4">
                        Have questions about our services? Find answers to the most common questions and learn how our
                        team can
                        enhance your creative process.
                    </p>

                    <div className="flex justify-center">
                        <div className="w-20 sm:w-32 h-1 bg-[#7A7FEE] rounded-full"></div>
                    </div>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq) => (
                        <div key={faq.id} className="border-b pb-4 border-gray-300 dark:border-gray-700">
                            <button
                                onClick={() => toggleItem(faq.id)}
                                className="flex justify-between items-center w-full text-left py-2 font-medium text-black dark:text-white hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] transition-colors"
                                aria-expanded={openItem === faq.id}
                                aria-controls={`faq-answer-${faq.id}`}
                            >
                                <span className="font-medium">{faq.question}</span>
                                <ChevronDown
                                    className={`w-5 h-5 transition-transform ${openItem === faq.id ? "rotate-180 text-[#7A7FEE]" : ""}`}
                                />
                            </button>
                            {openItem === faq.id && (
                                <div id={`faq-answer-${faq.id}`} className="mt-2 text-gray-700 dark:text-gray-300">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
