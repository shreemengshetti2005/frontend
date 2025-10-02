import PortfolioPage from "@/components/portfolio/portfolio-page"
import { fetchPortfolioData } from "@/utils/csv-parser"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolio | ClustrAI",
  description:
    "Explore our latest projects and case studies in AI-powered bioinformatics.",
}

export default async function Portfolio() {
  const portfolioData = await fetchPortfolioData()

  return <PortfolioPage initialData={portfolioData} />
}
