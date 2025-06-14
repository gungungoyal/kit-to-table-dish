
import React, { useState } from 'react';
import { Search, Star, Clock, ChefHat, Leaf, Pizza, Coffee, Heart, IndianRupee } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DishCard from '@/components/DishCard';
import Cart from '@/components/Cart';

const categories = [
  { name: 'South Indian', icon: ChefHat, color: 'bg-orange-500' },
  { name: 'North Indian', icon: Heart, color: 'bg-green-500' },
  { name: 'Chinese', icon: Coffee, color: 'bg-yellow-500' },
  { name: 'Italian', icon: Pizza, color: 'bg-red-500' },
  { name: 'Gujarati', icon: Leaf, color: 'bg-blue-500' },
  { name: 'Rajasthani', icon: Star, color: 'bg-purple-500' },
  { name: 'Continental', icon: Clock, color: 'bg-pink-500' },
  { name: 'Street Food', icon: ChefHat, color: 'bg-amber-500' },
  { name: 'Desserts', icon: Heart, color: 'bg-rose-500' },
];

const featuredDishes = [
  // South Indian
  {
    id: 1,
    name: 'Masala Dosa',
    restaurant: 'South Spice',
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400',
    price: 89,
    kitPrice: 49,
    rating: 4.7,
    cookTime: 20,
    description: 'Crispy fermented crepe with spiced potato filling and chutneys',
    calories: 280,
    isVeg: true,
    cuisine: 'South Indian'
  },
  {
    id: 2,
    name: 'Idli Sambhar',
    restaurant: 'South Spice',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400',
    price: 79,
    kitPrice: 45,
    rating: 4.6,
    cookTime: 15,
    description: 'Fluffy steamed rice cakes served with spicy lentil curry',
    calories: 250,
    isVeg: true,
    cuisine: 'South Indian'
  },
  {
    id: 3,
    name: 'Medu Vada',
    restaurant: 'South Spice',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
    price: 69,
    kitPrice: 39,
    rating: 4.5,
    cookTime: 25,
    description: 'Crispy deep-fried savory donuts made from urad dal',
    calories: 320,
    isVeg: true,
    cuisine: 'South Indian'
  },
  {
    id: 4,
    name: 'Uttapam',
    restaurant: 'South Spice',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400',
    price: 99,
    kitPrice: 59,
    rating: 4.4,
    cookTime: 30,
    description: 'Thick pancake topped with onions, tomatoes and peppers',
    calories: 300,
    isVeg: true,
    cuisine: 'South Indian'
  },
  
  // North Indian
  {
    id: 5,
    name: 'Paneer Butter Masala',
    restaurant: 'Spice Garden',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400',
    price: 179,
    kitPrice: 89,
    rating: 4.8,
    cookTime: 35,
    description: 'Rich and creamy paneer curry with aromatic spices',
    calories: 420,
    isVeg: true,
    cuisine: 'North Indian'
  },
  {
    id: 6,
    name: 'Dal Tadka',
    restaurant: 'Punjab Dhaba',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
    price: 129,
    kitPrice: 65,
    rating: 4.6,
    cookTime: 30,
    description: 'Yellow lentils tempered with cumin, garlic and spices',
    calories: 180,
    isVeg: true,
    cuisine: 'North Indian'
  },
  {
    id: 7,
    name: 'Chole Bhature',
    restaurant: 'Punjab Dhaba',
    image: 'https://images.unsplash.com/photo-1606491956391-491155b27cd8?w=400',
    price: 149,
    kitPrice: 79,
    rating: 4.7,
    cookTime: 40,
    description: 'Spicy chickpea curry served with fluffy deep-fried bread',
    calories: 520,
    isVeg: true,
    cuisine: 'North Indian'
  },
  {
    id: 8,
    name: 'Aloo Paratha',
    restaurant: 'Punjab Dhaba',
    image: 'https://images.unsplash.com/photo-1574653617251-04136b88ebba?w=400',
    price: 89,
    kitPrice: 49,
    rating: 4.5,
    cookTime: 25,
    description: 'Stuffed flatbread with spiced potato filling and butter',
    calories: 350,
    isVeg: true,
    cuisine: 'North Indian'
  },
  {
    id: 9,
    name: 'Rajma Chawal',
    restaurant: 'Home Kitchen',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
    price: 139,
    kitPrice: 75,
    rating: 4.5,
    cookTime: 50,
    description: 'Kidney bean curry served with steamed basmati rice',
    calories: 400,
    isVeg: true,
    cuisine: 'North Indian'
  },
  
  // Chinese
  {
    id: 10,
    name: 'Hakka Noodles',
    restaurant: 'Dragon Bowl',
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400',
    price: 139,
    kitPrice: 75,
    rating: 4.4,
    cookTime: 15,
    description: 'Stir-fried noodles with colorful vegetables and Indo-Chinese spices',
    calories: 350,
    isVeg: true,
    cuisine: 'Chinese'
  },
  {
    id: 11,
    name: 'Veg Momos',
    restaurant: 'Dragon Bowl',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400',
    price: 119,
    kitPrice: 65,
    rating: 4.6,
    cookTime: 20,
    description: 'Steamed dumplings filled with fresh vegetables and spices',
    calories: 280,
    isVeg: true,
    cuisine: 'Chinese'
  },
  {
    id: 12,
    name: 'Honey Chilli Potato',
    restaurant: 'Dragon Bowl',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400',
    price: 159,
    kitPrice: 85,
    rating: 4.3,
    cookTime: 25,
    description: 'Crispy potato strips tossed in sweet and spicy honey chilli sauce',
    calories: 380,
    isVeg: true,
    cuisine: 'Chinese'
  },
  
  // Italian
  {
    id: 13,
    name: 'Red Sauce Pasta',
    restaurant: 'Italian Corner',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400',
    price: 149,
    kitPrice: 79,
    rating: 4.6,
    cookTime: 25,
    description: 'Classic penne pasta in rich tomato basil sauce with fresh herbs',
    calories: 380,
    isVeg: true,
    cuisine: 'Italian'
  },
  {
    id: 14,
    name: 'White Sauce Pasta',
    restaurant: 'Italian Corner',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400',
    price: 159,
    kitPrice: 85,
    rating: 4.5,
    cookTime: 30,
    description: 'Creamy alfredo pasta with herbs and parmesan cheese',
    calories: 450,
    isVeg: true,
    cuisine: 'Italian'
  },
  
  // Gujarati
  {
    id: 15,
    name: 'Dhokla',
    restaurant: 'Gujarati Kitchen',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
    price: 79,
    kitPrice: 39,
    rating: 4.6,
    cookTime: 30,
    description: 'Steamed and spiced gram flour cake with tangy tempering',
    calories: 220,
    isVeg: true,
    cuisine: 'Gujarati'
  },
  {
    id: 16,
    name: 'Khandvi',
    restaurant: 'Gujarati Kitchen',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400',
    price: 89,
    kitPrice: 49,
    rating: 4.4,
    cookTime: 45,
    description: 'Soft gram flour rolls seasoned with mustard and sesame seeds',
    calories: 180,
    isVeg: true,
    cuisine: 'Gujarati'
  },
  
  // Rajasthani
  {
    id: 17,
    name: 'Dal Baati Churma',
    restaurant: 'Rajasthani Rasoi',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400',
    price: 189,
    kitPrice: 95,
    rating: 4.7,
    cookTime: 60,
    description: 'Traditional wheat balls with lentil curry and sweet churma',
    calories: 580,
    isVeg: true,
    cuisine: 'Rajasthani'
  },
  
  // Street Food
  {
    id: 18,
    name: 'Pav Bhaji',
    restaurant: 'Mumbai Street',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400',
    price: 99,
    kitPrice: 55,
    rating: 4.5,
    cookTime: 30,
    description: 'Spicy mixed vegetable curry served with buttered bread rolls',
    calories: 420,
    isVeg: true,
    cuisine: 'Street Food'
  },
  {
    id: 19,
    name: 'Samosa',
    restaurant: 'Delhi Chaat',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
    price: 49,
    kitPrice: 29,
    rating: 4.4,
    cookTime: 20,
    description: 'Crispy triangular pastries filled with spiced potatoes and peas',
    calories: 150,
    isVeg: true,
    cuisine: 'Street Food'
  },
  
  // Continental
  {
    id: 20,
    name: 'Continental Salad',
    restaurant: 'Fresh Greens',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    price: 99,
    kitPrice: 55,
    rating: 4.4,
    cookTime: 10,
    description: 'Fresh mixed greens with cherry tomatoes, cucumber and herbs',
    calories: 150,
    isVeg: true,
    cuisine: 'Continental'
  },
  
  // Veg Biryani
  {
    id: 21,
    name: 'Veg Biryani',
    restaurant: 'Biryani House',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d4d6?w=400',
    price: 199,
    kitPrice: 99,
    rating: 4.7,
    cookTime: 45,
    description: 'Fragrant basmati rice layered with mixed vegetables and aromatic spices',
    calories: 480,
    isVeg: true,
    cuisine: 'North Indian'
  },
  
  // Desserts
  {
    id: 22,
    name: 'Gulab Jamun',
    restaurant: 'Sweet Palace',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
    price: 89,
    kitPrice: 49,
    rating: 4.8,
    cookTime: 40,
    description: 'Soft milk dumplings soaked in rose-flavored sugar syrup',
    calories: 320,
    isVeg: true,
    cuisine: 'Desserts'
  },
  {
    id: 23,
    name: 'Rasmalai',
    restaurant: 'Sweet Palace',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    price: 109,
    kitPrice: 65,
    rating: 4.7,
    cookTime: 35,
    description: 'Soft cottage cheese dumplings in sweetened, thickened milk',
    calories: 280,
    isVeg: true,
    cuisine: 'Desserts'
  },
  {
    id: 24,
    name: 'Jalebi',
    restaurant: 'Sweet Palace',
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400',
    price: 79,
    kitPrice: 45,
    rating: 4.5,
    cookTime: 30,
    description: 'Crispy spiral-shaped sweet soaked in sugar syrup',
    calories: 250,
    isVeg: true,
    cuisine: 'Desserts'
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState<number[]>([]);
  const navigate = useNavigate();

  const filteredDishes = featuredDishes.filter(dish => {
    const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dish.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dish.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || dish.cuisine === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (dishId: number) => {
    setAddedToCart(prev => [...prev, dishId]);
    setTimeout(() => {
      setAddedToCart(prev => prev.filter(id => id !== dishId));
    }, 2000);
  };

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
          <p className="text-xl text-gray-600 mb-4">
            Order delicious vegetarian dishes or cook them yourself with our premium ingredient kits
          </p>
          <div className="bg-orange-100 text-orange-800 px-6 py-3 rounded-lg mb-8 inline-block">
            <span className="font-semibold">Cook at Home, Save More – Ingredient Kits Available</span>
          </div>
          
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
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Browse Cuisines</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory('')}
              className={`bg-gray-600 rounded-2xl p-4 text-white cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 ${selectedCategory === '' ? 'ring-2 ring-green-500' : ''}`}
            >
              <div className="h-8 w-8 mb-2 mx-auto flex items-center justify-center">🍽️</div>
              <p className="text-center font-semibold text-sm">All Dishes</p>
            </motion.div>
            {categories.map((category) => (
              <motion.div
                key={category.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.name)}
                className={`${category.color} rounded-2xl p-4 text-white cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 ${selectedCategory === category.name ? 'ring-2 ring-green-500' : ''}`}
              >
                <category.icon className="h-6 w-6 mb-2 mx-auto" />
                <p className="text-center font-semibold text-sm">{category.name}</p>
              </motion.div>
            ))}
          </div>
          {selectedCategory && (
            <div className="text-center mt-4">
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                Showing {filteredDishes.length} {selectedCategory} dishes
              </span>
            </div>
          )}
        </div>
      </motion.section>

      {/* Featured Dishes */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-16 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {selectedCategory ? `${selectedCategory} Dishes` : 'Featured Dishes'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDishes.map((dish) => (
              <motion.div key={dish.id} variants={itemVariants}>
                <DishCard 
                  dish={dish} 
                  onClick={() => navigate(`/dish/${dish.id}`)}
                  onAddToCart={() => handleAddToCart(dish.id)}
                  isAdded={addedToCart.includes(dish.id)}
                />
              </motion.div>
            ))}
          </div>
          {filteredDishes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No dishes found. Try searching for something else!</p>
            </div>
          )}
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
                <IndianRupee className="h-8 w-8" />
              </div>
              <h4 className="font-semibold mb-2">Save Money</h4>
              <p className="text-green-100">Cook at home and save up to 50% on your food</p>
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
