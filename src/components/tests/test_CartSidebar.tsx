```typescript
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { CartSidebar } from './CartSidebar';

describe('CartSidebar component', () => {
  const defaultProps = {
    // Add default props here
  };

  const setup = (props = {}) => {
    const utils = render(<CartSidebar {...defaultProps} {...props} />);
    return {
      ...utils,
    };
  };

  it('renders correctly', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('displays cart items', () => {
    const cartItems = [
      { id: 1, name: 'Item 1', quantity: 2 },
      { id: 2, name: 'Item 2', quantity: 1 },
    ];
    const { getByText } = setup({ cartItems });
    expect(getByText('Item 1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('Item 2')).toBeInTheDocument();
    expect(getByText('1')).toBeInTheDocument();
  });

  it('displays empty cart message', () => {
    const { getByText } = setup({ cartItems: [] });
    expect(getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    const { getByRole } = setup({ onClose });
    const closeButton = getByRole('button', { name: 'Close' });
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot with cart items', () => {
    const cartItems = [
      { id: 1, name: 'Item 1', quantity: 2 },
      { id: 2, name: 'Item 2', quantity: 1 },
    ];
    const { container } = setup({ cartItems });
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with empty cart', () => {
    const { container } = setup({ cartItems: [] });
    expect(container).toMatchSnapshot();
  });
});
```