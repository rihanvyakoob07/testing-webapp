import * as React from "react";

import { cn } from "@/lib/utils";

// Existing card component code
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

// New ProductCard component with fixes
interface ProductCardProps {
  onUpdateQuantity: (quantity: number) => void;
  onRemoveFromCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  className, 
  children, 
  onUpdateQuantity, 
  onRemoveFromCart 
}) => {
  const handleQuantityChange = (quantity: number) => {
    if (quantity <= 0) {
      onRemoveFromCart();
    } else {
      onUpdateQuantity(quantity);
    }
  };

  return (
    <Card className={cn("relative aspect-square", className)}>
      <CardHeader>
        <CardTitle>Product Title</CardTitle>
        <CardDescription>Product Description</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <button 
            aria-label="Decrease quantity"
            onClick={() => handleQuantityChange(1)} 
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            -
          </button>
          <input 
            type="number" 
            value={1} 
            onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))} 
            className="w-6 text-center mx-2"
          />
          <button 
            aria-label="Increase quantity"
            onClick={() => handleQuantityChange(1)} 
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            +
          </button>
          <button 
            aria-label="Remove from cart"
            onClick={onRemoveFromCart} 
            className="ml-4 p-2 bg-red-500 text-white hover:bg-red-600 rounded"
          >
            Remove
          </button>
        </div>
      </CardContent>
      <CardFooter>
        {children}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };