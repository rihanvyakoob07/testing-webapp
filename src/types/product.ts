typescript
// No changes needed in this file as the issues are in the ProductCard component
// However, I will add a comment to indicate that this file is part of the fix

// Existing code remains the same
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}