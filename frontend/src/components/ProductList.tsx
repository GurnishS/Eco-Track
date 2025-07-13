import React, { useState } from 'react';
import type { Product } from '../types/api';
import { getSpecificProductImage } from '../utils/productImages';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Get unique categories
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  
  // Filter products by category
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const getEcoScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    if (score >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getEcoScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Available Products</h2>
        <div className="text-sm text-gray-600">
          {filteredProducts.length} products
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-eco-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProducts.map(product => (
          <div
            key={product._id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Product Image */}
            <div className="w-full h-48 overflow-hidden">
              <img
                src={getSpecificProductImage(product)}
                alt={product.productName}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.style.background = 'linear-gradient(135deg, #f3f4f6, #e5e7eb)';
                  target.parentElement!.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center">
                      <svg class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  `;
                }}
              />
            </div>
            
            <div className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">
                  {product.productName}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {product.description}
                </p>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg font-bold text-gray-800">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">
                    • {product.category}
                  </span>
                </div>
              </div>
              
              {product.isSustainable && (
                <div className="bg-eco-100 text-eco-800 px-2 py-1 rounded-full text-xs font-medium">
                  🌱 Sustainable
                </div>
              )}
            </div>

            {/* EcoScore */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">EcoScore</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEcoScoreColor(product.ecoScore)}`}>
                  {product.ecoScore}/100 • {getEcoScoreLabel(product.ecoScore)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    product.ecoScore >= 80 ? 'bg-green-500' :
                    product.ecoScore >= 60 ? 'bg-yellow-500' :
                    product.ecoScore >= 40 ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${product.ecoScore}%` }}
                ></div>
              </div>
            </div>

            {/* Environmental Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <span className="text-gray-600">Carbon:</span>
                <span className="ml-1 font-medium">{product.carbonFootprint}kg</span>
              </div>
              <div>
                <span className="text-gray-600">Packaging:</span>
                <span className="ml-1 font-medium">{product.packagingWaste}g</span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => onAddToCart(product)}
              className="w-full bg-eco-600 text-white py-2 px-4 rounded-lg hover:bg-eco-700 transition-colors font-medium"
            >
              Add to Cart
            </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <p className="text-gray-500">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
