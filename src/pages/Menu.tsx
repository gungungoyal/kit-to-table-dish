import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import DishCard from '@/components/DishCard';
import Cart from '@/components/Cart';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

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
  type: string;
}

const Menu = () => {
  const { cartItems, updateQuantity, removeItem, isCartOpen, setIsCartOpen, addToCart } = useCart();
  const { toast } = useToast();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    fetchDishes();
  }, []);

  useEffect(() => {
    filterDishes();
  }, [dishes, searchTerm, selectedCategory]);

  const fetchDishes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('veg_dishes')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Fetched dishes data:', data);

      const formattedDishes: Dish[] = data.map(dish => ({
        id: dish.id,
        name: dish.name,
        restaurant: dish.restaurant || 'VegBite Kitchen',
        image: dish.image_url || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
        price: dish.price,
        kitPrice: dish.kit_price || Math.floor(dish.price * 0.7),
        rating: parseFloat(dish.rating) || 4.5,
        cookTime: dish.cook_time || 20,
        description: dish.description || 'Delicious vegetarian dish made with fresh ingredients.',
        calories: dish.calories,
        isVeg: dish.is_veg !== false,
        cuisine: dish.cuisine || 'Indian',
        type: dish.type
      }));

      console.log('Formatted dishes:', formattedDishes);

      setDishes(formattedDishes);

      // Extract unique categories
      const uniqueCategories = ['All', ...Array.from(new Set(data.map(dish => dish.type)))];
      setCategories(uniqueCategories);

    } catch (error) {
      console.error('Error fetching dishes:', error);
      toast({
        title: "Error",
        description: "Failed to load dishes. Please try again.",
        variant: "destructive",
      });

      // Set some fallback dishes so the page isn't empty
      setDishes([
        {
          id: '1',
          name: 'Sample Dish',
          restaurant: 'VegBite Kitchen',
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
          price: 100,
          kitPrice: 70,
          rating: 4.5,
          cookTime: 20,
          description: 'Delicious vegetarian dish',
          calories: 300,
          isVeg: true,
          cuisine: 'Indian',
          type: 'Starters'
        }
      ]);
      setCategories(['All', 'Starters']);
    } finally {
      setLoading(false);
    }
  };

  const filterDishes = () => {
    let filtered = dishes;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(dish =>
        dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.cuisine?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(dish => dish.type === selectedCategory);
    }

    setFilteredDishes(filtered);
  };

  const handleDishClick = (dishId: string) => {
    // Navigate to dish detail page
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
            <p className="text-lg text-gray-600">Loading delicious dishes...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Complete Menu
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore our wide variety of vegetarian dishes and cooking kits
          </p>
          <div className="flex items-center justify-center">
            <Badge className="bg-yellow-500 text-black font-semibold px-4 py-2 text-lg">
              {dishes.length} Delicious Dishes Available
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search dishes, cuisine, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Showing {filteredDishes.length} of {dishes.length} dishes
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </motion.div>

        {/* Dishes Grid */}
        {filteredDishes.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredDishes.map((dish, index) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              >
                <DishCard
                  dish={dish}
                  onClick={() => handleDishClick(dish.id)}
                  onAddToCart={() => handleAddToCart(dish)}
                  isAdded={cartItems.some(item => item.id === dish.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No dishes found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
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

export default Menu;
