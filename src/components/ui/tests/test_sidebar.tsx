```typescript
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Sidebar } from './sidebar';

describe('Sidebar component', () => {
  it('renders successfully', () => {
    const { getByTestId } = render(<Sidebar />);
    expect(getByTestId('sidebar')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const tree = render(<Sidebar />);
    expect(tree).toMatchSnapshot();
  });

  describe('Sidebar content', () => {
    it('displays default content', () => {
      const { getByText } = render(<Sidebar />);
      expect(getByText('Default content')).toBeInTheDocument();
    });

    it('displays custom content', () => {
      const customContent = 'Custom content';
      const { getByText } = render(<Sidebar>{customContent}</Sidebar>);
      expect(getByText(customContent)).toBeInTheDocument();
    });
  });

  describe('Sidebar props', () => {
    it('accepts and displays title prop', () => {
      const title = 'Sidebar title';
      const { getByText } = render(<Sidebar title={title} />);
      expect(getByText(title)).toBeInTheDocument();
    });

    it('accepts and displays subtitle prop', () => {
      const subtitle = 'Sidebar subtitle';
      const { getByText } = render(<Sidebar subtitle={subtitle} />);
      expect(getByText(subtitle)).toBeInTheDocument();
    });
  });

  describe('Sidebar interactions', () => {
    it('calls onClick handler when clicked', () => {
      const onClick = jest.fn();
      const { getByTestId } = render(<Sidebar onClick={onClick} />);
      const sidebar = getByTestId('sidebar');
      fireEvent.click(sidebar);
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
```