
import React, { useState } from 'react';
import { Search, Star, Clock, ChefHat, Leaf, Pizza, Coffee, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DishCard from '@/components/DishCard';
import Cart from '@/components/Cart';

const categories = [
  { name: 'Indian', icon: ChefHat, color: 'bg-orange-500' },
  { name: 'Pizza', icon: Pizza, color: 'bg-red-500' },
  { name: 'Healthy', icon: Heart, color: 'bg-green-500' },
  { name: 'Vegan', icon: Leaf, color: 'bg-emerald-500' },
];

const featuredDishes = [
  {
    id: 1,
    name: 'Paneer Butter Masala',
    restaurant: 'Spice Garden',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400',
    price: 16.99,
    kitPrice: 21.99,
    rating: 4.8,
    cookTime: 35,
    description: 'Rich and creamy paneer curry with aromatic spices and fresh herbs',
    calories: 420,
    isVeg: true
  },
  {
    id: 2,
    name: 'Margherita Pizza',
    restaurant: 'Green Slice',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400',
    price: 14.99,
    kitPrice: 17.99,
    rating: 4.7,
    cookTime: 25,
    description: 'Fresh mozzarella, basil, and tomato sauce on hand-tossed dough',
    calories: 320,
    isVeg: true
  },
  {
    id: 3,
    name: 'Quinoa Buddha Bowl',
    restaurant: 'Pure Greens',
    image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400',
    price: 12.99,
    kitPrice: 16.99,
    rating: 4.6,
    cookTime: 20,
    description: 'Nutritious quinoa with roasted vegetables, avocado, and tahini dressing',
    calories: 380,
    isVeg: true
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 text-white p-2 rounded-full">
                <Leaf className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">VegBite</h1>
                <p className="text-xs text-green-600 font-medium">Pure Veg Always</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button 
                onClick={() => setIsCartOpen(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                Cart
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-16 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full mb-6">
              <Leaf className="h-5 w-5 mr-2" />
              <span className="font-semibold">100% Pure Vegetarian</span>
            </div>
          </motion.div>
          
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Restaurant Flavors. Home-Cooked.
            <span className="text-green-600 block">Pure Veg Always.</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Order delicious vegetarian dishes or cook them yourself with our premium ingredient kits
          </p>
          
          {/* Search Bar */}
          <motion.div 
            className="relative max-w-2xl mx-auto mb-12"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for vegetarian dishes, cuisines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-4 text-lg rounded-full border-2 border-green-200 focus:border-green-400"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Categories */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-8 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Browse Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <motion.div
                key={category.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.name)}
                className={`${category.color} rounded-2xl p-6 text-white cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <category.icon className="h-8 w-8 mb-3 mx-auto" />
                <p className="text-center font-semibold">{category.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Dishes */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-16 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Dishes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDishes.map((dish) => (
              <motion.div key={dish.id} variants={itemVariants}>
                <DishCard 
                  dish={dish} 
                  onClick={() => navigate(`/dish/${dish.id}`)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* VegBite Promise */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="py-16 px-4 bg-green-600 text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <Leaf className="h-16 w-16 mx-auto mb-6 text-green-200" />
          <h3 className="text-3xl font-bold mb-4">Our VegBite Promise</h3>
          <p className="text-xl text-green-100 mb-8">
            Every dish is 100% vegetarian, made with fresh ingredients, and crafted with love. 
            Whether you order or cook, you're getting authentic flavors without compromise.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8" />
              </div>
              <h4 className="font-semibold mb-2">100% Pure Veg</h4>
              <p className="text-green-100">No meat, no fish, completely vegetarian</p>
            </div>
            <div className="text-center">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="h-8 w-8" />
              </div>
              <h4 className="font-semibold mb-2">Chef Quality</h4>
              <p className="text-green-100">Restaurant-grade recipes and ingredients</p>
            </div>
            <div className="text-center">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h4 className="font-semibold mb-2">Made with Love</h4>
              <p className="text-green-100">Passionate about great vegetarian food</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Cart Component */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Index;
