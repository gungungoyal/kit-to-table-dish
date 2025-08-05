import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Leaf, 
  Heart, 
  Users, 
  Clock, 
  Award, 
  Truck,
  ChefHat,
  Shield,
  Star,
  MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { icon: Users, label: 'Happy Customers', value: '10,000+' },
    { icon: ChefHat, label: 'Recipes', value: '500+' },
    { icon: Truck, label: 'Cities Served', value: '25+' },
    { icon: Award, label: 'Years Experience', value: '5+' }
  ];

  const values = [
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'We source ingredients locally and use eco-friendly packaging to minimize our environmental impact.'
    },
    {
      icon: Heart,
      title: 'Health First',
      description: 'Every dish is crafted with nutrition in mind, using fresh, organic ingredients whenever possible.'
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'Our kitchen follows strict hygiene standards and quality control measures for your safety.'
    },
    {
      icon: Star,
      title: 'Customer Satisfaction',
      description: 'We are committed to delivering exceptional service and delicious food every time.'
    }
  ];

  const team = [
    {
      name: 'Priya Sharma',
      role: 'Head Chef',
      description: 'Master of traditional Indian vegetarian cuisine with 15+ years experience.'
    },
    {
      name: 'Raj Kumar',
      role: 'Nutrition Expert',
      description: 'Ensures every dish meets our high nutritional standards and dietary requirements.'
    },
    {
      name: 'Anita Patel',
      role: 'Operations Manager',
      description: 'Oversees our kitchen operations and maintains quality across all locations.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-green-600 via-green-500 to-emerald-500 text-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            About <span className="text-yellow-300">VegBite</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          >
            Bringing fresh, delicious vegetarian food to your doorstep since 2019
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Badge className="bg-yellow-500 text-black font-semibold px-6 py-2 text-lg">
              100% Vegetarian • Locally Sourced • Freshly Made
            </Badge>
          </motion.div>
        </div>
      </motion.div>

      {/* Our Story */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                VegBite started with a simple mission: to make delicious, healthy vegetarian food 
                accessible to everyone. Founded by food enthusiasts who believed that plant-based 
                eating should be both nutritious and incredibly tasty.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                What began as a small kitchen operation has grown into a network serving thousands 
                of customers across multiple cities, but our commitment to quality and freshness 
                remains unchanged.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Today, we offer both ready-made meals for busy lifestyles and cooking kits for 
                those who love to create their own culinary experiences at home.
              </p>
              <Link to="/menu">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Explore Our Menu
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/7245480/pexels-photo-7245480.jpeg" 
                alt="Fresh vegetables and healthy food"
                className="rounded-lg shadow-xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-green-600 text-white p-4 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">5+ Years</div>
                <div className="text-sm">Serving Fresh Food</div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="py-16 bg-green-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-lg text-gray-600">
              See how we're making a difference in the vegetarian food space
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="bg-green-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Our Values */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do at VegBite
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + index * 0.1, duration: 0.6 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <value.icon className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {value.title}
                        </h3>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600">
              The passionate people behind your delicious meals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + index * 0.1, duration: 0.6 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <ChefHat className="h-12 w-12 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <div className="text-green-600 font-medium mb-3">{member.role}</div>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="py-16 bg-green-600 text-white"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience VegBite?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied customers who have made VegBite their go-to choice for delicious vegetarian food.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu">
              <Button size="lg" variant="secondary" className="font-semibold">
                Order Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 font-semibold">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
