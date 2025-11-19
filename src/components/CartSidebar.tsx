import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CartItem } from "@/types/product";
import { Minus, Plus, Trash2 } from "lucide-react"

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
}

const CartSidebar = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
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
            <div className="text-center">No items in cart</div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>{item.name}</div>
                  <div className="flex justify-between items-center">
                    <Button 
                      size="icon" 
                      variant="outline" 
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus />
                    </Button>
                    <div className="mx-2">{item.quantity}</div>
                    <Button 
                      size="icon" 
                      variant="outline" 
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="destructive" 
                      onClick={() => onUpdateQuantity(item.id, 0)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-between items-center mt-auto">
          <div>Total: ${total.toFixed(2)}</div>
          <Button>Checkout</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;