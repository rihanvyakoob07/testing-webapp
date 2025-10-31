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
    const cartSidebar = utils.getByTestId('cart-sidebar');
    return { ...utils, cartSidebar };
  };

  describe('renders correctly', () => {
    it('renders cart sidebar', () => {
      const { cartSidebar } = setup();
      expect(cartSidebar).toBeInTheDocument();
    });

    it('renders cart items', () => {
      const { getByText } = setup({ cartItems: [{ id: 1, name: 'Item 1' }] });
      expect(getByText('Item 1')).toBeInTheDocument();
    });

    it('renders empty cart message', () => {
      const { getByText } = setup({ cartItems: [] });
      expect(getByText('Your cart is empty')).toBeInTheDocument();
    });
  });

  describe('handles events', () => {
    it('calls onCheckout when checkout button is clicked', () => {
      const onCheckout = jest.fn();
      const { getByText } = setup({ onCheckout });
      const checkoutButton = getByText('Checkout');
      fireEvent.click(checkoutButton);
      expect(onCheckout).toHaveBeenCalledTimes(1);
    });

    it('calls onRemove when remove button is clicked', () => {
      const onRemove = jest.fn();
      const { getByText } = setup({ cartItems: [{ id: 1, name: 'Item 1' }], onRemove });
      const removeButton = getByText('Remove');
      fireEvent.click(removeButton);
      expect(onRemove).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    it('renders null when cartItems is null', () => {
      const { queryByTestId } = setup({ cartItems: null });
      expect(queryByTestId('cart-sidebar')).not.toBeInTheDocument();
    });

    it('renders empty cart when cartItems is undefined', () => {
      const { getByText } = setup({ cartItems: undefined });
      expect(getByText('Your cart is empty')).toBeInTheDocument();
    });

    it('renders cart items when cartItems is an empty array', () => {
      const { getByText } = setup({ cartItems: [] });
      expect(getByText('Your cart is empty')).toBeInTheDocument();
    });
  });
});
```