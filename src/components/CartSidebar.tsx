import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { CartItem } from '@/types/product';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartSidebar = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }: CartSidebarProps) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='flex flex-col'>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className='flex-1 overflow-y-auto py-4'>
          {cartItems.length === 0 ? (
            <div className='flex h-full items-center justify-center text-center'>
              <p className='text-muted-foreground'>Your cart is empty</p>
            </div>
          ) : (
            <div className='space-y-4'>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className='flex gap-4 rounded-lg border border-border/50 bg-card p-4 transition-all hover:shadow-[var(--shadow-card)]'
                >
                  <img src={item.image} alt={item.name} />
                  <div className='flex flex-col justify-center'>
                    <p>{item.name}</p>
                    <p>
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button variant='ghost' size='icon' onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
                      <Minus />
                    </Button>
                    <p>{item.quantity}</p>
                    <Button variant='ghost' size='icon' onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                      <Plus />
                    </Button>
                    <Button variant='destructive' size='icon' onClick={() => onRemoveItem(item.id)}>
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;