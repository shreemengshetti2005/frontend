'use client';

import { motion } from 'framer-motion';
import Card from './Card';
import { useEcologicalPredictions } from './hooks/useReportData';
import { CheckCircle, HelpCircle } from 'lucide-react';

export default function EcologicalPredictionsCard() {
  const predictions = useEcologicalPredictions();

  return (
    <Card 
      title="Ecological Predictions" 
      subtitle="Machine learning analysis of environmental traits"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {predictions.map((prediction, index) => {
          const probability = Math.round(prediction.probability * 100);
          const isHighConfidence = probability > 70;
          const color = isHighConfidence ? 'text-green-500' : 'text-amber-500';
          const bgColor = isHighConfidence ? 'bg-green-500' : 'bg-amber-500';
          const Icon = isHighConfidence ? CheckCircle : HelpCircle;

          return (
          <motion.div
            key={prediction.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-4 bg-card rounded-lg border"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-foreground text-lg">{prediction.name}</h4>
              <div className={`flex items-center gap-2 font-bold ${color}`}>
                <Icon size={18} />
                <span>{probability}%</span>
              </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{prediction.details}</p>
            <div className="w-full bg-secondary rounded-full h-2 mt-3">
              <motion.div
                className={`${bgColor} h-2 rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${probability}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
              />
            </div>
          </motion.div>
        )})}
      </div>
    </Card>
  );
}

