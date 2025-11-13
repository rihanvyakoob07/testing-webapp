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

  describe('interactions', () => {
    it('calls onClose when close button is clicked', () => {
      const onClose = jest.fn();
      const { getByTestId } = setup({ onClose });
      const closeButton = getByTestId('close-button');
      fireEvent.click(closeButton);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onCheckout when checkout button is clicked', () => {
      const onCheckout = jest.fn();
      const { getByTestId } = setup({ onCheckout });
      const checkoutButton = getByTestId('checkout-button');
      fireEvent.click(checkoutButton);
      expect(onCheckout).toHaveBeenCalledTimes(1);
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
  });
});
```