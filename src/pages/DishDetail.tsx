
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, ChefHat, Users, ArrowLeft, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const dishData = {
  1: {
    id: 1,
    name: 'Chicken Tikka Masala',
    restaurant: 'Spice Palace',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800',
    price: 18.99,
    kitPrice: 24.99,
    rating: 4.8,
    cookTime: 45,
    description: 'Tender chicken marinated in yogurt and spices, cooked in a creamy tomato-based curry sauce with aromatic spices',
    ingredients: [
      'Chicken breast (500g)',
      'Basmati rice (200g)',
      'Onions (2 medium)',
      'Tomatoes (3 medium)',
      'Heavy cream (200ml)',
      'Yogurt (150g)',
      'Garam masala (2 tbsp)',
      'Turmeric (1 tsp)',
      'Cumin (1 tsp)',
      'Fresh ginger (30g)',
      'Garlic (4 cloves)',
      'Fresh cilantro (1 bunch)'
    ],
    recipe: [
      'Marinate chicken in yogurt and spices for 30 minutes',
      'Heat oil in a large pan and cook marinated chicken until golden',
      'Sauté onions, ginger, and garlic until fragrant',
      'Add tomatoes and spices, cook until thick',
      'Add cooked chicken and cream, simmer for 15 minutes',
      'Serve hot with basmati rice and fresh cilantro'
    ]
  }
};

const DishDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState<'restaurant' | 'kit' | null>(null);
  const [servings, setServings] = useState(2);
  const [kitType, setKitType] = useState<'standard' | 'custom'>('standard');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  
  const dish = dishData[parseInt(id || '1') as keyof typeof dishData] || dishData[1];

  const calculateKitPrice = () => {
    const basePrice = dish.kitPrice * servings;
    if (kitType === 'custom') {
      return basePrice * 0.9; // 10% discount for custom selection
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm border-b sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
              <ChefHat className="h-6 w-6 text-orange-500" />
              <span className="text-lg font-semibold">FlavorFlex</span>
            </div>
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
                  <ChefHat className="h-5 w-5 text-orange-500" />
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
                        ? 'ring-2 ring-orange-500 bg-orange-50' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setOrderType('restaurant')}
                  >
                    <CardContent className="p-6 text-center">
                      <h4 className="font-semibold text-lg mb-2">Order from Restaurant</h4>
                      <p className="text-3xl font-bold text-orange-600">${dish.price}</p>
                      <p className="text-sm text-gray-600 mt-2">Ready in 30-45 min</p>
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
                        ? 'ring-2 ring-orange-500 bg-orange-50' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setOrderType('kit')}
                  >
                    <CardContent className="p-6 text-center">
                      <h4 className="font-semibold text-lg mb-2">Order Ingredients Kit</h4>
                      <p className="text-3xl font-bold text-green-600">${dish.kitPrice}</p>
                      <p className="text-sm text-gray-600 mt-2">Cook in {dish.cookTime} min</p>
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
                      <span className="text-lg font-semibold px-4">{servings}</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setServings(servings + 1)}
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
                      <span className="text-2xl font-bold text-green-600">
                        ${calculateKitPrice().toFixed(2)}
                      </span>
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
                        <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
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

        {/* Add to Cart Button */}
        <AnimatePresence>
          {orderType && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="sticky bottom-4 z-30"
            >
              <Button 
                size="lg" 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6"
              >
                Add to Cart - ${orderType === 'restaurant' ? dish.price : calculateKitPrice().toFixed(2)}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DishDetail;
