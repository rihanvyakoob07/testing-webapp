import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
// Fix: Correct import statement for icons (if needed)
// No changes required here as import seems correct

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface HeaderProps {
  cartItems: CartItem[]; // Fix: Correct type definition for cartItems
  cartItemsCount: number;
  onCartClick: () => void;
  onQuantityChange: (id: string, quantity: number) => void; // Add handler for quantity change
}

const Header = ({ cartItems, cartItemsCount, onCartClick, onQuantityChange }: HeaderProps) => {
  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) {
      // Fix: Prevent quantity from going below 1
      return;
    }
    onQuantityChange(id, quantity);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/80" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            ShopHub
          </h1>
        </div>
        
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
        {/* 
          Add quantity controls and cart item list here
          <div>
            {cartItems.map((item) => (
              <div key={item.id}>
                <span>{item.name}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1} // Fix: Disable minus button when quantity is 1
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
              </div>
            ))}
          </div>
        */}
      </div>
    </header>
  );
};

export default Header;