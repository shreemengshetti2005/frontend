import { Suspense } from 'react';
import DashboardShell from './components/DashboardShell';
import { DNAReportProvider } from './components/hooks/useReportData';

export default function DashboardPage() {
  return (
    <DNAReportProvider>
      <Suspense fallback={<DashboardLoadingSkeleton />}>
        <DashboardShell />
      </Suspense>
    </DNAReportProvider>
  );
}

function DashboardLoadingSkeleton() {
  return (
    <div className="dashboard-background p-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="h-8 w-64 bg-white/20 rounded-lg animate-pulse" />
          <div className="mt-2 h-4 w-96 bg-white/20 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-48 animate-pulse border border-white/20">
              <div className="h-4 w-3/4 bg-white/20 rounded mb-4" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-white/20 rounded" />
                <div className="h-3 w-5/6 bg-white/20 rounded" />
                <div className="h-3 w-4/6 bg-white/20 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
