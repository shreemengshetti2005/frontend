'use client';

import { useReportData } from './hooks/useReportData';
import { motion } from 'framer-motion';

const rankIcons: { [key: string]: string } = {
  kingdom: '👑', phylum: '🌿', class: '🐾', order: '🦉',
  family: '👨‍👩‍👧', genus: '🧬', species: '🔬',
};

export default function TaxonomyHierarchyCard() {
  const { report } = useReportData();
  const taxonomy = report?.taxonomy;
  if (!taxonomy) return null;
  
  const ranks = ['kingdom', 'phylum', 'class', 'order', 'family', 'genus', 'species'];

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">Evolutionary Lineage</h2>
      <p className="text-muted-foreground mt-1 text-center">Confidence-scored taxonomic classification.</p>

      <div className="relative mt-12 w-full max-w-3xl mx-auto p-4">
        <div className="absolute top-0 left-1/2 -ml-px h-full w-0.5 bg-border" />
        
        {ranks.map((rankKey, index) => {
          const rankData = taxonomy[rankKey as keyof typeof taxonomy];
          if (!rankData) return null;
          const isLeft = index % 2 === 0;

          return (
            <div key={rankKey} className="relative my-12">
              <motion.div 
                className={`w-1/2 ${isLeft ? 'pr-10' : 'pl-10 ml-auto'}`}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className={`p-4 rounded-lg border bg-card shadow-sm ${isLeft ? 'text-right' : 'text-left'}`}>
                  <p className="text-sm capitalize text-muted-foreground">{rankKey}</p>
                  <p className="text-xl font-bold text-foreground">{rankData.name}</p>
                  <div className="mt-2 text-xs font-semibold text-primary">{rankData.confidence}% Confidence</div>
                </div>
              </motion.div>

              <div className="absolute top-1/2 -mt-5 left-1/2 -ml-5 h-10 w-10 rounded-full bg-secondary border-4 border-background flex items-center justify-center text-xl">
                {rankIcons[rankKey]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

