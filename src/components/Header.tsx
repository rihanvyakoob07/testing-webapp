import { ShoppingCart } from "lucide-react";
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
  onQuantityChange: (id: string, quantity: number) => void;
}

const Header = ({ cartItems, cartItemsCount, onCartClick, onQuantityChange }: HeaderProps) => {
  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) {
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
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <span>{item.name}</span>
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
              <span className="ml-2">Total: ${item.quantity * item.price}.00</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;