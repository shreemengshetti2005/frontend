'use client';

import { useReportData } from './hooks/useReportData';
import Card from './Card';
import { motion } from 'framer-motion';

const SequenceBlock = ({ sequence }: { sequence: string }) => (
  <pre className="p-4 rounded-md bg-muted text-muted-foreground text-xs font-mono whitespace-pre-wrap break-all border">
    <code>{sequence}</code>
  </pre>
);

export default function GenAISummaryCard() {
  const { report } = useReportData();
  if (!report) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">AI-Generated Summary</h2>
        <p className="text-muted-foreground mt-1">Comprehensive analysis overview</p>
        
        <div className="mt-6 prose dark:prose-invert max-w-none text-muted-foreground text-lg">
            <p>{report.genAI_summary}</p>
        </div>
      </div>

      <div className="lg:col-span-1 space-y-6">
        {report.novelty_status === 'Known' ? (
          <Card>
            <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">Known Match Identified</h3>
            <p className="text-sm text-muted-foreground italic mt-2">{report.taxonomy.species.name}</p>
            <div className="mt-4 space-y-2">
              <h4 className="font-semibold text-foreground">Input Sequence:</h4>
              <SequenceBlock sequence={report.input_sequence} />
            </div>
          </Card>
        ) : (
          <Card>
            <h3 className="text-lg font-semibold text-primary">Novel Sequence</h3>
            <p className="text-sm text-muted-foreground mt-2">No exact match found. Displaying closest candidates.</p>
            <div className="mt-4 space-y-4">
              {report.close_matches?.map((match, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-3 border rounded-lg bg-secondary/50"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-foreground italic">{match.name}</p>
                    <span className="text-xs font-mono px-2 py-1 rounded-md bg-primary text-primary-foreground">{match.match_score}% Match</span>
                  </div>
                   <div className="mt-2">
                     <SequenceBlock sequence={match.sequence} />
                   </div>
                </motion.div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

