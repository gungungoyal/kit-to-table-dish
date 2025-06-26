
import React from 'react';
import Navbar from '@/components/Navbar';
import Cart from '@/components/Cart';
import { useCart } from '@/context/CartContext';

const Index = () => {
  const { cartItems, updateQuantity, removeItem, isCartOpen, setIsCartOpen } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to VegBite
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Fresh vegetarian dishes and cooking kits delivered to your door
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Delicious Vegetarian Options
          </h2>
          <p className="text-lg text-gray-600">
            Choose from our ready-made dishes or cooking kits to create amazing meals at home
          </p>
        </div>

        {/* Placeholder for dish grid - this would be populated with actual dishes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Ready-Made Dishes</h3>
            <p className="text-gray-600">Fresh, delicious meals ready to eat</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Cooking Kits</h3>
            <p className="text-gray-600">Everything you need to cook at home</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Fresh Ingredients</h3>
            <p className="text-gray-600">Quality vegetables and spices</p>
          </div>
        </div>
      </div>

      {/* Cart Component */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
    </div>
  );
};

export default Index;
