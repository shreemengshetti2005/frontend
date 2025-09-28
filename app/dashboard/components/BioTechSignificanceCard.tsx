'use client';

import { motion } from 'framer-motion';
import Card from './Card';
import { useBiotechSignificance } from './hooks/useReportData';
import { FlaskConical, Lightbulb, Zap } from 'lucide-react';

const icons = [<Lightbulb size={20} />, <Zap size={20} />, <FlaskConical size={20} />];

export default function BioTechSignificanceCard() {
  const significance = useBiotechSignificance();

  return (
    <Card 
      title="Biotech Significance" 
      subtitle="Potential commercial and scientific applications"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {significance.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex flex-col items-center text-center p-6 bg-muted/50 rounded-lg border"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
              {icons[index % icons.length]}
            </div>
            <p className="mt-4 text-sm font-semibold text-foreground leading-relaxed">
              {item}
            </p>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}

