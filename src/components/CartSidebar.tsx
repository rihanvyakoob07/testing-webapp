import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CartItem } from "@/types/product";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveFromCart: (id: string) => void;
}

const CartSidebar = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveFromCart,
}: CartSidebarProps) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-4">
          {cartItems.length === 0 ? (
            <div className="text-center">Your cart is empty</div>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between py-3 border-b">
                  <div>
                    {item.name} x {item.quantity}
                  </div>
                  <div className="flex justify-between items-center">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus />
                    </Button>
                    <span className="mx-2">${item.price}</span>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => onRemoveFromCart(item.id)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="pt-4 border-t">
          <Button>Checkout ${total}</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;