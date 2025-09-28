'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { BarChart2, Dna, Globe, Microscope, Cpu, FileText, FlaskConical } from 'lucide-react';

import BioTechSignificanceCard from './BioTechSignificanceCard';
import EcologicalPredictionsCard from './EcologicalPredictionsCard';
import GenAISummaryCard from './GenAISummaryCard';
import GlobeCard from './GlobeCard';
import NoveltyMetricsCard from './NoveltyMetricsCard';
import TaxonomyHierarchyCard from './TaxonomyHierarchyCard';
import { ThemeSwitcher } from './ThemeSwitcher';
import { DashboardTab } from './types';
import { useReportData } from './hooks/useReportData';
import Card from './Card';

const TABS: { id: DashboardTab; label: string; icon: React.ReactNode }[] = [
  { id: 'summary', label: 'AI Summary', icon: <Cpu size={16} /> },
  { id: 'geography', label: 'Geography', icon: <Globe size={16} /> },
  { id: 'taxonomy', label: 'Taxonomy', icon: <Dna size={16} /> },
  { id: 'novelty', label: 'Novelty Metrics', icon: <BarChart2 size={16} /> },
  { id: 'ecology', label: 'Ecology', icon: <Microscope size={16} /> },
  { id: 'biotech', label: 'Biotech', icon: <FlaskConical size={16} /> },
  { id: 'sources', label: 'Data Sources', icon: <FileText size={16} /> },
];

export default function DashboardShell() {
  const { report, isLoading, error } = useReportData();
  const [activeTab, setActiveTab] = useState<DashboardTab>('summary');

  // Loading and error states remain the same

  const renderContent = () => {
    switch (activeTab) {
      case 'summary': return <GenAISummaryCard />;
      case 'geography': return <GlobeCard />;
      case 'taxonomy': return <TaxonomyHierarchyCard />;
      case 'novelty': return <NoveltyMetricsCard />;
      case 'ecology': return <EcologicalPredictionsCard />;
      case 'biotech': return <BioTechSignificanceCard />;
      case 'sources': return (
        <Card title="Data Sources" subtitle="Input files for this analysis">
            <div className="space-y-2 mt-4">
              {report?.source_files?.map((file, index) => (
                <a
                  key={index}
                  href={`/downloads/${file}`}
                  download={file}
                  className="group flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                   <FileText size={16} className="mr-2 text-primary/50 group-hover:text-primary transition-colors" />
                  <span className="underline decoration-muted group-hover:decoration-current">
                    {file}
                  </span>
                </a>
              ))}
            </div>
        </Card>
      );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen">
      <motion.header 
        className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h1 className="text-xl font-bold text-foreground">DNA Final Report</h1>
              <p className="text-sm text-muted-foreground">{report?.input_name}</p>
            </div>
            <div className="flex items-center gap-2"><ThemeSwitcher /></div>
          </div>
        </div>
        
        <nav className="mx-auto max-w-7xl px-4">
            <div className="overflow-x-auto">
                <div className="relative flex items-center border-b">
                    {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative flex items-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors ${activeTab === tab.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        {tab.icon}
                        {tab.label}
                        {activeTab === tab.id && ( <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"/>)}
                    </button>
                    ))}
                </div>
            </div>
        </nav>
      </motion.header>

      <main className="mx-auto max-w-7xl p-4 lg:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

