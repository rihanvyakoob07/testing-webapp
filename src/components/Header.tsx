tsx
import { ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface HeaderProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartSidebar = ({ cartItems, onUpdateQuantity, onRemoveItem }: HeaderProps) => {
  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) {
      return;
    }
    onUpdateQuantity(id, quantity);
  };

  return (
    <div className="cart-sidebar">
      {cartItems.length > 0 ? (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <span>{item.name}</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </Button>
                <span>{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  +
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onRemoveItem(item.id)}
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default CartSidebar;