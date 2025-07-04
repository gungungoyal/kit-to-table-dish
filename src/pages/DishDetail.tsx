import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, ChefHat, Users, ArrowLeft, Plus, Minus, IndianRupee, Leaf, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Cart from '@/components/Cart';
import { useCart } from '@/context/CartContext';

const dishData = {
  1: {
    id: 1,
    name: 'Masala Dosa',
    restaurant: 'South Spice',
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=800',
    price: 89,
    kitPrice: 49,
    rating: 4.7,
    cookTime: 20,
    description: 'Crispy fermented crepe with spiced potato filling and chutneys',
    ingredients: [
      'Dosa batter (200ml)',
      'Potatoes (3 medium)',
      'Onions (2 medium)',
      'Green chilies (4)',
      'Mustard seeds (1 tsp)',
      'Curry leaves (10)',
      'Turmeric (1/2 tsp)',
      'Ginger paste (1 tsp)',
      'Coconut chutney mix',
      'Sambar powder (2 tbsp)',
      'Oil for cooking'
    ],
    recipe: [
      'Heat oil and add mustard seeds, curry leaves',
      'Add onions and green chilies, sauté until golden',
      'Add boiled potatoes and turmeric, mash lightly',
      'Heat dosa pan and spread batter thin',
      'Add potato filling and fold the dosa',
      'Serve hot with coconut chutney and sambar'
    ]
  },
  5: {
    id: 5,
    name: 'Paneer Butter Masala',
    restaurant: 'Spice Garden',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800',
    price: 179,
    kitPrice: 89,
    rating: 4.8,
    cookTime: 35,
    description: 'Rich and creamy paneer curry with aromatic spices and fresh herbs',
    ingredients: [
      'Paneer cubes (200g)',
      'Basmati rice (150g)',
      'Onions (2 medium)',
      'Tomatoes (3 medium)',
      'Heavy cream (150ml)',
      'Cashews (30g)',
      'Garam masala (1 tbsp)',
      'Turmeric (1/2 tsp)',
      'Red chili powder (1 tsp)',
      'Fresh ginger (20g)',
      'Garlic (4 cloves)',
      'Fresh cilantro (1 bunch)'
    ],
    recipe: [
      'Soak cashews in warm water for 15 minutes',
      'Heat oil and sauté onions until golden brown',
      'Add ginger-garlic paste and cook for 2 minutes',
      'Add tomatoes and spices, cook until thick',
      'Blend cashews with cream to make paste',
      'Add paneer and cream mixture, simmer for 10 minutes',
      'Garnish with fresh cilantro and serve hot with rice'
    ]
  },
  10: {
    id: 10,
    name: 'Hakka Noodles',
    restaurant: 'Dragon Bowl',
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=800',
    price: 139,
    kitPrice: 75,
    rating: 4.4,
    cookTime: 15,
    description: 'Stir-fried noodles with colorful vegetables and Indo-Chinese spices',
    ingredients: [
      'Hakka noodles (200g)',
      'Mixed vegetables (150g)',
      'Bell peppers (2)',
      'Cabbage (100g)',
      'Carrots (2)',
      'Soy sauce (3 tbsp)',
      'Vinegar (1 tbsp)',
      'Chili sauce (2 tbsp)',
      'Garlic (4 cloves)',
      'Spring onions (4)',
      'Oil for cooking'
    ],
    recipe: [
      'Boil noodles according to package instructions',
      'Heat oil in wok, add garlic and stir',
      'Add all vegetables and stir-fry for 3 minutes',
      'Add sauces and mix well',
      'Toss in cooked noodles and mix',
      'Garnish with spring onions and serve hot'
    ]
  },
  13: {
    id: 13,
    name: 'Red Sauce Pasta',
    restaurant: 'Italian Corner',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=800',
    price: 149,
    kitPrice: 79,
    rating: 4.6,
    cookTime: 25,
    description: 'Classic penne pasta in rich tomato basil sauce with fresh herbs',
    ingredients: [
      'Penne pasta (200g)',
      'Tomatoes (4 large)',
      'Fresh basil (1 bunch)',
      'Garlic (4 cloves)',
      'Onions (1 medium)',
      'Olive oil (50ml)',
      'Parmesan cheese (50g)',
      'Italian herbs (1 tsp)',
      'Red chili flakes (1/2 tsp)',
      'Salt and pepper to taste'
    ],
    recipe: [
      'Boil pasta according to package instructions',
      'Heat olive oil and sauté garlic and onions',
      'Add chopped tomatoes and cook until soft',
      'Add herbs and seasonings',
      'Toss cooked pasta with sauce',
      'Garnish with fresh basil and parmesan',
      'Serve hot with garlic bread'
    ]
  },
  21: {
    id: 21,
    name: 'Veg Biryani',
    restaurant: 'Biryani House',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d4d6?w=800',
    price: 199,
    kitPrice: 99,
    rating: 4.7,
    cookTime: 45,
    description: 'Fragrant basmati rice layered with mixed vegetables and aromatic spices',
    ingredients: [
      'Basmati rice (300g)',
      'Mixed vegetables (250g)',
      'Onions (2 large)',
      'Yogurt (200g)',
      'Biryani masala (2 tbsp)',
      'Saffron (pinch)',
      'Mint leaves (1 bunch)',
      'Coriander leaves (1 bunch)',
      'Ghee (50ml)',
      'Bay leaves (3)',
      'Green cardamom (4)',
      'Cinnamon stick (2)'
    ],
    recipe: [
      'Soak basmati rice for 30 minutes',
      'Marinate vegetables in yogurt and spices',
      'Fry onions until golden and crispy',
      'Layer rice and vegetables in a heavy-bottomed pot',
      'Add saffron milk and fried onions on top',
      'Cook on high heat for 3 minutes, then dum for 45 minutes',
      'Garnish with mint and serve with raita'
    ]
  }
};

const DishDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState<'restaurant' | 'kit' | null>(null);
  const [servings, setServings] = useState(1);
  const [kitType, setKitType] = useState<'standard' | 'custom'>('standard');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const { cartItems, addToCart, updateQuantity, removeItem, getTotalItems, isCartOpen, setIsCartOpen } = useCart();
  
  const dish = dishData[parseInt(id || '1') as keyof typeof dishData] || dishData[1];

  const calculateKitPrice = () => {
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
      setSelectedIngredients(dish.ingredients);
    }
  }, [kitType, dish.ingredients]);

  const handleAddToCart = () => {
    if (!orderType) return;
    
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
  };

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
                          {dish.ingredients.map((ingredient, index) => (
                            <Badge key={index} variant="secondary">{ingredient}</Badge>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="custom" className="mt-4">
                        <p className="text-gray-600 mb-4">Select only the ingredients you need (10% discount applied).</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {dish.ingredients.map((ingredient, index) => (
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
                      {dish.recipe.map((step, index) => (
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
