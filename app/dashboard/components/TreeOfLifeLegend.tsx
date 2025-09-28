'use client';

import { motion } from 'framer-motion';

interface TreeOfLifeLegendProps {
  className?: string;
}

export default function TreeOfLifeLegend({ className = '' }: TreeOfLifeLegendProps) {
  const legendItems = [
    { color: '#06b6d4', label: 'Internal nodes', description: 'Common ancestors' },
    { color: '#10b981', label: 'Leaf nodes', description: 'Current species' },
    { color: '#8b5cf6', label: 'Target species', description: 'Analysis subject' },
    { color: '#f59e0b', label: 'High confidence', description: 'Strong support' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-4 bg-slate-50/50 rounded-lg border border-slate-200/50 ${className}`}
    >
      <h4 className="text-sm font-semibold text-slate-900 mb-3">Legend</h4>
      <div className="space-y-2">
        {legendItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            className="flex items-center space-x-3"
          >
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-slate-900">
                {item.label}
              </span>
              <p className="text-xs text-slate-600">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
