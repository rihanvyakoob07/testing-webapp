```typescript
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Sidebar } from './sidebar';

describe('Sidebar component', () => {
  it('renders successfully', () => {
    const { getByText } = render(<Sidebar />);
    expect(getByText('Sidebar')).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const tree = render(<Sidebar />);
    expect(tree).toMatchSnapshot();
  });

  it('should render children', () => {
    const children = <div>Child content</div>;
    const { getByText } = render(<Sidebar>{children}</Sidebar>);
    expect(getByText('Child content')).toBeInTheDocument();
  });

  it('should apply className', () => {
    const className = 'custom-class';
    const { getByTestId } = render(<Sidebar data-testid="sidebar" className={className} />);
    expect(getByTestId('sidebar')).toHaveClass(className);
  });

  it('should apply style', () => {
    const style = { backgroundColor: 'red' };
    const { getByTestId } = render(<Sidebar data-testid="sidebar" style={style} />);
    expect(getByTestId('sidebar')).toHaveStyle({ backgroundColor: 'red' });
  });
});
```