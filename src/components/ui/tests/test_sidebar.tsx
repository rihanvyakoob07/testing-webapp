```tsx
// src/components/ui/sidebar.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Sidebar } from './sidebar';

describe('Sidebar component', () => {
  it('renders successfully', () => {
    const { getByText } = render(<Sidebar />);
    expect(getByText('Sidebar')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const tree = render(<Sidebar />);
    expect(tree).toMatchSnapshot();
  });

  describe('with children', () => {
    it('renders children', () => {
      const { getByText } = render(<Sidebar><div>Child content</div></Sidebar>);
      expect(getByText('Child content')).toBeInTheDocument();
    });
  });

  describe('with custom className', () => {
    it('applies custom className', () => {
      const { getByTestId } = render(<Sidebar className="custom-class" data-testid="sidebar" />);
      expect(getByTestId('sidebar')).toHaveClass('custom-class');
    });
  });

  describe('with custom style', () => {
    it('applies custom style', () => {
      const { getByTestId } = render(<Sidebar style={{ backgroundColor: 'red' }} data-testid="sidebar" />);
      expect(getByTestId('sidebar')).toHaveStyle({ backgroundColor: 'red' });
    });
  });
});
```