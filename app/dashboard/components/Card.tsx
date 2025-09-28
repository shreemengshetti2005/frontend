'use client';

import { motion } from 'framer-motion';
import { CardProps } from './types';
import { getCardSizeClasses, getGlassMorphismStyles } from './utils/visualTokens';

export default function Card({
  size = 'medium',
  title,
  subtitle,
  header,
  footer,
  actions,
  children,
  className = '',
}: CardProps) {
  const sizeClasses = getCardSizeClasses(size);
  const glassStyles = getGlassMorphismStyles();

  return (
    <motion.div
      className={`
        glass-card interactive-card content-sized-card rounded-2xl p-6
        ${sizeClasses}
        ${className}
      `}
      style={glassStyles}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Header */}
      {(title || subtitle || header || actions) && (
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {title && (
              <h3 className="text-xl font-bold text-white mb-2">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-white/80 scientific-label">
                {subtitle}
              </p>
            )}
            {header}
          </div>
          {actions && (
            <div className="ml-4 flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex-1">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="mt-4 pt-4 border-t border-slate-200/50">
          {footer}
        </div>
      )}
    </motion.div>
  );
}

// Specialized card variants
export function MetricCard({ 
  title, 
  value, 
  unit, 
  trend, 
  description 
}: {
  title: string;
  value: number | string;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
}) {
  return (
    <Card size="small" title={title}>
      <div className="text-center">
        <div className="text-3xl font-bold text-cyan-600 mb-2">
          {value}
          {unit && <span className="text-lg text-slate-500 ml-1">{unit}</span>}
        </div>
        {trend && (
          <div className={`text-sm ${
            trend === 'up' ? 'text-emerald-600' : 
            trend === 'down' ? 'text-red-600' : 
            'text-slate-500'
          }`}>
            {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'} {trend}
          </div>
        )}
        {description && (
          <p className="text-xs text-slate-600 mt-2">{description}</p>
        )}
      </div>
    </Card>
  );
}

export function ChartCard({ 
  title, 
  children, 
  size = 'medium' 
}: {
  title: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}) {
  return (
    <Card title={title} size={size}>
      <div className="chart-container">
        {children}
      </div>
    </Card>
  );
}
