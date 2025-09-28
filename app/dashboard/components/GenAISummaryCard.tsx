'use client';

import { motion } from 'framer-motion';
import Card from './Card';
import { useReportData } from './hooks/useReportData';

export default function GenAISummaryCard() {
  const { report } = useReportData();

  return (
    <Card 
      size="large" 
      title="AI-Generated Summary" 
      subtitle="Comprehensive Analysis Overview"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="prose prose-slate max-w-none"
      >
        <p className="text-white/90 leading-relaxed text-lg">
          {report.genAI_summary}
        </p>
      </motion.div>
      
      <motion.div 
        className="mt-6 flex flex-wrap gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-200 border border-purple-400/30">
          AI Analysis
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-200 border border-blue-400/30">
          Scientific Review
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-200 border border-green-400/30">
          Genomic Insights
        </span>
      </motion.div>
    </Card>
  );
}
