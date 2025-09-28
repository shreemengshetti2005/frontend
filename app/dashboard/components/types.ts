/** A single geographic point with detailed information */
export type OccurrencePoint = {
  lat: number;
  lng: number;
  label: string;
  distribution_percent: number;
};

/** A single rank in the taxonomic hierarchy with a confidence score */
export type TaxonomyRank = {
  name: string;
  confidence: number;
};

/** The full taxonomic structure */
export type Taxonomy = {
  kingdom: TaxonomyRank;
  phylum: TaxonomyRank;
  class: TaxonomyRank;
  order: TaxonomyRank;
  family: TaxonomyRank;
  genus: TaxonomyRank;
  species: TaxonomyRank;
};

/** A close genetic match for novel DNA sequences */
export type CloseMatch = {
  name: string;
  sequence: string;
  match_score: number;
};

/** The main report data structure with all new fields */
export type DNAReport = {
  id: string;
  input_name?: string;
  input_sequence: string; // The user's input sequence
  novelty_status: 'Novel' | 'Known';
  close_matches?: CloseMatch[]; // For novel DNA
  genAI_summary: string;
  novelty_metrics: NoveltyMetric[];
  ecological_predictions: EcologicalPrediction[];
  biotech_significance: string[];
  taxonomy: Taxonomy;
  occurrence_points: OccurrencePoint[]; // Now uses the detailed type
  created_at: string;
  source_files?: string[];
};

// --- Other types remain the same for component props ---
export type LatLng = { lat: number; lng: number };
export type NoveltyMetric = { name: string; value: number; unit?: string; zscore?: number; interpretation: string; };
export type EcologicalPrediction = { name:string; probability: number; details: string; };
export type CardProps = { title?: string; subtitle?: string; children: React.ReactNode; className?: string; };
export type DashboardTab = 'summary' | 'geography' | 'taxonomy' | 'novelty' | 'ecology' | 'biotech' | 'sources';

