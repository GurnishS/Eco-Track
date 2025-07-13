import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Leaf, 
  BarChart3, 
  Award, 
  ShoppingCart,
  TrendingUp,
  Users
} from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Real-Time Cart Analysis',
      description: 'Get instant EcoScore calculations and environmental impact insights for every item in your cart.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly Suggestions',
      description: 'Discover greener alternatives with our smart recommendation engine that helps you make sustainable choices.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Award,
      title: 'EcoPoints Rewards',
      description: 'Earn points for sustainable shopping decisions and unlock exclusive rewards and discounts.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'Impact Analytics',
      description: 'Track your environmental impact over time with detailed analytics and progress reports.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { value: '10K+', label: 'Products Analyzed', icon: ShoppingCart },
    { value: '25%', label: 'Average Carbon Reduction', icon: Leaf },
    { value: '50K+', label: 'EcoPoints Earned', icon: Award },
    { value: '99%', label: 'User Satisfaction', icon: Users }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
                Smart Shopping for a{' '}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Greener Future
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                EcoTrack helps you make sustainable shopping decisions with real-time environmental impact analysis, 
                smart suggestions, and rewards for eco-friendly choices.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Link
                to="/products"
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <span>Start Shopping Smart</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/dashboard"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:border-green-500 hover:text-green-600 transition-all duration-300"
              >
                <BarChart3 className="h-5 w-5" />
                <span>View Analytics</span>
              </Link>
            </motion.div>

            {/* Hero Image/Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { 
                      img: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200&h=150&fit=crop&crop=center&auto=format&q=80',
                      score: 95,
                      name: 'Organic Apples'
                    },
                    { 
                      img: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=200&h=150&fit=crop&crop=center&auto=format&q=80',
                      score: 88,
                      name: 'Eco Water Bottle'
                    },
                    { 
                      img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&h=150&fit=crop&crop=center&auto=format&q=80',
                      score: 75,
                      name: 'Organic Milk'
                    },
                    { 
                      img: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200&h=150&fit=crop&crop=center&auto=format&q=80',
                      score: 65,
                      name: 'Healthy Snacks'
                    }
                  ].map((product, i) => (
                    <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="w-full h-20 rounded-lg mb-3 overflow-hidden">
                        <img 
                          src={product.img} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="h-2 bg-green-200 rounded-full mb-2">
                        <div 
                          className="h-2 bg-green-500 rounded-full transition-all duration-1000" 
                          style={{ width: `${product.score}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-600 text-center">EcoScore: {product.score}/100</div>
                      <div className="text-xs text-gray-500 text-center mt-1">{product.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Sustainable Shopping
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to make informed, eco-friendly shopping decisions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-6`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Start Your Eco-Friendly Journey?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of shoppers who are making a positive impact on the environment with every purchase.
            </p>
            <Link
              to="/products"
              className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold inline-flex items-center space-x-2 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <span>Browse Products Now</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
