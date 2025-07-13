import React from 'react';
import { motion } from 'framer-motion';
import { Award, Leaf } from 'lucide-react';

interface HeaderProps {
  ecoPoints: number;
}

const Header: React.FC<HeaderProps> = ({ ecoPoints }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient-eco">EcoTrack</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Smart Cart Intelligence</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-6"
          >
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-full flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span className="font-semibold">{ecoPoints}</span>
              <span className="text-xs opacity-90 hidden sm:inline">EcoPoints</span>
            </div>
            
            <div className="bg-gray-100 px-4 py-2 rounded-lg hidden md:block">
              <div className="text-xs text-gray-500">Powered by</div>
              <div className="font-semibold text-gray-700">Walmart Labs</div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
