import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card Component', () => {
  it('renders with title and content', () => {
    render(
      <Card title="Test Card" subtitle="Test Subtitle">
        <p>Test content</p>
      </Card>
    );
    
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Card size="small" title="Small Card">
        <p>Content</p>
      </Card>
    );
    
    expect(screen.getByText('Small Card')).toBeInTheDocument();
    
    rerender(
      <Card size="large" title="Large Card">
        <p>Content</p>
      </Card>
    );
    
    expect(screen.getByText('Large Card')).toBeInTheDocument();
  });

  it('renders with actions', () => {
    render(
      <Card 
        title="Card with Actions" 
        actions={<button>Action</button>}
      >
        <p>Content</p>
      </Card>
    );
    
    expect(screen.getByText('Action')).toBeInTheDocument();
  });
});
