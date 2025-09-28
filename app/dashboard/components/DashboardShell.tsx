'use client';

import { motion } from 'framer-motion';
import { useReportData } from './hooks/useReportData';
import Card from './Card';
import GenAISummaryCard from './GenAISummaryCard';
import NoveltyMetricsCard from './NoveltyMetricsCard';
import EcologicalPredictionsCard from './EcologicalPredictionsCard';
import BioTechSignificanceCard from './BioTechSignificanceCard';
import PhylogeneticTreeCard from './PhylogeneticTreeCard';
import GlobeCard from './GlobeCard';

export default function DashboardShell() {
  const { report, isLoading, error } = useReportData();

  if (error) {
    return (
      <div className="dashboard-background flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Error Loading Report
          </h2>
          <p className="text-white/80">{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="dashboard-background p-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <div className="h-8 w-64 bg-white/20 rounded-lg animate-pulse" />
            <div className="mt-2 h-4 w-96 bg-white/20 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-48 animate-pulse border border-white/20">
                <div className="h-4 w-3/4 bg-white/20 rounded mb-4" />
                <div className="space-y-2">
                  <div className="h-3 w-full bg-white/20 rounded" />
                  <div className="h-3 w-5/6 bg-white/20 rounded" />
                  <div className="h-3 w-4/6 bg-white/20 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-background">
      {/* Header */}
      <motion.header 
        className="bg-white/10 backdrop-blur-sm border-b border-white/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                DNA Final Report
              </h1>
              <p className="text-white/80 mt-1 text-lg">
                {report.input_name || 'Scientific Analysis Dashboard'}
              </p>
            </div>
            <div className="text-sm text-white/70">
              Generated {new Date(report.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Dashboard Grid */}
      <main className="mx-auto max-w-7xl p-4">
        <motion.div 
          className="dashboard-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* GenAI Summary - Large card */}
          <GenAISummaryCard />

          {/* Novelty Metrics - Medium card */}
          <NoveltyMetricsCard />

          {/* Ecological Predictions - Medium card */}
          <EcologicalPredictionsCard />

          {/* Biotech Significance - Medium card */}
          <BioTechSignificanceCard />

          {/* Phylogenetic Tree - Large card */}
          <PhylogeneticTreeCard />

          {/* 3D Globe - Large card */}
          <GlobeCard />

          {/* Additional metrics cards */}
          <Card size="small" title="Taxonomy" subtitle="Classification">
            <div className="space-y-2">
              {Object.entries(report.taxonomy).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="scientific-label capitalize text-white/80">{key}:</span>
                  <span className="font-medium text-white">{value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card size="small" title="Data Sources" subtitle="Input Files">
            <div className="space-y-1">
              {report.source_files?.map((file, index) => (
                <div key={index} className="text-sm text-white/80 flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2" />
                  {file}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
