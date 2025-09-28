'use client';

import { motion } from 'framer-motion';
import Card from './Card';
import { useBiotechSignificance } from './hooks/useReportData';

export default function BioTechSignificanceCard() {
  const significance = useBiotechSignificance();

  return (
    <Card 
      size="medium" 
      title="Biotech Significance" 
      subtitle="Commercial Applications"
    >
      <div className="space-y-3">
        {significance.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-400/30"
          >
            <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {index + 1}
              </span>
            </div>
            <p className="text-sm text-white/90 leading-relaxed">
              {item}
            </p>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="mt-4 p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-400/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
          <span className="text-sm font-medium text-purple-200">
            High Commercial Potential
          </span>
        </div>
        <p className="text-xs text-purple-300 mt-1">
          Multiple pathways identified for pharmaceutical and industrial applications
        </p>
      </motion.div>
    </Card>
  );
}
