import React from 'react';
import type { CartItem, Suggestion, Product } from '../types/api';

interface CartProps {
  cart: CartItem[];
  onRemoveFromCart: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onSwapProduct: (originalProduct: Product, alternativeProduct: Product) => void;
  suggestions: Suggestion[];
}

const Cart: React.FC<CartProps> = ({
  cart,
  onRemoveFromCart,
  onUpdateQuantity,
  onSwapProduct,
  suggestions
}) => {
  const totalPrice = cart.reduce((sum: number, item: CartItem) => sum + (item.product.price * item.quantity), 0);
  const totalItems = cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  const getEcoScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getSuggestionForProduct = (productId: string) => {
    return suggestions.find(s => s.originalProduct._id === productId);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Shopping Cart</h2>
        <span className="bg-eco-100 text-eco-800 px-3 py-1 rounded-full text-sm font-medium">
          {totalItems} items
        </span>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-4">🛒</div>
          <p className="text-gray-500">Your cart is empty</p>
          <p className="text-sm text-gray-400 mt-2">Add some products to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item: CartItem) => {
            const suggestion = getSuggestionForProduct(item.product._id);
            
            return (
              <div key={item.product._id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 mb-1">
                      {item.product.productName}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>${item.product.price.toFixed(2)}</span>
                      <span className={`font-medium ${getEcoScoreColor(item.product.ecoScore)}`}>
                        EcoScore: {item.product.ecoScore}/100
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onRemoveFromCart(item.product._id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Remove from cart"
                  >
                    ❌
                  </button>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => onUpdateQuantity(item.product._id, item.quantity - 1)}
                      className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full hover:bg-gray-300 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.product._id, item.quantity + 1)}
                      className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full hover:bg-gray-300 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  
                  <span className="font-bold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                {/* Sustainability Suggestion */}
                {suggestion && suggestion.alternatives.length > 0 && (
                  <div className="bg-eco-50 border border-eco-200 rounded-lg p-3 mt-3">
                    <div className="flex items-start space-x-3">
                      <div className="text-eco-600 text-lg">💡</div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-eco-800 mb-2">
                          Greener Alternative Available!
                        </h4>
                        <div className="bg-white border border-eco-200 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-800">
                              {suggestion.alternatives[0].productName}
                            </span>
                            <span className="text-eco-600 font-medium">
                              +{suggestion.potentialEcoPoints} EcoPoints
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                            <span>${suggestion.alternatives[0].price.toFixed(2)}</span>
                            <span className="text-green-600 font-medium">
                              EcoScore: {suggestion.alternatives[0].ecoScore}/100
                            </span>
                          </div>
                          <button
                            onClick={() => onSwapProduct(item.product, suggestion.alternatives[0])}
                            className="w-full bg-eco-600 text-white py-2 px-4 rounded-lg hover:bg-eco-700 transition-colors text-sm font-medium"
                          >
                            Swap for Better Alternative
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Cart Summary */}
          <div className="border-t border-gray-200 pt-4 mt-6">
            <div className="flex items-center justify-between text-lg font-bold text-gray-800">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            
            <button className="w-full bg-eco-600 text-white py-3 px-4 rounded-lg hover:bg-eco-700 transition-colors font-medium mt-4">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
