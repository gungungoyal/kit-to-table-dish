
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Chicken Tikka Masala',
      restaurant: 'Spice Palace',
      type: 'restaurant',
      price: 18.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=100'
    },
    {
      id: '2',
      name: 'Margherita Pizza Kit',
      type: 'kit',
      price: 19.99,
      quantity: 1,
      servings: 2,
      kitType: 'standard',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=100'
    }
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 3.99;
  const total = subtotal + deliveryFee;

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const cartVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />
          
          {/* Cart Sidebar */}
          <motion.div
            variants={cartVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-orange-500 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="h-6 w-6" />
                  <h2 className="text-xl font-bold">Your Cart</h2>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-orange-600">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-orange-100 mt-1">{cartItems.length} item(s)</p>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {cartItems.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 text-gray-500"
                  >
                    <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Your cart is empty</p>
                  </motion.div>
                ) : (
                  cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                    >
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex space-x-3">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1 space-y-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold text-sm">{item.name}</h3>
                                  {item.restaurant && (
                                    <p className="text-xs text-gray-500">{item.restaurant}</p>
                                  )}
                                  <div className="flex items-center space-x-2 mt-1">
                                    <Badge 
                                      variant={item.type === 'restaurant' ? 'default' : 'secondary'}
                                      className="text-xs"
                                    >
                                      {item.type === 'restaurant' ? 'Delivery' : 'Kit'}
                                    </Badge>
                                    {item.servings && (
                                      <Badge variant="outline" className="text-xs">
                                        {item.servings} servings
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeItem(item.id)}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="text-sm font-medium w-8 text-center">
                                    {item.quantity}
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                                <span className="font-semibold text-orange-600">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Cart Summary */}
            {cartItems.length > 0 && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="border-t bg-gray-50 p-4 space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total</span>
                    <span className="text-orange-600">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
