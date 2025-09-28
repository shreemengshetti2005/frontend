# DNA Final Report Dashboard

A professional, scientist-centric dashboard for DNA analysis and phylogenetic insights. Built with Next.js, TypeScript, and modern web technologies.

## Features

- **AI-Generated Summary**: Comprehensive analysis overview with natural language insights
- **Novelty Metrics**: Statistical analysis with Z-scores and interpretations
- **Ecological Predictions**: Machine learning-based predictions with confidence scores
- **Biotech Significance**: Commercial applications and research potential
- **Interactive Phylogenetic Tree**: D3-based radial tree visualization
- **3D Globe**: Three.js-powered geographic distribution visualization
- **Responsive Design**: Mobile-first approach with Apple-like aesthetics
- **Accessibility**: Full keyboard navigation and ARIA support

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion
- **3D Graphics**: Three.js + React Three Fiber
- **Data Visualization**: D3.js, Chart.js
- **Testing**: Jest + React Testing Library

## Architecture

```
app/dashboard/
├── page.tsx                 # Main dashboard route
├── layout.tsx              # Dashboard layout
├── styles.css              # Local CSS variables
└── components/
    ├── DashboardShell.tsx   # Main grid layout
    ├── Card.tsx            # Reusable card component
    ├── types.ts            # TypeScript interfaces
    ├── utils/
    │   └── visualTokens.ts # Design system tokens
    ├── hooks/
    │   └── useReportData.ts # Data fetching & context
    ├── charts/             # Chart components
    └── __tests__/          # Test files
```

## Design System

The dashboard follows a scientific, Apple-inspired design language:

- **Colors**: Muted neutrals with cyan accent
- **Typography**: System font stack with clear hierarchy
- **Layout**: CSS Grid with responsive breakpoints
- **Effects**: Glass morphism with backdrop blur
- **Interactions**: Subtle hover animations and focus states

## Data Structure

The dashboard expects a `DNAReport` object with the following structure:

```typescript
interface DNAReport {
  id: string;
  input_name?: string;
  genAI_summary: string;
  novelty_metrics: NoveltyMetric[];
  ecological_predictions: EcologicalPrediction[];
  biotech_significance: string[];
  taxonomy: Taxonomy;
  tree_of_life_coordinates?: TreeOfLifeNode[];
  occurrence_points: LatLng[];
  created_at: string;
  source_files?: string[];
}
```

## Performance

- **Lazy Loading**: Heavy libraries (D3, Three.js) are dynamically imported
- **Code Splitting**: Components are split for optimal bundle size
- **Memoization**: React.memo and useMemo for expensive operations
- **Virtual Scrolling**: For large datasets (future enhancement)

## Accessibility

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators and logical tab order
- **Color Contrast**: WCAG AA compliant color combinations

## Testing

Run tests with:

```bash
npm run test          # Run all tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
```

## Development

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Navigate to `/dashboard` to view the dashboard

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements

- Real-time data updates
- Export functionality (PDF, CSV)
- Advanced filtering and search
- Collaborative annotations
- Mobile app integration
