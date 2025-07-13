import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search,
  Filter,
  Grid,
  List,
  Star,
  Leaf,
  Package,
  ChevronDown
} from 'lucide-react';
import type { Product } from '../types/api';
import { productService } from '../services/apiService';

interface ProductsPageProps {
  onAddToCart: (product: Product) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'ecoScore'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [ecoScoreFilter, setEcoScoreFilter] = useState(0);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, selectedCategory, sortBy, priceRange, ecoScoreFilter]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAllProducts();
      if (response.success) {
        setProducts(response.data);
        // Set initial price range based on actual products
        const prices = response.data.map(p => p.price);
        setPriceRange({ min: Math.min(...prices), max: Math.max(...prices) });
      }
    } catch (err) {
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = products.filter(product => {
      const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      const matchesEcoScore = product.ecoScore >= ecoScoreFilter;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesEcoScore;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.productName.localeCompare(b.productName);
        case 'price':
          return a.price - b.price;
        case 'ecoScore':
          return b.ecoScore - a.ecoScore;
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  };

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Product Catalog</h1>
        <p className="text-gray-600">
          Discover eco-friendly products with real-time sustainability insights.
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg p-6 mb-8"
      >
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="ecoScore">Sort by EcoScore</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          {/* View Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'grid' ? 'bg-white shadow-sm text-green-600' : 'text-gray-600'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'list' ? 'bg-white shadow-sm text-green-600' : 'text-gray-600'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>

          {/* Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 pt-4 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Price Range: ${priceRange.min} - ${priceRange.max}
              </label>
              <div className="flex space-x-4">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                  className="flex-1"
                />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                  className="flex-1"
                />
              </div>
            </div>

            {/* EcoScore Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Minimum EcoScore: {ecoScoreFilter}
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={ecoScoreFilter}
                onChange={(e) => setEcoScoreFilter(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </motion.div>
        )}

        {/* Results Count */}
        <div className="text-sm text-gray-600 mt-4">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </motion.div>

      {/* Products Grid/List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          : "space-y-4"
        }
      >
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
              viewMode === 'list' ? 'flex items-center p-4' : 'p-6'
            }`}
          >
            {/* Product Image Placeholder */}
            <div className={`bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center ${
              viewMode === 'list' ? 'w-20 h-20 mr-4' : 'w-full h-48 mb-4'
            }`}>
              <Package className="h-8 w-8 text-gray-400" />
            </div>

            <div className={viewMode === 'list' ? 'flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center' : ''}>
              {/* Product Info */}
              <div className={viewMode === 'list' ? 'md:col-span-2' : ''}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg">{product.productName}</h3>
                  {product.isSustainable && (
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <Leaf className="h-3 w-3 mr-1" />
                      Sustainable
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                
                <div className="flex items-center space-x-4 mb-3">
                  <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  <span className="text-sm text-gray-500">• {product.category}</span>
                </div>
              </div>

              {/* EcoScore */}
              <div className={viewMode === 'list' ? '' : 'mb-4'}>
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
                  />
                </div>
              </div>

              {/* Environmental Stats */}
              <div className={`grid grid-cols-2 gap-4 text-sm ${viewMode === 'list' ? 'mb-0' : 'mb-4'}`}>
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
              <div className={viewMode === 'list' ? 'flex justify-end' : ''}>
                <button
                  onClick={() => onAddToCart(product)}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium w-full sm:w-auto"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </motion.div>
      )}
    </div>
  );
};

export default ProductsPage;
