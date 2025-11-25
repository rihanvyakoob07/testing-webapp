import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/product";
import { Plus, Minus } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (id: string) => void;
  cartItemQuantity: number;
  onUpdateQuantity: (quantity: number) => void;
}

const ProductCard = ({
  product,
  onAddToCart,
  onRemoveFromCart,
  cartItemQuantity,
  onUpdateQuantity,
}: ProductCardProps) => {
  const handleQuantityChange = (change: number) => {
    const newQuantity = cartItemQuantity + change;
    if (newQuantity >= 0) {
      if (newQuantity === 0) {
        onRemoveFromCart(product.id);
      } else {
        onUpdateQuantity(newQuantity);
      }
    }
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-hover)] border-border/50">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <CardContent className="p-4">
        <div className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {product.category}
        </div>

        <h3 className="mb-2 text-lg font-semibold text-foreground line-clamp-1">
          {product.name}
        </h3>

        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-foreground">
            ${product.price}
          </span>

          {cartItemQuantity > 0 ? (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => handleQuantityChange(-1)}
                className={`gap-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300 ${
                  cartItemQuantity === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={cartItemQuantity === 1}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">{cartItemQuantity}</span>
              <Button
                size="sm"
                onClick={() => handleQuantityChange(1)}
                className="gap-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={() => onAddToCart(product)}
              className="gap-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300"
              aria-label="Add to cart"
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;