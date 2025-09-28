'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface BarChartProps {
  data: Array<{ name: string; value: number; color?: string }>;
  title?: string;
  height?: number;
}

export default function BarChart({ data, title, height = 200 }: BarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadChart = async () => {
      try {
        // Check if Chart.js is available
        try {
          await import('chart.js/auto');
        } catch (importError) {
          console.warn('Chart.js not available, using fallback visualization');
          setError('Chart.js not installed');
          return;
        }

        const Chart = await import('chart.js/auto');
        
        if (!canvasRef.current) return;

        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        new Chart.Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.map(d => d.name),
            datasets: [{
              label: title || 'Values',
              data: data.map(d => d.value),
              backgroundColor: data.map(d => d.color || '#06b6d4'),
              borderColor: data.map(d => d.color || '#0891b2'),
              borderWidth: 1,
              borderRadius: 4,
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
                  display: false
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
        console.error('Error loading bar chart:', error);
        setError('Failed to load chart');
        
        // Fallback to simple visualization
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            
            // Draw simple bars
            const maxValue = Math.max(...data.map(d => d.value));
            const barWidth = canvas.width / data.length;
            
            data.forEach((item, index) => {
              const barHeight = (item.value / maxValue) * (canvas.height - 40);
              const x = index * barWidth + 10;
              const y = canvas.height - barHeight - 20;
              
              ctx.fillStyle = item.color || '#06b6d4';
              ctx.fillRect(x, y, barWidth - 20, barHeight);
              
              // Draw label
              ctx.fillStyle = '#64748b';
              ctx.font = '12px system-ui';
              ctx.textAlign = 'center';
              ctx.fillText(item.name, x + (barWidth - 20) / 2, canvas.height - 5);
            });
          }
          setIsLoaded(true);
        }
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
