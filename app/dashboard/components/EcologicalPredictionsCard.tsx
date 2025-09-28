'use client';

import { motion } from 'framer-motion';
import Card from './Card';
import { useEcologicalPredictions } from './hooks/useReportData';

export default function EcologicalPredictionsCard() {
  const predictions = useEcologicalPredictions();

  return (
    <Card 
      size="medium" 
      title="Ecological Predictions" 
      subtitle="Machine Learning Analysis"
    >
      <div className="space-y-4">
        {predictions.map((prediction, index) => (
          <motion.div
            key={prediction.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-4 bg-gradient-to-r from-white/10 to-white/5 rounded-lg border border-white/20"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-white text-lg">
                {prediction.name}
              </h4>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-purple-300">
                  {Math.round(prediction.probability * 100)}%
                </span>
                <div className="w-16 bg-white/20 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${prediction.probability * 100}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                  />
                </div>
              </div>
            </div>
            
            {prediction.details && (
              <p className="text-sm text-white/80">
                {prediction.details}
              </p>
            )}
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="mt-4 p-3 bg-green-500/20 rounded-lg border border-green-400/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full" />
          <span className="text-sm font-medium text-green-200">
            High Confidence Predictions
          </span>
        </div>
        <p className="text-xs text-green-300 mt-1">
          AI models show strong predictive accuracy for ecological traits
        </p>
      </motion.div>
    </Card>
  );
}
