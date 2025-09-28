'use client';

import { motion } from 'framer-motion';
import { useNoveltyMetrics, useReportData } from './hooks/useReportData';

export default function NoveltyMetricsCard() {
  const metrics = useNoveltyMetrics();
  const { report } = useReportData();

  return (
    <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Novelty Metrics</h2>
        <p className="text-muted-foreground mt-1">Statistical analysis of genetic uniqueness for: <strong className="text-foreground">{report?.input_name}</strong></p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {metrics.map((metric, index) => {
                const zScorePercent = metric.zscore ? Math.min(Math.abs(metric.zscore) * 20, 100) : 0;
                const barColor = metric.zscore && metric.zscore > 0 ? 'bg-purple-500' : 'bg-red-500';

                return (
                <motion.div
                    key={metric.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="p-4 bg-card rounded-lg border"
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-foreground">{metric.name}</span>
                        <span className="font-mono text-lg font-bold text-primary">{metric.value}{metric.unit}</span>
                    </div>

                    {metric.zscore != null && (
                        <div className="w-full bg-secondary rounded-full h-2 mt-3">
                            <div className={`${barColor} h-2 rounded-full`} style={{ width: `${zScorePercent}%` }} />
                        </div>
                    )}
                    
                    <p className="mt-3 text-sm text-muted-foreground">{metric.interpretation}</p>
                </motion.div>
                );
            })}
        </div>
    </div>
  );
}

