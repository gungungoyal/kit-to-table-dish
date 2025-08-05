import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, ChefHat, Users, ArrowLeft, Plus, Minus, IndianRupee, Leaf, ShoppingCart, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Cart from '@/components/Cart';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/integrations/supabase/client';
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
  cuisine?: string;
  type: string;
}

// Generate default ingredients and recipe based on dish name and type
const generateIngredientsAndRecipe = (dish: Dish) => {
  const dishName = dish.name.toLowerCase();
  const dishType = dish.type.toLowerCase();

  let ingredients: string[] = [];
  let recipe: string[] = [];

  // Generate ingredients based on dish type and name
  if (dishName.includes('noodles')) {
    ingredients = ['Noodles (200g)', 'Mixed vegetables (150g)', 'Soy sauce (3 tbsp)', 'Garlic (4 cloves)', 'Oil (2 tbsp)', 'Spring onions (2)', 'Salt to taste'];
    recipe = ['Boil noodles according to package instructions', 'Heat oil in wok, add garlic', 'Add vegetables and stir-fry for 3 minutes', 'Add sauces and noodles', 'Toss well and serve hot'];
  } else if (dishName.includes('rice')) {
    ingredients = ['Basmati rice (250g)', 'Mixed vegetables (150g)', 'Spices (2 tbsp)', 'Oil (2 tbsp)', 'Onions (2)', 'Salt to taste'];
    recipe = ['Wash and soak rice for 30 minutes', 'Heat oil and sauté onions', 'Add vegetables and spices', 'Add rice and water', 'Cook until done'];
  } else if (dishName.includes('paneer')) {
    ingredients = ['Paneer (200g)', 'Onions (2)', 'Tomatoes (3)', 'Spices (mix)', 'Oil (2 tbsp)', 'Fresh cream (50ml)', 'Coriander leaves'];
    recipe = ['Cut paneer into cubes', 'Heat oil and sauté onions', 'Add tomatoes and spices', 'Add paneer and cream', 'Simmer for 10 minutes', 'Garnish and serve'];
  } else if (dishName.includes('dal')) {
    ingredients = ['Lentils (200g)', 'Onions (1)', 'Tomatoes (2)', 'Turmeric (1 tsp)', 'Cumin seeds (1 tsp)', 'Oil (2 tbsp)', 'Salt to taste'];
    recipe = ['Wash and cook lentils until soft', 'Heat oil and add cumin seeds', 'Add onions and tomatoes', 'Add cooked lentils and spices', 'Simmer and serve hot'];
  } else if (dishName.includes('pasta')) {
    ingredients = ['Pasta (200g)', 'Tomatoes (3)', 'Garlic (4 cloves)', 'Olive oil (3 tbsp)', 'Italian herbs (1 tsp)', 'Cheese (50g)'];
    recipe = ['Boil pasta according to package instructions', 'Heat olive oil and sauté garlic', 'Add tomatoes and cook until soft', 'Toss pasta with sauce', 'Add herbs and cheese', 'Serve hot'];
  } else if (dishName.includes('momos')) {
    ingredients = ['Flour (200g)', 'Mixed vegetables (150g)', 'Ginger-garlic paste (1 tbsp)', 'Soy sauce (2 tbsp)', 'Oil (1 tbsp)', 'Salt to taste'];
    recipe = ['Make dough with flour and water', 'Prepare vegetable filling', 'Roll and stuff momos', 'Steam for 15-20 minutes', 'Serve hot with sauce'];
  } else if (dishName.includes('sandwich')) {
    ingredients = ['Bread slices (4)', 'Mixed vegetables (100g)', 'Butter (2 tbsp)', 'Cheese (50g)', 'Chutney (2 tbsp)', 'Salt and pepper'];
    recipe = ['Prepare vegetable filling', 'Apply butter and chutney on bread', 'Add vegetables and cheese', 'Grill until golden', 'Serve hot'];
  } else {
    // Default ingredients and recipe
    ingredients = ['Main ingredient (200g)', 'Onions (2)', 'Tomatoes (2)', 'Spices (mix)', 'Oil (2 tbsp)', 'Salt to taste'];
    recipe = ['Prepare all ingredients', 'Heat oil in pan', 'Add onions and cook until golden', 'Add remaining ingredients', 'Cook until done', 'Serve hot'];
  }

  return { ingredients, recipe };
};

const DishDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dish, setDish] = useState<Dish | null>(null);
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<string[]>([]);
  const [orderType, setOrderType] = useState<'restaurant' | 'kit' | null>(null);
  const [servings, setServings] = useState(1);
  const [kitType, setKitType] = useState<'standard' | 'custom'>('standard');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const { cartItems, addToCart, updateQuantity, removeItem, getTotalItems, isCartOpen, setIsCartOpen } = useCart();

  useEffect(() => {
    if (id) {
      fetchDish();
    }
  }, [id]);

  const fetchDish = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('veg_dishes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching dish:', error);
        toast({
          title: "Error",
          description: "Dish not found. Redirecting to menu.",
          variant: "destructive",
        });
        navigate('/menu');
        return;
      }

      const formattedDish: Dish = {
        id: data.id,
        name: data.name,
        restaurant: data.restaurant || 'VegBite Kitchen',
        image: data.image_url || '/images/placeholder.svg',
        price: data.price,
        kitPrice: data.kit_price || Math.floor(data.price * 0.7),
        rating: parseFloat(data.rating) || 4.5,
        cookTime: data.cook_time || 20,
        description: data.description || 'Delicious vegetarian dish made with fresh ingredients.',
        calories: data.calories,
        cuisine: data.cuisine || 'Indian',
        type: data.type
      };

      setDish(formattedDish);

      // Generate ingredients and recipe
      const { ingredients: generatedIngredients, recipe: generatedRecipe } = generateIngredientsAndRecipe(formattedDish);
      setIngredients(generatedIngredients);
      setRecipe(generatedRecipe);

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to load dish details. Please try again.",
        variant: "destructive",
      });
      navigate('/menu');
    } finally {
      setLoading(false);
    }
  };

  const calculateKitPrice = () => {
    if (!dish) return 0;
    let basePrice = dish.kitPrice;
    if (servings === 2) basePrice = Math.round(dish.kitPrice * 1.7);
    if (servings === 4) basePrice = Math.round(dish.kitPrice * 3);

    if (kitType === 'custom') {
      return Math.round(basePrice * 0.9); // 10% discount for custom selection
    }
    return basePrice;
  };

  const handleIngredientToggle = (ingredient: string) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  React.useEffect(() => {
    if (kitType === 'standard') {
      setSelectedIngredients(ingredients);
    }
  }, [kitType, ingredients]);

  const handleAddToCart = () => {
    if (!orderType || !dish) return;

    const cartItem = {
      id: `${dish.id}-${orderType}-${servings}`,
      name: dish.name,
      restaurant: dish.restaurant,
      type: orderType,
      price: orderType === 'restaurant' ? dish.price : calculateKitPrice(),
      servings: servings,
      kitType: orderType === 'kit' ? kitType : undefined,
      image: dish.image
    };
    addToCart(cartItem);

    toast({
      title: "Added to Cart",
      description: `${dish.name} has been added to your cart!`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading dish details...</p>
        </div>
      </div>
    );
  }

  if (!dish) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Dish not found</p>
          <Button onClick={() => navigate('/menu')} className="mt-4">
            Back to Menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        {/* Header */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white shadow-sm border-b sticky top-0 z-40"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/')}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </Button>
                <div className="flex items-center space-x-2">
                  <div className="bg-green-600 text-white p-2 rounded-full">
                    <Leaf className="h-5 w-5" />
                  </div>
                  <span className="text-lg font-semibold">VegBite</span>
                </div>
              </div>
              
              {/* Cart Icon */}
              <Button
                variant="outline"
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-green-500"
                  >
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </motion.header>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Dish Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          >
            <div className="relative">
              <img 
                src={dish.image} 
                alt={dish.name}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-2 rounded-full flex items-center space-x-1 font-semibold">
                🌱 100% VEG
              </div>
              <div className="absolute top-4 right-4 bg-white px-3 py-2 rounded-full flex items-center space-x-1">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="font-medium">{dish.rating}</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{dish.name}</h1>
                <div className="flex items-center space-x-4 text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <ChefHat className="h-5 w-5 text-green-500" />
                    <span>{dish.restaurant}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-5 w-5" />
                    <span>{dish.cookTime} min</span>
                  </div>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">{dish.description}</p>
              </div>

              {/* Order Type Selection */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">How would you like this dish?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all duration-200 ${
                        orderType === 'restaurant' 
                          ? 'ring-2 ring-green-500 bg-green-50' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setOrderType('restaurant')}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="text-2xl mb-2">🍽️</div>
                        <h4 className="font-semibold text-lg mb-2">Order from Restaurant</h4>
                        <div className="flex items-center justify-center text-2xl font-bold text-gray-800 mb-2">
                          <IndianRupee className="h-6 w-6" />
                          <span>{dish.price}</span>
                        </div>
                        <p className="text-sm text-gray-600">Ready in 30-45 min</p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all duration-200 ${
                        orderType === 'kit' 
                          ? 'ring-2 ring-green-500 bg-green-50' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setOrderType('kit')}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="text-2xl mb-2">🍳</div>
                        <h4 className="font-semibold text-lg mb-2">Cook It Yourself</h4>
                        <div className="flex items-center justify-center text-2xl font-bold text-green-600 mb-2">
                          <IndianRupee className="h-6 w-6" />
                          <span>{dish.kitPrice}</span>
                        </div>
                        <p className="text-sm text-gray-600">Cook in {dish.cookTime} min</p>
                        <div className="text-xs text-orange-600 font-semibold mt-1">
                          Save ₹{dish.price - dish.kitPrice}!
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Kit Customization */}
          <AnimatePresence>
            {orderType === 'kit' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Customize Your Kit</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Servings */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Number of Servings</label>
                      <div className="flex items-center space-x-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setServings(Math.max(1, servings - 1))}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-lg font-semibold px-4">{servings} {servings === 1 ? 'Person' : 'People'}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setServings(Math.min(4, servings + 1))}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Kit Type */}
                    <Tabs value={kitType} onValueChange={(value) => setKitType(value as 'standard' | 'custom')}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="standard">Standard Kit</TabsTrigger>
                        <TabsTrigger value="custom">Customize Ingredients</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="standard" className="mt-4">
                        <p className="text-gray-600 mb-4">Get all ingredients needed for this recipe.</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {ingredients.map((ingredient, index) => (
                            <Badge key={index} variant="secondary">{ingredient}</Badge>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="custom" className="mt-4">
                        <p className="text-gray-600 mb-4">Select only the ingredients you need (10% discount applied).</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {ingredients.map((ingredient, index) => (
                            <label key={index} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selectedIngredients.includes(ingredient)}
                                onChange={() => handleIngredientToggle(ingredient)}
                                className="rounded"
                              />
                              <span className="text-sm">{ingredient}</span>
                            </label>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>

                    {/* Price Summary */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total Price:</span>
                        <div className="flex items-center text-2xl font-bold text-green-600">
                          <IndianRupee className="h-6 w-6" />
                          <span>{calculateKitPrice()}</span>
                        </div>
                      </div>
                      {kitType === 'custom' && (
                        <p className="text-sm text-green-600 mt-1">10% discount applied for custom selection</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recipe Card (shown for kit orders) */}
          <AnimatePresence>
            {orderType === 'kit' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mb-8"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <ChefHat className="h-5 w-5" />
                      <span>Recipe Instructions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recipe.map((step, index) => (
                        <div key={index} className="flex space-x-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </div>
                          <p className="text-gray-700 pt-1">{step}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add to Cart and Go to Cart Buttons */}
          <AnimatePresence>
            {orderType && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="sticky bottom-4 z-30 space-y-3"
              >
                <div className="flex gap-3">
                  <Button 
                    size="lg" 
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white text-lg py-6"
                    onClick={handleAddToCart}
                  >
                    <IndianRupee className="h-5 w-5 mr-2" />
                    Add to Cart - ₹{orderType === 'restaurant' ? dish.price : calculateKitPrice()}
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="px-6 py-6 border-green-500 text-green-600 hover:bg-green-50"
                    onClick={() => setIsCartOpen(true)}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Go to Cart
                    {getTotalItems() > 0 && (
                      <Badge className="ml-2 bg-green-500">{getTotalItems()}</Badge>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
    </>
  );
};

export default DishDetail;
