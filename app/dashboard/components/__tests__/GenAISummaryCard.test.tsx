import { render, screen } from '@testing-library/react';
import { DNAReportProvider } from '../hooks/useReportData';
import GenAISummaryCard from '../GenAISummaryCard';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('GenAISummaryCard', () => {
  it('renders AI summary content', () => {
    render(
      <DNAReportProvider>
        <GenAISummaryCard />
      </DNAReportProvider>
    );
    
    expect(screen.getByText('AI-Generated Summary')).toBeInTheDocument();
    expect(screen.getByText('Comprehensive Analysis Overview')).toBeInTheDocument();
  });

  it('displays summary text', async () => {
    render(
      <DNAReportProvider>
        <GenAISummaryCard />
      </DNAReportProvider>
    );
    
    // Wait for content to load
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Should contain the mock summary text
    expect(screen.getByText(/This DNA sequence exhibits remarkable genetic diversity/)).toBeInTheDocument();
  });
});
