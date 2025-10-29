typescript
import * as React from "react";
import { Trash2 } from "lucide-react";

interface CartSidebarProps {
  cartItems: { id: string; quantity: number }[];
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ cartItems, onUpdateQuantity }) => {
  const handleIncreaseQuantity = (id: string) => {
    onUpdateQuantity(id, cartItems.find((item) => item.id === id)?.quantity + 1 || 1);
  };

  const handleDecreaseQuantity = (id: string) => {
    const currentQuantity = cartItems.find((item) => item.id === id)?.quantity || 0;
    onUpdateQuantity(id, Math.max(currentQuantity - 1, 0));
  };

  const handleRemoveItem = (id: string) => {
    onUpdateQuantity(id, 0);
  };

  return (
    <div className="cart-sidebar">
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <div className="flex items-center justify-between">
                <span>Item {item.id}</span>
                <div className="flex items-center">
                  <button
                    className="p-2 text-gray-600 hover:text-gray-900"
                    onClick={() => handleDecreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="p-2 text-gray-600 hover:text-gray-900"
                    onClick={() => handleIncreaseQuantity(item.id)}
                  >
                    +
                  </button>
                  <button
                    className="p-2 text-red-600 hover:text-red-900"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default CartSidebar;