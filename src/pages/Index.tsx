import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import DishCard from '@/components/DishCard';
import Cart from '@/components/Cart';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Clock, Star, Truck, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface Dish {
  id: string;
  name: string;
  restaurant: string;
  image: string;
  price: number;
  kitPrice: number;
  rating: number;
  cookTime: number;
  description: string;
  calories?: number;
  isVeg?: boolean;
  cuisine?: string;
}

const Index = () => {
  const { cartItems, updateQuantity, removeItem, isCartOpen, setIsCartOpen, addToCart } = useCart();
  const { toast } = useToast();
  const [featuredDishes, setFeaturedDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedDishes();
  }, []);

  const fetchFeaturedDishes = async () => {
    try {
      setLoading(true);
      // Fetch random 3 dishes from different categories
      const { data, error } = await supabase
        .from('veg_dishes')
        .select('*')
        .in('type', ['Starters', 'North Indian - Paneer', 'South Indian'])
        .limit(3);

      if (error) throw error;

      const formattedDishes: Dish[] = data.map(dish => ({
        id: dish.id,
        name: dish.name,
        restaurant: dish.restaurant || 'VegBite Kitchen',
        image: dish.image_url || 'https://images.pexels.com/photos/7245480/pexels-photo-7245480.jpeg',
        price: dish.price,
        kitPrice: dish.kit_price || Math.floor(dish.price * 0.7),
        rating: dish.rating || 4.5,
        cookTime: dish.cook_time || 20,
        description: dish.description || 'Delicious vegetarian dish made with fresh ingredients.',
        calories: dish.calories,
        isVeg: dish.is_veg,
        cuisine: dish.cuisine || 'Indian'
      }));

      setFeaturedDishes(formattedDishes);
    } catch (error) {
      console.error('Error fetching featured dishes:', error);
      toast({
        title: "Error",
        description: "Failed to load featured dishes. Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDishClick = (dishId: string) => {
    window.location.href = `/dish/${dishId}`;
  };

  const handleAddToCart = (dish: Dish) => {
    addToCart({
      id: dish.id,
      name: dish.name,
      restaurant: dish.restaurant,
      type: 'kit', // Use kit type by default for savings
      price: dish.kitPrice, // Use kit price by default
      image: dish.image,
    });

    toast({
      title: "Added to Cart",
      description: `${dish.name} cooking kit added to your cart!`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-green-600 via-green-500 to-emerald-500 text-white py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Welcome to <span className="text-yellow-300">VegBite</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          >
            Fresh vegetarian dishes and cooking kits delivered to your door. 
            <br />Choose ready-made meals or cook at home with our premium kits.
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/menu">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-semibold">
                Order Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/menu">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 font-semibold">
                Browse Menu
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Truck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Fresh meals delivered in 30-45 minutes</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Vegetarian</h3>
              <p className="text-gray-600">Certified fresh vegetarian ingredients</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Hand-picked ingredients and expert recipes</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured Dishes Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Dishes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our premium selection of ready-made dishes or cooking kits. 
            Save money and enjoy the cooking experience with our meal kits!
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
              <p className="text-lg text-gray-600">Loading featured dishes...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDishes.map((dish, index) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
              >
                <DishCard
                  dish={dish}
                  onClick={() => handleDishClick(dish.id)}
                  onAddToCart={() => handleAddToCart(dish)}
                  isAdded={cartItems.some(item => item.id === dish.id)}
                />
              </motion.div>
            ))}
          </div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-center mt-12"
        >
          <Link to="/menu">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              View All Dishes <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* How It Works Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="bg-green-50 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Get delicious vegetarian meals in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Choose Your Meal</h3>
              <p className="text-gray-600">Browse our menu and select ready-made dishes or cooking kits</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Place Your Order</h3>
              <p className="text-gray-600">Add items to cart and choose your delivery time</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Enjoy Fresh Food</h3>
              <p className="text-gray-600">Receive fresh meals or cook amazing dishes with our premium ingredients</p>
            </div>
          </div>
        </div>
      </motion.div>

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
