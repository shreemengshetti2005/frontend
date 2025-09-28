# Dashboard Dependencies Installation

The DNA Final Report Dashboard requires several dependencies for full functionality. Here's how to install them:

## Required Dependencies

### 3D Visualization
```bash
npm install three @react-three/fiber @react-three/drei
```

### Data Visualization
```bash
npm install d3 d3-hierarchy chart.js
```

### Testing (Optional)
```bash
npm install @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom
```

## Fallback Behavior

The dashboard is designed to work gracefully even without all dependencies:

- **3D Globe**: Falls back to a 2D map with occurrence points
- **Phylogenetic Tree**: Falls back to a simple tree list
- **Charts**: Falls back to basic canvas-based visualizations

## Installation Commands

Run these commands in your project root:

```bash
# Install all dependencies at once
npm install three @react-three/fiber @react-three/drei d3 d3-hierarchy chart.js @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom

# Or install them individually
npm install three
npm install @react-three/fiber
npm install @react-three/drei
npm install d3
npm install d3-hierarchy
npm install chart.js
```

## Verification

After installation, you can verify the dependencies are working by:

1. Starting the development server: `npm run dev`
2. Navigating to `/dashboard`
3. Checking that all visualizations load properly

## Troubleshooting

If you encounter issues:

1. **Network errors**: Try using a different npm registry or clearing npm cache
2. **Version conflicts**: Check for peer dependency warnings
3. **Build errors**: Ensure all dependencies are properly installed

The dashboard will work with graceful fallbacks even if some dependencies are missing.
