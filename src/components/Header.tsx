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
  cartItemsCount: number;
  onCartClick: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartSidebar = ({ cartItems, cartItemsCount, onCartClick, onUpdateQuantity }: HeaderProps) => {
  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) {
      return;
    }
    onUpdateQuantity(id, quantity);
  };

  const handleRemoveItem = (id: string) => {
    onUpdateQuantity(id, 0);
  };

  return (
    <div className="cart-sidebar">
      <div className="cart-sidebar-header">
        <Button
          variant="outline"
          size="icon"
          className="relative"
          onClick={onCartClick}
        >
          <ShoppingCart className="h-5 w-5" />
          {cartItemsCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
              {cartItemsCount}
            </span>
          )}
        </Button>
      </div>
      <div className="cart-sidebar-content">
        {cartItems.length > 0 ? (
          <div>
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
                    onClick={() => handleRemoveItem(item.id)}
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
    </div>
  );
};

export default CartSidebar;