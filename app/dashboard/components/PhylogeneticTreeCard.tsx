'use client';

import { motion } from 'framer-motion';
import Card from './Card';
import { useTreeOfLifeData } from './hooks/useReportData';

export default function PhylogeneticTreeCard() {
  const treeData = useTreeOfLifeData();

  return (
    <Card 
      size="medium" 
      title="Evolutionary Timeline" 
      subtitle="Phylogenetic Relationships"
    >
      <div className="space-y-4">
        {treeData.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center space-x-4 p-3 bg-white/10 rounded-lg border border-white/20"
          >
            <div className="flex-shrink-0">
              <div className={`w-4 h-4 rounded-full ${
                node.level === 0 ? 'bg-purple-500' :
                node.level <= 2 ? 'bg-blue-500' :
                node.level <= 4 ? 'bg-green-500' :
                node.level <= 6 ? 'bg-yellow-500' :
                'bg-red-500'
              }`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-white">
                  {node.label}
                </h4>
                <span className="text-sm text-white/70">
                  Level {node.level}
                </span>
              </div>
              {node.parentId && (
                <p className="text-sm text-white/60 mt-1">
                  Child of: {treeData.find(n => n.id === node.parentId)?.label || 'Root'}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full" />
              <span className="text-white/80">Root</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-white/80">Domain</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-white/80">Kingdom</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span className="text-white/80">Phylum</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-white/80">Species</span>
            </div>
          </div>
          <span className="text-xs text-white/60">
            {treeData.length} taxonomic levels
          </span>
        </div>
      </motion.div>
    </Card>
  );
}
