'use client';

import { motion } from 'framer-motion';
import Card, { MetricCard } from './Card';
import { useNoveltyMetrics } from './hooks/useReportData';

export default function NoveltyMetricsCard() {
  const metrics = useNoveltyMetrics();

  return (
    <Card 
      size="medium" 
      title="Novelty Metrics" 
      subtitle="Statistical Analysis"
    >
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-white/10 rounded-lg border border-white/20"
          >
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-white">
                  {metric.name}
                </span>
                <span className="text-sm font-bold text-purple-300">
                  {metric.value}
                  {metric.unit && <span className="text-white/60 ml-1">{metric.unit}</span>}
                </span>
              </div>
              
              {metric.zscore && (
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-white/20 rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.min(Math.abs(metric.zscore) * 20, 100)}%`,
                        backgroundColor: metric.zscore > 0 ? '#a855f7' : '#ef4444'
                      }}
                    />
                  </div>
                  <span className={`text-xs font-medium ${
                    metric.zscore > 0 ? 'text-purple-300' : 'text-red-300'
                  }`}>
                    Z: {metric.zscore > 0 ? '+' : ''}{metric.zscore.toFixed(1)}
                  </span>
                </div>
              )}
              
              {metric.interpretation && (
                <p className="text-xs text-white/70 mt-1">
                  {metric.interpretation}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="mt-4 p-3 bg-purple-500/20 rounded-lg border border-purple-400/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full" />
          <span className="text-sm font-medium text-purple-200">
            High Novelty Detected
          </span>
        </div>
        <p className="text-xs text-purple-300 mt-1">
          Multiple metrics indicate significant genetic uniqueness
        </p>
      </motion.div>
    </Card>
  );
}
