
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  name: string;
  restaurant?: string;
  type: 'restaurant' | 'kit';
  price: number;
  quantity: number;
  servings?: number;
  kitType?: 'standard' | 'custom';
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  getTotalItems: () => number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  syncingCart: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [syncingCart, setSyncingCart] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  // Load cart from Supabase when user logs in
  useEffect(() => {
    if (user && !authLoading) {
      loadCartFromDatabase();
    } else if (!user && !authLoading) {
      // Clear cart when user logs out
      setCartItems([]);
    }
  }, [user, authLoading]);

  const loadCartFromDatabase = async () => {
    if (!user) return;

    setSyncingCart(true);
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      const dbCartItems: CartItem[] = data.map(item => ({
        id: item.dish_id,
        name: item.dish_name,
        type: item.dish_type as 'restaurant' | 'kit',
        price: item.price,
        quantity: item.quantity,
        servings: item.servings,
        kitType: item.kit_type as 'standard' | 'custom',
        image: item.image_url,
        restaurant: item.restaurant,
      }));

      // If there are local cart items, merge them with database items
      if (cartItems.length > 0) {
        const mergedCart = mergeCartItems(cartItems, dbCartItems);
        setCartItems(mergedCart);
        // Save merged cart back to database
        await saveCartToDatabase(mergedCart);
      } else {
        setCartItems(dbCartItems);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      toast({
        title: "Error",
        description: "Failed to load your saved cart items.",
        variant: "destructive",
      });
    } finally {
      setSyncingCart(false);
    }
  };

  const mergeCartItems = (localItems: CartItem[], dbItems: CartItem[]): CartItem[] => {
    const merged = [...dbItems];
    
    localItems.forEach(localItem => {
      const existingIndex = merged.findIndex(item => item.id === localItem.id);
      if (existingIndex >= 0) {
        // Item exists in both, combine quantities
        merged[existingIndex].quantity += localItem.quantity;
      } else {
        // Item only exists locally, add it
        merged.push(localItem);
      }
    });
    
    return merged;
  };

  const saveCartToDatabase = async (items: CartItem[]) => {
    if (!user) return;

    try {
      // Delete existing cart items
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      // Insert new cart items
      if (items.length > 0) {
        const cartData = items.map(item => ({
          user_id: user.id,
          dish_id: item.id,
          dish_name: item.name,
          dish_type: item.type,
          price: item.price,
          quantity: item.quantity,
          servings: item.servings,
          kit_type: item.kitType,
          image_url: item.image,
          restaurant: item.restaurant,
        }));

        const { error } = await supabase
          .from('cart_items')
          .insert(cartData);

        if (error) throw error;
      }
    } catch (error) {
      console.error('Error saving cart:', error);
      toast({
        title: "Error",
        description: "Failed to save cart items.",
        variant: "destructive",
      });
    }
  };

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    const updatedItems = cartItems.slice();
    const existingItem = updatedItems.find(item => item.id === newItem.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedItems.push({ ...newItem, quantity: 1 });
    }
    
    setCartItems(updatedItems);

    // Save to database if user is logged in
    if (user) {
      setTimeout(() => saveCartToDatabase(updatedItems), 0);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      const updatedItems = cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      setCartItems(updatedItems);

      // Save to database if user is logged in
      if (user) {
        setTimeout(() => saveCartToDatabase(updatedItems), 0);
      }
    }
  };

  const removeItem = (id: string) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);

    // Save to database if user is logged in
    if (user) {
      setTimeout(() => saveCartToDatabase(updatedItems), 0);
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        getTotalItems,
        isCartOpen,
        setIsCartOpen,
        syncingCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
