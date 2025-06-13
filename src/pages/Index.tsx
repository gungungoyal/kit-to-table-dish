
import React, { useState } from 'react';
import { Search, Star, Clock, ChefHat, Leaf, Pizza, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DishCard from '@/components/DishCard';
import Cart from '@/components/Cart';

const categories = [
  { name: 'Biryani', icon: ChefHat, color: 'bg-orange-500' },
  { name: 'Pizza', icon: Pizza, color: 'bg-red-500' },
  { name: 'Vegan', icon: Leaf, color: 'bg-green-500' },
  { name: 'Desserts', icon: Coffee, color: 'bg-purple-500' },
];

const featuredDishes = [
  {
    id: 1,
    name: 'Chicken Tikka Masala',
    restaurant: 'Spice Palace',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400',
    price: 18.99,
    kitPrice: 24.99,
    rating: 4.8,
    cookTime: 45,
    description: 'Tender chicken in a creamy tomato-based curry sauce with aromatic spices'
  },
  {
    id: 2,
    name: 'Margherita Pizza',
    restaurant: 'Tony\'s Pizzeria',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400',
    price: 16.99,
    kitPrice: 19.99,
    rating: 4.7,
    cookTime: 25,
    description: 'Fresh mozzarella, basil, and tomato sauce on hand-tossed dough'
  },
  {
    id: 3,
    name: 'Quinoa Buddha Bowl',
    restaurant: 'Green Leaf Kitchen',
    image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400',
    price: 14.99,
    kitPrice: 18.99,
    rating: 4.6,
    cookTime: 20,
    description: 'Nutritious quinoa with roasted vegetables, avocado, and tahini dressing'
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-orange-500" />
              <h1 className="text-2xl font-bold text-gray-900">FlavorFlex</h1>
            </div>
            <Button 
              onClick={() => setIsCartOpen(true)}
              variant="outline"
              className="relative"
            >
              Cart
            </Button>
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
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Order Food or Cook It Yourself
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get your favorite dishes delivered or learn to make them with our ingredient kits
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
              placeholder="Search for dishes, restaurants, or cuisines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-4 text-lg rounded-full border-2 border-orange-200 focus:border-orange-400"
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

      {/* Cart Component */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Index;
