'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { DNAReport, DashboardData } from '../types';

// Mock data generator for development
const generateMockReport = (): DNAReport => ({
  id: 'report-001',
  input_name: 'Sample DNA Sequence Analysis',
  genAI_summary: 'This DNA sequence exhibits remarkable genetic diversity with several novel markers indicating potential evolutionary significance. The analysis reveals unique genomic patterns that suggest this organism may represent a previously undocumented species or subspecies. Key findings include elevated GC content, distinctive codon usage patterns, and phylogenetic markers that place it in a unique position within the evolutionary tree.',
  novelty_metrics: [
    { name: 'GC Content', value: 58.3, unit: '%', zscore: 2.1, interpretation: 'Significantly elevated' },
    { name: 'Codon Diversity', value: 0.847, unit: 'index', zscore: 1.8, interpretation: 'High diversity' },
    { name: 'Phylogenetic Distance', value: 0.234, unit: 'substitutions/site', zscore: 3.2, interpretation: 'Novel lineage' },
    { name: 'Repeat Content', value: 12.7, unit: '%', zscore: -0.5, interpretation: 'Within normal range' },
  ],
  ecological_predictions: [
    { name: 'Metabolism', probability: 0.89, details: 'Aerobic respiration with facultative anaerobic capabilities' },
    { name: 'Habitat', probability: 0.76, details: 'Terrestrial with potential aquatic adaptation' },
    { name: 'Trophic Level', probability: 0.82, details: 'Primary consumer with omnivorous tendencies' },
    { name: 'Climate Adaptation', probability: 0.71, details: 'Temperate to subtropical climate preference' },
  ],
  biotech_significance: [
    'Novel enzyme pathways for pharmaceutical applications',
    'Potential source of antimicrobial compounds',
    'Unique metabolic capabilities for bioremediation',
    'Genetic markers for species identification',
    'Evolutionary insights for conservation biology',
  ],
  taxonomy: {
    kingdom: 'Animalia',
    phylum: 'Chordata',
    class: 'Mammalia',
    order: 'Primates',
    family: 'Hominidae',
    genus: 'Homo',
    species: 'sapiens',
  },
  tree_of_life_coordinates: [
    { id: 'root', label: 'Life', level: 0 },
    { id: 'eukarya', parentId: 'root', label: 'Eukarya', level: 1 },
    { id: 'animalia', parentId: 'eukarya', label: 'Animalia', level: 2 },
    { id: 'chordata', parentId: 'animalia', label: 'Chordata', level: 3 },
    { id: 'mammalia', parentId: 'chordata', label: 'Mammalia', level: 4 },
    { id: 'primates', parentId: 'mammalia', label: 'Primates', level: 5 },
    { id: 'hominidae', parentId: 'primates', label: 'Hominidae', level: 6 },
    { id: 'homo', parentId: 'hominidae', label: 'Homo', level: 7 },
    { id: 'sapiens', parentId: 'homo', label: 'H. sapiens', level: 8 },
  ],
  occurrence_points: [
    { lat: 40.7128, lng: -74.0060, weight: 0.8, label: 'New York' },
    { lat: 34.0522, lng: -118.2437, weight: 0.6, label: 'Los Angeles' },
    { lat: 51.5074, lng: -0.1278, weight: 0.7, label: 'London' },
    { lat: 35.6762, lng: 139.6503, weight: 0.5, label: 'Tokyo' },
    { lat: -33.8688, lng: 151.2093, weight: 0.4, label: 'Sydney' },
  ],
  created_at: new Date().toISOString(),
  source_files: ['sequence_001.fasta', 'metadata.json', 'analysis_report.pdf'],
});

// Context for sharing report data
const DNAReportContext = createContext<DashboardData | null>(null);

// Provider component
export function DNAReportProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DashboardData>({
    report: generateMockReport(),
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Simulate API call
    const fetchReport = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real app, this would be an actual API call
        const report = generateMockReport();
        
        setData({
          report,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setData(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to load report',
        }));
      }
    };

    fetchReport();
  }, []);

  return (
    <DNAReportContext.Provider value={data}>
      {children}
    </DNAReportContext.Provider>
  );
}

// Hook to use report data
export function useReportData() {
  const context = useContext(DNAReportContext);
  if (!context) {
    throw new Error('useReportData must be used within a DNAReportProvider');
  }
  return context;
}

// Hook for specific report sections
export function useNoveltyMetrics() {
  const { report } = useReportData();
  return report.novelty_metrics;
}

export function useEcologicalPredictions() {
  const { report } = useReportData();
  return report.ecological_predictions;
}

export function useBiotechSignificance() {
  const { report } = useReportData();
  return report.biotech_significance;
}

export function useTaxonomy() {
  const { report } = useReportData();
  return report.taxonomy;
}

export function useOccurrencePoints() {
  const { report } = useReportData();
  return report.occurrence_points;
}

export function useTreeOfLifeData() {
  const { report } = useReportData();
  return report.tree_of_life_coordinates || [];
}
