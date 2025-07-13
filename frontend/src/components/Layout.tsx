import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  ShoppingCart, 
  Leaf, 
  BarChart3, 
  User, 
  Menu, 
  X,
  Home,
  Info,
  Award,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  ecoPoints: number;
  cartItemsCount: number;
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ ecoPoints, cartItemsCount, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Products', href: '/products', icon: ShoppingCart },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Rewards', href: '/rewards', icon: Award },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'About', href: '/about', icon: Info },
  ];

  const isActivePath = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  EcoTrack
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">Smart Cart Intelligence</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                      isActivePath(item.href)
                        ? 'bg-green-100 text-green-700 shadow-sm'
                        : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right side - EcoPoints and Cart */}
            <div className="flex items-center space-x-4">
              {/* EcoPoints */}
              <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-full flex items-center space-x-2">
                <Award className="h-4 w-4" />
                <span className="font-semibold">{ecoPoints}</span>
                <span className="text-xs opacity-90">EcoPoints</span>
              </div>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 text-gray-600 hover:text-green-600 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-green-600 transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="px-4 py-3 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all ${
                        isActivePath(item.href)
                          ? 'bg-green-100 text-green-700'
                          : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children || <Outlet />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  EcoTrack
                </h3>
              </div>
              <p className="text-gray-600 text-sm max-w-md">
                Encouraging sustainable shopping through intelligent cart analysis and eco-friendly recommendations.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/products" className="hover:text-green-600 transition-colors">Browse Products</Link></li>
                <li><Link to="/dashboard" className="hover:text-green-600 transition-colors">Analytics</Link></li>
                <li><Link to="/rewards" className="hover:text-green-600 transition-colors">Rewards Program</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">About</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/about" className="hover:text-green-600 transition-colors">Our Mission</Link></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
            <p>© 2025 EcoTrack. Built for Walmart Labs Hackathon. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
