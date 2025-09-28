export type LatLng = { 
  lat: number; 
  lng: number; 
  weight?: number;
  label?: string;
};

export type Taxonomy = {
  kingdom: string;
  phylum?: string;
  class?: string;
  order?: string;
  family?: string;
  genus?: string;
  species?: string;
};

export type NoveltyMetric = {
  name: string;              // e.g. "GC Content"
  value: number;
  unit?: string;
  zscore?: number;
  interpretation?: string;   // short text
};

export type EcologicalPrediction = {
  name: string;              // e.g. "Metabolism"
  probability: number;       // 0-1
  details?: string;
};

export type TreeOfLifeNode = {
  id: string;
  parentId?: string;
  label: string;
  level: number;
  x?: number;
  y?: number;
  children?: TreeOfLifeNode[];
};

export type DNAReport = {
  id: string;
  input_name?: string;
  genAI_summary: string;                // paragraph
  novelty_metrics: NoveltyMetric[];     // list
  ecological_predictions: EcologicalPrediction[]; // list
  biotech_significance: string[];       // bullets
  taxonomy: Taxonomy;
  tree_of_life_coordinates?: TreeOfLifeNode[];       // structure for phylo tree nodes
  occurrence_points: LatLng[];          // for globe (may be empty)
  created_at: string;
  source_files?: string[];
};

export type CardSize = 'small' | 'medium' | 'large';

export type CardProps = {
  size?: CardSize;
  title?: string;
  subtitle?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export type DashboardData = {
  report: DNAReport;
  isLoading: boolean;
  error: string | null;
};

// Chart data types
export type ChartDataPoint = {
  name: string;
  value: number;
  color?: string;
};

export type TimeSeriesDataPoint = {
  date: string;
  value: number;
  label?: string;
};

// Globe data types
export type GlobeMarker = {
  lat: number;
  lng: number;
  size: number;
  color: string;
  label?: string;
};

// Phylogenetic tree data types
export type PhylogeneticNode = {
  id: string;
  name: string;
  parent?: string;
  children?: PhylogeneticNode[];
  distance?: number;
  confidence?: number;
};
