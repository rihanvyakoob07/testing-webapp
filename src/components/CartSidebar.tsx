import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CartItem } from "@/types/product";
import { Minus, Plus, Trash2 } from "lucide-react";
import React from "react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveFromCart: (id: string) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveFromCart,
}) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-lg border border-border/50 bg-card p-4 transition-all hover:shadow-[var(--shadow-card)]"
                >
                  {/* UI BUG applied only to the first item */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className={
                      item.id === cartItems[0].id
                        ? "h-32 w-32 -rotate-12 scale-150 opacity-70 object-contain border-4 border-red-500"
                        : "h-20 w-20 rounded-md object-cover"
                    }
                  />

                  <div className="flex flex-1 flex-col">
                    <h4 className="font-semibold text-card-foreground">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">${item.price}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        aria-label="Decrease quantity"
                        onClick={() => {
                          if (item.quantity > 1) {
                            onUpdateQuantity(item.id, item.quantity - 1);
                          } else {
                            onRemoveFromCart(item.id);
                          }
                        }}
                        disabled={item.quantity === 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>

                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>

                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        aria-label="Increase quantity"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>

                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        aria-label="Remove from cart"
                        onClick={() => onRemoveFromCart(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-muted-foreground">Your cart is empty.</div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="space-y-4 border-t border-border/50 text-lg font-bold">
            <div className="flex justify-between">
              <span>Total:</span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {total.toFixed(2)}
              </span>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300"
              size="lg"
              aria-label="Checkout"
            >
              Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
