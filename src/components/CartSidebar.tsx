import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CartItem } from "@/types/product";
import { Minus, Plus, Trash2 } from "lucide-react"

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
            <p>Your cart is empty</p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <div className="flex justify-between">
                    <span>{item.name}</span>
                    <div className="flex items-center">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus />
                      </Button>
                      <span>Qty: {item.quantity}</span>
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
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex justify-between mt-auto">
          <span>Total: ${total.toFixed(2)}</span>
          <Button>Checkout</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;