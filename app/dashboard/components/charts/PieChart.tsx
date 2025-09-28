'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface PieChartProps {
  data: Array<{ name: string; value: number; color?: string }>;
  title?: string;
  height?: number;
}

export default function PieChart({ data, title, height = 200 }: PieChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadChart = async () => {
      try {
        const Chart = await import('chart.js/auto');
        
        if (!canvasRef.current) return;

        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        new Chart.Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: data.map(d => d.name),
            datasets: [{
              data: data.map(d => d.value),
              backgroundColor: data.map(d => d.color || '#06b6d4'),
              borderColor: '#ffffff',
              borderWidth: 2,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  usePointStyle: true,
                  padding: 20,
                  color: '#64748b'
                }
              }
            }
          }
        });

        setIsLoaded(true);
      } catch (error) {
        console.error('Error loading pie chart:', error);
      }
    };

    loadChart();
  }, [data, title]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0.3 }}
      transition={{ duration: 0.5 }}
      className="relative w-full"
      style={{ height }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs text-slate-600">Loading chart...</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
