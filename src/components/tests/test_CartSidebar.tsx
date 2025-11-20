```typescript
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { CartSidebar } from './CartSidebar';

describe('CartSidebar component', () => {
  const defaultProps = {
    // Provide default props here
  };

  const setup = (props = {}) => {
    const utils = render(<CartSidebar {...defaultProps} {...props} />);
    return {
      ...utils,
    };
  };

  it('renders cart sidebar', () => {
    const { getByText } = setup();
    expect(getByText('Cart')).toBeInTheDocument();
  });

  describe('when cart is empty', () => {
    it('displays empty cart message', () => {
      const { getByText } = setup({ cart: [] });
      expect(getByText('Your cart is empty')).toBeInTheDocument();
    });
  });

  describe('when cart has items', () => {
    it('displays cart items', () => {
      const cartItems = [
        { id: 1, name: 'Item 1', quantity: 2 },
        { id: 2, name: 'Item 2', quantity: 1 },
      ];
      const { getByText } = setup({ cart: cartItems });
      expect(getByText('Item 1')).toBeInTheDocument();
      expect(getByText('Item 2')).toBeInTheDocument();
    });

    it('displays total price', () => {
      const cartItems = [
        { id: 1, name: 'Item 1', quantity: 2, price: 10.99 },
        { id: 2, name: 'Item 2', quantity: 1, price: 5.99 },
      ];
      const { getByText } = setup({ cart: cartItems });
      expect(getByText('Total: $27.97')).toBeInTheDocument();
    });
  });

  describe('when checkout button is clicked', () => {
    it('calls onCheckout callback', () => {
      const onCheckout = jest.fn();
      const { getByText } = setup({ onCheckout });
      const checkoutButton = getByText('Checkout');
      fireEvent.click(checkoutButton);
      expect(onCheckout).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    it('handles null cart prop', () => {
      const { getByText } = setup({ cart: null });
      expect(getByText('Your cart is empty')).toBeInTheDocument();
    });

    it('handles undefined cart prop', () => {
      const { getByText } = setup({ cart: undefined });
      expect(getByText('Your cart is empty')).toBeInTheDocument();
    });
  });
});
```