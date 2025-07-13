import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Minus, 
  Plus, 
  Trash2, 
  ArrowRight,
  Leaf,
  AlertCircle,
  CheckCircle,
  ShoppingBag
} from 'lucide-react';
import type { CartItem, Suggestion } from '../types/api';
import EcoScoreChart from '../components/EcoScoreChart';

interface CartPageProps {
  cart: CartItem[];
  onRemoveFromCart: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onSwapProduct: (originalProduct: any, alternativeProduct: any) => void;
  suggestions: Suggestion[];
  cartAnalysis: any;
}

const CartPage: React.FC<CartPageProps> = ({
  cart,
  onRemoveFromCart,
  onUpdateQuantity,
  onSwapProduct,
  suggestions,
  cartAnalysis
}) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const getEcoScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    if (score >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-16"
        >
          <div className="text-gray-400 text-6xl mb-6">
            <ShoppingBag className="h-24 w-24 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Start shopping to see your eco-friendly recommendations!</p>
          <Link
            to="/products"
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold inline-flex items-center space-x-2 hover:shadow-lg transition-all duration-300"
          >
            <span>Browse Products</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Smart Cart</h1>
        <p className="text-gray-600">
          {totalItems} {totalItems === 1 ? 'item' : 'items'} • Real-time sustainability analysis
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Eco Suggestions */}
          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Leaf className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Eco-Friendly Suggestions</h3>
              </div>
              
              <div className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={suggestion.originalProduct._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-4 border border-green-100"
                  >
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-1">Replace:</h4>
                      <p className="text-sm text-gray-600">{suggestion.originalProduct.productName}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs ${getEcoScoreColor(suggestion.originalProduct.ecoScore)}`}>
                          {suggestion.originalProduct.ecoScore}/100
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Suggested Alternatives:</h4>
                      {suggestion.alternatives.slice(0, 2).map((alternative) => (
                        <div key={alternative._id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm text-gray-900 font-medium">{alternative.productName}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`px-2 py-1 rounded-full text-xs ${getEcoScoreColor(alternative.ecoScore)}`}>
                                {alternative.ecoScore}/100
                              </span>
                              <span className="text-green-600 text-xs font-medium">
                                +{alternative.ecoScore - suggestion.originalProduct.ecoScore} EcoScore
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-sm">
                            <div className="text-gray-600">Price: ${alternative.price.toFixed(2)}</div>
                            <div className="text-green-600 font-medium">
                              Earn {Math.floor(suggestion.potentialEcoPoints / suggestion.alternatives.length)} EcoPoints
                            </div>
                          </div>
                          
                          <div>
                            <button
                              onClick={() => onSwapProduct(suggestion.originalProduct, alternative)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors w-full"
                            >
                              Make Swap
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Cart Items List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Cart Items</h3>
            
            <div className="space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={item.product._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:border-green-200 transition-colors"
                >
                  {/* Product Image Placeholder */}
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-gray-400" />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{item.product.productName}</h4>
                    <p className="text-sm text-gray-600 truncate">{item.product.description}</p>
                    
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-lg font-bold text-gray-900">
                        ${item.product.price.toFixed(2)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEcoScoreColor(item.product.ecoScore)}`}>
                        EcoScore: {item.product.ecoScore}/100
                      </span>
                      {item.product.isSustainable && (
                        <div className="flex items-center text-green-600 text-xs">
                          <Leaf className="h-3 w-3 mr-1" />
                          Sustainable
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => onUpdateQuantity(item.product._id, item.quantity - 1)}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <Minus className="h-4 w-4 text-gray-600" />
                    </button>
                    
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    
                    <button
                      onClick={() => onUpdateQuantity(item.product._id, item.quantity + 1)}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <Plus className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveFromCart(item.product._id)}
                    className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Cart Analysis */}
          {cartAnalysis && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <EcoScoreChart cartAnalysis={cartAnalysis} />
            </motion.div>
          )}

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">FREE</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Eco-Discount</span>
                <span className="font-medium text-green-600">-$2.50</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-gray-900">${(subtotal - 2.5).toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-xl font-semibold mt-6 hover:shadow-lg transition-all duration-300">
              Proceed to Checkout
            </button>
            
            <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Secure checkout with SSL encryption</span>
            </div>
          </motion.div>

          {/* Environmental Impact */}
          {cartAnalysis && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-green-50 border border-green-200 rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Leaf className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Environmental Impact</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Carbon Footprint</span>
                  <span className="font-medium">{cartAnalysis.totalCarbonFootprint}kg CO₂</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Packaging Waste</span>
                  <span className="font-medium">{cartAnalysis.totalPackagingWaste}g</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Overall EcoScore</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEcoScoreColor(cartAnalysis.averageEcoScore)}`}>
                    {cartAnalysis.averageEcoScore}/100
                  </span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 mt-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-gray-700">
                      Great job! Your cart has a {cartAnalysis.averageEcoScore >= 70 ? 'good' : 'fair'} environmental score. 
                      Consider the suggestions above to make it even more sustainable.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
