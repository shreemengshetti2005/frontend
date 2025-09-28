import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DNA Final Report Dashboard',
  description: 'Scientific dashboard for DNA analysis and phylogenetic insights',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
