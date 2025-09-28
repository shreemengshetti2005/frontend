'use client';

import { CardProps } from './types';

export default function Card({
  title,
  subtitle,
  children,
  className = '',
}: CardProps) {
  return (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
      {(title || subtitle) && (
        <div className="p-6">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">
            {title}
          </h3>
          <p className="text-muted-foreground mt-1">
            {subtitle}
          </p>
        </div>
      )}
      <div className="p-6 pt-0">
        {children}
      </div>
    </div>
  );
}
