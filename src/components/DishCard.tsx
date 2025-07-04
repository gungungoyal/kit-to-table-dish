
import React from 'react';
import { Star, Clock, ChefHat, IndianRupee } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface Dish {
  id: number;
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

interface DishCardProps {
  dish: Dish;
  onClick: () => void;
  onAddToCart?: () => void;
  isAdded?: boolean;
}

const DishCard: React.FC<DishCardProps> = ({ dish, onClick, onAddToCart, isAdded = false }) => {
  const savings = dish.price - dish.kitPrice;
  const savingsPercent = Math.round((savings / dish.price) * 100);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={dish.image} 
          alt={dish.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
          🌱 100% VEG
        </div>
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center space-x-1">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{dish.rating}</span>
        </div>
        <div className="absolute bottom-4 right-4 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
          Save {savingsPercent}%
        </div>
        {dish.cuisine && (
          <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold">
            {dish.cuisine}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">{dish.name}</h3>
          <div className="flex items-center text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">{dish.cookTime}m</span>
          </div>
        </div>
        
        <div className="flex items-center mb-3">
          <ChefHat className="h-4 w-4 text-green-600 mr-2" />
          <span className="text-gray-600">{dish.restaurant}</span>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{dish.description}</p>
        
        {dish.calories && (
          <div className="text-sm text-gray-500 mb-3">
            {dish.calories} calories per serving
          </div>
        )}
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Ready-Made</div>
              <div className="flex items-center text-lg font-bold text-gray-800">
                <IndianRupee className="h-5 w-5" />
                <span>{dish.price}</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-green-600 font-semibold">Kit (Save {savingsPercent}%)</div>
              <div className="flex items-center text-lg font-bold text-green-600">
                <IndianRupee className="h-5 w-5" />
                <span>{dish.kitPrice}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              View Details
            </Button>
            <Button 
              size="sm"
              className={`flex-1 text-xs transition-all duration-200 ${
                isAdded 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.();
              }}
            >
              {isAdded ? '✓ Added' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DishCard;
