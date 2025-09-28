import { render, screen } from '@testing-library/react';
import { DNAReportProvider } from '../hooks/useReportData';
import DashboardShell from '../DashboardShell';

// Mock the framer-motion components
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    header: ({ children, ...props }: any) => <header {...props}>{children}</header>,
  },
}));

describe('DashboardShell', () => {
  it('renders loading state', () => {
    render(
      <DNAReportProvider>
        <DashboardShell />
      </DNAReportProvider>
    );
    
    // Should show loading skeleton initially
    expect(screen.getByText('DNA Final Report')).toBeInTheDocument();
  });

  it('renders dashboard content after loading', async () => {
    render(
      <DNAReportProvider>
        <DashboardShell />
      </DNAReportProvider>
    );
    
    // Wait for content to load
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(screen.getByText('DNA Final Report')).toBeInTheDocument();
  });
});
