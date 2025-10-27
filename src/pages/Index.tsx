import { useState } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import CartSidebar from "@/components/CartSidebar";
import { Product, CartItem } from "@/types/product";
import { toast } from "sonner";

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
    category: "Audio",
    description: "High-quality wireless headphones with noise cancellation",
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
    category: "Wearables",
    description: "Advanced fitness tracking and health monitoring",
  },
  {
    id: "3",
    name: "Leather Messenger Bag",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop",
    category: "Accessories",
    description: "Genuine leather bag with multiple compartments",
  },
  {
    id: "4",
    name: "Minimalist Desk Lamp",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop",
    category: "Home",
    description: "Modern LED lamp with adjustable brightness",
  },
  {
    id: "5",
    name: "Portable Power Bank",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&h=800&fit=crop",
    category: "Electronics",
    description: "20000mAh fast charging power bank",
  },
  {
    id: "6",
    name: "Stainless Steel Water Bottle",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop",
    category: "Lifestyle",
    description: "Insulated bottle keeps drinks hot or cold for 24h",
  },
];

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        toast.success("Updated quantity in cart");
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      toast.success("Added to cart");
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from cart");
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const calculateAverage = (scores: number[]) => {
    // Fix: Validate input and handle edge cases
    if (scores.length === 0) {
      throw new Error("Input list is empty");
    }

    const validScores = scores.filter((score) => score >= 0);
    if (validScores.length === 0) {
      throw new Error("All scores are invalid (negative or zero)");
    }

    return validScores.reduce((sum, score) => sum + score, 0) / validScores.length;
  };

  // Example usage of calculateAverage
  try {
    const scores = [10, 20, 30, -5, 0];
    const average = calculateAverage(scores);
    console.log("Average score:", average);
  } catch (error) {
    console.error("Error calculating average:", error.message);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={cartItemsCount} onCartClick={() => setIsCartOpen(true)} />
      
      <main className="container py-8">
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
            Featured Products
          </h2>
          <p className="text-muted-foreground">
            Discover our curated collection of premium items
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </main>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={(id, quantity) => {
          updateQuantity(id, quantity);
        }}
        onRemoveItem={removeItem}
      />
    </div>
  );
};

export default Index;