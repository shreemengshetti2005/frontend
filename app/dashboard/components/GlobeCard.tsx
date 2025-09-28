'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useReportData } from './hooks/useReportData';
import { motion } from 'framer-motion';

const Globe = dynamic(() => import('./Globe').then((mod) => mod.Globe), {
  ssr: false,
  loading: () => <GlobeLoader />,
});

const GlobeLoader = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-muted-foreground">Loading Interactive 3D Globe...</p>
      </div>
    </div>
);

export default function GlobeCard() {
  const { report } = useReportData();
  const totalPoints = report?.occurrence_points?.length || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[75vh]">
      <div className="lg:col-span-2 h-full min-h-[400px] rounded-lg border bg-card overflow-hidden">
        <Suspense fallback={<GlobeLoader />}>
            <Globe />
        </Suspense>
      </div>

      <div className="lg:col-span-1">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Prime Locations</h2>
        <p className="text-muted-foreground mt-1">{totalPoints} significant locations identified.</p>

        <div className="mt-6 space-y-3">
          {report?.occurrence_points?.map((point, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="p-3 rounded-lg border bg-card"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">{point.label}</span>
                <span className="font-mono text-sm text-primary">{point.distribution_percent}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-1.5 mt-2">
                <div 
                  className="bg-primary h-1.5 rounded-full" 
                  style={{ width: `${point.distribution_percent}%`}}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

