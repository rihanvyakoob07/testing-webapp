typescript
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/product";
import { Plus, Minus, Trash2 } from "lucide-react";

interface CartSidebarProps {
  cartItems: Product[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveFromCart: (id: string) => void;
}

const CartSidebar = ({
  cartItems,
  onUpdateQuantity,
  onRemoveFromCart,
}: CartSidebarProps) => {
  const handleQuantityChange = (id: string, change: number) => {
    const newQuantity = cartItems.find((item) => item.id === id)?.quantity + change;
    if (newQuantity >= 0) {
      onUpdateQuantity(id, newQuantity);
    }
  };

  return (
    <div className="flex flex-col">
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <span>{item.name}</span>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="gap-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">{item.quantity}</span>
                <Button
                  size="sm"
                  onClick={() => handleQuantityChange(item.id, 1)}
                  className="gap-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => onRemoveFromCart(item.id)}
                  className="gap-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300"
                  aria-label="Remove from cart"
                >
                  <Trash2 className="h-4 w-4" />
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