import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import type { Product, CartItem, CartAnalysis, Suggestion } from './types/api';
import { productService, cartService } from './services/apiService';

// Components
import Layout from './components/Layout';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import DashboardPage from './pages/DashboardPage';
import RewardsPage from './pages/RewardsPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartAnalysis, setCartAnalysis] = useState<CartAnalysis | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [ecoPoints, setEcoPoints] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load products on component mount
  useEffect(() => {
    loadProducts();
  }, []);

  // Analyze cart whenever items change
  useEffect(() => {
    if (cartItems.length > 0) {
      analyzeCart();
    } else {
      setCartAnalysis(null);
      setSuggestions([]);
    }
  }, [cartItems]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAllProducts();
      if (response.success) {
        setProducts(response.data);
      } else {
        setError('Failed to load products');
      }
    } catch (err) {
      setError('Error connecting to server. Please make sure the backend is running.');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import type { Product, CartItem, CartAnalysis, Suggestion } from './types/api';
import { productService, cartService } from './services/apiService';

// Components
import Layout from './components/Layout';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import DashboardPage from './pages/DashboardPage';
import RewardsPage from './pages/RewardsPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartAnalysis, setCartAnalysis] = useState<CartAnalysis | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [ecoPoints, setEcoPoints] = useState<number>(1250);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load products on component mount
  useEffect(() => {
    loadProducts();
  }, []);

  // Analyze cart whenever items change
  useEffect(() => {
    if (cartItems.length > 0) {
      analyzeCart();
    } else {
      setCartAnalysis(null);
      setSuggestions([]);
    }
  }, [cartItems]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAllProducts();
      if (response.success) {
        setProducts(response.data);
      } else {
        setError('Failed to load products');
      }
    } catch (err) {
      setError('Error connecting to server. Please make sure the backend is running.');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const analyzeCart = async () => {
    try {
      const productIds = cartItems.map(item => item.product._id);
      const response = await cartService.analyzeCart(productIds);
      
      if (response.success) {
        setCartAnalysis(response.data.cartAnalysis);
        setSuggestions(response.data.suggestions);
      }
    } catch (err) {
      console.error('Error analyzing cart:', err);
    }
  };

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product._id === product._id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product._id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product._id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const swapProduct = async (originalProduct: Product, alternativeProduct: Product) => {
    try {
      const response = await cartService.swapProduct(originalProduct._id, alternativeProduct._id);
      
      if (response.success) {
        // Update cart items
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.product._id === originalProduct._id
              ? { ...item, product: alternativeProduct }
              : item
          )
        );

        // Add earned eco points
        setEcoPoints(prevPoints => prevPoints + response.data.ecoPointsEarned);

        // Remove this suggestion since it's been applied
        setSuggestions(prevSuggestions =>
          prevSuggestions.filter(s => s.originalProduct._id !== originalProduct._id)
        );
      }
    } catch (err) {
      console.error('Error swapping product:', err);
    }
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading EcoTrack...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadProducts}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Layout ecoPoints={ecoPoints} cartItemsCount={cartItemsCount}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/products" 
            element={<ProductsPage onAddToCart={addToCart} />} 
          />
          <Route 
            path="/cart" 
            element={
              <CartPage 
                cart={cartItems}
                onRemoveFromCart={removeFromCart}
                onUpdateQuantity={updateQuantity}
                onSwapProduct={swapProduct}
                suggestions={suggestions}
                cartAnalysis={cartAnalysis}
              />
            } 
          />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
