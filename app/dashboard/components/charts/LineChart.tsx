'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface LineChartProps {
  data: Array<{ x: string | number; y: number }>;
  title?: string;
  height?: number;
  color?: string;
}

export default function LineChart({ data, title, height = 200, color = '#06b6d4' }: LineChartProps) {
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
          type: 'line',
          data: {
            labels: data.map(d => d.x),
            datasets: [{
              label: title || 'Values',
              data: data.map(d => d.y),
              borderColor: color,
              backgroundColor: color + '20',
              borderWidth: 2,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: color,
              pointBorderColor: '#ffffff',
              pointBorderWidth: 2,
              pointRadius: 4,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: '#e2e8f0'
                },
                ticks: {
                  color: '#64748b'
                }
              },
              x: {
                grid: {
                  color: '#e2e8f0'
                },
                ticks: {
                  color: '#64748b'
                }
              }
            }
          }
        });

        setIsLoaded(true);
      } catch (error) {
        console.error('Error loading line chart:', error);
      }
    };

    loadChart();
  }, [data, title, color]);

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
